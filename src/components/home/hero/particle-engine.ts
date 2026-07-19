import type {
  ParticlePoint,
  ParticleTierConfig,
  PointerMode,
} from "@/components/home/hero/hero.types";
import {
  getParticleTextLines,
  seededUnit,
} from "@/components/home/hero/hero.utils";

export type PointerState = {
  active: boolean;
  x: number;
  y: number;
  mode: PointerMode;
};

export function detectPointerMode(): PointerMode {
  if (typeof window === "undefined" || !("matchMedia" in window)) {
    return "none";
  }
  if (window.matchMedia("(pointer: fine)").matches) {
    return "fine";
  }
  if (window.matchMedia("(pointer: coarse)").matches) {
    return "coarse";
  }
  return "none";
}

export function buildParticles(
  width: number,
  height: number,
  config: ParticleTierConfig,
): ParticlePoint[] {
  const source = document.createElement("canvas");
  source.width = Math.max(1, Math.round(width));
  source.height = Math.max(1, Math.round(height));
  const context = source.getContext("2d", { willReadFrequently: true });

  if (!context) {
    return [];
  }

  context.clearRect(0, 0, source.width, source.height);
  const lines = getParticleTextLines(width);
  const fontSize = Math.min(width * config.fontScale, height * 0.36);
  context.font = `700 ${fontSize}px Georgia, "Times New Roman", serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "#ffffff";

  const lineHeight = fontSize * 0.88;
  const startY = height / 2 - ((lines.length - 1) * lineHeight) / 2;
  for (const [index, line] of lines.entries()) {
    context.fillText(line, width / 2, startY + index * lineHeight);
  }

  const pixels = context.getImageData(0, 0, source.width, source.height).data;
  const targets: Array<{ x: number; y: number }> = [];

  for (let y = 0; y < source.height; y += config.sampleStep) {
    for (let x = 0; x < source.width; x += config.sampleStep) {
      const alpha = pixels[(y * source.width + x) * 4 + 3] ?? 0;
      if (alpha > 64) {
        targets.push({ x, y });
      }
    }
  }

  const stride = Math.max(1, Math.ceil(targets.length / config.maxParticles));
  const particles: ParticlePoint[] = [];

  for (let index = 0; index < targets.length; index += stride) {
    const target = targets[index];
    if (!target) {
      continue;
    }
    const seedA = seededUnit(index + 1);
    const seedB = seededUnit(index + 17);
    const angle = seedA * Math.PI * 2;
    const spread = Math.min(width, height) * (0.1 + seedB * 0.12);
    particles.push({
      tx: target.x,
      ty: target.y,
      x: target.x + Math.cos(angle) * spread,
      y: target.y + Math.sin(angle) * spread,
      vx: 0,
      vy: 0,
      size: 1.05 + seededUnit(index + 33) * 1.35,
      tone: seededUnit(index + 57),
    });
  }

  return particles;
}

export function drawParticleFrame(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  particles: ParticlePoint[],
  config: ParticleTierConfig,
  pointer: PointerState,
) {
  context.clearRect(0, 0, width, height);

  for (const particle of particles) {
    let dx = particle.tx - particle.x;
    let dy = particle.ty - particle.y;

    if (
      pointer.active &&
      pointer.mode === "fine" &&
      config.interactionRadius > 0
    ) {
      const px = particle.x - pointer.x;
      const py = particle.y - pointer.y;
      const distance = Math.hypot(px, py);
      if (distance > 0 && distance < config.interactionRadius) {
        const force =
          ((config.interactionRadius - distance) / config.interactionRadius) *
          config.displacementStrength;
        dx += (px / distance) * force * config.interactionRadius;
        dy += (py / distance) * force * config.interactionRadius;
      }
    }

    particle.vx = (particle.vx + dx * config.returnForce) * config.damping;
    particle.vy = (particle.vy + dy * config.returnForce) * config.damping;
    particle.vx = Math.max(
      -config.maxVelocity,
      Math.min(config.maxVelocity, particle.vx),
    );
    particle.vy = Math.max(
      -config.maxVelocity,
      Math.min(config.maxVelocity, particle.vy),
    );
    particle.x += particle.vx;
    particle.y += particle.vy;

    const alpha = 0.62 + particle.tone * 0.3;
    const brass = particle.tone > 0.82;
    context.fillStyle = brass
      ? `rgba(185, 155, 93, ${alpha})`
      : `rgba(247, 239, 229, ${alpha})`;
    context.beginPath();
    context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    context.fill();
  }
}
