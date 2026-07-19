import type { MetadataRoute } from "next";

import { locales } from "@/i18n/config";
import { routes } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/utils/url";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: absoluteUrl(`/${locale}${route.segment ? `/${route.segment}` : ""}`),
      lastModified: new Date("2026-07-19"),
      changeFrequency: "monthly" as const,
      priority: route.key === "home" ? 1 : 0.7,
    })),
  );
}
