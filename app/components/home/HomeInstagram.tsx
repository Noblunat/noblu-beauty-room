import { business } from "../../lib/business";
import Image from "next/image";

const instagramGalleryItems = [
  {
    src: "/gallery/paznokcie/manicure-hybrydowy-blekitny-krakow-noblu.webp",
    alt: `Błękitny manicure hybrydowy w ${business.name} Kraków`,
  },
  {
    src: "/gallery/paznokcie/IMG_2406(2).webp",
    alt: "Ciemnozielone paznokcie z brokatem i kwadratową końcówką",
  },
  {
    src: "/gallery/paznokcie/IMG_2440(1).webp",
    alt: "Czerwone paznokcie o kwadratowym kształcie",
  },
  {
    src: "/gallery/paznokcie/manicure-hybrydowy-nude-krakow-noblu.webp",
    alt: `Naturalny manicure hybrydowy nude w ${business.name} Kraków`,
  },
  {
    src: "/gallery/paznokcie/paznokcie-hybrydowe-ombre-krakow-noblu.webp",
    alt: `Paznokcie hybrydowe ombre ze zdobieniem w ${business.name} Kraków`,
  },
  {
    src: "/gallery/paznokcie/IMG_6470.webp",
    alt: "Paznokcie na różowej bazie z niebieskimi zdobieniami",
  },
  {
    src: "/gallery/paznokcie/IMG_6724.webp",
    alt: "Pastelowe ombre w odcieniach błękitu i fioletu",
  },
  {
    src: "/gallery/rzesy/stylizacja-rzes-krakow-noblu.webp",
    alt: `Stylizacja rzęs w ${business.name} Kraków`,
  },
];

export default function HomeInstagram() {
  return (
    <section id="instagram" className="py-28 bg-transparent text-[#1D1D1B]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between mb-14">
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-[#7C6238] mb-4">
              Instagram
            </div>

            <h2 className="text-4xl lg:text-6xl font-light">
              @noblu_beauty_room
            </h2>
          </div>

          <a
            href={business.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform shadow-[0_20px_60px_rgba(212,180,131,0.35)]"
          >
            Obserwuj
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {instagramGalleryItems.map((item) => (
            <figure
              key={item.src}
              className="relative aspect-square overflow-hidden rounded-[1.2rem] bg-[#E8D6BE]/40"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1280px) 287px, (min-width: 1024px) 22.5vw, (min-width: 640px) 23vw, calc(50vw - 1.875rem)"
                quality={76}
                className="object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
