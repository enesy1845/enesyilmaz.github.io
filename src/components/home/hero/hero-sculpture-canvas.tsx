"use client";

import { useEffect, useRef } from "react";

import type { SculptureTierConfig } from "@/components/home/hero/hero.types";
import {
  getCappedDpr,
  getSculptureConfig,
} from "@/components/home/hero/hero.utils";
import { drawSculptureFrame } from "@/components/home/hero/sculpture-engine";

type HeroSculptureCanvasProps = {
  isVisible: boolean;
};

export default function HeroSculptureCanvas({
  isVisible,
}: HeroSculptureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const visibleRef = useRef(isVisible);
  const startRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) {
      return;
    }
    const canvasElement = canvas;
    const context2d = context;

    let frame: number | null = null;
    let resizeTimer: number | null = null;
    let config: SculptureTierConfig | null = null;
    let size = { width: 0, height: 0 };
    let elapsed = 0;
    let lastTime: number | null = null;
    let lastPaint = 0;

    function resize() {
      const rect = canvasElement.getBoundingClientRect();
      config = getSculptureConfig({
        supportsCanvas: true,
        prefersReducedMotion: window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches,
        width: rect.width,
        height: rect.height,
      });
      const dpr = getCappedDpr(window.devicePixelRatio, config);
      size = { width: rect.width, height: rect.height };
      canvasElement.width = Math.max(1, Math.floor(rect.width * dpr));
      canvasElement.height = Math.max(1, Math.floor(rect.height * dpr));
      context2d.setTransform(dpr, 0, 0, dpr, 0, 0);
      paint();
    }

    function paint() {
      if (config && config.plateCount > 0) {
        drawSculptureFrame(
          context2d,
          size.width,
          size.height,
          config.plateCount,
          elapsed,
        );
      }
    }

    function stop() {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }
      lastTime = null;
    }

    function tick(now: number) {
      frame = null;
      if (!visibleRef.current || document.visibilityState === "hidden") {
        stop();
        return;
      }
      if (lastTime !== null) {
        elapsed += Math.min(0.05, (now - lastTime) / 1000);
      }
      lastTime = now;
      if (!config?.frameInterval || now - lastPaint >= config.frameInterval) {
        lastPaint = now;
        paint();
      }
      frame = window.requestAnimationFrame(tick);
    }

    function start() {
      if (
        frame === null &&
        visibleRef.current &&
        document.visibilityState !== "hidden" &&
        config?.tier !== "reduced"
      ) {
        frame = window.requestAnimationFrame(tick);
      }
    }
    startRef.current = start;

    function scheduleResize() {
      if (resizeTimer !== null) {
        window.clearTimeout(resizeTimer);
      }
      resizeTimer = window.setTimeout(resize, 120);
    }

    function onVisibilityChange() {
      if (document.visibilityState === "hidden") {
        stop();
      } else {
        start();
      }
    }

    const observer = new ResizeObserver(scheduleResize);
    observer.observe(canvasElement);
    document.addEventListener("visibilitychange", onVisibilityChange);
    resize();
    start();

    return () => {
      startRef.current = null;
      stop();
      if (resizeTimer !== null) {
        window.clearTimeout(resizeTimer);
      }
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    visibleRef.current = isVisible;
    if (isVisible) {
      startRef.current?.();
    }
  }, [isVisible]);

  return (
    <canvas
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      data-sculpture-canvas=""
      ref={canvasRef}
    />
  );
}
