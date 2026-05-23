export default function NobluBeautyRoomWebsite() {
  const services = [
    'Manicure Premium',
    'Pedicure SPA',
    'Stylizacja Paznokci',
    'Stylizacja rzęs',
  ]

  const reviews = [
    {
      name: 'Anna K.',
      text: 'Najpiękniejszy salon beauty w Krakowie. Wszystko dopracowane perfekcyjnie.',
    },
    {
      name: 'Julia M.',
      text: 'Rezerwacja przez Booksy działa błyskawicznie, a efekt paznokci jest premium.',
    },
    {
      name: 'Karolina W.',
      text: 'Piękne wnętrze, profesjonalizm i atmosfera jak w luksusowym SPA.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#F8F5F2] text-[#1D1D1B] overflow-hidden">
      {/* NAVBAR */}
<header className="fixed top-0 left-0 right-0 z-50 bg-black/40 border-b border-white/10 backdrop-blur-xl">
  <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">

    <div className="flex items-center gap-4">
      <img
        src="/logo.png"
        alt="Noblu Beauty Room"
        className="w-16 h-16 object-contain"
      />

      <div>
        <div className="text-white text-lg tracking-wide font-medium">
          Noblu Beauty Room
        </div>

        <div className="text-white/50 text-xs uppercase tracking-[0.2em]">
          Kraków
        </div>
      </div>
    </div>

    <a
      href="https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow"
      target="_blank"
      rel="noopener noreferrer"
      className="px-6 py-3 rounded-full bg-[#D4B483] text-black text-sm font-medium hover:scale-105 transition-transform"
    >
      Rezerwuj
    </a>

  </div>
</header>

      {/* HERO */}
      <section className="relative min-h-screen bg-[#111111] text-white flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#D4B483,transparent_35%)] opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-40 pb-24 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 text-[#D4B483] text-xs uppercase tracking-[0.3em] mb-8">
              Premium Beauty Experience
            </div>

            <h1 className="text-5xl lg:text-8xl font-light leading-[0.95] tracking-tight">
              Noblu
              <span className="block text-[#D4B483] font-medium">
                Beauty Room
              </span>
            </h1>

            <p className="mt-8 text-lg text-white/70 leading-relaxed max-w-xl">
              Kameralny salon beauty premium w Krakowie. Stylizacja paznokci i rzęs. Beauty experience stworzone dla kobiet kochających elegancję, estetykę i perfekcyjne wykonanie.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow"
                target="_blank"
                className="px-8 py-5 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform"
              >
                Zarezerwuj online
              </a>

              <a
                href="https://www.instagram.com/noblu_beauty_room/"
                target="_blank"
                className="px-8 py-5 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all"
              >
                Instagram
              </a>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-8 max-w-lg">
              <div>
                <div className="text-3xl font-semibold">4.9</div>
                <div className="text-white/50 text-sm mt-1">Ocena klientek</div>
              </div>

              <div>
                <div className="text-3xl font-semibold">24/7</div>
                <div className="text-white/50 text-sm mt-1">Booksy online</div>
              </div>

              <div>
                <div className="text-3xl font-semibold">Premium</div>
                <div className="text-white/50 text-sm mt-1">Beauty studio</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#D4B483] rounded-full blur-3xl opacity-20"></div>

            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#181818] shadow-2xl">
              <div className="aspect-[4/5] bg-gradient-to-br from-[#E8D6BE] via-[#D4B483] to-[#8A6A44] flex items-center justify-center p-16">
                <div className="w-full h-full rounded-full border-[6px] border-[#F7E6B2] opacity-80"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28 bg-[#F8F5F2]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16">
            <div className="text-sm uppercase tracking-[0.3em] text-[#B08B57] mb-4">
              Oferta premium
            </div>

            <h2 className="text-4xl lg:text-6xl font-light leading-tight">
              Najbardziej pożądane zabiegi beauty w Krakowie
            </h2>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service}
                className="rounded-[2rem] bg-white border border-[#EFE8E1] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] group"
              >
                <div className="h-64 bg-gradient-to-br from-[#E8D6BE] to-[#B08B57]"></div>

                <div className="p-8">
                  <h3 className="text-2xl mb-4">{service}</h3>

                  <p className="text-[#6D6B68] leading-relaxed mb-6">
                    Profesjonalne zabiegi wykonywane w luksusowej atmosferze z wykorzystaniem premium produktów.
                  </p>

                  <a
                    href="https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow"
                    target="_blank"
                    className="text-sm uppercase tracking-[0.2em] text-[#B08B57] group-hover:translate-x-1 transition-transform inline-block"
                  >
                    Rezerwuj →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-28 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-[#D4B483] mb-4">
              Rezerwacja online
            </div>

            <h2 className="text-4xl lg:text-6xl font-light leading-tight">
              Umów wizytę
              <span className="block text-[#D4B483]">w kilka sekund</span>
            </h2>

            <p className="mt-8 text-white/70 text-lg leading-relaxed max-w-xl">
              Booksy jest centralnym elementem strony — klientka może od razu wybrać usługę i zarezerwować termin online.
            </p>

            <a
              href="https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow"
              target="_blank"
              className="inline-flex mt-10 px-8 py-5 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform"
            >
              Przejdź do Booksy
            </a>
          </div>

          <div className="bg-[#1A1A1A] border border-white/10 rounded-[2rem] p-10">
            <div className="space-y-5">
              {services.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between p-5 rounded-2xl border border-white/10 bg-white/5"
                >
                  <span>{item}</span>

                  <a
                    href="https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow"
                    target="_blank"
                    className="text-[#D4B483] uppercase text-sm tracking-[0.2em]"
                  >
                    Book
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-sm uppercase tracking-[0.3em] text-[#B08B57] mb-4">
              Opinie klientek
            </div>

            <h2 className="text-4xl lg:text-6xl font-light leading-tight">
              Beauty experience,
              <span className="block">do którego chce się wracać</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="rounded-[2rem] border border-[#EFE8E1] bg-[#F8F5F2] p-10"
              >
                <div className="text-[#D4B483] text-2xl mb-6">★★★★★</div>

                <p className="text-lg leading-relaxed text-[#3A3937] mb-8">
                  “{review.text}”
                </p>

                <div className="font-medium">{review.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="py-28 bg-[#F8F5F2]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-14">
            <div>
              <div className="text-sm uppercase tracking-[0.3em] text-[#B08B57] mb-4">
                Instagram
              </div>

              <h2 className="text-4xl lg:text-6xl font-light leading-tight">
                @noblu_beauty_room
              </h2>
            </div>

            <a
              href="https://www.instagram.com/noblu_beauty_room/"
              target="_blank"
              className="px-6 py-3 rounded-full border border-black hover:bg-black hover:text-white transition-all"
            >
              Obserwuj profil
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="aspect-square rounded-[2rem] bg-gradient-to-br from-[#E8D6BE] to-[#B08B57]"
              ></div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-[#D4B483] mb-4">
              Kontakt
            </div>

            <h2 className="text-4xl lg:text-6xl font-light leading-tight">
              Noblu Beauty Room
            </h2>

            <div className="mt-10 space-y-8 text-white/70 text-lg">
              <div>
                <div className="text-white mb-2">Adres</div>
                <p>Orzechowa 4/lok.1</p>
                <p>30-422 Kraków</p>
              </div>

              <div>
                <div className="text-white mb-2">Telefon</div>
                <a href="tel:+48662989534" className="hover:text-white transition-colors">
                  662 989 534
                </a>
              </div>

              <div>
                <div className="text-white mb-2">E-mail</div>
                <a
                  href="mailto:noblu.beautyroom@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  noblu.beautyroom@gmail.com
                </a>
              </div>
            </div>
          </div>

                   <div className="rounded-[2rem] overflow-hidden border border-[#EFE8E1] h-[500px] shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <iframe
              title="Mapa dojazdu Noblu Beauty Room"
              src="https://maps.google.com/maps?q=Noblu%20Beauty%20Room%20Krak%C3%B3w&t=&z=17&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
referrerPolicy="no-referrer-when-downgrade"
/>

</div>
</div>
</section>

    <a
      href="https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 left-5 right-5 z-50 rounded-full bg-[#D4B483] py-4 text-center text-black font-medium shadow-2xl lg:hidden"
    >
      Zarezerwuj wizytę
    </a>
  </div>
  )
}