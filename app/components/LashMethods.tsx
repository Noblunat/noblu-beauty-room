import { findBookingServiceById } from "../lib/bookingServices";

const methods = [
  {
    id: "rzesy-1-1-aplikacja",
    title: "Rzęsy 1:1",
    text: "Delikatne przedłużanie rzęs dla naturalnego efektu, który podkreśla spojrzenie bez mocnego przerysowania.",
  },
  {
    id: "rzesy-2d-aplikacja",
    title: "Rzęsy 2D",
    text: "Lekka objętość dla klientek, które chcą bardziej widocznego efektu, ale nadal eleganckiego i wygodnego na co dzień.",
  },
  {
    id: "rzesy-3d-aplikacja",
    title: "Rzęsy 3D",
    text: "Wyraźniejsza stylizacja z większą objętością, dobierana tak, aby zachować harmonię z okiem i naturalnymi rzęsami.",
  },
];

export default function LashMethods() {
  return (
    <section
      aria-labelledby="lash-methods-title"
      className="py-24 px-6 lg:px-12 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-12">
          <div className="text-sm uppercase tracking-[0.3em] text-[#7C6238] mb-4">
            Metody stylizacji
          </div>
          <h2
            id="lash-methods-title"
            className="text-4xl lg:text-5xl font-light leading-tight"
          >
            Przedłużanie rzęs 1:1, 2D i 3D
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {methods.map((method) => {
            const service = findBookingServiceById(method.id);
            if (!service) throw new Error(`Unknown lash method: ${method.id}`);
            return (
              <article
                key={method.id}
                className="min-w-0 rounded-[2rem] border border-[#E8DED2] bg-[#F8F5F2] p-8"
              >
                <h3 className="text-2xl mb-4">{method.title}</h3>
                <p className="text-[#6D6B68] leading-relaxed">{method.text}</p>
                <dl className="mt-5 space-y-3">
                  <div>
                    <dt className="text-[#6D6B68]">Cena aplikacji</dt>
                    <dd className="font-medium text-[#876536]">
                      {service.price}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#6D6B68]">Czas wizyty</dt>
                    <dd className="font-medium">{service.duration}</dd>
                  </div>
                </dl>
                <a
                  href={`/rezerwacja?usluga=${service.id}`}
                  aria-label={`Zapytaj o termin: ${method.title}`}
                  className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[#D4B483] px-5 py-3 text-center font-medium text-[#1D1D1B] transition-colors hover:bg-[#D4B483] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C6238]"
                >
                  Zapytaj o termin
                </a>
              </article>
            );
          })}
        </div>
        <p className="mt-8 text-[#6D6B68] leading-relaxed">
          Podane czasy są orientacyjne i potwierdzamy je przy umawianiu wizyty.
          Ceny i czasy uzupełnień oraz usług dodatkowych znajdziesz w{" "}
          <a
            href="/cennik"
            className="font-medium text-[#876536] underline underline-offset-4"
          >
            pełnym cenniku
          </a>
          . Wysłanie formularza jest zapytaniem; dostępność potwierdzimy SMS-em
          lub telefonicznie.
        </p>
      </div>
    </section>
  );
}
