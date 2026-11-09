import type { Metadata } from "next";

import { locales, type Locale } from "@/i18n/config";
import { createLocalePath, type RouteDefinition } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/utils/url";

export function createLanguageAlternates(
  route: RouteDefinition,
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};

  for (const locale of locales) {
    languages[locale] = absoluteUrl(createLocalePath(locale, route.segment));
  }

  languages["x-default"] = absoluteUrl(createLocalePath("en", route.segment));

  return {
    canonical: absoluteUrl(createLocalePath("en", route.segment)),
    languages,
  };
}

export function createLocalizedAlternates(
  locale: Locale,
  route: RouteDefinition,
): NonNullable<Metadata["alternates"]> {
  const alternates = createLanguageAlternates(route);
  return {
    ...alternates,
    canonical: absoluteUrl(createLocalePath(locale, route.segment)),
  };
}
