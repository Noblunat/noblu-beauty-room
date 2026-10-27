// Update a date only when the corresponding published content actually changes.
// Shared footer changes affect every listed page; a new build alone does not.
const sharedBusinessRevision = {
  date: "2026-10-26",
  reason: "Shared salon footer and business data: owner-confirmed weekday closing time 19:00, weekend closure and explicit attribution of the review count to Booksy.",
};

export const contentRevisions: Record<string, {date: string; reason: string}> = {
  "/": {date: "2026-10-26", reason: "Verified team portraits and service scope, owner-confirmed instrument preparation, shared footer and review attribution."},
  "/manicure-krakow": {date: "2026-10-26", reason: "Booksy-verified employee pricing and portraits, visible realization captions and owner-confirmed instrument preparation."},
  "/pedicure-krakow": {date: "2026-10-26", reason: "Booksy-verified SPA scope, employee variants and portraits, two distinct pedicure photos and confirmed instrument preparation."},
  "/stylizacja-rzes-krakow": sharedBusinessRevision,
  "/przedluzanie-rzes-krakow": sharedBusinessRevision,
  "/cennik": {date: "2026-10-26", reason: "Prices and service durations aligned with 21 Booksy services, 25 employee variants and seven add-ons read on this date."},
  "/rezerwacja": {date: "2026-10-26", reason: "Inquiry service choices aligned with the Booksy catalog while preserving existing campaign selections and variant IDs."},
  "/polityka-prywatnosci": sharedBusinessRevision,
};

export function revisionLabel(route: string) {
  return new Intl.DateTimeFormat("pl-PL", {day: "numeric", month: "long", year: "numeric", timeZone: "UTC"})
    .format(new Date(contentRevisions[route].date + "T00:00:00Z"));
}
