# Releases

Use Node 24 and `npm ci`. Keep production secrets out of tests and pull-request CI.

1. Work on a feature branch, not directly on main. Open a pull request.
2. `npm run check` must pass: zero lint warnings, unit/regression tests, full npm audit (moderate or higher fails), production build. Never use `npm audit fix --force` or omit dev dependencies to satisfy this gate.
3. Verify `vercel project inspect --non-interactive` resolves `natalia-s-projects16/noblu-beauty-room77` before deploying.
4. Deploy a preview (`vercel deploy --yes`) and verify the changed flows there. Use `vercel curl` for protected previews, never disable protection. Never submit a real appointment during checks.
5. Merge only after CI passes. Vercel's buildCommand runs the same gate for both preview and production, including manual CLI deployments.
6. Run `npm run smoke` against production after publishing. The Production smoke workflow also runs on a successful production deployment. For a public test URL set SMOKE_BASE_URL; protected previews must be accessed with Vercel's authorized tooling. The script only submits an empty invalid request, never an appointment. Set EXPECTED_RELEASE to verify the exact git SHA exposed by the non-sensitive noblu-release meta tag. Also verify cookie preferences, keyboard gallery controls and mobile layout in a real browser. A Ready deployment alone is insufficient.
7. On regression, use `vercel rollback <previous-ready-deployment>` after verifying the owner/project. Record the affected commit and fix on a new branch. Never use git reset --hard to roll back the working directory.

The ESLint dependency override is documented in `docs/DEPENDENCIES.md`. Check its compatibility tests on every Next upgrade. Retain all Next/React lint rules.

Monitoring services and employee-panel changes are explicitly out of scope for this release at the owner's request.
