"use client";

import type { ComponentType } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { shouldRunSculpture } from "@/components/home/hero/hero.utils";

type CanvasSculpture = ComponentType<{ isVisible: boolean }>;
type WebglSculpture = ComponentType<{
  isVisible: boolean;
  onFailure: () => void;
}>;

type Sculpture =
  | { renderer: "webgl"; Component: WebglSculpture }
  | { renderer: "canvas2d"; Component: CanvasSculpture };

function warn(message: string, error: unknown) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(message, error);
  }
}

/** WebGL 2 is present and the device is not obviously low-power. */
function prefersWebgl(): boolean {
  if (!("WebGL2RenderingContext" in window)) {
    return false;
  }
  const memory = (navigator as Navigator & { deviceMemory?: number })
    .deviceMemory;
  const cores = navigator.hardwareConcurrency;
  return !(
    (typeof memory === "number" && memory < 4) ||
    (typeof cores === "number" && cores > 0 && cores <= 2)
  );
}

export function HeroSculptureLoader() {
  const hostRef = useRef<HTMLDivElement>(null);
  const cancelledRef = useRef(false);
  const [sculpture, setSculpture] = useState<Sculpture | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const loadCanvas2d = useCallback(() => {
    import("@/components/home/hero/hero-sculpture-canvas")
      .then((module) => {
        if (!cancelledRef.current) {
          setSculpture({ renderer: "canvas2d", Component: module.default });
        }
      })
      .catch((error: unknown) => {
        warn("Hero sculpture failed to initialize.", error);
      });
  }, []);

  // Unmounts the WebGL sculpture (and its loop) before the fallback mounts.
  const onWebglFailure = useCallback(() => {
    setSculpture(null);
    loadCanvas2d();
  }, [loadCanvas2d]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !("IntersectionObserver" in window)) {
      return;
    }

    cancelledRef.current = false;
    let attempted = false;

    function maybeLoad(element: HTMLElement) {
      if (attempted || cancelledRef.current) {
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
      if (!prefersWebgl()) {
        loadCanvas2d();
        return;
      }
      import("@/components/home/hero/hero-sculpture-webgl")
        .then((module) => {
          if (!cancelledRef.current) {
            setSculpture({ renderer: "webgl", Component: module.default });
          }
        })
        .catch((error: unknown) => {
          warn("WebGL sculpture failed to load; using Canvas 2D.", error);
          loadCanvas2d();
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
      cancelledRef.current = true;
      observer.disconnect();
    };
  }, [loadCanvas2d]);

  return (
    <div
      aria-hidden="true"
      className="hero-sculpture"
      data-sculpture-host=""
      data-sculpture-ready={sculpture ? "true" : "false"}
      data-sculpture-renderer={sculpture?.renderer ?? "none"}
      data-sculpture-visible={isVisible ? "true" : "false"}
      ref={hostRef}
    >
      {sculpture?.renderer === "webgl" ? (
        <sculpture.Component isVisible={isVisible} onFailure={onWebglFailure} />
      ) : sculpture ? (
        <sculpture.Component isVisible={isVisible} />
      ) : null}
    </div>
  );
}
