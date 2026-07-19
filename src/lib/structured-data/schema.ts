import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils/url";

export type JsonLd = Record<string, unknown>;

export function createPersonJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author,
    url: absoluteUrl("/en"),
    sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
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
