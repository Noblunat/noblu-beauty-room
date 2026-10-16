export type Service = {
  name: string
  price: string
  duration: string
  booksyVariantId?: number
}

type ServiceGroup = {
  title: string
  services: Service[]
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
  {
    title: "Manicure i stylizacja paznokci",
    services: [
      {
        name: "Manicure",
        price: "100 zł",
        duration: "ok. 1h",
        booksyVariantId: 5209054,
      },
      {
        name: "Stylizacja hybrydowa",
        price: "160 zł",
        duration: "1h 30min",
        booksyVariantId: 6017028,
      },
      {
        name: "Stylizacja hybrydowa więcej niż 1 kolor",
        price: "170 zł",
        duration: "1h 35min",
        booksyVariantId: 6017045,
      },
      {
        name: "Żel na naturalnej płytce",
        price: "190 zł",
        duration: "ok. 2h",
        booksyVariantId: 17789240,
      },
      {
        name: "Przedłużenie żelowe",
        price: "220 zł",
        duration: "ok. 2h 30min",
        booksyVariantId: 6017205,
      },
      {
        name: "Uzupełnienie żelowe",
        price: "190 zł",
        duration: "ok. 2h",
        booksyVariantId: 22693891,
      },
      {
        name: "Naprawa jednego paznokcia",
        price: "30 zł",
        duration: "20min",
        booksyVariantId: 5208812,
      },
    ],
  },
  {
    title: "Pedicure",
    services: [
      {
        name: "Pedicure same paznokcie",
        price: "110 zł",
        duration: "ok. 1h",
        booksyVariantId: 14208964,
      },
      {
        name: "Pedicure same paznokcie z hybrydą",
        price: "160 zł",
        duration: "ok. 1h 20min",
        booksyVariantId: 14208784,
      },
      {
        name: "Pedicure kosmetyczny",
        price: "180 zł",
        duration: "ok. 1h 30min",
        booksyVariantId: 14208809,
      },
      {
        name: "Pedicure kosmetyczny z hybrydą",
        price: "200 zł",
        duration: "ok. 1h 45min",
        booksyVariantId: 14208789,
      },
    ],
  },
]

export const timePreferences = ["Dowolnie", "Rano", "Po południu", "Wieczorem"] as const

export function findBookingService(name: string) {
  return serviceGroups.flatMap(group => group.services).find(service => service.name === name)
}
