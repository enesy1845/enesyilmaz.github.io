import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const locale of ["en", "no", "tr"]) {
  test(`CV downloads the English PDF from the ${locale} page`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/cv`);
    const link = page.locator("a[download]");
    const fileName = "Enes-Yilmaz-CV-EN.pdf";
    await expect(link).toHaveAttribute("download", fileName);
    const response = await page.request.get(`/documents/${fileName}`);
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("application/pdf");
    expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
    const download = page.waitForEvent("download");
    await link.click();
    expect((await download).suggestedFilename()).toBe(fileName);
  });
}

for (const width of [320, 1440]) {
  test(`NOI and About remain readable without JavaScript at ${width}px`, async ({
    browser,
  }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      reducedMotion: "reduce",
      viewport: { width, height: 900 },
    });
    const page = await context.newPage();
    for (const locale of ["en", "no", "tr"]) {
      await page.goto(`/${locale}`);
      const section = page.locator("#what-is-noi");
      await expect(section.getByRole("heading", { level: 2 })).toHaveCount(1);
      await expect(
        // Turkish has no reading of its own and opens on English.
        section.getByRole("radio", {
          name: locale === "tr" ? "EN" : locale.toUpperCase(),
        }),
      ).toBeChecked();
      await section.getByText("EN", { exact: true }).click();
      const radio = section.getByRole("radio", { name: "EN" });
      await radio.focus();
      await page.keyboard.press("ArrowRight");
      await expect(section.getByRole("radio", { name: "NO" })).toBeChecked();
      await expect(
        section.getByText("Nysgjerrighet", { exact: true }),
      ).toBeVisible();
      await expect(section.getByText("Notice", { exact: true })).toBeHidden();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);

      await page.goto(`/${locale}/about`);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator(".about-chapter h2")).toHaveCount(5);
      expect(
        await page.evaluate(() => {
          const chapter = document.querySelector(".about-chapter");
          const heading = chapter?.querySelector("h2");
          const lead = chapter?.querySelector(".about-chapter__lead");
          return (
            heading &&
            lead &&
            parseFloat(getComputedStyle(heading).fontSize) >
              parseFloat(getComputedStyle(lead).fontSize)
          );
        }),
      ).toBe(true);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
    await context.close();
  });
}

test("NOI and About headings and controls pass automated accessibility checks", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  expect(
    (await new AxeBuilder({ page }).include("#what-is-noi").analyze())
      .violations,
  ).toEqual([]);
  await page.goto("/en/about");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
