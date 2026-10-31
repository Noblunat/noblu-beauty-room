
import { business } from "../lib/business";
import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd";
import ServiceJsonLd from "../components/ServiceJsonLd";
import SalonHygiene from "../components/SalonHygiene";
import SalonTeam from "../components/SalonTeam";
import ServiceVariants from "../components/ServiceVariants";
import { pedicurePrices, serviceOffers, servicePrice } from "../lib/priceCatalog";
import ServiceGallery from "../components/ServiceGallery";

export const metadata: Metadata = {
  title: "Pedicure Kraków Borek Fałęcki | Hybrydowy i SPA | Noblu",
  description:
    "Pedicure kosmetyczny i hybrydowy w Krakowie na Borku Fałęckim. Dobry dojazd z Podgórza, darmowy parking, cennik i zapytanie o termin online.",
  alternates: {
    canonical: `${business.url}/pedicure-krakow`,
  },
  openGraph: {
    title: "Pedicure Kraków Borek Fałęcki | Hybrydowy i SPA | Noblu",
    description:
      `Pedicure kosmetyczny, hybrydowy i SPA w ${business.name} w Krakowie, Borek Fałęcki. Zobacz cennik i zapytaj o termin online.`,
    url: `${business.url}/pedicure-krakow`,
    siteName: business.name,
    images: [{
      url: `${business.url}/gallery/paznokcie/pedicure-hybrydowy-krakow-noblu.webp`,
      alt: `Pedicure hybrydowy w ${business.name} Kraków Borek Fałęcki`,
    }],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pedicure Kraków Borek Fałęcki | Hybrydowy i SPA | Noblu",
    description:
      `Pedicure kosmetyczny, hybrydowy i SPA w ${business.name} w Krakowie, Borek Fałęcki. Zobacz cennik i zapytaj o termin online.`,
    images: [`${business.url}/gallery/paznokcie/pedicure-hybrydowy-krakow-noblu.webp`],
  },
};

const faq = [
  {
    q: "Gdzie wykonać pedicure w Krakowie, Borek Fałęcki?",
    a: `Pedicure w ${business.name} wykonasz przy ul. ${business.address.streetLocative} w Krakowie, na Borku Fałęckim. Przy salonie jest darmowy parking.`,
  },
  {
    q: "Czy salon wykonuje pedicure hybrydowy?",
    a: "Tak. W Noblu możesz wybrać pedicure samych paznokci, pedicure hybrydowy, pedicure kosmetyczny lub pedicure kosmetyczny z hybrydą.",
  },
  {
    q: "Jak zarezerwować pedicure?",
    a: "Wybierz wariant pedicure, stylistkę i dostępny termin w Booksy. Możesz też wysłać prośbę przez formularz Noblu; wtedy salon potwierdzi dostępność SMS-em lub telefonicznie. Samo wysłanie formularza nie rezerwuje godziny.",
  },
  {
    q: "Ile kosztuje pedicure w Krakowie?",
    a: `Pedicure samych paznokci bez hybrydy u Julii (stylistki junior) kosztuje ${servicePrice("pedicure-paznokcie-bez-hybrydy-julia")}, a u Natalii ${servicePrice("pedicure-paznokcie-bez-hybrydy-natalia")}. Hybryda samych paznokci u Julii (stylistki junior) kosztuje ${servicePrice("pedicure-paznokcie-hybryda-julia")}, a u Natalii ${servicePrice("pedicure-paznokcie-hybryda-natalia")}. Pełny pedicure SPA bez hybrydy kosztuje ${servicePrice("pedicure-spa-bez-hybrydy-natalia")}, a z hybrydą ${servicePrice("pedicure-spa-hybryda-natalia")}.`,
  },
  {
    q: "Czym różni się pedicure SPA od opracowania samych paznokci?",
    a: "Pedicure samych paznokci obejmuje paznokcie i skórki. Wariant SPA obejmuje także kąpiel oraz opracowanie stóp. Obie opcje mają wariant z hybrydą lub bez niej.",
  },
];

