# Security and quality implementation plan

Goal: remove the vulnerable development dependency chain, gate releases, harden booking, measure performance, and make failures observable without logging customer data.

Architecture: retain Next.js App Router, ESLint rules, native node:test and Vercel deployment. Prefer existing Vercel Firewall to a new database for shared rate limiting. Do not add paid services or assume which application owns the employee panel.

1. Dependencies: replace fast-glob (consumed only by Next ESLint here) with maintained tinyglobby via an npm registry alias. Verify this repo's default single-app root, all Next rules, real module resolution and clean npm ci. Explicit rootDir globs require reassessment because directory-expansion behavior differs. Require full npm audit, lint and build to pass.
2. Releases: add npm test/check/smoke scripts, GitHub CI with read-only permissions and no deployment secrets, Dependabot, and a Vercel build quality gate. Document preview verification and explicit production promotion. Check remote protection availability; report any settings needing owner access.
3. Booking: share the service catalog between UI and API; validate service and time enums, derive prices server-side, bound request size, reject cross-origin requests, handle Resend timeout/network failures without PII logs. Test bad input and delivery failures. Verify shared Vercel Firewall rule. Employee-panel audit waits for the correct URL/repo.
4. Performance: measure production mobile and desktop, inspect hero and gallery media. Fix measured bottlenecks only. Preserve real photos and existing layout. Record lab results separately from field Core Web Vitals.
5. Monitoring: deferred at the owner's explicit request. No external monitoring service or alerting account is added. Provider error logs contain only status/reason, never customer payloads.
6. Smoke checks: verify pages, Booksy/phone links, sitemap/robots, images, redirects and non-delivering validation probes; exercise cookies/gallery/mobile in the browser. Deploy preview first, then production after all gates pass.

Validation after each implemented stage: npm run lint, npm run build, focused tests; full tests and audit before publishing. Keep the unrelated CLAUDE.md deletion untouched. Never submit a real appointment during smoke tests.
