import { test, expect, rejectOptional } from "./fixtures";

test("first screen compares the two hybrid manicure variants without invented discounts", async ({ page }, testInfo) => {
  await page.goto("/");
  await rejectOptional(page);
  await expect(page.locator(".noblu-brand-intro")).toBeHidden();
  const hero = page.locator("#home-hero");
  for (const [id, name, price, duration] of [
    ["hybryda-natalia", "Natalia", "160 zł", "90 minut"],
    ["hybryda-julia", "Julia", "130 zł", "120 minut"],
  ]) {
    const offer = hero.getByRole("article", { name: new RegExp(name) });
    await expect(offer).toContainText(price);
    await expect(offer).toContainText(duration);
    const priceBox = await offer.getByText(price, { exact: false }).first().boundingBox();
    expect(priceBox).not.toBeNull();
    expect(priceBox!.y + priceBox!.height).toBeLessThan(page.viewportSize()!.height);
    await expect(offer).toContainText("Jeden kolor");
    await expect(offer.getByRole("link", { name: "Poproś o termin bez konta", exact: true }))
      .toHaveAttribute("href", `/rezerwacja?usluga=${id}#formularz`);
    await expect(offer.getByRole("link", { name: "Wybierz termin w Booksy", exact: true }))
      .toHaveAttribute("href", "https://noblubeautyroom.booksy.com/h");
  }
  await expect(hero).toContainText("stylistka junior");
  await expect(hero).toContainText("Dłuższy czas pracy");
  await expect(hero).toContainText("Darmowy parking");
  await expect(hero).toContainText("Orzechowa 4/lok.1");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath("first-visit-home.png"), fullPage: false });
});

test("staff-specific inquiry shows the selected price and duration next to the fields", async ({ page }, testInfo) => {
  await page.goto("/rezerwacja?usluga=hybryda-julia#formularz");
  await rejectOptional(page);
  const form = page.locator("#formularz");
  await expect(form.getByRole("combobox", { name: /^Usługa/ })).toHaveValue("hybryda-julia");
  const summary = form.getByRole("status", { name: "Podsumowanie wyboru" });
  await expect(summary).toContainText("Julia");
  await expect(summary).toContainText("130 zł");
  await expect(summary).toContainText("120 minut");
  await expect(form).toContainText("To zapytanie, nie potwierdzona rezerwacja");
  await form.getByRole("combobox", { name: /^Usługa/ }).selectOption("hybryda-natalia");
  await expect(summary).toContainText("160 zł");
  await expect(summary).toContainText("90 minut");
  await expect(form).toContainText("SMS-em lub telefonicznie");
  const rect = await form.boundingBox();
  expect(rect).not.toBeNull();
  expect(rect!.y).toBeLessThan(page.viewportSize()!.height);
  await page.screenshot({ path: testInfo.outputPath("first-visit-form.png"), fullPage: false });
});

test("first-visit price rules preserve the existing paid French add-on", async ({ page }) => {
  await page.goto("/");
  await rejectOptional(page);
  const rules = page.getByRole("region", { name: "Pierwszy raz w Noblu?", exact: true });
  await expect(rules).toContainText("opracowanie skórek i paznokci");
  await rules.getByText("Zakres i dopłaty przed wizytą", { exact: true }).click();
  await expect(rules).toContainText("French/Ombre/Babyboomer");
  await expect(rules).toContainText("20 zł");
  await expect(rules).toContainText("20 minut");
  await expect(rules).toContainText("0 zł");
  await expect(rules).toContainText("nie jest samodzielną bezpłatną usługą");
});
