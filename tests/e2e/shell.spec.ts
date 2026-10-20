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

test("home page sections render in English", async ({ page }) => {
  await page.goto("/en");

  for (const heading of [
    "Selected work",
    "Professional evidence",
    "Code / Thought / Craft",
    "Notes preview",
    "Atelier preview",
    "About preview",
    "Contact",
  ]) {
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
  }

  await expect(
    page.getByRole("link", { name: "Quality System" }),
  ).toBeVisible();
});

test("home page sections render in Norwegian", async ({ page }) => {
  await page.goto("/no");

  await expect(
    page.getByRole("heading", { name: "Utvalgt arbeid" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Profesjonell dokumentasjon" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Kode / Tanke / Håndverk" }),
  ).toBeVisible();
});

test("home page sections render in Turkish", async ({ page }) => {
  await page.goto("/tr");

  await expect(
    page.getByRole("heading", { name: "Seçili işler" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Profesyonel dayanak" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Kod / Düşünce / Zanaat" }),
  ).toBeVisible();
});

test("English home renders shared header and footer", async ({ page }) => {
  await page.goto("http://127.0.0.1:3100/en");

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

test("Work navigation works and preserves locale", async ({ page }) => {
  await page.goto("/tr");
  await page.getByRole("link", { name: "İşler" }).first().click();

  await expect(page).toHaveURL(/\/tr\/work$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("İşler");
  await expect(
    page.getByRole("link", { name: "Kalite Sistemi" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "İşler" }).first(),
  ).toHaveAttribute("aria-current", "page");
});

test("Project links preserve locale", async ({ page }) => {
  await page.goto("/no/work");
  await page.getByRole("link", { name: "Kvalitetssystem" }).first().click();

  await expect(page).toHaveURL(/\/no\/work\/municipal-quality-system$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Kommunalt kvalitetssystem",
  );
});

test("language switching preserves equivalent project route", async ({
  page,
}) => {
  await page.goto("/en/work/municipal-quality-system");
  await page.getByRole("link", { name: "Türkçe" }).first().click();

  await expect(page).toHaveURL(/\/tr\/work\/municipal-quality-system$/);
});

test("About page loads", async ({ page }) => {
  await page.goto("/en/about");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("About");
  await expect(page.getByText("Current professional identity")).toBeVisible();
});

test("Contact page loads verified links", async ({ page }) => {
  await page.goto("/en/contact");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Contact");
  const main = page.getByRole("main");
  await expect(main.getByRole("link", { name: "Email" })).toHaveAttribute(
    "href",
    "mailto:enes.yilmaz1845@gmail.com",
  );
  await expect(main.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/enes-yilmaz-026249286",
  );
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

test("tested pages contain one h1", async ({ page }) => {
  for (const path of ["/en", "/en/work", "/en/about", "/en/contact"]) {
    await page.goto(path);
    await expect(page.locator("h1")).toHaveCount(1);
  }
});

test("main content remains usable without animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");

  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator("[data-sculpture-host]")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
  await expect(page.locator("html")).toHaveAttribute(
    "data-hero-motion",
    "reduced",
  );
  await expect(
    page.getByRole("banner").locator("[data-header-letter]").first(),
  ).toHaveCSS("opacity", "1");
  await expect(page.getByRole("main")).toContainText("Selected work");
});

test("home content remains usable when JavaScript is disabled", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  await page.goto("/en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Enes Yilmaz",
  );
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(
    page.getByRole("banner").locator("[data-header-letter]").first(),
  ).toHaveCSS("opacity", "1");
  await expect(
    page.getByRole("link", { name: "View selected work" }),
  ).toBeVisible();
  await expect(page.getByRole("main")).toContainText("Selected work");

  await context.close();
});

test("hero sculpture is lazy, decorative and limited to the home route", async ({
  page,
}) => {
  await page.goto("/en/work");
  await expect(page.locator("[data-sculpture-host]")).toHaveCount(0);

  await page.goto("/en");
  await expect(page.locator("[data-sculpture-host]")).toHaveAttribute(
    "data-sculpture-visible",
    "true",
  );
  await expect(page.locator("[data-sculpture-canvas]")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
});

test("one header logo moves from the hero and stays mounted on scroll", async ({
  page,
}) => {
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute(
    "data-hero-intro",
    "done",
    { timeout: 8_000 },
  );

  const headerLetter = page
    .getByRole("banner")
    .locator("[data-header-letter]")
    .first();
  const heroLetter = page.locator("[data-hero-letter]").first();

  await expect(page.locator("html")).toHaveAttribute(
    "data-hero-state",
    "hero-top",
  );
  await expect(headerLetter).toHaveCSS("opacity", "1");
  await expect(heroLetter).toHaveCSS("visibility", "hidden");
  const originalLogo = await headerLetter.elementHandle();
  const largeSize = await headerLetter.boundingBox();

  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.25));
  await expect(page.locator("html")).toHaveAttribute(
    "data-hero-state",
    "hero-passed",
  );
  await expect(headerLetter).toHaveCSS("opacity", "1");
  await expect(heroLetter).toHaveCSS("visibility", "hidden");
  await expect(page.locator("html")).toHaveAttribute(
    "data-hero-docked",
    "true",
  );

  expect(
    await headerLetter.evaluate(
      (element, original) => element === original,
      originalLogo,
    ),
  ).toBe(true);
  const matrix = await headerLetter.evaluate((element) => {
    const matrix = new DOMMatrix(getComputedStyle(element).transform);
    return { x: matrix.m41, y: matrix.m42, scale: matrix.m11 };
  });
  expect(matrix).toEqual({ x: 0, y: 0, scale: 1 });
  const dockedSize = await headerLetter.boundingBox();
  for (const offset of [1.8, 1.15, 2]) {
    await page.evaluate(
      (offset) =>
        window.scrollTo({
          top: window.innerHeight * offset,
          behavior: "instant",
        }),
      offset,
    );
    await expect(page.locator("html")).toHaveAttribute(
      "data-hero-docked",
      "true",
    );
    const size = await headerLetter.boundingBox();
    expect(size?.width).toBe(dockedSize?.width);
    expect(size?.height).toBe(dockedSize?.height);
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(page.locator("html")).toHaveAttribute(
    "data-hero-state",
    "hero-top",
  );
  await expect(headerLetter).toHaveCSS("opacity", "1");
  await expect
    .poll(async () => (await headerLetter.boundingBox())?.width)
    .toBeGreaterThan((dockedSize?.width ?? 0) * 2);
  expect(largeSize?.width).toBeGreaterThan((dockedSize?.width ?? 0) * 2);
});

test("docked logo stays visible while scrolling across the hero boundary", async ({
  page,
}) => {
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute(
    "data-hero-intro",
    "done",
    { timeout: 8_000 },
  );
  await page.evaluate(() =>
    window.scrollTo({ top: innerHeight * 1.3, behavior: "instant" }),
  );
  await expect(page.locator("html")).toHaveAttribute(
    "data-hero-docked",
    "true",
  );

  const frames = await page.evaluate(async () => {
    const hero = document.querySelector<HTMLElement>("[data-home-hero]");
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    const letter = document.querySelector("[data-header-letter]");
    if (!hero || !header || !letter) throw new Error("Missing logo geometry");
    const boundary = hero.offsetHeight - header.offsetHeight;
    const samples: { docked: boolean; opacity: string }[] = [];
    for (const offset of [2, -2, 3, -3, 1, -1, 4]) {
      window.scrollTo({ top: boundary + offset, behavior: "instant" });
      for (let frame = 0; frame < 3; frame += 1) {
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => resolve()),
        );
        samples.push({
          docked: document.documentElement.dataset.heroDocked === "true",
          opacity: getComputedStyle(letter).opacity,
        });
      }
    }
    return samples;
  });
  for (const frame of frames) {
    expect(frame.docked).toBe(true);
    expect(frame.opacity).toBe("1");
  }
});

