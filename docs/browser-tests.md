# Browser Regression Checks

Use Node 24, `npm ci`, `npx playwright install chromium`, then:

```powershell
npm.cmd run build
npm.cmd run test:e2e
```

Playwright starts a separate production-mode Next server on 127.0.0.1:3127 and stops it after the tests. It refuses to reuse an unrelated server. The server gets an empty RESEND_API_KEY, overriding local credentials. The suite covers desktop Chromium and Chromium-emulated 375/414 px phones, not physical iOS devices.

Every UI submission is intercepted. A safety fixture rejects any submission without a per-test mock. The only real API request is an otherwise invalid honeypot payload, which cannot send mail even if the honeypot regresses. Provider-level no-send behavior is also covered by `tests/booking-api.test.mjs` with valid fields and a mocked Resend transport. Do not replace these with real reservations.

Default consent tests intercept every third-party request. They verify absence before/after rejection, the configured GA4/Ads destinations after acceptance and persisted preferences. Meta is absent and must remain absent after acceptance too. The tests do not manufacture a Meta request to meet an outdated expectation.

The suite also checks mixed marketing-only choices and withdrawal in a second tab. Full-document navigation can update the URL before React hydration; the form flow waits for a working preferences interaction before typing, rather than relying on a fixed sleep or internal React properties.

For the optional live-vendor integration, only real Google JavaScript is fetched. Collection requests are observed and fulfilled locally, never forwarded to Google. This mode requires network availability and is separate from the deterministic PR gate:

```powershell
$env:E2E_LIVE_TAGS = "1"
npm.cmd run test:e2e -- --project=desktop --grep "real Google vendor"
Remove-Item Env:E2E_LIVE_TAGS
```

## Preview Before Publication

Run **Preview browser checks** in GitHub Actions against the exact Vercel preview URL and the branch containing these tests, or locally:

```powershell
$env:E2E_BASE_URL = "https://noblu-beauty-room77-EXACT-DEPLOYMENT.vercel.app/"
$env:EXPECTED_RELEASE = "FULL_SHA_OF_THE_PREVIEW_COMMIT"
npm.cmd run test:e2e
Remove-Item Env:E2E_BASE_URL
Remove-Item Env:EXPECTED_RELEASE
```

The configuration rejects production/custom/arbitrary hosts. Protected previews require the owner's existing Vercel Automation Bypass credential in the repository secret `VERCEL_AUTOMATION_BYPASS_SECRET`; never disable Deployment Protection. Before navigation, one scoped API request with `x-vercel-set-bypass-cookie: true` establishes Vercel's secure HttpOnly, host-only `_vercel_jwt` session. Playwright's context request shares its cookie jar with the browser. Redirects are not followed with the credential. Ordinary browser requests then use this session, not a per-resource fetch/fulfill proxy. Traces remain disabled when the credential is present. Never save the authenticated storage state or put the credential in a URL or command argument. The workflow never reads production mail credentials.

The fixture explicitly depends on the test page so its teardown runs before Playwright closes that page. It waits for in-flight routed requests, including Next link prefetches. Protected-fetch errors are rethrown with the bypass value redacted and no original cause, since Playwright's network errors can include request headers. Regression tests use a synthetic credential only.

Sources: https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation and https://playwright.dev/docs/api-testing#context-request-vs-global-request

The Quality workflow also runs the deterministic browser suite after lint/unit/audit/build/smoke on every PR. A local pass is not a preview pass; record the actual preview URL and commit separately before publishing. An HTTP 401/auth page is a failed check, not a reason to weaken protection.

HTML reports, screenshots and failed-test traces are in ignored `output/playwright/`. CI retains failure artifacts seven days. `npm run test:e2e:report` opens the report.

Business assertions are an independent owner-approved baseline in `tests/e2e/site.spec.ts`, not imported from application data. Updating the shared data must require deliberately reviewing the baseline too; otherwise the same wrong value could make both code and test agree.
