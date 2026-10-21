/**
 * Pure model of the NOI Code Helix: panel layout, periodic pose, framing and
 * quality tiers. No Three.js import, so it is cheap to unit test and the
 * WebGL engine only consumes numbers from here.
 */
import type {
  HelixFraming,
  HelixPanel,
  HelixPose,
  HelixQuality,
} from "@/components/home/hero/hero.types";
import { getSculptureTier } from "@/components/home/hero/hero.utils";

const TAU = Math.PI * 2;

export const HELIX_LOOP_MS = 16_000;
export const HELIX_PANEL_COUNT = 54;
export const HELIX_HEIGHT = 7.8;
export const HELIX_TURNS = 2;
export const HELIX_START_PHASE = 0.08;
/** Angular offset of the first panel, from the approved prototype. */
export const HELIX_ANGLE_OFFSET = 0.35;

const PANEL_INDENTS = [0, 0.08, 0.2, 0.13, 0.04, 0.18, 0.1] as const;

const qualityTiers: Record<HelixQuality["tier"], HelixQuality> = {
  mobile: {
    tier: "mobile",
    maxDpr: 1.5,
    shadowMapSize: 1024,
    frameInterval: 33,
  },
  tablet: {
    tier: "tablet",
    maxDpr: 1.5,
    shadowMapSize: 1024,
    frameInterval: 0,
  },
  desktop: {
    tier: "desktop",
    maxDpr: 1.75,
    shadowMapSize: 2048,
    frameInterval: 0,
  },
  // Very large canvases are fill-rate bound; trade a little density for it.
  "large-desktop": {
    tier: "large-desktop",
    maxDpr: 1.5,
    shadowMapSize: 2048,
    frameInterval: 0,
  },
};

export function getHelixQuality(width: number): HelixQuality {
  return qualityTiers[getSculptureTier(width)];
}

/** Wraps any phase into [0, 1), so phase 1 is exactly phase 0. */
export function normalizePhase(phase: number): number {
  if (!Number.isFinite(phase)) return 0;
  return phase - Math.floor(phase);
}

export function getHelixPanels(
  count: number = HELIX_PANEL_COUNT,
): HelixPanel[] {
  return Array.from({ length: count }, (_, index) => {
    const t = index / Math.max(1, count - 1);
    return {
      index,
      angle: t * TAU * HELIX_TURNS + HELIX_ANGLE_OFFSET,
      y: (t - 0.5) * HELIX_HEIGHT,
      innerRadius: 0.18 + (PANEL_INDENTS[index % PANEL_INDENTS.length] ?? 0),
      outerRadius:
        (1.9 + 0.1 * Math.sin(index * 2.1)) *
        (0.82 + 0.18 * Math.sin(Math.PI * t)),
      alternate: index % 6 === 0,
    };
  });
}

/**
 * Every term is a sin/cos of one full turn, so the pose is periodic: the
 * geometry never changes and phase 0 and phase 1 render the same frame.
 */
export function getHelixPose(phase: number): HelixPose {
  const spin = normalizePhase(phase) * TAU;
  const wave = Math.sin(spin);
  return {
    rotationX: -0.035 + 0.015 * wave,
    rotationY: spin + 0.2,
    positionY: 0.048 * wave,
    scaleXZ: 1 + 0.012 * wave,
  };
}

/**
 * Mirrors the hero CSS breakpoint: on the wide layout the helix stands behind
 * N and O; on the stacked layout it is centred and sized to fit the width.
 */
export function getHelixFraming(width: number, height: number): HelixFraming {
  const safeWidth = Math.max(1, width);
  const safeHeight = Math.max(1, height);
  const isWide =
    safeWidth >= 1024 ||
    (safeWidth > safeHeight && safeWidth >= 640 && safeHeight <= 640);
  if (isWide) {
    return { centerX: 0.29, centerY: 0.5, worldHeight: 7.6 };
  }
  return {
    centerX: 0.5,
    centerY: 0.52,
    worldHeight: Math.max(10.5, (4.6 * safeHeight) / safeWidth),
  };
}
