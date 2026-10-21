/**
 * Canvas 2D particle renderer for the footer NOI wordmark, after the Phase 4
 * particle hero (ADR 009): targets are sampled from the real logo outlines,
 * particles spring towards them and a fine pointer pushes them aside.
 * Lifecycle lives in footer-particles-canvas.
 */

export type PointerMode = "fine" | "coarse" | "none";

export type FooterParticleConfig = {
  tier: "reduced" | "mobile" | "tablet" | "desktop";
  maxParticles: number;
  maxDpr: number;
  interactionRadius: number;
  /** Squares are much cheaper to fill and look the same at mobile sizes. */
  dot: "circle" | "square";
};

export type FooterParticle = {
  tx: number;
  ty: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  tone: 0 | 1 | 2;
};

export type PointerState = { active: boolean; x: number; y: number };

const RETURN_FORCE = 0.045;
const DAMPING = 0.86;
const MAX_VELOCITY = 18;
const PUSH_STRENGTH = 0.32;
/** Below this summed speed every particle is home and the loop can stop. */
const SETTLED_SPEED = 0.02;
const TONE_ALPHA = [0.55, 0.75, 0.95] as const;

export function getFooterParticleConfig(
  width: number,
  prefersReducedMotion: boolean,
  pointer: PointerMode,
): FooterParticleConfig {
  if (prefersReducedMotion || width < 280) {
    return {
      tier: "reduced",
      maxParticles: 0,
      maxDpr: 1,
      interactionRadius: 0,
      dot: "circle",
    };
  }
  const interactive = pointer === "fine";
  if (width < 640) {
    return {
      tier: "mobile",
      maxParticles: 1100,
      maxDpr: 1.5,
      interactionRadius: 0,
      dot: "square",
    };
  }
  if (width < 1024) {
    return {
      tier: "tablet",
      maxParticles: 2800,
      maxDpr: 2,
      interactionRadius: interactive ? 70 : 0,
      dot: "circle",
    };
  }
  return {
    tier: "desktop",
    maxParticles: 4200,
    maxDpr: 2,
    interactionRadius: interactive ? 110 : 0,
    dot: "circle",
  };
}

/** Grid step that yields roughly `maxParticles` samples for the ink area. */
export function getSampleStep(inkArea: number, maxParticles: number): number {
  if (inkArea <= 0 || maxParticles <= 0) return 1;
  return Math.max(1, Math.round(Math.sqrt(inkArea / maxParticles)));
}

export function detectPointerMode(): PointerMode {
  if (typeof window.matchMedia !== "function") return "none";
  if (window.matchMedia("(pointer: fine)").matches) return "fine";
  if (window.matchMedia("(pointer: coarse)").matches) return "coarse";
  return "none";
}

