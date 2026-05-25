'use client'

import Script from 'next/script'

import { motion } from 'framer-motion'
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
  ];
  const galleryItems = [
  { src: "/gallery/salon/salon.mp4", type: "video", category: "Salon" },
  { src: "/gallery/salon/salon1.JPEG", type: "image", category: "Salon" },
  { src: "/gallery/salon/salon2.jpg", type: "image", category: "Salon" },

  { src: "/gallery/paznokcie/IMG_6334.JPG", type: "image", category: "Paznokcie" },
  { src: "/gallery/paznokcie/IMG_6375.JPG", type: "image", category: "Paznokcie" },
  { src: "/gallery/paznokcie/IMG_6470.JPG", type: "image", category: "Paznokcie" },

  { src: "/gallery/rzesy/IMG_6498.JPG", type: "image", category: "Rzęsy" },
  { src: "/gallery/rzesy/IMG_7228.JPG", type: "image", category: "Rzęsy" },
]

  return (
  <div className="min-h-screen bg-[#F8F5F2] text-[#1D1D1B] overflow-hidden pb-24 lg:pb-0">

    <Script
      src="https://elfsightcdn.com/platform.js"
      strategy="lazyOnload"
    />

    <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BeautySalon",
      name: "Noblu Beauty Room",
      image: "https://noblu.pl/logo.png",
      url: "https://noblu.pl",
      telephone: "+48662989534",
      email: "noblu.beautyroom@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Orzechowa 4/lok.1",
        addressLocality: "Kraków",
        postalCode: "30-422",
        addressCountry: "PL",
      },
      areaServed: "Kraków",
      priceRange: "$$",
      sameAs: [
        "https://www.instagram.com/noblu_beauty_room/",
        "https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow",
      ],
    }),
  }}
/>

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Gdzie znajduje się Noblu Beauty Room?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Noblu Beauty Room znajduje się w Krakowie przy ul. Orzechowej 4/lok.1.",
          },
        },
        {
          "@type": "Question",
          name: "Czy można zarezerwować wizytę online?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tak, wizytę można zarezerwować online przez Booksy.",
          },
        },
        {
          "@type": "Question",
          name: "Jakie usługi oferuje Noblu Beauty Room?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Salon oferuje manicure premium, stylizację paznokci, pedicure oraz stylizację rzęs.",
          },
        },
      ],
    }),
  }}
/>
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
<section className="relative min-h-screen bg-[#0A0A0A] text-white flex items-center overflow-hidden">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#D4B483,transparent_35%)] opacity-25"></div>
  <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0A0A0A] to-transparent"></div>

  <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-40 pb-24 grid lg:grid-cols-2 gap-20 items-center">
    <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>
      <div className="inline-flex items-center px-4 py-2 rounded-full border border-[#D4B483]/30 bg-white/5 backdrop-blur-xl text-[#D4B483] text-xs uppercase tracking-[0.3em] mb-8">
        Premium Beauty Room · Kraków
      </div>

      <h1 className="text-6xl lg:text-8xl font-light leading-[0.92] tracking-tight">
        Noblu
        <span className="block text-[#D4B483] font-medium">
          Beauty Room
        </span>
      </h1>

      <p className="mt-8 text-lg lg:text-xl text-white/70 leading-relaxed max-w-xl">
        Kameralny salon beauty premium w Krakowie. Stylizacja paznokci, rzęs i doświadczenie stworzone dla kobiet kochających elegancję, estetykę oraz perfekcyjne wykonanie.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href="https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-5 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform shadow-[0_20px_60px_rgba(212,180,131,0.35)]"
        >
          Zarezerwuj online
        </a>

        <a
          href="https://www.instagram.com/noblu_beauty_room/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white hover:text-black transition-all"
        >
          Zobacz efekty
        </a>
      </div>

      <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="text-3xl font-semibold">4.9</div>
          <div className="text-white/50 text-sm mt-1">Ocena klientek</div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="text-3xl font-semibold">24/7</div>
          <div className="text-white/50 text-sm mt-1">Booksy online</div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="text-3xl font-semibold">Premium</div>
          <div className="text-white/50 text-sm mt-1">Beauty studio</div>
        </div>
      </div>

</motion.div>
    <div className="relative">
      <div className="absolute -top-16 -right-10 w-80 h-80 bg-[#D4B483] rounded-full blur-3xl opacity-20"></div>

      <motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="relative rounded-[3rem] overflow-hidden border border-white/10 bg-white/[0.04] p-4 shadow-2xl backdrop-blur-xl"
>
        <div className="aspect-[4/5] rounded-[2.3rem] bg-gradient-to-br from-[#E8D6BE] via-[#D4B483] to-[#8A6A44] flex items-center justify-center p-16">
          <img
            src="/logo.png"
            alt="Noblu Beauty Room"
            className="w-64 h-64 object-contain opacity-90"
          />
        </div>
       </motion.div>
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
  <motion.div
    key={service}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="rounded-[2rem] bg-white border border-[#EFE8E1] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] group"
  >
                <div className="h-64 overflow-hidden">
  <img
    src={
      service === "Manicure Premium"
        ? "/gallery/paznokcie/IMG_6334.JPG"
        : service === "Pedicure SPA"
        ? "/gallery/paznokcie/IMG_6470.JPG"
        : service === "Stylizacja Paznokci"
        ? "/gallery/paznokcie/IMG_6375.JPG"
        : "/gallery/rzesy/IMG_6498.JPG"
    }
    alt={service}
    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
  />
