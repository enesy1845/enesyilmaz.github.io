import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { openGraphLocales, type Locale } from "@/i18n/config";
import type { RouteDefinition } from "@/i18n/routing";
import type { Dictionary } from "@/i18n/types";
import { createLocalizedAlternates } from "@/lib/metadata/alternates";
import { absoluteUrl } from "@/lib/utils/url";

export function createPageMetadata(
  locale: Locale,
  route: RouteDefinition,
  dictionary: Dictionary,
): Metadata {
  const page = dictionary.pages[route.key];
  const alternateLocales = Object.entries(openGraphLocales)
    .filter(([key]) => key !== locale)
    .map(([, value]) => value);

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: createLocalizedAlternates(locale, route),
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: absoluteUrl(`/${locale}${route.segment ? `/${route.segment}` : ""}`),
      siteName: siteConfig.name,
      locale: openGraphLocales[locale],
      alternateLocale: alternateLocales,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}
