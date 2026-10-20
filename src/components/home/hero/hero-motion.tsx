"use client";

import { useEffect } from "react";
import {
  getNoiDotPosition,
  getScrollDotPosition,
  NOI_DOT_TOP,
  NOI_MOTION_DURATION,
} from "@/components/brand/noi-motion.utils";

import type { Rect } from "@/components/home/hero/hero.types";
import {
  HERO_FADE_DISTANCE,
  HERO_SNAP_IDLE_MS,
  HERO_SNAP_DURATION_MS,
  WORDMARK_DOCK_DISTANCE,
  WORDMARK_WORD_STAGGER,
  clampProgress,
  easeInOutQuad,
  easeHeroSnap,
  getHeroScrollState,
  getHeroSnapTarget,
  getLetterTransform,
  getStaggeredProgress,
} from "@/components/home/hero/hero.utils";

type HeroMotionProps = {
  heroId: string;
};

const INTRO_MIN_DURATION = 1100;
const INTRO_REVEAL_DURATION = 1400;

/**
 * Time constant (seconds) of the follow-through applied to the animation, not
 * to the page: the page scrolls natively while the hero eases towards the
 * scroll position. This turns coarse wheel steps into one continuous glide.
 */
const SCROLL_SMOOTHING = 0.22;

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
 * A single header logo is inverted into the hero's layout coordinates and
 * returns to its native header position. It never changes DOM nodes or
 * toggles visibility at docking. Hero letters remain the static fallback.
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
    const headerDot =
      headerElement.querySelector<SVGCircleElement>("[data-noi-dot]");
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

    let introActive =
      canDock && root.dataset.heroIntro === "loading" && window.scrollY <= 8;
    if (!introActive) {
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
    let docked = false;
    // Only the initial entrance may bounce. Any scroll hands control to
    // the reversible docking path permanently for this page mount.
    let dotIntroElapsed = introActive ? 0 : NOI_MOTION_DURATION;
    let disposed = false;
    const timers: number[] = [];

    function measure() {
      if (disposed) {
        return;
      }
      heroHeight = Math.max(1, heroElement.offsetHeight);
      headerBottom = headerElement.getBoundingClientRect().bottom;
      if (canDock) {
        for (const letter of headerLetters) {
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
      if (canDock && from.length > 0) root.dataset.heroLogoReady = "true";
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
      // This flag only settles the transform. It never controls visibility.
      if (
        !docked &&
        canDock &&
        !introActive &&
        from.length > 0 &&
        progress >= 0.999
      ) {
        docked = true;
      } else if (docked && progress < 0.98) {
        docked = false;
      }
      if (docked) {
        root.dataset.heroDocked = "true";
      } else {
        delete root.dataset.heroDocked;
      }
      heroElement.style.setProperty(
        "--hero-fade",
        clampProgress(position / (heroHeight * HERO_FADE_DISTANCE)).toFixed(4),
      );

      if (!canDock || from.length === 0) {
        return;
      }

      headerLetters.forEach((letter, index) => {
        const start = from[index];
        const end = to[index];
        if (!start || !end) {
          return;
        }
        const transform = getLetterTransform(
          start,
          end,
          getStaggeredProgress(
            introActive ? 0 : docked ? 1 : progress,
            letterWords[index] ?? 0,
            wordCount,
            stagger,
          ),
        );
        const value = docked
          ? "none"
          : `translate3d(${transform.x.toFixed(2)}px, ${transform.y.toFixed(2)}px, 0) scale(${transform.scale.toFixed(6)})`;
        // Once docked, keep the same element/layer and stop rewriting it.
        if (letter.style.transform !== value) letter.style.transform = value;
        letter.style.setProperty(
          "--hero-logo-scale",
          transform.scale.toFixed(6),
        );
      });
      if (headerDot) {
        const point =
          dotIntroElapsed < NOI_MOTION_DURATION
            ? getNoiDotPosition(dotIntroElapsed / NOI_MOTION_DURATION)
            : getScrollDotPosition(docked ? 1 : progress);
        if (docked) headerDot.removeAttribute("transform");
        else
          headerDot.setAttribute(
            "transform",
            `translate(${(point.x - NOI_DOT_TOP.x).toFixed(3)} ${(point.y - NOI_DOT_TOP.y).toFixed(3)})`,
          );
      }
    }

    function tick(now: number) {
      frame = null;
      const target = window.scrollY;
      const dt = lastTime === null ? 1 / 60 : (now - lastTime) / 1000;
      lastTime = now;
      if (root.dataset.heroIntro !== "loading" && !document.hidden) {
        dotIntroElapsed = Math.min(
          NOI_MOTION_DURATION,
          dotIntroElapsed + Math.min(dt, 0.1) * 1000,
        );
      }
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
      if (
        smoothY !== target ||
        (dotIntroElapsed < NOI_MOTION_DURATION &&
          root.dataset.heroIntro !== "loading")
      ) {
        frame = window.requestAnimationFrame(tick);
      } else {
        lastTime = null;
      }
    }

    /** Nearest-endpoint settling, limited to the intro and interruptible. */
    let snapTimer: number | null = null;
    let snapFrame: number | null = null;
    let snapActive = false;
    let lastSnapY: number | null = null;
    let pointerDown = false;

    function cancelSnap() {
      if (snapTimer !== null) window.clearTimeout(snapTimer);
      if (snapFrame !== null) window.cancelAnimationFrame(snapFrame);
      snapTimer = null;
      snapFrame = null;
      snapActive = false;
    }

    function snap() {
      snapTimer = null;
      if (disposed || !canDock || introActive || pointerDown) {
        return;
      }
      const start = Math.max(
        0,
        heroElement.getBoundingClientRect().top + window.scrollY,
      );
      const end = start + heroHeight;
      const scrollY = window.scrollY;
      if (scrollY <= start + 1 || scrollY >= end - 1) {
        return;
      }
      const target = getHeroSnapTarget((scrollY - start) / heroHeight);
      if (target !== null) {
        const destination = target === 0 ? start : end;
        const startedAt = performance.now();
        snapActive = true;
        function settle(now: number) {
          if (disposed || !snapActive) return;
          const progress = Math.min(
            1,
            (now - startedAt) / HERO_SNAP_DURATION_MS,
          );
          window.scrollTo({
            top: scrollY + (destination - scrollY) * easeHeroSnap(progress),
            behavior: "instant",
          });
          lastSnapY = window.scrollY;
          requestApply();
          if (progress < 1) snapFrame = window.requestAnimationFrame(settle);
          else {
            snapFrame = null;
            snapActive = false;
          }
        }
        snapFrame = window.requestAnimationFrame(settle);
      }
    }

    function scheduleSnap() {
      if (snapActive || !canDock || pointerDown) return;
      if (snapTimer !== null) {
        window.clearTimeout(snapTimer);
      }
      snapTimer = window.setTimeout(snap, HERO_SNAP_IDLE_MS);
    }

    function onPointerDown() {
      cancelSnap();
      pointerDown = true;
    }

    function onPointerUp() {
      pointerDown = false;
      scheduleSnap();
    }

    function onScroll() {
      const scrollY = window.scrollY;
      if (scrollY > 8) dotIntroElapsed = NOI_MOTION_DURATION;
      // Native scroll restoration can happen AFTER the inline script and
      // hydration. Cancel the entrance before it can overlay restored content.
      if (introActive && scrollY > 8) finishIntro();
      // A final asynchronous event from our own tween must not restart
      // settling after the user has cancelled it (for example with Escape).
      if (scrollY !== lastSnapY) scheduleSnap();
      requestApply();
    }

    function requestApply() {
      if (frame === null) {
        frame = window.requestAnimationFrame(tick);
      }
    }

    function requestMeasure() {
      cancelSnap();
      window.requestAnimationFrame(measure);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (
        [
          "ArrowDown",
          "ArrowUp",
          "PageDown",
          "PageUp",
          "Home",
          "End",
          " ",
          "Escape",
        ].includes(event.key)
      )
        cancelSnap();
    }

    function onVisibilityChange() {
      if (document.hidden) cancelSnap();
    }

    function finishIntro() {
      if (introFrame !== null) window.cancelAnimationFrame(introFrame);
      introFrame = null;
      for (const timer of timers) window.clearTimeout(timer);
      timers.length = 0;
      introActive = false;
      root.dataset.heroIntro = "done";
      root.style.removeProperty("--hero-intro");
      smoothY = window.scrollY;
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
        if (disposed || !introActive) return;
        if (window.scrollY > 8) return finishIntro();
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
        requestApply();
        timers.push(window.setTimeout(finishIntro, INTRO_REVEAL_DURATION));
      }

      introFrame = window.requestAnimationFrame(step);
    }

    const resizeObserver = new ResizeObserver(requestMeasure);
    resizeObserver.observe(heroElement);
    resizeObserver.observe(headerElement);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pageshow", onScroll);
    window.addEventListener("wheel", cancelSnap, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("visibilitychange", onVisibilityChange);
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
      cancelSnap();
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
      window.removeEventListener("pageshow", onScroll);
      window.removeEventListener("wheel", cancelSnap);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchend", onPointerUp);
      window.removeEventListener("touchcancel", onPointerUp);
      window.removeEventListener("resize", requestMeasure);
      for (const letter of headerLetters) {
        letter.style.transform = "";
        letter.style.removeProperty("--hero-logo-scale");
      }
      headerDot?.removeAttribute("transform");
      delete root.dataset.heroState;
      delete root.dataset.heroDocked;
      delete root.dataset.heroMotion;
      delete root.dataset.heroLogoReady;
      if (root.dataset.heroIntro !== "done") {
        delete root.dataset.heroIntro;
      }
      root.style.removeProperty("--hero-intro");
    };
  }, [heroId]);

  return null;
}
