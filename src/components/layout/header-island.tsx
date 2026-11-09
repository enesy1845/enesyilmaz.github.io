"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const HIDE_TOLERANCE_PX = 24;

/** Every route supplies a static intro marker. One shared observer owns the
 * glass island, including route changes and restored scroll positions. */
export function HeaderIsland() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.removeAttribute("data-header-hidden");
    const marker = document.querySelector("[data-header-island-trigger]");
    if (!marker || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry)
          root.toggleAttribute(
            "data-header-hidden",
            entry.boundingClientRect.top < -HIDE_TOLERANCE_PX,
          );
      },
      { rootMargin: `${HIDE_TOLERANCE_PX}px 0px 0px 0px` },
    );
    observer.observe(marker);
    return () => {
      observer.disconnect();
      root.removeAttribute("data-header-hidden");
    };
  }, [pathname]);

  return null;
}
