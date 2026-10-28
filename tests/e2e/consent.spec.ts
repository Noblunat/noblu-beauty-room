import { test, expect, rejectOptional, isGoogle, isMeta, isAds } from "./fixtures";

test("rejecting optional consent sends no Google or Meta requests, including after navigation", async ({ page, externalRequests }) => {
  await page.goto("/");
  await rejectOptional(page);
  await page.goto("/rezerwacja");
  await page.locator("footer").getByRole("button", { name: "Ustawienia cookies" }).click();
  const preferences = page.getByRole("region", { name: "Preferencje plików cookie" });
  const choices = preferences.getByRole("checkbox");
  await expect(choices).toHaveCount(4);
  for (const index of [1, 2, 3]) await expect(choices.nth(index)).not.toBeChecked();
  await page.waitForTimeout(500); // Negative network observation window after hydration/navigation.
  expect(externalRequests.filter(href => isGoogle(new URL(href)) || isMeta(new URL(href)))).toEqual([]);
});

test("accepting consent loads Google, configures Ads and restores saved choices, never Meta", async ({ page, externalRequests }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Akceptuję wszystkie", exact: true }).click();
  await expect.poll(() => externalRequests.some(href => new URL(href).hostname === "www.googletagmanager.com")).toBe(true);
  const commands = await page.evaluate(() => window.dataLayer?.map(args => Array.from(args as ArrayLike<unknown>)) || []);
  expect(commands).toContainEqual(expect.arrayContaining(["config", "AW-10795260361"]));
  await page.locator("footer").getByRole("button", { name: "Ustawienia cookies" }).click();
  const preferences = page.getByRole("region", { name: "Preferencje plików cookie" });
  for (const checkbox of await preferences.getByRole("checkbox").all()) await expect(checkbox).toBeChecked();
  await page.reload();
  await expect(page.getByRole("region", { name: "Preferencje plików cookie" })).toHaveCount(0);
  await page.locator("footer").getByRole("button", { name: "Ustawienia cookies" }).click();
  for (const checkbox of await page.getByRole("region", { name: "Preferencje plików cookie" }).getByRole("checkbox").all()) await expect(checkbox).toBeChecked();
  expect(externalRequests.filter(href => isMeta(new URL(href)))).toEqual([]);
});

test("real Google vendor code attempts Ads collection only after marketing consent", async ({ page, externalRequests }) => {
  test.skip(process.env.E2E_LIVE_TAGS !== "1", "Opt-in vendor integration; collection is intercepted, not transmitted.");
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Akceptuję wszystkie" })).toBeVisible();
  expect(externalRequests.filter(href => isGoogle(new URL(href)) || isMeta(new URL(href)))).toEqual([]);
  await page.getByRole("button", { name: "Akceptuję wszystkie", exact: true }).click();
  await expect.poll(() => externalRequests.some(href => {
    const url = new URL(href);
    return isAds(url) && !url.pathname.endsWith(".js");
  }), { timeout: 25_000 }).toBe(true);
  expect(externalRequests.filter(href => isMeta(new URL(href)))).toEqual([]);
});

test("marketing-only preferences survive reload without enabling analytics or maps", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Ustawienia", exact: true }).click();
  const preferences = page.getByRole("region", { name: "Preferencje plików cookie" });
  await preferences.getByRole("checkbox").nth(2).check();
  await preferences.getByRole("button", { name: "Zapisz wybór" }).click();
  await page.reload();
  await page.locator("footer").getByRole("button", { name: "Ustawienia cookies" }).click();
  const choices = page.getByRole("region", { name: "Preferencje plików cookie" }).getByRole("checkbox");
  await expect(choices.nth(1)).not.toBeChecked();
  await expect(choices.nth(2)).toBeChecked();
  await expect(choices.nth(3)).not.toBeChecked();
  const state = await page.evaluate(() => ({
    disabled: window["ga-disable-G-BD9VRN0W6Q"],
    configured: window.dataLayer?.map(args => Array.from(args as ArrayLike<unknown>)).filter(args => args[0] === "config").map(args => args[1]),
  }));
  expect(state.disabled).toBe(true);
  expect(state.configured).toContain("AW-10795260361");
  expect(state.configured).not.toContain("G-BD9VRN0W6Q");
  await expect(page.locator('iframe[src*="google"]')).toHaveCount(0);
});

test("revoking consent in one tab updates Google consent and preferences in another", async ({ page, context }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Akceptuję wszystkie", exact: true }).click();
  const other = await context.newPage();
  await other.goto("/rezerwacja");
  await page.locator("footer").getByRole("button", { name: "Ustawienia cookies" }).click();
  await rejectOptional(page);
  await expect.poll(() => other.evaluate(() => window["ga-disable-G-BD9VRN0W6Q"])).toBe(true);
  await other.locator("footer").getByRole("button", { name: "Ustawienia cookies" }).click();
  const choices = other.getByRole("region", { name: "Preferencje plików cookie" }).getByRole("checkbox");
  for (const index of [1, 2, 3]) await expect(choices.nth(index)).not.toBeChecked();
  await other.close();
});
