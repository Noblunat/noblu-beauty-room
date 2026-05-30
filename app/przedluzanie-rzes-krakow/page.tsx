import type { Metadata } from "next";

const booksyUrl =
  "https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow";

export const metadata: Metadata = {
  title: "Przedłużanie rzęs Kraków | Rzęsy 1:1, 2D i 3D | Noblu Beauty Room",
  description:
    "Przedłużanie rzęs w Krakowie przy ul. Orzechowej 4/lok.1. Rzęsy 1:1, 2D, 3D, natural look i lekkie objętości w Noblu Beauty Room.",
  alternates: {
    canonical: "https://noblu.pl/przedluzanie-rzes-krakow",
  },
  openGraph: {
    title: "Przedłużanie rzęs Kraków | Noblu Beauty Room",
    description:
      "Rzęsy 1:1, 2D, 3D i naturalne przedłużanie rzęs w Krakowie, blisko Borku Fałęckiego, Łagiewnik i Ruczaju.",
    url: "https://noblu.pl/przedluzanie-rzes-krakow",
    siteName: "Noblu Beauty Room",
    locale: "pl_PL",
    type: "website",
  },
};

const faq = [
  {
    q: "Jaką metodę przedłużania rzęs wybrać: 1:1, 2D czy 3D?",
    a: "Metoda dobierana jest do naturalnych rzęs, kształtu oka i oczekiwanego efektu. 1:1 daje najbardziej naturalny wygląd, a 2D i 3D pozwalają uzyskać lekką objętość.",
  },
  {
    q: "Czy przedłużanie rzęs może wyglądać naturalnie?",
    a: "Tak. W Noblu Beauty Room można wykonać subtelny natural look, delikatne objętości, efekt wispy albo wet look dopasowany do urody klientki.",
  },
  {
    q: "Gdzie w Krakowie znajduje się salon przedłużania rzęs?",
    a: "Salon znajduje się przy ul. Orzechowej 4/lok.1 w Krakowie, wygodnie dla klientek z Borku Fałęckiego, Łagiewnik, Ruczaju, Kurdwanowa i Podgórza.",
  },
];

const methods = [
  {
    title: "Rzęsy 1:1",
    text: "Delikatne przedłużanie rzęs dla naturalnego efektu, który podkreśla spojrzenie bez mocnego przerysowania.",
  },
  {
    title: "Rzęsy 2D",
    text: "Lekka objętość dla klientek, które chcą bardziej widocznego efektu, ale nadal eleganckiego i wygodnego na co dzień.",
  },
  {
    title: "Rzęsy 3D",
    text: "Wyraźniejsza stylizacja z większą objętością, dobierana tak, aby zachować harmonię z okiem i naturalnymi rzęsami.",
  },
];

export default function PrzedluzanieRzesKrakowPage() {
  return (
    <main className="min-h-screen bg-[#F8F5F2] text-[#1D1D1B]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Przedłużanie rzęs Kraków",
              serviceType: "Przedłużanie rzęs",
              provider: {
                "@type": "BeautySalon",
                "@id": "https://noblu.pl/#salon",
                name: "Noblu Beauty Room",
                telephone: "+48662989534",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Orzechowa 4/lok.1",
                  addressLocality: "Kraków",
                  postalCode: "30-422",
                  addressCountry: "PL",
                },
              },
              areaServed: [
                "Kraków",
                "Borek Fałęcki",
                "Łagiewniki",
                "Ruczaj",
                "Kurdwanów",
                "Podgórze",
              ],
              offers: [
                { "@type": "Offer", name: "Aplikacja rzęs 1:1", price: "190", priceCurrency: "PLN" },
                { "@type": "Offer", name: "Aplikacja rzęs 2D", price: "210", priceCurrency: "PLN" },
                { "@type": "Offer", name: "Aplikacja rzęs 3D", price: "220", priceCurrency: "PLN" },
              ],
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
            <div className="text-sm uppercase tracking-[0.3em] text-[#D4B483] mb-6">
              Przedłużanie rzęs Kraków
            </div>

            <h1 className="text-5xl lg:text-7xl font-light leading-tight">
              Rzęsy 1:1, 2D i 3D
              <span className="block text-[#D4B483]">w Noblu Beauty Room</span>
            </h1>

            <p className="mt-10 text-lg text-[#6D6B68] leading-relaxed max-w-3xl">
              Przedłużanie rzęs w Krakowie dla kobiet, które chcą podkreślić
              spojrzenie bez utraty lekkości i elegancji. Dobieramy metodę,
              długość i efekt do oka, urody oraz kondycji naturalnych rzęs.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={booksyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-5 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(212,180,131,0.25)]"
              >
                Zarezerwuj rzęsy
              </a>
              <a
                href="/cennik"
                className="inline-flex items-center justify-center px-8 py-5 rounded-full bg-white/70 border border-[#E8DED2] text-[#1D1D1B] font-medium hover:border-[#D4B483] transition-colors"
              >
                Zobacz cennik
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-[#E8DED2] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <img
              src="/gallery/rzesy/IMG_9092.webp"
              alt="Przedłużanie rzęs w Noblu Beauty Room Kraków"
              className="h-full min-h-[420px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-12">
            <div className="text-sm uppercase tracking-[0.3em] text-[#B08B57] mb-4">
              Metody stylizacji
            </div>
            <h2 className="text-4xl lg:text-5xl font-light leading-tight">
              Efekt dopasowany do Twojego oka
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {methods.map((method) => (
              <div
                key={method.title}
                className="rounded-[2rem] border border-[#E8DED2] bg-[#F8F5F2] p-8"
              >
                <h3 className="text-2xl mb-4">{method.title}</h3>
                <p className="text-[#6D6B68] leading-relaxed">{method.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-12 bg-[#F8F5F2]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-[#B08B57] mb-4">
              Lokalizacja
            </div>
            <h2 className="text-4xl lg:text-5xl font-light leading-tight mb-8">
              Przedłużanie rzęs blisko Borku Fałęckiego i Łagiewnik
            </h2>
            <div className="space-y-6 text-[#5F5B56] text-lg leading-relaxed">
              <p>
                Noblu Beauty Room znajduje się przy ul. Orzechowej 4/lok.1 w
                Krakowie. To wygodna lokalizacja dla klientek z Borku
                Fałęckiego, Łagiewnik, Ruczaju, Kurdwanowa, Podgórza i
                południowej części Krakowa.
              </p>
              <p>
                Jeśli wpisujesz w Google „przedłużanie rzęs Kraków”, „rzęsy
                Borek Fałęcki” albo „rzęsy Ruczaj”, u nas możesz zarezerwować
                wizytę online przez Booksy i wybrać termin bez dzwonienia.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#E8DED2] bg-white p-8">
            <h3 className="text-3xl font-light mb-6">Dla kogo?</h3>
            <ul className="space-y-4 text-[#6D6B68] leading-relaxed">
              <li>Klientki, które chcą naturalnie podkreślić spojrzenie.</li>
              <li>Osoby szukające lekkich objętości 2D lub 3D.</li>
              <li>Kobiety, które wolą wygodną rezerwację online.</li>
              <li>Klientki z południa Krakowa: Borek Fałęcki, Łagiewniki, Ruczaj, Kurdwanów i Podgórze.</li>
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
              Wybierz rzęsy 1:1, 2D lub 3D i zarezerwuj wizytę online. Podczas
              wizyty dopasujemy efekt do kształtu oka i oczekiwanego wyglądu.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={booksyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform"
              >
                Rezerwuj przez Booksy
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
