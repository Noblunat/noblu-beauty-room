# Cookie consent versioning

The shared reader in `app/lib/cookieConsent.ts` gates the banner, external content,
Google tags and conversion events. Keep these consumers on this single reader.

## Stored decision

`noblu-cookie-consent` in localStorage contains the four explicit category choices,
`version` (the integer `COOKIE_CONSENT_VERSION`) and `decidedAt` (UTC ISO timestamp).
Every explicit save, including rejecting optional categories or enabling only the
map, writes the current version and decision time. Reading or opening preferences
does not refresh the timestamp or grant permission. There is no server consent log.

Unversioned, older, unknown, incomplete or malformed records return no consent.
This intentionally asks existing visitors once again when this feature is deployed;
do not silently stamp old choices with a new version/date. Missing external consent
must not be inferred from marketing consent.

## Changing the required version

1. Review the new purposes, tools and processing scope with the owner.
2. Update the banner and privacy policy to describe the actual configuration.
3. Increment `COOKIE_CONSENT_VERSION` for a material consent-scope change, not for
   routine copy, photo, price or layout edits. Update versioned test fixtures.
4. Verify that old records show the banner and block Google tags/events and maps
   until a new explicit choice. Verify save, reload, edit, rejection and tab sync.
5. Run `npm run check` and release through the protected branch workflow.

Storage events apply changed or invalidated decisions across tabs running the new
code. Tabs still running a pre-deployment bundle need a reload to receive the new
validation; do not claim a deployment can retroactively replace their JavaScript.
Blocked storage falls back to the current page's explicit choice; a reload asks
again. There is no automatic age-based expiry or periodic re-consent timer.
