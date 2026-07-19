import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("root redirects to English", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
});

for (const locale of ["en", "no", "tr"] as const) {
  test(`${locale} home renders exactly one h1`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await expect(page.locator("h1")).toHaveCount(1);
  });
}

test("English home renders shared header and footer", async ({ page }) => {
  await page.goto("/en");

  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
  await expect(
    page.getByRole("banner").getByRole("link", { name: /Enes Yilmaz/ }),
  ).toHaveAttribute("href", "/en");
});

test("Norwegian route renders translated navigation", async ({ page }) => {
  await page.goto("/no");

  await expect(
    page.getByRole("link", { name: "Arbeid" }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Kontakt" }).first(),
  ).toBeVisible();
});

test("Turkish route renders translated navigation", async ({ page }) => {
  await page.goto("/tr");

  await expect(page.getByRole("link", { name: "İşler" }).first()).toBeVisible();
  await expect(
    page.getByRole("link", { name: "İletişim" }).first(),
  ).toBeVisible();
});

test("navigation to Work preserves locale and exposes active state", async ({
  page,
}) => {
  await page.goto("/tr");
  await page.getByRole("link", { name: "İşler" }).first().click();

  await expect(page).toHaveURL(/\/tr\/work$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("İşler");
  await expect(
    page.getByRole("link", { name: "İşler" }).first(),
  ).toHaveAttribute("aria-current", "page");
});

test("language switching preserves equivalent route", async ({ page }) => {
  await page.goto("/en/work");
  await page.getByRole("link", { name: "Türkçe" }).first().click();

  await expect(page).toHaveURL(/\/tr\/work$/);
});

test("skip link moves focus to main content", async ({ page }) => {
  await page.goto("/en");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");

  await expect(page.locator("#main-content")).toBeFocused();
});

test("desktop navigation is keyboard usable", async ({ page }) => {
  await page.goto("/en");

  const homeLink = page.getByRole("link", { name: "Home" }).first();

  for (let index = 0; index < 10; index += 1) {
    await page.keyboard.press("Tab");
    if (
      await homeLink.evaluate((element) => element === document.activeElement)
    ) {
      break;
    }
  }

  await expect(homeLink).toBeFocused();
});

test("mobile navigation opens and closes with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/en");

  const openButton = page.getByRole("button", { name: "Open menu" });
  await openButton.click();
  await expect(openButton).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("dialog", { name: "Mobile navigation" }),
  ).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(openButton).toHaveAttribute("aria-expanded", "false");
});

test("mobile navigation link changes route and closes menu", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/en");

  const openButton = page.getByRole("button", { name: "Open menu" });
  await openButton.click();
  await page
    .getByRole("dialog", { name: "Mobile navigation" })
    .getByRole("link", { name: "Work" })
    .click();

  await expect(page).toHaveURL(/\/en\/work$/);
  await expect(openButton).toHaveAttribute("aria-expanded", "false");
});

for (const width of [320, 375] as const) {
  test(`no obvious horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 812 });
    await page.goto("/tr/contact");

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflow).toBe(false);
  });
}

test("footer links are reachable by keyboard", async ({ page }) => {
  await page.goto("/en");

  for (let index = 0; index < 30; index += 1) {
    await page.keyboard.press("Tab");
    const focusedText = await page.evaluate(() =>
      document.activeElement?.textContent?.trim(),
    );
    if (focusedText === "LinkedIn") {
      break;
    }
  }

  await expect(page.getByRole("link", { name: "LinkedIn" })).toBeFocused();
});

test("home and internal page have no obvious accessibility violations", async ({
  page,
}) => {
  for (const path of ["/en", "/en/work"]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  }
});
