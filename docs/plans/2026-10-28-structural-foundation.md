# Structural Foundation Implementation Plan

Goal: protect current behavior before changing shared business/service data, then improve accessibility and server/client boundaries without changing URLs or prices.

Architecture: keep Next App Router and the existing catalogs. Add real browser regression tests first. Test UI submissions through browser-level interception; test the real API honeypot with an otherwise invalid request and retain the provider-mocked unit test. Never send a real appointment. Meta is not installed and must remain absent after either consent choice.

## Sequence And Gates

1. Add `playwright.config.ts`, `tests/e2e/{fixtures,booking,consent,site}.ts` specs, npm scripts, CI browser job and optional preview workflow. Desktop and mobile 375/414. Existing behavior tests must pass before production refactoring. Verify rejected consent has no external requests, accepted consent queues only configured Google destinations. A separate opt-in real-vendor test observes but blocks outgoing collection requests. No fake Meta activation.
2. Introduce `app/lib/business.ts` and stable service/variant identities, preserving old names and `?usluga=` aliases. Add contract tests before the migration. Move footer/metadata/schema/FAQ references in small steps; verify Node and browser tests after each step. No price changes, especially no removal of the French/ombre/babyboomer supplement.
3. Add failing browser accessibility tests, then native dialog semantics/focus restoration for preferences, semantic price lists, one Instagram profile link and removal of duplicated local copy. Do not trap focus in an unconverted non-modal region.
4. Split static homepage from client gallery/sticky CTA last. Preserve SSR content, current visuals, logo intro and route behavior. Verify screenshots and all earlier tests.

Commands: `npm run lint`, `npm test`, `npm run build`, `npm run smoke:local`, `npm run test:e2e`. Run `npm audit` after dependency updates. CI must run browser tests on the production-mode build; preview checks accept an explicit URL and must fail rather than bypass authentication without authorization.

Delivery: isolated `codex/structural-foundation-20261028` branch. Keep unrelated `D CLAUDE.md`. Publish no production deployment during test-baseline work. Record completed stages and remaining stages honestly; do not claim that local browser checks are a preview deployment or physical-phone test.

## Checkpoint: Browser Baseline

- Stage 1 implemented locally: 48 deterministic browser checks passed across desktop, 375 px and 414 px; the three opt-in real-Google integration checks passed separately. Collection was intercepted, no appointments or emails sent.
- `npm run check`: exit 0; lint, 128 Node tests, zero known dependency vulnerabilities, production build and local smoke passed.
- Preview workflow and exact-release assertion are prepared. No actual Vercel preview was deployed or tested in this stage, and no GitHub workflow run is claimed.
- Stages 2-4 are pending. Application source and production are unchanged at this checkpoint.
