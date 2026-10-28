import { test, expect, fillInquiry, rejectOptional } from "./fixtures";

test("homepage CTA opens inquiry, success replaces form and prevents a second submission", async ({ page }) => {
  let submissions = 0;
  await page.route("**/api/rezerwacja", async route => {
    submissions++;
    expect(route.request().postDataJSON()).toMatchObject({ name: "TEST E2E - NIE WYSYLAC", telephone: "+48662989534", date: "2099-01-15", serviceId: "manicure-natalia" });
    expect(route.request().postDataJSON().service).toBeUndefined();
    await route.fulfill({ json: { ok: true } });
  });
  await page.goto("/");
  await rejectOptional(page);
  await page.locator("header").getByRole("link", { name: "Zapytaj o termin", exact: true }).click();
  await expect(page).toHaveURL(/\/rezerwacja$/);
  // The URL arrives before hydration on this full-document navigation. A real
  // interactive preference cycle establishes readiness without arbitrary sleep.
  await page.locator("footer").getByRole("button", { name: "Ustawienia cookies" }).click();
  await rejectOptional(page);
  await fillInquiry(page);
  await page.getByRole("button", { name: "Wyślij prośbę o termin", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Dziękujemy");
  await expect(page.getByRole("button", { name: "Wyślij prośbę o termin", exact: true })).toHaveCount(0);
  expect(submissions).toBe(1);
});

test("legacy campaign links and canonical variant links select the same verified service", async ({ page }) => {
  for (const [value, id, price] of [
    ["manicure", "manicure-natalia", "100 zł"],
    ["hybryda", "hybryda-natalia", "160 zł"],
    ["pedicure", "pedicure-spa-bez-hybrydy-natalia", "180 zł"],
    ["pedicure-paznokcie-hybryda", "pedicure-paznokcie-hybryda-natalia", "160 zł"],
    ["pedicure-kosmetyczny-hybryda", "pedicure-spa-hybryda-natalia", "200 zł"],
    ["rzesy", "rzesy-1-1-aplikacja", "190 zł"],
    ["hybryda-julia", "hybryda-julia", "130 zł"],
    ["Pedicure kosmetyczny", "pedicure-spa-bez-hybrydy-natalia", "180 zł"],
  ]) {
    await page.goto(`/rezerwacja?usluga=${encodeURIComponent(value)}`);
    if (value === "manicure") await rejectOptional(page);
    await expect(page.getByRole("combobox", { name: /^Usługa/ })).toHaveValue(id);
    await expect(page.getByRole("heading", { name: "Wybrana usługa", exact: true }).locator("..")).toContainText(price);
  }
});

test("delivery failure preserves the inquiry, offers contact and retries with the same identity", async ({ page }) => {
  const identities: string[] = [];
  await page.route("**/api/rezerwacja", async route => {
    identities.push(route.request().postDataJSON().requestId);
    await route.fulfill({ status: 502, json: { error: "Nie udało się wysłać formularza. Spróbuj ponownie." } });
  });
  await page.goto("/rezerwacja?usluga=manicure#formularz");
  await rejectOptional(page);
  await fillInquiry(page);
  const send = page.getByRole("button", { name: "Wyślij prośbę o termin", exact: true });
  await send.click();
  const error = page.locator("main").getByRole("alert");
  await expect(error).toContainText("Nie udało się");
  await expect(error.locator('a[href="tel:+48662989534"]')).toBeVisible();
  await expect(page.getByLabel("Imię", { exact: true })).toHaveValue("TEST E2E - NIE WYSYLAC");
  await send.click();
  await expect.poll(() => identities.length).toBe(2);
  expect(identities[0]).toMatch(/^[0-9a-f-]{36}$/i);
  expect(identities[1]).toBe(identities[0]);
});

test("real API honeypot returns success before required-field validation", async ({ request, baseURL }) => {
  // This is intentionally otherwise invalid: even a broken honeypot cannot
  // turn it into a real appointment or delivery attempt.
  const response = await request.post("/api/rezerwacja", {
    maxRedirects: 0,
    headers: { origin: new URL(baseURL!).origin, ...(process.env.VERCEL_AUTOMATION_BYPASS_SECRET ? { "x-vercel-protection-bypass": process.env.VERCEL_AUTOMATION_BYPASS_SECRET } : {}) },
    data: { website: "https://spam.invalid" },
  });
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual({ ok: true });
});
