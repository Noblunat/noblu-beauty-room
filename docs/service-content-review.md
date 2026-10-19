# Service content review - 2026-10-19

## Durations

Checked the live Booksy profile in Chrome, not a search-engine cache:
https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow.

Existing manicure/pedicure form durations in `app/lib/bookingServices.ts` already match the live offer: manicure 50min, hybrid (one/multiple colours) 1h30min, natural-nail gel 2h10min, gel refill 2h10min, extension 2h30min, repair 20min; pedicure nails 40min, hybrid nails 1h20min, cosmetic 1h10min, cosmetic with hybrid 1h40min. These form values were not changed. The price list now reads them from the same catalog instead of copying them.

Additional price-list-only variants verified on Booksy: hybrid removal + manicure 1h; short natural-nail gel 1h55min; gel removal + manicure 1h10min; hybrid removal + pedicure nails 50min; hybrid removal + full pedicure 1h15min.

The four add-on rows (decorations, powder, french/ombre/babyboomer, removal from another salon before gel refill) have no separately published duration on this Booksy profile. No minutes were invented: the UI says the time needs confirmation when choosing the design. Owner confirmation was requested. The seven lash durations use the existing reservation catalog and are explicitly described as estimates; the public Booksy profile does not currently list lashes. Prices, services offered by the form and Booksy variant IDs were left unchanged.

## Copy and reviews

The manicure page now describes the visit, hybrid versus gel, approximate wear and home care, with one new-client invitation and no repeated district lists. FAQ JSON-LD still derives from the same visible FAQ. Wear is an estimate, not a promise or a claim that the salon uses a particular product. Background references for the conservative two-week estimate and care: https://www.cnd.com/products/shellac-base-coat and https://www.aad.org/public/everyday-care/nail-care-secrets/basics/pedicures/gel-manicures.

Homepage service heading changed to `Nasze uslugi` (Polish diacritics in the actual page). The Google Business Profile's own review invitation UI supplied https://g.page/r/CWOsZkWYFdZbEBM/review. It is an ordinary external link, not an embedded tracker, rating widget or an automatically collected review. No review was posted and no Google profile content was changed.

At review time, live Google Maps showed 4.8/18 reviews and live Booksy showed 5.0/245 reviews; search results contained older Booksy counts. The existing deliberately rounded `over 220` Booksy wording remains true and explicitly attributed to Booksy. Do not label this as a Google score or automatically replace it based on an unverified threshold. Future display of a Google score needs a fresh check and its own source label.

## Existing fixes verified

Homepage main landmark, thirty unique rotating-gallery alt texts and the normalized `.gitignore` were already implemented; their regression tests pass. Root layout supplies one shared footer and one CookieBanner to all eight public routes. There is no Meta Pixel loader, so the banner should not claim Meta tracking. The same banner discloses analytics, marketing/Google Ads and Google Maps on all routes.

Before this release, a browser test at viewport 375px found the same deployed SHA on all eight routes, one footer and a working cookie-preferences button each, identical disclosure text, and no horizontal page overflow. This is responsive browser emulation, not a physical-phone test. New cennik layout was checked locally at 375px and 414px without overlap between names/times/prices. Smoke checks now enforce matching banner text across all routes, all three category-specific booking links, duration disclosures on all 27 price rows and the official Google invitation URL.
