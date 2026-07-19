import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HomeHero } from "@/components/home/hero/home-hero";
import {
  getCappedDpr,
  getHeroScrollState,
  getParticleConfig,
  getParticleTextLines,
  shouldRunParticleRenderer,
} from "@/components/home/hero/hero.utils";
import { ParticleHeroFallback } from "@/components/home/hero/particle-hero-fallback";
import { homeContent } from "@/data/home";
import en from "@/messages/en.json";

const baseCapabilities = {
  supportsCanvas: true,
  prefersReducedMotion: false,
  width: 1280,
  height: 520,
  devicePixelRatio: 2,
  pointer: "fine" as const,
};

describe("home hero", () => {
  it("renders the semantic hero content before particle enhancement", () => {
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
  });

  it("keeps the static particle fallback decorative", () => {
    const { container } = render(<ParticleHeroFallback />);

    expect(container.querySelector("[data-particle-fallback]")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("selects bounded particle quality tiers", () => {
    expect(getParticleConfig({ ...baseCapabilities, width: 340 }).tier).toBe(
      "small-mobile",
    );
    expect(getParticleConfig({ ...baseCapabilities, width: 1440 }).tier).toBe(
      "desktop",
    );
    expect(getParticleConfig({ ...baseCapabilities, width: 1800 }).tier).toBe(
      "large-desktop",
    );
  });

  it("disables interaction and rendering when capabilities require fallback", () => {
    const coarseConfig = getParticleConfig({
      ...baseCapabilities,
      pointer: "coarse",
    });
    const reducedConfig = getParticleConfig({
      ...baseCapabilities,
      prefersReducedMotion: true,
    });

    expect(coarseConfig.interactionRadius).toBe(0);
    expect(reducedConfig.tier).toBe("reduced");
    expect(
      shouldRunParticleRenderer({
        ...baseCapabilities,
        supportsCanvas: false,
      }),
    ).toBe(false);
  });

  it("caps device pixel ratio per quality tier", () => {
    const config = getParticleConfig(baseCapabilities);

    expect(getCappedDpr(3, config)).toBeLessThanOrEqual(config.maxDpr);
    expect(getCappedDpr(0, config)).toBe(1);
  });

  it("keeps scroll and text helpers deterministic", () => {
    expect(getHeroScrollState(0)).toBe("hero-top");
    expect(getHeroScrollState(0.5)).toBe("hero-transitioning");
    expect(getHeroScrollState(1)).toBe("hero-passed");
    expect(getParticleTextLines(375)).toEqual(["ENES", "YILMAZ"]);
    expect(getParticleTextLines(1024)).toEqual(["ENES YILMAZ"]);
  });
});
