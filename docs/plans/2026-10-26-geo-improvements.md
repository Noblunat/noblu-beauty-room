# Noblu GEO Improvements Implementation Plan

**Priority update, 2026-10-27 (owner instructions):** execute the agreed Polish plan in `outputs/kolejnosc-prac-noblu-2026-10-26.md` in the marketing workspace. P1: manicure/pedicure catalog, team/hygiene/real work and Google Business Profile reviews/hours; Fresha corrections after the verified catalog. Instagram/Facebook (point 4) and lash changes are explicitly deferred. Keep existing lash prices and dedicated pages unchanged; no new confirmation of those services is claimed. P2: basic test-traffic exclusion, pedicure refinements, real lastmod/price-list dates. P3: one AI test set after major published changes, no expanded AI reporting project. Booksy calendar is working according to the owner's subsequent confirmation; P0 is closed. Vouchers and the proposed November deadline were explicitly withdrawn and are out of scope. The sections below retain implementation details, not execution priority.

**Goal:** Remove avoidable inconsistencies in Noblu's offer and freshness signals, preserve truthful booking behavior, and prepare external corrections with evidence.

**Architecture:** Keep the existing Next.js App Router and shared booking catalog. Generate displayed price lists and structured offers from that catalog plus explicitly non-bookable add-ons. Store real content revision dates as constants with evidence; never use the request time as lastmod. Existing galleries gain visible captions without invented authorship.

**Tech Stack:** Next.js 16.4.3, React 19.2.4, TypeScript, Tailwind, node:test and existing smoke runner. Reference: app/lib/bookingServices.ts; cennik PriceList; ServiceJsonLd; ServiceGallery; Next bundled sitemap documentation.

## 1. Booksy incident

The earlier checks and server-error evidence are historical. After the calendar problem was explained, the owner confirmed it now works. Close P0 on that confirmation; do not reopen diagnostic work unless a new problem is reported. Preserve business identity, staff calendars and existing bookings.

Evidence: marketing work/geo-fixes-2026-10-26. Keep the website inquiry and telephone usable. Do not replace /h by a different commission link based merely on its URL shape.

## 2. Service catalog consistency

Files: app/lib/bookingServices.ts, app/lib/priceCatalog.ts (new), app/cennik/page.tsx, app/manicure-krakow/page.tsx, app/pedicure-krakow/page.tsx, tests/prices.test.mjs, tests/service-details.test.mjs, tests/service-booking-links.test.mjs.

The logged-in Booksy catalog now supplies 21 services and 25 employee variants plus seven add-ons, including Julia's separate prices. Keep legacy campaign selection names and variant IDs. Use the verified catalog for bookable rows, visible price lists and structured offers; the current draft has 39 rows including the seven historic lash rows retained without service changes at the owner's request. Add a behavioral consistency check covering rendered visible price and JSON-LD for the same service. No schema claims that a form submission reserves a slot.

Verify focused tests first, then full npm run check. Expected: unchanged booking semantics and no inconsistent visible/schema price.

## 3. Real revision dates

Files: app/lib/contentRevisions.ts (new), app/sitemap.ts, app/cennik/page.tsx, public/llms.txt, tests/sitemap.test.mjs.

Use explicit revision records for content changed in this release and evidence from git history for remaining routes. A record should include ISO date and reason. `lastModified: contentRevisions[route].date`; visible cennik `<time dateTime={...}>` uses the same record. Do not call Date.now/new Date() for changing dates. Update llms last-updated and booking link guidance. Add behavior checks that dates are valid, stable across repeated calls, and canonical URLs remain unique. After publication only, inspect sitemap and request fresh indexing once for changed important pages; do not do so for an unpublished preview.

## 4. Truthful captions and practical pedicure information

Files: app/components/ServiceGallery.tsx, app/manicure-krakow/page.tsx, app/pedicure-krakow/page.tsx, existing public gallery assets.

Add optional visible captions and preserve current image sizing. Use already verified descriptions of actual photographs; no new generated salon photos. Show the existing pedicure variants with price/time from the catalog. Publish detailed heel/sole procedure and team credentials only after confirmation. Do not fill missing 3–4 pedicure examples by duplicating one photograph. Missing material remains an explicit content dependency.

Verify existing gallery behavior plus desktop/mobile preview without overflow, and that captions are in server HTML.

## 5. Business identity clarity

Files: app/components/SiteFooter.tsx, app/layout.tsx, homepage contact block and reservation contact block where needed.

Add weekends closed. Label review-count claims as Booksy. Keep current Google score separate, and do not add self-serving AggregateRating markup. The owner's latest decision is 10:00–19:00 everywhere on weekdays. Booksy already has these hours. Update website copy and business data; Google submission is pending review and the prepared Fresha correction includes the same hours. Do not claim complete public consistency before website publication and platform processing.

## 6. External sources and analytics

Read Instagram expanded bio/link list, Facebook public profile and Fresha update flow. Prepare a correction showing confirmed vs unconfirmed services; do not assert unsupported salon services or qualifications. Ask only for the missing factual approvals. No messaging to third parties without explicit authorization.

In GA4 create a reviewable exploration/comparison that excludes codex/test, kontrola_techniczna/test and Tag Assistant. Keep source/medium + landing page + relevant events and Google AI impressions separate. Do not activate destructive data filters or change conversion definitions. Verify source/date filters and saved result; no booked-visit claims.

## 7. Verification and delivery

Run `npm run check` with local dependencies installed normally (junction baseline failed tooling path enforcement; repair setup before code work). Inspect output and fix only changes within scope. Use the existing smoke runner and browser preview at desktop and 375px. Review diff and preserve the primary checkout's pre-existing deleted CLAUDE.md. Record completed, prepared and externally blocked items separately.

Commit only reviewed files on codex/geo-improvements-20261026 with `fix: align service information and content freshness`. Publish only the concrete, verified scope authorized by the owner; otherwise provide preview and pending approval. Repeat AI tests only after changed production content is available to readers, with honest indexing delay and Gemini status.
