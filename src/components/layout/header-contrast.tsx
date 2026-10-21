"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Observe the header's centre line, rather than running code each scroll.
 * Without this enhancement the transparent header stays in normal flow. */
export function HeaderContrast() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const root = document.documentElement;
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    if (!header) return;
    const headerElement = header;

    let observer: IntersectionObserver | undefined;
    const sections = document.querySelectorAll('[data-header-tone="inverse"]');

    function observe() {
      observer?.disconnect();
      const intersecting = new Set<Element>();
      const centre = Math.min(
        Math.floor(headerElement.offsetHeight / 2),
        innerHeight - 1,
      );
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) intersecting.add(entry.target);
            else intersecting.delete(entry.target);
          }
          root.toggleAttribute("data-header-inverse", intersecting.size > 0);
        },
        { rootMargin: `-${centre}px 0px -${innerHeight - centre - 1}px 0px` },
      );
      sections.forEach((section) => observer?.observe(section));
    }

    root.setAttribute("data-header-tone-ready", "");
    root.removeAttribute("data-header-inverse");
    observe();
    window.addEventListener("resize", observe);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", observe);
      root.removeAttribute("data-header-tone-ready");
      root.removeAttribute("data-header-inverse");
    };
  }, [pathname]);

  return null;
}
