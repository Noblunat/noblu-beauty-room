# First-visit offer release

Owner approved the local preview for publication on 2026-11-01.

## Scope

- Catalog-derived hybrid manicure comparison: Natalia 160 PLN / 90 minutes; Julia junior 130 PLN / 120 minutes. No price/catalog changes, discounts or free welcome extras.
- First-visit scope and existing add-on costs/times. French/ombre/babyboomer remains 20 PLN. Separate gel removal/correction is not advertised as universally free.
- Exact employee variant links to the inquiry form. Booksy buttons still open the real general booking profile with a selection explanation, not an invented direct employee link.
- Selected variant/price/time next to fields, smaller mobile introduction and explicit inquiry confirmation/alternative-date expectations. Provider idempotency and validation remain intact; the internal email now includes its existing inquiry UUID.
- Team/gallery/review anchors without assigning unverified photo authorship or inventing Julia reviews. Staff-specific Booksy click metadata, still gated by the existing consent mechanism.
- Internal visit standard and blank measurement CSV. No CRM, offline-conversion upload, external account, budget or campaign changes.
- Local-only preview flag blocks actual mail and Google components when explicitly enabled. It must remain absent in Vercel preview and production. Do not deploy a locally built `.next` directory made with this flag.
- Explicit image-quality allowlist matches the existing gallery settings. Content revision dates reflect this release.

## Verification

Release gates, exact preview/production SHA and deployment evidence are recorded with the pull request. Local evidence is stored in ignored `output/2026-11-01-first-visit-release-*` logs. Automated submissions are intercepted or deliberately invalid; no customer inquiry or real appointment is sent.

The first protected-preview run passed 91 checks and failed one mobile booking test. Its second consent click raced the server-rendered first-visit banner before the saved refusal was read; the footer action had not opened a preferences dialog. The test now first requires the stored-choice banner to be hidden and then verifies that the real preferences dialog opened. It retains the same consent, submission, success and deduplication assertions, with no retries, sleeps or application-code changes.

## Remaining editorial inputs

Staff-specific portfolio images and authentic Julia reviews require owner-provided attribution/source. Precise gel-removal/correction rules should be confirmed before a stronger or broader pricing promise. The approved release retains salon-wide portfolio links and cautious scope wording.