export default function PedicureKrakowPage() {
  return (
    <main className="min-h-screen bg-[#F8F5F2] text-[#1D1D1B]">
      <BreadcrumbJsonLd
        items={[
          {
            name: "Pedicure Kraków",
            url: `${business.url}/pedicure-krakow`,
          },
        ]}
      />
      <ServiceJsonLd
        name="Pedicure Kraków Borek Fałęcki"
        description={`Pedicure kosmetyczny, pedicure hybrydowy i estetyczna pielęgnacja stóp w ${business.name} w Krakowie, na Borku Fałęckim.`}
        serviceType="Pedicure"
        url={`${business.url}/pedicure-krakow`}
        offers={serviceOffers(pedicurePrices)}
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
            Pedicure Kraków Borek Fałęcki
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light leading-tight">
            Pedicure Kraków
            <span className="block text-[#7C6238]">{"\u00A0-\u00A0Borek Fałęcki"}</span>
          </h1>

          <p className="mt-10 text-lg text-[#6D6B68] leading-relaxed max-w-3xl">
            {business.name} oferuje pedicure kosmetyczny i hybrydowy w
            Krakowie, na Borku Fałęckim, dla kobiet, które cenią estetykę,
            komfort i dokładne wykończenie. Salon znajduje się przy ul.{" "}
            {business.address.shortStreetLocative}, a pod budynkiem dostępny jest darmowy parking.
            Przyjmujemy nowe klientki na pedicure.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
              <a href={business.links.booksyBooking} target="_blank" rel="noopener noreferrer" data-service-name="Pedicure" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#D4B483] px-8 py-4 font-medium text-black transition-colors hover:bg-[#C9A571] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C6238]">
                Zarezerwuj przez Booksy
              </a>
            <Link
              href="/rezerwacja?usluga=pedicure-spa-bez-hybrydy-natalia"
              className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform shadow-[0_20px_60px_rgba(212,180,131,0.35)]"
            >
              SPA bez hybrydy — {servicePrice("pedicure-spa-bez-hybrydy-natalia")}
            </Link>
            <Link
              href="/rezerwacja?usluga=pedicure-spa-hybryda-natalia"
              className="inline-flex items-center justify-center rounded-full border border-[#D4B483] px-10 py-5 font-medium text-[#876536] transition-colors hover:bg-[#D4B483] hover:text-black"
            >
              SPA z hybrydą — {servicePrice("pedicure-spa-hybryda-natalia")}
            </Link>
            <Link
              href="/rezerwacja?usluga=pedicure-paznokcie-hybryda-natalia"
              className="inline-flex items-center justify-center rounded-full border border-[#D4B483] px-10 py-5 font-medium text-[#876536] transition-colors hover:bg-[#D4B483] hover:text-black"
            >
              Same paznokcie z hybrydą u Natalii — {servicePrice("pedicure-paznokcie-hybryda-natalia")}
            </Link>
            <Link
              href="/cennik"
              className="inline-flex items-center justify-center rounded-full border border-[#D4B483] px-10 py-5 font-medium text-[#876536] transition-colors hover:bg-[#D4B483] hover:text-black"
            >
              Zobacz cennik pedicure
            </Link>
          </div>
        </div>
      </section>

      <ServiceGallery
        id="pedicure-gallery-title"
        title="Realizacje pedicure"
        images={[
          {
            src: "/gallery/paznokcie/pedicure-hybrydowy-krakow-noblu.webp",
            alt: `Pedicure z bordowym lakierem na paznokciach stóp w ${business.name}`,
            caption: `Pedicure z bordowym lakierem — realizacja ${business.name}.`,
          },
          {
            src: "/gallery/paznokcie/pedicure-kobaltowy-noblu.jpg",
            alt: "Paznokcie stóp z połyskującą kobaltową hybrydą",
            caption: `Pedicure hybrydowy w kolorze kobaltowym — realizacja ${business.name}.`,
          },
        ]}
      />

      <SalonTeam />
      <ServiceVariants pedicure />
      <SalonHygiene />

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
              Pedicure samych paznokci bez hybrydy u Julii (stylistki junior) kosztuje {servicePrice("pedicure-paznokcie-bez-hybrydy-julia")}, a u Natalii {servicePrice("pedicure-paznokcie-bez-hybrydy-natalia")}.
              Wariant z hybrydą u Julii (stylistki junior) kosztuje {servicePrice("pedicure-paznokcie-hybryda-julia")},
              a u Natalii {servicePrice("pedicure-paznokcie-hybryda-natalia")}. Wszystkie opcje są opisane w <Link href="/cennik" className="font-medium text-[#876536] underline underline-offset-4">cenniku pedicure</Link>.
            </p>
            <p className="mt-4">
              Przy wyborze usługi zaznacz, czy zależy Ci na samych paznokciach,
              czy na pielęgnacji całych stóp. Jeśli masz już hybrydę, uwzględnij
              jej usunięcie przy wyborze wariantu. Czas wizyty zależy od zakresu
              usługi i stylistki; sprawdzisz go w zestawieniu powyżej.
            </p>
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl font-light text-[#1D1D1B] mb-6">
              Pedicure na Borku Fałęckim - dobry dojazd z południa Krakowa
            </h2>
            <p>
              Salon znajduje się przy ul. {business.address.streetLocative} w Krakowie, na
              Borku Fałęckim. To dogodna lokalizacja dla klientek z Łagiewnik,
              Ruczaju, Kurdwanowa, Swoszowic, Woli Duchackiej oraz osób
              dojeżdżających z Podgórza.
            </p>
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl font-light text-[#1D1D1B] mb-6">
              Wizyta u Natalii lub Julii
            </h2>
            <p>
              Natalia wykonuje warianty SPA i pielęgnację samych paznokci.
              U Julii możesz umówić hybrydę samych paznokci albo jej usunięcie z opracowaniem paznokci.
              W formularzu wybierzesz konkretny wariant i stylistkę.
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
              Wybierz dostępny termin w Booksy albo wyślij prośbę przez formularz.
              Zapytanie z formularza potwierdzimy SMS-em lub telefonicznie.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={business.links.booksyBooking} target="_blank" rel="noopener noreferrer" data-service-name="Pedicure" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#D4B483] px-8 py-4 font-medium text-black transition-colors hover:bg-[#C9A571] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C6238]">
                Zarezerwuj przez Booksy
              </a>
              <Link
                href="/rezerwacja?usluga=pedicure-spa-bez-hybrydy-natalia"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform shadow-[0_20px_60px_rgba(212,180,131,0.35)]"
              >
                SPA bez hybrydy — {servicePrice("pedicure-spa-bez-hybrydy-natalia")}
              </Link>
              <Link
                href="/rezerwacja?usluga=pedicure-spa-hybryda-natalia"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-[#E8DED2] text-[#1D1D1B] hover:border-[#D4B483] transition-colors"
              >
                SPA z hybrydą — {servicePrice("pedicure-spa-hybryda-natalia")}
              </Link>
              <Link
                href="/rezerwacja?usluga=pedicure-paznokcie-hybryda-natalia"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-[#E8DED2] text-[#1D1D1B] hover:border-[#D4B483] transition-colors"
              >
                Same paznokcie z hybrydą — {servicePrice("pedicure-paznokcie-hybryda-natalia")}
              </Link>
              <Link
                href="/cennik"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-[#E8DED2] text-[#1D1D1B] hover:border-[#D4B483] transition-colors"
              >
                Zobacz cennik pedicure
              </Link>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap gap-4">
            <a href="/manicure-krakow" className="text-[#7C6238]">
              Manicure Kraków
            </a>
            <a href="/przedluzanie-rzes-krakow" className="text-[#7C6238]">
              Przedłużanie rzęs Kraków
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
