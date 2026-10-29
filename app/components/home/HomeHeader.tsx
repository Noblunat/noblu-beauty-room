import { business } from "../../lib/business";
import Image from "next/image";
import { Phone } from "lucide-react";

export default function HomeHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/60 border-b border-[#E8DED2] backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-2 sm:py-5 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          <Image
            src="/logo-nav.webp"
            alt={`${business.name} Kraków`}
            width={64}
            height={64}
            unoptimized
            className="h-12 w-12 shrink-0 object-contain sm:h-16 sm:w-16"
          />

          <div>
            <div className="text-[#1D1D1B] text-sm sm:text-lg tracking-wide font-medium">
              {business.name}
            </div>

            <div className="text-[#8A8178] text-xs uppercase tracking-[0.2em]">
              Kraków
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-1 sm:flex-row sm:gap-5">
          <a
            href={`tel:${business.phone.e164}`}
            aria-label={`Zadzwoń do salonu: ${business.phone.national}`}
            className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#D4B483] bg-transparent px-4 text-xs font-medium text-[#1D1D1B] transition-colors hover:text-[#7C6238] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C6238] sm:px-6 sm:text-sm"
          >
            <Phone aria-hidden="true" className="h-4 w-4 shrink-0" />
            <span>{business.phone.national}</span>
          </a>
          <a
            href="/rezerwacja"
            className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full bg-[#D4B483] px-4 py-3 text-center text-xs font-medium text-black shadow-[0_20px_60px_rgba(212,180,131,0.35)] transition-transform hover:scale-105 sm:px-6 sm:text-sm"
          >
            Zapytaj o termin
          </a>
        </div>
      </div>
    </header>
  );
}
