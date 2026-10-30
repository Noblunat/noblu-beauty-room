
import { business } from "../lib/business";
import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd";
import ServiceJsonLd from "../components/ServiceJsonLd";
import ServiceGallery from "../components/ServiceGallery";
import LashMethods from "../components/LashMethods";
import SalonHygiene from "../components/SalonHygiene";
import { lashApplicationPrices, serviceOffers } from "../lib/priceCatalog";

export const metadata: Metadata = {
  title: "Stylizacja rzęs Kraków | Rzęsy 1:1, 2D i 3D | Noblu",
  description:
    `Stylizacja rzęs 1:1, 2D i 3D w Krakowie, Borek Fałęcki. ${business.name} przy ul. ${business.address.shortStreetLocative}. Darmowy parking i zapytanie o termin online.`,
  alternates: {
    canonical: `${business.url}/stylizacja-rzes-krakow`,
  },
  openGraph: {
    title: "Stylizacja rzęs Kraków | Rzęsy 1:1, 2D i 3D | Noblu",
    description:
      "Stylizacja rzęs 1:1, 2D i 3D w Krakowie, Borek Fałęcki. Zapytaj o termin online.",
    url: `${business.url}/stylizacja-rzes-krakow`,
    siteName: business.name,
    images: [{
      url: `${business.url}/gallery/rzesy/stylizacja-rzes-krakow-noblu.webp`,
      alt: `Stylizacja rzęs ${business.name} Kraków`,
    }],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stylizacja rzęs Kraków | Rzęsy 1:1, 2D i 3D | Noblu",
    description:
      "Stylizacja rzęs 1:1, 2D i 3D w Krakowie, Borek Fałęcki. Zapytaj o termin online.",
    images: [`${business.url}/gallery/rzesy/stylizacja-rzes-krakow-noblu.webp`],
  },
};

const faq = [
  {
    q: "Czy stylizacja rzęs może wyglądać naturalnie?",
    a: "Tak, stylizacja dobierana jest do urody, kształtu oka i oczekiwanego efektu. Można uzyskać delikatny, naturalny lash look.",
  },
  {
    q: "Gdzie znajduje się salon stylizacji rzęs?",
    a: `${business.name} znajduje się przy ul. ${business.address.streetLocative} w Krakowie, na Borku Fałęckim. Przy salonie jest darmowy parking.`,
  },
  {
    q: "Czy wizytę na rzęsy można zarezerwować online?",
    a: "Tak. Możesz wysłać prośbę o termin przez formularz Noblu, a salon potwierdzi dostępność SMS-em lub telefonicznie.",
  },
  {
    q: "Czy rzęsy jedwabne to przedłużanie rzęs?",
    a: "Określenie rzęsy jedwabne jest często używane potocznie dla lekkich stylizacji. W Noblu metoda i materiał są dobierane do naturalnych rzęs oraz oczekiwanego efektu.",
  },
];

