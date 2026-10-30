# Consistency Follow-Up - 2026-10-30

## Verified Baseline

All eight public routes served release
`ad14942e9e71ef124f04cb2c1a0111fac0cd4bcf`, HTTP 200, one shared footer with
cookie preferences and genuine `tel:+48662989534` / `mailto:salon@noblu.pl`
links. The reported split production release was not reproduced.
Raw HTTP/cache evidence: `output/2026-10-30-consistency-before.json`.

Static documents were CDN HIT with the same Age and release. Reservation was
MISS, Age 0, private/no-store, as expected for its dynamic query-dependent
rendering. This is not a separate old layout; no cache purge or revalidation
configuration change was needed.

Manicure and lash CTA links already used canonical variant IDs. The compatibility
map in `serviceCatalog.ts` already resolves `manicure`, `rzesy` and historical
service names. Existing unit and browser regression coverage was retained.
Manicure already had team, hygiene, durations and practical care/visit copy;
its visible content was not rewritten unnecessarily.

The actual custom Booksy /h link opened the correct public profile and booking
actions in Chrome. Keep it active. The public profile's rating/count supports the
existing conservative "ponad 240" text. Do not hide Booksy based on a parser error.

## Changes And Boundaries

| File | Change and reason | Risk or verification |
| --- | --- | --- |
| `app/polityka-prywatnosci/page.tsx` | Explicit spaces around a linked mailbox in the Resend delivery paragraph. | A JSX newline before an expression is not a guaranteed space. Real browser text checks reproduce and guard the bug. No legal basis, retention or provider configuration changed. |
| `app/components/home/HomeReviews.tsx` | Decorative opening quotes get aria-hidden. | Visible review words, author names and attribution are unchanged. |
| `app/cennik/page.tsx` | Each bookable service name links to the exact canonical variant; labels identify employee. | Add-ons remain non-bookable. No new variant, price or time. The test exposed that group links alone did not offer exact employee selection. |
| `app/pedicure-krakow/page.tsx` | One acquisition mention and district list; practical scope/preparation/employee copy and FAQ. Replace two remaining literal CTA prices with catalog lookup. | SPA scope and employee assignments retain existing Booksy-confirmed facts. FAQ JSON-LD follows the same visible array. |
| `app/components/LashMethods.tsx` | Shared server-rendered method cards with catalog price/time and canonical inquiry links. | A missing catalog ID fails loudly instead of inventing values. Existing published lash times are reused, not claimed as newly verified by Booksy. |
| Both lash route pages | Reuse method cards and owner-confirmed salon hygiene; remove repeated district lists and clarify inquiry/preparation. | Do not assign a lash stylist or invent reviews. The owner explicitly deferred those additions. |
| `app/lib/contentRevisions.ts` | Record actual changes on the five affected content routes. | Shared business/service verification dates are unchanged. Remove the now-unused fallback revision object. |
| `tests/helpers/render-page.mjs` | Model Next Link as a real anchor. | Keeps service names in rendered unit-test trees after names become links. |
| `tests/consistency-followup.test.mjs` | Seven focused checks for copy, decoration, shared lash details and all service-row targets. | Includes observed red-to-green failures; manicure's already-correct copy remains protected. |
| `tests/e2e/consistency-followup.spec.ts` | Browser whitespace, lash details/responsiveness and exact Julia selection through a mocked successful inquiry. | No real appointment or mail is sent. Desktop/375/414 screenshots are in ignored output. |
| Plan and this report | Scope, evidence, decisions and remaining manual work. | Do not mistake text extraction for DOM link semantics or a mobile emulation for a physical phone. |

The visible Pause button remains: it is an actual accessible control for automatic
gallery rotation, not stray decorative text.

## Verification

- `npm run check`: exit 0; lint, 149 Node tests, audit 0 vulnerabilities,
  production build and local smoke.
- Deterministic browser suite: 80 passed, four intentional exclusions (three
  opt-in vendor checks plus the mobile-only sticky action on desktop).
- Responsive screenshots inspected on desktop and Chromium mobile 375/414.
- Production must be checked against the exact merged release after publication.
  The separate protected-preview automation limitation remains documented in
  the preceding release; use a manual preview check rather than claiming it passed.

## Explicitly Deferred

- Named lash practitioner and authentic lash reviews, per owner's reply.
- A new physical-phone test and confirmation of delivery to salon@noblu.pl.
  Prior successful delivery tests are historical evidence, not a new test here.
- No paid services, additional advertising tools, employee panel or unrelated
  local deletion of CLAUDE.md are part of this change.
