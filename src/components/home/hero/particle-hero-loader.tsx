"use client";

import type { ComponentType } from "react";
import { useEffect, useRef, useState } from "react";

import { ParticleHeroFallback } from "@/components/home/hero/particle-hero-fallback";
import type { ParticleCapabilities } from "@/components/home/hero/hero.types";
import { shouldRunParticleRenderer } from "@/components/home/hero/hero.utils";

type ParticleHeroLoaderProps = {
  label: string;
};

type ParticleCanvasModule = {
  default: ComponentType<{ label: string; isVisible: boolean }>;
};

function getCapabilities(element: HTMLElement): ParticleCapabilities {
  const canvas = document.createElement("canvas");
  const rect = element.getBoundingClientRect();
  const canMatchMedia = typeof window.matchMedia === "function";

  return {
    supportsCanvas: Boolean(canvas.getContext("2d")),
    prefersReducedMotion:
      canMatchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    width: rect.width,
    height: rect.height,
    devicePixelRatio: window.devicePixelRatio,
    pointer:
      canMatchMedia && window.matchMedia("(pointer: fine)").matches
        ? "fine"
        : canMatchMedia && window.matchMedia("(pointer: coarse)").matches
          ? "coarse"
          : "none",
  };
}

export function ParticleHeroLoader({ label }: ParticleHeroLoaderProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [CanvasComponent, setCanvasComponent] = useState<
    ParticleCanvasModule["default"] | null
  >(null);
  const [isVisible, setIsVisible] = useState(false);
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !("IntersectionObserver" in window)) {
      return;
    }

    let cancelled = false;
    let attemptedImport = false;

    function maybeLoad() {
      if (attemptedImport || cancelled || !host) {
        return;
      }
      attemptedImport = true;

      const capabilities = getCapabilities(host);
      if (!shouldRunParticleRenderer(capabilities)) {
        return;
      }

      setCanRender(true);
      import("@/components/home/hero/particle-hero-canvas")
        .then((module: ParticleCanvasModule) => {
          if (!cancelled) {
            setCanvasComponent(() => module.default);
          }
        })
        .catch((error: unknown) => {
          if (process.env.NODE_ENV !== "production") {
            console.warn("Particle hero failed to initialize.", error);
          }
          setCanRender(false);
        });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = Boolean(entry?.isIntersecting);
        setIsVisible(visible);
        if (visible) {
          maybeLoad();
        }
      },
      { rootMargin: "160px 0px", threshold: [0, 0.08, 0.35] },
    );

    observer.observe(host);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="relative h-full min-h-[18rem] overflow-hidden rounded-[var(--radius-lg)]"
      data-particle-host=""
      data-particle-visible={isVisible ? "true" : "false"}
      ref={hostRef}
    >
      {canRender && CanvasComponent ? (
        <CanvasComponent isVisible={isVisible} label={label} />
      ) : (
        <ParticleHeroFallback />
      )}
    </div>
  );
}
