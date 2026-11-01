import { hybridAddons, inquiryCopy } from "../lib/firstVisit";
import { findVariantById, formatPrice } from "../lib/serviceCatalog";

export default function FirstVisitDetails() {
  return (
    <section aria-label="Pierwszy raz w Noblu?" className="border-y border-[#E8DED2] bg-white/60 px-6 py-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-[0.65fr_1.35fr]">
          <div>
            <p className="text-sm font-medium uppercase text-[#7C6238]">Pierwsza hybryda w Noblu</p>
            <h2 className="mt-2 text-3xl font-light">Pierwszy raz w Noblu?</h2>
          </div>
          <div className="max-w-3xl leading-relaxed text-[#5F5B56]">
            <p>{inquiryCopy.firstVisit}</p>
            <p className="mt-3">Nie wiesz, którą usługę wybrać? <a href="/rezerwacja#formularz" className="font-medium text-[#7C6238] underline underline-offset-4">Poproś o pomoc w doborze wariantu</a>. Możemy poprosić o zdjęcie obecnych paznokci w dalszym kontakcie.</p>
          </div>
        </div>
        <details className="mt-6 border-t border-[#E8DED2] pt-5">
          <summary className="w-fit cursor-pointer py-2 font-medium text-[#7C6238] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C6238]">Zakres i dopłaty przed wizytą</summary>
          <dl className="mt-4 grid gap-x-8 sm:grid-cols-2">
            {hybridAddons.map(addon => (
              <div key={addon.name} className="border-b border-[#E8DED2] py-4">
                <dt className="font-medium">{addon.name}</dt>
                <dd className="mt-1 text-[#5F5B56]">{addon.price} · dodatkowo {addon.duration}</dd>
                {addon.description && <dd className="mt-2 text-sm leading-relaxed text-[#5F5B56]">{addon.description}</dd>}
              </div>
            ))}
            <div className="border-b border-[#E8DED2] py-4">
              <dt className="font-medium">Naprawa jednego paznokcia</dt>
              <dd className="mt-1 text-[#5F5B56]">{["natalia", "julia"].map((id, index) => {
                const variant = findVariantById(`naprawa-paznokcia-${id}`)!;
                return <span key={id} className="block">{index === 0 ? "Natalia" : "Julia"}: {formatPrice(variant.pricePLN)} · {variant.durationMinutes} minut</span>;
              })}</dd>
              <dd className="mt-2 text-sm leading-relaxed text-[#5F5B56]">Wybierz naprawę w katalogu lub opisz ją w uwagach do wizyty. Przedłużenie i korekta żelu wymagają doboru odpowiedniego wariantu; nie są wliczone w podstawową hybrydę.</dd>
            </div>
          </dl>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[#5F5B56]">Samo zdjęcie żelu z manicure to osobna usługa w <a href="/cennik" className="font-medium text-[#7C6238] underline underline-offset-4">cenniku</a>. Jeśli nie masz pewności, jaki produkt masz na paznokciach lub potrzebujesz korekty, opisz to w uwagach - zakres, cenę i czas potwierdzimy przed rozpoczęciem.</p>
        </details>
      </div>
    </section>
  );
}
