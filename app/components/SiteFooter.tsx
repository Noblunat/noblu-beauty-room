import Image from "next/image";
import CookiePreferencesButton from "./CookiePreferencesButton";

export default function SiteFooter() {
  return (
<footer className="relative overflow-hidden bg-[#FFFDFB] pb-24 text-[#1D1D1B] lg:pb-0">

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#D4B483,transparent_35%)] opacity-10"></div>

  <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24">

    <div className="grid lg:grid-cols-4 gap-16">

      <div>
        <Image
          src="/logo-footer.webp"
          alt="Noblu Beauty Room Kraków"
          width={96}
          height={96}
          unoptimized
          className="w-24 h-24 object-contain mb-6"
        />

        <p className="text-[#1D1D1B] leading-relaxed max-w-sm">
          Manicure, pedicure i stylizacja rzęs w Krakowie. Darmowy parking,
          rezerwacja online, ponad 220 opinii klientek.
        </p>
      </div>

      <div>
        <div className="text-sm uppercase tracking-[0.3em] text-[#7C6238] mb-6">
          Usługi
        </div>

        <div className="space-y-4 text-[#1D1D1B]">

          <a
            href="/manicure-krakow"
            className="block hover:text-[#7C6238] transition-colors"
          >
            Manicure Kraków
          </a>

          <a
            href="/stylizacja-rzes-krakow"
            className="block hover:text-[#7C6238] transition-colors"
          >
            Stylizacja rzęs Kraków
          </a>
          <a
            href="/przedluzanie-rzes-krakow"
            className="block hover:text-[#7C6238] transition-colors"
          >
            Przedłużanie rzęs Kraków
          </a>
          <a
            href="/pedicure-krakow"
            className="block hover:text-[#7C6238] transition-colors"
          >
            Pedicure Kraków Borek Fałęcki
          </a>
          <a href="/cennik" className="block hover:text-[#7C6238] transition-colors">
            Cennik
          </a>
          <a href="/rezerwacja" className="block hover:text-[#7C6238] transition-colors">
            Zapytaj o termin
          </a>

        </div>
      </div>

      <div>
        <div className="text-sm uppercase tracking-[0.3em] text-[#7C6238] mb-6">
          Kontakt
        </div>

        <div className="space-y-4 text-[#1D1D1B]">
          <div>Orzechowa 4/lok.1</div>
          <div>30-422 Kraków</div>
          <div>Darmowy parking pod salonem</div>
          <div>Poniedziałek - piątek: 10:00-19:30</div>
          <div>Zapytanie o termin online: 24/7</div>
          <div>Dogodny dojazd: Podgórze, Łagiewniki, Borek Fałęcki, Ruczaj, Kurdwanów</div>

          <a
            href="tel:+48662989534"
            className="block hover:text-[#7C6238] transition-colors"
          >
            +48 662 989 534
          </a>

          <a
            href="mailto:noblu.beautyroom@gmail.com"
            className="block hover:text-[#7C6238] transition-colors"
          >
            noblu.beautyroom@gmail.com
          </a>
        </div>
      </div>

      <div>
        <div className="text-sm uppercase tracking-[0.3em] text-[#7C6238] mb-6">
          Social Media
        </div>

        <div className="space-y-4">

          <a
            href="https://www.instagram.com/noblu_beauty_room/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-[#1D1D1B] hover:text-[#7C6238] transition-colors"
          >
            Instagram
          </a>

        </div>
      </div>

    </div>

    <div className="mt-20 pt-8 border-t border-[#E8DED2] flex flex-col lg:flex-row items-center justify-between gap-6">

      <div className="text-[#9B9187] text-sm">
        © {new Date().getFullYear()} Noblu Beauty Room. Wszystkie prawa zastrzeżone.
      </div>

      <div className="flex flex-col items-center gap-3 text-[#1D1D1B] text-sm lg:flex-row">
        <a
          href="/polityka-prywatnosci"
          className="hover:text-[#7C6238] transition-colors"
        >
          Polityka prywatności
        </a>
        <CookiePreferencesButton label="Ustawienia cookies" />
      </div>

    </div>

  </div>
</footer>
  );
}
