'use client'
import { useEffect, useState } from 'react'
import Script from 'next/script'

import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
export default function NobluBeautyRoomWebsite() {
  const [loading, setLoading] = useState(true)
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null)
const [selectedType, setSelectedType] = useState<'image' | 'video' | null>(null)

useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false)
  }, 1800)

  return () => clearTimeout(timer)
}, [])

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
  const cursorX = useMotionValue(0)
const cursorY = useMotionValue(0)

const smoothX = useSpring(cursorX, {
  stiffness: 120,
  damping: 25,
})

const smoothY = useSpring(cursorY, {
  stiffness: 120,
  damping: 25,
})

const { scrollY, scrollYProgress } = useScroll()

const heroParallaxY = useTransform(
  scrollY,
  [0, 600],
  [0, 80]
)

const scaleX = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
})

const galleryItems = [
  // SALON
  { src: "/gallery/salon/salon.mp4", type: "video", category: "Salon" },
  { src: "/gallery/salon/salon2.mp4", type: "video", category: "Salon" },
  { src: "/gallery/salon/salon3.mp4", type: "video", category: "Salon" },
  { src: "/gallery/salon/salon4.mp4", type: "video", category: "Salon" },
  { src: "/gallery/salon/salon5.mp4", type: "video", category: "Salon" },
  { src: "/gallery/salon/salon6.mp4", type: "video", category: "Salon" },
  { src: "/gallery/salon/salon7.MOV", type: "video", category: "Salon" },
  { src: "/gallery/salon/salon8.mp4", type: "video", category: "Salon" },
  { src: "/gallery/salon/salon9.MOV", type: "video", category: "Salon" },
  { src: "/gallery/salon/salon10.MOV", type: "video", category: "Salon" },
  { src: "/gallery/salon/salon11.MOV", type: "video", category: "Salon" },

  { src: "/gallery/salon/salon1.JPEG", type: "image", category: "Salon" },
  { src: "/gallery/salon/salon2.jpg", type: "image", category: "Salon" },
  { src: "/gallery/salon/salon3.jpg", type: "image", category: "Salon" },
  { src: "/gallery/salon/salon4.jpg", type: "image", category: "Salon" },
  { src: "/gallery/salon/salon5.jpg", type: "image", category: "Salon" },
  { src: "/gallery/salon/salon6.JPEG", type: "image", category: "Salon" },
  { src: "/gallery/salon/salon7.jpg", type: "image", category: "Salon" },
  { src: "/gallery/salon/salon8.jpg", type: "image", category: "Salon" },
  { src: "/gallery/salon/salon9.jpg", type: "image", category: "Salon" },
  { src: "/gallery/salon/salon10.jpg", type: "image", category: "Salon" },
  { src: "/gallery/salon/salon11.jpg", type: "image", category: "Salon" },
  { src: "/gallery/salon/salon12.JPG", type: "image", category: "Salon" },

  // PAZNOKCIE
  { src: "/gallery/paznokcie/IMG_1745(1).JPEG", type: "image", category: "Paznokcie" },
  { src: "/gallery/paznokcie/IMG_2406(2).JPEG", type: "image", category: "Paznokcie" },
  { src: "/gallery/paznokcie/IMG_2440(1).JPEG", type: "image", category: "Paznokcie" },
  { src: "/gallery/paznokcie/IMG_6334.JPG", type: "image", category: "Paznokcie" },
  { src: "/gallery/paznokcie/IMG_6375.JPG", type: "image", category: "Paznokcie" },
  { src: "/gallery/paznokcie/IMG_6470.JPG", type: "image", category: "Paznokcie" },
  { src: "/gallery/paznokcie/IMG_6724.JPG", type: "image", category: "Paznokcie" },
  { src: "/gallery/paznokcie/IMG_6737(1).JPG", type: "image", category: "Paznokcie" },
  { src: "/gallery/paznokcie/IMG_6990.JPG", type: "image", category: "Paznokcie" },
  { src: "/gallery/paznokcie/IMG_6991.JPG", type: "image", category: "Paznokcie" },
  { src: "/gallery/paznokcie/IMG_6998.JPG", type: "image", category: "Paznokcie" },
  { src: "/gallery/paznokcie/IMG_7021.JPG", type: "image", category: "Paznokcie" },
  { src: "/gallery/paznokcie/IMG_7437.MOV", type: "video", category: "Paznokcie" },
  { src: "/gallery/paznokcie/IMG_7523.JPG", type: "image", category: "Paznokcie" },
  { src: "/gallery/paznokcie/IMG_7532.JPG", type: "image", category: "Paznokcie" },

  // RZĘSY
  { src: "/gallery/rzesy/IMG_6498.JPG", type: "image", category: "Rzęsy" },
  { src: "/gallery/rzesy/IMG_6993(1).JPG", type: "image", category: "Rzęsy" },
  { src: "/gallery/rzesy/IMG_7228.JPG", type: "image", category: "Rzęsy" },
  { src: "/gallery/rzesy/IMG_9083.JPG", type: "image", category: "Rzęsy" },
  { src: "/gallery/rzesy/IMG_9092.jpg", type: "image", category: "Rzęsy" },
]
const [visibleGalleryItems, setVisibleGalleryItems] = useState(
  galleryItems.slice(0, 6)
)

