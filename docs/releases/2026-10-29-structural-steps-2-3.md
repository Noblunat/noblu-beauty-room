# Structural Steps 2 And 3

## Published Step 2

- PR: https://github.com/Noblunat/noblu-beauty-room/pull/38
- Production commit: `f5f05ddc4a5e5fee8b85b243e1ddbe9d750c4888`.
- All eight public routes were verified against this exact release marker. Production smoke exited 0, including the safe empty API request (400), metadata/schema/contact/footer checks, images, redirects, 404/410, robots and sitemap.
- GitHub Quality run `40657734242` passed for the reviewed head. Local verification: 139 Node tests, 51 deterministic browser tests and three opt-in real-Google tests; all passed. Collection and valid submissions were intercepted.
- Manual inspection of the protected preview confirmed Natalia/Julia selections and matching price/time, the salon mailbox, hours, cookie reopening and saved choices.
- Limitation: the full authenticated-preview Playwright run was not green. A temporary OIDC adapter exposed route-response teardown/abort errors. Those experimental changes were removed, not shipped. HTTP preview checks passed all eight document checks but the API probe returned 403 rather than the expected 400 under that authentication path. Production validation passed. Do not describe the preview automation as passing; investigate it separately before relying on that workflow as an automated release gate. Deployment Protection was not disabled.

## Step 3 Change Walkthrough

| File | Change and reason | Boundary or risk |
| --- | --- | --- |
| `app/components/CookieBanner.tsx` | Expanded preferences use a named native modal dialog, focus on its title, Tab/Shift+Tab cycling, Escape/close without saving, and focus restoration. The first layer retains equal accept/reject buttons. | A first-layer opener is recreated; return focus uses its new ref. Disabled necessary checkbox accurately communicates that it cannot be changed. Consent purposes, storage version and Google configuration are unchanged. |
| `app/cennik/page.tsx` | Four named lists with `li` rows replace unstructured price-row divs. | Existing grids and all catalog-derived prices, employee variants and durations remain unchanged. Explicit list role retains semantics with CSS resets. |
| `app/page.tsx` | Eight Instagram thumbnails remain real images, with one profile action. Repeated district/acquisition paragraphs become practical service copy. | Images must not look like eight separate links. Service links and the single comprehensive location list remain. No server/client split in this step. |
| `app/components/SiteFooter.tsx` | Remove the repeated district sentence. | Contact, hours, address and cookie settings remain on every route. |
| `app/lib/contentRevisions.ts` | Record the actual homepage and shared-footer content date, 2026-10-29. | Do not alter business verification dates merely because code was rebuilt. Shared footer changes affect every public route. |
| `tests/cookie-consent.test.mjs` | Render harness supports refs and the existing icon library. | Consent assertions and equal-choice checks are preserved. |
| `tests/e2e/accessibility.spec.ts` | Twelve checks across desktop/375/414 cover focus, cancelling without consent, saving, semantic price rows and duplicate links/copy. | Includes successful red-to-green evidence and screenshots. No real emails are sent. |
| `tests/e2e/consent.spec.ts`, `tests/e2e/site.spec.ts` | Expanded preferences are queried by dialog semantics instead of region. | Network/consent/category assertions are not removed. |
| `tests/e2e/fixtures.ts` | Rejection helper verifies that any cookie surface is hidden, whether first layer or expanded dialog. | Valid inquiry submissions remain intercepted. |
| `docs/plans/2026-10-28-accessibility-cleanup.md` | Scope and acceptance criteria recorded before UI changes. | Step 4 and protected-preview infrastructure repairs are not included. |

## Verification

- `npm run check`: exit 0, 139 Node tests, zero known dependency vulnerabilities, production-mode build and local smoke.
- Deterministic browser suite: 63 passed; three opt-in checks skipped in the default run.
- Real Google integration: three passed separately, with collection intercepted.
- Dialog screenshots reviewed at desktop, 375 px and 414 px. Preferences scroll within the small viewport; the first-layer accept/reject actions remain unchanged.
- Native dialog alone allowed keyboard focus to leave for browser chrome. The explicit boundary cycle follows the pattern already used by `GalleryLightbox`; its three failing viewport checks passed after the fix.

## References And Remaining Work

- https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog
- This is targeted accessibility work, not a claim of a complete WCAG certification or physical iPhone testing.
- Step 4 (homepage server/client decomposition) remains separate.
- Protected-preview automated authentication/teardown needs a dedicated investigation; no experimental credential handling is retained here.
- No service price/time changes, paid plans, marketing tools or real bookings were introduced. Unrelated local `D CLAUDE.md` is excluded.
