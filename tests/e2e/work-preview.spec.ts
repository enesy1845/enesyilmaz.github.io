import { expect, test } from "@playwright/test";

test("stationary project previews support pointer, keyboard and filters without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  try {
    await page.goto("/en/work");
    const previews = page.locator(".work-preview:visible");
    await expect(previews).toHaveCount(1);
    await expect(previews).toHaveAttribute(
      "data-preview",
      "municipal-quality-system",
    );
    const links = page.locator(".work-index__link");
    await links.nth(1).hover();
    await expect(previews).toHaveAttribute(
      "data-preview",
      "snap360-photography",
    );
    const bounds = await previews.boundingBox();
    await links.first().focus();
    await expect(previews).toHaveAttribute(
      "data-preview",
      "municipal-quality-system",
    );
    const focusedBounds = await previews.boundingBox();
    expect(focusedBounds?.x).toBe(bounds?.x);
    expect(focusedBounds?.y).toBe(bounds?.y);
    expect(focusedBounds?.width).toBe(bounds?.width);
    await page
      .locator('.project-filter__option:has(input[value="web"])')
      .first()
      .click();
    await page.mouse.move(0, 0);
    await expect(page.locator(".work-index__link:visible")).toHaveCount(4);
    await expect(previews).toHaveCount(1);
    await expect(previews).toHaveAttribute(
      "data-preview",
      "snap360-photography",
    );
    await page.locator(".work-index__link:visible").last().focus();
    await expect(previews).toHaveAttribute(
      "data-preview",
      "ilc-language-centre",
    );
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/en\/work\/ilc-language-centre$/);
  } finally {
    await context.close();
  }
});

test("compact work links and discipline composition remain usable on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const locale of ["en", "no", "tr"]) {
    await page.goto(`/${locale}`);
    await expect(page.locator(".work-index__link")).toHaveCount(5);
    await expect(page.locator(".work-preview:visible")).toHaveCount(0);
    await expect(page.locator(".discipline")).toHaveCount(3);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.locator(".discipline--atelier").click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/atelier$`));
  }
});