useEffect(() => {
  let start = 0

  const interval = setInterval(() => {
    start = (start + 6) % galleryItems.length

    const nextItems = Array.from({ length: 6 }, (_, index) => {
      return galleryItems[(start + index) % galleryItems.length]
    })

    setVisibleGalleryItems(nextItems)
  }, 6000)

  return () => clearInterval(interval)
}, [])
if (loading) {
  return (
    <div className="fixed inset-0 z-[99999] bg-[#0A0A0A] flex items-center justify-center overflow-hidden">

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="relative"
      >

        <div className="absolute inset-0 bg-[#D4B483]/30 blur-3xl rounded-full"></div>

        <img
          src="/logo.png"
          alt="Noblu Beauty Room"
          className="relative w-44 h-44 object-contain"
        />

      </motion.div>

    </div>
  )
}
  return (
    <div
  onMouseMove={(e) => {
    cursorX.set(e.clientX)
    cursorY.set(e.clientY)
  }}
  className="min-h-screen bg-[#F8F5F2] text-[#1D1D1B] overflow-hidden pb-24 lg:pb-0"
>

  <motion.div
    className="fixed left-0 right-0 top-0 z-[99999] h-[3px] origin-left bg-[#D4B483]"
    style={{ scaleX }}
  />

  <motion.div
    className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-96 w-96 rounded-full bg-[#D4B483]/40 blur-3xl lg:block"
    style={{
      x: smoothX,
      y: smoothY,
      translateX: "-50%",
      translateY: "-50%",
    }}
  />
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

  {[
    { number: "4.9", label: "Ocena klientek" },
    { number: "24/7", label: "Booksy online" },
    { number: "Premium", label: "Beauty studio" },
  ].map((item, index) => (
    <motion.div
      key={item.label}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
      }}
      viewport={{ once: true }}
      whileHover={{
        y: -6,
        scale: 1.03,
      }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        transition={{
          duration: 0.5,
          delay: index * 0.2,
        }}
        className="text-3xl font-semibold"
      >
        {item.number}
      </motion.div>

      <div className="text-white/50 text-sm mt-1">
        {item.label}
      </div>
    </motion.div>
  ))}

</div>
</motion.div>

<div className="relative">

  <div className="absolute -top-16 -right-10 w-80 h-80 bg-[#D4B483] rounded-full blur-3xl opacity-20"></div>
<motion.div
  style={{ y: heroParallaxY }}
  animate={{ scale: [1, 1.015, 1] }}
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
      {/* SEO CONTENT */}
<section className="py-28 bg-white border-t border-[#EFE8E1]">
  <div className="max-w-5xl mx-auto px-6 lg:px-12">

    <div className="text-sm uppercase tracking-[0.3em] text-[#B08B57] mb-4">
      Beauty Kraków
    </div>

    <h2 className="text-4xl lg:text-6xl font-light leading-tight mb-10">
      Premium beauty studio w Krakowie
    </h2>

    <div className="space-y-10 text-[#5F5B56] text-lg leading-relaxed">

      <p>
        Noblu Beauty Room to salon beauty oferujący manicure premium,
        stylizację paznokci, pedicure SPA oraz stylizację rzęs w eleganckim,
        kameralnym wnętrzu stworzonym dla kobiet ceniących estetykę, perfekcję
        i najwyższą jakość wykonania.
      </p>

      <p>
        Każdy zabieg wykonywany jest sterylnie z wykorzystaniem
        starannie wyselekcjonowanych produktów premium oraz z dbałością
        o każdy detal.
      </p>

      <p>
        Jeśli szukasz miejsca takiego jak premium salon beauty Kraków,
        manicure Kraków, pedicure Kraków lub stylizacja rzęs Kraków —
        Noblu Beauty Room oferuje doświadczenie beauty stworzone
        w duchu luksusu, minimalizmu i nowoczesnej estetyki.
      </p>

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

    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
  {visibleGalleryItems.map((item, index) => (
  <motion.div
  key={`gallery-slot-${index}`}
  onClick={() => {
    setSelectedMedia(item.src)
    setSelectedType(item.type as 'image' | 'video')
  }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-[2rem] bg-[#111111]"
    >
    <AnimatePresence mode="wait">
  {item.type === "video" ? (
    <motion.video
      key={item.src}
      src={item.src}
      autoPlay
      muted
      loop
      playsInline
      initial={{ opacity: 0, scale: 1.03 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.9 }}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  ) : (
    <motion.img
      key={item.src}
      src={item.src}
      alt="Noblu Beauty Room"
      initial={{ opacity: 0, scale: 1.03 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.9 }}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  )}
</AnimatePresence>

<div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-700"></div>

</motion.div>
))}
</div>
    </div>
</section>
{/* REVIEWS */}
<section className="py-28 bg-[#111111] text-white overflow-hidden">
  <div className="max-w-7xl mx-auto px-6 lg:px-12">

    <div className="mb-16">
      <div className="text-sm uppercase tracking-[0.3em] text-[#D4B483] mb-4">
        Opinie klientek
      </div>

      <h2 className="text-4xl lg:text-6xl font-light leading-tight">
        Kobiety wracają
        <span className="block text-[#D4B483]">
          dla jakości i atmosfery
        </span>
      </h2>
    </div>

    <div className="grid md:grid-cols-3 gap-6">

      {reviews.map((review, index) => (
        <motion.div
          key={review.name}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: index * 0.15,
          }}
          viewport={{ once: true }}
          whileHover={{
            y: -8,
          }}
          className="rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8"
        >

          <div className="text-[#D4B483] text-4xl mb-6">
            “
          </div>

          <p className="text-white/70 leading-relaxed mb-8">
            {review.text}
          </p>

          <div className="text-sm uppercase tracking-[0.2em] text-[#D4B483]">
            {review.name}
          </div>

        </motion.div>
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
{/* LOCATION */}
<section className="py-28 bg-[#F8F5F2]">
  <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">

    <div>

      <div className="text-sm uppercase tracking-[0.3em] text-[#B08B57] mb-4">
        Lokalizacja
      </div>

      <h2 className="text-4xl lg:text-6xl font-light leading-tight mb-8">
        Beauty destination
        <span className="block text-[#B08B57]">
          w sercu Krakowa
        </span>
      </h2>

      <p className="text-[#6D6B68] text-lg leading-relaxed mb-10 max-w-xl">
        Noblu Beauty Room mieści się w Krakowie przy ul. Orzechowej 4/lok.1.
        Kameralna przestrzeń premium została stworzona dla kobiet
        poszukujących luksusowego doświadczenia beauty, perfekcyjnej
        estetyki oraz najwyższej jakości usług.
      </p>

      <div className="space-y-6">

        <div>
          <div className="text-sm uppercase tracking-[0.2em] text-[#B08B57] mb-2">
            Adres
          </div>

          <div className="text-xl">
            Orzechowa 4/lok.1<br />
            30-422 Kraków
          </div>
        </div>

        <div>
          <div className="text-sm uppercase tracking-[0.2em] text-[#B08B57] mb-2">
            Rezerwacje
          </div>

          <a
            href="tel:+48662989534"
            className="text-xl hover:text-[#B08B57] transition-colors"
          >
            +48 662 989 534
          </a>
        </div>

      </div>
    </div>

    <div className="rounded-[2rem] overflow-hidden border border-[#EFE8E1] shadow-[0_20px_60px_rgba(0,0,0,0.08)] h-[500px]">
      <iframe
        src="https://www.google.com/maps?q=Orzechowa+4+Kraków&output=embed"
        width="100%"
        height="100%"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full border-0"
      />
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
    {selectedMedia && (
  <div
    className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
    onClick={() => {
      setSelectedMedia(null)
      setSelectedType(null)
    }}
  >
    <button
      className="absolute top-6 right-6 text-white text-4xl z-10"
      onClick={() => {
        setSelectedMedia(null)
        setSelectedType(null)
      }}
    >
      ×
    </button>

    {selectedType === "video" ? (
      <video
        src={selectedMedia}
        controls
        autoPlay
        className="max-h-[90vh] max-w-[90vw] rounded-[2rem] object-contain"
      />
    ) : (
      <img
        src={selectedMedia}
        alt="Noblu Beauty Room"
        className="max-h-[90vh] max-w-[90vw] rounded-[2rem] object-contain"
      />
    )}
  </div>
)}
{/* FOOTER */}
<footer className="relative overflow-hidden bg-[#0A0A0A] text-white border-t border-white/10">

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#D4B483,transparent_35%)] opacity-10"></div>

  <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24">

    <div className="grid lg:grid-cols-4 gap-16">

      <div>
        <img
          src="/logo.png"
          alt="Noblu Beauty Room"
          className="w-24 h-24 object-contain mb-6"
        />

        <p className="text-white/60 leading-relaxed max-w-sm">
          Premium beauty studio w Krakowie stworzone dla kobiet,
          które kochają estetykę, luksus oraz perfekcyjne wykonanie.
        </p>
      </div>

      <div>
        <div className="text-sm uppercase tracking-[0.3em] text-[#D4B483] mb-6">
          Usługi
        </div>

        <div className="space-y-4 text-white/70">
          <div>Manicure Premium</div>
          <div>Pedicure SPA</div>
          <div>Stylizacja Paznokci</div>
          <div>Stylizacja Rzęs</div>
        </div>
      </div>

      <div>
        <div className="text-sm uppercase tracking-[0.3em] text-[#D4B483] mb-6">
          Kontakt
        </div>

        <div className="space-y-4 text-white/70">
          <div>Orzechowa 4/lok.1</div>
          <div>30-422 Kraków</div>

          <a
            href="tel:+48662989534"
            className="block hover:text-[#D4B483] transition-colors"
          >
            +48 662 989 534
          </a>

          <a
            href="mailto:noblu.beautyroom@gmail.com"
            className="block hover:text-[#D4B483] transition-colors"
          >
            noblu.beautyroom@gmail.com
          </a>
        </div>
      </div>

      <div>
        <div className="text-sm uppercase tracking-[0.3em] text-[#D4B483] mb-6">
          Social Media
        </div>

        <div className="space-y-4">

          <a
            href="https://www.instagram.com/noblu_beauty_room/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-white/70 hover:text-[#D4B483] transition-colors"
          >
            Instagram
          </a>

          <a
            href="https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-white/70 hover:text-[#D4B483] transition-colors"
          >
            Booksy
          </a>

        </div>
      </div>

    </div>

    <div className="mt-20 pt-8 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6">

      <div className="text-white/40 text-sm">
        © 2025 Noblu Beauty Room · Kraków
      </div>

      <div className="text-white/30 text-sm tracking-[0.2em] uppercase">
        Premium Beauty Experience
      </div>

    </div>

  </div>
</footer>
  </div>
  )
}