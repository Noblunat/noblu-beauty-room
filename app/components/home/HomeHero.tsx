import { business } from "../../lib/business";
import { hybridOffers } from "../../lib/firstVisit";
import Image from "next/image";
import { MapPin, ParkingCircle, Star } from "lucide-react";

export default function HomeHero() {
  return (
    <section id="home-hero" className="relative overflow-hidden text-[#1D1D1B]">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[58%]">
        <Image src="/gallery/salon/salon-beauty-krakow-noblu.webp" alt={`Salon beauty ${business.name} Kraków z wzornikiem paznokci`}
          fill loading="eager" fetchPriority="high" sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover object-[26%_58%] opacity-85 lg:object-bottom" />
        <div className="absolute inset-0 bg-white/75 lg:bg-[linear-gradient(90deg,#FFFDFB_0%,rgba(255,253,251,0.8)_30%,rgba(255,253,251,0.05)_100%)]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-28 sm:pb-14 sm:pt-32 lg:px-12 lg:pb-16 lg:pt-36">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase text-[#7C6238] sm:text-sm">NOBLU BEAUTY ROOM · KRAKÓW</p>
          <h1 className="mt-3 max-w-3xl text-2xl font-light leading-tight sm:text-5xl">Manicure dopasowany do Ciebie</h1>
          <p className="mt-4 hidden text-lg font-medium leading-relaxed sm:block">Wybierz stylistkę, poznaj cenę i zarezerwuj termin.</p>
          <p className="mt-2 max-w-xl text-base leading-relaxed text-[#343330]">Kameralny salon na Borku Fałęckim.<span className="hidden sm:inline"> Zobacz nasze realizacje i wybierz wizytę u Natalii lub Julii.</span></p>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#343330] sm:text-sm">
            <li className="flex items-center gap-2"><ParkingCircle size={18} aria-hidden="true" />Darmowy parking</li>
            <li><a href={business.links.directions} target="_blank" rel="noopener noreferrer" className="flex min-h-6 items-center gap-2 underline underline-offset-4"><MapPin size={18} aria-hidden="true" />{business.address.street}, Kraków</a></li>
            <li><a href={business.links.booksyProfile} target="_blank" rel="noopener noreferrer" className="flex min-h-6 items-center gap-2 underline underline-offset-4"><Star size={18} aria-hidden="true" />{business.reviews.rating} w Booksy · ponad {business.reviews.minimum} opinii</a></li>
          </ul>
          <p className="mt-5 font-medium sm:hidden">Manicure hybrydowy · jeden kolor</p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4">
            {hybridOffers.map(offer => (
              <article key={offer.id} aria-labelledby={`offer-${offer.id}`} className="min-w-0 rounded-lg border border-[#D7C6B0] bg-[#FFFDFB]/95 p-3 sm:p-5">
                <div className="flex items-center gap-3">
                  <Image src={offer.person.image} alt="" width={48} height={48} sizes="48px" className="hidden h-12 w-12 shrink-0 rounded-full object-cover sm:block" />
                  <div>
                    <h2 id={`offer-${offer.id}`} className="text-xl font-medium sm:text-2xl">{offer.person.name}</h2>
                    <p className="min-h-10 text-sm text-[#7C6238] sm:min-h-0">{offer.staffId === "julia" ? "stylistka junior" : offer.person.role}</p>
                  </div>
                </div>
                <p className="mt-4 hidden font-medium sm:block">Manicure hybrydowy</p>
                <p className="mt-1 hidden text-sm text-[#5F5B56] sm:block">Jeden kolor{offer.staffId === "julia" ? " · Dłuższy czas pracy" : " · Podstawowy wariant"}</p>
                <p className="mt-3 text-xl font-semibold">{offer.price} <span className="block text-sm font-normal text-[#5F5B56] sm:inline sm:text-lg">· {offer.duration}</span></p>
                <p className="mt-1 min-h-8 text-xs leading-snug text-[#5F5B56] sm:hidden">{offer.staffId === "julia" ? "Dłuższy czas pracy" : "Podstawowy wariant"}</p>
                <div className="mt-4 grid gap-2">
                  <a href={business.links.booksyBooking} data-service-name={offer.label} data-service-id={offer.id} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center rounded-full bg-[#D4B483] px-2 py-3 text-center text-sm font-medium text-black transition-colors hover:bg-[#C9A571] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C6238] sm:px-4">Wybierz termin w Booksy</a>
                  <a href={offer.inquiryHref} className="flex min-h-11 items-center justify-center rounded-full border border-[#D4B483] px-2 py-3 text-center text-sm font-medium text-[#1D1D1B] transition-colors hover:bg-[#F8F5F2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C6238] sm:px-4">Poproś o termin bez konta</a>
                </div>
                <p className="mt-3 hidden text-xs leading-relaxed text-[#5F5B56] sm:block">W Booksy wybierz: {offer.person.label}, stylizacja hybrydowa.</p>
                <a href={`#stylistka-${offer.staffId}`} className="mt-3 inline-block min-h-11 py-2 text-sm font-medium text-[#7C6238] underline underline-offset-4">Poznaj {offer.staffId === "julia" ? "Julię" : "Natalię"}<span className="hidden sm:inline"> i zobacz realizacje salonu</span></a>
              </article>
            ))}
          </div>
          <a href="/cennik" className="mt-5 inline-flex min-h-11 items-center font-medium text-[#7C6238] underline underline-offset-4">Zobacz usługi i ceny</a>
        </div>
      </div>
    </section>
  );
}
