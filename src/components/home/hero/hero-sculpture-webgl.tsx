"use client";

import { useEffect, useRef } from "react";

import {
  HELIX_LOOP_MS,
  HELIX_START_PHASE,
  getHelixQuality,
} from "@/components/home/hero/helix-model";
import {
  createHelixRenderer,
  type HelixRenderer,
} from "@/components/home/hero/helix-webgl-engine";
import { getCappedDpr } from "@/components/home/hero/hero.utils";

type HeroSculptureWebglProps = {
  isVisible: boolean;
  onFailure: () => void;
};

export default function HeroSculptureWebgl({
  isVisible,
  onFailure,
}: HeroSculptureWebglProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(isVisible);
  const failureRef = useRef(onFailure);
  const startRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    failureRef.current = onFailure;
  }, [onFailure]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }
    const hostElement = host;

    let engine: HelixRenderer | null = null;
    let canvas: HTMLCanvasElement | null = null;
    let observer: ResizeObserver | null = null;
    let frame: number | null = null;
    let lastTime: number | null = null;
    let lastPaint = 0;
    // Kept within one loop period, so time never accumulates unbounded.
    let elapsed = HELIX_START_PHASE * HELIX_LOOP_MS;
    const quality = getHelixQuality(hostElement.clientWidth);

    function paint() {
      engine?.render(elapsed / HELIX_LOOP_MS);
    }

    function resize() {
      if (!engine) return;
      const width = Math.max(1, hostElement.clientWidth);
      const height = Math.max(1, hostElement.clientHeight);
      engine.setSize(
        width,
        height,
        getCappedDpr(window.devicePixelRatio, quality),
      );
      // Resizing clears the drawing buffer; repaint before the browser does.
      paint();
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
        elapsed = (elapsed + Math.min(80, now - lastTime)) % HELIX_LOOP_MS;
      }
      lastTime = now;
      if (!quality.frameInterval || now - lastPaint >= quality.frameInterval) {
        lastPaint = now;
        paint();
      }
      frame = window.requestAnimationFrame(tick);
    }

    function start() {
      if (
        engine &&
        frame === null &&
        visibleRef.current &&
        document.visibilityState !== "hidden"
      ) {
        frame = window.requestAnimationFrame(tick);
      }
    }

    function teardown() {
      stop();
      startRef.current = null;
      observer?.disconnect();
      observer = null;
      document.removeEventListener("visibilitychange", onVisibilityChange);
      canvas?.removeEventListener("webglcontextlost", onContextLost);
      engine?.dispose();
      engine = null;
      canvas?.remove();
      canvas = null;
    }

    function onVisibilityChange() {
      if (document.visibilityState === "hidden") stop();
      else start();
    }

    // No restore attempt: a lost context hands over to the Canvas 2D fallback.
    function onContextLost() {
      teardown();
      failureRef.current();
    }

    async function init() {
      const element = document.createElement("canvas");
      canvas = element;
      element.setAttribute("aria-hidden", "true");
      element.className = "absolute inset-0 h-full w-full";
      element.dataset.sculptureCanvas = "";
      element.addEventListener("webglcontextlost", onContextLost);
      let created: HelixRenderer;
      try {
        created = await createHelixRenderer(element, quality);
      } catch (error) {
        if (disposed) return;
        if (process.env.NODE_ENV !== "production") {
          console.warn("WebGL sculpture unavailable; using Canvas 2D.", error);
        }
        teardown();
        failureRef.current();
        return;
      }
      if (disposed) {
        created.dispose();
        return;
      }
      engine = created;
      hostElement.appendChild(element);
      resize();
      element.dataset.sculptureRenderer = "webgl";
      observer = new ResizeObserver(resize);
      observer.observe(hostElement);
      document.addEventListener("visibilitychange", onVisibilityChange);
      startRef.current = start;
      start();
    }

    // The backdrop is hidden while the preloader runs, so WebGL setup waits
    // for the intro to finish and the main thread to go idle. It then never
    // competes with the intro animation or the largest contentful paint.
    const root = document.documentElement;
    let disposed = false;
    let idleHandle: number | null = null;
    let paintFrame: number | null = null;
    const introObserver = new MutationObserver(scheduleInit);

    function introRunning() {
      return (
        root.dataset.heroIntro === "loading" ||
        root.dataset.heroIntro === "reveal"
      );
    }

    function scheduleInit() {
      if (disposed || paintFrame !== null || introRunning()) return;
      introObserver.disconnect();
      const run = () => void init();
      // Two frames let the final intro frame (the LCP candidate) paint first.
      paintFrame = window.requestAnimationFrame(() => {
        paintFrame = window.requestAnimationFrame(() => {
          idleHandle =
            typeof window.requestIdleCallback === "function"
              ? window.requestIdleCallback(run, { timeout: 1500 })
              : window.setTimeout(run, 200);
        });
      });
    }

    introObserver.observe(root, { attributeFilter: ["data-hero-intro"] });
    scheduleInit();

    return () => {
      disposed = true;
      introObserver.disconnect();
      if (paintFrame !== null) window.cancelAnimationFrame(paintFrame);
      if (idleHandle !== null) {
        if (typeof window.cancelIdleCallback === "function") {
          window.cancelIdleCallback(idleHandle);
        }
        window.clearTimeout(idleHandle);
      }
      teardown();
    };
  }, []);

  useEffect(() => {
    visibleRef.current = isVisible;
    if (isVisible) {
      startRef.current?.();
    }
  }, [isVisible]);

  return <div className="absolute inset-0" ref={hostRef} />;
}
