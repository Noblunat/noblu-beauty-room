const streetName = "Orzechowa";
const streetNameLocative = "Orzechowej";
const building = "4";
const unit = "1";
const address = {
  street: `${streetName} ${building}/lok.${unit}`,
  streetLocative: `${streetNameLocative} ${building}/lok.${unit}`,
  shortStreetLocative: `${streetNameLocative} ${building}`,
  streetNameLocative,
  city: "Kraków", postalCode: "30-422", region: "małopolskie", country: "PL",
} as const;
const name = "Noblu Beauty Room";
export const business = {
  name, legalName: "Noblu Beauty Room Natalia Mądry", taxId: "6793222358", regon: "389813411",
  url: "https://noblu.pl", email: "salon@noblu.pl",
  phone: { e164: "+48662989534", international: "+48 662 989 534", national: "662 989 534" },
  address,
  hours: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], daysLabel: "Poniedziałek - piątek", opens: "10:00", closes: "19:00", closedLabel: "Sobota i niedziela: zamknięte" },
  reviews: { source: "Booksy", rating: "5,0", minimum: 240, verifiedAt: "2026-10-26" },
  geo: { latitude: 50.0118355, longitude: 19.9252253 },
  areas: ["Kraków", "Borek Fałęcki", "Łagiewniki", "Ruczaj", "Kurdwanów", "Podgórze", "Podgórze Duchackie", "Wola Duchacka", "Swoszowice"],
  links: {
    instagram: "https://www.instagram.com/noblu_beauty_room/",
    facebook: "https://www.facebook.com/noblu.beautyroom/",
    booksyProfile: "https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow",
    booksyBooking: "https://noblubeautyroom.booksy.com/h",
    map: "https://www.google.com/maps?cid=6617500446211091555",
    directions: "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(`${name} ${address.street} ${address.postalCode} ${address.city}`),
  },
  // A content revision differs from a verification or deployment date.
  updatedAt: "2026-10-26",
} as const;
export const businessAddress = `${address.street}, ${address.postalCode} ${address.city}`;
export const businessHours = `${business.hours.daysLabel}: ${business.hours.opens}-${business.hours.closes}`;
export const businessRating = `★★★★★ ${business.reviews.rating} w ${business.reviews.source}`;
export const businessPostalAddress = { "@type": "PostalAddress", streetAddress: address.street, addressLocality: address.city, addressRegion: address.region, postalCode: address.postalCode, addressCountry: address.country };
