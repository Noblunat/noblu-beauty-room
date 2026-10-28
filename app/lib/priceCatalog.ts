import { booksyAddons } from "./booksyCatalog";
import { findBookingService } from "./bookingServices";
import { catalogVariants, formatPrice, formatDuration, staff, type ServiceCategory } from "./serviceCatalog";

export type PriceItem = { name: string; price: string; pricePLN: number; duration?: string; bookingService?: string; staff?: string; note?: string };
function pricesFor(category: ServiceCategory): PriceItem[] {
  return catalogVariants.filter(variant => variant.category === category).map(variant => ({
    name: variant.name, price: formatPrice(variant.pricePLN), pricePLN: variant.pricePLN,
    duration: formatDuration(variant.durationMinutes), bookingService: variant.id,
    staff: variant.staffId ? staff[variant.staffId].label : undefined,
    note: variant.serviceId === "modelka-hybryda" ? "Osobna usługa modelkowa na naturalnej płytce u Julii; dłuższy czas wizyty." : undefined,
  }));
}
export const lashPrices = pricesFor("rzesy");
export const nailPrices = pricesFor("manicure");
export const pedicurePrices = pricesFor("pedicure");
export const lashApplicationPrices = lashPrices.filter(item => item.bookingService?.endsWith("-aplikacja"));
export const addonPrices: PriceItem[] = booksyAddons.map(addon => ({
  name: addon.name, pricePLN: addon.pricePLN,
  price: `${addon.priceType === "Zaczyna się od" ? "od " : ""}${formatPrice(addon.pricePLN)}`,
  duration: formatDuration(addon.durationMinutes),
  note: addon.name === "Usunięcie stylizacji z innego salonu"
    ? "Dodatek do wybranych stylizacji; nie jest samodzielną bezpłatną usługą."
    : addon.name === "Laminacja paznokci" ? "Laminacja paznokci jako dodatek do wybranej usługi." : addon.description || undefined,
}));
export function priceItemDuration(item: PriceItem) { return findBookingService(item.bookingService ?? item.name)?.duration ?? item.duration; }
export function servicePrice(idOrLegacyName: string) {
  const service = findBookingService(idOrLegacyName);
  if (!service) throw new Error(`Unknown service: ${idOrLegacyName}`);
  return service.price;
}
export function serviceOffers(items: PriceItem[]) {
  return items.map(item => ({ name: item.name + (item.staff ? " — " + item.staff : ""), price: String(item.pricePLN) }));
}
