import { booksyServices, serviceDuration } from "./booksyCatalog";

export type Service = {
  name: string;
  price: string;
  duration: string;
  booksyVariantId?: number;
  staff?: string;
};

type ServiceGroup = {title: string; services: Service[]};

// Preserve names and variant IDs already used by campaign links and existing inquiries.
const legacyNames: Record<string, string> = {
  "Stylizacja hybrydowa - więcej niż 1 kolor": "Stylizacja hybrydowa więcej niż 1 kolor",
  "Żel na naturalnej płytce - paznokcie za opuszek": "Żel na naturalnej płytce",
  "Przedłużenie żelowe na szablonie": "Przedłużenie żelowe",
  "Pedicure same paznokcie bez hybrydy": "Pedicure same paznokcie",
  "Pedicure hybrydowy same paznokcie": "Pedicure same paznokcie z hybrydą",
  "Pedicure SPA bez hybrydy": "Pedicure kosmetyczny",
  "Pedicure SPA z hybrydą": "Pedicure kosmetyczny z hybrydą"
};
const legacyVariantIds: Record<string, number> = {
  "Manicure": 5209054,
  "Stylizacja hybrydowa": 6017028,
  "Stylizacja hybrydowa więcej niż 1 kolor": 6017045,
  "Żel na naturalnej płytce": 17789240,
  "Przedłużenie żelowe": 6017205,
  "Uzupełnienie żelowe": 22693891,
  "Naprawa jednego paznokcia": 5208812,
  "Pedicure same paznokcie": 14208964,
  "Pedicure same paznokcie z hybrydą": 14208784,
  "Pedicure kosmetyczny": 14208809,
  "Pedicure kosmetyczny z hybrydą": 14208789
};

export function bookingServiceName(name: string, variantIndex: number) {
  const base = legacyNames[name] ?? name;
  return variantIndex === 0 ? base : base + " — Julia (stylistka junior)";
}

function booksyGroup(pedicure: boolean): Service[] {
  return booksyServices.filter(service => (service.category === "Pedicure") === pedicure)
    .flatMap(service => service.variants.map((variant, index) => {
      const name = bookingServiceName(service.name, index);
      return {
        name,
        price: variant.pricePLN + " zł",
        duration: serviceDuration(variant.durationMinutes),
        staff: variant.staff.join(", "),
        booksyVariantId: variant.booksyVariantId ?? legacyVariantIds[name],
      };
    }));
}

export const serviceGroups: ServiceGroup[] = [
  {
    title: "Stylizacja rzęs",
    services: [
      { name: "Aplikacja rzęs 1:1", price: "190 zł", duration: "2h 30min" },
      { name: "Uzupełnienie rzęs 1:1", price: "160 zł", duration: "2h 15min" },
      { name: "Aplikacja rzęs 2D", price: "210 zł", duration: "3h" },
      { name: "Uzupełnienie rzęs 2D", price: "180 zł", duration: "2h 45min" },
      { name: "Aplikacja rzęs 3D", price: "220 zł", duration: "3h" },
      { name: "Uzupełnienie rzęs 3D", price: "190 zł", duration: "2h 45min" },
      { name: "Ściągnięcie rzęs", price: "40 zł", duration: "40min" },
    ],
  },
  {title: "Manicure i stylizacja paznokci", services: booksyGroup(false)},
  {title: "Pedicure", services: booksyGroup(true)},
];

export const timePreferences = ["Dowolnie", "Rano", "Po południu", "Wieczorem"] as const;

export function findBookingService(name: string) {
  return serviceGroups.flatMap(group => group.services).find(service => service.name === name);
}
