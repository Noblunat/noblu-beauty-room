import { test, expect, rejectOptional } from "./fixtures";

test("cookie preferences contain keyboard focus and Escape discards unsaved edits", async ({ page }, testInfo) => {
  await page.goto("/");
  await rejectOptional(page);
  const saved = await page.evaluate(() => localStorage.getItem("noblu-cookie-consent"));
  const opener = page.locator("footer").getByRole("button", { name: "Ustawienia cookies", exact: true });
  await opener.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Preferencje plików cookie", exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { name: "Preferencje plików cookie", exact: true })).toBeFocused();
  const focusIsInside = () => dialog.evaluate(element => element.contains(document.activeElement));
  for (let step = 0; step < 12; step++) {
    await page.keyboard.press("Tab");
    expect(await focusIsInside()).toBe(true);
  }
  for (let step = 0; step < 12; step++) {
    await page.keyboard.press("Shift+Tab");
    expect(await focusIsInside()).toBe(true);
  }
  await dialog.getByRole("checkbox").nth(1).check();
  await dialog.getByRole("heading", { name: "Preferencje plików cookie", exact: true }).scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath("cookie-preferences.png") });
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
  expect(await page.evaluate(() => localStorage.getItem("noblu-cookie-consent"))).toBe(saved);
  await opener.click();
  await expect(dialog.getByRole("checkbox").nth(1)).not.toBeChecked();
  await dialog.getByRole("button", { name: "Zamknij ustawienia cookies", exact: true }).click();
  await expect(opener).toBeFocused();
  await opener.press("Enter");
  await dialog.getByRole("checkbox").nth(1).check();
  await dialog.getByRole("button", { name: "Zapisz wybór", exact: true }).click();
  await expect(opener).toBeFocused();
  await opener.press("Enter");
  await expect(dialog.getByRole("checkbox").nth(1)).toBeChecked();
  await page.keyboard.press("Escape");
});

test("closing first-visit preferences returns to the banner without granting consent", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Ustawienia", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "Preferencje plików cookie", exact: true });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Ustawienia", exact: true })).toBeFocused();
  await expect(page.getByRole("button", { name: "Odrzucam opcjonalne", exact: true })).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem("noblu-cookie-consent"))).toBeNull();
});

test("price groups expose named lists with service, duration and price in each row", async ({ page }) => {
  await page.goto("/cennik");
  await rejectOptional(page);
  for (const title of ["Stylizacja rzęs", "Stylizacja paznokci", "Pedicure", "Dodatki do usług"]) {
    const list = page.getByRole("list", { name: title, exact: true });
    await expect(list).toBeVisible();
    const rows = list.getByRole("listitem");
    expect(await rows.count()).toBeGreaterThan(0);
    for (const row of await rows.all()) {
      await expect(row).toContainText("Czas:");
      await expect(row).toContainText(/\d+ zł/);
    }
  }
});

test("Instagram has one profile action and homepage does not repeat district and acquisition copy", async ({ page }) => {
  await page.goto("/");
  await rejectOptional(page);
  const instagram = page.locator("#instagram");
  await expect(instagram.getByRole("link")).toHaveCount(1);
  await expect(instagram.getByRole("img")).toHaveCount(8);
  const main = await page.locator("main").innerText();
  expect((main.match(/Ruczaj/gi) || []).length).toBe(1);
  expect((main.match(/przyjmujemy nowe klientki/gi) || []).length).toBe(1);
  expect(main).not.toContain("Jeśli szukasz miejsca na");
});
