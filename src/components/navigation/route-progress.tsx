"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/** Navigations faster than this (prefetched routes) show nothing. */
const SHOW_DELAY_MS = 120;
/** Safety net if a navigation is cancelled and the path never changes. */
const GIVE_UP_MS = 15_000;
const FADE_MS = 450;

type Phase = "idle" | "loading" | "done";

/**
 * Thin top bar shown while an internal page is loading. The App Router has
 * no navigation events, so it starts on internal link clicks and back/forward,
 * and finishes when the pathname changes. Phases are written to a data
 * attribute so the bar never re-renders React; CSS does the animation.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const committedPath = useRef(pathname);
  const pending = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const setPhase = (phase: Phase) => {
      if (barRef.current) barRef.current.dataset.phase = phase;
    };
    const clearTimers = () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    };
    const start = () => {
      clearTimers();
      pending.current = true;
      timers.current.push(
        window.setTimeout(() => {
          if (pending.current) setPhase("loading");
        }, SHOW_DELAY_MS),
        window.setTimeout(() => {
          pending.current = false;
          setPhase("idle");
        }, GIVE_UP_MS),
      );
    };

    // Capture phase: next/link calls preventDefault in its own handler.
    const onClick = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const anchor =
        event.target instanceof Element
          ? event.target.closest("a[href]")
          : null;
      if (
        !(anchor instanceof HTMLAnchorElement) ||
        (anchor.target && anchor.target !== "_self") ||
        anchor.hasAttribute("download")
      ) {
        return;
      }
      const url = new URL(anchor.href, window.location.href);
      if (
        url.origin === window.location.origin &&
        url.pathname !== window.location.pathname
      ) {
        start();
      }
    };
    const onPopState = () => {
      if (window.location.pathname !== committedPath.current) start();
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    return () => {
      clearTimers();
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  useEffect(() => {
    committedPath.current = pathname;
    if (!pending.current) return;
    pending.current = false;
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];

    const bar = barRef.current;
    if (bar?.dataset.phase !== "loading") return;
    bar.dataset.phase = "done";
    timers.current.push(
      window.setTimeout(() => {
        bar.dataset.phase = "idle";
      }, FADE_MS),
    );
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className="route-progress"
      data-phase="idle"
      ref={barRef}
    >
      <div className="route-progress__bar" />
    </div>
  );
}
