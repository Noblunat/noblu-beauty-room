import { business } from "../../lib/business";
import Image from "next/image";

const services = [
  {
    title: "Manicure",
    href: "/manicure-krakow",
    image: "/gallery/paznokcie/manicure-hybrydowy-nude-krakow-noblu.webp",
    alt: `Naturalny manicure hybrydowy nude ${business.name} Kraków`,
    description:
      "Manicure oraz stylizacja hybrydowa i żelowa w Krakowie. Zadbane dłonie, kształt i kolor paznokci dopasowane do Twoich oczekiwań.",
  },
  {
    title: "Pedicure",
    href: "/pedicure-krakow",
    image: "/gallery/paznokcie/pedicure-hybrydowy-krakow-noblu.webp",
    alt: `Pedicure hybrydowy ${business.name} Kraków Borek Fałęcki`,
    description: `Pedicure kosmetyczny i hybrydowy w spokojnej atmosferze salonu beauty przy ul. ${business.address.streetNameLocative} w Krakowie. Zapytaj o termin online.`,
  },
  {
    title: "Stylizacja rzęs",
    href: "/stylizacja-rzes-krakow",
    image: "/gallery/rzesy/stylizacja-rzes-krakow-noblu.webp",
    alt: `Stylizacja rzęs ${business.name} Kraków`,
    description:
      "Natural look, rzęsy 1:1 i lekkie objętości dobierane do kształtu oka, urody i oczekiwanego efektu.",
  },
  {
    title: "Przedłużanie rzęs",
    href: "/przedluzanie-rzes-krakow",
    image: "/gallery/rzesy/przedluzanie-rzes-krakow-noblu.webp",
    alt: `Przedłużanie rzęs ${business.name} Kraków`,
    description:
      "Rzęsy 1:1, 2D i 3D wykonywane z naciskiem na lekkość, komfort noszenia oraz efekt dopasowany do naturalnych rzęs.",
  },
];

export default function HomeServices() {
  return (
    <section id="services" className="py-28 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-16">
          <div className="text-sm uppercase tracking-[0.3em] text-[#7C6238] mb-4">
            Oferta
          </div>

          <h2 className="text-4xl lg:text-6xl font-light leading-tight">
            Nasze usługi
          </h2>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-[2rem] bg-white border border-[#EFE8E1] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(min-width: 1280px) 278px, (min-width: 768px) 45vw, calc(100vw - 3rem)"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-8">
                <h3 className="text-2xl mb-4">{service.title}</h3>

                <p className="text-[#6D6B68] leading-relaxed mb-6">
                  {service.description}
                </p>

                <a
                  href={service.href}
                  className="text-sm uppercase tracking-[0.2em] text-[#7C6238] group-hover:translate-x-1 transition-transform inline-block"
                >
                  Zobacz więcej →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
