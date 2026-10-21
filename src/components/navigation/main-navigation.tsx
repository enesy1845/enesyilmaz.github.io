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
      <ul className="main-navigation">
        {navigationRoutes.map((route) => (
          <li key={route.key}>
            <Link
              aria-current={activeRoute.key === route.key ? "page" : undefined}
              className="main-navigation__link"
              href={createPathForRoute(locale, route)}
            >
              {dictionary.navigation[route.key]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
