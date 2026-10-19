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
