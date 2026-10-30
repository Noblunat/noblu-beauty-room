# Consistency review follow-up

Verify before changing. Baseline: all eight production routes are release
ad14942e9e71ef124f04cb2c1a0111fac0cd4bcf; shared footer, cookie reopening and
callable contact links pass the production smoke. Canonical service links and
legacy campaign aliases already exist. Do not recreate these mechanisms.

Confirmed changes:
- Explicit whitespace before the mailbox in the privacy policy; regression in
  a real browser rather than a text helper that inserts spaces.
- Decorative review quote hidden from assistive technology. Keep the visible
  pause control: it is a real accessible gallery action, not decorative text.
- Reduce repeated acquisition/district copy on pedicure and both lash pages.
- Shared lash-method section derives price, duration and canonical link from
  the existing service catalog; retain existing published values.
- Link each bookable price-list row to its exact service/employee variant;
  group-level links alone cannot preserve the selected employee.
- Reuse owner-confirmed hygiene information. Do not invent staff assignments or
  lash reviews. The owner explicitly deferred both additions on 2026-10-30.
- Track actual content revisions, not deployment-only dates.

Verify lint, Node tests, dependency audit, build, local smoke, browser tests,
responsive screenshots, CI, preview and the exact production release.
Never send a real appointment in automated tests. A physical-phone delivery
test needs the owner and is reported separately from Chromium mobile emulation.
