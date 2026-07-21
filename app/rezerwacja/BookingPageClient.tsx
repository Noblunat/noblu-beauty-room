"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type Service = {
  name: string;
  category: string;
  duration: string;
  price: string;
};

const services: Service[] = [
  {
    name: "Stylizacja hybrydowa",
    category: "Paznokcie",
    duration: "ok. 1h 30min",
    price: "od 160 zl",
  },
  {
    name: "Przedluzenie zelowe",
    category: "Paznokcie",
    duration: "ok. 2h 30min",
    price: "od 220 zl",
  },
  {
    name: "Pedicure SPA",
    category: "Pedicure",
    duration: "ok. 1h 30min",
    price: "od 180 zl",
  },
  {
    name: "Pedicure SPA z hybryda",
    category: "Pedicure",
    duration: "ok. 1h 45min",
    price: "od 200 zl",
  },
  {
    name: "Aplikacja rzes 1:1",
    category: "Rzesy",
    duration: "ok. 2h 30min",
    price: "190 zl",
  },
  {
    name: "Aplikacja rzes 2D",
    category: "Rzesy",
    duration: "ok. 3h",
    price: "210 zl",
  },
  {
    name: "Aplikacja rzes 3D",
    category: "Rzesy",
    duration: "ok. 3h",
    price: "220 zl",
  },
  {
    name: "Uzupelnienie rzes",
    category: "Rzesy",
    duration: "ok. 2h 15-45min",
    price: "od 160 zl",
  },
];

const timeSlots = [
  "09:00",
  "10:30",
  "12:00",
  "13:30",
  "15:00",
  "16:30",
  "18:00",
];

