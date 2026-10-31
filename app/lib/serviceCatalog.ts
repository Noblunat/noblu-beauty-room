import { booksyServices, serviceDuration } from "./booksyCatalog";
import { staff, type StaffId } from "./team";
export { staff, type StaffId } from "./team";

export const serviceCatalogUpdatedAt = "2026-10-31";
export type ServiceCategory = "manicure" | "pedicure" | "rzesy";
export type CatalogVariant = {
  id: string; serviceId: string; name: string; label: string; category: ServiceCategory;
  staffId?: StaffId; pricePLN: number; durationMinutes: number; updatedAt: string;
  booksyVariantId?: number; aliases: string[];
};

// Explicit IDs survive copy edits and ordering changes. Source IDs identify
// Booksy records; staff identity, never array position, identifies variants.
const identities: Record<number, { id: string; aliases: string[]; variantId?: number; defaultStaff?: StaffId }> = {
  1571875: { id: "hybryda", aliases: ["Stylizacja hybrydowa"], variantId: 6017028 },
  8288958: { id: "modelka-hybryda", aliases: ["MODELKA hybryda na naturalnej płytce"], defaultStaff: "julia" },
  1770927: { id: "hybryda-wiele-kolorow", aliases: ["Stylizacja hybrydowa więcej niż 1 kolor", "Stylizacja hybrydowa - więcej niż 1 kolor"], variantId: 6017045 },
  1670867: { id: "usuniecie-hybrydy-manicure", aliases: ["Usunięcie stylizacji hybrydowej z manicure"] },
  1670885: { id: "naprawa-paznokcia", aliases: ["Naprawa jednego paznokcia"], variantId: 5208812 },
  1670869: { id: "zel-przed-opuszek", aliases: ["Żel na naturalnej płytce - paznokcie przed opuszek"] },
  8300280: { id: "przedluzenie-tips", aliases: ["Przedłużenie żelowe na tipsie"], defaultStaff: "julia" },
  5368098: { id: "zel-za-opuszek", aliases: ["Żel na naturalnej płytce", "Żel na naturalnej płytce - paznokcie za opuszek"], variantId: 17789240 },
  1670872: { id: "przedluzenie-szablon", aliases: ["Przedłużenie żelowe", "Przedłużenie żelowe na szablonie"], variantId: 6017205 },
  1670879: { id: "uzupelnienie-zelowe", aliases: ["Uzupełnienie żelowe"], variantId: 22693891 },
  1670883: { id: "usuniecie-zelu-manicure", aliases: ["Usunięcie stylizacji żelowej z manicure"] },
  4764877: { id: "usuniecie-hybrydy-pedicure-spa", aliases: ["Usunięcie hybrydy z pedicure SPA"] },
  4733643: { id: "pedicure-paznokcie-hybryda", aliases: ["Pedicure same paznokcie z hybrydą", "Pedicure hybrydowy same paznokcie"], variantId: 14208784 },
  4733644: { id: "pedicure-spa-hybryda", aliases: ["Pedicure kosmetyczny z hybrydą", "Pedicure SPA z hybrydą"], variantId: 14208789 },
  4733645: { id: "pedicure-spa-bez-hybrydy", aliases: ["Pedicure kosmetyczny", "Pedicure SPA bez hybrydy"], variantId: 14208809 },
  4733648: { id: "pedicure-paznokcie-bez-hybrydy", aliases: ["Pedicure same paznokcie", "Pedicure same paznokcie bez hybrydy"], variantId: 14208964 },
  4764873: { id: "usuniecie-hybrydy-pedicure-paznokcie", aliases: ["Usunięcie hybrydy z pedicure same paznokcie"] },
  1571874: { id: "manicure", aliases: ["Manicure"], variantId: 5209054 },
  1770810: { id: "manicure-meski", aliases: ["Manicure męski"] },
  7597933: { id: "manicure-laminacja", aliases: ["Manicure z laminacją paznokci - NOWOŚĆ"] },
  7597949: { id: "laminacja", aliases: ["Laminacja paznokci - NOWOŚĆ"] },
};
const legacyStaffSuffix = { natalia: "", julia: " — Julia (stylistka junior)" };

