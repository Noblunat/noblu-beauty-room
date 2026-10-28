# Releases

Use Node 24 and `npm ci`. Keep production secrets out of tests and pull-request CI.

1. Work on a feature branch, not directly on main. Open a pull request.
2. `npm run check` must pass: zero lint warnings, unit/regression tests, full npm audit (moderate or higher fails), production build. Never use `npm audit fix --force` or omit dev dependencies to satisfy this gate.
3. Verify `vercel project inspect --non-interactive` resolves `natalia-s-projects16/noblu-beauty-room77` before deploying.
4. Deploy a preview (`vercel deploy --yes`) and verify the changed flows there. Run the Preview browser checks workflow or `E2E_BASE_URL=<exact preview URL> npm run test:e2e` as described in `docs/browser-tests.md`. Use Vercel's authorized automation bypass for protected previews, never disable protection. UI submissions are intercepted; never submit a real appointment during checks. Record the preview URL and tested SHA.
5. Merge only after CI passes. Vercel's buildCommand runs the same gate for both preview and production, including manual CLI deployments.
6. Run `npm run smoke` against production after publishing. The Production smoke workflow follows a successful main-branch Quality run and waits up to 3 minutes for that exact SHA on noblu.pl. This works even when Vercel projects do not publish GitHub deployment events. For a public test URL set SMOKE_BASE_URL; protected previews must be accessed with Vercel's authorized tooling. The script only submits an empty invalid request, never an appointment. Set EXPECTED_RELEASE to verify the exact git SHA exposed by the non-sensitive noblu-release meta tag. Also verify cookie preferences, keyboard gallery controls and mobile layout in a real browser. A Ready deployment alone is insufficient.
7. On regression, use `vercel rollback <previous-ready-deployment>` after verifying the owner/project. Record the affected commit and fix on a new branch. Never use git reset --hard to roll back the working directory.

The ESLint dependency override is documented in `docs/DEPENDENCIES.md`. Check its compatibility tests on every Next upgrade. Retain all Next/React lint rules.

GitHub Quality additionally installs Chromium and runs `npm run test:e2e` after `npm run check`. The required `lint-test-audit-build` job cannot pass before the deterministic browser suite. A Vercel build alone does not run browser binaries: do not treat its success as a replacement for the PR gate and explicit preview check. Optional live-vendor checks are documented separately and intercept collection requests.

Monitoring services and employee-panel changes are explicitly out of scope for this release at the owner's request.
