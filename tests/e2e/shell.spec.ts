import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("root redirects to English", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
});

for (const locale of ["en", "no", "tr"] as const) {
  test(`${locale} home loads with one h1 and a translated title`, async ({
    page,
  }) => {
    await page.goto(`/${locale}`);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page).toHaveTitle(/Enes Yilmaz|Programvareutvikler|Yazılım/);
  });
}

test("language switching uses equivalent locale route", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("link", { name: "Norsk" }).click();
  await expect(page).toHaveURL(/\/no$/);
});

test("navigation preserves active locale", async ({ page }) => {
  await page.goto("/tr");
  await page.getByRole("link", { name: "İşler" }).click();
  await expect(page).toHaveURL(/\/tr\/work$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("İşler");
});

test("invalid locale returns not found", async ({ page }) => {
  const response = await page.goto("/de");
  expect(response?.status()).toBe(404);
});

test("main navigation is keyboard reachable", async ({ page }) => {
  await page.goto("/en");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Enes Yilmaz" })).toBeFocused();
});

test("mobile viewport has no obvious horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(overflow).toBe(false);
});

test("home shell has no obvious accessibility violations", async ({ page }) => {
  await page.goto("/en");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
