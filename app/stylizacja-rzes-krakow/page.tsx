import type { Metadata } from "next";

const booksyUrl =
  "https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow";

export const metadata: Metadata = {
  title: "Stylizacja rzęs Kraków | Noblu Beauty Room",
  description:
    "Stylizacja rzęs w Krakowie. Naturalny efekt, rzęsy 1:1, subtelne objętości i premium lash look w Noblu Beauty Room.",
  alternates: {
    canonical: "https://noblu.pl/stylizacja-rzes-krakow",
  },
  openGraph: {
    title: "Stylizacja rzęs Kraków | Noblu Beauty Room",
    description:
      "Stylizacja rzęs, rzęsy 1:1 i naturalny lash look w Noblu Beauty Room w Krakowie.",
    url: "https://noblu.pl/stylizacja-rzes-krakow",
    siteName: "Noblu Beauty Room",
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
    a: "Noblu Beauty Room znajduje się przy ul. Orzechowej 4/lok.1 w Krakowie, w dogodnej lokalizacji dla klientek z Podgórza, Łagiewnik, Ruczaju i Kurdwanowa.",
  },
  {
    q: "Czy wizytę na rzęsy można zarezerwować online?",
    a: "Tak, wizytę można wygodnie umówić online przez Booksy.",
  },
];

export default function StylizacjaRzesKrakowPage() {
  return (
    <main className="min-h-screen bg-[#F8F5F2] text-[#1D1D1B]">
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
            Stylizacja rzęs Kraków
          </div>

          <h1 className="text-5xl lg:text-7xl font-light leading-tight">
            Stylizacja rzęs
            <span className="block text-[#D4B483]">w Krakowie</span>
          </h1>

          <p className="mt-10 text-lg text-[#6D6B68] leading-relaxed max-w-3xl">
            Noblu Beauty Room oferuje stylizację rzęs w Krakowie dla kobiet,
            które cenią elegancki, dopracowany i naturalny efekt. Stylizację
            dobieramy do urody, kształtu oka i oczekiwanego rezultatu.
          </p>

          <div className="mt-12">
            <a
              href={booksyUrl}
              target="_blank"
              rel="noopener noreferrer"
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
              Rzęsy Kraków: efekt dopasowany do oka
            </h2>
            <p>
              Jeśli szukasz miejsca na rzęsy w Krakowie, stylizację rzęs 1:1
              lub subtelne objętości, Noblu Beauty Room stawia na komfort i
              estetykę. Efekt może być bardzo delikatny, bardziej wyrazisty albo
              maksymalnie naturalny, zależnie od oczekiwań i typu urody.
            </p>
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl font-light text-[#1D1D1B] mb-6">
              Salon rzęs w południowej części Krakowa
            </h2>
            <p>
              Salon znajduje się przy ul. Orzechowej 4/lok.1. To wygodny wybór
              dla klientek z Podgórza, Podgórza Duchackiego, Łagiewnik, Borku
              Fałęckiego, Ruczaju, Kurdwanowa, Woli Duchackiej i Swoszowic.
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
              <a
                href={booksyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform"
              >
                Zarezerwuj przez Booksy
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-[#E8DED2] text-[#1D1D1B] hover:border-[#D4B483] transition-colors"
              >
                Wróć do strony głównej
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap gap-4">
            <a href="/przedluzanie-rzes-krakow" className="text-[#B08B57]">
              Przedłużanie rzęs Kraków
            </a>
            <a href="/manicure-krakow" className="text-[#B08B57]">
              Manicure Kraków
            </a>
            <a href="/stylizacja-hybrydowa-krakow" className="text-[#B08B57]">
              Stylizacja hybrydowa Kraków
            </a>
            <a href="/pedicure-krakow" className="text-[#B08B57]">
              Pedicure Kraków
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
