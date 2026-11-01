"use client"
import { business, businessRating, businessAddress } from "../lib/business";


import Image from "next/image"
import Link from "next/link"
import { FormEvent, useEffect, useMemo, useRef, useState } from "react"
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd"
import { trackAnalyticsEvent, trackGoogleAdsConversion } from "../lib/analytics"
import { normalizePhoneNumber, phoneErrorMessage } from "../lib/phone"
import { findBookingService, serviceGroups, type Service } from "../lib/bookingServices"
import { inquiryCopy, hybridAddons } from "../lib/firstVisit"

const booksyProfileUrl = business.links.booksyBooking
const reservationConversionId = "AW-10795260361/ZeoSCKvShaEdEMmzypso"
const contactEmail = business.email
const phone = business.phone.international
const mapsDirectionsUrl = business.links.directions

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


const highlights = [
  { value: businessRating, label: `Ponad ${business.reviews.minimum} opinii` },
  { value: "24/7", label: "Formularz online" },
  { value: "Darmowy", label: "parking pod salonem" },
] as const


function trackReservationLead(service: Service, submissionId: string) {
  trackAnalyticsEvent("generate_lead", {
      lead_source: "reservation_form",
      service_name: service.name,
      service_id: service.id,
  })

  trackGoogleAdsConversion(reservationConversionId, {
      lead_source: "reservation_form",
      service_name: service.name,
      service_id: service.id,
      transaction_id: submissionId,
  })
}

