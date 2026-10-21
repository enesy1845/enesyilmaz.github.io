import { defaultLocale, locales } from "@/i18n/config";

export const siteConfig = {
  name: "Enes Yılmaz",
  /** Visual brand mark used by the hero and header (AIR-style letters). */
  wordmark: "noi",
  defaultTitle: "Enes Yılmaz | Software Developer & Python Engineer",
  titleTemplate: "%s | Enes Yılmaz",
  defaultDescription:
    "Enes Yılmaz is a software developer based in Norway, working with Python, React, .NET, data engineering and modern web applications.",
  author: "Enes Yılmaz",
  jobTitle: "Software Developer",
  locality: "Asker",
  country: "NO",
  /**
   * Date the site content was last reviewed. Update it whenever the
   * published copy or CV data changes; the sitemap and CV use it.
   */
  contentUpdatedAt: "2026-10-21",
  defaultLocale,
  locales,
  localUrl: "http://localhost:3000",
} as const;
