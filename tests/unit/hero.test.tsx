import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HomeHero } from "@/components/home/hero/home-hero";
import {
  clampProgress,
  easeOutQuad,
  easeHeroSnap,
  getCappedDpr,
  getHeroScrollState,
  getHeroSnapTarget,
  getLetterTransform,
  getSculptureConfig,
  getStaggeredProgress,
  shouldRunSculpture,
} from "@/components/home/hero/hero.utils";
import { homeContent } from "@/data/home";
import en from "@/messages/en.json";
import { getWordmarkWords } from "@/lib/utils/wordmark";

const baseCapabilities = {
  supportsCanvas: true,
  prefersReducedMotion: false,
  width: 1280,
  height: 820,
};

describe("home hero", () => {
  it("renders the semantic hero content before any enhancement", () => {
    render(<HomeHero dictionary={en} locale="en" page={homeContent.en} />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Enes Yilmaz",
    );
    expect(screen.getByText("Software Developer")).toBeVisible();
    expect(
      screen.getByRole("link", { name: "View selected work" }),
    ).toHaveAttribute("href", "/en/work");
    expect(screen.getByRole("link", { name: "About me" })).toHaveAttribute(
      "href",
      "/en/about",
    );
    expect(
      screen.getByRole("link", { name: homeContent.en.manifestoTitle }),
    ).toHaveAttribute("href", "#home-next");
  });

  it("renders the wordmark as decorative, indexed letters", () => {
    const { container } = render(
      <HomeHero dictionary={en} locale="en" page={homeContent.en} />,
    );
    const letters = container.querySelectorAll("[data-hero-letter]");

    expect(letters).toHaveLength(3);
    expect(letters[0]?.closest("[aria-hidden='true']")).not.toBeNull();
    expect(
      Array.from(container.querySelectorAll("[data-noi-letter]"), (letter) =>
        letter.getAttribute("data-noi-letter"),
      ),
    ).toEqual(["n", "o", "i"]);
  });

  it("preserves brand casing when pairing hero and header letters", () => {
    const words = getWordmarkWords("Enes Yilmaz");

    expect(words.map((word) => word.map((l) => l.character).join(""))).toEqual([
      "Enes",
      "Yilmaz",
    ]);
    expect(words.flat().map((letter) => letter.index)).toEqual([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    ]);
  });

  it("selects bounded sculpture tiers and falls back when required", () => {
    expect(getSculptureConfig({ ...baseCapabilities, width: 390 }).tier).toBe(
      "mobile",
    );
    expect(getSculptureConfig({ ...baseCapabilities, width: 1440 }).tier).toBe(
      "desktop",
    );
    expect(
      getSculptureConfig({ ...baseCapabilities, prefersReducedMotion: true })
        .tier,
    ).toBe("reduced");
    expect(
      shouldRunSculpture({ ...baseCapabilities, supportsCanvas: false }),
    ).toBe(false);
  });

  it("caps device pixel ratio per quality tier", () => {
    const config = getSculptureConfig(baseCapabilities);

    expect(getCappedDpr(3, config)).toBeLessThanOrEqual(config.maxDpr);
    expect(getCappedDpr(0, config)).toBe(1);
  });

  it("derives the scroll state from hero and header positions", () => {
    expect(getHeroScrollState(0, 900, 77)).toBe("hero-top");
    expect(getHeroScrollState(300, 600, 77)).toBe("hero-transitioning");
    expect(getHeroScrollState(830, 77, 77)).toBe("hero-passed");
  });

  it("docks a letter onto its header target and keeps it pinned", () => {
    const from = { x: 20, y: 400, width: 120, height: 160 };
    const to = { x: 56, y: 26, width: 18, height: 24 };

    const large = getLetterTransform(from, to, 0);
    expect(large.x).toBe(-36);
    expect(large.y).toBe(374);
    expect(large.scale).toBeCloseTo(160 / 24);
    expect(getLetterTransform(from, to, 1)).toEqual({ x: -0, y: 0, scale: 1 });
  });

  it("staggers words while keeping progress within bounds", () => {
    expect(getStaggeredProgress(0, 0, 2)).toBe(0);
    expect(getStaggeredProgress(1, 1, 2)).toBe(1);
    expect(getStaggeredProgress(0.5, 0, 2)).toBeGreaterThan(
      getStaggeredProgress(0.5, 1, 2),
    );
    expect(getStaggeredProgress(0.3, 1, 2)).toBe(0);
    expect(clampProgress(Number.NaN)).toBe(0);
    expect(easeOutQuad(2)).toBe(1);
  });

  it("resolves a resting intro to its nearest endpoint", () => {
    expect(getHeroSnapTarget(0.13)).toBe(0);
    expect(getHeroSnapTarget(0.5)).toBe(0);
    expect(getHeroSnapTarget(0.51)).toBe(1);
    expect(getHeroSnapTarget(0.85)).toBe(1);
    expect(getHeroSnapTarget(0)).toBeNull();
    expect(getHeroSnapTarget(1)).toBeNull();
    expect(getHeroSnapTarget(1.2)).toBeNull();
    expect(getHeroSnapTarget(Number.NaN)).toBeNull();
  });

  it("uses a continuous monotone snap easing with exact endpoints", () => {
    expect(easeHeroSnap(0)).toBe(0);
    expect(easeHeroSnap(1)).toBe(1);
    // At parameter t=.5 the measured Bezier passes through x=.35, y=.5.
    expect(easeHeroSnap(0.35)).toBeCloseTo(0.5, 5);
    let previous = 0;
    for (let step = 0; step <= 100; step += 1) {
      const next = easeHeroSnap(step / 100);
      expect(next).toBeGreaterThanOrEqual(previous);
      previous = next;
    }
  });
});
