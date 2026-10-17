# Booking deduplication and focused UX fixes

## Scope

- Implement audit points 1, 3 and 4 only. Leave service durations, social previews, consent versioning, performance and hosting decisions unchanged.
- A loaded form receives a cryptographic UUID. The same unchanged request keeps it on retries; editing a failed request or explicitly starting another inquiry creates a new identity.
- Enforce a synchronous in-flight/completed guard, then replace the form with an accessible success panel. Clear all input state, move focus to the result, and allow a deliberate new blank inquiry.
- Validate the UUID on the API and pass it as Resend Idempotency-Key. Use Resend's shared 24-hour deduplication, not a per-instance Map. Keep existing firewall, data validation and private logging. Handle conflict/in-progress responses without claiming success.
- Make submit a full-width primary action; Booksy and pricing are secondary actions on a separate responsive row.
- Normalize .gitignore as UTF-8 and ignore local output/tmp directories, without deleting existing files. Add a homepage main landmark and real descriptive gallery alts after inspecting the photographs.

## Reference and tests

- Official provider contract: https://resend.com/docs/dashboard/emails/idempotency-keys (Idempotency-Key, 24-hour retention, 409 conflict/in-progress).
- Existing patterns: native fetch API, node:test VM harnesses, ReservationClient state, current shared styles.
- First add failing API/client/markup/gitignore regression tests. Cover same-key replays across API instances, accepted-but-lost responses, malformed UUIDs, payload conflicts, rapid duplicate submissions, one completion event, retry identity, new-inquiry reset, cleared fields and main/gallery semantics.
- Run npm run check (lint, all tests, audit, build, local smoke), review the scoped diff, push a protected-branch PR, merge only after required CI passes, and verify production SHA and smoke.
- Browser-check desktop and mobile layout through supported browser controls, success/reset, keyboard focus, and one clearly marked real email to salon@noblu.pl. Do not make a real booking, alter Booksy, collect private credentials or remove the user's unrelated CLAUDE.md deletion.
