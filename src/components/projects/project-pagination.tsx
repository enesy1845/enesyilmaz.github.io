import Link from "next/link";
import { contentLabels } from "@/data/content-labels";
import type { Locale } from "@/i18n/config";
import { createLocalePath } from "@/i18n/routing";
import { getProjectsForLocale } from "@/lib/content/projects";

export function ProjectPagination({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) {
  const projects = getProjectsForLocale(locale);
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) return null;
  const labels = contentLabels[locale];
  const adjacent = [
    { project: projects[index - 1], label: labels.previousProject },
    { project: projects[index + 1], label: labels.nextProject },
  ];
  return (
    <nav aria-label={labels.projectNavigation} className="project-pagination">
      {adjacent.map(({ project, label }) =>
        project ? (
          <Link
            href={createLocalePath(locale, `work/${project.slug}`)}
            key={project.slug}
          >
            <span className="project-pagination__label">{label}</span>
            <strong>
              {project.content[locale].shortTitle ??
                project.content[locale].title}
            </strong>
            <span aria-hidden="true" className="link-arrow">
              ↗
            </span>
          </Link>
        ) : null,
      )}
    </nav>
  );
}
