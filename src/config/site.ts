import { defaultLocale, locales } from "@/i18n/config";

export const siteConfig = {
  name: "Enes Yilmaz",
  defaultTitle: "Enes Yilmaz - Software Developer",
  titleTemplate: "%s | Enes Yilmaz",
  defaultDescription:
    "The multilingual portfolio foundation for Enes Yilmaz, a software developer building thoughtful systems.",
  author: "Enes Yilmaz",
  defaultLocale,
  locales,
  localUrl: "http://localhost:3000",
  social: {
    github: "https://github.com/enesy1845",
    linkedin: "https://www.linkedin.com/in/enes-yilmaz-026249286",
  },
} as const;
