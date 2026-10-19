"use client";

import type { ComponentType } from "react";
import { useEffect, useRef, useState } from "react";

import { shouldRunSculpture } from "@/components/home/hero/hero.utils";

type SculptureModule = {
  default: ComponentType<{ isVisible: boolean }>;
};

export function HeroSculptureLoader() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [Canvas, setCanvas] = useState<SculptureModule["default"] | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !("IntersectionObserver" in window)) {
      return;
    }

    let cancelled = false;
    let attempted = false;

    function maybeLoad(element: HTMLElement) {
      if (attempted || cancelled) {
        return;
      }
      attempted = true;
      const rect = element.getBoundingClientRect();
      const capable = shouldRunSculpture({
        supportsCanvas: Boolean(
          document.createElement("canvas").getContext("2d"),
        ),
        prefersReducedMotion:
          typeof window.matchMedia === "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        width: rect.width,
        height: rect.height,
      });
      if (!capable) {
        return;
      }
      import("@/components/home/hero/hero-sculpture-canvas")
        .then((module: SculptureModule) => {
          if (!cancelled) {
            setCanvas(() => module.default);
          }
        })
        .catch((error: unknown) => {
          if (process.env.NODE_ENV !== "production") {
            console.warn("Hero sculpture failed to initialize.", error);
          }
        });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = Boolean(entry?.isIntersecting);
        setIsVisible(visible);
        if (visible) {
          maybeLoad(host);
        }
      },
      { threshold: [0, 0.05] },
    );
    // The host is a fixed layer that never leaves the viewport, so track the
    // hero section itself to pause rendering once it has scrolled away.
    observer.observe(host.closest("[data-home-hero]") ?? host);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="hero-sculpture"
      data-sculpture-host=""
      data-sculpture-ready={Canvas ? "true" : "false"}
      data-sculpture-visible={isVisible ? "true" : "false"}
      ref={hostRef}
    >
      {Canvas ? <Canvas isVisible={isVisible} /> : null}
    </div>
  );
}
