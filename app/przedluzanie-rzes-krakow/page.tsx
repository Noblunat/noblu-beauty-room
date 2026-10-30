
import { business, businessPostalAddress } from "../lib/business";
import type { Metadata } from "next";
import Image from "next/image";
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd";
import LashMethods from "../components/LashMethods";
import SalonHygiene from "../components/SalonHygiene";
import { lashApplicationPrices, servicePrice, serviceOffers } from "../lib/priceCatalog";
import { findBookingService } from "../lib/bookingServices";

export const metadata: Metadata = {
  title: "Przedłużanie rzęs Kraków | Rzęsy 1:1, 2D i 3D | Noblu",
  description:
    `Przedłużanie rzęs w Krakowie przy ul. ${business.address.streetLocative}. Rzęsy 1:1, 2D, 3D, natural look i lekkie objętości w ${business.name}.`,
  alternates: {
    canonical: `${business.url}/przedluzanie-rzes-krakow`,
  },
  openGraph: {
    title: `Przedłużanie rzęs Kraków | ${business.name}`,
    description:
      "Rzęsy 1:1, 2D, 3D i naturalne przedłużanie rzęs w Krakowie, blisko Borku Fałęckiego, Łagiewnik i Ruczaju.",
    url: `${business.url}/przedluzanie-rzes-krakow`,
    siteName: business.name,
    images: [{
      url: `${business.url}/gallery/rzesy/rzesy-objetosciowe-krakow-noblu.webp`,
      alt: `Przedłużanie rzęs objętościowych ${business.name} Kraków`,
    }],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Przedłużanie rzęs Kraków | ${business.name}`,
    description:
      "Rzęsy 1:1, 2D, 3D i naturalne przedłużanie rzęs w Krakowie, blisko Borku Fałęckiego, Łagiewnik i Ruczaju.",
    images: [`${business.url}/gallery/rzesy/rzesy-objetosciowe-krakow-noblu.webp`],
  },
};

const faq = [
  {
    q: "Jaką metodę przedłużania rzęs wybrać: 1:1, 2D czy 3D?",
    a: "Metoda dobierana jest do naturalnych rzęs, kształtu oka i oczekiwanego efektu. 1:1 daje najbardziej naturalny wygląd, a 2D i 3D pozwalają uzyskać lekką objętość.",
  },
  {
    q: "Czy przedłużanie rzęs może wyglądać naturalnie?",
    a: `Tak. W ${business.name} można wykonać subtelny natural look, delikatne objętości, efekt wispy albo wet look dopasowany do urody klientki.`,
  },
  {
    q: "Gdzie w Krakowie znajduje się salon przedłużania rzęs?",
    a: `Salon znajduje się przy ul. ${business.address.streetLocative} w Krakowie, na Borku Fałęckim. Pod salonem dostępny jest darmowy parking.`,
  },
  {
    q: "Ile kosztuje przedłużanie rzęs w Krakowie?",
    a: `Aplikacja rzęs 1:1 kosztuje ${servicePrice("rzesy-1-1-aplikacja")}, metoda 2D ${servicePrice("rzesy-2d-aplikacja")}, a metoda 3D ${servicePrice("rzesy-3d-aplikacja")}. Uzupełnienia zaczynają się od ${servicePrice("rzesy-1-1-uzupelnienie")}.`,
  },
  {
    q: "Ile trwa aplikacja rzęs?",
    a: `Pierwsza aplikacja trwa zwykle ${findBookingService("rzesy-1-1-aplikacja")!.duration} - ${findBookingService("rzesy-3d-aplikacja")!.duration}, zależnie od wybranej metody i oczekiwanego efektu.`,
  },
];

export default function PrzedluzanieRzesKrakowPage() {
  return (
    <main className="min-h-screen bg-[#F8F5F2] text-[#1D1D1B]">
      <BreadcrumbJsonLd
        items={[
          {
            name: "Przedłużanie rzęs Kraków",
            url: `${business.url}/przedluzanie-rzes-krakow`,
          },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": `${business.url}/przedluzanie-rzes-krakow#service`,
              name: "Przedłużanie rzęs Kraków",
              description:
                `Przedłużanie rzęs metodami 1:1, 2D i 3D w ${business.name} w Krakowie.`,
              serviceType: "Przedłużanie rzęs",
              url: `${business.url}/przedluzanie-rzes-krakow`,
              provider: {
                "@type": "BeautySalon",
                "@id": `${business.url}/#salon`,
                name: business.name,
                telephone: business.phone.e164,
                address: businessPostalAddress,
              },
              areaServed: business.areas,
              offers: serviceOffers(lashApplicationPrices).map(offer => ({ "@type": "Offer", ...offer, priceCurrency: "PLN", url: `${business.url}/cennik` })),
              potentialAction: {
                "@type": "ReserveAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${business.url}/rezerwacja`,
                  inLanguage: "pl-PL",
                },
                name: "Zapytaj o termin",
              },
            },
            {
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
            },
          ]),
        }}
      />

      <section className="pt-40 pb-20 px-6 lg:px-12 bg-gradient-to-b from-[#FFFDFB] via-[#F8F5F2] to-[#EFE7DD]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-[#7C6238] mb-6">
              Przedłużanie rzęs Kraków
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light leading-tight">
              Przedłużanie rzęs{" "}
              <span className="block text-[#7C6238]">Kraków</span>
            </h1>

            <p className="mt-10 text-lg text-[#6D6B68] leading-relaxed max-w-3xl">
              Przedłużanie rzęs 1:1, 2D i 3D w Krakowie dla kobiet, które chcą
              podkreślić spojrzenie bez utraty lekkości i elegancji. Dobieramy
              metodę, długość i efekt do oka, urody oraz kondycji naturalnych
              rzęs.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/rezerwacja?usluga=rzesy-1-1-aplikacja"
                className="inline-flex items-center justify-center px-8 py-5 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform shadow-[0_20px_60px_rgba(212,180,131,0.35)]"
              >
                Zapytaj o termin
              </a>
              <a
                href="/cennik"
                className="inline-flex items-center justify-center px-8 py-5 rounded-full bg-white/70 border border-[#E8DED2] text-[#1D1D1B] font-medium hover:border-[#D4B483] transition-colors"
              >
                Zobacz cennik
              </a>
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-[#E8DED2] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <Image
              src="/gallery/rzesy/rzesy-objetosciowe-krakow-noblu.webp"
              alt={`Przedłużanie rzęs objętościowych ${business.name} Kraków`}
              fill
              sizes="(min-width: 1280px) 521px, (min-width: 1024px) 41vw, calc(100vw - 3rem)"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <LashMethods />
      <SalonHygiene />

      <section className="py-24 px-6 lg:px-12 bg-[#F8F5F2]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-[#7C6238] mb-4">
              Lokalizacja
            </div>
            <h2 className="text-4xl lg:text-5xl font-light leading-tight mb-8">
              Przedłużanie rzęs blisko Borku Fałęckiego i Łagiewnik
            </h2>
            <div className="space-y-6 text-[#5F5B56] text-lg leading-relaxed">
              <p>
                {business.name} znajduje się przy ul. {business.address.streetLocative} w
                Krakowie. To wygodna lokalizacja dla klientek z Borku
                Fałęckiego, Łagiewnik, Ruczaju, Kurdwanowa, Podgórza i
                południowej części Krakowa. Pod salonem dostępny jest darmowy
                parking dla klientek.
              </p>
              <p>
                W formularzu wybierz metodę i preferowany dzień wizyty.
                Jeśli masz już przedłużone rzęsy, dodaj tę informację w uwagach.
                Dostępność potwierdzimy SMS-em lub telefonicznie.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#E8DED2] bg-white p-8">
            <h3 className="text-3xl font-light mb-6">Dla kogo?</h3>
            <ul className="space-y-4 text-[#6D6B68] leading-relaxed">
              <li>Klientki, które chcą naturalnie podkreślić spojrzenie.</li>
              <li>Osoby szukające lekkich objętości 2D lub 3D.</li>
              <li>Kobiety, które wolą wygodną rezerwację online.</li>
              <li>Osoby, które chcą dobrać długość i podkręcenie rzęs podczas wizyty.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-5">
            {faq.map((item) => (
              <div
                key={item.q}
                className="rounded-[2rem] border border-[#E8DED2] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
              >
                <h3 className="text-xl text-[#1D1D1B] mb-4">{item.q}</h3>
                <p className="text-[#6D6B68] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-[2rem] border border-[#E8DED2] bg-[#F8F5F2] p-8 lg:p-10">
            <h2 className="text-3xl lg:text-4xl font-light text-[#1D1D1B] mb-5">
              Umów przedłużanie rzęs
            </h2>
            <p className="max-w-3xl text-[#6D6B68] leading-relaxed">
              Wybierz rzęsy 1:1, 2D lub 3D i zapytaj o termin online. Podczas
              wizyty dopasujemy efekt do kształtu oka i oczekiwanego wyglądu.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/rezerwacja?usluga=rzesy-1-1-aplikacja"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform shadow-[0_20px_60px_rgba(212,180,131,0.35)]"
              >
                Zapytaj o termin
              </a>
              <a
                href="/stylizacja-rzes-krakow"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-[#E8DED2] text-[#1D1D1B] hover:border-[#D4B483] transition-colors"
              >
                Stylizacja rzęs Kraków
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
