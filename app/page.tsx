'use client'
import { useEffect, useState } from 'react'
import Script from 'next/script'
import Image from "next/image"

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
    {
      title: "Manicure",
      href: "/manicure-krakow",
      image: "/gallery/paznokcie/IMG_6334.webp",
      alt: "Manicure premium w Noblu Beauty Room Kraków",
      description:
        "Precyzyjny manicure w Krakowie dla kobiet, które cenią zadbane dłonie, elegancki kształt paznokci i naturalny, dopracowany efekt.",
    },
    {
      title: "Pedicure SPA",
      href: "/pedicure-krakow",
      image: "/gallery/paznokcie/IMG_6470.webp",
      alt: "Pedicure SPA w Noblu Beauty Room Kraków",
      description:
        "Komfortowa pielęgnacja stóp i paznokci w spokojnej atmosferze salonu beauty przy ul. Orzechowej w Krakowie.",
    },
    {
      title: "Stylizacja Paznokci",
      href: "/stylizacja-hybrydowa-krakow",
      image: "/gallery/paznokcie/IMG_6375.webp",
      alt: "Stylizacja paznokci hybrydowych w Krakowie",
      description:
        "Stylizacja hybrydowa i żelowa dopasowana do dłoni, stylu i okazji. Estetyczne paznokcie z dbałością o trwałość oraz detal.",
    },
    {
      title: "Stylizacja rzęs",
      href: "/stylizacja-rzes-krakow",
      image: "/gallery/rzesy/IMG_6498.webp",
      alt: "Stylizacja rzęs w Noblu Beauty Room Kraków",
      description:
        "Natural look, rzęsy 1:1 i lekkie objętości dobierane do kształtu oka, urody i oczekiwanego efektu.",
    },
  ]
  const reviews = [
  {
    name: "Katarzyna",
    text: "Bardzo miła właścicielka...",
  },
  {
    name: "Justyna",
    text: "Piękne paznokcie, polecam.",
  },
  {
    name: "Katarzyna",
    text: "Bardzo polecam Panią i samą usługę. Manicure wykonany bez zarzutu. Dziękuję!",
  },
  {
    name: "Ania",
    text: "Super, polecam!",
  },
  {
    name: "Justyna",
    text: "Polecam, przepiękne paznokcie.",
  },
  {
    name: "Anna",
    text: "Po prostu super. Wszystko ok. Czyściutko i elegancko. Tak jak chciałam. Pełny profesjonalizm. Polecam.",
  },
  {
    name: "Ewa",
    text: "Super Super Super ❤️ Pani Natalia jest prawdziwą profesjonalistką. Żaden podolog nie pomógł mi przy problemie wrastających paznokci, a tutaj w końcu znalazłam pomoc. Ogromna wiedza, precyzja i przepiękna atmosfera salonu. Polecam każdej kobiecie.",
  },
  {
    name: "Anna",
    text: "Po prostu perfekcyjnie. Wszystko dopracowane w najmniejszym detalu — od estetyki salonu po wykonanie manicure. Czyściutko, elegancko i bardzo profesjonalnie. Dokładnie taki efekt, jaki chciałam osiągnąć.",
  },
  {
    name: "Izabela",
    text: "Profesjonalna obsługa i przepiękny efekt końcowy. Stylizacja rzęs wykonana idealnie, bardzo komfortowa atmosfera i ogromna dbałość o szczegóły. Zdecydowanie jedno z najlepszych beauty places w Krakowie.",
  },
  {
    name: "Katarzyna",
    text: "Piękny, luksusowy salon i cudowna atmosfera. Paznokcie wykonane perfekcyjnie, bardzo dokładnie i estetycznie. Widać ogromne doświadczenie i pasję do pracy. Zdecydowanie wrócę.",
  },
  {
    name: "Justyna",
    text: "Jestem zachwycona efektem. Paznokcie wyglądają przepięknie, wszystko wykonane bardzo starannie i z ogromnym wyczuciem estetyki. Rezerwacja przez Booksy szybka i wygodna.",
  },
  {
    name: "Iwona",
    text: "Jak zwykle wszystko na najwyższym poziomie ❤️ Profesjonalizm, estetyka i atmosfera sprawiają, że chce się wracać regularnie.",
  },
  ]

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
  { src: "/gallery/salon/salon5.mp4", type: "video", category: "Salon" },
  { src: "/gallery/salon/salon6.mp4", type: "video", category: "Salon" },
  { src: "/gallery/salon/salon8.mp4", type: "video", category: "Salon" },
  { src: "/gallery/salon/salon1.webp", type: "image", category: "Salon" },
  { src: "/gallery/salon/salon4.webp", type: "image", category: "Salon" },
  { src: "/gallery/salon/salon5.webp", type: "image", category: "Salon" },
  { src: "/gallery/salon/salon6.webp", type: "image", category: "Salon" },
  { src: "/gallery/salon/salon8.webp", type: "image", category: "Salon" },
  { src: "/gallery/salon/salon9.webp", type: "image", category: "Salon" },
  { src: "/gallery/salon/salon11.webp", type: "image", category: "Salon" },
  { src: "/gallery/salon/salon12.webp", type: "image", category: "Salon" },

  // PAZNOKCIE
  { src: "/gallery/paznokcie/IMG_1745(1).webp", type: "image", category: "Paznokcie" },
  { src: "/gallery/paznokcie/IMG_2406(2).webp", type: "image", category: "Paznokcie" },
  { src: "/gallery/paznokcie/IMG_2440(1).webp", type: "image", category: "Paznokcie" },
  { src: "/gallery/paznokcie/IMG_6334.webp", type: "image", category: "Paznokcie" },
  { src: "/gallery/paznokcie/IMG_6375.webp", type: "image", category: "Paznokcie" },
  { src: "/gallery/paznokcie/IMG_6470.webp", type: "image", category: "Paznokcie" },
  { src: "/gallery/paznokcie/IMG_6724.webp", type: "image", category: "Paznokcie" },
  { src: "/gallery/paznokcie/IMG_6737(1).webp", type: "image", category: "Paznokcie" },
  { src: "/gallery/paznokcie/IMG_6990.webp", type: "image", category: "Paznokcie" },
  { src: "/gallery/paznokcie/IMG_7021.webp", type: "image", category: "Paznokcie" },
  { src: "/gallery/paznokcie/IMG_7437.MOV", type: "video", category: "Paznokcie" },
  { src: "/gallery/paznokcie/IMG_7523.webp", type: "image", category: "Paznokcie" },
  // RZĘSY
  { src: "/gallery/rzesy/IMG_6498.webp", type: "image", category: "Rzęsy" },
  { src: "/gallery/rzesy/IMG_6993(1).webp", type: "image", category: "Rzęsy" },
  { src: "/gallery/rzesy/IMG_7228.webp", type: "image", category: "Rzęsy" },
  { src: "/gallery/rzesy/IMG_9083.webp", type: "image", category: "Rzęsy" },

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
  }, 16000)

  return () => clearInterval(interval)
}, [])

  return (
    <div
  onMouseMove={(e) => {
    cursorX.set(e.clientX)
    cursorY.set(e.clientY)
  }}
  className="min-h-screen bg-[#F8F5F2] text-[#1D1D1B] overflow-hidden pb-24 lg:pb-0"
>
  <AnimatePresence>
  {loading && (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[99999] bg-[#0A0A0A] flex items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-[#D4B483]/30 blur-3xl rounded-full" />

        <img
          src="/logo.png"
          alt="Noblu Beauty Room Kraków"
          className="relative w-44 h-44 object-contain"
        />
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

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

    
      {/* NAVBAR */}
<header className="fixed top-0 left-0 right-0 z-50 bg-white/60 border-b border-[#E8DED2] backdrop-blur-xl">
  <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">

    <div className="flex items-center gap-4">
      <img
  src="/logo.png"
  alt="Noblu Beauty Room Kraków"
  className="w-16 h-16 object-contain"
/>

      <div>
        <div className="text-[#1D1D1B] text-lg tracking-wide font-medium">
          Noblu Beauty Room
        </div>

        <div className="text-[#8A8178] text-xs uppercase tracking-[0.2em]">
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
<section className="relative min-h-screen bg-gradient-to-b from-[#FFFDFB] via-[#F8F5F2] to-[#EFE7DD] text-[#1D1D1B] flex items-center overflow-hidden">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#D4B483,transparent_35%)] opacity-25"></div>
  <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#EFE7DD] to-transparent"></div>

  <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-40 pb-24 grid lg:grid-cols-2 gap-20 items-center">
    <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>
      <h1 className="text-6xl lg:text-8xl font-light leading-[0.92] tracking-tight">
        Noblu
        <span className="block text-[#D4B483] font-medium">
          Beauty Room
        </span>
      </h1>

      <p className="mt-8 text-lg lg:text-xl text-[#6D6B68] leading-relaxed max-w-xl">
        Kameralny salon beauty w Krakowie. Stylizacja paznokci, rzęs i doświadczenie stworzone dla kobiet kochających elegancję, estetykę oraz perfekcyjne wykonanie.
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
          className="px-8 py-5 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform shadow-[0_20px_60px_rgba(212,180,131,0.35)]"
        >
          Zobacz efekty
        </a>

        <a
          href="/cennik"
          className="px-8 py-5 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform shadow-[0_20px_60px_rgba(212,180,131,0.35)]"
        >
          Cennik
        </a>
      </div>

      <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg">

  {[
    { number: "5.0", label: "Ocena klientek z Booksy" },
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
      className="rounded-2xl border border-[#E8DED2] bg-white/70 p-5 backdrop-blur-xl"
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

      <div className="text-[#6D6B68] text-sm mt-1">
        {item.label}
      </div>
    </motion.div>
  ))}
</div>
</motion.div>

</div>
</section>
      {/* SERVICES */}
      <section id="services" className="py-28 bg-[#F8F5F2]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16">
            <div className="text-sm uppercase tracking-[0.3em] text-[#B08B57] mb-4">
              Oferta
            </div>

            <h2 className="text-4xl lg:text-6xl font-light leading-tight">
              Najbardziej pożądane zabiegi beauty w Krakowie
            </h2>
          </div>
<div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          {services.map((service) => (
  <motion.div
    key={service.title}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="rounded-[2rem] bg-white border border-[#EFE8E1] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] group"
  >
                <div className="h-64 overflow-hidden">
  <img
    src={service.image}
    alt={service.alt}
    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
  />
</div>

                <div className="p-8">
                  <h3 className="text-2xl mb-4">{service.title}</h3>

                  <p className="text-[#6D6B68] leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <a
                    href={service.href}
                    className="text-sm uppercase tracking-[0.2em] text-[#B08B57] group-hover:translate-x-1 transition-transform inline-block"
                  >
                    Zobacz więcej →
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
  Salon beauty w Krakowie przy ul. Orzechowej
</h2>

    <div className="space-y-10 text-[#5F5B56] text-lg leading-relaxed">
  <p>
    Noblu Beauty Room to kameralny salon beauty.
    Oferujemy manicure premium, stylizację paznokci, pedicure SPA oraz
    stylizację rzęs dla kobiet, które cenią estetykę, dokładność i spokojną
    atmosferę wizyty.
  </p>

  <p>
    Salon znajduje się w wygodnej lokalizacji dla klientek z południa Krakowa:
    Podgórza, Łagiewnik, Borku Fałęckiego, Ruczaju i Kurdwanowa. Każdy zabieg
    wykonujemy z dbałością o higienę, komfort oraz naturalny, elegancki efekt.
    Pod salonem dostępny jest darmowy parking dla klientek.
  </p>

  <p>
    Jeśli szukasz miejsca na manicure w Krakowie, paznokcie hybrydowe,
    pedicure lub stylizację rzęs, Noblu Beauty Room łączy profesjonalne
    wykonanie z estetyką premium i wygodną rezerwacją online przez Booksy.
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

    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
  {visibleGalleryItems.map((item, index) => (
  <motion.div
  key={`gallery-slot-${index}`}
  onClick={() => {
    setSelectedMedia(item.src)
    setSelectedType(item.type as 'image' | 'video')
  }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-[1.6rem] bg-[#E8D6BE]/40"
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
      preload="none"
      initial={{ opacity: 0, scale: 1.03 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.9 }}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  ) : (
    <motion.div
  key={item.src}
  initial={{ opacity: 0, scale: 1.03 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.98 }}
  transition={{ duration: 0.9 }}
  className="absolute inset-0"
>
  <Image
    src={item.src}
    alt={`${item.category} w Noblu Beauty Room Kraków`}
    fill
    sizes="(max-width: 768px) 50vw, 33vw"
    className="object-cover transition-transform duration-700 group-hover:scale-105"
  />
</motion.div>
 )}
 </AnimatePresence>

<div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-700"></div>

</motion.div>
))}
</div>
    </div>
</section>
{/* REVIEWS */}
<section className="relative py-28 overflow-hidden bg-gradient-to-b from-[#FFFDFB] via-[#F8F5F2] to-[#EFE7DD] text-[#1D1D1B]">
  <div className="max-w-7xl mx-auto px-6 lg:px-12">

    <div className="mb-16">
      <div className="text-sm uppercase tracking-[0.3em] text-[#D4B483] mb-4">
        Opinie klientek
      </div>

      <h2 className="text-4xl lg:text-6xl font-light leading-tight">
        Kobiety wracają dla jakości i atmosfery
        <span className="block text-[#D4B483]">
           potwierdzają to opinie w Booksy
        </span>
      </h2>
    </div>

    <div className="grid md:grid-cols-3 gap-6">

      {reviews.map((review, index) => (
        <motion.div
          key={`${review.name}-${index}`}
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
          className="rounded-[2rem] border border-[#E8DED2] bg-white/70 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-8"
        >

          <div className="text-[#D4B483] text-4xl mb-6">
            “
          </div>

          <p className="text-[#6D6B68] leading-relaxed mb-8">
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
      {/* LOCAL SEO */}
<section className="py-24 bg-[#F8F5F2] border-t border-[#EFE8E1]">
  <div className="max-w-6xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-start">
    <div>
      <div className="text-sm uppercase tracking-[0.3em] text-[#B08B57] mb-4">
        Lokalizacja
      </div>

      <h2 className="text-4xl lg:text-5xl font-light leading-tight mb-8">
        Dojazd do Noblu Beauty Room 
      </h2>

      <div className="space-y-6 text-[#5F5B56] text-lg leading-relaxed">
        <p>
          Salon znajduje się przy ul. Orzechowej 4/lok.1 w Krakowie, w
          południowej części miasta. To wygodny adres dla klientek z Borku
          Fałęckiego, Łagiewnik, Ruczaju, Kurdwanowa, Podgórza Duchackiego,
          Woli Duchackiej i Swoszowic. Pod salonem dostępny jest darmowy
          parking, dlatego wizytę można wygodnie zaplanować także przy dojeździe
          samochodem.
        </p>

        <p>
          Jeśli szukasz miejsca na manicure, pedicure albo przedłużanie rzęs w
          Krakowie, możesz umówić wizytę online i łatwo zaplanować dojazd z
          pobliskich dzielnic.
        </p>
      </div>
    </div>

    <div className="rounded-[2rem] border border-[#E8DED2] bg-white/80 p-8">
      <h3 className="text-3xl font-light mb-6">Najczęściej wybierane usługi lokalnie</h3>

      <div className="grid gap-4 text-[#1D1D1B]">
        <a href="/przedluzanie-rzes-krakow" className="flex items-center justify-between rounded-2xl border border-[#E8DED2] bg-white p-5 hover:border-[#D4B483] transition-colors">
          <span>Przedłużanie rzęs Kraków</span>
          <span className="text-[#B08B57]">Zobacz</span>
        </a>
        <a href="/stylizacja-rzes-krakow" className="flex items-center justify-between rounded-2xl border border-[#E8DED2] bg-white p-5 hover:border-[#D4B483] transition-colors">
          <span>Stylizacja rzęs Borek Fałęcki i okolice</span>
          <span className="text-[#B08B57]">Zobacz</span>
        </a>
        <a href="/manicure-krakow" className="flex items-center justify-between rounded-2xl border border-[#E8DED2] bg-white p-5 hover:border-[#D4B483] transition-colors">
          <span>Manicure Kraków południe</span>
          <span className="text-[#B08B57]">Zobacz</span>
        </a>
      </div>
    </div>
  </div>
</section>

{/* INSTAGRAM */}
<section id="instagram" className="py-28 bg-gradient-to-b from-[#FFFDFB] to-[#F8F5F2] text-[#1D1D1B] border-t border-white/5">
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
        className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(212,180,131,0.25)]"
      >
        Obserwuj
      </a>
    </div>

    <div className="overflow-x-auto overflow-y-hidden pb-4 scrollbar-hide">
  <div className="min-w-[1400px] rounded-[2rem] overflow-hidden">
    <div
  className="elfsight-app-3c7474f5-b323-4f42-a3d9-adffc9a0e6c8"
  data-elfsight-app-lazy
></div>
  </div>
</div>

  </div>
</section>

{/* BOOKSY BOOKING */}
<section className="py-28 bg-gradient-to-b from-[#FFFDFB] via-[#F8F5F2] to-[#EFE7DD] text-[#1D1D1B]">
  <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
    <div>
      <div className="text-sm uppercase tracking-[0.3em] text-[#D4B483] mb-4">
        Rezerwacja online
      </div>

      <h2 className="text-4xl lg:text-6xl font-light leading-tight">
        Umów wizytę
        <span className="block text-[#D4B483]">przez Booksy</span>
      </h2>

      <p className="mt-8 text-[#6D6B68] text-lg leading-relaxed max-w-xl">
        Wybierz usługę, dogodny termin i zarezerwuj wizytę online w Noblu Beauty Room bez dzwonienia.
      </p>

      <a
        href="https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(212,180,131,0.25)]"
      >
        Przejdź do Booksy
      </a>
    </div>

    <div className="rounded-[2rem] border border-[#E8DED2] bg-white/70 p-8 backdrop-blur-xl">
      {["Manicure", "Stylizacja hybrydowa", "Pedicure", "Stylizacja rzęs"].map((item) => (
        <a
          key={item}
          href="https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-2xl border border-[#E8DED2] bg-white p-5 mb-4 hover:border-[#D4B483]/50 transition-colors"
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
<section id="faq" className="py-28 bg-gradient-to-b from-[#FFFDFB] via-[#F8F5F2] to-[#EFE7DD] text-[#1D1D1B]">
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
          className="rounded-[2rem] border border-[#E8DED2] bg-white/70 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
        >
          <h3 className="text-xl text-[#1D1D1B] mb-4">
            {faq.q}
          </h3>

          <p className="text-[#6D6B68] leading-relaxed">
            {faq.a}
          </p>
        </div>
        ))}
</div>

</div>
</section>

      {/* CONTACT */}
      <section id="contact" className="py-28 bg-gradient-to-b from-[#FFFDFB] via-[#F8F5F2] to-[#EFE7DD] text-[#1D1D1B]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-[#D4B483] mb-4">
              Kontakt
            </div>

            <h2 className="text-4xl lg:text-6xl font-light leading-tight">
              Noblu Beauty Room
            </h2>

            <div className="mt-10 space-y-8 text-[#6D6B68] text-lg">
              <div>
                <div className="text-[#1D1D1B] mb-2">Adres</div>
                <p>Orzechowa 4/lok.1</p>
                <p>30-422 Kraków</p>
              </div>

              <div>
                <div className="text-[#1D1D1B] mb-2">Telefon</div>
                <a href="tel:+48662989534" className="hover:text-[#1D1D1B] transition-colors">
                  662 989 534
                </a>
              </div>

              <div>
                <div className="text-[#1D1D1B] mb-2">E-mail</div>
                <a
                  href="mailto:noblu.beautyroom@gmail.com"
                  className="hover:text-[#B08B57] transition-colors"
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
        alt="Noblu Beauty Room Kraków"
        className="max-h-[90vh] max-w-[90vw] rounded-[2rem] object-contain"
      />
    )}
  </div>
)}
{/* FOOTER */}
<footer className="relative overflow-hidden bg-gradient-to-b from-[#F8F5F2] to-[#EFE7DD] text-[#1D1D1B]">

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#D4B483,transparent_35%)] opacity-10"></div>

  <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24">

    <div className="grid lg:grid-cols-4 gap-16">

      <div>
        <img
          src="/logo.png"
          alt="Noblu Beauty Room Kraków"
          className="w-24 h-24 object-contain mb-6"
        />

        <p className="text-[#1D1D1B] leading-relaxed max-w-sm">
          Beauty studio w Krakowie stworzone dla kobiet,
          które kochają estetykę oraz perfekcyjne wykonanie.
        </p>
      </div>

      <div>
        <div className="text-sm uppercase tracking-[0.3em] text-[#D4B483] mb-6">
          Usługi
        </div>

        <div className="space-y-4 text-[#1D1D1B]">

          <a
            href="/manicure-krakow"
            className="block hover:text-[#D4B483] transition-colors"
          >
            Manicure Kraków
          </a>

          <a
            href="/stylizacja-rzes-krakow"
            className="block hover:text-[#D4B483] transition-colors"
          >
            Stylizacja rzęs Kraków
          </a>
          <a
            href="/przedluzanie-rzes-krakow"
            className="block hover:text-[#D4B483] transition-colors"
          >
            Przedłużanie rzęs Kraków
          </a>
          <a
            href="/stylizacja-hybrydowa-krakow"
            className="block hover:text-[#D4B483] transition-colors"
          >
            Stylizacja hybrydowa Kraków
          </a>

          <a
            href="/pedicure-krakow"
            className="block hover:text-[#D4B483] transition-colors"
          >
            Pedicure Kraków
          </a>

        </div>
      </div>

      <div>
        <div className="text-sm uppercase tracking-[0.3em] text-[#D4B483] mb-6">
          Kontakt
        </div>

        <div className="space-y-4 text-[#1D1D1B]">
          <div>Orzechowa 4/lok.1</div>
          <div>30-422 Kraków</div>
          <div>Darmowy parking pod salonem</div>
          <div>Dogodny dojazd: Podgórze, Łagiewniki, Borek Fałęcki, Ruczaj, Kurdwanów</div>

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
            className="block text-[#1D1D1B] hover:text-[#D4B483] transition-colors"
          >
            Instagram
          </a>

          <a
            href="https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-[#1D1D1B] hover:text-[#D4B483] transition-colors"
          >
            Booksy
          </a>

        </div>
      </div>

    </div>

    <div className="mt-20 pt-8 border-t border-[#E8DED2] flex flex-col lg:flex-row items-center justify-between gap-6">

      <div className="text-[#9B9187] text-sm">
        © 2025 Noblu Beauty Room · Kraków
      </div>

      <div className="flex flex-col items-center gap-3 text-[#1D1D1B] text-sm lg:flex-row">
        <a
          href="/polityka-prywatnosci"
          className="hover:text-[#D4B483] transition-colors"
        >
          Polityka prywatności
        </a>
        <span className="hidden lg:inline text-[#C9BDAF]">/</span>
        <span className="tracking-[0.2em] uppercase">Beauty Experience</span>
      </div>

    </div>

  </div>
</footer>

<Script
  src="https://elfsightcdn.com/platform.js"
  strategy="afterInteractive"
/>

</div>
)
}