export default function ReservationClient({ initialService }: { initialService: string }) {
  const minBookingDate = getTodayInWarsaw()
  const [selectedService, setSelectedService] = useState(findBookingService(initialService)?.id ?? "")
  const [name, setName] = useState("")
  const [telephone, setTelephone] = useState("")
  const [date, setDate] = useState("")
  const [timePreference, setTimePreference] = useState("Dowolnie")
  const [notes, setNotes] = useState("")
  const [website, setWebsite] = useState("")
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle")
  const [submitMessage, setSubmitMessage] = useState("")
  const [deliveryFailed, setDeliveryFailed] = useState(false)
  const bookingStarted = useRef(false)
  const submissionPhase = useRef<"idle" | "sending" | "success">("idle")
  const requestId = useRef<string | null>(null)
  const attemptedPayload = useRef<string | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const focusAfterReset = useRef(false)

  useEffect(() => {
    requestId.current ??= crypto.randomUUID()
  }, [])

  useEffect(() => {
    if (submitStatus === "success" || focusAfterReset.current) {
      panelRef.current?.focus()
      focusAfterReset.current = false
    }
  }, [submitStatus])

  function startNewInquiry() {
    requestId.current = crypto.randomUUID()
    attemptedPayload.current = null
    submissionPhase.current = "idle"
    bookingStarted.current = false
    focusAfterReset.current = true
    setSubmitMessage("")
    setDeliveryFailed(false)
    setSubmitStatus("idle")
  }

  function trackBookingStart(serviceName = selectedService) {
    if (bookingStarted.current) return
    bookingStarted.current = trackAnalyticsEvent("booking_start", {
      service_name: findBookingService(serviceName)?.name ?? "unspecified",
      service_id: findBookingService(serviceName)?.id ?? "unspecified",
      booking_channel: "reservation_form",
    })
  }

  const selected = useMemo(
    () => findBookingService(selectedService),
    [selectedService]
  )
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submissionPhase.current !== "idle") return
    setDeliveryFailed(false)
    const normalizedTelephone = normalizePhoneNumber(telephone)
    if (!normalizedTelephone) {
      setSubmitStatus("error")
      setSubmitMessage(phoneErrorMessage)
      return
    }
    const payload = {
      name,
      telephone: normalizedTelephone,
      serviceId: selectedService,
      date,
      timePreference,
      notes,
      website,
    }
    const serializedPayload = JSON.stringify(payload)
    // A retry must reuse the identity; editing a failed inquiry starts another one.
    if (attemptedPayload.current !== null && attemptedPayload.current !== serializedPayload) {
      requestId.current = crypto.randomUUID()
    }
    requestId.current ??= crypto.randomUUID()
    attemptedPayload.current = serializedPayload
    submissionPhase.current = "sending"
    trackBookingStart()
    setSubmitStatus("sending")
    setSubmitMessage("")
    let failureMessage = "Nie udało się potwierdzić wysyłki. Spróbuj ponownie lub skontaktuj się z salonem."

    try {
      const response = await fetch("/api/rezerwacja", {
        method: "POST",
        signal: AbortSignal.timeout(15000),
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, requestId: requestId.current }),
      })

      const result = (await response.json().catch(() => null)) as {
        ok?: unknown
        error?: unknown
      } | null

      if (!response.ok) {
        const rateLimitMessage =
          response.status === 403 || response.status === 429
            ? "Wysłano zbyt wiele prób o termin. Spróbuj ponownie za kilka minut."
            : "Nie udało się wysłać formularza."

        failureMessage = typeof result?.error === "string" ? result.error : rateLimitMessage
        throw new Error("booking_rejected")
      }

      if (result?.ok !== true) throw new Error("booking_unconfirmed")
    } catch {
      submissionPhase.current = "idle"
      setSubmitStatus("error")
      setDeliveryFailed(true)
      setSubmitMessage(failureMessage)
      return
    }

    submissionPhase.current = "success"
    setName("")
    setTelephone("")
    setSelectedService("")
    setDate("")
    setTimePreference("Dowolnie")
    setNotes("")
    setWebsite("")
    setSubmitStatus("success")
    setSubmitMessage(
      "Dziękujemy. Otrzymaliśmy prośbę o termin i skontaktujemy się telefonicznie."
    )
    if (selected) {
      trackAnalyticsEvent("booking_complete", {
        service_name: selected.name,
        service_id: selected.id,
        booking_channel: "reservation_form",
      })
      trackReservationLead(selected, requestId.current)
    }
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(125deg,#fffdfb_0%,#f8f2eb_42%,#eadcc8_100%)] text-[#1D1D1B]">
      <BreadcrumbJsonLd
        items={[
          {
            name: "Zapytaj o termin",
            url: `${business.url}/rezerwacja`,
          },
        ]}
      />

      <section className="relative overflow-hidden px-6 py-6 sm:px-10 sm:py-8 lg:px-16 lg:py-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(212,180,131,0.24),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.95),transparent_36%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Link
              href="/"
              className="mb-4 inline-flex text-sm uppercase text-[#7C6238] transition-colors hover:text-[#1D1D1B]"
            >
              {business.name}
            </Link>

            <h1 className="max-w-2xl text-3xl font-light leading-tight sm:text-4xl lg:text-5xl">Poproś o termin bez konta</h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#625b53]">{inquiryCopy.notice}</p>

            <a
              href="#formularz"
              className="mt-6 inline-flex rounded-full bg-[#D4B483] px-6 py-3 font-medium text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C6238] lg:hidden"
            >
              Przejdź do formularza
            </a>

            <div className="mt-6 hidden max-w-lg grid-cols-[1fr_0.8fr_1.2fr] gap-3 lg:grid">
              {highlights.map((item) => (
                <div
                  key={item.value}
                  className="min-w-0 rounded-2xl border border-[#E8DED2] bg-white/70 px-2 py-3 text-left backdrop-blur-xl sm:p-5"
                >
                  <div className="break-words text-lg font-semibold leading-tight tracking-tight sm:break-normal sm:text-3xl sm:tracking-normal">
                    {item.value}
                  </div>
                  <div className="mt-1 text-xs leading-snug text-[#6D6B68] sm:text-sm">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden min-h-[320px] overflow-hidden rounded-lg lg:block">
            <Image
              src="/rezerwacja/rezerwacja-hero.jpg"
              alt={`Stylizacja paznokci ${business.name} Kraków`}
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 46vw, 1px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,245,242,0.9)_0%,rgba(248,245,242,0.36)_38%,rgba(248,245,242,0.02)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f8f2eb] to-transparent" />
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div
            id="formularz"
            tabIndex={-1}
            ref={panelRef}
            aria-labelledby="reservation-panel-title"
            className="min-w-0 rounded-[2rem] border border-[#E8DED2] bg-white/75 p-6 shadow-[0_24px_70px_rgba(80,55,25,0.08)] backdrop-blur-sm focus:outline-2 focus:outline-offset-4 focus:outline-[#7C6238] sm:p-8"
          >
            {submitStatus === "success" ? (
              <div>
                <div role="status">
                  <h2 id="reservation-panel-title" className="text-3xl font-light">Prośba o termin została wysłana</h2>
                  <p className="mt-5 leading-relaxed text-[#625b53]">{submitMessage}</p>
                  <p className="mt-3 leading-relaxed text-[#625b53]">
                    Termin nie jest jeszcze potwierdzony. Salon potwierdzi dostępność SMS-em lub telefonicznie.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={startNewInquiry}
                  className="mt-8 min-h-12 w-full rounded-full border border-[#7C6238] px-5 py-3 font-medium text-[#7C6238] transition-colors hover:bg-[#F8F5F2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C6238]"
                >
                  Wyślij kolejne zapytanie
                </button>
                <Link href="/" className="mt-5 block text-center text-sm font-medium text-[#7C6238] underline underline-offset-4">
                  Wróć na stronę główną
                </Link>
              </div>
            ) : <form
            onSubmit={handleSubmit}
            onChange={(event) => {
              if (!(event.target instanceof Element)) return
              if (event.target.closest('[aria-hidden="true"]')) return
              const serviceName = event.target instanceof HTMLSelectElement
                ? event.target.value
                : selectedService
              trackBookingStart(serviceName)
            }}
          >
            <h2 id="reservation-panel-title" className="text-3xl font-light">Dane wizyty</h2>

            <div role="status" aria-label="Podsumowanie wyboru" aria-live="polite" aria-atomic="true" className="mt-4 border-y border-[#E8DED2] py-4">
              <p className="font-medium">{selected?.label ?? "Wybierz usługę, aby zobaczyć cenę i czas"}</p>
              {selected && <p className="mt-1 text-lg text-[#7C6238]">{selected.price} · {selected.durationMinutes} minut</p>}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#625b53]">{inquiryCopy.notice}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#625b53]">{inquiryCopy.unavailable}</p>
            {selected?.serviceId === "hybryda" && <details className="mt-4 border-b border-[#E8DED2] pb-4 text-sm leading-relaxed text-[#625b53]">
              <summary className="cursor-pointer py-2 font-medium text-[#7C6238]">Pierwsza hybryda: zakres i dodatki</summary>
              <p className="mt-2">{inquiryCopy.firstVisit}</p>
              <ul className="mt-3 space-y-2">
                {hybridAddons.map(addon => <li key={addon.name}>{addon.name}: {addon.price} · dodatkowo {addon.duration}. {addon.description}</li>)}
              </ul>
              <p className="mt-3">Usunięcie poprzedniej stylizacji i zdobienia opisz w polu „Uwagi”. Pełny zakres napraw, przedłużeń i zdjęcia żelu znajdziesz w <Link href="/cennik" className="underline underline-offset-4">cenniku</Link>.</p>
            </details>}

            <fieldset disabled={submitStatus === "sending"} className="min-w-0">
            <label aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
              Strona internetowa
              <input
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </label>

            <div className="mt-8 grid gap-5">
              <label className="grid gap-2 text-sm text-[#6D6B68]">
                Imię
                <input
                  value={name}
                  autoComplete="name"
                  maxLength={100}
                  onChange={(event) => setName(event.target.value)}
                  required
                  className="min-w-0 w-full rounded-2xl border border-[#E8DED2] bg-white px-4 py-4 text-base text-[#1D1D1B] outline-none transition-colors focus:border-[#7C6238] focus:outline-2 focus:outline-solid focus:outline-offset-2 focus:outline-[#7C6238]"
                  placeholder="Natalia"
                />
              </label>

              <label className="grid gap-2 text-sm text-[#6D6B68]">
                Telefon
                <input
                  value={telephone}
                  type="tel"
                  autoComplete="tel"
                  onChange={(event) => {
                    const value = event.target.value
                    setTelephone(value)
                    event.target.setCustomValidity(
                      value && !normalizePhoneNumber(value) ? phoneErrorMessage : ""
                    )
                  }}
                  maxLength={40}
                  required
                  className="min-w-0 w-full rounded-2xl border border-[#E8DED2] bg-white px-4 py-4 text-base text-[#1D1D1B] outline-none transition-colors focus:border-[#7C6238] focus:outline-2 focus:outline-solid focus:outline-offset-2 focus:outline-[#7C6238]"
                  placeholder="+48 000 000 000"
                />
              </label>

              <label className="grid gap-2 text-sm text-[#6D6B68]">
                Usługa
                <select
                  value={selectedService}
                  onChange={(event) => setSelectedService(event.target.value)}
                  required
                  className="min-w-0 w-full rounded-2xl border border-[#E8DED2] bg-white px-4 py-4 text-base text-[#1D1D1B] outline-none transition-colors focus:border-[#7C6238] focus:outline-2 focus:outline-solid focus:outline-offset-2 focus:outline-[#7C6238]"
                >
                  <option value="" disabled>Wybierz usługę</option>
                  {serviceGroups.map((group) => (
                    <optgroup key={group.title} label={group.title}>
                      {group.services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-[#6D6B68]">
                  Preferowany dzień
                  <input
                    type="date"
                    min={minBookingDate}
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    required
                    className="min-w-0 w-full rounded-2xl border border-[#E8DED2] bg-white px-4 py-4 text-base text-[#1D1D1B] outline-none transition-colors focus:border-[#7C6238] focus:outline-2 focus:outline-solid focus:outline-offset-2 focus:outline-[#7C6238]"
                  />
                </label>

                <label className="grid gap-2 text-sm text-[#6D6B68]">
                  Pora dnia
                  <select
                    value={timePreference}
                    onChange={(event) => setTimePreference(event.target.value)}
                    className="min-w-0 w-full rounded-2xl border border-[#E8DED2] bg-white px-4 py-4 text-base text-[#1D1D1B] outline-none transition-colors focus:border-[#7C6238] focus:outline-2 focus:outline-solid focus:outline-offset-2 focus:outline-[#7C6238]"
                  >
                    <option>Dowolnie</option>
                    <option>Rano</option>
                    <option>Po południu</option>
                    <option>Wieczorem</option>
                  </select>
                </label>
              </div>

              <label className="grid gap-2 text-sm text-[#6D6B68]">
                Uwagi
                <textarea
                  value={notes}
                  maxLength={1000}
                  onChange={(event) => setNotes(event.target.value)}
                  className="min-h-32 min-w-0 w-full rounded-2xl border border-[#E8DED2] bg-white px-4 py-4 text-base text-[#1D1D1B] outline-none transition-colors focus:border-[#7C6238] focus:outline-2 focus:outline-solid focus:outline-offset-2 focus:outline-[#7C6238]"
                  placeholder="Np. pytanie o termin, pierwszy raz, usługa..."
                />
              </label>
            </div>
            </fieldset>

            <div className="mt-8 grid gap-3">
              <button
                type="submit"
                disabled={submitStatus === "sending"}
                className="min-h-14 w-full rounded-full bg-[#D4B483] px-5 py-4 font-medium text-black shadow-[0_20px_60px_rgba(212,180,131,0.35)] transition-colors hover:bg-[#C9A571] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C6238] disabled:cursor-wait disabled:opacity-60"
              >
                {submitStatus === "sending" ? "Wysyłanie..." : "Wyślij prośbę o termin"}
              </button>

              <div className="grid gap-3 xl:grid-cols-2">
                <a
                  href={booksyProfileUrl}
                  data-service-name={selected?.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-center rounded-full bg-[#D4B483] px-4 py-3 text-center text-sm font-medium text-black transition-colors hover:bg-[#C9A571] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C6238]"
                >
                  Wybierz termin w Booksy
                </a>

              <Link
                href="/cennik"
                className="flex min-h-12 items-center justify-center rounded-full border border-[#D4B483] px-4 py-3 text-center text-sm font-medium text-[#876536] transition-colors hover:bg-[#D4B483] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C6238]"
              >
                Zobacz cennik usług
              </Link>
              </div>
            </div>

            <p className="mt-4 text-center text-xs leading-relaxed text-[#7A746D]">
              Możesz wysłać prośbę o termin przez formularz lub wybrać usługę i termin na naszym profilu Booksy.
            </p>

            {submitMessage && (
              <div
                role="alert"
                className="mt-5 text-center text-sm font-medium text-red-700"
              >
                <p>{submitMessage}</p>
                {deliveryFailed && (
                  <>
                    <p className="mt-2 text-[#625b53]">
                      Dane pozostają w formularzu do czasu zamknięcia lub odświeżenia strony.
                      Możesz też zadzwonić lub wybrać termin w Booksy.
                    </p>
                    <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-3">
                      <a href={`tel:${business.phone.e164}`} className="text-[#7C6238] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C6238]">
                        Zadzwoń: {phone}
                      </a>
                      <a
                        href={booksyProfileUrl}
                        data-service-name={selected?.name}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#7C6238] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C6238]"
                      >
                        Przejdź do Booksy
                      </a>
                    </div>
                  </>
                )}
              </div>
            )}

            <p className="mt-5 text-center text-xs leading-relaxed text-[#7A746D]">
              Wysyłając formularz, potwierdzasz zapoznanie się z{" "}
              <Link
                href="/polityka-prywatnosci"
                className="font-medium text-[#7C6238] hover:text-[#1D1D1B]"
              >
                polityką prywatności
              </Link>
              .
            </p>
          </form>}
          </div>

          <div className="grid gap-6">
            {submitStatus !== "success" && <div className="rounded-[2rem] border border-[#E8DED2] bg-white/70 p-6 shadow-[0_24px_70px_rgba(80,55,25,0.08)] sm:p-8">
              <h2 className="text-3xl font-light">Wybrana usługa</h2>
              <div className="mt-6 rounded-3xl bg-[#F8F5F2] p-6">
                <div className="text-2xl font-medium">{selected?.label ?? "Wybierz usługę w formularzu"}</div>
                {selected && <div className="mt-4 flex flex-wrap gap-3 text-sm text-[#6D6B68]">
                  <span className="rounded-full border border-[#E8DED2] bg-white px-4 py-2">
                    {selected?.price}
                  </span>
                  <span className="rounded-full border border-[#E8DED2] bg-white px-4 py-2">
                    {selected?.duration}
                  </span>
                </div>}
              </div>
              <p className="mt-5 leading-relaxed text-[#625b53]">
                Podana cena i czas dotyczą wybranego podstawowego wariantu.
                Dodatki i ewentualną zmianę zakresu ustalimy z Tobą przed rozpoczęciem.
                Pełną listę usług znajdziesz w{" "}
                <Link
                  href="/cennik"
                  className="font-medium text-[#7C6238] underline underline-offset-4"
                >
                  cenniku {business.name}
                </Link>
                .
              </p>
              <nav aria-label="Poznaj usługi" className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm">
                {[
                  ["/manicure-krakow", "Manicure i stylizacja paznokci"],
                  ["/pedicure-krakow", "Pedicure"],
                  ["/stylizacja-rzes-krakow", "Stylizacja rzęs"],
                  ["/przedluzanie-rzes-krakow", "Przedłużanie rzęs"],
                ].map(([href, label]) => (
                  <Link key={href} href={href} className="font-medium text-[#7C6238] underline underline-offset-4">
                    {label}
                  </Link>
                ))}
              </nav>
            </div>}

            <div className="rounded-[2rem] border border-[#E8DED2] bg-white/70 p-6 shadow-[0_24px_70px_rgba(80,55,25,0.08)] sm:p-8">
              <h2 className="text-3xl font-light">Kontakt</h2>
              <div className="mt-6 grid gap-3 text-[#625b53]">
                <a
                  href={`tel:${business.phone.e164}`}
                  className="transition-colors hover:text-[#1D1D1B]"
                >
                  {phone}
                </a>
                <a
                  href={`mailto:${contactEmail}`}
                  className="transition-colors hover:text-[#1D1D1B]"
                >
                  {contactEmail}
                </a>
                <div>{businessAddress}</div>
                <a
                  href={mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex w-fit items-center justify-center rounded-full border border-[#D4B483] px-5 py-2 text-sm font-medium text-[#876536] transition-colors hover:bg-[#D4B483] hover:text-black"
                >
                  Wyznacz trasę w Google Maps
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#E8DED2] bg-white/70 p-6 shadow-[0_24px_70px_rgba(80,55,25,0.08)] sm:p-8">
              <h2 className="text-3xl font-light">Godziny salonu</h2>
              <p className="mt-5 text-[#625b53]">
                {business.hours.daysLabel}: {business.hours.opens} - {business.hours.closes}
              </p>
              <p className="mt-2 text-[#625b53]">{business.hours.closedLabel}</p>
              <p className="mt-2 text-[#625b53]">
                Prośbę o termin możesz wysłać online 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