test("hero preloader shows left-to-right entrance on each full load", async ({
  page,
}) => {
  await page.goto("/en");

  await expect(page.locator("html")).toHaveAttribute(
    "data-hero-intro",
    "done",
    { timeout: 8_000 },
  );
  await expect(page.getByRole("banner")).toBeInViewport();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute(
    "data-hero-intro",
    "loading",
  );
  await expect(page.locator(".hero__progress")).toBeVisible();
  expect(
    await page
      .locator(".site-wordmark__letter-inner")
      .first()
      .evaluate(
        (element) => new DOMMatrix(getComputedStyle(element).transform).m41,
      ),
  ).toBeLessThan(0);
  await expect(page.locator("html")).toHaveAttribute(
    "data-hero-intro",
    "done",
    { timeout: 8_000 },
  );
});

test("dot bounces only on opening then follows reversible logo docking", async ({
  page,
}) => {
  await page.goto("/en");
  const dot = page.locator("[data-site-header] [data-noi-dot]");
  await expect(dot).toHaveAttribute("transform", "translate(0.000 947.000)", {
    timeout: 8_000,
  });
  await page.evaluate(() =>
    window.scrollTo({ top: innerHeight * 1.5, behavior: "instant" }),
  );
  await expect(page.locator("html")).toHaveAttribute(
    "data-hero-docked",
    "true",
  );
  await expect(dot).toHaveAttribute("cy", "-56");
  await expect(dot).not.toHaveAttribute("transform", /./);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(dot).toHaveAttribute("transform", "translate(0.000 947.000)");
  const positions = await dot.evaluate(async (element) => {
    const positions = [];
    for (let frame = 0; frame < 15; frame += 1) {
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve()),
      );
      positions.push(element.getAttribute("transform"));
    }
    return positions;
  });
  expect(new Set(positions)).toEqual(new Set(["translate(0.000 947.000)"]));
  await page.locator("[data-noi-closing]").scrollIntoViewIfNeeded();
  await expect(
    page.locator("[data-noi-closing] [data-noi-dot]"),
  ).not.toHaveAttribute("transform", /./);
});

