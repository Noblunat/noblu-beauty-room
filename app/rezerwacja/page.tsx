"use client"

import Image from "next/image"
import Link from "next/link"
import { FormEvent, useMemo, useState } from "react"
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd"
import { readCookieConsent } from "../lib/cookieConsent"

const booksyUrl =
  "https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow"
const reservationConversionId = "AW-10795260361/w2THCKCZ0LYcEMmzypso"
const contactEmail = "noblu.beautyroom@gmail.com"
const phone = "+48 662 989 534"
const mapsDirectionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=Noblu%20Beauty%20Room%20Orzechowa%204%2Flok.1%2030-422%20Krak%C3%B3w"

type Service = {
  name: string
  price: string
  duration: string
}

type ServiceGroup = {
  title: string
  services: Service[]
}

const serviceGroups: ServiceGroup[] = [
  {
    title: "Stylizacja rzęs",
    services: [
      { name: "Aplikacja rzęs 1:1", price: "190 zł", duration: "2h 30min" },
      { name: "Uzupełnienie rzęs 1:1", price: "160 zł", duration: "2h 15min" },
      { name: "Aplikacja rzęs 2D", price: "210 zł", duration: "3h" },
      { name: "Uzupełnienie rzęs 2D", price: "180 zł", duration: "2h 45min" },
      { name: "Aplikacja rzęs 3D", price: "220 zł", duration: "3h" },
      { name: "Uzupełnienie rzęs 3D", price: "190 zł", duration: "2h 45min" },
      { name: "Ściągnięcie rzęs", price: "40 zł", duration: "40min" },
    ],
  },
  {
    title: "Manicure i stylizacja paznokci",
    services: [
      { name: "Manicure", price: "100 zł", duration: "ok. 1h" },
      { name: "Stylizacja hybrydowa", price: "160 zł", duration: "1h 30min" },
      {
        name: "Stylizacja hybrydowa więcej niż 1 kolor",
        price: "170 zł",
        duration: "1h 35min",
      },
      { name: "Żel na naturalnej płytce", price: "190 zł", duration: "ok. 2h" },
      { name: "Przedłużenie żelowe", price: "220 zł", duration: "ok. 2h 30min" },
      { name: "Uzupełnienie żelowe", price: "190 zł", duration: "ok. 2h" },
      { name: "Naprawa jednego paznokcia", price: "30 zł", duration: "20min" },
    ],
  },
  {
    title: "Pedicure",
    services: [
      { name: "Pedicure same paznokcie", price: "110 zł", duration: "ok. 1h" },
      {
        name: "Pedicure same paznokcie z hybrydą",
        price: "160 zł",
        duration: "ok. 1h 20min",
      },
      { name: "Pedicure kosmetyczny", price: "180 zł", duration: "ok. 1h 30min" },
      {
        name: "Pedicure kosmetyczny z hybrydą",
        price: "200 zł",
        duration: "ok. 1h 45min",
      },
    ],
  },
]

const highlights = [
  { value: "★★★★★ 5.0", label: "z 212 opinii" },
  { value: "24/7", label: "Formularz online" },
  { value: "Darmowy", label: "parking pod salonem" },
] as const

const allServices = serviceGroups.flatMap((group) => group.services)

function trackReservationLead(service: Service) {
  const consent = readCookieConsent()

  if (!consent || typeof window.gtag !== "function") {
    return
  }

  if (consent.analytics) {
    window.gtag("event", "generate_lead", {
      currency: "PLN",
      value: 1,
      lead_source: "reservation_form",
      service_name: service.name,
    })
  }

  if (consent.marketing) {
    window.gtag("event", "conversion", {
      send_to: reservationConversionId,
      value: 1,
      currency: "PLN",
      lead_source: "reservation_form",
      service_name: service.name,
      transport_type: "beacon",
    })
  }
}

