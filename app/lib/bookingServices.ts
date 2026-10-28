import { catalogVariants, findVariantById, resolveVariant, staff, formatPrice, formatDuration, type CatalogVariant, type ServiceCategory } from "./serviceCatalog";

export type Service = CatalogVariant & { price: string; duration: string; staff?: string };
function present(variant: CatalogVariant): Service {
  return { ...variant, price: formatPrice(variant.pricePLN), duration: formatDuration(variant.durationMinutes), staff: variant.staffId ? staff[variant.staffId].name : undefined };
}
const services = new Map(catalogVariants.map(variant => [variant.id, present(variant)]));
export const serviceGroups = ([
  { id: "rzesy", title: "Stylizacja rzęs" },
  { id: "manicure", title: "Manicure i stylizacja paznokci" },
  { id: "pedicure", title: "Pedicure" },
] satisfies { id: ServiceCategory; title: string }[]).map(group => ({
  ...group, services: Array.from(services.values()).filter(service => service.category === group.id),
}));
export const timePreferences = ["Dowolnie", "Rano", "Po południu", "Wieczorem"] as const;
export function findBookingService(value: string) {
  const variant = resolveVariant(value);
  return variant ? services.get(variant.id) : undefined;
}
export function findBookingServiceById(id: string) { return findVariantById(id) ? services.get(id) : undefined; }
