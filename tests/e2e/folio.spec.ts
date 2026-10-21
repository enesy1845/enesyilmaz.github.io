import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const innerRoutes = [
  "work",
  "about",
  "notes",
  "atelier",
  "contact",
  "cv",
  "work/municipal-quality-system",
  "notes/the-ideal-human",
];

for (const width of [320, 1440]) {
  test(`equivalent headings keep their typography and intro layout across locales at ${width}px`, async ({
    page,
  }) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const route of [
      "work",
      "about",
      "notes",
      "atelier",
      "contact",
      "cv",
      "work/municipal-quality-system",
      "work/process-pdf-export",
    ]) {
      const styles = [];
      for (const locale of ["en", "no", "tr"]) {
        await page.goto(`/${locale}/${route}`);
        await page.evaluate(() => document.fonts.ready);
        styles.push(
          await page.evaluate(() => ({
            headings: [...document.querySelectorAll("h1, h2")].map(
              (heading) => {
                const style = getComputedStyle(heading);
                return {
                  level: heading.tagName,
                  family: style.fontFamily,
                  size: style.fontSize,
                  weight: style.fontWeight,
                  lineHeight: style.lineHeight,
                  spacing: style.letterSpacing,
                };
              },
            ),
            // Every route in this comparison renders PageIntro's grid.
            columns: getComputedStyle(
              document.querySelector(".page-intro__grid")!,
            ).gridTemplateColumns,
            overflow: document.documentElement.scrollWidth > innerWidth,
          })),
        );
      }
      expect(styles[1], `${route}: Norwegian matches English`).toEqual(
        styles[0],
      );
      expect(styles[2], `${route}: Turkish matches English`).toEqual(styles[0]);
      expect(styles[0]?.overflow, `${route}: no horizontal overflow`).toBe(
        false,
      );
    }
  });
}

test("switching the CV language preserves heading size and layout", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/cv");
  const heading = page.getByRole("heading", { level: 1 });
  const size = await heading.evaluate(
    (element) => getComputedStyle(element).fontSize,
  );
  await page
    .getByRole("banner")
    .getByRole("button", { name: /Choose language/ })
    .first()
    .click();
  await page.getByRole("link", { name: "Norsk", exact: true }).first().click();
  await expect(page).toHaveURL(/\/no\/cv$/);
  await expect(heading).toHaveCSS("font-size", size);
  await expect(page.locator(".page-intro")).toHaveClass(
    "page-intro page-intro--document",
  );
});

test("every inner route shares the glass island and restores its identity at the top", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of innerRoutes) {
    await page.goto(`/en/${route}`);
    await expect(page.locator("html")).toHaveAttribute(
      "data-header-tone-ready",
      "",
    );
    await expect(page.locator("[data-header-identity]")).toBeVisible();
    await page.evaluate(() =>
      window.scrollTo({ top: 350, behavior: "instant" }),
    );
    await expect(page.locator("html")).toHaveAttribute(
      "data-header-hidden",
      "",
    );
    await expect(page.locator("[data-header-identity]")).toBeHidden();
    await expect(page.locator(".site-header__island")).toHaveCSS(
      "backdrop-filter",
      "blur(20px)",
    );
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect(page.locator("html")).not.toHaveAttribute(
      "data-header-hidden",
    );
    await expect(page.locator("[data-header-identity]")).toBeVisible();
    expect(
      await page
        .locator("h1")
        .evaluate((element) => parseFloat(getComputedStyle(element).fontSize)),
    ).toBeGreaterThanOrEqual(48);
  }
});

test("inner route island survives a deep reload and mobile navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/tr/about");
  await page.evaluate(() => window.scrollTo({ top: 450, behavior: "instant" }));
  await expect(page.locator("html")).toHaveAttribute("data-header-hidden", "");
  await page.reload();
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(100);
  await expect(page.locator("[data-header-identity]")).toBeHidden();
  await page.locator(".menu-toggle").click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "İşler", exact: true })
    .click();
  await expect(page).toHaveURL(/\/tr\/work$/);
  await expect(page.locator("[data-header-identity]")).toBeVisible();
});

test("work archive filters independently and works without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/en/work");
  const archive = page.locator(".project-archive");
  const count = await archive.locator(".archive-row:visible").count();
  await archive
    .locator(".project-filter__option")
    .filter({ hasText: "Data" })
    .click();
  await expect(archive.locator(".archive-row:visible")).toHaveCount(1);
  expect(count).toBeGreaterThan(1);
  await expect(page.locator(".work-index__link:visible")).toHaveCount(5);
  await archive.getByRole("link", { name: "PDF Export", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/work\/process-pdf-export$/);
  await context.close();
});

test("case-study contents point to real sections and project navigation preserves locale", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/no/work/municipal-quality-system");
  const contents = page.getByRole("navigation", {
    name: "På denne siden",
    exact: true,
  });
  await contents.getByRole("link", { name: "Ansvar", exact: true }).click();
  await expect(page).toHaveURL(/#responsibilities$/);
  await expect(
    page.locator("#responsibilities").getByRole("heading", { name: "Ansvar" }),
  ).toBeVisible();
  const next = page
    .getByRole("navigation", { name: "Utforsk mer arbeid" })
    .getByRole("link")
    .first();
  const href = await next.getAttribute("href");
  expect(href).toMatch(/^\/no\/work\/[^/]+$/);
  expect(href).not.toBe("/no/work/municipal-quality-system");
  await next.click();
  await expect.poll(() => new URL(page.url()).pathname).toBe(href);
});

test("folio pages remain readable at 320px in every interface locale", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const locale of ["en", "no", "tr"]) {
    for (const route of ["work", "about", "notes", "atelier", "contact"]) {
      await page.goto(`/${locale}/${route}`);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await expect(page.locator("h1")).toHaveCount(1);
    }
  }
});

test("folio pages have no obvious accessibility violations", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of [
    "work",
    "about",
    "notes",
    "atelier",
    "contact",
    "work/municipal-quality-system",
    "notes/the-ideal-human",
  ]) {
    await page.goto(`/en/${route}`);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  }
});