</div>

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
              </motion.div>
            ))}
          </div>
          </div>
      </section>

{/* GALLERY */}
<section className="py-28 bg-[#F8F5F2]">
  <div className="max-w-7xl mx-auto px-6 lg:px-12">

    <div className="mb-16">
      <div className="text-sm uppercase tracking-[0.3em] text-[#B08B57] mb-4">
        Gallery
      </div>

      <h2 className="text-4xl lg:text-6xl font-light leading-tight text-[#111111]">
        Luxury beauty
        <span className="block text-[#B08B57]">
          experience
        </span>
      </h2>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
  {galleryItems.map((item) => (
  <div
    key={item.src}
    className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#111111]"
  >
    {item.type === "video" ? (
      <video
        src={item.src}
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    ) : (
      <img
        src={item.src}
        alt="Noblu Beauty Room"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    )}

    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-700"></div>
  </div>
))}
</div>
    </div>
</section>
      {/* INSTAGRAM */}
<section id="instagram" className="py-28 bg-[#111111] text-white border-t border-white/5">
  <div className="max-w-7xl mx-auto px-6 lg:px-12">

    <div className="flex items-center justify-between mb-14">
      <div>
        <div className="text-sm uppercase tracking-[0.3em] text-[#D4B483] mb-4">
          Instagram
        </div>

        <h2 className="text-4xl lg:text-6xl font-light">
          @noblu_beauty_room
        </h2>
      </div>

      <a
        href="https://www.instagram.com/noblu_beauty_room/"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden lg:flex px-6 py-3 rounded-full border border-white/10 hover:border-[#D4B483] transition-colors"
      >
        Obserwuj
      </a>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

      <div className="rounded-[2rem] overflow-hidden">
  <div
    className="elfsight-app-fdbac9e5-8347-437d-a054-33662ac4b4be"
    data-elfsight-app-lazy
  ></div>
</div>

    </div>

  </div>
</section>
{/* BOOKSY BOOKING */}
<section className="py-28 bg-[#0A0A0A] text-white">
  <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
    <div>
      <div className="text-sm uppercase tracking-[0.3em] text-[#D4B483] mb-4">
        Rezerwacja online
      </div>

      <h2 className="text-4xl lg:text-6xl font-light leading-tight">
        Umów wizytę
        <span className="block text-[#D4B483]">przez Booksy</span>
      </h2>

      <p className="mt-8 text-white/70 text-lg leading-relaxed max-w-xl">
        Wybierz usługę, dogodny termin i zarezerwuj wizytę online w Noblu Beauty Room bez dzwonienia.
      </p>

      <a
        href="https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex mt-10 px-10 py-5 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform"
      >
        Przejdź do Booksy
      </a>
    </div>

    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
      {["Manicure Premium", "Stylizacja paznokci", "Pedicure SPA", "Beauty Room"].map((item) => (
        <a
          key={item}
          href="https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-5 mb-4 hover:border-[#D4B483]/50 transition-colors"
        >
          <span>{item}</span>
          <span className="text-[#D4B483] text-sm uppercase tracking-[0.2em]">
            Rezerwuj
          </span>
        </a>
      ))}
    </div>
  </div>
</section>
{/* FAQ */}
<section id="faq" className="py-28 bg-[#0A0A0A] text-white">
  <div className="max-w-5xl mx-auto px-6 lg:px-12">

    <div className="mb-16">
      <div className="text-sm uppercase tracking-[0.3em] text-[#D4B483] mb-4">
        FAQ
      </div>

      <h2 className="text-4xl lg:text-6xl font-light">
        Najczęstsze pytania
      </h2>
    </div>

    <div className="space-y-8 mt-12">

      {[
        {
          q: "Gdzie znajduje się Noblu Beauty Room?",
          a: "Salon znajduje się w Krakowie przy ul. Orzechowej 4/lok.1.",
        },
        {
          q: "Czy można zarezerwować wizytę online?",
          a: "Tak, rezerwacja wizyt odbywa się online przez Booksy 24/7.",
        },
        {
          q: "Jakie usługi oferuje salon?",
          a: "Oferujemy manicure premium, stylizację paznokci, pedicure oraz usługi beauty premium.",
        },
        {
          q: "Czy salon przyjmuje nowe klientki?",
          a: "Tak, nowe klientki mogą wygodnie zarezerwować wizytę online.",
        },
      ].map((faq) => (
        <div
          key={faq.q}
          className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
        >
          <h3 className="text-xl text-white mb-4">
            {faq.q}
          </h3>

          <p className="text-white/70 leading-relaxed">
            {faq.a}
          </p>
        </div>
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
      className="fixed bottom-5 left-5 right-5 z-[9999] rounded-full bg-[#D4B483] py-5 text-center text-lg font-semibold text-black shadow-[0_10px_40px_rgba(212,180,131,0.45)] lg:hidden"
    >
      Zarezerwuj wizytę
    </a>
  </div>
  )
}