test("hero vector stays sharp after docking and returning", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1865, height: 780 });
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute(
    "data-hero-intro",
    "done",
    { timeout: 8_000 },
  );
  // Isolate the letter from the independently moving sculpture behind it.
  await page.addStyleTag({
    content: ".hero__backdrop { visibility: hidden; }",
  });
  const letter = page.locator("[data-header-letter]").first();
  const initialTransform = await letter.evaluate(
    (element) => element.style.transform,
  );
  const box = await letter.boundingBox();
  if (!box) throw new Error("Missing letter bounds");
  const cdp = await page.context().newCDPSession(page);
  const before = await cdp.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: false,
  });
  await page.evaluate(() =>
    window.scrollTo({ top: innerHeight * 1.5, behavior: "instant" }),
  );
  await expect(page.locator("html")).toHaveAttribute(
    "data-hero-docked",
    "true",
  );
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect
    .poll(() => letter.evaluate((element) => element.style.transform))
    .toBe(initialTransform);
  await expect(letter).toHaveCSS("will-change", "auto");
  await page.evaluate(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      ),
  );
  const after = await cdp.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: false,
  });
  await cdp.detach();
  const changed = await page.evaluate(
    async ({ before, after, box }) => {
      const read = async (data: string) => {
        const image = new Image();
        image.src = `data:image/png;base64,${data}`;
        await image.decode();
        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const context = canvas.getContext("2d");
        if (!context)
          throw new Error("Canvas unavailable for visual verification");
        context.drawImage(image, 0, 0);
        return context.getImageData(
          Math.ceil(box.x),
          Math.ceil(box.y),
          Math.floor(box.width) - 1,
          Math.floor(box.height) - 1,
        ).data;
      };
      const first = await read(before);
      const returned = await read(after);
      let changed = 0;
      for (let index = 0; index < first.length; index += 4) {
        if (Math.abs((first[index] ?? 0) - (returned[index] ?? 0)) > 30)
          changed += 1;
      }
      return changed / (first.length / 4);
    },
    { before: before.data, after: after.data, box },
  );
  // The old cached bitmap changed >7% of this region; allow tiny AA variance.
  expect(changed).toBeLessThan(0.005);
});

