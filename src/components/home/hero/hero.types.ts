export type ParticleQualityTier =
  | "reduced"
  | "small-mobile"
  | "large-mobile"
  | "tablet"
  | "desktop"
  | "large-desktop";

export type PointerMode = "none" | "fine" | "coarse";

export type ParticleTierConfig = {
  tier: ParticleQualityTier;
  maxParticles: number;
  sampleStep: number;
  maxDpr: number;
  fontScale: number;
  interactionRadius: number;
  displacementStrength: number;
  returnForce: number;
  damping: number;
  maxVelocity: number;
};

export type ParticleCapabilities = {
  supportsCanvas: boolean;
  prefersReducedMotion: boolean;
  width: number;
  height: number;
  devicePixelRatio: number;
  pointer: PointerMode;
};

export type ParticlePoint = {
  tx: number;
  ty: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  tone: number;
};

export type HeroScrollState = "hero-top" | "hero-transitioning" | "hero-passed";
