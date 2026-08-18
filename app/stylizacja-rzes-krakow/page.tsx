import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd";
import ServiceJsonLd from "../components/ServiceJsonLd";

export const metadata: Metadata = {
  title: "Stylizacja rzęs Kraków | Rzęsy 1:1, 2D i 3D | Noblu",
  description:
    "Stylizacja rzęs 1:1, 2D i 3D w Krakowie, Borek Fałęcki. Noblu Beauty Room przy ul. Orzechowej 4. Darmowy parking i zapytanie o termin online.",
  alternates: {
    canonical: "https://noblu.pl/stylizacja-rzes-krakow",
  },
  openGraph: {
    title: "Stylizacja rzęs Kraków | Rzęsy 1:1, 2D i 3D | Noblu",
    description:
      "Stylizacja rzęs 1:1, 2D i 3D w Krakowie, Borek Fałęcki. Zapytaj o termin online.",
    url: "https://noblu.pl/stylizacja-rzes-krakow",
    siteName: "Noblu Beauty Room",
    images: [{
      url: "https://noblu.pl/gallery/rzesy/stylizacja-rzes-krakow-noblu.webp",
      alt: "Stylizacja rzęs Noblu Beauty Room Kraków",
    }],
    locale: "pl_PL",
    type: "website",
  },
};

const faq = [
  {
    q: "Czy stylizacja rzęs może wyglądać naturalnie?",
    a: "Tak, stylizacja dobierana jest do urody, kształtu oka i oczekiwanego efektu. Można uzyskać delikatny, naturalny lash look.",
  },
  {
    q: "Gdzie znajduje się salon stylizacji rzęs?",
    a: "Noblu Beauty Room znajduje się przy ul. Orzechowej 4/lok.1 w Krakowie, na Borku Fałęckim. To dogodna lokalizacja także dla klientek z Łagiewnik, Ruczaju, Kurdwanowa, Swoszowic i Podgórza.",
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
            url: "https://noblu.pl/stylizacja-rzes-krakow",
          },
        ]}
      />
      <ServiceJsonLd
        name="Stylizacja rzęs Kraków"
        description="Stylizacja rzęs 1:1, 2D i 3D z efektem dopasowanym do urody klientki w Noblu Beauty Room w Krakowie."
        serviceType="Stylizacja rzęs"
        url="https://noblu.pl/stylizacja-rzes-krakow"
        offers={[
          { name: "Aplikacja rzęs 1:1", price: "190" },
          { name: "Aplikacja rzęs 2D", price: "210" },
          { name: "Aplikacja rzęs 3D", price: "220" },
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
          <div className="text-sm uppercase tracking-[0.3em] text-[#7C6238] mb-6">
            Stylizacja rzęs Kraków
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light leading-tight">
            Stylizacja rzęs
            <span className="block text-[#7C6238]">Kraków Borek Fałęcki</span>
          </h1>

          <p className="mt-10 text-lg text-[#6D6B68] leading-relaxed max-w-3xl">
            Noblu Beauty Room oferuje stylizację rzęs w Krakowie, na Borku
            Fałęckim, dla kobiet, które cenią elegancki, dopracowany i naturalny
            efekt. Stylizację dobieramy do urody, kształtu oka i oczekiwanego
            rezultatu. Salon znajduje się przy ul. Orzechowej 4, z darmowym
            parkingiem.
          </p>

          <div className="mt-12">
            <a
              href="/rezerwacja"
              className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(212,180,131,0.25)]"
            >
              Zarezerwuj stylizację rzęs
            </a>
          </div>
        </div>
      </section>

      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto grid gap-10 text-lg leading-relaxed text-[#5F5B56]">
          <div>
            <h2 className="text-3xl lg:text-4xl font-light text-[#1D1D1B] mb-6">
              Stylizacja rzęs w Krakowie: efekt dopasowany do oka
            </h2>
            <p>
              Jeśli szukasz miejsca na rzęsy w Krakowie, stylizację rzęs 1:1
              lub subtelne objętości, Noblu Beauty Room stawia na komfort i
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
              Salon znajduje się przy ul. Orzechowej 4/lok.1, na Borku
              Fałęckim. To wygodny wybór dla klientek z Łagiewnik, Ruczaju,
              Kurdwanowa, Swoszowic, Woli Duchackiej oraz osób dojeżdżających z
              Podgórza.
            </p>
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl font-light text-[#1D1D1B] mb-6">
              Komfort, higiena i precyzja
            </h2>
            <p>
              Podczas wizyty ważne są nie tylko efekt końcowy, ale też wygoda i
              poczucie bezpieczeństwa. Pracujemy spokojnie, z dbałością o
              szczegóły, aby stylizacja była dopasowana do oka i przyjemna w
              codziennym noszeniu.
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
              Zarezerwuj wizytę online i wybierz natural look, rzęsy 1:1 lub
              lekkie objętości dopasowane do Twojego oka.
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
