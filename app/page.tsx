export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F5F2] text-[#1D1D1B] font-sans">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#111111] text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,#D4B483,transparent_35%)]"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-36 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm tracking-[0.2em] uppercase text-[#D4B483] mb-8">
              Premium Beauty Experience · Poznań
            </div>

            <h1 className="text-5xl lg:text-7xl leading-[1.05] font-light tracking-tight max-w-2xl">
              Noblu
              <span className="block font-medium text-[#D4B483]">
                Beauty Room
              </span>
            </h1>

            <p className="mt-8 text-lg text-white/70 max-w-xl leading-relaxed">
              Ekskluzywny salon beauty stworzony dla kobiet, które oczekują najwyższej jakości usług, wyjątkowej atmosfery i perfekcyjnych efektów.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="px-8 py-4 rounded-full bg-[#D4B483] text-black text-sm tracking-wide font-medium hover:scale-105 transition-transform">
                Zarezerwuj wizytę online
              </button>

              <button className="px-8 py-4 rounded-full border border-white/20 text-sm tracking-wide hover:bg-white hover:text-black transition-all">
                Zobacz ofertę
              </button>
            </div>

            <div className="mt-12 flex items-center gap-8 text-sm text-white/60">
              <div>
                <div className="text-2xl text-white font-semibold">4.9/5</div>
                <div>Opinie klientek</div>
              </div>
              <div>
                <div className="text-2xl text-white font-semibold">1500+</div>
                <div>Wykonanych zabiegów</div>
              </div>
              <div>
                <div className="text-2xl text-white font-semibold">7 dni</div>
                <div>Rezerwacja online</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-[2rem] bg-gradient-to-br from-[#D4B483] via-[#C6A06E] to-[#8A6A44] p-[1px] shadow-2xl">
              <div className="h-full w-full rounded-[2rem] bg-[#1A1A1A] flex items-center justify-center text-center p-10">
                <div>
                  <div className="text-sm tracking-[0.3em] uppercase text-[#D4B483] mb-4">
                    Luxury Beauty
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-light leading-tight">
                    Elegancja.
                    <br />
                    Relaks.
                    <br />
                    Perfekcja.
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USP */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Rezerwacja online 24/7',
              desc: 'Błyskawiczne umawianie wizyt przez Booksy lub formularz online — bez dzwonienia.',
            },
            {
              title: 'Premium doświadczenie',
              desc: 'Starannie zaprojektowane wnętrze, najwyższa jakość produktów i indywidualna opieka.',
            },
            {
              title: 'Widoczność lokalna SEO',
              desc: 'Strona zoptymalizowana pod wyszukiwania lokalne typu „salon beauty Poznań”.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-[2rem] p-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-[#EFE8E1]"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#F3ECE4] mb-6"></div>
              <h3 className="text-2xl font-medium mb-4">{item.title}</h3>
              <p className="text-[#6D6B68] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div>
              <div className="text-sm tracking-[0.3em] uppercase text-[#B08B57] mb-4">
                Oferta premium
              </div>
              <h2 className="text-4xl lg:text-6xl font-light leading-tight max-w-3xl">
                Najbardziej pożądane zabiegi beauty
              </h2>
            </div>

            <button className="rounded-full border border-black px-6 py-3 hover:bg-black hover:text-white transition-all w-fit">
              Pełny cennik
            </button>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              'Stylizacja rzęs i brwi',
              'Manicure & Pedicure',
              'Kosmetologia twarzy',
              'Depilacja laserowa',
              'Endermologia',
              'Masaże premium',
              'Makijaż okazjonalny',
              'Pakiety beauty VIP',
            ].map((service) => (
              <div
                key={service}
                className="group rounded-[2rem] overflow-hidden bg-[#F8F5F2] border border-[#EFE8E1]"
              >
                <div className="h-56 bg-gradient-to-br from-[#E8D6BE] to-[#B08B57]"></div>
                <div className="p-8">
                  <h3 className="text-xl mb-3">{service}</h3>
                  <p className="text-[#6D6B68] text-sm leading-relaxed mb-6">
                    Zabiegi wykonywane przez doświadczonych specjalistów z wykorzystaniem premium produktów.
                  </p>

                  <button className="text-sm tracking-wide uppercase text-[#B08B57] group-hover:translate-x-1 transition-transform">
                    Dowiedz się więcej →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONLINE BOOKING */}
      <section className="py-24 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-sm tracking-[0.3em] uppercase text-[#D4B483] mb-4">
              Rezerwacja online
            </div>
            <h2 className="text-4xl lg:text-6xl font-light leading-tight">
              Umów wizytę
              <span className="block text-[#D4B483]">w mniej niż minutę</span>
            </h2>

            <p className="mt-8 text-white/70 text-lg leading-relaxed max-w-xl">
              Integracja z Booksy jako centralny element strony. Widoczny widget rezerwacji, szybki wybór zabiegu i natychmiastowe potwierdzenie terminu.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="px-8 py-4 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform">
                Rezerwuj przez Booksy
              </button>

              <button className="px-8 py-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all">
                Kontakt
              </button>
            </div>
          </div>

          <div className="bg-[#1A1A1A] border border-white/10 rounded-[2rem] p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-xl font-medium">Widget Booksy</div>
                <div className="text-sm text-white/50 mt-1">Integracja API / iframe</div>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>

            <div className="space-y-4">
              {[
                'Stylizacja rzęs',
                'Manicure premium',
                'Kosmetologia twarzy',
                'Depilacja laserowa',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-2xl bg-white/5 border border-white/10 p-5"
                >
                  <span>{item}</span>
                  <button className="text-[#D4B483] text-sm uppercase tracking-wide">
                    Rezerwuj
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-24 bg-[#F8F5F2]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-sm tracking-[0.3em] uppercase text-[#B08B57] mb-4">
              Social Proof
            </div>
            <h2 className="text-4xl lg:text-6xl font-light leading-tight">
              Klientki wracają do Noblu regularnie
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Anna K.',
                text: 'Najpiękniejszy salon beauty w Poznaniu. Perfekcyjna obsługa i świetna atmosfera.',
              },
              {
                name: 'Julia M.',
                text: 'Rezerwacja online działa błyskawicznie, a efekty zabiegów są absolutnie premium.',
              },
              {
                name: 'Karolina W.',
                text: 'To miejsce wygląda jak luksusowe SPA z Mediolanu. Wrócę na pewno.',
              },
            ].map((review) => (
              <div
                key={review.name}
                className="bg-white rounded-[2rem] p-10 border border-[#EFE8E1] shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
              >
                <div className="text-[#D4B483] text-2xl mb-6">★★★★★</div>
                <p className="text-lg leading-relaxed text-[#3A3937] mb-8">
                  “{review.text}”
                </p>
                <div className="font-medium">{review.name}</div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-4 gap-6">
            {['Instagram Feed', 'Google Reviews', 'Booksy Opinie', 'TikTok Beauty'].map((item) => (
              <div
                key={item}
                className="h-44 rounded-[2rem] bg-white border border-[#EFE8E1] flex items-center justify-center text-[#7A756E]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCAL SEO */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-sm tracking-[0.3em] uppercase text-[#B08B57] mb-4">
              Lokalna widoczność
            </div>
            <h2 className="text-4xl lg:text-6xl font-light leading-tight">
              Strona przygotowana pod lokalne SEO
            </h2>

            <div className="mt-10 space-y-6">
              {[
                'Frazy typu „salon beauty Poznań” i „stylizacja rzęs Poznań”',
                'Optymalizacja Google Business Profile',
                'Struktura usług i lokalizacji pod SEO',
                'Szybkość działania i Core Web Vitals',
                'Schema.org dla salonów beauty',
              ].map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#D4B483] mt-1"></div>
                  <p className="text-lg text-[#5B5956]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] overflow-hidden border border-[#EFE8E1] bg-[#F8F5F2] p-10">
            <div className="text-sm uppercase tracking-[0.2em] text-[#B08B57] mb-4">
              Google Visibility
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#EFE8E1]">
              <div className="text-sm text-[#7A756E] mb-3">
                Wynik wyszukiwania Google
              </div>

              <div className="text-[#1A0DAB] text-2xl leading-snug">
                Noblu Beauty Room — Salon Beauty Premium w Poznaniu
              </div>

              <div className="text-[#006621] text-sm mt-2">
                noblubeautyroom.pl
              </div>

              <p className="mt-4 text-[#4D5156] leading-relaxed">
                Stylizacja rzęs, manicure premium, depilacja laserowa i kosmetologia twarzy w luksusowym salonie beauty w Poznaniu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-[#111111] text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-sm tracking-[0.3em] uppercase text-[#D4B483] mb-4">
            Premium Beauty Experience
          </div>

          <h2 className="text-5xl lg:text-7xl font-light leading-tight">
            Gotowa na wizytę
            <span className="block text-[#D4B483]">w Noblu?</span>
          </h2>

          <p className="mt-8 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Zarezerwuj swój termin online i odkryj miejsce stworzone z myślą o nowoczesnym beauty premium.
          </p>

          <button className="mt-10 px-10 py-5 rounded-full bg-[#D4B483] text-black font-medium text-lg hover:scale-105 transition-transform">
            Rezerwuj wizytę
          </button>
        </div>
      </section>
    </div>
  )
}
