import { describe, expect, it } from "vitest";

import {
  HELIX_HEIGHT,
  HELIX_PANEL_COUNT,
  getHelixFraming,
  getHelixPanels,
  getHelixPose,
  getHelixQuality,
  normalizePhase,
} from "@/components/home/hero/helix-model";

const TAU = Math.PI * 2;

describe("helix model", () => {
  it("lays out the code panels over exactly two turns", () => {
    const panels = getHelixPanels();
    const first = panels[0];
    const last = panels.at(-1);

    expect(panels).toHaveLength(HELIX_PANEL_COUNT);
    expect(first?.y).toBeCloseTo(-HELIX_HEIGHT / 2);
    expect(last?.y).toBeCloseTo(HELIX_HEIGHT / 2);
    expect((last?.angle ?? 0) - (first?.angle ?? 0)).toBeCloseTo(2 * TAU);
    for (const panel of panels) {
      expect(panel.outerRadius).toBeGreaterThan(panel.innerRadius + 1);
    }
  });

  it("produces the same pose at the start and end of the loop", () => {
    expect(getHelixPose(1)).toEqual(getHelixPose(0));
    expect(getHelixPose(3.25)).toEqual(getHelixPose(0.25));
    expect(normalizePhase(-0.25)).toBeCloseTo(0.75);
    expect(normalizePhase(Number.NaN)).toBe(0);
  });

  it("approaches the start pose continuously at the loop boundary", () => {
    const start = getHelixPose(0);
    const end = getHelixPose(1 - 1e-6);

    expect(end.rotationY - TAU).toBeCloseTo(start.rotationY, 4);
    expect(end.rotationX).toBeCloseTo(start.rotationX, 6);
    expect(end.positionY).toBeCloseTo(start.positionY, 6);
    expect(end.scaleXZ).toBeCloseTo(start.scaleXZ, 6);
  });

  it("frames the helix behind N/O on wide screens and centres it when stacked", () => {
    expect(getHelixFraming(1440, 900).centerX).toBeLessThan(0.35);
    expect(getHelixFraming(390, 844).centerX).toBe(0.5);
    // Stacked layout keeps the panel span (about 4 world units) inside the width.
    const portrait = getHelixFraming(390, 844);
    expect((4 / portrait.worldHeight) * 844).toBeLessThan(390);
  });

  it("caps quality per device tier", () => {
    expect(getHelixQuality(390)).toMatchObject({
      tier: "mobile",
      shadowMapSize: 1024,
    });
    expect(getHelixQuality(390).frameInterval).toBeGreaterThan(0);
    expect(getHelixQuality(1440).maxDpr).toBeLessThanOrEqual(2);
  });
});
