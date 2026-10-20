import { defaultLocale, locales } from "@/i18n/config";

export const siteConfig = {
  name: "Enes Yilmaz",
  /** Visual brand mark used by the hero and header (AIR-style letters). */
  wordmark: "NOI",
  defaultTitle: "Enes Yilmaz - Software Developer",
  titleTemplate: "%s | Enes Yilmaz",
  defaultDescription:
    "The multilingual portfolio foundation for Enes Yilmaz, a software developer building thoughtful systems.",
  author: "Enes Yilmaz",
  defaultLocale,
  locales,
  localUrl: "http://localhost:3000",
} as const;
