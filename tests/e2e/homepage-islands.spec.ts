import { test, expect, rejectOptional } from "./fixtures";

test("gallery rotation pauses explicitly and while keyboard focus is inside", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("/");
  await rejectOptional(page);
  const items = page.getByRole("button", { name: /^Otwórz realizację:/ });
  const initial = await items.first().getAttribute("aria-label");
  await page.clock.fastForward(16_000);
  await expect(items.first()).not.toHaveAttribute("aria-label", initial!);
  await page
    .getByRole("button", {
      name: "Zatrzymaj automatyczną zmianę zdjęć",
      exact: true,
    })
    .click();
  const paused = await items.first().getAttribute("aria-label");
  await page.clock.fastForward(32_000);
  await expect(items.first()).toHaveAttribute("aria-label", paused!);
  await page
    .getByRole("button", {
      name: "Wznów automatyczną zmianę zdjęć",
      exact: true,
    })
    .click();
  await items.first().focus();
  await items.first().press("ArrowRight");
  await expect(items.nth(1)).toBeFocused();
  await page.clock.fastForward(32_000);
  await expect(items.first()).toHaveAttribute("aria-label", paused!);
  await page.getByRole("heading", { level: 1 }).click();
  await page.clock.fastForward(16_000);
  await expect(items.first()).not.toHaveAttribute("aria-label", paused!);
});

test("floating booking stays behind gallery and consent dialogs", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name === "desktop",
    "Floating action is mobile-only.",
  );
  await page.goto("/");
  await rejectOptional(page);
  const galleryItem = page
    .getByRole("button", { name: /^Otwórz realizację:/ })
    .nth(1);
  await galleryItem.scrollIntoViewIfNeeded();
  const sticky = page.locator("[data-sticky-booking]");
  await expect(sticky).toBeVisible();
  await galleryItem.press("Enter");
  const gallery = page.getByRole("dialog", {
    name: "Powiększenie realizacji Noblu",
    exact: true,
  });
  await expect(gallery).toBeVisible();
  await expect(sticky).toBeHidden();
  await page.keyboard.press("Escape");
  await expect(gallery).toHaveCount(0);
  await expect(galleryItem).toBeFocused();
  await expect(sticky).toBeVisible();
  await page
    .locator("footer")
    .getByRole("button", { name: "Ustawienia cookies", exact: true })
    .click();
  await expect(
    page.getByRole("dialog", {
      name: "Preferencje plików cookie",
      exact: true,
    }),
  ).toBeVisible();
  await expect(sticky).toBeHidden();
  await page.keyboard.press("Escape");
  await expect(sticky).toBeVisible();
  await page.evaluate(() => scrollTo(0, 0));
  await expect(sticky).toHaveCount(0);
});

test.describe("server-rendered homepage", () => {
  test.use({ javaScriptEnabled: false });
  test("core content and contact actions do not depend on hydration", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Manicure dopasowany do Ciebie",
    );
    await expect(
      page
        .locator("#services")
        .getByRole("heading", { name: "Nasze usługi", exact: true }),
    ).toBeVisible();
    await expect(page.locator("#cennik")).toContainText("zł");
    await expect(page.locator("#faq")).toContainText(
      "Jakie usługi oferuje salon?",
    );
    await expect(
      page
        .locator("#contact")
        .getByRole("link", { name: "salon@noblu.pl", exact: true }),
    ).toHaveAttribute("href", "mailto:salon@noblu.pl");
    await expect(
      page
        .locator("header")
        .getByRole("link", {
          name: "Zadzwoń do salonu: 662 989 534",
          exact: true,
        }),
    ).toHaveAttribute("href", "tel:+48662989534");
    await expect(page.locator("iframe")).toHaveCount(0);
  });
});
