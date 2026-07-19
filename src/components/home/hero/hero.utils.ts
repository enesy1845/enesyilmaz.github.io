import type {
  HeroScrollState,
  ParticleCapabilities,
  ParticleQualityTier,
  ParticleTierConfig,
} from "@/components/home/hero/hero.types";

const tierConfig: Record<ParticleQualityTier, ParticleTierConfig> = {
  reduced: {
    tier: "reduced",
    maxParticles: 0,
    sampleStep: 16,
    maxDpr: 1,
    fontScale: 0.56,
    interactionRadius: 0,
    displacementStrength: 0,
    returnForce: 0,
    damping: 0.9,
    maxVelocity: 0,
  },
  "small-mobile": {
    tier: "small-mobile",
    maxParticles: 420,
    sampleStep: 10,
    maxDpr: 1,
    fontScale: 0.31,
    interactionRadius: 0,
    displacementStrength: 0,
    returnForce: 0.055,
    damping: 0.82,
    maxVelocity: 8,
  },
  "large-mobile": {
    tier: "large-mobile",
    maxParticles: 620,
    sampleStep: 9,
    maxDpr: 1.25,
    fontScale: 0.31,
    interactionRadius: 0,
    displacementStrength: 0,
    returnForce: 0.055,
    damping: 0.82,
    maxVelocity: 8,
  },
  tablet: {
    tier: "tablet",
    maxParticles: 900,
    sampleStep: 8,
    maxDpr: 1.5,
    fontScale: 0.3,
    interactionRadius: 76,
    displacementStrength: 0.9,
    returnForce: 0.06,
    damping: 0.84,
    maxVelocity: 10,
  },
  desktop: {
    tier: "desktop",
    maxParticles: 1300,
    sampleStep: 7,
    maxDpr: 1.5,
    fontScale: 0.29,
    interactionRadius: 96,
    displacementStrength: 1.05,
    returnForce: 0.065,
    damping: 0.85,
    maxVelocity: 11,
  },
  "large-desktop": {
    tier: "large-desktop",
    maxParticles: 1600,
    sampleStep: 7,
    maxDpr: 1.5,
    fontScale: 0.29,
    interactionRadius: 110,
    displacementStrength: 1.1,
    returnForce: 0.065,
    damping: 0.85,
    maxVelocity: 11,
  },
};

export function getParticleTier(width: number): ParticleQualityTier {
  if (width < 360) {
    return "small-mobile";
  }
  if (width < 640) {
    return "large-mobile";
  }
  if (width < 1024) {
    return "tablet";
  }
  if (width < 1600) {
    return "desktop";
  }
  return "large-desktop";
}

export function getParticleConfig(
  capabilities: ParticleCapabilities,
): ParticleTierConfig {
  if (
    capabilities.prefersReducedMotion ||
    !capabilities.supportsCanvas ||
    capabilities.width < 300 ||
    capabilities.height < 260
  ) {
    return tierConfig.reduced;
  }

  const tier = getParticleTier(capabilities.width);
  const config = tierConfig[tier];

  return capabilities.pointer === "fine"
    ? config
    : {
        ...config,
        interactionRadius: 0,
        displacementStrength: 0,
      };
}

export function getCappedDpr(
  devicePixelRatio: number,
  config: ParticleTierConfig,
): number {
  return Math.max(1, Math.min(devicePixelRatio || 1, config.maxDpr));
}

export function getHeroScrollState(progress: number): HeroScrollState {
  if (progress <= 0.08) {
    return "hero-top";
  }
  if (progress >= 0.86) {
    return "hero-passed";
  }
  return "hero-transitioning";
}

export function clampProgress(value: number): number {
  return Math.max(0, Math.min(1, value));
}

export function shouldRunParticleRenderer(
  capabilities: ParticleCapabilities,
): boolean {
  return getParticleConfig(capabilities).tier !== "reduced";
}

export function getParticleTextLines(width: number): readonly string[] {
  return width >= 760 ? ["ENES YILMAZ"] : ["ENES", "YILMAZ"];
}

export function seededUnit(index: number): number {
  const value = Math.sin(index * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}
