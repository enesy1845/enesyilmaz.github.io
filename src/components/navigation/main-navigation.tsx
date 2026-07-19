"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigationRoutes } from "@/config/navigation";
import type { Locale } from "@/i18n/config";
import { createPathForRoute, getRouteFromPath } from "@/i18n/routing";
import type { Dictionary } from "@/i18n/types";

type MainNavigationProps = {
  dictionary: Dictionary;
  locale: Locale;
};

export function MainNavigation({ dictionary, locale }: MainNavigationProps) {
  const pathname = usePathname();
  const activeRoute = getRouteFromPath(pathname);

  return (
    <nav aria-label={dictionary.accessibility.mainNavigation}>
      <ul className="flex flex-wrap gap-x-1 gap-y-2 text-[var(--font-size-sm)]">
        {navigationRoutes.map((route) => (
          <li key={route.key}>
            <Link
              aria-current={activeRoute.key === route.key ? "page" : undefined}
              className="inline-flex min-h-10 items-center rounded-[var(--radius-pill)] px-3 text-[var(--color-foreground-muted)] no-underline transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-surface)] hover:text-[var(--color-foreground)] aria-current:bg-[var(--color-surface-muted)] aria-current:text-[var(--color-foreground)]"
              href={createPathForRoute(locale, route)}
            >
              {dictionary.navigation[route.key]}
              {activeRoute.key === route.key ? (
                <span
                  aria-hidden="true"
                  className="ml-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
                />
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
