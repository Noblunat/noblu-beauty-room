import { business } from "../../lib/business";

export default function HomeAbout() {
  return (
    <section className="py-28 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-5xl">
          <div className="text-sm uppercase tracking-[0.3em] text-[#7C6238] mb-4">
            Beauty Kraków
          </div>

          <h2 className="text-4xl lg:text-6xl font-light leading-tight mb-10">
            Salon beauty w Krakowie przy ul.{" "}
            {business.address.streetNameLocative}
          </h2>

          <div className="space-y-10 text-[#5F5B56] text-lg leading-relaxed">
            <p>
              {business.name} to kameralny salon beauty. Oferujemy{" "}
              <a
                href="/manicure-krakow"
                className="text-[#7C6238] hover:underline"
              >
                manicure w Krakowie
              </a>
              ,{" "}
              <a
                href="/manicure-krakow"
                className="text-[#7C6238] hover:underline"
              >
                stylizację paznokci
              </a>
              ,{" "}
              <a
                href="/pedicure-krakow"
                className="text-[#7C6238] hover:underline"
              >
                pedicure
              </a>{" "}
              oraz{" "}
              <a
                href="/stylizacja-rzes-krakow"
                className="text-[#7C6238] hover:underline"
              >
                stylizację rzęs
              </a>{" "}
              dla kobiet, które cenią estetykę, dokładność i spokojną atmosferę
              wizyty.
            </p>

            <p>
              Przed rozpoczęciem stylizacji ustalamy długość, kształt i kolor
              paznokci. Dobieramy efekt do Twoich oczekiwań i codziennych zajęć.
              Podczas wizyty dbamy o higienę stanowiska, dokładność opracowania
              i Twój komfort.
            </p>

            <p>
              Wybierz{" "}
              <a
                href="/manicure-krakow"
                className="font-medium text-[#876536] underline underline-offset-4"
              >
                manicure w Krakowie
              </a>
              , paznokcie hybrydowe albo{" "}
              <a
                href="/pedicure-krakow"
                className="font-medium text-[#876536] underline underline-offset-4"
              >
                pedicure w Krakowie
              </a>
              . W opisach usług znajdziesz realizacje, warianty stylizacji oraz
              informacje, które pomogą Ci zaplanować wizytę.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