test("docked logo remains painted during wheel scroll and deep reload", async ({
  page,
}) => {
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute(
    "data-hero-intro",
    "done",
    { timeout: 8_000 },
  );
  await page.evaluate(() =>
    window.scrollTo({ top: innerHeight * 1.6, behavior: "instant" }),
  );
  await expect(page.locator("html")).toHaveAttribute(
    "data-hero-docked",
    "true",
  );
  const box = await page.locator("[data-header-letter]").first().boundingBox();
  if (!box) throw new Error("Missing logo bounds");
  const cdp = await page.context().newCDPSession(page);
  let baseline = 0;
  for (const delta of [0, 100, 300, -200, 450, -300]) {
    await page.mouse.wheel(0, delta);
    // Capture the actual compositor viewport, avoiding document-clip offsets
    // that ordinary screenshots can race with during asynchronous wheel scroll.
    const shot = await cdp.send("Page.captureScreenshot", {
      format: "png",
      fromSurface: true,
      captureBeyondViewport: false,
    });
    const ink = await page.evaluate(
      async ({ data, box }) => {
        const image = new Image();
        image.src = `data:image/png;base64,${data}`;
        await image.decode();
        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const context = canvas.getContext("2d");
        if (!context)
          throw new Error("Canvas unavailable for visual verification");
        context.drawImage(image, 0, 0);
        const scale = image.naturalWidth / innerWidth;
        const pixels = context.getImageData(
          box.x * scale,
          box.y * scale,
          box.width * scale,
          box.height * scale,
        ).data;
        let dark = 0;
        for (let i = 0; i < pixels.length; i += 4) {
          if (
            (pixels[i] ?? 255) < 60 &&
            (pixels[i + 1] ?? 255) < 60 &&
            (pixels[i + 2] ?? 255) < 60
          )
            dark += 1;
        }
        return dark;
      },
      { data: shot.data, box },
    );
    if (delta === 0) baseline = ink;
    expect(ink).toBeGreaterThan(100);
    expect(ink).toBeGreaterThanOrEqual(baseline * 0.95);
  }
  await cdp.detach();
  await page.reload();
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(800);
  await expect(page.locator("html")).toHaveAttribute("data-hero-intro", "done");
  await expect(page.locator("html")).toHaveAttribute(
    "data-hero-docked",
    "true",
  );
  await expect(page.locator("[data-header-letter]").first()).toHaveCSS(
    "transform",
    "none",
  );
  await expect(page.locator(".site-wordmark__letter-inner").first()).toHaveCSS(
    "transform",
    "none",
  );
});

test("hero scroll transition updates header state without blocking navigation", async ({
  page,
}) => {
  await page.goto("/en");
  await page
    .getByRole("link", { name: "View selected work" })
    .click({ trial: true });

  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.25));
  await expect
    .poll(() => page.evaluate(() => document.documentElement.dataset.heroState))
    .toBe("hero-passed");

  await page.getByRole("link", { name: "View selected work" }).click();
  await expect(page).toHaveURL(/\/en\/work$/);
});

test("hero state does not leak into other routes after client navigation", async ({
  page,
}) => {
  await page.goto("/en");
  await page.getByRole("link", { name: "View selected work" }).click();
  await expect(page).toHaveURL(/\/en\/work$/);

  await expect(page.locator("html")).not.toHaveAttribute(
    "data-hero-state",
    /.+/,
  );
  await expect(
    page.getByRole("banner").locator("[data-header-letter]").first(),
  ).toHaveCSS("opacity", "1");
});

for (const viewport of [
  { width: 320, height: 568 },
  { width: 375, height: 667 },
  { width: 390, height: 844 },
  { width: 844, height: 390 },
] as const) {
  test(`hero fits ${viewport.width}x${viewport.height} without overflow`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/tr");

    const metrics = await page.evaluate(() => {
      const stage = document.querySelector(".hero__stage");
      const letters = Array.from(
        document.querySelectorAll("[data-hero-letter]"),
        (letter) => letter.getBoundingClientRect(),
      );
      return {
        overflowX: document.documentElement.scrollWidth > window.innerWidth,
        stageHeight: stage?.getBoundingClientRect().height ?? 0,
        lettersRight: Math.max(...letters.map((rect) => rect.right)),
        lettersLeft: Math.min(...letters.map((rect) => rect.left)),
        viewportHeight: window.innerHeight,
        viewportWidth: window.innerWidth,
      };
    });

    expect(metrics.overflowX).toBe(false);
    expect(metrics.lettersLeft).toBeGreaterThanOrEqual(0);
    expect(metrics.lettersRight).toBeLessThanOrEqual(metrics.viewportWidth);
    expect(metrics.stageHeight).toBeLessThanOrEqual(metrics.viewportHeight + 1);
  });
}

test("home and internal page have no obvious accessibility violations", async ({
  page,
}) => {
  for (const path of ["/en", "/en/work", "/en/work/municipal-quality-system"]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  }
});
