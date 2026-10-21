import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { notes } from "@/content/notes/notes";
import { locales, type Locale } from "@/i18n/config";
import { createLocalePath, routes } from "@/i18n/routing";
import { getProjects } from "@/lib/content/projects";
import { absoluteUrl } from "@/lib/utils/url";

const updated = new Date(siteConfig.contentUpdatedAt);

function languages(segment: string, available: readonly Locale[] = locales) {
  return Object.fromEntries([
    ...available.map((locale) => [
      locale,
      absoluteUrl(createLocalePath(locale, segment)),
    ]),
    ["x-default", absoluteUrl(createLocalePath("en", segment))],
  ]);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: absoluteUrl(createLocalePath(locale, route.segment)),
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: route.key === "home" ? 1 : route.key === "cv" ? 0.9 : 0.7,
      alternates: { languages: languages(route.segment) },
    })),
  );

  const projects = getProjects().flatMap((project) =>
    project.availableLocales.map((locale) => ({
      url: absoluteUrl(createLocalePath(locale, `work/${project.slug}`)),
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.6 : 0.4,
      alternates: {
        languages: languages(`work/${project.slug}`, project.availableLocales),
      },
    })),
  );

  const articles = notes.map((note) => ({
    url: absoluteUrl(createLocalePath(note.language, `notes/${note.slug}`)),
    lastModified: new Date(note.publishedAt),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...pages, ...projects, ...articles];
}
