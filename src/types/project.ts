import type { Locale } from "@/i18n/config";

export type ProjectCategory = "software" | "data" | "web" | "education";

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
  imageAlt?: string;
};

export type Project = {
  slug: string;
  category: ProjectCategory;
  technologies: readonly string[];
  disciplines: readonly string[];
  featured: boolean;
  confidential?: boolean;
  externalUrl?: string;
  repositoryUrl?: string;
  coverImage?: string;
  availableLocales: readonly Locale[];
  content: Record<Locale, LocalizedProjectContent>;
};
