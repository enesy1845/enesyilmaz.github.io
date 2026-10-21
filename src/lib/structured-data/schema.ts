import { siteConfig } from "@/config/site";
import { socialLinks } from "@/config/social";
import type { Note } from "@/content/notes/notes";
import type { Locale } from "@/i18n/config";
import { createLocalePath } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/utils/url";

export type JsonLd = Record<string, unknown>;

const personId = () => `${absoluteUrl("/en")}#person`;

function personFields(): JsonLd {
  return {
    "@type": "Person",
    "@id": personId(),
    name: siteConfig.author,
    jobTitle: siteConfig.jobTitle,
    url: absoluteUrl("/en"),
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.locality,
      addressCountry: siteConfig.country,
    },
    knowsAbout: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "C#",
      ".NET",
      "Data engineering",
      "Web development",
    ],
    sameAs: socialLinks
      .filter((link) => link.href.startsWith("https://"))
      .map((link) => link.href),
  };
}

export function createPersonJsonLd(): JsonLd {
  return { "@context": "https://schema.org", ...personFields() };
}

export function createWebSiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/en"),
    inLanguage: siteConfig.locales,
    publisher: { "@id": personId() },
  };
}

export function createArticleJsonLd(note: Note): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    description: note.description,
    inLanguage: note.language,
    datePublished: note.publishedAt,
    author: { "@id": personId(), "@type": "Person", name: siteConfig.author },
    mainEntityOfPage: absoluteUrl(
      createLocalePath(note.language, `notes/${note.slug}`),
    ),
  };
}

/** The CV page describes the person, so it is a ProfilePage about them. */
export function createProfilePageJsonLd(locale: Locale): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absoluteUrl(createLocalePath(locale, "cv")),
    inLanguage: locale,
    dateModified: siteConfig.contentUpdatedAt,
    mainEntity: personFields(),
  };
}
