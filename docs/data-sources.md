# Business And Service Data

## Ownership

| Module | Owns |
| --- | --- |
| `app/lib/business.ts` | Public name/legal details, address, phone formats, mailbox, opening hours, lower review threshold/source, external profiles and directions. No secrets. |
| `app/lib/booksyCatalog.ts` | Verified Booksy snapshot: manicure/pedicure names, numeric variant prices and minutes, source IDs, descriptions and add-ons. No live scraping. |
| `app/lib/team.ts` | Stable staff keys, names, portraits, approved descriptions and team content revision. |
| `app/lib/serviceCatalog.ts` | Stable internal service/variant IDs, categories, frozen historical aliases, default variant mappings and the seven existing lash services with numeric prices/minutes. |
| `app/lib/bookingServices.ts` | Presentation and lookup adapter for forms/API; does not own prices or durations. |
| `app/lib/priceCatalog.ts` | Derived price rows, formatted amounts/durations and numeric structured offers. |
| `app/lib/homePricing.ts` | Explicitly selected representative services for homepage summaries. Not the minimum of unrelated model/repair services. |
| `app/lib/contentRevisions.ts` | Page revisions and dependencies on business, service and team data; sitemap and visible revision labels use the newest relevant source date. |
| `app/lib/llms.ts`, `app/llms.txt/route.ts` | Generated AI-readable text from the same data, statically served at the unchanged `/llms.txt` URL. There is no second editable copy in public. |

The refactor does not change any price or duration from the verified snapshot. French/ombre/babyboomer remains 20 PLN. Lash staff assignments are not guessed: the previous data does not name a specific employee for those services.

The company configuration keeps separate public phone representations for presentation, with an independent browser-test baseline. Secrets and deployment overrides remain server environment variables: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `BOOKING_RECIPIENT_EMAIL`. The environment recipient may override delivery routing; it must not leak into browser configuration.

## Identities And Compatibility

Examples: `manicure-natalia`, `hybryda-natalia`, `hybryda-julia`, `pedicure-spa-bez-hybrydy-natalia`, `rzesy-1-1-aplikacja`.

IDs do not depend on display copy, array ordering, price or duration. Staff keys are explicit, not inferred from variant index. Adding an unknown Booksy record/staff assignment fails rather than silently labeling it Julia. Historical names are migration aliases and must not be rewritten when display names change. Tests deliberately reorder and rename source records to enforce this.

New links use `/rezerwacja?usluga=<variant-id>`. Old campaign aliases remain supported with the same choices:

| Old parameter | Canonical variant |
| --- | --- |
| manicure | manicure-natalia |
| hybryda | hybryda-natalia |
| pedicure | pedicure-spa-bez-hybrydy-natalia |
| pedicure-paznokcie-hybryda | pedicure-paznokcie-hybryda-natalia |
| pedicure-kosmetyczny-hybryda | pedicure-spa-hybryda-natalia |
| rzesy | rzesy-1-1-aplikacja |

The resolver also accepts historical full form values, including Julia's suffix. The displayed canonical names now match the price list: e.g. Pedicure SPA bez hybrydy, not a separate cosmetic-pedicure identity. Unknown values leave the form unselected.

New form payloads send `serviceId`; the server derives the name, staff, price and duration. The legacy `service` field remains accepted for older open forms. An explicitly invalid ID never falls back to a valid name; conflicting ID/name pairs return 400 before delivery. Subjects and message rows contain the readable variant label and stable ID. Resend idempotency and anti-spam behavior are unchanged.

Analytics retain readable `service_name` and add `service_id` for explicit selections. Generic service-page views use `service_category` without claiming the visitor chose a particular employee. No Google account settings, consent purpose, budget or Meta loader changes are part of this refactor. Reporting a new custom dimension in GA4 may require separate account configuration.

## Updating Data

1. Verify the change with the owner/source; do not change prices automatically from scraped text.
2. Edit the owning configuration/snapshot. Keep existing IDs and historical aliases. When removing a service, explicitly decide what its old links should do; never silently send them to a different service.
3. Update the relevant source content revision only if published data changed. Do not use the current date on each build. `serviceCatalogUpdatedAt` is a catalog/presentation revision, not a claim that every price changed that day; the Booksy source comment retains its verification date.
4. Run `npm run check`, `npm run test:e2e`; then test the exact preview SHA according to `docs/browser-tests.md`. No test should deliver a real appointment.
5. Review independent browser business assertions deliberately when changing owner-approved facts. Do not import application data into those assertions, which would hide shared-data mistakes.

Layout, cookie dialog accessibility and homepage client/server splitting are separate later stages. No production deployment is implied by a local passing check.

## Migration Risks And Checks

- Shared-data imports replace duplicated facts in all eight page routes, root/reservation metadata, the footer, business/service/breadcrumb JSON-LD, robots and sitemap. A wrong shared fact would affect multiple pages, so browser expectations deliberately keep an independent owner-approved baseline.
- The form submits IDs; the API resolves the authoritative variant before building email content. Old names remain accepted for already-open older forms. A partial rollback must preserve both request formats until old clients have expired.
- Form options, price rows and employee cards derive the same canonical label. Alias collisions and unknown source/staff identities throw rather than route a client to an unintended service. Reordering and renaming fixtures test that identities survive display changes.
- Generated dates follow source dependencies; a deployment alone must not advance them. Policy text uses the same revision label as the sitemap.
- `llms.txt` moved from a public file to a static App Router response at the same URL. Smoke checks verify its content type and shared mailbox.
- JSX text adjacent to an expression may lose a newline space. Preserve explicit whitespace where an address expression starts a new source line; browser checks reject `ul.Orzechowej`.
- Generated `output/` content is excluded from both Git and ESLint. This keeps downloaded Playwright report JavaScript out of source linting without excluding application or test code.
- All delivery is mocked/intercepted during verification. A local green test is not a successful deployment or a new real-phone delivery test.
