"use client";

import { useEffect } from "react";

import {
  clampProgress,
  getHeroScrollState,
} from "@/components/home/hero/hero.utils";

type HeroScrollTransitionProps = {
  heroId: string;
};

export function HeroScrollTransition({ heroId }: HeroScrollTransitionProps) {
  useEffect(() => {
    const hero = document.getElementById(heroId);
    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hero || prefersReducedMotion || !("IntersectionObserver" in window)) {
      document.documentElement.dataset.heroState = "hero-passed";
      document.documentElement.style.setProperty("--hero-scroll-progress", "1");
      return;
    }
    const heroElement = hero;

    let frame: number | null = null;

    function update() {
      frame = null;
      const rect = heroElement.getBoundingClientRect();
      const distance = Math.max(1, rect.height - 120);
      const progress = clampProgress((0 - rect.top) / distance);
      const state = getHeroScrollState(progress);
      document.documentElement.dataset.heroState = state;
      document.documentElement.style.setProperty(
        "--hero-scroll-progress",
        progress.toFixed(3),
      );
    }

    function requestUpdate() {
      if (frame === null) {
        frame = window.requestAnimationFrame(update);
      }
    }

    const observer = new IntersectionObserver(requestUpdate, {
      threshold: [0, 0.1, 0.35, 0.7, 1],
    });

    observer.observe(heroElement);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    update();

    return () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      document.documentElement.dataset.heroState = "hero-passed";
      document.documentElement.style.removeProperty("--hero-scroll-progress");
    };
  }, [heroId]);

  return null;
}
