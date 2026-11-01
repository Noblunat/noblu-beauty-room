import { booksyAddons } from "./booksyCatalog";
import { findVariantById, formatPrice } from "./serviceCatalog";
import { staff } from "./team";

export const hybridOffers = (["natalia", "julia"] as const).map(staffId => {
  const variant = findVariantById(`hybryda-${staffId}`);
  if (!variant) throw new Error(`Missing hybrid offer for ${staffId}`);
  return { ...variant, person: staff[staffId], price: formatPrice(variant.pricePLN),
    duration: `${variant.durationMinutes} minut`, inquiryHref: `/rezerwacja?usluga=${variant.id}#formularz` };
});
export const hybridAddons = booksyAddons
  .filter(addon => addon.linkedServices.some(service => service.serviceId === 1571875))
  .map(addon => ({ name: addon.name,
    price: `${addon.priceType === "Zaczyna się od" ? "od " : ""}${formatPrice(addon.pricePLN)}`,
    duration: `${addon.durationMinutes} minut`,
    description: addon.name === "Usunięcie stylizacji z innego salonu"
      ? "Przy wybranej nowej stylizacji; nie jest samodzielną bezpłatną usługą. Zaznacz dodatek przy rezerwacji."
      : addon.description,
  }));
export const inquiryCopy = {
  notice: "To zapytanie, nie potwierdzona rezerwacja. Dostępność potwierdzimy SMS-em lub telefonicznie w godzinach pracy salonu.",
  unavailable: "Jeśli wskazany termin będzie zajęty, zaproponujemy inny. Uzgodnimy go z Tobą przed potwierdzeniem wizyty.",
  firstVisit: "Podstawowa cena obejmuje opracowanie skórek i paznokci oraz hybrydę w jednym kolorze. Jeśli masz stylizację z innego salonu, zaznacz jej usunięcie przy rezerwacji. Zdobienia i dodatkowe prace mogą zmienić cenę oraz czas wizyty - ustalimy je przed rozpoczęciem.",
};
