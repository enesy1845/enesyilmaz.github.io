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

const RETURN_FORCE = 0.032;
/** Lower damping lets dots overshoot slightly as they snap back. */
const DAMPING = 0.9;
const MAX_VELOCITY = 26;
const PUSH_STRENGTH = 0.45;
/** Once no single dot moves or strays more than this, the mark is home. */
const SETTLED_DISTANCE = 0.15;

/** `width` is the viewport width; it picks the device tier. */
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
      rows: 10,
      maxDpr: 1.5,
      interactionRadius: 0,
    };
  }
  if (width < 1024) {
    return {
      tier: "tablet",
      rows: 10,
      maxDpr: 2,
      interactionRadius: interactive ? 70 : 0,
    };
  }
  return {
    tier: "desktop",
    rows: 10,
    maxDpr: 2,
    interactionRadius: interactive ? 90 : 0,
  };
}

/** Dot pitch for a letter height; never so small that dots turn to grain. */
export function getGridStep(letterHeight: number, rows: number): number {
  if (letterHeight <= 0 || rows <= 0) return 0;
  return Math.max(4, letterHeight / rows);
}

export type GridBounds = {
  left: number;
  top: number;
  width: number;
  height: number;
};

/**
 * Dot centres for one shape: the pitch is identical in both directions for
 * every letter, and the dots are centred within the shape on both axes, so
 * symmetric outlines produce symmetric dot patterns. The n, o and i bodies
 * share a height, so their rows still line up across the mark.
 */
export function getGridCells(
  bounds: GridBounds,
  step: number,
): Array<[number, number]> {
  if (step <= 0 || bounds.width <= 0 || bounds.height <= 0) return [];
  const columns = Math.max(1, Math.round(bounds.width / step));
  const rows = Math.max(1, Math.round(bounds.height / step));
  const firstX = bounds.left + (bounds.width - (columns - 1) * step) / 2;
  const firstY = bounds.top + (bounds.height - (rows - 1) * step) / 2;
  const cells: Array<[number, number]> = [];
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      cells.push([firstX + column * step, firstY + row * step]);
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

type VectorShape = {
  path: Path2D;
  matrix: DOMMatrix;
  bounds: GridBounds;
};

/** The rendered SVG outline in canvas coordinates, read from the layout. */
function toVectorShape(
  shape: SVGGraphicsElement,
  origin: DOMRect,
): VectorShape | null {
  const ctm = shape.getScreenCTM();
  if (!ctm) return null;
  const path = new Path2D();
  if (shape instanceof SVGPathElement) {
    path.addPath(new Path2D(shape.getAttribute("d") ?? ""));
  } else if (shape instanceof SVGCircleElement) {
    path.arc(
      shape.cx.baseVal.value,
      shape.cy.baseVal.value,
      shape.r.baseVal.value,
      0,
      Math.PI * 2,
    );
  } else {
    return null;
  }
  const rect = shape.getBoundingClientRect();
  return {
    path,
    matrix: new DOMMatrix([
      ctm.a,
      ctm.b,
      ctm.c,
      ctm.d,
      ctm.e - origin.left,
      ctm.f - origin.top,
    ]),
    bounds: {
      left: rect.left - origin.left,
      top: rect.top - origin.top,
      width: rect.width,
      height: rect.height,
    },
  };
}

const COVERAGE_SAMPLES = 5;

/**
 * Share of a dot cell inside the vector outline. Points are tested against
 * the exact path (no rasterised pixels), so mirror-symmetric letters always
 * produce mirror-symmetric dots.
 */
function getCellCoverage(
  context: CanvasRenderingContext2D,
  path: Path2D,
  x: number,
  y: number,
  step: number,
): number {
  let inside = 0;
  for (let row = 0; row < COVERAGE_SAMPLES; row += 1) {
    for (let column = 0; column < COVERAGE_SAMPLES; column += 1) {
      const px = x + ((column + 0.5) / COVERAGE_SAMPLES - 0.5) * step;
      const py = y + ((row + 0.5) / COVERAGE_SAMPLES - 0.5) * step;
      if (context.isPointInPath(path, px, py)) inside += 1;
    }
  }
  return inside / (COVERAGE_SAMPLES * COVERAGE_SAMPLES);
}

export function buildFooterParticles(
  shapes: SVGGraphicsElement[],
  origin: DOMRect,
  config: FooterParticleConfig,
): FooterParticle[] {
  const context = document.createElement("canvas").getContext("2d");
  if (!context || config.rows === 0) return [];
  const vectors = shapes
    .map((shape) => toVectorShape(shape, origin))
    .filter((shape): shape is VectorShape => shape !== null);
  if (vectors.length === 0) return [];

  // The pitch follows the main letter body, so dots scale with the mark.
  const step = getGridStep(
    Math.max(...vectors.map((shape) => shape.bounds.height)) * 0.75,
    config.rows,
  );
  const radius = step * 0.36;
  const height = origin.height;

  const particles: FooterParticle[] = [];
  for (const shape of vectors) {
    context.setTransform(shape.matrix);
    for (const [x, y] of getGridCells(shape.bounds, step)) {
      if (getCellCoverage(context, shape.path, x, y, step) < 0.5) continue;
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

/**
 * Advances one frame and returns whether any particle is still moving. The
 * check uses the most active dot, not the average: a pointer disturbs only a
 * few dots, and an average would stop the loop before they are home. When
 * everything has settled, dots snap exactly onto the grid.
 */
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
    motion = Math.max(
      motion,
      Math.abs(particle.vx) + Math.abs(particle.vy),
      Math.abs(particle.tx - particle.x) + Math.abs(particle.ty - particle.y),
    );
  }
  if (motion > SETTLED_DISTANCE || pointer.active) return true;
  for (const particle of particles) {
    particle.x = particle.tx;
    particle.y = particle.ty;
    particle.vx = 0;
    particle.vy = 0;
  }
  return false;
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
