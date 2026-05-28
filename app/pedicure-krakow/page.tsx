export const metadata = {
  title: "Pedicure Kraków | Noblu Beauty Room",
  description:
    "Pedicure premium w Krakowie. Pedicure SPA, estetyczna pielęgnacja stóp i beauty experience w Noblu Beauty Room.",
}

export default function PedicureKrakowPage() {
  return (
    <main className="min-h-screen bg-[#F8F5F2] text-[#1D1D1B]">

      <section className="pt-40 pb-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">

          <div className="text-sm uppercase tracking-[0.3em] text-[#D4B483] mb-6">
            Pedicure Kraków
          </div>

          <h1 className="text-5xl lg:text-7xl font-light leading-tight">
            Pedicure premium
            <span className="block text-[#D4B483]">
              w Krakowie
            </span>
          </h1>

          <p className="mt-10 text-lg text-[#6D6B68] leading-relaxed max-w-3xl">
            Noblu Beauty Room oferuje pedicure premium w Krakowie
            dla kobiet ceniących estetykę, komfort oraz perfekcyjne
            wykończenie. Tworzymy beauty experience w eleganckiej,
            kameralnej atmosferze.
          </p>

          <div className="mt-12">
            <a
              href="https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(212,180,131,0.25)]"
            >
              Zarezerwuj pedicure
            </a>
          </div>

        </div>
      </section>

      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto space-y-10 text-lg leading-relaxed text-[#5F5B56]">

          <p>
            Jeśli szukasz miejsca takiego jak pedicure Kraków,
            pedicure SPA Kraków.
            Noblu Beauty Room oferuje nowoczesne podejście do beauty
            oraz relaksującą atmosferę premium.
          </p>

          <p>
            Wykonujemy estetyczny pedicure, pielęgnację stóp,
            pedicure hybrydowy oraz zabiegi inspirowane trendem
            beauty.
          </p>

          <p>
            Salon znajduje się przy ul. Orzechowej 4/lok.1
            w Krakowie.
          </p>

        </div>
      </section>

    </main>
  )
}