import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("expertise details work without JavaScript and preserve case-study navigation", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("/en");
  await expect(page.locator(".copy-email button")).toBeHidden();
  await page
    .locator(".project-filter__option")
    .filter({ hasText: "Web" })
    .click();
  await expect(page.locator(".work-index__link:visible")).toHaveCount(4);
  await page
    .locator(".project-filter__option")
    .filter({ hasText: "All projects" })
    .click();
  await expect(page.locator(".work-index__link:visible")).toHaveCount(5);
  const detail = page.locator(".expertise-item").first();
  await expect(detail).not.toHaveAttribute("open");
  await detail.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(detail).toHaveAttribute("open");
  await expect(detail.locator("p")).toContainText("Python");
  await page.keyboard.press("Space");
  await expect(detail).not.toHaveAttribute("open");
  await page.getByRole("link", { name: "Quality System", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/work\/municipal-quality-system$/);
  await context.close();
});

test("mobile home remains readable in all locales with touch disclosures", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const locale of ["en", "no", "tr"]) {
    await page.goto(`/${locale}`);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect(page.locator(".work-index__link")).toHaveCount(5);
    const details = page.locator(".expertise-item").first();
    await details.locator("summary").click();
    await expect(details.locator("p")).toBeVisible();
    await expect(page.locator(".discipline")).toHaveCount(3);
    await page.locator(".home-contact").scrollIntoViewIfNeeded();
    await expect(
      page.getByRole("banner").locator("[data-header-identity]"),
    ).toBeHidden();
    await expect(page.locator(".menu-toggle")).toBeVisible();
  }
});

test("desktop header restores its glass island and hides the identity after the image", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  const header = page.getByRole("banner");
  await expect(header.getByRole("link", { name: /Enes/ })).toBeVisible();
  await expect(
    header.getByRole("button", { name: /Choose language/ }),
  ).toBeVisible();
  await expect(
    header.getByRole("link", { name: "Home", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await expect(header).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(header.locator(".site-header__island")).toHaveCSS(
    "background-color",
    "rgba(0, 0, 0, 0)",
  );
  await page.locator(".home-disciplines").evaluate((element) =>
    window.scrollTo({
      top: element.getBoundingClientRect().top + scrollY,
      behavior: "instant",
    }),
  );
  await expect(page.locator("html")).toHaveAttribute("data-header-inverse", "");
  await expect(page.locator("html")).toHaveAttribute("data-header-hidden", "");
  await expect(header.locator("[data-header-identity]")).toBeHidden();
  await expect(
    header.getByRole("button", { name: /Choose language/ }),
  ).toBeHidden();
  await expect(header.locator(".site-header__island")).toHaveCSS(
    "backdrop-filter",
    "blur(20px)",
  );
  await expect(header.locator(".site-header__island")).not.toHaveCSS(
    "background-color",
    "rgba(0, 0, 0, 0)",
  );
  const results = await new AxeBuilder({ page }).include("header").analyze();
  expect(results.violations).toEqual([]);
  await header.getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/work$/);
  await expect(page.locator("html")).not.toHaveAttribute("data-header-inverse");
  await expect(page.locator("html")).not.toHaveAttribute("data-header-hidden");
  await expect(header.locator("[data-header-identity]")).toBeVisible();
});

test("glass island gives way to the full header on return to the top", async ({
  page,
}) => {
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute(
    "data-hero-intro",
    "done",
    { timeout: 8000 },
  );
  await page.locator(".home-work").scrollIntoViewIfNeeded();
  await expect(page.locator("html")).toHaveAttribute("data-header-hidden", "");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(page.locator("html")).not.toHaveAttribute("data-header-hidden");
  await expect(page.locator("[data-header-identity]")).toHaveCSS(
    "opacity",
    "1",
  );
  await expect(page.locator(".site-header__island")).toHaveCSS(
    "backdrop-filter",
    "none",
  );
});

test("mobile glass menu remains operable after the logo disappears", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  await page.locator(".home-contact").scrollIntoViewIfNeeded();
  await expect(page.locator("[data-header-identity]")).toBeHidden();
  await page.locator(".menu-toggle").click();
  const menu = page.getByRole("dialog");
  await expect(menu).toBeVisible();
  await menu.getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/work$/);
  await expect(page.locator("html")).not.toHaveAttribute("data-header-hidden");
});

test("project filters support native keyboard navigation", async ({ page }) => {
  await page.goto("/en");
  const all = page.getByRole("radio", { name: "All projects 5", exact: true });
  await all.focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("radio", { name: "Software 1", exact: true }),
  ).toBeChecked();
  await expect(page.locator(".work-index__link:visible")).toHaveCount(1);
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("radio", { name: "Web 4", exact: true }),
  ).toBeChecked();
  await expect(page.locator(".work-index__link:visible")).toHaveCount(4);
});

test("email copy reports success and writes only the public email", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/en");
  await page.getByRole("button", { name: "Copy email", exact: true }).click();
  await expect(page.locator(".copy-email").getByRole("status")).toHaveText(
    "Email copied",
  );
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "enes.yilmaz1845@gmail.com",
  );
});

test("email copy failure leaves the mail link usable", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: () => Promise.reject(new Error("Clipboard unavailable")),
      },
    });
  });
  await page.goto("/tr");
  await page
    .getByRole("button", { name: "E-postayı kopyala", exact: true })
    .click();
  await expect(page.locator(".copy-email").getByRole("status")).toHaveText(
    "Kopyalanamadı. E-posta bağlantısını kullanabilirsin.",
  );
  await expect(page.locator(".mail-link")).toHaveAttribute(
    "href",
    "mailto:enes.yilmaz1845@gmail.com",
  );
});
