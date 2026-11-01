# Review and change walkthrough

Authorized scope: synchronize manicure/pedicure using Booksy, update Google services and ad communication, and shorten the path to Booksy. Baseline origin/main d39f15c. No booking or inquiry was submitted during browser verification.

| Files | Change, purpose and interaction | Risk / verification |
|---|---|---|
| app/lib/booksyCatalog.ts | Current Biz prices/times and source variant IDs; 21 services, 28 employee variants. Public-list presence recorded separately from Biz availability. | Service IDs retained; three new Julia options verified against saved Biz rows and public Booksy. Single-employee assignments retain the prior verified Biz identities; model and tips Julia assignments rechecked. Add-ons retain the 26 October baseline. |
| app/lib/serviceCatalog.ts | Updates the source revision; existing stable identity projection creates three additional Julia choices without changing Natalia aliases. | Alias/order tests protect old campaign links. |
| app/lib/priceCatalog.ts | Adds a salon availability note to model/tips entries that exist in Biz but were absent from the public list. Both stay selectable as inquiries, not guaranteed appointments. | No deletion and no change to Booksy. All price/form/schema projections remain centralized. |
| app/lib/homePricing.ts | Lowest pedicure reference now 80 PLN with explicit Julia, nail-only and no-hybrid scope. | Does not advertise full SPA for 80 PLN. |
| app/manicure-krakow/page.tsx, app/pedicure-krakow/page.tsx | Two direct Booksy actions each using the owner's existing /h link; existing exact-variant inquiry actions remain. Updated booking explanations and Julia pedicure copy. | Native outbound link, existing consent-gated delegated tracking, no embedded vendor and no promise that an inquiry reserves a slot. |
| app/components/ServiceVariants.tsx, app/cennik/page.tsx | Explains base prices and separate add-ons; cennik reflects Julia nail-only option. | Does not invent extra treatments or alter staff prices. |
| app/components/CookieBanner.tsx | First-layer mobile accept/reject buttons share a row, reducing height; settings span both columns. | Choices, disclosure, defaults and preference dialog logic unchanged. Mobile screenshot and decline flow checked. |
| app/lib/contentRevisions.ts | Dates and reasons for actual catalog/page changes. | Existing dependency projection updates sitemap; build alone does not invent a revision. |
| tests/booksy-sync.test.mjs | Protects Julia's three exact price/time/source IDs and Booksy actions on both pages. | Both cases failed before implementation and passed after. |
| tests/booksy-catalog.test.mjs, prices.test.mjs, service-details.test.mjs, service-identities.test.mjs, tools/smoke.mjs | Expected catalog/price-row counts and lowest pedicure price updated. Existing substantive consistency assertions retained. | 28 nail/pedicure variants + 7 existing lash variants + 7 add-ons = 42 price rows. |
| package.json, package-lock.json, tools/legacy-minimatch.mjs, tests/minimatch-compat.test.mjs | The existing moderate-level audit gate failed on old minimatch versions (GHSA-g3hv-75wg-m249). Pins upstream 11.0.3 and preserves ESLint plugins' callable CommonJS interface in the lint process using a preload. | Necessary release prerequisite discovered during checks; no audit/rules disabled. No application import or browser bundle change. Tests exercise callable/named APIs, matching, class, defaults and braces. All installed minimatch consumers use the patched package; npm audit reports zero. |
| docs/plans and this review | Scope, source limitations, implementation and additional tooling correction documented. | Do not mistake private Biz existence for public calendar availability. |

## Verification before publication

- Final-source `npm run check`: exit 0; lint, 152 tests, dependency audit zero, production build and local smoke all passed.
- Chrome: local production-mode pages, 390 x 844 layout, rejection of optional cookies, retained Natalia 160 PLN/90 min selection, and all three new Julia choices checked. No personal fields filled and no submission made.
- Google services and Ads are separate UI mutations; their saved observations and screenshots are archived in the marketing workspace `work/booksy-sync-2026-10-31`.
- Project/team/domain confirmed in Vercel UI: natalia-s-projects16 / noblu-beauty-room77, production main, noblu.pl and www.noblu.pl, previous release d39f15c.

Sources: https://github.com/advisories/GHSA-g3hv-75wg-m249 and https://nodejs.org/api/modules.html (CommonJS cache and ESM interoperation documentation). Publication and exact production SHA must be verified after merge.
