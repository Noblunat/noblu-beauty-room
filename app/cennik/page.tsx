import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd";
import { addonPrices, lashPrices, nailPrices, pedicurePrices, priceItemDuration, servicePrice, type PriceItem } from "../lib/priceCatalog";
import { contentRevisions, revisionLabel } from "../lib/contentRevisions";

export const metadata: Metadata = {
  title: "Cennik Noblu Kraków | Manicure, pedicure i rzęsy",
  description:
    "Sprawdź cennik manicure, pedicure, paznokci hybrydowych i stylizacji rzęs w Noblu Beauty Room Kraków. Zobacz ceny i zapytaj o termin online.",
  alternates: {
    canonical: "https://noblu.pl/cennik",
  },
  openGraph: {
    title: "Cennik Noblu Kraków | Manicure, pedicure i rzęsy",
    description:
      "Sprawdź ceny manicure, pedicure, paznokci hybrydowych i stylizacji rzęs w Noblu Beauty Room w Krakowie.",
    url: "https://noblu.pl/cennik",
    siteName: "Noblu Beauty Room",
    images: [
      {
        url: "https://noblu.pl/og-noblu.jpg",
        width: 1200,
        height: 630,
        alt: "Noblu Beauty Room w Krakowie - cennik manicure, pedicure i rzęs",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cennik Noblu Kraków | Manicure, pedicure i rzęsy",
    description:
      "Sprawdź ceny manicure, pedicure, paznokci hybrydowych i stylizacji rzęs w Noblu Beauty Room w Krakowie.",
    images: ["https://noblu.pl/og-noblu.jpg"],
  },
};

const priceToNumber = (price: string) => price.replace(/[^0-9]/g, "");

const offerCatalogJsonLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Cennik Noblu Beauty Room",
  url: "https://noblu.pl/cennik",
  itemListElement: [
    ["Stylizacja rzęs", lashPrices],
    ["Stylizacja paznokci", nailPrices],
    ["Pedicure", pedicurePrices],
    ["Dodatki do usług", addonPrices],
  ].map(([name, items]) => ({
    "@type": "OfferCatalog",
    name,
    itemListElement: (items as PriceItem[]).map(item => ({
      "@type": "Offer",
      name: item.name + (item.staff ? " — " + item.staff : ""),
      ...(item.price.startsWith("od ")
        ? {priceSpecification: {"@type": "UnitPriceSpecification", minPrice: priceToNumber(item.price), priceCurrency: "PLN"}}
        : {price: priceToNumber(item.price), priceCurrency: "PLN"}),
      ...(item.note ? {description: item.note} : {}),
      itemOffered: {"@type": "Service", name: item.name, provider: {"@id": "https://noblu.pl/#salon"}},
    })),
  })),
};

function PriceList({
  title,
  description,
  items,
  note,
  links,
}: {
  title: string;
  description: string;
  items: PriceItem[];
  note?: string;
  links: { href: string; label: string }[];
}) {
  return (
    <section className="rounded-[2rem] border border-[#E8DED2] bg-[#FFFDFB]/85 p-7 shadow-[0_24px_80px_rgba(80,55,28,0.08)] sm:p-10">
      <h2 className="text-center text-3xl font-light text-[#3A2F26] sm:text-4xl">
        {title}
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-[#6D6B68]">
        {description}
      </p>

      <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-[#7C6238]">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="hover:underline">
            {link.label}
          </Link>
        ))}
      </div>

      <div className="mt-10 space-y-4">
        {items.map((item) => (
          <div
            key={item.bookingService ?? item.name}
            data-booking-service={item.bookingService}
            className="grid grid-cols-[1fr_auto] gap-6 border-b border-[#E8DED2]/70 pb-3 text-[#4F463F]"
          >
            <span className="min-w-0">
              <span className="block">{item.name}</span>
              {item.staff && <span className="mt-1 block text-sm font-medium">{item.staff}</span>}
              {item.note && <span className="mt-1 block text-sm leading-relaxed">{item.note}</span>}
              <span className="mt-1 block text-sm leading-relaxed text-[#5F5B56]">
                Czas: {priceItemDuration(item) ?? "do potwierdzenia przy wyborze stylizacji"}
              </span>
            </span>
            <span className="text-right font-medium text-[#3A2F26]">
              {item.price}
            </span>
          </div>
        ))}
      </div>

      {note && (
        <p className="mt-8 text-center text-sm leading-relaxed text-[#7A6D62]">
          {note}
        </p>
      )}
    </section>
  );
}

