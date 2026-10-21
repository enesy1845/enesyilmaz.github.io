/**
 * Canvas 2D particle renderer for the footer NOI wordmark, after the Phase 4
 * particle hero (ADR 009): the real logo outlines are sampled on an even
 * dot-matrix grid, particles spring towards those dots and a fine pointer
 * pushes them aside.
 * Lifecycle lives in footer-particles-canvas.
 */

export type PointerMode = "fine" | "coarse" | "none";

export type FooterParticleConfig = {
  tier: "reduced" | "mobile" | "tablet" | "desktop";
  /** Dot rows across the letter height; fewer rows mean larger dots. */
  rows: number;
  maxDpr: number;
  interactionRadius: number;
};

export type FooterParticle = {
  tx: number;
  ty: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

export type PointerState = { active: boolean; x: number; y: number };

const RETURN_FORCE = 0.045;
const DAMPING = 0.86;
const MAX_VELOCITY = 18;
const PUSH_STRENGTH = 0.32;
/** Below this summed speed every particle is home and the loop can stop. */
const SETTLED_SPEED = 0.02;

export function getFooterParticleConfig(
  width: number,
  prefersReducedMotion: boolean,
  pointer: PointerMode,
): FooterParticleConfig {
  if (prefersReducedMotion || width < 280) {
    return {
      tier: "reduced",
      rows: 0,
      maxDpr: 1,
      interactionRadius: 0,
    };
  }
  const interactive = pointer === "fine";
  if (width < 640) {
    return {
      tier: "mobile",
      rows: 12,
      maxDpr: 1.5,
      interactionRadius: 0,
    };
  }
  if (width < 1024) {
    return {
      tier: "tablet",
      rows: 14,
      maxDpr: 2,
      interactionRadius: interactive ? 70 : 0,
    };
  }
  return {
    tier: "desktop",
    rows: 16,
    maxDpr: 2,
    interactionRadius: interactive ? 110 : 0,
  };
}

/** Dot pitch for a letter height; never so small that dots turn to grain. */
export function getGridStep(letterHeight: number, rows: number): number {
  if (letterHeight <= 0 || rows <= 0) return 0;
  return Math.max(4, letterHeight / rows);
}

/**
 * Cell centres for one shape's bounds. Columns and rows are fitted to the
 * shape, so every letter starts and ends on a full dot instead of a cut one.
 */
export function getGridCells(
  left: number,
  top: number,
  width: number,
  height: number,
  step: number,
): Array<[number, number]> {
  if (step <= 0 || width <= 0 || height <= 0) return [];
  const columns = Math.max(1, Math.round(width / step));
  const rows = Math.max(1, Math.round(height / step));
  const cellWidth = width / columns;
  const cellHeight = height / rows;
  const cells: Array<[number, number]> = [];
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      cells.push([
        left + (column + 0.5) * cellWidth,
        top + (row + 0.5) * cellHeight,
      ]);
    }
  }
  return cells;
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
  if (!context || config.rows === 0) return [];

  paintLetters(context, shapes, origin);
  const pixels = context.getImageData(0, 0, width, height).data;
  const bounds = shapes.map((shape) => {
    const rect = shape.getBoundingClientRect();
    return {
      left: rect.left - origin.left,
      top: rect.top - origin.top,
      width: rect.width,
      height: rect.height,
    };
  });
  // The pitch follows the main letter body, so dots scale with the mark.
  const step = getGridStep(
    Math.max(0, ...bounds.map((bound) => bound.height)) * 0.75,
    config.rows,
  );
  const radius = step * 0.36;

  const particles: FooterParticle[] = [];
  for (const bound of bounds) {
    for (const [x, y] of getGridCells(
      bound.left,
      bound.top,
      bound.width,
      bound.height,
      step,
    )) {
      const px = Math.round(x);
      const py = Math.round(y);
      if (px < 0 || py < 0 || px >= width || py >= height) continue;
      if ((pixels[(py * width + px) * 4 + 3] ?? 0) <= 128) continue;
      const seed = particles.length + 1;
      // Start loosely scattered below the mark, so it assembles on arrival.
      const angle = seededUnit(seed) * Math.PI * 2;
      const spread = height * (0.25 + seededUnit(seed + 7) * 0.5);
      particles.push({
        tx: x,
        ty: y,
        x: x + Math.cos(angle) * spread,
        y: y + Math.abs(Math.sin(angle)) * spread,
        vx: 0,
        vy: 0,
        size: radius,
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

/** All dots share one ink, so a single path and fill draws the whole mark. */
export function drawFooterParticles(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  particles: FooterParticle[],
  ink: string,
) {
  context.clearRect(0, 0, width, height);
  context.fillStyle = ink;
  context.beginPath();
  for (const particle of particles) {
    context.moveTo(particle.x + particle.size, particle.y);
    context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
  }
  context.fill();
}