const booksyVariants: CatalogVariant[] = booksyServices.flatMap(service => {
  const identity = identities[service.serviceId];
  if (!identity) throw new Error(`Assign a stable identity to Booksy service ${service.serviceId}`);
  return service.variants.map(variant => {
    const staffId = (Object.keys(staff) as StaffId[]).find(id => variant.staff.length === 1 && staff[id].name === variant.staff[0]);
    if (!staffId) throw new Error(`Assign explicit staff identity to ${service.serviceId}`);
    const defaultVariant = staffId === (identity.defaultStaff ?? "natalia");
    return {
      id: `${identity.id}-${staffId}`, serviceId: identity.id, name: service.name,
      label: `${service.name} — ${staff[staffId].label}`,
      category: service.category === "Pedicure" ? "pedicure" : "manicure", staffId,
      pricePLN: variant.pricePLN, durationMinutes: variant.durationMinutes, updatedAt: serviceCatalogUpdatedAt,
      booksyVariantId: variant.booksyVariantId ?? (defaultVariant ? identity.variantId : undefined),
      aliases: defaultVariant ? [...identity.aliases, service.name, identity.id]
        : [...identity.aliases.map(name => name + legacyStaffSuffix[staffId]), `${service.name} — ${staff[staffId].label}`],
    } satisfies CatalogVariant;
  });
});

const lashes = [
  { id: "rzesy-1-1-aplikacja", name: "Aplikacja rzęs 1:1", pricePLN: 190, durationMinutes: 150 },
  { id: "rzesy-1-1-uzupelnienie", name: "Uzupełnienie rzęs 1:1", pricePLN: 160, durationMinutes: 135 },
  { id: "rzesy-2d-aplikacja", name: "Aplikacja rzęs 2D", pricePLN: 210, durationMinutes: 180 },
  { id: "rzesy-2d-uzupelnienie", name: "Uzupełnienie rzęs 2D", pricePLN: 180, durationMinutes: 165 },
  { id: "rzesy-3d-aplikacja", name: "Aplikacja rzęs 3D", pricePLN: 220, durationMinutes: 180 },
  { id: "rzesy-3d-uzupelnienie", name: "Uzupełnienie rzęs 3D", pricePLN: 190, durationMinutes: 165 },
  { id: "rzesy-usuniecie", name: "Ściągnięcie rzęs", pricePLN: 40, durationMinutes: 40 },
];
// Historical form values are migration data, not another source of display copy.
const legacyLashNames: Record<string, string> = {
  "rzesy-1-1-aplikacja": "Aplikacja rzęs 1:1",
  "rzesy-1-1-uzupelnienie": "Uzupełnienie rzęs 1:1",
  "rzesy-2d-aplikacja": "Aplikacja rzęs 2D",
  "rzesy-2d-uzupelnienie": "Uzupełnienie rzęs 2D",
  "rzesy-3d-aplikacja": "Aplikacja rzęs 3D",
  "rzesy-3d-uzupelnienie": "Uzupełnienie rzęs 3D",
  "rzesy-usuniecie": "Ściągnięcie rzęs",
};
export const catalogVariants: CatalogVariant[] = [
  ...lashes.map(item => ({ ...item, serviceId: item.id, label: item.name, category: "rzesy" as const, updatedAt: serviceCatalogUpdatedAt, aliases: [item.name, legacyLashNames[item.id]] })),
  ...booksyVariants,
];
const byId = new Map(catalogVariants.map(variant => [variant.id, variant]));
if (byId.size !== catalogVariants.length) throw new Error("Duplicate service variant identity");
const aliases = new Map(catalogVariants.flatMap(variant => variant.aliases.map(alias => [alias, variant.id] as const)));
for (const variant of catalogVariants) {
  for (const alias of variant.aliases) {
    if (aliases.get(alias) !== variant.id) throw new Error(`Ambiguous legacy service alias: ${alias}`);
  }
}
export const legacyBookingLinks: Record<string, string> = {
  manicure: "manicure-natalia", hybryda: "hybryda-natalia", pedicure: "pedicure-spa-bez-hybrydy-natalia",
  "pedicure-paznokcie-hybryda": "pedicure-paznokcie-hybryda-natalia",
  "pedicure-kosmetyczny-hybryda": "pedicure-spa-hybryda-natalia", rzesy: "rzesy-1-1-aplikacja",
};
export function findVariantById(id: string) { return byId.get(id); }
export function resolveVariant(value: string) { return byId.get(value) ?? byId.get(legacyBookingLinks[value] ?? aliases.get(value) ?? ""); }
export const formatPrice = (pricePLN: number) => `${pricePLN} zł`;
export const formatDuration = serviceDuration;

export const servicePages: Record<string, { name: string; category: ServiceCategory }> = {
  "/manicure-krakow": { name: "Manicure", category: "manicure" },
  "/pedicure-krakow": { name: "Pedicure", category: "pedicure" },
  "/stylizacja-rzes-krakow": { name: "Stylizacja rzęs", category: "rzesy" },
  "/przedluzanie-rzes-krakow": { name: "Przedłużanie rzęs", category: "rzesy" },
};
