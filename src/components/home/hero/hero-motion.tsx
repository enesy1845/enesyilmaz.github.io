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
  getHeroSnapTarget,
  getLetterTransform,
  getStaggeredProgress,
} from "@/components/home/hero/hero.utils";

type HeroMotionProps = {
  heroId: string;
};

export const HERO_INTRO_STORAGE_KEY = "hero-intro-seen";
const INTRO_MIN_DURATION = 1100;
const INTRO_REVEAL_DURATION = 1400;

/**
 * Time constant (seconds) of the follow-through applied to the animation, not
 * to the page: the page scrolls natively while the hero eases towards the
 * scroll position. This turns coarse wheel steps into one continuous glide.
 */
const SCROLL_SMOOTHING = 0.14;

/** Idle time after the last scroll event before snapping (no `scrollend`). */
const SNAP_IDLE_MS = 140;

function toRect(element: Element): Rect {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height,
  };
}

/**
 * Drives the AIR-style hero: the preloader sequence, the copy fade and the
 * wordmark that docks letter by letter into the site header while scrolling.
 *
 * The letters and copy live in a fixed layer, so the browser keeps them in
 * place during scroll and they never lag a frame behind (no jitter). Only
 * transform/opacity are written, from one rAF loop that runs while the
 * smoothed position is still catching up and stops once it settles.
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
    let heroHeight = 1;
    let headerBottom = 0;
    let frame: number | null = null;
    let introFrame: number | null = null;
    let lastTime: number | null = null;
    let smoothY = window.scrollY;
    let disposed = false;
    const timers: number[] = [];

    function measure() {
      if (disposed) {
        return;
      }
      heroHeight = Math.max(1, heroElement.offsetHeight);
      headerBottom = headerElement.getBoundingClientRect().bottom;
      if (canDock && !introActive) {
        for (const letter of heroLetters) {
          letter.style.transform = "";
        }
        from = heroLetters.map(toRect);
        to = headerLetters.map(toRect);
        // Only the stacked (two-row) wordmark needs words to leave in turn; on
        // one row every letter converges together, as on the AIR reference.
        const tops = from.map((rect) => rect.y);
        const isStacked =
          Math.max(...tops) - Math.min(...tops) > (from[0]?.height ?? 0) / 2;
        stagger = isStacked ? WORDMARK_WORD_STAGGER : 0;
      }
      render(smoothY);
    }

    function render(position: number) {
      if (disposed) {
        return;
      }
      const scrollY = window.scrollY;
      const heroBottom = heroElement.getBoundingClientRect().top + heroHeight;
      const state = getHeroScrollState(scrollY, heroBottom, headerBottom);
      const progress = clampProgress(
        position / (heroHeight * WORDMARK_DOCK_DISTANCE),
      );
      root.dataset.heroState = state;
      if (state === "hero-passed" && progress >= 0.999) {
        root.dataset.heroDocked = "true";
      } else {
        delete root.dataset.heroDocked;
      }
      heroElement.style.setProperty(
        "--hero-fade",
        clampProgress(position / (heroHeight * HERO_FADE_DISTANCE)).toFixed(4),
      );

      if (!canDock || introActive || from.length === 0) {
        return;
      }

      heroLetters.forEach((letter, index) => {
        const start = from[index];
        const end = to[index];
        if (!start || !end) {
          return;
        }
        const transform = getLetterTransform(
          start,
          end,
          0,
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

    function tick(now: number) {
      frame = null;
      const target = window.scrollY;
      const dt = lastTime === null ? 1 / 60 : (now - lastTime) / 1000;
      lastTime = now;
      if (prefersReducedMotion) {
        smoothY = target;
      } else {
        smoothY +=
          (target - smoothY) *
          (1 - Math.exp(-Math.min(dt, 0.1) / SCROLL_SMOOTHING));
      }
      if (Math.abs(target - smoothY) < 0.5) {
        smoothY = target;
      }
      render(smoothY);
      if (smoothY !== target) {
        frame = window.requestAnimationFrame(tick);
      } else {
        lastTime = null;
      }
    }

    /**
     * AIR snaps the intro to its start or end (hero top / hero bottom). When
     * scrolling rests close to either end in the direction of travel, finish
     * the motion; in between, leave the position to the user.
     */
    let lastScrollY = window.scrollY;
    let direction = 0;
    let snapTimer: number | null = null;
    let pointerDown = false;

    function snap() {
      snapTimer = null;
      if (disposed || !canDock || introActive || pointerDown) {
        return;
      }
      const heroTop = heroElement.getBoundingClientRect().top + window.scrollY;
      const end = Math.max(0, heroTop + heroHeight - headerBottom);
      const scrollY = window.scrollY;
      if (scrollY <= 1 || scrollY >= end - 1) {
        return;
      }
      const target = getHeroSnapTarget(scrollY / end, direction);
      if (target !== null) {
        window.scrollTo({ top: target * end, behavior: "smooth" });
      }
    }

    function scheduleSnap() {
      if (snapTimer !== null) {
        window.clearTimeout(snapTimer);
      }
      snapTimer = window.setTimeout(snap, SNAP_IDLE_MS);
    }

    function onPointerDown() {
      pointerDown = true;
    }

    function onPointerUp() {
      pointerDown = false;
      scheduleSnap();
    }

    function onScroll() {
      const scrollY = window.scrollY;
      if (scrollY !== lastScrollY) {
        direction = Math.sign(scrollY - lastScrollY);
        lastScrollY = scrollY;
      }
      scheduleSnap();
      requestApply();
    }

    function requestApply() {
      if (frame === null) {
        frame = window.requestAnimationFrame(tick);
      }
    }

    function requestMeasure() {
      window.requestAnimationFrame(measure);
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
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchend", onPointerUp, { passive: true });
    window.addEventListener("touchcancel", onPointerUp, { passive: true });
    window.addEventListener("resize", requestMeasure);
    void document.fonts?.ready.then(requestMeasure);

    if (introActive) {
      runIntro();
    }
    measure();

    return () => {
      disposed = true;
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
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchend", onPointerUp);
      window.removeEventListener("touchcancel", onPointerUp);
      if (snapTimer !== null) {
        window.clearTimeout(snapTimer);
      }
      window.removeEventListener("resize", requestMeasure);
      for (const letter of heroLetters) {
        letter.style.transform = "";
      }
      delete root.dataset.heroState;
      delete root.dataset.heroDocked;
      delete root.dataset.heroMotion;
      if (root.dataset.heroIntro !== "done") {
        delete root.dataset.heroIntro;
      }
      root.style.removeProperty("--hero-intro");
    };
  }, [heroId]);

  return null;
}
