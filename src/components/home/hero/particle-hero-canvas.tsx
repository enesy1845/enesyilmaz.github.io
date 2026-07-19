"use client";

import { useEffect, useRef } from "react";

import type {
  ParticlePoint,
  ParticleTierConfig,
} from "@/components/home/hero/hero.types";
import {
  buildParticles,
  detectPointerMode,
  drawParticleFrame,
  type PointerState,
} from "@/components/home/hero/particle-engine";
import {
  getCappedDpr,
  getParticleConfig,
} from "@/components/home/hero/hero.utils";

type ParticleHeroCanvasProps = {
  label: string;
  isVisible: boolean;
};

export default function ParticleHeroCanvas({
  label,
  isVisible,
}: ParticleHeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const particlesRef = useRef<ParticlePoint[]>([]);
  const configRef = useRef<ParticleTierConfig | null>(null);
  const pointerRef = useRef<PointerState>({
    active: false,
    x: 0,
    y: 0,
    mode: "none",
  });
  const visibleRef = useRef(isVisible);
  const hiddenRef = useRef(false);
  const startRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    visibleRef.current = isVisible;
  }, [isVisible]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) {
      return;
    }
    const canvasElement = canvas;
    const wrapElement = wrap;
    const context2d = context;

    let destroyed = false;
    let resizeTimer: number | null = null;

    function stopFrame() {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    }

    function rebuild() {
      const rect = wrapElement.getBoundingClientRect();
      const pointer = detectPointerMode();
      const config = getParticleConfig({
        supportsCanvas: true,
        prefersReducedMotion: window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches,
        width: rect.width,
        height: rect.height,
        devicePixelRatio: window.devicePixelRatio,
        pointer,
      });

      if (config.tier === "reduced") {
        particlesRef.current = [];
        return;
      }

      const dpr = getCappedDpr(window.devicePixelRatio, config);
      canvasElement.width = Math.max(1, Math.floor(rect.width * dpr));
      canvasElement.height = Math.max(1, Math.floor(rect.height * dpr));
      canvasElement.style.width = `${rect.width}px`;
      canvasElement.style.height = `${rect.height}px`;
      context2d.setTransform(dpr, 0, 0, dpr, 0, 0);
      configRef.current = config;
      particlesRef.current = buildParticles(rect.width, rect.height, config);
      pointerRef.current.mode = pointer;
    }

    function draw() {
      if (destroyed) {
        return;
      }

      if (!visibleRef.current || hiddenRef.current) {
        stopFrame();
        return;
      }

      const rect = wrapElement.getBoundingClientRect();
      const config = configRef.current;
      const particles = particlesRef.current;
      if (!config || particles.length === 0) {
        return;
      }

      drawParticleFrame(
        context2d,
        rect.width,
        rect.height,
        particles,
        config,
        pointerRef.current,
      );

      frameRef.current = window.requestAnimationFrame(draw);
    }

    function startFrame() {
      if (
        frameRef.current === null &&
        visibleRef.current &&
        !hiddenRef.current
      ) {
        frameRef.current = window.requestAnimationFrame(draw);
      }
    }
    startRef.current = startFrame;

    function scheduleRebuild() {
      if (resizeTimer !== null) {
        window.clearTimeout(resizeTimer);
      }
      resizeTimer = window.setTimeout(() => {
        rebuild();
        startFrame();
      }, 120);
    }

    const resizeObserver = new ResizeObserver(scheduleRebuild);
    resizeObserver.observe(wrapElement);

    function onPointerMove(event: PointerEvent) {
      if (pointerRef.current.mode !== "fine") {
        return;
      }
      const rect = wrapElement.getBoundingClientRect();
      pointerRef.current = {
        active: true,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        mode: "fine",
      };
      startFrame();
    }

    function onPointerLeave() {
      pointerRef.current.active = false;
    }

    function onVisibilityChange() {
      hiddenRef.current = document.visibilityState === "hidden";
      if (hiddenRef.current) {
        stopFrame();
      } else {
        startFrame();
      }
    }

    wrapElement.addEventListener("pointermove", onPointerMove);
    wrapElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);

    rebuild();
    startFrame();

    return () => {
      destroyed = true;
      startRef.current = null;
      stopFrame();
      if (resizeTimer !== null) {
        window.clearTimeout(resizeTimer);
      }
      resizeObserver.disconnect();
      wrapElement.removeEventListener("pointermove", onPointerMove);
      wrapElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      particlesRef.current = [];
    };
  }, []);

  useEffect(() => {
    visibleRef.current = isVisible;
    startRef.current?.();
  }, [isVisible]);

  return (
    <div
      aria-label={label}
      aria-hidden="true"
      className="absolute inset-0"
      data-particle-canvas=""
      ref={wrapRef}
    >
      <canvas className="h-full w-full" ref={canvasRef} />
    </div>
  );
}
