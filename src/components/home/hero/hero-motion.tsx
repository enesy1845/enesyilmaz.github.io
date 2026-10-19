"use client";

import { useEffect } from "react";

import type { Rect } from "@/components/home/hero/hero.types";
import {
  HERO_FADE_DISTANCE,
  WORDMARK_DOCK_DISTANCE,
  WORDMARK_WORD_STAGGER,
  clampProgress,
  easeInOutQuad,
  getHeroScrollState,
  getLetterTransform,
  getStaggeredProgress,
} from "@/components/home/hero/hero.utils";

type HeroMotionProps = {
  heroId: string;
};

export const HERO_INTRO_STORAGE_KEY = "hero-intro-seen";
const INTRO_MIN_DURATION = 1100;
const INTRO_REVEAL_DURATION = 1400;

function toRect(element: Element, scrollY: number): Rect {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left,
    y: rect.top + scrollY,
    width: rect.width,
    height: rect.height,
  };
}

/**
 * Drives the AIR-style hero: the preloader sequence, the copy fade and the
 * wordmark that docks letter by letter into the site header while scrolling.
 * All work is transform/opacity only and runs in a single rAF per scroll.
 */
export function HeroMotion({ heroId }: HeroMotionProps) {
  useEffect(() => {
    const root = document.documentElement;
    const hero = document.getElementById(heroId);
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    if (!hero || !header) {
      return;
    }
    const heroElement = hero;
    const headerElement = header;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const heroLetters = Array.from(
      heroElement.querySelectorAll<HTMLElement>("[data-hero-letter]"),
    );
    const headerLetters = Array.from(
      headerElement.querySelectorAll<HTMLElement>("[data-header-letter]"),
    );
    const letterWords = heroLetters.map((letter) =>
      Number(
        letter.closest<HTMLElement>("[data-hero-word]")?.dataset.heroWord ?? 0,
      ),
    );
    const wordCount = Math.max(1, ...letterWords) + 1;
    const canDock =
      !prefersReducedMotion &&
      heroLetters.length > 0 &&
      heroLetters.length === headerLetters.length;

    root.dataset.heroMotion = canDock ? "full" : "reduced";

    let introActive = canDock && root.dataset.heroIntro === "loading";
    if (!canDock && root.dataset.heroIntro) {
      root.dataset.heroIntro = "done";
    }

    let from: Rect[] = [];
    let to: Rect[] = [];
    let stagger = 0;
    let dockDistance = 1;
    let fadeDistance = 1;
    let frame: number | null = null;
    let introFrame: number | null = null;
    const timers: number[] = [];

    function measure() {
      if (!canDock || introActive) {
        return;
      }
      for (const letter of heroLetters) {
        letter.style.transform = "";
      }
      const scrollY = window.scrollY;
      from = heroLetters.map((letter) => toRect(letter, scrollY));
      to = headerLetters.map((letter) => toRect(letter, 0));
      // Only the stacked (two-row) wordmark needs words to leave in turn; on
      // one row every letter converges together, as on the AIR reference.
      const tops = from.map((rect) => rect.y);
      const isStacked =
        Math.max(...tops) - Math.min(...tops) > (from[0]?.height ?? 0) / 2;
      stagger = isStacked ? WORDMARK_WORD_STAGGER : 0;
      apply();
    }

    function apply() {
      frame = null;
      const scrollY = window.scrollY;
      const heroRect = heroElement.getBoundingClientRect();
      const headerRect = headerElement.getBoundingClientRect();
      const height = Math.max(1, heroElement.offsetHeight);
      dockDistance = height * WORDMARK_DOCK_DISTANCE;
      fadeDistance = height * HERO_FADE_DISTANCE;

      root.dataset.heroState = getHeroScrollState(
        scrollY,
        heroRect.bottom,
        headerRect.bottom,
      );
      heroElement.style.setProperty(
        "--hero-fade",
        clampProgress(-heroRect.top / fadeDistance).toFixed(4),
      );
      // Keeps the hero copy pinned in place while it fades, like a sticky
      // layer, so it never slides into the docking letters.
      heroElement.style.setProperty(
        "--hero-pin",
        `${Math.min(Math.max(0, -heroRect.top), fadeDistance).toFixed(1)}px`,
      );

      if (!canDock || introActive || from.length === 0) {
        return;
      }

      const progress = clampProgress(scrollY / dockDistance);
      heroLetters.forEach((letter, index) => {
        const start = from[index];
        const end = to[index];
        if (!start || !end) {
          return;
        }
        const transform = getLetterTransform(
          start,
          end,
          scrollY,
          getStaggeredProgress(
            progress,
            letterWords[index] ?? 0,
            wordCount,
            stagger,
          ),
        );
        letter.style.transform = `translate3d(${transform.x.toFixed(2)}px, ${transform.y.toFixed(2)}px, 0) scale(${transform.scale.toFixed(4)})`;
      });
    }

    function requestApply() {
      if (frame === null) {
        frame = window.requestAnimationFrame(apply);
      }
    }

    function requestMeasure() {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
      frame = window.requestAnimationFrame(measure);
    }

    function finishIntro() {
      introActive = false;
      root.dataset.heroIntro = "done";
      root.style.removeProperty("--hero-intro");
      try {
        window.sessionStorage.setItem(HERO_INTRO_STORAGE_KEY, "1");
      } catch {
        // Storage can be unavailable (private mode); the intro simply replays.
      }
      measure();
    }

    function runIntro() {
      const startedAt = performance.now();
      let assetsReady = false;
      const fontsReady = document.fonts?.ready ?? Promise.resolve();
      void fontsReady.then(() => {
        assetsReady = true;
      });

      function step(now: number) {
        introFrame = null;
        const linear = (now - startedAt) / INTRO_MIN_DURATION;
        const progress = assetsReady ? linear : Math.min(linear, 0.82);
        root.style.setProperty(
          "--hero-intro",
          easeInOutQuad(progress).toFixed(4),
        );
        if (progress < 1) {
          introFrame = window.requestAnimationFrame(step);
          return;
        }
        root.dataset.heroIntro = "reveal";
        timers.push(window.setTimeout(finishIntro, INTRO_REVEAL_DURATION));
      }

      introFrame = window.requestAnimationFrame(step);
    }

    const resizeObserver = new ResizeObserver(requestMeasure);
    resizeObserver.observe(heroElement);
    resizeObserver.observe(headerElement);
    window.addEventListener("scroll", requestApply, { passive: true });
    window.addEventListener("resize", requestMeasure);
    void document.fonts?.ready.then(requestMeasure);

    if (introActive) {
      runIntro();
    }
    measure();
    apply();

    return () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
      if (introFrame !== null) {
        window.cancelAnimationFrame(introFrame);
      }
      for (const timer of timers) {
        window.clearTimeout(timer);
      }
      resizeObserver.disconnect();
      window.removeEventListener("scroll", requestApply);
      window.removeEventListener("resize", requestMeasure);
      for (const letter of heroLetters) {
        letter.style.transform = "";
      }
      delete root.dataset.heroState;
      delete root.dataset.heroMotion;
      if (root.dataset.heroIntro !== "done") {
        delete root.dataset.heroIntro;
      }
      root.style.removeProperty("--hero-intro");
    };
  }, [heroId]);

  return null;
}
