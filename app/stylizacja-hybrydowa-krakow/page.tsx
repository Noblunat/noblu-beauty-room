export const metadata = {
  title: "Stylizacja hybrydowa Kraków | Noblu Beauty Room",
  description:
    "Stylizacja hybrydowa w Krakowie. Naturalne paznokcie, manicure hybrydowy premium i beauty experience w Noblu Beauty Room.",
}

export default function StylizacjaHybrydowaKrakowPage() {
  return (
    <main className="min-h-screen bg-[#F8F5F2] text-[#1D1D1B]">

      <section className="pt-40 pb-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">

          <div className="text-sm uppercase tracking-[0.3em] text-[#D4B483] mb-6">
            Stylizacja hybrydowa Kraków
          </div>

          <h1 className="text-5xl lg:text-7xl font-light leading-tight">
            Stylizacja hybrydowa
            <span className="block text-[#D4B483]">
              w Krakowie
            </span>
          </h1>

          <p className="mt-10 text-lg text-[#6D6B68] leading-relaxed max-w-3xl">
            Noblu Beauty Room oferuje stylizację hybrydową w Krakowie
            dla kobiet ceniących perfekcyjne wykonanie, estetykę
            oraz nowoczesny manicure premium inspirowany trendem
            quiet luxury beauty.
          </p>

          <div className="mt-12">
            <a
              href="https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow"
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
        <div className="max-w-5xl mx-auto space-y-10 text-lg leading-relaxed text-[#5F5B56]">

          <p>
            Jeśli szukasz miejsca takiego jak stylizacja hybrydowa Kraków,
            manicure hybrydowy Kraków lub paznokcie hybrydowe Kraków —
            Noblu Beauty Room oferuje nowoczesne podejście do manicure
            oraz estetyczny efekt premium.
          </p>

          <p>
            Specjalizujemy się w naturalnych stylizacjach,
            minimalistycznych paznokciach, nude nails oraz manicure
            inspirowanym estetyką clean girl i luxury beauty.
          </p>

          <p>
            Salon znajduje się przy ul. Orzechowej 4/lok.1
            w Krakowie i obsługuje klientki z Podgórza,
            Łagiewnik, Borku Fałęckiego, Ruczaju oraz Kurdwanowa.
          </p>

        </div>
      </section>

    </main>
  )
}