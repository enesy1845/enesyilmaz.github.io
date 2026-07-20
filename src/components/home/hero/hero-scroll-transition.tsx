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
    const heroMark = document.querySelector<HTMLElement>(
      "[data-hero-background-mark]",
    );
    const headerMark = document.querySelector<HTMLElement>(
      "[data-header-compact-mark]",
    );
    const siteHeader =
      document.querySelector<HTMLElement>("[data-site-header]");
    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hero || prefersReducedMotion || !("IntersectionObserver" in window)) {
      document.documentElement.dataset.heroState = "hero-passed";
      document.documentElement.style.setProperty("--hero-scroll-progress", "1");
      document.documentElement.style.setProperty("--hero-mark-progress", "1");
      return () => {
        delete document.documentElement.dataset.heroState;
        document.documentElement.style.removeProperty("--hero-scroll-progress");
        document.documentElement.style.removeProperty("--hero-mark-progress");
      };
    }
    const heroElement = hero;

    let frame: number | null = null;

    function updateMarkTarget(markProgress: number) {
      if (!heroMark || !headerMark) {
        return;
      }

      const headerRect = headerMark.getBoundingClientRect();
      const siteHeaderRect = siteHeader?.getBoundingClientRect();
      const heroCenterX = window.innerWidth / 2;
      const headerHeight = siteHeaderRect?.height ?? 0;
      const heroCenterY =
        headerHeight + (window.innerHeight - headerHeight) / 2;
      const targetCenterX = headerRect.left + headerRect.width / 2;
      const targetCenterY = headerRect.top + headerRect.height / 2;
      const scale = headerRect.width / Math.max(1, heroMark.offsetWidth);
      const currentScale = 1 - (1 - scale) * markProgress;

      document.documentElement.style.setProperty(
        "--hero-mark-current-x",
        `${(targetCenterX - heroCenterX) * markProgress}px`,
      );
      document.documentElement.style.setProperty(
        "--hero-mark-current-y",
        `${(targetCenterY - heroCenterY) * markProgress}px`,
      );
      document.documentElement.style.setProperty(
        "--hero-mark-current-scale",
        currentScale.toFixed(4),
      );
    }

    function update() {
      frame = null;
      const rect = heroElement.getBoundingClientRect();
      const distance = Math.max(1, rect.height - 120);
      const progress = clampProgress((0 - rect.top) / distance);
      const markProgress = clampProgress(progress * 2.8);
      updateMarkTarget(markProgress);
      const state = getHeroScrollState(progress);
      document.documentElement.dataset.heroState = state;
      document.documentElement.style.setProperty(
        "--hero-scroll-progress",
        progress.toFixed(3),
      );
      document.documentElement.style.setProperty(
        "--hero-mark-progress",
        markProgress.toFixed(3),
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
    updateMarkTarget(0);
    update();

    return () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      delete document.documentElement.dataset.heroState;
      document.documentElement.style.removeProperty("--hero-scroll-progress");
      document.documentElement.style.removeProperty("--hero-mark-progress");
      document.documentElement.style.removeProperty("--hero-mark-current-x");
      document.documentElement.style.removeProperty("--hero-mark-current-y");
      document.documentElement.style.removeProperty(
        "--hero-mark-current-scale",
      );
    };
  }, [heroId]);

  return null;
}
