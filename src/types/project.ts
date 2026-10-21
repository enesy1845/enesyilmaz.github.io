import type { Locale } from "@/i18n/config";

export type ProjectCategory = "software" | "data" | "web" | "education" | "ai";

export type LocalizedProjectContent = {
  title: string;
  shortTitle?: string;
  summary: string;
  description?: string;
  role: string;
  organization?: string;
  period?: string;
  location?: string;
  responsibilities?: readonly string[];
  challenges?: readonly string[];
  decisions?: readonly string[];
  outcomes?: readonly string[];
  lessons?: readonly string[];
  /** Plain-language project state, e.g. "In progress"; omitted when done. */
  status?: string;
  imageAlt?: string;
};

export type Project = {
  slug: string;
  category: ProjectCategory;
  technologies: readonly string[];
  disciplines: readonly string[];
  featured: boolean;
  confidential?: boolean;
  /** Public URL only; omit until a real link is confirmed (never "#"). */
  externalUrl?: string;
  repositoryUrl?: string;
  /** Path under /public; cards and case studies render nothing without it. */
  coverImage?: string;
  availableLocales: readonly Locale[];
  content: Record<Locale, LocalizedProjectContent>;
};
