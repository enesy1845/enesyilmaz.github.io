import { describe, expect, it } from "vitest";

import {
  getFooterParticleConfig,
  getSampleStep,
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
    expect(getFooterParticleConfig(200, false, "fine").maxParticles).toBe(0);
  });

  it("bounds particle counts per tier and only pushes for fine pointers", () => {
    const mobile = getFooterParticleConfig(390, false, "coarse");
    const desktop = getFooterParticleConfig(1440, false, "fine");

    expect(mobile.maxParticles).toBeLessThan(desktop.maxParticles);
    expect(mobile.interactionRadius).toBe(0);
    expect(desktop.interactionRadius).toBeGreaterThan(0);
    expect(
      getFooterParticleConfig(1440, false, "coarse").interactionRadius,
    ).toBe(0);
  });

  it("chooses a sample step that stays near the particle budget", () => {
    const inkArea = 400_000;
    const step = getSampleStep(inkArea, 4000);

    expect(inkArea / step ** 2).toBeLessThanOrEqual(4000 * 1.3);
    expect(getSampleStep(0, 4000)).toBe(1);
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