export default function RezerwacjaPage() {
  const [selectedService, setSelectedService] = useState(allServices[0].name)
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

  const selected = useMemo(
    () => allServices.find((service) => service.name === selectedService),
    [selectedService]
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitStatus("sending")
    setSubmitMessage("")

    try {
      const response = await fetch("/api/rezerwacja", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          telephone,
          service: selectedService,
          price: selected?.price,
          duration: selected?.duration,
          date,
          timePreference,
          notes,
          website,
        }),
      })

      const result = (await response.json()) as { error?: unknown }

      if (!response.ok) {
        const rateLimitMessage =
          response.status === 403 || response.status === 429
            ? "Wysłano zbyt wiele prób o termin. Spróbuj ponownie za kilka minut."
            : "Nie udało się wysłać formularza."

        throw new Error(
          typeof result.error === "string" ? result.error : rateLimitMessage
        )
      }

      if (selected) {
        trackReservationLead(selected)
      }

      setSubmitStatus("success")
      setSubmitMessage(
        "Dziękujemy. Otrzymaliśmy prośbę o termin i skontaktujemy się telefonicznie."
      )
    } catch (error) {
      setSubmitStatus("error")
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "Nie udało się wysłać formularza. Spróbuj ponownie."
      )
    }
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(125deg,#fffdfb_0%,#f8f2eb_42%,#eadcc8_100%)] text-[#1D1D1B]">
      <BreadcrumbJsonLd
        items={[
          {
            name: "Zapytaj o termin",
            url: "https://noblu.pl/rezerwacja",
          },
        ]}
      />

      <section className="relative overflow-hidden px-6 py-10 sm:px-10 lg:px-16 lg:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(212,180,131,0.24),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.95),transparent_36%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Link
              href="/"
              className="mb-12 inline-flex text-sm uppercase tracking-[0.24em] text-[#7C6238] transition-colors hover:text-[#1D1D1B]"
            >
              Noblu Beauty Room
            </Link>

            <h1 className="max-w-2xl text-6xl font-light leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl">
              Rezerwacja manicure, pedicure i rzęs
              <span className="block text-[#7C6238]">w Noblu</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#625b53]">
              Wybierz manicure, pedicure, paznokcie hybrydowe albo stylizację
              rzęs i podaj preferowany termin wizyty. Formularz nie blokuje
              terminu automatycznie, a ostateczne potwierdzenie otrzymasz od salonu.
            </p>

            <div className="mt-10 grid max-w-lg grid-cols-[1fr_0.8fr_1.2fr] gap-3 sm:max-w-xl sm:grid-cols-3 sm:gap-6">
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

          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] sm:min-h-[440px] lg:min-h-[560px]">
            <Image
              src="/rezerwacja/rezerwacja-hero.jpg"
              alt="Stylizacja paznokci Noblu Beauty Room Kraków"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,245,242,0.9)_0%,rgba(248,245,242,0.36)_38%,rgba(248,245,242,0.02)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f8f2eb] to-transparent" />
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <form
            onSubmit={handleSubmit}
            className="min-w-0 rounded-[2rem] border border-[#E8DED2] bg-white/75 p-6 shadow-[0_24px_70px_rgba(80,55,25,0.08)] backdrop-blur-sm sm:p-8"
          >
            <h2 className="text-3xl font-light">Dane wizyty</h2>

            <label className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
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
                  onChange={(event) => setName(event.target.value)}
                  required
                  className="min-w-0 w-full rounded-2xl border border-[#E8DED2] bg-white px-4 py-4 text-base text-[#1D1D1B] outline-none transition-colors focus:border-[#D4B483]"
                  placeholder="Natalia"
                />
              </label>

              <label className="grid gap-2 text-sm text-[#6D6B68]">
                Telefon
                <input
                  value={telephone}
                  onChange={(event) => setTelephone(event.target.value)}
                  required
                  className="min-w-0 w-full rounded-2xl border border-[#E8DED2] bg-white px-4 py-4 text-base text-[#1D1D1B] outline-none transition-colors focus:border-[#D4B483]"
                  placeholder="+48 000 000 000"
                />
              </label>

              <label className="grid gap-2 text-sm text-[#6D6B68]">
                Usługa
                <select
                  value={selectedService}
                  onChange={(event) => setSelectedService(event.target.value)}
                  className="min-w-0 w-full rounded-2xl border border-[#E8DED2] bg-white px-4 py-4 text-base text-[#1D1D1B] outline-none transition-colors focus:border-[#D4B483]"
                >
                  {serviceGroups.map((group) => (
                    <optgroup key={group.title} label={group.title}>
                      {group.services.map((service) => (
                        <option key={service.name} value={service.name}>
                          {service.name}
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
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    required
                    className="min-w-0 w-full rounded-2xl border border-[#E8DED2] bg-white px-4 py-4 text-base text-[#1D1D1B] outline-none transition-colors focus:border-[#D4B483]"
                  />
                </label>

                <label className="grid gap-2 text-sm text-[#6D6B68]">
                  Pora dnia
                  <select
                    value={timePreference}
                    onChange={(event) => setTimePreference(event.target.value)}
                    className="min-w-0 w-full rounded-2xl border border-[#E8DED2] bg-white px-4 py-4 text-base text-[#1D1D1B] outline-none transition-colors focus:border-[#D4B483]"
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
                  onChange={(event) => setNotes(event.target.value)}
                  className="min-h-32 min-w-0 w-full rounded-2xl border border-[#E8DED2] bg-white px-4 py-4 text-base text-[#1D1D1B] outline-none transition-colors focus:border-[#D4B483]"
                  placeholder="Np. pytanie o termin, pierwszy raz, usługa..."
                />
              </label>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={submitStatus === "sending"}
                className="rounded-full bg-[#D4B483] px-7 py-4 font-medium text-black shadow-[0_18px_50px_rgba(212,180,131,0.28)] transition-transform hover:scale-[1.02] disabled:cursor-wait disabled:opacity-60"
              >
                {submitStatus === "sending" ? "Wysyłanie..." : "Wyślij prośbę o termin"}
              </button>

              <a
                href={booksyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#D4B483] px-7 py-4 text-center font-medium text-black shadow-[0_18px_50px_rgba(212,180,131,0.28)] transition-transform hover:scale-[1.02]"
              >
                Zarezerwuj przez Booksy
              </a>

              <Link
                href="/cennik"
                className="rounded-full border border-[#D4B483] px-7 py-4 text-center font-medium text-[#876536] transition-colors hover:bg-[#D4B483] hover:text-black"
              >
                Zobacz cennik usług
              </Link>
            </div>

            {submitMessage && (
              <p
                role="status"
                className={`mt-5 text-center text-sm font-medium ${
                  submitStatus === "success" ? "text-emerald-700" : "text-red-700"
                }`}
              >
                {submitMessage}
              </p>
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
          </form>

          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-[#E8DED2] bg-white/70 p-6 shadow-[0_24px_70px_rgba(80,55,25,0.08)] sm:p-8">
              <h2 className="text-3xl font-light">Wybrana usługa</h2>
              <div className="mt-6 rounded-3xl bg-[#F8F5F2] p-6">
                <div className="text-2xl font-medium">{selected?.name}</div>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-[#6D6B68]">
                  <span className="rounded-full border border-[#E8DED2] bg-white px-4 py-2">
                    {selected?.price}
                  </span>
                  <span className="rounded-full border border-[#E8DED2] bg-white px-4 py-2">
                    {selected?.duration}
                  </span>
                </div>
              </div>
              <p className="mt-5 leading-relaxed text-[#625b53]">
                Ceny i czas trwania są orientacyjne. Jeśli termin będzie
                niedostępny, salon zaproponuje najbliższą możliwą godzinę.
                Pełną listę usług znajdziesz w{" "}
                <Link
                  href="/cennik"
                  className="font-medium text-[#7C6238] underline underline-offset-4"
                >
                  cenniku Noblu Beauty Room
                </Link>
                .
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#E8DED2] bg-white/70 p-6 shadow-[0_24px_70px_rgba(80,55,25,0.08)] sm:p-8">
              <h2 className="text-3xl font-light">Kontakt</h2>
              <div className="mt-6 grid gap-3 text-[#625b53]">
                <a
                  href="tel:+48662989534"
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
                <div>Orzechowa 4/lok.1, 30-422 Kraków</div>
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
                Poniedziałek - piątek: 10:00 - 19:30
              </p>
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