function seededUnit(index: number): number {
  const value = Math.sin(index * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

/**
 * Paints the rendered SVG letters into an offscreen canvas with their own
 * screen transforms, so particle targets match the CSS layout exactly.
 */
function paintLetters(
  context: CanvasRenderingContext2D,
  shapes: SVGGraphicsElement[],
  origin: DOMRect,
) {
  context.fillStyle = "#000";
  for (const shape of shapes) {
    const matrix = shape.getScreenCTM();
    if (!matrix) continue;
    context.setTransform(
      matrix.a,
      matrix.b,
      matrix.c,
      matrix.d,
      matrix.e - origin.left,
      matrix.f - origin.top,
    );
    if (shape instanceof SVGPathElement) {
      context.fill(new Path2D(shape.getAttribute("d") ?? ""));
    } else if (shape instanceof SVGCircleElement) {
      context.beginPath();
      context.arc(
        shape.cx.baseVal.value,
        shape.cy.baseVal.value,
        shape.r.baseVal.value,
        0,
        Math.PI * 2,
      );
      context.fill();
    }
  }
  context.setTransform(1, 0, 0, 1, 0, 0);
}

export function buildFooterParticles(
  shapes: SVGGraphicsElement[],
  origin: DOMRect,
  config: FooterParticleConfig,
): FooterParticle[] {
  const width = Math.max(1, Math.round(origin.width));
  const height = Math.max(1, Math.round(origin.height));
  const source = document.createElement("canvas");
  source.width = width;
  source.height = height;
  const context = source.getContext("2d", { willReadFrequently: true });
  if (!context || config.maxParticles === 0) return [];

  paintLetters(context, shapes, origin);
  const pixels = context.getImageData(0, 0, width, height).data;
  let inkArea = 0;
  for (let index = 3; index < pixels.length; index += 4) {
    if ((pixels[index] ?? 0) > 128) inkArea += 1;
  }
  const step = getSampleStep(inkArea, config.maxParticles);

  const particles: FooterParticle[] = [];
  for (let y = Math.floor(step / 2); y < height; y += step) {
    for (let x = Math.floor(step / 2); x < width; x += step) {
      if ((pixels[(y * width + x) * 4 + 3] ?? 0) <= 128) continue;
      const seed = particles.length + 1;
      // Start loosely scattered below the mark, so it assembles on arrival.
      const angle = seededUnit(seed) * Math.PI * 2;
      const spread = height * (0.25 + seededUnit(seed + 7) * 0.5);
      // Jitter within the sample cell, so the mark reads as grain, not a grid.
      const tx = x + (seededUnit(seed + 41) - 0.5) * step * 0.9;
      const ty = y + (seededUnit(seed + 53) - 0.5) * step * 0.9;
      particles.push({
        tx,
        ty,
        x: tx + Math.cos(angle) * spread,
        y: ty + Math.abs(Math.sin(angle)) * spread,
        vx: 0,
        vy: 0,
        size: Math.max(0.9, step * (0.32 + seededUnit(seed + 13) * 0.14)),
        tone: Math.floor(seededUnit(seed + 29) * 3) as 0 | 1 | 2,
      });
    }
  }
  return particles;
}

/** Advances one frame and returns whether any particle is still moving. */
export function stepFooterParticles(
  particles: FooterParticle[],
  pointer: PointerState,
  radius: number,
): boolean {
  let motion = 0;
  for (const particle of particles) {
    let dx = particle.tx - particle.x;
    let dy = particle.ty - particle.y;
    if (pointer.active && radius > 0) {
      const px = particle.x - pointer.x;
      const py = particle.y - pointer.y;
      const distance = Math.hypot(px, py);
      if (distance > 0 && distance < radius) {
        const force = ((radius - distance) / radius) * PUSH_STRENGTH * radius;
        dx += (px / distance) * force;
        dy += (py / distance) * force;
      }
    }
    particle.vx = Math.max(
      -MAX_VELOCITY,
      Math.min(MAX_VELOCITY, (particle.vx + dx * RETURN_FORCE) * DAMPING),
    );
    particle.vy = Math.max(
      -MAX_VELOCITY,
      Math.min(MAX_VELOCITY, (particle.vy + dy * RETURN_FORCE) * DAMPING),
    );
    particle.x += particle.vx;
    particle.y += particle.vy;
    motion +=
      Math.abs(particle.vx) +
      Math.abs(particle.vy) +
      Math.abs(dx) * 0.01 +
      Math.abs(dy) * 0.01;
  }
  return motion / Math.max(1, particles.length) > SETTLED_SPEED;
}

/** One path and fill per tone keeps thousands of dots to three draw calls. */
export function drawFooterParticles(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  particles: FooterParticle[],
  ink: string,
  dot: FooterParticleConfig["dot"],
) {
  context.clearRect(0, 0, width, height);
  context.fillStyle = ink;
  for (const [tone, alpha] of TONE_ALPHA.entries()) {
    context.globalAlpha = alpha;
    context.beginPath();
    for (const particle of particles) {
      if (particle.tone !== tone) continue;
      if (dot === "square") {
        const side = particle.size * 1.8;
        context.rect(particle.x - side / 2, particle.y - side / 2, side, side);
      } else {
        context.moveTo(particle.x + particle.size, particle.y);
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      }
    }
    context.fill();
  }
  context.globalAlpha = 1;
}
