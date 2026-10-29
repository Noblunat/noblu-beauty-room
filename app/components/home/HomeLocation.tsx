import { business } from "../../lib/business";

const mapsDirectionsUrl = business.links.directions;

export default function HomeLocation() {
  return (
    <section className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <div className="text-sm uppercase tracking-[0.3em] text-[#7C6238] mb-4">
            Lokalizacja
          </div>

          <h2 className="text-4xl lg:text-5xl font-light leading-tight mb-8">
            Dojazd do {business.name}
          </h2>

          <div className="space-y-6 text-[#5F5B56] text-lg leading-relaxed">
            <p>
              Salon znajduje się przy ul. {business.address.streetLocative} w
              Krakowie, w południowej części miasta. To wygodny adres dla
              klientek z Borku Fałęckiego, Łagiewnik, Ruczaju, Kurdwanowa,
              Podgórza Duchackiego, Woli Duchackiej i Swoszowic. Pod salonem
              dostępny jest darmowy parking, dlatego wizytę można wygodnie
              zaplanować także przy dojeździe samochodem.
            </p>

            <p>
              Przed wizytą możesz sprawdzić ofertę:{" "}
              <a
                href="/manicure-krakow"
                className="font-medium text-[#876536] underline underline-offset-4"
              >
                manicure w Krakowie
              </a>
              ,{" "}
              <a
                href="/pedicure-krakow"
                className="font-medium text-[#876536] underline underline-offset-4"
              >
                pedicure w Krakowie
              </a>{" "}
              albo{" "}
              <a
                href="/przedluzanie-rzes-krakow"
                className="font-medium text-[#876536] underline underline-offset-4"
              >
                przedłużanie rzęs w Krakowie
              </a>
              . Poniżej znajdziesz mapę i wskazówki dojazdu pod wejście do
              salonu.
            </p>

            <a
              href={mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center justify-center rounded-full border border-[#D4B483] px-6 py-3 text-base font-medium text-[#876536] transition-colors hover:bg-[#D4B483] hover:text-black"
            >
              Wyznacz trasę w Google Maps
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#E8DED2] bg-white/80 p-8">
          <h3 className="text-3xl font-light mb-6">
            Najczęściej wybierane usługi lokalnie
          </h3>

          <div className="grid gap-4 text-[#1D1D1B]">
            <a
              href="/pedicure-krakow"
              className="flex items-center justify-between rounded-2xl border border-[#E8DED2] bg-white p-5 hover:border-[#D4B483] transition-colors"
            >
              <span>Pedicure Kraków Borek Fałęcki</span>
              <span className="text-[#876536]">Zobacz</span>
            </a>
            <a
              href="/cennik"
              className="flex items-center justify-between rounded-2xl border border-[#E8DED2] bg-white p-5 hover:border-[#D4B483] transition-colors"
            >
              <span>Cennik manicure i pedicure</span>
              <span className="text-[#876536]">Zobacz ceny</span>
            </a>
            <a
              href="/stylizacja-rzes-krakow"
              className="flex items-center justify-between rounded-2xl border border-[#E8DED2] bg-white p-5 hover:border-[#D4B483] transition-colors"
            >
              <span>Stylizacja rzęs Borek Fałęcki i okolice</span>
              <span className="text-[#876536]">Zobacz</span>
            </a>
            <a
              href="/manicure-krakow"
              className="flex items-center justify-between rounded-2xl border border-[#E8DED2] bg-white p-5 hover:border-[#D4B483] transition-colors"
            >
              <span>Manicure Kraków południe</span>
              <span className="text-[#876536]">Zobacz</span>
            </a>
            <a
              href="/rezerwacja"
              className="flex items-center justify-between rounded-2xl border border-[#E8DED2] bg-white p-5 hover:border-[#D4B483] transition-colors"
            >
              <span>Rezerwacja manicure, pedicure i rzęs</span>
              <span className="text-[#876536]">Zapytaj o termin</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
