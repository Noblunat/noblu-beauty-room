import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd";
import ServiceJsonLd from "../components/ServiceJsonLd";

export const metadata: Metadata = {
  title: "Manicure Kraków Borek Fałęcki | Hybryda i paznokcie | Noblu",
  description:
    "Manicure i paznokcie hybrydowe w Krakowie, Borek Fałęcki. Noblu Beauty Room przy ul. Orzechowej 4. Darmowy parking i zapytanie o termin online.",
  alternates: {
    canonical: "https://noblu.pl/manicure-krakow",
  },
  openGraph: {
    title: "Manicure Kraków Borek Fałęcki | Hybryda i paznokcie | Noblu",
    description:
      "Manicure, paznokcie hybrydowe i stylizacja paznokci w Krakowie, Borek Fałęcki. Zapytaj o termin online.",
    url: "https://noblu.pl/manicure-krakow",
    siteName: "Noblu Beauty Room",
    images: [{
      url: "https://noblu.pl/gallery/paznokcie/IMG_6334.webp",
      alt: "Manicure w Noblu Beauty Room Kraków",
    }],
    locale: "pl_PL",
    type: "website",
  },
};

const faq = [
  {
    q: "Gdzie znajduje się salon Noblu Beauty Room?",
    a: "Salon znajduje się przy ul. Orzechowej 4/lok.1 w Krakowie, na Borku Fałęckim. To wygodna lokalizacja także dla klientek z Łagiewnik, Ruczaju, Kurdwanowa, Swoszowic i Podgórza.",
  },
  {
    q: "Czy można zarezerwować manicure online?",
    a: "Tak. Możesz wysłać prośbę o termin przez formularz Noblu, a salon potwierdzi dostępność SMS-em lub telefonicznie.",
  },
  {
    q: "Jakie stylizacje paznokci wykonuje salon?",
    a: "W Noblu Beauty Room wykonywany jest manicure premium, stylizacja paznokci, manicure hybrydowy oraz estetyczne, naturalne stylizacje.",
  },
  {
    q: "Ile kosztuje manicure w Krakowie?",
    a: "Manicure w Noblu Beauty Room kosztuje 100 zł, a stylizacja hybrydowa od 160 zł. Aktualne ceny wszystkich wariantów znajdują się w cenniku salonu.",
  },
];

export default function ManicureKrakowPage() {
  return (
    <main className="min-h-screen bg-[#F8F5F2] text-[#1D1D1B]">
      <BreadcrumbJsonLd
        items={[
          {
            name: "Manicure Kraków",
            url: "https://noblu.pl/manicure-krakow",
          },
        ]}
      />
      <ServiceJsonLd
        name="Manicure Kraków"
        description="Manicure premium i estetyczna pielęgnacja paznokci w Noblu Beauty Room w Krakowie."
        serviceType="Manicure"
        url="https://noblu.pl/manicure-krakow"
        offers={[{ name: "Manicure", price: "100" }]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
          }),
        }}
      />

      <section className="pt-40 pb-20 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-sm uppercase tracking-[0.3em] text-[#7C6238] mb-6">
            Manicure Kraków
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light leading-tight">
            Manicure Kraków
            <span className="block text-[#7C6238]">Borek Fałęcki</span>
          </h1>

          <p className="mt-10 text-lg text-[#6D6B68] leading-relaxed max-w-3xl">
            Noblu Beauty Room to kameralny salon manicure w Krakowie, na Borku
            Fałęckim, oferujący manicure, stylizację paznokci i manicure
            hybrydowy. Pracujemy z dbałością o estetykę, higienę i naturalny
            efekt. Salon znajduje się przy ul. Orzechowej 4, z darmowym
            parkingiem.
          </p>

          <div className="mt-12">
            <a
              href="/rezerwacja"
              className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(212,180,131,0.25)]"
            >
              Zarezerwuj manicure
            </a>
          </div>
        </div>
      </section>

      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto grid gap-10 text-lg leading-relaxed text-[#5F5B56]">
          <div>
            <h2 className="text-3xl lg:text-4xl font-light text-[#1D1D1B] mb-6">
              Paznokcie w Krakowie dla kobiet ceniących dokładność
            </h2>
            <p>
              Jeśli szukasz miejsca na manicure w Krakowie, paznokcie hybrydowe
              lub estetyczną stylizację paznokci, Noblu Beauty Room łączy
              precyzyjne wykonanie z elegancką atmosferą. Stawiamy na czystą,
              dopracowaną stylizację: od naturalnych odcieni nude po bardziej
              wyraziste kolory i minimalistyczne zdobienia.
            </p>
            <p className="mt-4">
              Manicure kosztuje 100 zł, a stylizacja hybrydowa od 160 zł.
              Szczegółowe ceny znajdziesz w <Link href="/cennik" className="font-medium text-[#876536] underline underline-offset-4">cenniku Noblu</Link>.
            </p>
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl font-light text-[#1D1D1B] mb-6">
              Manicure na Borku Fałęckim — dobry dojazd z południa Krakowa
            </h2>
            <p>
              Salon znajduje się przy ul. Orzechowej 4/lok.1 w Krakowie. To
              wygodna lokalizacja na Borku Fałęckim dla klientek z Łagiewnik,
              Ruczaju, Kurdwanowa, Swoszowic, Woli Duchackiej oraz osób
              dojeżdżających z Podgórza.
            </p>
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl font-light text-[#1D1D1B] mb-6">
              Jak wygląda wizyta?
            </h2>
            <p>
              Podczas wizyty dobieramy kształt, kolor i wykończenie stylizacji
              do naturalnej płytki oraz oczekiwanego efektu. Dbamy o komfort,
              sterylność narzędzi i spokojne tempo pracy, aby manicure był nie
              tylko estetyczny, ale też trwały i dopracowany w detalu.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 pt-4">
            {faq.map((item) => (
              <div
                key={item.q}
                className="rounded-[2rem] border border-[#E8DED2] bg-white/70 p-6"
              >
                <h3 className="text-xl text-[#1D1D1B] mb-4">{item.q}</h3>
                <p className="text-base leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[2rem] border border-[#E8DED2] bg-white/80 p-8 lg:p-10">
            <h2 className="text-3xl lg:text-4xl font-light text-[#1D1D1B] mb-5">
              Umów manicure w Noblu Beauty Room
            </h2>
            <p className="max-w-3xl">
              Wybierz dogodny termin online i zarezerwuj manicure w kameralnym
              salonie beauty przy ul. Orzechowej 4/lok.1 w Krakowie.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/rezerwacja"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform"
              >
                Zapytaj o termin
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-[#E8DED2] text-[#1D1D1B] hover:border-[#D4B483] transition-colors"
              >
                Wróć do strony głównej
              </Link>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap gap-4">
            <a href="/stylizacja-hybrydowa-krakow" className="text-[#7C6238]">
              Stylizacja hybrydowa Kraków
            </a>
            <a href="/pedicure-krakow" className="text-[#7C6238]">
              Pedicure Kraków
            </a>
            <a href="/stylizacja-rzes-krakow" className="text-[#7C6238]">
              Stylizacja rzęs Kraków
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