export default function BookingPageClient() {
  const [serviceName, setServiceName] = useState(services[0].name);
  const [date, setDate] = useState("");
  const [time, setTime] = useState(timeSlots[2]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  const selectedService = useMemo(
    () => services.find((service) => service.name === serviceName) ?? services[0],
    [serviceName]
  );

  const minDate = useMemo(() => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localDate = new Date(now.getTime() - offset * 60 * 1000);
    return localDate.toISOString().split("T")[0];
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F5F2] text-[#1D1D1B]">
      <section className="relative min-h-screen px-5 py-8 lg:px-12 lg:py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,180,131,0.32),transparent_34%),linear-gradient(135deg,#fffdfb_0%,#f8f5f2_46%,#efe7dd_100%)]" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(212,180,131,0.22),transparent_54%)]" />

        <div className="relative mx-auto max-w-7xl">
          <header className="mb-10 flex items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-sm text-[#6D6B68] transition-colors hover:text-[#1D1D1B]"
            >
              <span className="text-xl" aria-hidden="true">
                ←
              </span>
              Wroc na strone glowna
            </Link>

            <Image
              src="/logo.png"
              alt="Noblu Beauty Room"
              width={72}
              height={72}
              className="h-14 w-14 object-contain"
              priority
            />
          </header>

          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <div>
              <div className="mb-8 max-w-2xl">
                <h1 className="text-5xl font-light leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                  Zapytaj o termin
                  <span className="block text-[#7C6238]">w Noblu</span>
                </h1>
                <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#6D6B68]">
                  Prosba o wizyte nie blokuje terminu automatycznie, a
                  ostateczne potwierdzenie otrzymasz od salonu.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="rounded-[2rem] border border-[#E8DED2] bg-white/75 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-8"
              >
                <div className="mb-8">
                  <label className="mb-4 block text-sm uppercase tracking-[0.22em] text-[#7C6238]">
                    Usluga
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {services.map((service) => {
                      const active = service.name === serviceName;

                      return (
                        <button
                          key={service.name}
                          type="button"
                          onClick={() => setServiceName(service.name)}
                          className={`rounded-2xl border p-4 text-left transition-all ${
                            active
                              ? "border-[#D4B483] bg-[#F3E4CE] shadow-[0_14px_35px_rgba(212,180,131,0.22)]"
                              : "border-[#E8DED2] bg-white/80 hover:border-[#D4B483]/70"
                          }`}
                        >
                          <span className="block text-lg font-medium">
                            {service.name}
                          </span>
                          <span className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#6D6B68]">
                            <span>{service.category}</span>
                            <span>{service.duration}</span>
                            <span>{service.price}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-8 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="booking-date"
                      className="mb-3 block text-sm uppercase tracking-[0.22em] text-[#7C6238]"
                    >
                      Dzien
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      min={minDate}
                      value={date}
                      onChange={(event) => setDate(event.target.value)}
                      className="h-14 w-full rounded-2xl border border-[#E8DED2] bg-white px-4 text-base outline-none transition-colors focus:border-[#D4B483]"
                    />
                  </div>

                  <div>
                    <label className="mb-3 block text-sm uppercase tracking-[0.22em] text-[#7C6238]">
                      Godzina
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTime(slot)}
                          className={`h-14 rounded-2xl border text-sm transition-all ${
                            slot === time
                              ? "border-[#D4B483] bg-[#D4B483] text-black"
                              : "border-[#E8DED2] bg-white hover:border-[#D4B483]/70"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-8 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="booking-name"
                      className="mb-3 block text-sm uppercase tracking-[0.22em] text-[#7C6238]"
                    >
                      Imie
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Natalia"
                      className="h-14 w-full rounded-2xl border border-[#E8DED2] bg-white px-4 text-base outline-none transition-colors placeholder:text-[#A39A90] focus:border-[#D4B483]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="booking-phone"
                      className="mb-3 block text-sm uppercase tracking-[0.22em] text-[#7C6238]"
                    >
                      Telefon
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="+48 600 000 000"
                      className="h-14 w-full rounded-2xl border border-[#E8DED2] bg-white px-4 text-base outline-none transition-colors placeholder:text-[#A39A90] focus:border-[#D4B483]"
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="booking-note"
                    className="mb-3 block text-sm uppercase tracking-[0.22em] text-[#7C6238]"
                  >
                    Wiadomosc
                  </label>
                  <textarea
                    id="booking-note"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    rows={4}
                    placeholder="Napisz, jaki efekt lub termin bedzie dla Ciebie najlepszy."
                    className="w-full resize-none rounded-2xl border border-[#E8DED2] bg-white px-4 py-4 text-base outline-none transition-colors placeholder:text-[#A39A90] focus:border-[#D4B483]"
                  />
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    className="inline-flex h-14 items-center justify-center rounded-full bg-[#D4B483] px-8 font-medium text-black shadow-[0_18px_45px_rgba(212,180,131,0.28)] transition-transform hover:scale-[1.02]"
                  >
                    Wyslij prosbe o termin
                  </button>

                  <a
                    href="https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-14 items-center justify-center rounded-full bg-[#D4B483] px-8 font-medium text-black shadow-[0_18px_45px_rgba(212,180,131,0.28)] transition-transform hover:scale-[1.02]"
                  >
                    Rezerwuj przez Booksy
                  </a>
                </div>

                {sent && (
                  <div className="mt-6 rounded-2xl border border-[#D4B483]/50 bg-[#F7ECD9] p-4 text-[#5F4A2C]">
                    To tylko test formularza. Docelowo po kliknieciu mozemy
                    wysylac prosbe na e-mail, SMS albo do panelu rezerwacji.
                  </div>
                )}
              </form>
            </div>

            <aside className="lg:sticky lg:top-8">
              <div className="overflow-hidden rounded-[2rem] border border-[#E8DED2] bg-white/55 shadow-[0_24px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/gallery/salon/salon11-hero.webp"
                    alt="Wnetrze Noblu Beauty Room Krakow"
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                </div>

                <div className="p-5 sm:p-8">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "★★★★★ 5.0", label: "z 208 opinii" },
                      { value: "24/7", label: "Formularz online" },
                      { value: "Darmowy", label: "parking pod salonem" },
                    ].map((item) => (
                      <div
                        key={item.value}
                        className="rounded-2xl border border-[#E8DED2] bg-white/78 p-4"
                      >
                        <div className="text-lg font-semibold leading-tight sm:text-2xl">
                          {item.value}
                        </div>
                        <div className="mt-2 text-sm text-[#6D6B68]">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="mt-6 text-sm leading-relaxed text-[#6D6B68]">
                    Formularz nie blokuje terminu automatycznie. Ostateczne
                    potwierdzenie wizyty otrzymasz od salonu.
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-[2rem] border border-[#E8DED2] bg-white/70 p-6 backdrop-blur-xl">
                <div className="mb-4 text-sm uppercase tracking-[0.22em] text-[#7C6238]">
                  Podsumowanie
                </div>

                <dl className="space-y-4 text-sm">
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-[#6D6B68]">Usluga</dt>
                    <dd className="text-right font-medium">{selectedService.name}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-[#6D6B68]">Termin</dt>
                    <dd className="text-right font-medium">
                      {date ? `${date}, ${time}` : `wybierz dzien, ${time}`}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-[#6D6B68]">Czas</dt>
                    <dd className="text-right font-medium">
                      {selectedService.duration}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-[#6D6B68]">Cena</dt>
                    <dd className="text-right font-medium">
                      {selectedService.price}
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
