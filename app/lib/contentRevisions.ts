
import { business } from "./business";
import { serviceCatalogUpdatedAt } from "./serviceCatalog";
import { teamUpdatedAt } from "./team";
// Update a date only when the corresponding published content actually changes.
// Shared footer changes affect every listed page; a new build alone does not.
const pageRevisions: Record<string, {date: string; reason: string}> = {
  "/": {date: "2026-10-29", reason: "One Instagram profile action and concise service/location copy without repeated district or acquisition paragraphs."},
  "/manicure-krakow": {date: "2026-10-31", reason: "Current Booksy employee variants and direct Booksy actions alongside the existing inquiry choices."},
  "/pedicure-krakow": {date: "2026-10-31", reason: "Julia's additional nail-only variant, current Booksy catalog and direct calendar access."},
  "/stylizacja-rzes-krakow": {date: "2026-10-30", reason: "Shared catalog-derived method prices, durations and selection links; confirmed salon hygiene and concise location copy."},
  "/przedluzanie-rzes-krakow": {date: "2026-10-30", reason: "Shared lash-method details and hygiene; practical booking preparation without repeated district lists."},
  "/cennik": {date: "2026-11-01", reason: "Pedicure and lash price sections exchange positions; all service details, inquiry links and section widths remain unchanged."},
  "/rezerwacja": {date: "2026-10-31", reason: "Three added Julia variants and their verified Booksy variant identities."},
  "/polityka-prywatnosci": {date: "2026-10-30", reason: "Explicit spacing and a callable mailbox link in the inquiry-delivery description."},
};

export const contentSources = { business: business.updatedAt, services: serviceCatalogUpdatedAt, team: teamUpdatedAt, footer: "2026-10-29" };
export const contentDependencies: Record<string, (keyof typeof contentSources)[]> = {
  "/": ["business", "services", "team"],
  "/manicure-krakow": ["business", "services", "team"],
  "/pedicure-krakow": ["business", "services", "team"],
  "/stylizacja-rzes-krakow": ["business", "services"],
  "/przedluzanie-rzes-krakow": ["business", "services"],
  "/cennik": ["business", "services"],
  "/rezerwacja": ["business", "services"],
  "/polityka-prywatnosci": ["business"],
};
export const contentRevisions = Object.fromEntries(Object.entries(pageRevisions).map(([route, revision]) => [route, {
  ...revision,
  date: [...contentDependencies[route], "footer" as const].reduce((latest, source) => contentSources[source] > latest ? contentSources[source] : latest, revision.date),
}]));

export function revisionLabel(route: string) {
  return new Intl.DateTimeFormat("pl-PL", {day: "numeric", month: "long", year: "numeric", timeZone: "UTC"})
    .format(new Date(contentRevisions[route].date + "T00:00:00Z"));
}
