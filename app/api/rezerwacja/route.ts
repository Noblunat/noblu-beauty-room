import { createHash } from "node:crypto"
import { checkBookingRateLimit } from "../../lib/bookingRateLimit"

type BookingRequest = {
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
  process.env.BOOKING_RECIPIENT_EMAIL || "noblu.beautyroom@gmail.com"

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : ""
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
  let data: BookingRequest

  try {
    data = (await request.json()) as BookingRequest
  } catch {
    return Response.json({ error: "Nieprawidłowe dane formularza." }, { status: 400 })
  }

  if (cleanText(data.website, 100)) {
    return Response.json({ ok: true })
  }

  const name = cleanText(data.name, 100)
  const telephone = cleanText(data.telephone, 40)
  const service = cleanText(data.service, 160)
  const price = cleanText(data.price, 40)
  const duration = cleanText(data.duration, 40)
  const date = cleanText(data.date, 20)
  const timePreference = cleanText(data.timePreference, 40)
  const notes = cleanText(data.notes, 1000)

  if (!name || !telephone || !service || !date) {
    return Response.json(
      { error: "Uzupełnij imię, telefon, usługę i preferowany dzień." },
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
    process.env.RESEND_FROM_EMAIL || "Noblu Beauty Room <rezerwacje@noblu.pl>"

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
    ["Cena orientacyjna", price || "-"],
    ["Czas trwania", duration || "-"],
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

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [recipientEmail],
      subject: `Nowa prośba o termin - ${service}`,
      text,
      html,
    }),
  })

  if (!resendResponse.ok) {
    console.error("Resend error", await resendResponse.text())
    return Response.json(
      { error: "Nie udało się wysłać formularza. Spróbuj ponownie." },
      { status: 502 }
    )
  }

  return Response.json({ ok: true })
}
