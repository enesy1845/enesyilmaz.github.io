"use client";

import type { ComponentType, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type ParticlesCanvas = ComponentType<{
  isVisible: boolean;
  onReady: () => void;
}>;

/**
 * Hosts the static footer wordmark and swaps in the particle canvas once the
 * footer approaches the viewport. The static letters stay visible until the
 * first particle frame has painted, and remain for reduced motion or no JS.
 */
export function FooterParticlesLoader({ children }: { children: ReactNode }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [Canvas, setCanvas] = useState<ParticlesCanvas | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const onReady = useCallback(() => setIsReady(true), []);

  useEffect(() => {
    const host = hostRef.current;
    if (
      !host ||
      !("IntersectionObserver" in window) ||
      (typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    ) {
      return;
    }

    let cancelled = false;
    let attempted = false;

    // Load slightly ahead of time; animate only while actually on screen.
    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || attempted) return;
        attempted = true;
        loadObserver.disconnect();
        import("@/components/layout/footer-particles-canvas")
          .then((module) => {
            if (!cancelled) setCanvas(() => module.default);
          })
          .catch((error: unknown) => {
            if (process.env.NODE_ENV !== "production") {
              console.warn("Footer particles failed to load.", error);
            }
          });
      },
      { rootMargin: "300px 0px" },
    );
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => setIsVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.25 },
    );
    loadObserver.observe(host);
    visibilityObserver.observe(host);

    return () => {
      cancelled = true;
      loadObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="footer-mark"
      data-footer-mark=""
      data-footer-mark-ready={isReady ? "true" : "false"}
      ref={hostRef}
    >
      {children}
      {Canvas ? <Canvas isVisible={isVisible} onReady={onReady} /> : null}
    </div>
  );
}
