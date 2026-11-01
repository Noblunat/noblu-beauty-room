import Link from "next/link";
import { booksyServices, serviceDuration } from "../lib/booksyCatalog";
import { staff } from "../lib/team";

export default function ServiceVariants({ pedicure = false }: { pedicure?: boolean }) {
  const services = booksyServices.filter(service => pedicure
    ? service.category === "Pedicure"
    : ["Stylizacja hybrydowa", "Manicure"].includes(service.category) && !service.name.startsWith("MODELKA"));

  return (
    <section aria-labelledby="service-variants-title" className="px-6 pb-20 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <h2 id="service-variants-title" className="text-3xl font-light sm:text-4xl">
          {pedicure ? "Zakres i warianty pedicure" : "Warianty manicure i wykonawczynie"}
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#5F5B56]">
          Natalia i Julia wykonują wybrane usługi zgodnie z poniższą ofertą.
          Julia jest stylistką junior; jej warianty mają osobne ceny i dłuższy czas wizyty.
          Podane czasy nie obejmują dodatkowych zdobień.
          Ceny dotyczą podstawowego zakresu; dodatki wybierasz osobno zgodnie z Booksy.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {services.map(service => (
            <article key={service.serviceId} className="min-w-0 rounded-[1.5rem] border border-[#E8DED2] bg-white/70 p-6">
              <h3 className="text-xl font-medium">{service.name}</h3>
              <p className="mt-3 leading-relaxed text-[#5F5B56]">{service.description}</p>
              <dl className="mt-5 space-y-3">
                {service.variants.map((variant) => (
                  <div key={`${service.serviceId}-${variant.staff.join("-")}`}>
                    <dt className="font-medium">{variant.staff.map(name => Object.values(staff).find(person => person.name === name)?.label ?? name).join(", ")}</dt>
                    <dd className="mt-1 text-[#5F5B56]">{variant.pricePLN} zł · {serviceDuration(variant.durationMinutes)}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
        <p className="mt-6 leading-relaxed text-[#5F5B56]">
          <Link href="/cennik" className="font-medium text-[#876536] underline underline-offset-4">Pełny cennik usług i dodatków</Link>.
          {" "}Zapytanie w formularzu potwierdzamy SMS-em lub telefonicznie.
        </p>
      </div>
    </section>
  );
}
