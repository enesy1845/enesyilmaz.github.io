import { describe, expect, it } from "vitest";

import {
  getFooterParticleConfig,
  getGridCells,
  getGridStep,
  stepFooterParticles,
  type FooterParticle,
} from "@/components/layout/footer-particles-engine";

const still = { active: false, x: 0, y: 0 };

function particleAt(x: number, y: number, tx = x, ty = y): FooterParticle {
  return { tx, ty, x, y, vx: 0, vy: 0, size: 1 };
}

describe("footer particles", () => {
  it("skips particles for reduced motion and tiny widths", () => {
    expect(getFooterParticleConfig(1440, true, "fine").tier).toBe("reduced");
    expect(getFooterParticleConfig(200, false, "fine").rows).toBe(0);
  });

  it("bounds particle counts per tier and only pushes for fine pointers", () => {
    const mobile = getFooterParticleConfig(390, false, "coarse");
    const desktop = getFooterParticleConfig(1440, false, "fine");

    expect(mobile.rows).toBeGreaterThan(0);
    expect(desktop.rows).toBeGreaterThanOrEqual(mobile.rows);
    expect(mobile.interactionRadius).toBe(0);
    expect(desktop.interactionRadius).toBeGreaterThan(0);
    expect(
      getFooterParticleConfig(1440, false, "coarse").interactionRadius,
    ).toBe(0);
  });

  it("derives an even dot pitch from the letter height", () => {
    expect(getGridStep(240, 16)).toBe(15);
    expect(getGridStep(20, 16)).toBe(4);
    expect(getGridStep(0, 16)).toBe(0);
  });

  it("keeps one pitch and shared rows across shapes", () => {
    const first = getGridCells(
      { left: 0, top: 0, width: 40, height: 30 },
      10,
      0,
    );
    const second = getGridCells(
      { left: 100, top: 12, width: 25, height: 30 },
      10,
      0,
    );
    const rows = (cells: Array<[number, number]>) =>
      new Set(cells.map(([, y]) => y));

    expect(first[0]).toEqual([5, 5]);
    expect(first[1]?.[0]).toBe(15);
    expect([...rows(second)].every((y) => (y - 5) % 10 === 0)).toBe(true);
    expect((second[1]?.[0] ?? 0) - (second[0]?.[0] ?? 0)).toBe(10);
  });

  it("assembles scattered particles and reports when they settle", () => {
    const particles = [
      particleAt(0, 300, 50, 50),
      particleAt(400, 400, 80, 60),
    ];
    let moving = true;
    let frames = 0;
    while (moving && frames < 2000) {
      moving = stepFooterParticles(particles, still, 0);
      frames += 1;
    }

    expect(moving).toBe(false);
    for (const particle of particles) {
      expect(
        Math.hypot(particle.tx - particle.x, particle.ty - particle.y),
      ).toBeLessThan(1);
    }
  });

  it("pushes particles away from an active pointer", () => {
    const particle = particleAt(100, 100);
    stepFooterParticles([particle], { active: true, x: 90, y: 100 }, 110);

    expect(particle.x).toBeGreaterThan(100);
  });
});
