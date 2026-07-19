import { siteConfig } from "@/config/site";
import { socialLinks } from "@/config/social";
import { absoluteUrl } from "@/lib/utils/url";

export type JsonLd = Record<string, unknown>;

export function createPersonJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author,
    url: absoluteUrl("/en"),
    sameAs: socialLinks
      .filter((link) => link.href.startsWith("https://"))
      .map((link) => link.href),
  };
}

export function createWebSiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/en"),
    inLanguage: siteConfig.locales,
  };
}
