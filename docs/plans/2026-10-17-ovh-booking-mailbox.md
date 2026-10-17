# Finish OVH booking mailbox migration

## Scope and acceptance

- Deliver new booking inquiries only to salon@noblu.pl, keeping the current salon@noblu.pl sender.
- Update public contact links, LocalBusiness email and llms.txt to the team mailbox.
- Update the privacy policy date, current OVH/Zimbra processing, IMAP device copies, and Gmail's limited historical role. Do not claim historical emails have been deleted or migrated.
- Inspect the existing OVH subscription price without ordering, renewing or accepting new paid terms.
- Release via a protected-branch PR after lint, tests, audit, build and local smoke succeed.
- Verify all public routes, contact links, policy and production commit; submit one marked browser test and confirm its delivery in OVH. Request a physical-phone test from the owner.

## Files

- app/api/rezerwacja/route.ts: default recipient only.
- app/rezerwacja/ReservationClient.tsx: public email fallback.
- app/components/SiteFooter.tsx, app/page.tsx: contact anchors and labels.
- app/layout.tsx: LocalBusiness email.
- public/llms.txt: contact email.
- app/polityka-prywatnosci/page.tsx: email contact, OVH row, historical Gmail row, delivery description and date.
- tests/booking-api.test.mjs: recipient assertions and configured-recipient override.
- tests/privacy-policy.test.mjs: nine tools and current/historical mailbox roles.
- tests/contact-email.test.mjs: public contact and schema regression assertions.
- tools/smoke.mjs: nine policy tools, expected contact address and no old public email.

## Order

1. Add regression tests and demonstrate expected failures on the old configuration.
2. Apply only the mailbox/contact/privacy changes above; retain historical records.
3. Run npm run lint, npm test, npm audit --audit-level=moderate, npm run build and npm run smoke:local; require exit 0.
4. Update BOOKING_RECIPIENT_EMAIL in Vercel Production and Preview to salon@noblu.pl without changing credentials or sender. Deploy by merging the verified PR.
5. Run production smoke with the merged release SHA. Test the browser form with explicit technical-test labels and verify received content in OVH, not merely an HTTP success response.
6. Record the actual OVH renewal terms and test evidence in the local operational report. Do not change the mailbox password, security controls, existing DNS or other deferred projects.
