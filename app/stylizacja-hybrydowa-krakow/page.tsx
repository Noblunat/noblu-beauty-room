import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd";
import ServiceJsonLd from "../components/ServiceJsonLd";

export const metadata: Metadata = {
  title: "Manicure hybrydowy Kraków | Stylizacja hybrydowa | Noblu",
  description:
    "Manicure i stylizacja hybrydowa w Krakowie, Borek Fałęcki. Naturalne paznokcie, ul. Orzechowa 4. Darmowy parking i zapytanie o termin online.",
  alternates: {
    canonical: "https://noblu.pl/stylizacja-hybrydowa-krakow",
  },
  openGraph: {
    title: "Manicure hybrydowy Kraków | Stylizacja hybrydowa | Noblu",
    description:
      "Manicure hybrydowy i naturalne stylizacje paznokci w Krakowie, Borek Fałęcki. Zapytaj o termin online.",
    url: "https://noblu.pl/stylizacja-hybrydowa-krakow",
    siteName: "Noblu Beauty Room",
    images: [{
      url: "https://noblu.pl/gallery/paznokcie/IMG_6375.webp",
      alt: "Stylizacja hybrydowa w Noblu Beauty Room Kraków",
    }],
    locale: "pl_PL",
    type: "website",
  },
};

const faq = [
  {
    q: "Dla kogo jest stylizacja hybrydowa?",
    a: "To dobry wybór dla osób, które chcą estetycznego, trwałego manicure z naturalnym wykończeniem i wygodą na co dzień.",
  },
  {
    q: "Gdzie wykonać paznokcie hybrydowe w Krakowie?",
    a: "Noblu Beauty Room znajduje się przy ul. Orzechowej 4/lok.1 w Krakowie, na Borku Fałęckim. To wygodne miejsce także dla osób z Łagiewnik, Ruczaju, Kurdwanowa, Swoszowic i Podgórza.",
  },
  {
    q: "Czy można zarezerwować wizytę online?",
    a: "Tak, prośbę o termin stylizacji hybrydowej możesz wysłać przez formularz Noblu. Salon potwierdzi dostępność SMS-em lub telefonicznie.",
  },
];

export default function StylizacjaHybrydowaKrakowPage() {
  return (
    <main className="min-h-screen bg-[#F8F5F2] text-[#1D1D1B]">
      <BreadcrumbJsonLd
        items={[
          {
            name: "Stylizacja hybrydowa Kraków",
            url: "https://noblu.pl/stylizacja-hybrydowa-krakow",
          },
        ]}
      />
      <ServiceJsonLd
        name="Stylizacja hybrydowa Kraków"
        description="Manicure hybrydowy i naturalne stylizacje paznokci w Noblu Beauty Room w Krakowie."
        serviceType="Stylizacja hybrydowa"
        url="https://noblu.pl/stylizacja-hybrydowa-krakow"
        offers={[
          { name: "Stylizacja hybrydowa", price: "160" },
          {
            name: "Stylizacja hybrydowa - więcej niż 1 kolor",
            price: "170",
          },
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
            Stylizacja hybrydowa Kraków
          </div>

          <h1 className="text-5xl lg:text-7xl font-light leading-tight">
            Stylizacja hybrydowa
            <span className="block text-[#D4B483]">w Krakowie</span>
          </h1>

          <p className="mt-10 text-lg text-[#6D6B68] leading-relaxed max-w-3xl">
            Noblu Beauty Room wykonuje stylizację hybrydową w Krakowie dla
            kobiet, które chcą trwałego, estetycznego i dopracowanego manicure.
            Stawiamy na naturalny efekt, eleganckie kolory i precyzyjne
            wykończenie.
          </p>

          <div className="mt-12">
            <a
              href="/rezerwacja"
              className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(212,180,131,0.25)]"
            >
              Zarezerwuj stylizację
            </a>
          </div>
        </div>
      </section>

      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto grid gap-10 text-lg leading-relaxed text-[#5F5B56]">
          <div>
            <h2 className="text-3xl lg:text-4xl font-light text-[#1D1D1B] mb-6">
              Manicure hybrydowy Kraków: trwałość i estetyka
            </h2>
            <p>
              Stylizacja hybrydowa sprawdza się, gdy zależy Ci na eleganckich
              paznokciach przez wiele dni bez codziennego poprawiania lakieru.
              W Noblu Beauty Room dobieramy kolor, kształt i wykończenie do
              stylu klientki oraz kondycji naturalnej płytki.
            </p>
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl font-light text-[#1D1D1B] mb-6">
              Stylizacja hybrydowa na Borku Fałęckim
            </h2>
            <p>
              Salon mieści się przy ul. Orzechowej 4/lok.1 w Krakowie, na
              Borku Fałęckim. To wygodny adres dla osób z Łagiewnik, Ruczaju,
              Kurdwanowa, Swoszowic, Woli Duchackiej oraz dojeżdżających z
              Podgórza.
            </p>
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl font-light text-[#1D1D1B] mb-6">
              Naturalne paznokcie i minimalistyczne stylizacje
            </h2>
            <p>
              Najczęściej wybierane są odcienie nude, mleczne wykończenia,
              klasyczna czerwień oraz subtelne stylizacje w duchu clean beauty.
              Każdy manicure wykonujemy z naciskiem na higienę, komfort i
              spokojną atmosferę wizyty.
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
              Umów stylizację hybrydową
            </h2>
            <p className="max-w-3xl">
              Zarezerwuj termin online i wybierz manicure hybrydowy dopasowany
              do Twoich dłoni, stylu i oczekiwanego efektu.
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
            <a href="/manicure-krakow" className="text-[#B08B57]">
              Manicure Kraków
            </a>
            <a href="/pedicure-krakow" className="text-[#B08B57]">
              Pedicure Kraków
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
