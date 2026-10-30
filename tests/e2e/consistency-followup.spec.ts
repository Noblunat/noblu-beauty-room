import { test, expect, rejectOptional } from "./fixtures";

test("both lash pages expose the same method details and exact selection links", async ({ page }, testInfo) => {
  for (const [index, route] of ["/stylizacja-rzes-krakow", "/przedluzanie-rzes-krakow"].entries()) {
    await page.goto(route);
    if (index === 0) await rejectOptional(page);
    const methods = page.locator('section[aria-labelledby="lash-methods-title"]');
    await expect(methods.getByRole("article")).toHaveCount(3);
    for (const [name, id, price, duration] of [
      ["Rzęsy 1:1", "rzesy-1-1-aplikacja", "190 zł", "2h 30min"],
      ["Rzęsy 2D", "rzesy-2d-aplikacja", "210 zł", "3h"],
      ["Rzęsy 3D", "rzesy-3d-aplikacja", "220 zł", "3h"],
    ]) {
      const card = methods.getByRole("article").filter({ has: page.getByRole("heading", { name, exact: true }) });
      await expect(card).toContainText(price);
      await expect(card).toContainText(duration);
      await expect(card.getByRole("link")).toHaveAttribute("href", `/rezerwacja?usluga=${id}`);
    }
    await methods.getByRole("article").first().scrollIntoViewIfNeeded();
    await page.screenshot({ path: testInfo.outputPath(`lash-methods-${route.slice(1)}.png`) });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const visibleCopy = await page.locator("main").innerText();
    expect((visibleCopy.match(/Ruczaj\w*/gi) || []).length).toBeLessThanOrEqual(1);
    await expect(page.getByRole("heading", { name: "Przygotowanie narzędzi", exact: true })).toHaveCount(1);
  }
});

test("privacy mailbox keeps its separating space and a valid mailto action", async ({
  page,
}) => {
  await page.goto("/polityka-prywatnosci");
  await rejectOptional(page);
  const main = page.locator("main");
  await expect(main).toContainText("Resend do skrzynki salon@noblu.pl");
  await expect(main).not.toContainText("skrzynkisalon");
  await expect(
    main.locator('a[href="mailto:salon@noblu.pl"]').first(),
  ).toBeVisible();
});

test("a catalog row selects its exact employee variant before mocked submission", async ({
  page,
}) => {
  await page.route("**/api/rezerwacja", async (route) => {
    expect(route.request().postDataJSON()).toMatchObject({
      serviceId: "hybryda-julia",
      name: "TEST E2E - NIE WYSYLAC",
    });
    await route.fulfill({ json: { ok: true } });
  });
  await page.goto("/cennik");
  await rejectOptional(page);
  const row = page
    .getByRole("listitem")
    .filter({
      has: page.locator('a[href="/rezerwacja?usluga=hybryda-julia"]'),
    });
  await expect(row).toContainText("Julia");
  await row.getByRole("link").click();
  await expect(page.getByRole("combobox", { name: /^Usługa/ })).toHaveValue(
    "hybryda-julia",
  );
  await page.getByLabel("Imię", { exact: true }).fill("TEST E2E - NIE WYSYLAC");
  await page.getByLabel("Telefon", { exact: true }).fill("+48662989534");
  await page
    .getByLabel("Preferowany dzień", { exact: true })
    .fill("2099-01-15");
  await page
    .getByRole("button", { name: "Wyślij prośbę o termin", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText("Dziękujemy");
});
