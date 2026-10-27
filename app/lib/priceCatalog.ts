import { booksyAddons, booksyServices, serviceDuration } from "./booksyCatalog";
import { bookingServiceName, findBookingService, serviceGroups } from "./bookingServices";

export type PriceItem = {
  name: string;
  price: string;
  duration?: string;
  bookingService?: string;
  staff?: string;
  note?: string;
};

function pricesFor(pedicure: boolean): PriceItem[] {
  return booksyServices.filter(service => (service.category === "Pedicure") === pedicure)
    .flatMap(service => service.variants.map((variant, index) => ({
      name: service.name,
      price: `${variant.pricePLN} zł`,
      duration: serviceDuration(variant.durationMinutes),
      bookingService: bookingServiceName(service.name, index),
      staff: variant.staff.join(", ") + (variant.name.includes("Junior") ? " — stylistka junior" : ""),
      note: service.name.startsWith("MODELKA") ? "Osobna usługa modelkowa na naturalnej płytce u Julii; dłuższy czas wizyty." : undefined,
    })));
}

export const lashPrices: PriceItem[] = serviceGroups[0].services.map(service => ({ ...service, bookingService: service.name }));
export const nailPrices = pricesFor(false);
export const pedicurePrices = pricesFor(true);
export const addonPrices: PriceItem[] = booksyAddons.map(addon => ({
  name: addon.name,
  price: `${addon.priceType === "Zaczyna się od" ? "od " : ""}${addon.pricePLN} zł`,
  duration: serviceDuration(addon.durationMinutes),
  note: addon.name === "Usunięcie stylizacji z innego salonu"
    ? "Dodatek do wybranych stylizacji; nie jest samodzielną bezpłatną usługą."
    : addon.name === "Laminacja paznokci"
    ? "Laminacja paznokci jako dodatek do wybranej usługi."
    : addon.description || undefined,
}));

export function priceItemDuration(item: PriceItem) {
  return findBookingService(item.bookingService ?? item.name)?.duration ?? item.duration;
}

export function servicePrice(name: string) {
  const service = findBookingService(name);
  if (!service) throw new Error(`Unknown service: ${name}`);
  return service.price;
}

export function serviceOffers(items: PriceItem[]) {
  return items.map(item => ({name: item.name + (item.staff ? " — " + item.staff : ""), price: item.price.replace(/[^0-9]/g, "")}));
}
