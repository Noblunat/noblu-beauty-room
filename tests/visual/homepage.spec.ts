import { test, expect, rejectOptional } from "../e2e/fixtures";

// Opt-in local before/after comparison. Baseline PNGs stay in ignored output;
// the regular CI suite does not depend on machine-specific screenshots.
test("homepage preserves section appearance", async ({ page }, testInfo) => {
  await page.goto("/");
  await rejectOptional(page);
  await page
    .getByRole("button", {
      name: "Zatrzymaj automatyczną zmianę zdjęć",
      exact: true,
    })
    .click();
  const sections = page.locator("main > section");
  expect(await sections.count()).toBe(13);
  for (let index = 0; index < (await sections.count()); index++) {
    const section = sections.nth(index);
    await section.scrollIntoViewIfNeeded();
    await section.locator("img").evaluateAll(async (images) => {
      await Promise.all(
        images.map((image) =>
          (image as HTMLImageElement).decode().catch(() => {}),
        ),
      );
    });
    await expect(section).toHaveScreenshot(`section-${index}.png`, {
      animations: "disabled",
      maxDiffPixels: 0,
    });
  }
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({
    path: testInfo.outputPath("homepage-first-screen.png"),
  });
});
