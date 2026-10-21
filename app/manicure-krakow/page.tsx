import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd";
import ServiceJsonLd from "../components/ServiceJsonLd";

export const metadata: Metadata = {
  title: "Manicure Kraków | Paznokcie hybrydowe Borek Fałęcki | Noblu",
  description:
    "Manicure hybrydowy i żelowy w Krakowie na Borku Fałęckim. Zobacz realizacje, ceny i czasy wizyt. Darmowy parking przy Orzechowej 4/lok.1.",
  alternates: {
    canonical: "https://noblu.pl/manicure-krakow",
  },
  openGraph: {
    title: "Manicure Kraków | Paznokcie hybrydowe Borek Fałęcki | Noblu",
    description:
      "Manicure, paznokcie hybrydowe i stylizacja paznokci w Krakowie, Borek Fałęcki. Sprawdź ceny i zapytaj o termin online.",
    url: "https://noblu.pl/manicure-krakow",
    siteName: "Noblu Beauty Room",
    images: [{
      url: "https://noblu.pl/gallery/paznokcie/manicure-hybrydowy-nude-krakow-noblu.webp",
      alt: "Naturalny manicure hybrydowy nude Noblu Beauty Room Kraków",
    }],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manicure Kraków | Paznokcie hybrydowe Borek Fałęcki | Noblu",
    description:
      "Manicure, paznokcie hybrydowe i stylizacja paznokci w Krakowie, Borek Fałęcki. Sprawdź ceny i zapytaj o termin online.",
    images: ["https://noblu.pl/gallery/paznokcie/manicure-hybrydowy-nude-krakow-noblu.webp"],
  },
};

const manicureGallery = [
  {
    src: "/gallery/manicure-realizacje/manicure-krotkie-nude-krakow-noblu.webp",
    alt: "Krótki manicure hybrydowy nude wykonany w Noblu Beauty Room Kraków",
  },
  {
    src: "/gallery/manicure-realizacje/french-brokatowy-krakow-noblu.webp",
    alt: "Manicure french z delikatnym brokatem wykonany w Noblu Beauty Room Kraków",
  },
  {
    src: "/gallery/manicure-realizacje/paznokcie-zelowe-perlowa-biel-krakow-noblu.webp",
    alt: "Długie paznokcie żelowe w perłowej bieli wykonane w Noblu Beauty Room Kraków",
  },
  {
    src: "/gallery/manicure-realizacje/manicure-burgund-kropki-krakow-noblu.webp",
    alt: "Burgundowy manicure w kropki wykonany w Noblu Beauty Room Kraków",
  },
  {
    src: "/gallery/manicure-realizacje/manicure-krotkie-czarno-biale-krakow-noblu.webp",
    alt: "Krótki czarno-biały manicure ze zdobieniem wykonany w Noblu Beauty Room Kraków",
  },
  {
    src: "/gallery/manicure-realizacje/manicure-ombre-zolty-krakow-noblu.webp",
    alt: "Żółty manicure ombre wykonany w Noblu Beauty Room Kraków",
  },
  {
    src: "/gallery/manicure-realizacje/paznokcie-zelowe-niebieskie-wzory-krakow-noblu.webp",
    alt: "Długie paznokcie żelowe z niebieskim zdobieniem wykonane w Noblu Beauty Room Kraków",
  },
  {
    src: "/gallery/manicure-realizacje/babyboomer-brzoskwiniowy-krakow-noblu.webp",
    alt: "Brzoskwiniowy manicure babyboomer wykonany w Noblu Beauty Room Kraków",
  },
];