export default function CennikPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F5F2] text-[#1D1D1B]">
      <BreadcrumbJsonLd
        items={[
          {
            name: "Cennik",
            url: "https://noblu.pl/cennik",
          },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(offerCatalogJsonLd),
        }}
      />
      <section className="relative px-6 pb-16 pt-28 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#D4B483,transparent_34%)] opacity-20" />
        <div className="relative mx-auto max-w-6xl">
          <Link href="/" className="text-sm font-medium text-[#7C6238]">
            Powrót do strony głównej
          </Link>

          <div className="mt-10 max-w-3xl">
            <div className="text-sm uppercase tracking-[0.3em] text-[#7C6238]">
              Cennik
            </div>
            <h1 className="mt-5 text-5xl font-light leading-tight lg:text-7xl">
              Cennik manicure, pedicure i rzęs w Krakowie
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-[#5F5B56]">
              Sprawdź ceny manicure, paznokci hybrydowych, pedicure oraz
              stylizacji rzęs w kameralnym salonie beauty w Krakowie przy ul.
              Orzechowej 4/lok.1. Jeśli pasuje Ci usługa, możesz od razu
              wysłać prośbę o termin online. Ceny i czasy mogą różnić się w zależności od stylistki.
            </p>
            <p className="mt-4 text-sm text-[#5F5B56]">
              Aktualizacja informacji: <time dateTime={contentRevisions["/cennik"].date}>{revisionLabel("/cennik")}</time>.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <PriceList
            title="Stylizacja rzęs"
            description="Cennik stylizacji rzęs obejmuje pierwsze aplikacje, uzupełnienia oraz zdjęcie stylizacji. Dobieramy objętość do naturalnych rzęs, kształtu oka i oczekiwanego efektu."
            items={lashPrices}
            note="Czasy stylizacji rzęs są orientacyjne i potwierdzamy je przy umawianiu wizyty. Do wybranej objętości można dopasować metodę wispy lub wet look. Uzupełnienie liczone jest do maksymalnie 4 tygodni od założenia stylizacji."
            links={[
              { href: "/stylizacja-rzes-krakow", label: "Stylizacja rzęs Kraków" },
              { href: "/przedluzanie-rzes-krakow", label: "Przedłużanie rzęs Kraków" },
              { href: "/rezerwacja?usluga=rzesy", label: "Zapytaj o termin" },
            ]}
          />

          <PriceList
            title="Stylizacja paznokci"
            description="Cennik manicure i paznokci obejmuje manicure klasyczny, paznokcie hybrydowe, żel na naturalnej płytce, uzupełnienia oraz przedłużenie żelowe."
            items={nailPrices}
            links={[
              { href: "/manicure-krakow", label: "Manicure Kraków" },
              { href: "/rezerwacja?usluga=manicure", label: "Zapytaj o termin" },
            ]}
          />

          <PriceList
            title="Dodatki do usług"
            description="Dodatki łączymy z przypisanymi do nich usługami. Zdobienia wyceniamy zależnie od zakresu; podany czas wydłuża wizytę."
            items={addonPrices}
            links={[{ href: "/rezerwacja", label: "Zapytaj o usługę i dodatki" }]}
          />

          <div className="lg:col-span-2">
            <PriceList
              title="Pedicure"
              description="Cennik pedicure obejmuje pielęgnację samych paznokci, pedicure hybrydowy, pełny pedicure kosmetyczny oraz wariant kosmetyczny z hybrydą."
              items={pedicurePrices}
              links={[
                { href: "/pedicure-krakow", label: "Pedicure Kraków Borek Fałęcki" },
                { href: "/rezerwacja?usluga=pedicure", label: "Zapytaj o termin" },
              ]}
            />
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-[#E8DED2] bg-white/75 p-7">
            <h2 className="text-2xl font-light text-[#1D1D1B]">
              Ile kosztuje manicure w Krakowie?
            </h2>
            <p className="mt-4 leading-relaxed text-[#5F5B56]">
              Manicure w Noblu Beauty Room kosztuje {servicePrice("Manicure")}. Stylizacja
              hybrydowa u Julii (stylistki junior) kosztuje {servicePrice("Stylizacja hybrydowa — Julia (stylistka junior)")},
              a u Natalii {servicePrice("Stylizacja hybrydowa")}. Jeśli chcesz dobrać odpowiednią usługę,
              sprawdź warianty stylizacji paznokci albo wyślij zapytanie o termin.
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#E8DED2] bg-white/75 p-7">
            <h2 className="text-2xl font-light text-[#1D1D1B]">
              Ile kosztuje pedicure?
            </h2>
            <p className="mt-4 leading-relaxed text-[#5F5B56]">
              Pedicure samych paznokci bez hybrydy kosztuje {servicePrice("Pedicure same paznokcie")},
              a z hybrydą u Julii (stylistki junior) {servicePrice("Pedicure same paznokcie z hybrydą — Julia (stylistka junior)")}.
              Wariant z hybrydą u Natalii kosztuje {servicePrice("Pedicure same paznokcie z hybrydą")},
              a pełny pedicure SPA bez hybrydy {servicePrice("Pedicure kosmetyczny")}. Salon znajduje
              się na Borku Fałęckim, z wygodnym dojazdem z południa Krakowa.
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#E8DED2] bg-white/75 p-7">
            <h2 className="text-2xl font-light text-[#1D1D1B]">
              Jak zarezerwować wizytę?
            </h2>
            <p className="mt-4 leading-relaxed text-[#5F5B56]">
              Wybierz usługę z cennika i przejdź do formularza rezerwacji.
              Prośbę o termin możesz wysłać online 24/7, a salon potwierdzi
              dostępność SMS-em lub telefonicznie.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-6xl rounded-[2rem] border border-[#E8DED2] bg-white/80 p-8 text-center">
          <h2 className="text-3xl font-light text-[#1D1D1B]">
            Zapytaj o termin online
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-[#5F5B56]">
            Wybierz usługę i wyślij prośbę o termin przez formularz Noblu.
            Salon potwierdzi dostępność SMS-em lub telefonicznie.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/rezerwacja"
              className="inline-flex items-center justify-center rounded-full bg-[#D4B483] px-8 py-4 font-medium text-black shadow-[0_20px_60px_rgba(212,180,131,0.35)] transition-transform hover:scale-105"
            >
              Zapytaj o termin
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