export default function StylizacjaRzesKrakowPage() {
  return (
    <main className="min-h-screen bg-[#F8F5F2] text-[#1D1D1B]">
      <BreadcrumbJsonLd
        items={[
          {
            name: "Stylizacja rzęs Kraków",
            url: `${business.url}/stylizacja-rzes-krakow`,
          },
        ]}
      />
      <ServiceJsonLd
        name="Stylizacja rzęs Kraków"
        description={`Stylizacja rzęs 1:1, 2D i 3D z efektem dopasowanym do urody klientki w ${business.name} w Krakowie.`}
        serviceType="Stylizacja rzęs"
        url={`${business.url}/stylizacja-rzes-krakow`}
        offers={serviceOffers(lashApplicationPrices)}
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
            Stylizacja rzęs Kraków
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light leading-tight">
            Stylizacja rzęs
            <span className="block text-[#7C6238]">{"\u00A0-\u00A0Kraków Borek Fałęcki"}</span>
          </h1>

          <p className="mt-10 text-lg text-[#6D6B68] leading-relaxed max-w-3xl">
            {business.name} oferuje stylizację rzęs w Krakowie, na Borku
            Fałęckim, dla kobiet, które cenią elegancki, dopracowany i naturalny
            efekt. Stylizację dobieramy do urody, kształtu oka i oczekiwanego
            rezultatu. Salon znajduje się przy ul. {business.address.shortStreetLocative}, z darmowym
            parkingiem.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="/rezerwacja?usluga=rzesy-1-1-aplikacja"
              className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform shadow-[0_20px_60px_rgba(212,180,131,0.35)]"
            >
              Zapytaj o termin
            </a>
            <Link
              href="/cennik"
              className="inline-flex items-center justify-center rounded-full border border-[#D4B483] px-10 py-5 font-medium text-[#876536] transition-colors hover:bg-[#D4B483] hover:text-black"
            >
              Zobacz cennik
            </Link>
          </div>
        </div>
      </section>

      <ServiceGallery
        id="lashes-gallery-title"
        title="Realizacje stylizacji rzęs"
        images={[
          {
            src: "/gallery/rzesy/stylizacja-rzes-krakow-noblu.webp",
            alt: "Zbliżenie oka z podkręconymi rzęsami po stylizacji w Noblu",
          },
          {
            src: "/gallery/rzesy/IMG_6993(1).webp",
            alt: "Delikatna stylizacja rzęs obu oczu z podkreślonymi zewnętrznymi kącikami",
          },
          {
            src: "/gallery/rzesy/rzesy-objetosciowe-krakow-noblu.webp",
            alt: `Efekt przedłużonych rzęs na otwartych oczach klientki ${business.name}`,
          },
        ]}
      />

      <LashMethods />
      <SalonHygiene />

      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto grid gap-10 text-lg leading-relaxed text-[#5F5B56]">
          <div>
            <h2 className="text-3xl lg:text-4xl font-light text-[#1D1D1B] mb-6">
              Stylizacja rzęs w Krakowie: efekt dopasowany do oka
            </h2>
            <p>
              Jeśli szukasz miejsca na rzęsy w Krakowie, stylizację rzęs 1:1
              lub subtelne objętości, {business.name} stawia na komfort i
              estetykę. Efekt może być bardzo delikatny, bardziej wyrazisty albo
              maksymalnie naturalny, zależnie od oczekiwań i typu urody.
            </p>
            <p className="mt-4">
              Szczegółowy opis metod 1:1, 2D i 3D oraz aktualne ceny znajdziesz
              na stronie <Link href="/przedluzanie-rzes-krakow" className="font-medium text-[#876536] underline underline-offset-4">przedłużanie rzęs Kraków</Link>.
            </p>
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl font-light text-[#1D1D1B] mb-6">
              Salon rzęs w południowej części Krakowa
            </h2>
            <p>
              Salon znajduje się przy ul. {business.address.streetLocative}, na Borku
              Fałęckim. To wygodny wybór dla klientek z Łagiewnik, Ruczaju,
              Kurdwanowa, Swoszowic, Woli Duchackiej oraz osób dojeżdżających z
              Podgórza.
            </p>
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl font-light text-[#1D1D1B] mb-6">
              Przed wizytą na stylizację rzęs
            </h2>
            <p>
              W uwagach do zapytania napisz, czy masz już przedłużone rzęsy
              i jaki efekt chcesz uzyskać. To pomoże ustalić zakres wizyty.
              Metodę, długość i podkręcenie dobierzemy do naturalnych rzęs oraz
              kształtu oka.
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
              Umów stylizację rzęs
            </h2>
            <p className="max-w-3xl">
              Zapytaj o termin online dla natural look, rzęs 1:1 lub lekkich
              objętości dopasowanych do Twojego oka.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/rezerwacja?usluga=rzesy-1-1-aplikacja"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform shadow-[0_20px_60px_rgba(212,180,131,0.35)]"
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
            <a href="/przedluzanie-rzes-krakow" className="text-[#7C6238]">
              Przedłużanie rzęs Kraków
            </a>
            <a href="/manicure-krakow" className="text-[#7C6238]">
              Manicure Kraków
            </a>
            <a href="/pedicure-krakow" className="text-[#7C6238]">
              Pedicure Kraków
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
