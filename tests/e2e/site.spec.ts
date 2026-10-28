import { test, expect, rejectOptional } from "./fixtures";

const pages = ["/", "/manicure-krakow", "/pedicure-krakow", "/stylizacja-rzes-krakow", "/przedluzanie-rzes-krakow", "/cennik", "/rezerwacja", "/polityka-prywatnosci"];

// Independent, owner-approved baseline: do not import production business data,
// otherwise a wrong shared value could make both implementation and test agree.
for (const path of pages) {
  test(`${path}: current business facts, contact links and cookie preferences`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await rejectOptional(page);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('meta[name="noblu-release"]')).toHaveAttribute("content", /.+/);
    if (process.env.EXPECTED_RELEASE) {
      await expect(page.locator('meta[name="noblu-release"]')).toHaveAttribute("content", process.env.EXPECTED_RELEASE);
    }
    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(value => JSON.parse(value));
    const salon = schemas.find(schema => [schema["@type"]].flat().includes("BeautySalon"));
    expect(salon).toMatchObject({
      email: "salon@noblu.pl",
      telephone: "+48662989534",
      address: { streetAddress: "Orzechowa 4/lok.1", postalCode: "30-422", addressLocality: "Kraków" },
      openingHoursSpecification: [{ dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "19:00" }],
    });
    expect(salon.aggregateRating).toBeUndefined();
    expect(salon.sameAs).toContain("https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow");
    const footer = page.locator("footer");
    await expect(footer).toHaveCount(1);
    await expect(footer).toContainText("Orzechowa 4/lok.1");
    await expect(footer).toContainText("30-422 Kraków");
    await expect(footer).toContainText("10:00-19:00");
    await expect(footer).toContainText("ponad 240 opinii");
    const visibleText = await page.locator("body").innerText();
    expect(visibleText).not.toMatch(/ul\.Orzechowej/);
    const closingTimes = visibleText.match(/\b19:[0-5][0-9]\b/g) || [];
    expect(closingTimes.length).toBeGreaterThan(0);
    expect([...new Set(closingTimes)]).toEqual(["19:00"]);
    const opinionThresholds = [...visibleText.matchAll(/ponad\s+(\d+)\s+(?:zweryfikowanych\s+)?opinii/gi)].map(match => match[1]);
    expect(opinionThresholds.length).toBeGreaterThan(0);
    expect([...new Set(opinionThresholds)]).toEqual(["240"]);
    await expect(footer.locator('a[href="tel:+48662989534"]')).toBeVisible();
    await expect(footer.locator('a[href="mailto:salon@noblu.pl"]')).toBeVisible();
    await expect(page.locator("body")).not.toContainText("19:30");
    await footer.getByRole("button", { name: "Ustawienia cookies", exact: true }).click();
    await expect(page.getByRole("region", { name: "Preferencje plików cookie" })).toBeVisible();
    await expect(page.getByRole("region", { name: "Preferencje plików cookie" })).toContainText("marketingu");
    if (path === "/rezerwacja") {
      await expect(page.locator("main")).not.toContainText("gmail.com");
      await expect(page.locator("main")).toContainText("Ponad 240 opinii");
      await expect(page.locator("main")).toContainText("10:00 - 19:00");
      await expect(page.locator("main").locator('a[href="mailto:salon@noblu.pl"]')).toBeVisible();
      const honeypot = page.locator('label[aria-hidden="true"] input');
      await expect(honeypot).toHaveAttribute("tabindex", "-1");
      await expect(honeypot).not.toBeInViewport();
      await expect(page.getByRole("combobox", { name: /^Usługa/ }).locator("option")).toContainText(["Wybierz usługę"]);
      for (const label of ["Manicure męski", "Manicure z laminacją paznokci", "Julia"]) {
        await expect(page.getByRole("combobox", { name: /^Usługa/ })).toContainText(label);
      }
    }
  });
}

test("gallery supports keyboard opening, navigation, closing and focus return", async ({ page }) => {
  await page.goto("/");
  await rejectOptional(page);
  await page.getByRole("button", { name: "Zatrzymaj automatyczną zmianę zdjęć" }).click();
  const opener = page.getByRole("button", { name: "Otwórz realizację: Błękitne paznokcie z jasnym zdobieniem na dwóch palcach", exact: true });
  await opener.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Powiększenie realizacji Noblu" });
  await expect(dialog).toBeVisible();
  const counter = dialog.locator('[aria-live="polite"]');
  const before = await counter.innerText();
  await page.keyboard.press("ArrowRight");
  await expect(counter).not.toHaveText(before);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
});
