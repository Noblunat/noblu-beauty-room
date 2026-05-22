import Image from 'next/image'

const services = [
  {
    title: 'Manicure Premium',
    description:
      'Perfekcyjna stylizacja paznokci wykonywana z dbałością o każdy detal.',
  },
  {
    title: 'Pedicure SPA',
    description:
      'Relaksujący rytuał beauty połączony z pielęgnacją premium.',
  },
  {
    title: 'Stylizacja Paznokci',
    description:
      'Nowoczesne trendy i eleganckie wykończenie dopasowane do Ciebie.',
  },
  {
    title: 'Beauty Treatments',
    description:
      'Ekskluzywne zabiegi tworzące doświadczenie luxury beauty.',
  },
]

const reviews = [
  {
    author: 'Anna K.',
    content:
      'Najpiękniejszy salon beauty w Krakowie. Klimat premium i perfekcyjna obsługa.',
  },
  {
    author: 'Julia M.',
    content:
      'Rezerwacja przez Booksy jest bardzo wygodna, a paznokcie wyglądają luksusowo.',
  },
  {
    author: 'Karolina W.',
    content:
      'To miejsce wygląda jak butikowe SPA z Mediolanu. Wrócę na pewno.',
  },
]

export default function NobluBeautyRoomWebsite() {
  return (
    <main className="bg-[#0F0F0F] text-white overflow-hidden">
      {/* NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[#D4B483] flex items-center justify-center text-[#D4B483] tracking-[0.2em] text-xs">
              NB
            </div>

            <div>
              <div className="text-lg font-medium tracking-wide">
                Noblu Beauty Room
              </div>
              <div className="text-xs uppercase tracking-[0.3em] text-white/40">
                Kraków
              </div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-10 text-sm text-white/70 tracking-wide">
            <a href="#services" className="hover:text-white transition-colors">
              Oferta
            </a>
            <a href="#reviews" className="hover:text-white transition-colors">
              Opinie
            </a>
            <a href="#instagram" className="hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Kontakt
            </a>
          </nav>

          <a
            href="https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow"
            target="_blank"
            className="rounded-full bg-[#D4B483] px-6 py-3 text-black text-sm font-medium hover:scale-105 transition-transform"
          >
            Rezerwuj
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#D4B483,transparent_35%)] opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-40 pb-24 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center rounded-full border border-white/10 px-5 py-2 uppercase tracking-[0.3em] text-xs text-[#D4B483] mb-8">
              Premium Beauty Experience
            </div>

            <h1 className="text-6xl lg:text-8xl font-light leading-[0.95] tracking-tight">
              Noblu
              <span className="block text-[#D4B483] font-medium">
                Beauty Room
              </span>
            </h1>

            <p className="mt-8 text-lg text-white/70 leading-relaxed max-w-xl">
              Kameralny salon beauty premium w Krakowie. Stylizacja paznokci, manicure premium i doświadczenie stworzone dla kobiet kochających estetykę luxury beauty.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow"
                target="_blank"
                className="rounded-full bg-[#D4B483] text-black px-8 py-5 font-medium hover:scale-105 transition-transform"
              >
                Zarezerwuj online
              </a>

              <a
                href="https://www.instagram.com/noblu_beauty_room/"
                target="_blank"
                className="rounded-full border border-white/10 px-8 py-5 hover:bg-white hover:text-black transition-all"
              >
                Instagram
              </a>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-8 max-w-lg">
              <div>
                <div className="text-3xl font-semibold">4.9</div>
                <div className="text-sm text-white/40 mt-1">Ocena klientek</div>
              </div>

              <div>
                <div className="text-3xl font-semibold">24/7</div>
                <div className="text-sm text-white/40 mt-1">Booksy online</div>
              </div>

              <div>
                <div className="text-3xl font-semibold">Premium</div>
                <div className="text-sm text-white/40 mt-1">Luxury salon</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-20 -right-10 w-72 h-72 rounded-full bg-[#D4B483] blur-3xl opacity-20"></div>

            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#1A1A1A] shadow-2xl">
              <div className="aspect-[4/5] bg-gradient-to-br from-[#E8D6BE] via-[#D4B483] to-[#8A6A44] flex items-center justify-center">
                <div className="w-72 h-72 rounded-full border-[6px] border-[#F5E1B3]/80"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-[#F8F5F2] text-black py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16">
            <div className="uppercase tracking-[0.3em] text-sm text-[#B08B57] mb-4">
              Oferta premium
            </div>

            <h2 className="text-5xl lg:text-6xl font-light leading-tight">
              Najbardziej pożądane zabiegi beauty
            </h2>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="overflow-hidden rounded-[2rem] bg-white border border-[#EFE8E1] shadow-[0_10px_40px_rgba(0,0,0,0.04)] group"
              >
                <div className="h-64 bg-gradient-to-br from-[#E8D6BE] to-[#B08B57]"></div>

                <div className="p-8">
                  <h3 className="text-2xl mb-4">{service.title}</h3>

                  <p className="text-[#6D6B68] leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <a
                    href="https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow"
                    target="_blank"
                    className="uppercase tracking-[0.2em] text-sm text-[#B08B57] group-hover:translate-x-1 transition-transform inline-block"
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
      <section className="py-28 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="uppercase tracking-[0.3em] text-sm text-[#D4B483] mb-4">
              Rezerwacja online
            </div>

            <h2 className="text-5xl lg:text-6xl font-light leading-tight">
              Umów wizytę
              <span className="block text-[#D4B483]">w kilka sekund</span>
            </h2>

            <p className="mt-8 text-lg text-white/70 max-w-xl leading-relaxed">
              Booksy jest centralnym elementem strony — klientka może natychmiast zarezerwować usługę online bez dzwonienia.
            </p>

            <a
              href="https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow"
              target="_blank"
              className="inline-flex mt-10 rounded-full bg-[#D4B483] px-8 py-5 text-black font-medium hover:scale-105 transition-transform"
            >
              Przejdź do Booksy
            </a>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#1A1A1A] p-10">
            <div className="space-y-5">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 flex items-center justify-between"
                >
                  <span>{service.title}</span>

                  <a
                    href="https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow"
                    target="_blank"
                    className="uppercase text-sm tracking-[0.2em] text-[#D4B483]"
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
      <section id="reviews" className="bg-white text-black py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="uppercase tracking-[0.3em] text-sm text-[#B08B57] mb-4">
              Opinie klientek
            </div>

            <h2 className="text-5xl lg:text-6xl font-light leading-tight">
              Beauty experience,
              <span className="block">do którego chce się wracać</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div
                key={review.author}
                className="rounded-[2rem] bg-[#F8F5F2] border border-[#EFE8E1] p-10"
              >
                <div className="text-[#D4B483] text-2xl mb-6">★★★★★</div>

                <p className="text-lg leading-relaxed text-[#3A3937] mb-8">
                  “{review.content}”
                </p>

                <div className="font-medium">{review.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section id="instagram" className="bg-[#F8F5F2] py-28 text-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-14">
            <div>
              <div className="uppercase tracking-[0.3em] text-sm text-[#B08B57] mb-4">
                Instagram
              </div>

              <h2 className="text-5xl lg:text-6xl font-light leading-tight">
                @noblu_beauty_room
              </h2>
            </div>

            <a
              href="https://www.instagram.com/noblu_beauty_room/"
              target="_blank"
              className="rounded-full border border-black px-6 py-3 hover:bg-black hover:text-white transition-all"
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
      <section id="contact" className="bg-[#111111] py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <div className="uppercase tracking-[0.3em] text-sm text-[#D4B483] mb-4">
              Kontakt
            </div>

            <h2 className="text-5xl lg:text-6xl font-light leading-tight">
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

          <div className="rounded-[2rem] overflow-hidden border border-white/10 bg-[#1A1A1A] h-[500px] flex items-center justify-center text-white/40">
            Google Maps Embed
          </div>
        </div>
      </section>
    </main>
  )
}
