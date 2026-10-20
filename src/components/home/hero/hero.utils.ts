import type {
  HeroScrollState,
  LetterTransform,
  Rect,
  SculptureCapabilities,
  SculptureQualityTier,
  SculptureTierConfig,
} from "@/components/home/hero/hero.types";

const tierConfig: Record<SculptureQualityTier, SculptureTierConfig> = {
  reduced: { tier: "reduced", plateCount: 0, maxDpr: 1, frameInterval: 0 },
  mobile: { tier: "mobile", plateCount: 84, maxDpr: 1.5, frameInterval: 33 },
  tablet: { tier: "tablet", plateCount: 104, maxDpr: 1.5, frameInterval: 16 },
  desktop: { tier: "desktop", plateCount: 128, maxDpr: 1.75, frameInterval: 0 },
  "large-desktop": {
    tier: "large-desktop",
    plateCount: 144,
    maxDpr: 1.75,
    frameInterval: 0,
  },
};

/** Portion of the hero height over which the wordmark docks into the header. */
export const WORDMARK_DOCK_DISTANCE = 0.85;

/** Share of the dock distance by which the last word trails the first. */
export const WORDMARK_WORD_STAGGER = 0.35;

/** Portion of the hero height over which hero copy fades out (AIR: -80%). */
export const HERO_FADE_DISTANCE = 0.8;

export function getSculptureTier(width: number): SculptureQualityTier {
  if (width < 640) {
    return "mobile";
  }
  if (width < 1024) {
    return "tablet";
  }
  if (width < 1600) {
    return "desktop";
  }
  return "large-desktop";
}

export function getSculptureConfig(
  capabilities: SculptureCapabilities,
): SculptureTierConfig {
  if (
    capabilities.prefersReducedMotion ||
    !capabilities.supportsCanvas ||
    capabilities.width < 280 ||
    capabilities.height < 240
  ) {
    return tierConfig.reduced;
  }

  return tierConfig[getSculptureTier(capabilities.width)];
}

export function shouldRunSculpture(capabilities: SculptureCapabilities) {
  return getSculptureConfig(capabilities).tier !== "reduced";
}

export function getCappedDpr(
  devicePixelRatio: number,
  config: SculptureTierConfig,
): number {
  return Math.max(1, Math.min(devicePixelRatio || 1, config.maxDpr));
}

export function clampProgress(value: number): number {
  if (Number.isNaN(value)) {
    return 0;
  }
  return Math.max(0, Math.min(1, value));
}

export function easeOutQuad(value: number): number {
  const t = clampProgress(value);
  return t * (2 - t);
}

export function easeInOutQuad(value: number): number {
  const t = clampProgress(value);
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

export function getHeroScrollState(
  scrollY: number,
  heroBottom: number,
  headerBottom: number,
): HeroScrollState {
  if (heroBottom <= headerBottom + 1) {
    return "hero-passed";
  }
  if (scrollY <= 8) {
    return "hero-top";
  }
  return "hero-transitioning";
}

/**
 * Invert the header letter into the hero position, then return that SAME
 * element to its native size. No swapping or fading between visual copies.
 */
export function getLetterTransform(
  from: Rect,
  to: Rect,
  progress: number,
): LetterTransform {
  const eased = easeOutQuad(progress);
  const startScale = to.height > 0 ? from.height / to.height : 1;

  return {
    x: (from.x - to.x) * (1 - eased),
    y: (from.y - to.y) * (1 - eased),
    scale: 1 + (startScale - 1) * (1 - eased),
  };
}

/**
 * Per-word docking progress. Words leave one after another so the second row
 * of the stacked mobile wordmark never runs into the first one, while the
 * letters of a word keep travelling together.
 */
export function getStaggeredProgress(
  progress: number,
  index: number,
  count: number,
  stagger = WORDMARK_WORD_STAGGER,
): number {
  if (stagger <= 0 || count <= 1) {
    return clampProgress(progress);
  }
  const delay = (stagger * index) / (count - 1);
  return clampProgress((progress - delay) / (1 - stagger));
}

export const HERO_SNAP_IDLE_MS = 250;
export const HERO_SNAP_DURATION_MS = 1000;

/**
 * AIR resolves a resting intro scroll to the nearest endpoint. Its desktop
 * endpoints span one full hero height; letter docking finishes at 85%.
 */
export function getHeroSnapTarget(progress: number): 0 | 1 | null {
  if (!Number.isFinite(progress) || progress <= 0 || progress >= 1) return null;
  return progress > 0.5 ? 1 : 0;
}

/** Invert x for the measured AIR snap curve, cubic-bezier(.25, 0, .35, 1). */
export function easeHeroSnap(progress: number): number {
  const x = clampProgress(progress);
  if (x === 0 || x === 1) return x;
  let low = 0;
  let high = 1;
  for (let iteration = 0; iteration < 20; iteration += 1) {
    const t = (low + high) / 2;
    const curveX = 0.75 * (1 - t) ** 2 * t + 1.05 * (1 - t) * t ** 2 + t ** 3;
    if (curveX < x) low = t;
    else high = t;
  }
  const t = (low + high) / 2;
  return t * t * (3 - 2 * t);
}

export function seededUnit(index: number): number {
  const value = Math.sin(index * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}
