"use client";

import { useEffect, useRef } from "react";

const HIDE_TOLERANCE_PX = 24;

/**
 * Hides the site header once the element this marker sits in has scrolled
 * past the top of the viewport (the resting point after the hero snap), and
 * shows it again on the way back up.
 */
export function HeaderAutoHide() {
  const markerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) {
      return;
    }

    const root = document.documentElement;
    let frame = 0;

    function update() {
      frame = 0;
      if (!marker) {
        return;
      }
      root.toggleAttribute(
        "data-header-hidden",
        // Tolerance so a snap that lands a few pixels off keeps it visible.
        marker.getBoundingClientRect().top < -HIDE_TOLERANCE_PX,
      );
    }

    function schedule() {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      root.removeAttribute("data-header-hidden");
    };
  }, []);

  return (
    <span
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-0"
      ref={markerRef}
    />
  );
}
