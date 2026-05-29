import type { Metadata } from "next";

const booksyUrl =
  "https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow";

export const metadata: Metadata = {
  title: "Stylizacja hybrydowa Kraków | Noblu Beauty Room",
  description:
    "Stylizacja hybrydowa i manicure hybrydowy w Krakowie. Naturalne paznokcie premium w Noblu Beauty Room przy ul. Orzechowej 4/lok.1.",
  alternates: {
    canonical: "https://noblu.pl/stylizacja-hybrydowa-krakow",
  },
  openGraph: {
    title: "Stylizacja hybrydowa Kraków | Noblu Beauty Room",
    description:
      "Manicure hybrydowy, paznokcie hybrydowe i naturalne stylizacje w Noblu Beauty Room w Krakowie.",
    url: "https://noblu.pl/stylizacja-hybrydowa-krakow",
    siteName: "Noblu Beauty Room",
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
    a: "Noblu Beauty Room znajduje się przy ul. Orzechowej 4/lok.1 w Krakowie, blisko Podgórza, Łagiewnik, Ruczaju i Kurdwanowa.",
  },
  {
    q: "Czy można zarezerwować wizytę przez Booksy?",
    a: "Tak, rezerwacja stylizacji hybrydowej odbywa się online przez Booksy.",
  },
];

export default function StylizacjaHybrydowaKrakowPage() {
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
              href={booksyUrl}
              target="_blank"
              rel="noopener noreferrer"
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
              Lokalizacja salonu
            </h2>
            <p>
              Salon mieści się przy ul. Orzechowej 4/lok.1 w Krakowie. To
              wygodny adres dla osób z Podgórza, Podgórza Duchackiego,
              Łagiewnik, Borku Fałęckiego, Ruczaju, Kurdwanowa, Woli Duchackiej
              i Swoszowic.
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
