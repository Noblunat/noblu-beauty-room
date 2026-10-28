import { test as base, expect, type Page } from "@playwright/test";

export const isGoogle = (url: URL) => /(^|\.)(google-analytics\.com|googletagmanager\.com|googleadservices\.com|doubleclick\.net|googlesyndication\.com|google\.com|google\.pl)$/.test(url.hostname);
export const isMeta = (url: URL) => /(^|\.)(facebook\.com|facebook\.net|fbcdn\.net)$/.test(url.hostname);
export const isAds = (url: URL) => /googleadservices|doubleclick|googlesyndication/.test(url.hostname) || /\/pagead\//.test(url.pathname);

type Fixtures = { externalRequests: string[]; isolateRequests: void };

export const test = base.extend<Fixtures>({
  externalRequests: async ({}, provide) => { await provide([]); },
  isolateRequests: [async ({ context, baseURL, externalRequests }, provide) => {
    const origin = new URL(baseURL!).origin;
    await context.route("**/*", async route => {
      const request = route.request();
      const url = new URL(request.url());
      if (url.origin === origin) {
        // UI tests must explicitly intercept submissions. An accidental valid
        // request must never reach the preview's real mail provider.
        if (url.pathname === "/api/rezerwacja" && request.method() !== "GET") {
          await route.fulfill({ status: 503, json: { error: "Unmocked E2E submission blocked." } });
          return;
        }
        const bypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
        if (bypass) {
          // Do not forward the preview credential through a redirect or to a
          // third-party script. Disable traces when this credential is present.
          const response = await route.fetch({ headers: { ...request.headers(), "x-vercel-protection-bypass": bypass }, maxRedirects: 0 });
          await route.fulfill({ response });
        } else {
          await route.continue();
        }
        return;
      }
      externalRequests.push(request.url());
      if (process.env.E2E_LIVE_TAGS === "1" && isGoogle(url) && request.resourceType() === "script") {
        // Fetch real vendor code, but never forward its collection requests.
        const response = await route.fetch({ maxRedirects: 0 });
        await route.fulfill({ response });
      } else {
        await route.fulfill({ status: 200, body: "", contentType: request.resourceType() === "script" ? "application/javascript" : "text/plain" });
      }
    });
    await provide();
  }, { auto: true }],
});

export { expect };

export async function rejectOptional(page: Page) {
  const reject = page.getByRole("button", { name: "Odrzucam opcjonalne", exact: true });
  await expect(reject).toBeVisible();
  await reject.click();
  await expect(page.getByRole("region", { name: "Preferencje plików cookie" })).toBeHidden();
}

export async function fillInquiry(page: Page) {
  await page.getByLabel("Imię", { exact: true }).fill("TEST E2E - NIE WYSYLAC");
  await page.getByLabel("Telefon", { exact: true }).fill("+48662989534");
  await page.getByRole("combobox", { name: /^Usługa/ }).selectOption({ label: "Manicure — Natalia" });
  await page.getByLabel("Preferowany dzień", { exact: true }).fill("2099-01-15");
}
