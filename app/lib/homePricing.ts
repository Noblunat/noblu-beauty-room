import { servicePrice } from "./priceCatalog";

export const priceHighlights = [
  {
    service: "Manicure", price: `od ${servicePrice("manicure-natalia")}`,
    description: "Manicure klasyczny, paznokcie hybrydowe i stylizacja paznokci w Krakowie na Borku Fałęckim.",
    href: "/manicure-krakow", cta: "Cennik manicure",
  },
  {
    service: "Pedicure", price: `od ${servicePrice("pedicure-paznokcie-bez-hybrydy-julia")}`,
    description: `Same paznokcie bez hybrydy u Julii (stylistki junior) ${servicePrice("pedicure-paznokcie-bez-hybrydy-julia")}. Hybryda i pełny pedicure SPA mają osobne warianty i ceny.`,
    href: "/pedicure-krakow", cta: "Cennik pedicure",
  },
  {
    service: "Stylizacja rzęs", price: `aplikacja od ${servicePrice("rzesy-1-1-aplikacja")}`,
    description: `Aplikacja rzęs 1:1, 2D i 3D od ${servicePrice("rzesy-1-1-aplikacja")}. Uzupełnienia od ${servicePrice("rzesy-1-1-uzupelnienie")}, ściągnięcie ${servicePrice("rzesy-usuniecie")}.`,
    href: "/stylizacja-rzes-krakow", cta: "Cennik rzęs",
  },
];
