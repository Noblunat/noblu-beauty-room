import type { Metadata } from "next";

const booksyUrl =
  "https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow";

export const metadata: Metadata = {
  title: "Manicure Kraków Podgórze | Noblu Beauty Room",
  description:
    "Manicure premium w Krakowie przy ul. Orzechowej 4/lok.1. Stylizacja paznokci, manicure hybrydowy i estetyczne paznokcie w Noblu Beauty Room.",
  alternates: {
    canonical: "https://noblu.pl/manicure-krakow",
  },
  openGraph: {
    title: "Manicure Kraków Podgórze | Noblu Beauty Room",
    description:
      "Manicure premium, paznokcie hybrydowe i stylizacja paznokci w salonie Noblu Beauty Room w Krakowie.",
    url: "https://noblu.pl/manicure-krakow",
    siteName: "Noblu Beauty Room",
    locale: "pl_PL",
    type: "website",
  },
};

const faq = [
  {
    q: "Gdzie znajduje się salon Noblu Beauty Room?",
    a: "Salon znajduje się przy ul. Orzechowej 4/lok.1 w Krakowie, w wygodnej lokalizacji dla klientek z Podgórza, Łagiewnik, Borku Fałęckiego, Ruczaju i Kurdwanowa.",
  },
  {
    q: "Czy można zarezerwować manicure online?",
    a: "Tak, wizytę na manicure można zarezerwować online przez Booksy.",
  },
  {
    q: "Jakie stylizacje paznokci wykonuje salon?",
    a: "W Noblu Beauty Room wykonywany jest manicure premium, stylizacja paznokci, manicure hybrydowy oraz estetyczne, naturalne stylizacje.",
  },
];

export default function ManicureKrakowPage() {
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
            Manicure Kraków
          </div>

          <h1 className="text-5xl lg:text-7xl font-light leading-tight">
            Manicure premium
            <span className="block text-[#D4B483]">w Krakowie</span>
          </h1>

          <p className="mt-10 text-lg text-[#6D6B68] leading-relaxed max-w-3xl">
            Noblu Beauty Room to kameralny salon beauty w Krakowie oferujący
            manicure premium, stylizację paznokci i manicure hybrydowy. Pracujemy
            z dbałością o estetykę, higienę i naturalny efekt, który pasuje do
            codzienności, pracy i wyjątkowych okazji.
          </p>

          <div className="mt-12">
            <a
              href={booksyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(212,180,131,0.25)]"
            >
              Zarezerwuj manicure
            </a>
          </div>
        </div>
      </section>

      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto grid gap-10 text-lg leading-relaxed text-[#5F5B56]">
          <div>
            <h2 className="text-3xl lg:text-4xl font-light text-[#1D1D1B] mb-6">
              Paznokcie w Krakowie dla kobiet ceniących dokładność
            </h2>
            <p>
              Jeśli szukasz miejsca na manicure w Krakowie, paznokcie hybrydowe
              lub estetyczną stylizację paznokci, Noblu Beauty Room łączy
              precyzyjne wykonanie z elegancką atmosferą. Stawiamy na czystą,
              dopracowaną stylizację: od naturalnych odcieni nude po bardziej
              wyraziste kolory i minimalistyczne zdobienia.
            </p>
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl font-light text-[#1D1D1B] mb-6">
              Dogodny dojazd: Podgórze, Łagiewniki, Ruczaj i okolice
            </h2>
            <p>
              Salon znajduje się przy ul. Orzechowej 4/lok.1 w Krakowie. To
              wygodna lokalizacja dla klientek z południa miasta: Podgórza,
              Podgórza Duchackiego, Łagiewnik, Borku Fałęckiego, Ruczaju,
              Kurdwanowa, Woli Duchackiej i Swoszowic.
            </p>
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl font-light text-[#1D1D1B] mb-6">
              Jak wygląda wizyta?
            </h2>
            <p>
              Podczas wizyty dobieramy kształt, kolor i wykończenie stylizacji
              do naturalnej płytki oraz oczekiwanego efektu. Dbamy o komfort,
              sterylność narzędzi i spokojne tempo pracy, aby manicure był nie
              tylko estetyczny, ale też trwały i dopracowany w detalu.
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
            <a href="/stylizacja-hybrydowa-krakow" className="text-[#B08B57]">
              Stylizacja hybrydowa Kraków
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
