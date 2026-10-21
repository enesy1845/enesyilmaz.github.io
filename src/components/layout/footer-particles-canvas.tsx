"use client";

import { useEffect, useRef } from "react";

import {
  buildFooterParticles,
  detectPointerMode,
  drawFooterParticles,
  getFooterParticleConfig,
  stepFooterParticles,
  type FooterParticle,
  type FooterParticleConfig,
  type PointerState,
} from "@/components/layout/footer-particles-engine";

type FooterParticlesCanvasProps = {
  isVisible: boolean;
  onReady: () => void;
};

export default function FooterParticlesCanvas({
  isVisible,
  onReady,
}: FooterParticlesCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const visibleRef = useRef(isVisible);
  const readyRef = useRef(onReady);
  const startRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    readyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.closest<HTMLElement>("[data-footer-mark]");
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !host || !context) {
      return;
    }
    const canvasElement = canvas;
    const hostElement = host;
    const context2d = context;

    let particles: FooterParticle[] = [];
    let config: FooterParticleConfig | null = null;
    let size = { width: 0, height: 0 };
    let ink = "#000";
    let frame: number | null = null;
    let resizeTimer: number | null = null;
    let assembled = false;
    let announced = false;
    const pointer: PointerState = { active: false, x: 0, y: 0 };

    function rebuild() {
      const rect = canvasElement.getBoundingClientRect();
      config = getFooterParticleConfig(
        rect.width,
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        detectPointerMode(),
      );
      const dpr = Math.max(
        1,
        Math.min(window.devicePixelRatio || 1, config.maxDpr),
      );
      size = { width: rect.width, height: rect.height };
      canvasElement.width = Math.max(1, Math.floor(rect.width * dpr));
      canvasElement.height = Math.max(1, Math.floor(rect.height * dpr));
      context2d.setTransform(dpr, 0, 0, dpr, 0, 0);
      ink = getComputedStyle(hostElement).color;
      const shapes = Array.from(
        hostElement.querySelectorAll<SVGGraphicsElement>(
          "[data-footer-mark-letters] path, [data-footer-mark-letters] circle",
        ),
      );
      particles = buildFooterParticles(shapes, rect, config);
      // After the first assembly, a resize snaps straight to the new layout.
      if (assembled) {
        for (const particle of particles) {
          particle.x = particle.tx;
          particle.y = particle.ty;
        }
        drawFooterParticles(
          context2d,
          size.width,
          size.height,
          particles,
          ink,
          config?.dot ?? "circle",
        );
      }
    }

    function stop() {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }
    }

    function tick() {
      frame = null;
      if (!visibleRef.current || document.visibilityState === "hidden") {
        return;
      }
      const moving = stepFooterParticles(
        particles,
        pointer,
        config?.interactionRadius ?? 0,
      );
      drawFooterParticles(
        context2d,
        size.width,
        size.height,
        particles,
        ink,
        config?.dot ?? "circle",
      );
      if (!announced) {
        announced = true;
        readyRef.current();
      }
      // A settled mark costs nothing: the loop restarts on pointer input.
      if (moving || pointer.active) {
        frame = window.requestAnimationFrame(tick);
      } else {
        assembled = true;
      }
    }

    function start() {
      if (
        frame === null &&
        particles.length > 0 &&
        visibleRef.current &&
        document.visibilityState !== "hidden"
      ) {
        frame = window.requestAnimationFrame(tick);
      }
    }
    startRef.current = start;

    function scheduleRebuild() {
      if (resizeTimer !== null) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        rebuild();
        start();
      }, 120);
    }

    function onPointerMove(event: PointerEvent) {
      if (!config?.interactionRadius || event.pointerType !== "mouse") return;
      const rect = canvasElement.getBoundingClientRect();
      pointer.active = true;
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      start();
    }

    function onPointerLeave() {
      pointer.active = false;
    }

    function onVisibilityChange() {
      if (document.visibilityState === "hidden") stop();
      else start();
    }

    const observer = new ResizeObserver(scheduleRebuild);
    observer.observe(canvasElement);
    hostElement.addEventListener("pointermove", onPointerMove);
    hostElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    rebuild();
    start();

    return () => {
      startRef.current = null;
      stop();
      if (resizeTimer !== null) window.clearTimeout(resizeTimer);
      observer.disconnect();
      hostElement.removeEventListener("pointermove", onPointerMove);
      hostElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      particles = [];
    };
  }, []);

  useEffect(() => {
    visibleRef.current = isVisible;
    if (isVisible) startRef.current?.();
  }, [isVisible]);

  return (
    <canvas
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      data-footer-particles=""
      ref={canvasRef}
    />
  );
}
