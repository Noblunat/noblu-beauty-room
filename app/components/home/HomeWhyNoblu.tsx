import { business } from "../../lib/business";

const whyNobluItems = [
  {
    title: "Darmowy parking",
    text: "Pod salonem dostępny jest bezpłatny parking. Możesz wygodnie przyjechać samochodem i zostawić go przy budynku na czas wizyty.",
  },
  {
    title: "Rezerwacja online 24/7",
    text: "Termin na manicure, pedicure lub stylizację rzęs zgłosisz wygodnie przez formularz Noblu, 24 godziny na dobę. Potwierdzimy dostępność SMS-em lub telefonicznie.",
  },
  {
    title: "Kameralna atmosfera",
    text: `${business.name} to spokojny salon beauty w Krakowie, stworzony dla klientek, które cenią komfort, estetykę i dokładne wykonanie.`,
  },
  {
    title: "Rzęsy i paznokcie",
    text: "W jednym miejscu wykonasz stylizację rzęs, manicure, stylizację hybrydową, przedłużenie żelowe oraz pedicure SPA.",
  },
];

export default function HomeWhyNoblu() {
  return (
    <section className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:items-start">
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-[#7C6238] mb-4">
              Dlaczego Noblu
            </div>

            <h2 className="text-4xl lg:text-6xl font-light leading-tight text-[#1D1D1B]">
              Dlaczego {business.name}?
            </h2>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#5F5B56]">
              Wybierasz miejsce, w którym liczy się nie tylko efekt stylizacji,
              ale też komfort wizyty, wygodny dojazd i spokojna atmosfera.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {whyNobluItems.map((item, index) => (
              <div
                key={item.title}
                className="rounded-[1.6rem] border border-[#E8DED2] bg-white/75 p-7 shadow-[0_14px_44px_rgba(0,0,0,0.04)] backdrop-blur-xl"
              >
                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D4B483]/40 bg-[#F8F0E6] text-sm font-medium text-[#7C6238]">
                  {index + 1}
                </div>

                <h3 className="text-2xl font-light text-[#1D1D1B]">
                  {item.title}
                </h3>

                <p className="mt-4 leading-relaxed text-[#6D6B68]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
