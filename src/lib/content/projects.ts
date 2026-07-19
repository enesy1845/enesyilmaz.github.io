import { locales, type Locale } from "@/i18n/config";
import { projects } from "@/content/projects/projects";
import type { Project, ProjectCategory } from "@/types/project";

const categories: readonly ProjectCategory[] = [
  "software",
  "data",
  "web",
  "education",
];

export function getProjects(): readonly Project[] {
  return projects;
}

export function getFeaturedProjects(): readonly Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsForLocale(locale: Locale): readonly Project[] {
  return projects.filter((project) =>
    project.availableLocales.includes(locale),
  );
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function validateProjects(projectList: readonly Project[] = projects) {
  const errors: string[] = [];
  const slugs = new Set<string>();
  const featuredCount = projectList.filter(
    (project) => project.featured,
  ).length;

  if (featuredCount < 3 || featuredCount > 4) {
    errors.push(`Expected 3-4 featured projects, received ${featuredCount}.`);
  }

  for (const project of projectList) {
    if (!project.slug.trim()) {
      errors.push("Project is missing a slug.");
    }

    if (slugs.has(project.slug)) {
      errors.push(`Duplicate project slug: ${project.slug}.`);
    }
    slugs.add(project.slug);

    if (!categories.includes(project.category)) {
      errors.push(`Invalid category for ${project.slug}: ${project.category}.`);
    }

    for (const locale of project.availableLocales) {
      if (!locales.includes(locale)) {
        errors.push(`Invalid locale for ${project.slug}: ${locale}.`);
      }
    }

    if (project.coverImage) {
      for (const locale of project.availableLocales) {
        if (!project.content[locale].imageAlt?.trim()) {
          errors.push(
            `${project.slug} has an image but no ${locale} alt text.`,
          );
        }
      }
    }

    if (project.externalUrl && !isValidUrl(project.externalUrl)) {
      errors.push(`Invalid external URL for ${project.slug}.`);
    }

    if (project.repositoryUrl && !isValidUrl(project.repositoryUrl)) {
      errors.push(`Invalid repository URL for ${project.slug}.`);
    }

    for (const locale of project.availableLocales) {
      const content = project.content[locale];
      if (!content.title.trim()) {
        errors.push(`${project.slug} is missing ${locale} title.`);
      }
      if (!content.summary.trim()) {
        errors.push(`${project.slug} is missing ${locale} summary.`);
      }
      if (!content.role.trim()) {
        errors.push(`${project.slug} is missing ${locale} role.`);
      }
    }
  }

  return errors;
}
