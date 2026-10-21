export type SculptureQualityTier =
  "reduced" | "mobile" | "tablet" | "desktop" | "large-desktop";

export type SculptureTierConfig = {
  tier: SculptureQualityTier;
  plateCount: number;
  maxDpr: number;
  frameInterval: number;
};

export type SculptureCapabilities = {
  supportsCanvas: boolean;
  prefersReducedMotion: boolean;
  width: number;
  height: number;
};

export type HelixQuality = {
  tier: Exclude<SculptureQualityTier, "reduced">;
  maxDpr: number;
  shadowMapSize: number;
  frameInterval: number;
};

/** One code panel of the helix, in sculpture space. */
export type HelixPanel = {
  index: number;
  angle: number;
  y: number;
  innerRadius: number;
  outerRadius: number;
  alternate: boolean;
};

/** Whole-sculpture transform for one phase of the loop. */
export type HelixPose = {
  rotationX: number;
  rotationY: number;
  positionY: number;
  scaleXZ: number;
};

/** Where the sculpture axis sits, as viewport fractions, and how many world
    units the viewport height spans. */
export type HelixFraming = {
  centerX: number;
  centerY: number;
  worldHeight: number;
};

export type HeroScrollState = "hero-top" | "hero-transitioning" | "hero-passed";

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type LetterTransform = {
  x: number;
  y: number;
  scale: number;
};
