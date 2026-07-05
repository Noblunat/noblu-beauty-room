import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd";
import ServiceJsonLd from "../components/ServiceJsonLd";

const booksyUrl =
  "https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow";

export const metadata: Metadata = {
  title: "Pedicure Kraków Podgórze | Kosmetyczny i hybrydowy | Noblu",
  description:
    "Pedicure kosmetyczny i hybrydowy w Krakowie Podgórzu. Noblu Beauty Room, ul. Orzechowa 4. Darmowy parking i zapytanie o termin online.",
  alternates: {
    canonical: "https://noblu.pl/pedicure-krakow",
  },
  openGraph: {
    title: "Pedicure Kraków Podgórze | Kosmetyczny i hybrydowy | Noblu",
    description:
      "Pedicure kosmetyczny, hybrydowy i SPA w Krakowie Podgórzu. Darmowy parking i wygodne zapytanie o termin online.",
    url: "https://noblu.pl/pedicure-krakow",
    siteName: "Noblu Beauty Room",
    images: [{
      url: "https://noblu.pl/gallery/paznokcie/pedicure-spa-img-7870.webp",
      alt: "Pedicure SPA w Noblu Beauty Room Kraków",
    }],
    locale: "pl_PL",
    type: "website",
  },
};

const faq = [
  {
    q: "Gdzie wykonać pedicure w Krakowie?",
    a: "Pedicure w Noblu Beauty Room wykonasz przy ul. Orzechowej 4/lok.1 w Krakowie, w wygodnej lokalizacji dla południowych dzielnic miasta.",
  },
  {
    q: "Czy salon wykonuje pedicure hybrydowy?",
    a: "Tak. W Noblu możesz wybrać pedicure samych paznokci, pedicure hybrydowy, pedicure kosmetyczny lub pedicure kosmetyczny z hybrydą.",
  },
  {
    q: "Jak zarezerwować pedicure?",
    a: "Wyślij prośbę o termin przez formularz rezerwacji Noblu. Salon potwierdzi dostępność SMS-em lub telefonicznie.",
  },
  {
    q: "Ile kosztuje pedicure w Krakowie?",
    a: "Pedicure samych paznokci kosztuje od 110 zł, pedicure z hybrydą od 160 zł, a pełny pedicure kosmetyczny od 180 zł.",
  },
];

export default function PedicureKrakowPage() {
  return (
    <main className="min-h-screen bg-[#F8F5F2] text-[#1D1D1B]">
      <BreadcrumbJsonLd
        items={[
          {
            name: "Pedicure Kraków",
            url: "https://noblu.pl/pedicure-krakow",
          },
        ]}
      />
      <ServiceJsonLd
        name="Pedicure Kraków Podgórze"
        description="Pedicure kosmetyczny, pedicure hybrydowy i estetyczna pielęgnacja stóp w Noblu Beauty Room w Krakowie."
        serviceType="Pedicure"
        url="https://noblu.pl/pedicure-krakow"
        offers={[
          { name: "Pedicure same paznokcie", price: "110" },
          { name: "Pedicure same paznokcie z hybrydą", price: "160" },
          { name: "Pedicure kosmetyczny", price: "180" },
          { name: "Pedicure kosmetyczny z hybrydą", price: "200" },
        ]}
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
          <div className="text-sm uppercase tracking-[0.3em] text-[#D4B483] mb-6">
            Pedicure Kraków
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light leading-tight">
            Pedicure Kraków
            <span className="block text-[#D4B483]">Podgórze</span>
          </h1>

          <p className="mt-10 text-lg text-[#6D6B68] leading-relaxed max-w-3xl">
            Noblu Beauty Room oferuje pedicure kosmetyczny i hybrydowy w
            Krakowie Podgórzu dla kobiet, które cenią estetykę, komfort i
            dokładne wykończenie. Salon znajduje się przy ul. Orzechowej 4,
            a pod budynkiem dostępny jest darmowy parking.
          </p>

          <div className="mt-12">
            <Link
              href="/rezerwacja"
              className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(212,180,131,0.25)]"
            >
              Zapytaj o termin pedicure
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto grid gap-10 text-lg leading-relaxed text-[#5F5B56]">
          <div>
            <h2 className="text-3xl lg:text-4xl font-light text-[#1D1D1B] mb-6">
              Pedicure kosmetyczny i hybrydowy w Krakowie
            </h2>
            <p>
              W ofercie znajdziesz pedicure samych paznokci, pedicure z hybrydą,
              pedicure kosmetyczny oraz pedicure kosmetyczny z hybrydą. Każdy
              zabieg dobieramy do potrzeb stóp i oczekiwanego efektu, dbając o
              higienę, dokładność i komfort wizyty.
            </p>
            <p className="mt-4">
              Ceny zaczynają się od 110 zł za pedicure samych paznokci i od
              160 zł za wariant z hybrydą. Wszystkie opcje są opisane w <Link href="/cennik" className="font-medium text-[#876536] underline underline-offset-4">cenniku pedicure</Link>.
            </p>
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl font-light text-[#1D1D1B] mb-6">
              Pedicure Kraków Podgórze i okolice
            </h2>
            <p>
              Salon znajduje się przy ul. Orzechowej 4/lok.1 w Krakowie. To
              dogodna lokalizacja dla klientek z Podgórza, Podgórza Duchackiego,
              Łagiewnik, Borku Fałęckiego, Ruczaju, Kurdwanowa, Woli Duchackiej
              i Swoszowic.
            </p>
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl font-light text-[#1D1D1B] mb-6">
              Komfortowa rezerwacja online
            </h2>
            <p>
              Prośbę o termin pedicure możesz wysłać przez nasz formularz bez
              dzwonienia. Potwierdzimy dostępność SMS-em lub telefonicznie. Na
              miejscu stawiamy na spokojną atmosferę, czystość i precyzję.
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
              Umów pedicure w Krakowie
            </h2>
            <p className="max-w-3xl">
              Wybierz dogodny termin przez Booksy i zadbaj o estetyczną
              pielęgnację stóp w Noblu Beauty Room przy ul. Orzechowej.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/rezerwacja"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform"
              >
                Zapytaj o termin
              </Link>
              <Link
                href="/cennik"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-[#E8DED2] text-[#1D1D1B] hover:border-[#D4B483] transition-colors"
              >
                Sprawdź cennik
              </Link>
              <a
                href={booksyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-[#B08B57]"
              >
                Zarezerwuj przez Booksy
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap gap-4">
            <a href="/manicure-krakow" className="text-[#B08B57]">
              Manicure Kraków
            </a>
            <a href="/stylizacja-hybrydowa-krakow" className="text-[#B08B57]">
              Stylizacja hybrydowa Kraków
            </a>
            <a href="/stylizacja-rzes-krakow" className="text-[#B08B57]">
              Stylizacja rzęs Kraków
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
