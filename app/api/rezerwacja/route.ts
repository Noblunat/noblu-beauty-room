import { createHash } from "node:crypto"
import { checkBookingRateLimit } from "../../lib/bookingRateLimit"
import { normalizePhoneNumber, phoneErrorMessage } from "../../lib/phone"
import { findBookingService, timePreferences } from "../../lib/bookingServices"

export const maxDuration = 20
const maxBodyBytes = 8192

type BookingRequest = {
  requestId?: unknown
  name?: unknown
  telephone?: unknown
  service?: unknown
  price?: unknown
  duration?: unknown
  date?: unknown
  timePreference?: unknown
  notes?: unknown
  website?: unknown
}

const recipientEmail =
  process.env.BOOKING_RECIPIENT_EMAIL || "salon@noblu.pl"

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : ""
}

function getTodayInWarsaw() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Warsaw",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date())
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))

  return `${values.year}-${values.month}-${values.day}`
}

function isValidIsoDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false
  }

  const [year, month, day] = value.split("-").map(Number)
  const parsedDate = new Date(Date.UTC(year, month - 1, day))

  return (
    parsedDate.getUTCFullYear() === year &&
    parsedDate.getUTCMonth() === month - 1 &&
    parsedDate.getUTCDate() === day
  )
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function getClientId(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")
  const clientIp =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"

  return createHash("sha256").update(clientIp).digest("hex")
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin")
  // Next may reconstruct request.url with its bind hostname (localhost).
  // Host is the actual HTTP destination; browsers cannot override this header.
  const url = new URL(request.url)
  const destination = new URL(`${url.protocol}//${request.headers.get("host") || url.host}`).origin
  if ((origin && origin !== destination) || request.headers.get("sec-fetch-site") === "cross-site") {
    return Response.json({ error: "Wyślij formularz bezpośrednio ze strony salonu." }, { status: 403 })
  }
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return Response.json({ error: "Nieprawidłowy format formularza." }, { status: 415 })
  }
  if (Number(request.headers.get("content-length")) > maxBodyBytes) {
    return Response.json({ error: "Formularz zawiera zbyt dużo danych." }, { status: 413 })
  }
  let data: BookingRequest

  try {
    // Enforce the limit while reading, including requests without Content-Length.
    const reader = request.body?.getReader()
    if (!reader) return Response.json({ error: "Brak danych formularza." }, { status: 400 })
    const decoder = new TextDecoder("utf-8", { fatal: true })
    let size = 0
    let text = ""
    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        size += value.byteLength
        if (size > maxBodyBytes) {
          await reader.cancel()
          return Response.json({ error: "Formularz zawiera zbyt dużo danych." }, { status: 413 })
        }
        text += decoder.decode(value, { stream: true })
      }
    } finally {
      reader.releaseLock()
    }
    const body: unknown = JSON.parse(text + decoder.decode())
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return Response.json({ error: "Nieprawidłowe dane formularza." }, { status: 400 })
    }
    data = body as BookingRequest
  } catch {
    return Response.json({ error: "Nieprawidłowe dane formularza." }, { status: 400 })
  }

  if (cleanText(data.website, 100)) {
    return Response.json({ ok: true })
  }

  const fields: [unknown, number][] = [
    [data.name, 100], [data.telephone, 40], [data.service, 160],
    [data.date, 20], [data.timePreference, 40], [data.notes, 1000],
  ]
  if (fields.some(([value, max]) => value !== undefined && (typeof value !== "string" || value.length > max)) ||
      (typeof data.name === "string" && /[\u0000-\u001f\u007f]/.test(data.name))) {
    return Response.json({ error: "Sprawdź długość i poprawność pól formularza." }, { status: 400 })
  }

  const name = cleanText(data.name, 100)
  const telephone = normalizePhoneNumber(data.telephone)
  const service = cleanText(data.service, 160)
  const selectedService = findBookingService(service)
  const date = cleanText(data.date, 20)
  const timePreference = cleanText(data.timePreference, 40) || "Dowolnie"
  const notes = cleanText(data.notes, 1000)

  if (!name || !cleanText(data.telephone, 40) || !service || !date) {
    return Response.json(
      { error: "Uzupełnij imię, telefon, usługę i preferowany dzień." },
      { status: 400 }
    )
  }

  if (!telephone) {
    return Response.json({ error: phoneErrorMessage }, { status: 400 })
  }

  if (!selectedService || !timePreferences.some(value => value === timePreference)) {
    return Response.json({ error: "Wybierz usługę i porę dnia z listy w formularzu." }, { status: 400 })
  }

  if (!isValidIsoDate(date)) {
    return Response.json(
      { error: "Podaj prawidłowy dzień wizyty." },
      { status: 400 }
    )
  }

  if (date < getTodayInWarsaw()) {
    return Response.json(
      { error: "Wybrany dzień nie może być wcześniejszy niż dzisiaj." },
      { status: 400 }
    )
  }

  if (typeof data.requestId !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.requestId)) {
    return Response.json(
      { error: "Odśwież formularz przed wysłaniem nowego zapytania." },
      { status: 400 }
    )
  }

  const rateLimit = checkBookingRateLimit(getClientId(request))

  if (!rateLimit.allowed) {
    return Response.json(
      {
        error:
          "Wysłano zbyt wiele próśb o termin. Spróbuj ponownie za kilka minut.",
      },
      {
        status: 429,
        headers: {
          "Cache-Control": "no-store",
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      }
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "Noblu Beauty Room <salon@noblu.pl>"

  if (!apiKey) {
    console.error("Missing RESEND_API_KEY")
    return Response.json(
      { error: "Wysyłka formularza nie jest jeszcze skonfigurowana." },
      { status: 503 }
    )
  }

  const rows = [
    ["Imię", name],
    ["Telefon", telephone],
    ["Usługa", service],
    ["Cena orientacyjna", selectedService.price],
    ["Czas trwania", selectedService.duration],
    ["Preferowany dzień", date],
    ["Pora dnia", timePreference || "Dowolnie"],
    ["Uwagi", notes || "-"],
  ]

  const text = [
    "Nowa prośba o termin z noblu.pl",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ].join("\n")

  const html = `
    <div style="font-family:Arial,sans-serif;color:#1d1d1b;line-height:1.6">
      <h1 style="font-size:24px">Nowa prośba o termin</h1>
      <table style="border-collapse:collapse;width:100%;max-width:640px">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="padding:8px 12px;border-bottom:1px solid #e8ded2;font-weight:700">${escapeHtml(label)}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e8ded2">${escapeHtml(value)}</td>
              </tr>`
          )
          .join("")}
      </table>
    </div>`

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `booking/${data.requestId.toLowerCase()}`,
      },
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify({
        from: fromEmail,
        to: [recipientEmail],
        subject: `Nowa prośba o termin - ${service}`,
        text,
        html,
      }),
    })

    if (!resendResponse.ok) {
      console.error("booking_delivery_failed", { provider: "resend", status: resendResponse.status })
      if (resendResponse.status === 409) {
        const result = await resendResponse.json().catch(() => null) as { name?: unknown } | null
        const pending = result?.name === "concurrent_idempotent_requests"
        return Response.json({
          error: pending
            ? "Zgłoszenie jest już przetwarzane. Poczekaj chwilę i ponów wysyłkę, jeśli nie zobaczysz potwierdzenia."
            : "Nie można ponowić zgłoszenia ze zmienioną treścią. Odśwież formularz, aby wysłać nowe zapytanie.",
        }, { status: 409, headers: { "Cache-Control": "no-store", ...(pending ? { "Retry-After": "2" } : {}) } })
      }
      return Response.json({ error: "Nie udało się wysłać formularza. Spróbuj ponownie." }, { status: 502 })
    }
  } catch {
    console.error("booking_delivery_failed", { provider: "resend", reason: "network_or_timeout" })
    return Response.json({ error: "Nie udało się potwierdzić wysyłki. Skontaktuj się z salonem telefonicznie." }, { status: 502 })
  }

  return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } })
}
