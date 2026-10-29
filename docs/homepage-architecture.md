# Homepage rendering boundaries

The homepage is composed in `app/page.tsx`, a Server Component. Its header,
hero, service cards, price preview, practical copy, reviews, location, Instagram,
FAQ and contact sections live in `app/components/home/`. Existing `SalonTeam`
and `SalonHygiene` now remain outside the homepage client import graph too.

## Interactive islands

- `HomeGallery.tsx`: six rotating slots, pause and keyboard focus state,
  selected item and the existing native-dialog lightbox. Its 30-item media list
  lives in the pure `app/lib/homeGallery.ts` module. The interval is cleaned up
  when paused, focused, showing a lightbox, or unmounted.
- `StickyBooking.tsx`: observes the existing `home-hero` element after mount.
  CSS hides the action while a consent surface or native modal is open, avoiding
  page-wide state shared with the gallery. The observer disconnects on unmount.
- Existing `ExternalContentConsent` still gates the map. The server contact
  section passes its iframe as a children slot; this must not mount the iframe
  until permission is granted. Next Image also retains its own framework boundary.
- Global consent, analytics and the reservation form keep their existing
  boundaries and behavior. This change does not make the whole site JavaScript-free.

Static sections must not be imported into a client island. The architecture
regression test traverses relative imports and rejects those dependencies.
Business facts, pricing and service IDs retain their existing shared sources.
FAQ text and its JSON-LD are generated from one array in `HomeFaq.tsx`.

## Verification

`npm run check` and `npm run test:e2e` are the release gates. Browser coverage
includes content without JavaScript, gallery rotation/pause/focus/keyboard,
modal/sticky coordination, consent/network gates and mocked inquiry outcomes.

For an opt-in visual comparison, run the mail-disabled production build on
`http://127.0.0.1:3130`. Before a refactor, capture:

```powershell
npx playwright test --config playwright.homepage.config.ts --update-snapshots
```

Rebuild the changed code, restart that local server, then run the same command
without `--update-snapshots`. It compares 13 sections at desktop, 375 and 414 px
with zero differing pixels allowed. The 39 baseline PNGs stay in ignored
`output/homepage-baseline/`, not Git. Do not regenerate baselines to conceal a
regression. This local comparison is separate from the portable default CI suite.

## 2026-10-29 Measurement

Same machine, same production-mode settings, before/after initial HTML scripts:

| Script inventory | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| Uncompressed bytes | 677865 | 635776 | 42089 (6.2%) |
| Offline gzip bytes | 209600 | 197904 | 11696 (5.6%) |
| Offline Brotli bytes | 181645 | 171275 | 10370 (5.7%) |

These are bytes of unique same-origin script URLs referenced by the initial
HTML, not a new Lighthouse result, network transfer measurement, or field CWV.
Raw reports are in ignored `output/homepage-js-before.json` and
`output/homepage-js-after.json`. No new dependency is required at runtime.

Local evidence: 142 Node tests; 71 deterministic browser checks passed (the
desktop-only exclusion for the mobile action and three opt-in live-vendor
checks are intentionally skipped by default); 39 visual section comparisons
passed exactly. No actual appointment or mail was sent by these tests.

Three real-Google checks also passed separately. Their test-only proxy now
allows only the two known Tag Manager library paths. Investigation caught a
pre-existing resource-type-only rule forwarding an Ads JSONP collection request
as a script and then failing during teardown. A red-to-green regression test
now rejects script-shaped collection endpoints; all collection is intercepted
in the corrected run. No production advertising settings were changed.

The protected-preview automation limitation documented in the previous release
remains a separate infrastructure issue. Do not claim that a local pass proves
authenticated-preview automation passes; inspect the actual preview before
merging and verify the exact production release afterwards.
