import { priceHighlights } from "../../lib/homePricing";

export default function HomePricePreview() {
  return (
    <section id="cennik" className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="rounded-[2.5rem] border border-[#E8DED2] bg-white/80 p-8 shadow-[0_24px_80px_rgba(80,55,28,0.08)] backdrop-blur-xl lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.35fr] lg:items-start">
            <div>
              <div className="text-sm uppercase tracking-[0.3em] text-[#7C6238] mb-4">
                Cennik
              </div>

              <h2 className="text-4xl lg:text-6xl font-light leading-tight text-[#1D1D1B]">
                Ceny manicure, pedicure i rzęs w Noblu
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-[#5F5B56]">
                Najczęściej wybierane usługi i ceny startowe znajdziesz od razu
                tutaj, bez szukania w menu. Pełny cennik zawiera wszystkie
                warianty manicure, paznokci hybrydowych, pedicure oraz
                stylizacji rzęs.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/cennik"
                  className="inline-flex items-center justify-center rounded-full bg-[#D4B483] px-8 py-4 font-medium text-black shadow-[0_20px_60px_rgba(212,180,131,0.35)] transition-transform hover:scale-105"
                >
                  Zobacz pełny cennik
                </a>
                <a
                  href="/rezerwacja"
                  className="inline-flex items-center justify-center rounded-full border border-[#D4B483] px-8 py-4 font-medium text-[#876536] transition-colors hover:bg-[#D4B483] hover:text-black"
                >
                  Zapytaj o termin
                </a>
              </div>
            </div>

            <div className="grid gap-4">
              {priceHighlights.map((item) => (
                <a
                  key={item.service}
                  href={item.href}
                  className="grid gap-4 rounded-[1.6rem] border border-[#E8DED2] bg-[#FFFDFB] p-6 transition-colors hover:border-[#D4B483] sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <span>
                    <span className="block text-2xl font-light text-[#1D1D1B]">
                      {item.service}
                    </span>
                    <span className="mt-2 block leading-relaxed text-[#6D6B68]">
                      {item.description}
                    </span>
                    <span className="mt-3 block text-sm uppercase tracking-[0.18em] text-[#7C6238]">
                      {item.cta} →
                    </span>
                  </span>
                  <span className="text-left text-2xl font-medium text-[#876536] sm:text-right">
                    {item.price}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