const faq = [
  {
    q: "Gdzie znajduje się salon Noblu Beauty Room?",
    a: "Przy ul. Orzechowej 4/lok.1 w Krakowie, na Borku Fałęckim. Przy salonie jest darmowy parking.",
  },
  {
    q: "Czy można zarezerwować manicure online?",
    a: "Tak. Wyślij prośbę o termin przez formularz Noblu. Dostępność potwierdzimy SMS-em lub telefonicznie; samo wysłanie formularza nie rezerwuje godziny.",
  },
  {
    q: "Jakie stylizacje paznokci wykonuje salon?",
    a: "W Noblu Beauty Room wykonujemy manicure klasyczny i hybrydowy, stylizację żelową oraz naturalne i bardziej zdobione stylizacje paznokci.",
  },
  {
    q: "Ile kosztuje manicure w Krakowie?",
    a: "Manicure w Noblu Beauty Room kosztuje 100 zł, a stylizacja hybrydowa od 160 zł. Aktualne ceny wszystkich wariantów znajdują się w cenniku salonu.",
  },
  {
    q: "Jak przygotować się do wizyty?",
    a: "Przy wyborze usługi zaznacz, czy masz poprzednią hybrydę lub żel, i uprzedź o planowanych zdobieniach. Nie usuwaj stylizacji samodzielnie. Czas wybranej usługi sprawdzisz w cenniku.",
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
        description="Manicure i stylizacja paznokci w Noblu Beauty Room w Krakowie, w tym manicure hybrydowy i stylizacje żelowe."
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
            <span className="block text-[#7C6238]">{"\u00A0-\u00A0Borek Fałęcki"}</span>
          </h1>

          <p className="mt-10 text-lg text-[#6D6B68] leading-relaxed max-w-3xl">
            Manicure klasyczny, hybryda i stylizacja żelowa przy ul. Orzechowej
            4/lok.1. Wspólnie dobieramy długość, kształt i kolor do Twoich dłoni
            oraz codziennych zajęć. Przy salonie jest darmowy parking.
            Przyjmujemy nowe klientki.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="/rezerwacja?usluga=hybryda"
              className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform shadow-[0_20px_60px_rgba(212,180,131,0.35)]"
            >
              Hybryda od 160 zł — zapytaj
            </a>
            <Link
              href="/rezerwacja?usluga=manicure"
              className="inline-flex items-center justify-center rounded-full border border-[#D4B483] px-10 py-5 font-medium text-[#876536] transition-colors hover:bg-[#D4B483] hover:text-black"
            >
              Manicure klasyczny — 100 zł
            </Link>
            <Link
              href="/cennik"
              className="inline-flex items-center justify-center rounded-full border border-[#D4B483] px-10 py-5 font-medium text-[#876536] transition-colors hover:bg-[#D4B483] hover:text-black"
            >
              Zobacz cennik manicure
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="manicure-gallery-title" className="pb-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h2
            id="manicure-gallery-title"
            className="text-3xl font-light text-[#1D1D1B] sm:text-4xl lg:text-5xl"
          >
            Realizacje manicure
          </h2>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {manicureGallery.map((image) => (
              <figure
                key={image.src}
                className="relative aspect-[3/4] overflow-hidden rounded-[1.2rem] bg-[#E8DED2]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1280px) 276px, (min-width: 768px) 22vw, calc(50vw - 2rem)"
                  className="object-cover"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto grid gap-10 text-lg leading-relaxed text-[#5F5B56]">
          <div>
            <h2 className="text-3xl lg:text-4xl font-light text-[#1D1D1B] mb-6">
              Jak wygląda wizyta?
            </h2>
            <p>
              Zaczynamy od obejrzenia naturalnej płytki i ustalenia efektu.
              Następnie, zależnie od wybranej usługi, usuwamy poprzednią
              stylizację, opracowujemy skórki i kształt paznokci. Na koniec
              nakładamy kolor lub wykonujemy ustalone zdobienie. Jeśli masz
              inspirację, pokaż ją przed rozpoczęciem pracy.
            </p>
            <p className="mt-4">
              Manicure kosztuje 100 zł, a stylizacja hybrydowa od 160 zł.
              Szczegółowe ceny znajdziesz w <Link href="/cennik" className="font-medium text-[#876536] underline underline-offset-4">cenniku manicure i paznokci</Link>.
            </p>
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl font-light text-[#1D1D1B] mb-6">
              Hybryda czy żel?
            </h2>
            <p>
              Hybryda sprawdzi się, gdy chcesz kolor na naturalnych paznokciach
              bez ich przedłużania. Żel pozwala zbudować kształt, wzmocnić
              naturalną płytkę lub przedłużyć paznokcie. Metodę dobieramy do
              stanu płytki i planowanej długości, a nie tylko do zdjęcia inspiracji.
            </p>
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl font-light text-[#1D1D1B] mb-6">
              Jak długo utrzymuje się hybryda?
            </h2>
            <p>
              Orientacyjnie około 2 tygodni. Trwałość zależy od naturalnej
              płytki, tempa jej wzrostu, obciążeń podczas codziennych zajęć
              i pielęgnacji. To nie gwarancja identycznego czasu u każdej osoby.
              Gdy pojawi się odprysk lub odklejenie, umów poprawkę zamiast
              samodzielnie odrywać produkt.
            </p>
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl font-light text-[#1D1D1B] mb-6">
              Jak dbać o stylizację po wizycie?
            </h2>
            <p>
              Regularnie nawilżaj dłonie i skórki. Do sprzątania i dłuższego
              kontaktu z detergentami zakładaj rękawiczki. Nie używaj paznokci
              do podważania opakowań i nie zrywaj hybrydy ani żelu. Usunięcie
              lub zmianę stylizacji zaplanuj w salonie.
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
              Wybierz usługę i zgłoś preferowany dzień wizyty. Sprawdzimy grafik
              i potwierdzimy dostępność SMS-em lub telefonicznie.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/rezerwacja?usluga=hybryda"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform shadow-[0_20px_60px_rgba(212,180,131,0.35)]"
              >
                Hybryda od 160 zł — zapytaj
              </Link>
              <Link
                href="/rezerwacja?usluga=manicure"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-[#E8DED2] text-[#1D1D1B] hover:border-[#D4B483] transition-colors"
              >
                Manicure klasyczny — 100 zł
              </Link>
              <Link
                href="/cennik"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-[#E8DED2] text-[#1D1D1B] hover:border-[#D4B483] transition-colors"
              >
                Zobacz cennik manicure
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
            <a href="/przedluzanie-rzes-krakow" className="text-[#7C6238]">
              Przedłużanie rzęs Kraków
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
