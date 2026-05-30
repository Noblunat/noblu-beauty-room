import type { Metadata } from "next";

const booksyUrl =
  "https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow";

export const metadata: Metadata = {
  title: "Cennik | Noblu Beauty Room Kraków",
  description:
    "Cennik usług Noblu Beauty Room w Krakowie. Stylizacja rzęs, manicure, stylizacja paznokci, pedicure i usługi dodatkowe.",
  alternates: {
    canonical: "https://noblu.pl/cennik",
  },
  openGraph: {
    title: "Cennik | Noblu Beauty Room Kraków",
    description:
      "Sprawdź ceny stylizacji rzęs, manicure, paznokci i pedicure w Noblu Beauty Room w Krakowie.",
    url: "https://noblu.pl/cennik",
    siteName: "Noblu Beauty Room",
    locale: "pl_PL",
    type: "website",
  },
};

const lashPrices = [
  { name: "Aplikacja rzęs 1:1", price: "190 zł" },
  { name: "Uzupełnienie rzęs 1:1", price: "160 zł" },
  { name: "Aplikacja rzęs 2D", price: "210 zł" },
  { name: "Uzupełnienie rzęs 2D", price: "180 zł" },
  { name: "Aplikacja rzęs 3D", price: "220 zł" },
  { name: "Uzupełnienie rzęs 3D", price: "190 zł" },
  { name: "Ściągnięcie rzęs", price: "40 zł" },
];

const nailPrices = [
  { name: "Manicure", price: "100 zł" },
  { name: "Stylizacja hybrydowa", price: "160 zł" },
  { name: "Stylizacja hybrydowa - więcej niż 1 kolor", price: "170 zł" },
  { name: "Usunięcie hybrydy z manicure", price: "120 zł" },
  {
    name: "Żel na naturalnej płytce - paznokcie krótkie, max do opuszka",
    price: "180 zł",
  },
  { name: "Żel na naturalnej płytce", price: "190 zł" },
  { name: "Uzupełnienie żelowe do 3 tygodni", price: "190 zł" },
  { name: "Uzupełnienie żelowe po 3 tygodniach", price: "210 zł" },
  { name: "Przedłużenie żelowe", price: "220 zł" },
  { name: "Usunięcie stylizacji żelowej z manicure", price: "140 zł" },
  { name: "Zdobienia", price: "od 10 zł" },
  { name: "Pyłek", price: "5 zł" },
  { name: "French / ombre / babyboomer", price: "20 zł" },
  { name: "Usunięcie stylizacji z innego salonu do usługi", price: "20 zł" },
  { name: "Naprawa jednego paznokcia", price: "30 zł" },
];

const pedicurePrices = [
  { name: "Pedicure same paznokcie", price: "110 zł" },
  { name: "Pedicure same paznokcie z hybrydą", price: "160 zł" },
  { name: "Pedicure kosmetyczny", price: "180 zł" },
  { name: "Pedicure kosmetyczny z hybrydą", price: "200 zł" },
  { name: "Usunięcie hybrydy z pedicure same paznokcie", price: "130 zł" },
  { name: "Usunięcie hybrydy z pełnym pedicure", price: "190 zł" },
];

function PriceList({
  title,
  items,
  note,
}: {
  title: string;
  items: { name: string; price: string }[];
  note?: string;
}) {
  return (
    <section className="rounded-[2rem] border border-[#E8DED2] bg-[#FFFDFB]/85 p-7 shadow-[0_24px_80px_rgba(80,55,28,0.08)] sm:p-10">
      <h2 className="text-center text-3xl font-light text-[#3A2F26] sm:text-4xl">
        {title}
      </h2>

      <div className="mt-10 space-y-4">
        {items.map((item) => (
          <div
            key={item.name}
            className="grid grid-cols-[1fr_auto] gap-6 border-b border-[#E8DED2]/70 pb-3 text-[#4F463F]"
          >
            <span>{item.name}</span>
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
      <section className="relative px-6 pb-16 pt-28 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#D4B483,transparent_34%)] opacity-20" />
        <div className="relative mx-auto max-w-6xl">
          <a href="/" className="text-sm font-medium text-[#B08B57]">
            Powrót do strony głównej
          </a>

          <div className="mt-10 max-w-3xl">
            <div className="text-sm uppercase tracking-[0.3em] text-[#B08B57]">
              Cennik
            </div>
            <h1 className="mt-5 text-5xl font-light leading-tight lg:text-7xl">
              Ceny usług w Noblu Beauty Room
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-[#5F5B56]">
              Sprawdź ceny stylizacji rzęs, manicure, stylizacji paznokci i
              pedicure w kameralnym salonie beauty w Krakowie przy ul.
              Orzechowej 4/lok.1.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <PriceList
            title="Stylizacja rzęs"
            items={lashPrices}
            note="Do wybranej objętości istnieje możliwość dopasowania metody wispy lub wet look. Uzupełnienie liczone jest do maksymalnie 4 tygodni od założenia stylizacji."
          />

          <PriceList title="Stylizacja paznokci" items={nailPrices} />

          <div className="lg:col-span-2">
            <PriceList title="Pedicure" items={pedicurePrices} />
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-6xl rounded-[2rem] border border-[#E8DED2] bg-white/80 p-8 text-center">
          <h2 className="text-3xl font-light text-[#1D1D1B]">
            Zarezerwuj wizytę online
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-[#5F5B56]">
            Wybierz usługę, sprawdź dostępne terminy i umów wizytę przez Booksy.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={booksyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#D4B483] px-8 py-4 font-medium text-black transition-transform hover:scale-105"
            >
              Zarezerwuj przez Booksy
            </a>
            <a
              href="/stylizacja-rzes-krakow"
              className="inline-flex items-center justify-center rounded-full border border-[#E8DED2] px-8 py-4 font-medium transition-colors hover:border-[#D4B483]"
            >
              Zobacz stylizację rzęs
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
