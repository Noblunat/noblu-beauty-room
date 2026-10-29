import { business, businessRating } from "../../lib/business";
import Image from "next/image";

export default function HomeHero() {
  return (
    <section
      id="home-hero"
      className="relative min-h-screen text-[#1D1D1B] flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#D4B483,transparent_35%)] opacity-25"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[58%]">
        <Image
          src="/gallery/salon/salon-beauty-krakow-noblu.webp"
          alt={`Salon beauty ${business.name} Kraków z wzornikiem paznokci`}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover object-[26%_58%] opacity-85 lg:object-bottom lg:[mask-image:linear-gradient(to_right,transparent_0%,black_28%,black_78%,transparent_100%)]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDFB]/66 via-[#F8F5F2]/38 to-[#EFE7DD]/72 lg:from-[#FFFDFB]/30 lg:via-transparent lg:to-[#EFE7DD]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDFB]/68 via-[#FFFDFB]/30 to-[#F8F5F2]/14 lg:from-[#FFFDFB] lg:via-transparent lg:to-[#F8F5F2]/30" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-20 px-6 pb-16 pt-28 sm:pt-36 lg:grid-cols-2 lg:px-12 lg:pb-24 lg:pt-40">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase text-[#7C6238]">
            NOBLU BEAUTY ROOM
          </p>

          <h1 className="max-w-2xl text-5xl font-light leading-[1.02] sm:text-6xl lg:text-7xl">
            Manicure, Pedicure i rzęsy w Krakowie
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#343330] sm:mt-7 sm:text-lg lg:text-xl">
            Kameralny salon beauty na Borku Fałęckim. Manicure, stylizacja
            paznokci, pedicure i rzęsy wykonywane z naciskiem na precyzję,
            estetykę i komfort wizyty. Darmowy parking przy salonie.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="/rezerwacja"
              className="w-full rounded-full bg-[#D4B483] px-8 py-4 text-center font-medium text-black shadow-[0_20px_60px_rgba(212,180,131,0.35)] transition-transform hover:scale-105 sm:w-auto sm:py-5"
            >
              Zapytaj o termin
            </a>

            <a
              href={business.links.booksyBooking}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full bg-[#D4B483] px-8 py-4 text-center font-medium text-black shadow-[0_20px_60px_rgba(212,180,131,0.35)] transition-transform hover:scale-105 sm:w-auto sm:py-5"
            >
              Zarezerwuj przez Booksy
            </a>

            <a
              href="/cennik"
              className="w-full rounded-full border border-[#D4B483] bg-white/75 px-8 py-4 text-center font-medium text-[#1D1D1B] backdrop-blur-sm transition-colors hover:bg-white sm:w-auto sm:py-5"
            >
              Zobacz usługi i ceny
            </a>
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-[1.25fr_0.75fr_1fr] gap-3 sm:mt-14 sm:max-w-xl sm:grid-cols-3 sm:gap-6">
            {[
              {
                number: businessRating,
                label: `Ponad ${business.reviews.minimum} zweryfikowanych opinii`,
              },
              { number: "24/7", label: "Formularz online" },
              { number: "Darmowy", label: "parking pod salonem" },
            ].map((item) => (
              <div
                key={item.label}
                className="min-w-0 rounded-2xl border border-[#E8DED2] bg-white/70 px-2 py-3 text-left backdrop-blur-xl sm:p-5"
              >
                <div className="break-words text-lg font-semibold leading-tight tracking-tight sm:break-normal sm:text-3xl sm:tracking-normal">
                  {item.number}
                </div>

                <div className="mt-1 text-xs leading-snug text-[#6D6B68] sm:text-sm">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
