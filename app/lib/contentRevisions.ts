
import { business } from "./business";
import { serviceCatalogUpdatedAt } from "./serviceCatalog";
import { teamUpdatedAt } from "./team";
// Update a date only when the corresponding published content actually changes.
// Shared footer changes affect every listed page; a new build alone does not.
const sharedBusinessRevision = {
  date: business.updatedAt,
  reason: `Shared salon footer and business data: owner-confirmed weekday closing time ${business.hours.closes}, weekend closure and explicit attribution of the review count to Booksy.`,
};

const pageRevisions: Record<string, {date: string; reason: string}> = {
  "/": {date: "2026-10-26", reason: "Verified team portraits and service scope, owner-confirmed instrument preparation, shared footer and review attribution."},
  "/manicure-krakow": {date: "2026-10-26", reason: "Booksy-verified employee pricing and portraits, visible realization captions and owner-confirmed instrument preparation."},
  "/pedicure-krakow": {date: "2026-10-26", reason: "Booksy-verified SPA scope, employee variants and portraits, two distinct pedicure photos and confirmed instrument preparation."},
  "/stylizacja-rzes-krakow": sharedBusinessRevision,
  "/przedluzanie-rzes-krakow": sharedBusinessRevision,
  "/cennik": {date: "2026-10-26", reason: "Prices and service durations aligned with 21 Booksy services, 25 employee variants and seven add-ons read on this date."},
  "/rezerwacja": {date: "2026-10-28", reason: "Canonical service labels and stable variant identities with backwards-compatible campaign aliases."},
  "/polityka-prywatnosci": {date: "2026-10-28", reason: "Administrator contact and address generated from the shared business configuration."},
};

export const contentSources = { business: business.updatedAt, services: serviceCatalogUpdatedAt, team: teamUpdatedAt };
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
  date: contentDependencies[route].reduce((latest, source) => contentSources[source] > latest ? contentSources[source] : latest, revision.date),
}]));

export function revisionLabel(route: string) {
  return new Intl.DateTimeFormat("pl-PL", {day: "numeric", month: "long", year: "numeric", timeZone: "UTC"})
    .format(new Date(contentRevisions[route].date + "T00:00:00Z"));
}
