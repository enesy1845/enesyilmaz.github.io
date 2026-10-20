"use client";

import { useEffect } from "react";

/** Closing-mark reveal only. The opening dot is owned by HeroMotion. */
export function NoiMotion() {
  useEffect(() => {
    const closing = document.querySelector<HTMLElement>("[data-noi-closing]");
    if (!closing || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.intersectionRatio >= 0.55)
            closing.dataset.noiActive = "true";
          else if (entry.intersectionRatio < 0.12)
            delete closing.dataset.noiActive;
        }
      },
      { threshold: [0, 0.12, 0.55] },
    );
    closing.dataset.noiEnhanced = "true";
    observer.observe(closing);
    return () => {
      observer.disconnect();
      delete closing.dataset.noiEnhanced;
      delete closing.dataset.noiActive;
    };
  }, []);
  return null;
}
