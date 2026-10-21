import Link from "next/link";

import { ProjectFilters } from "@/components/projects/project-filters";
import { ProjectVisual } from "@/components/projects/project-visual";
import { contentLabels } from "@/data/content-labels";
import type { Locale } from "@/i18n/config";
import { createLocalePath } from "@/i18n/routing";
import type { Project } from "@/types/project";

type ProjectIndexProps = {
  projects: readonly Project[];
  locale: Locale;
};

/** CSS connects list hover/focus to one stationary preview, including without JS. */
export function ProjectIndex({ projects, locale }: ProjectIndexProps) {
  const labels = contentLabels[locale];

  return (
    <div className="project-explorer">
      <ProjectFilters
        projects={projects}
        locale={locale}
        name="selected-work-category"
      />
      <ol className="work-index">
        {projects.map((project, index) => {
          const content = project.content[locale];

          return (
            <li
              className="work-index__item"
              data-project-category={project.category}
              key={project.slug}
            >
              <Link
                aria-label={content.shortTitle ?? content.title}
                className="work-index__link"
                href={createLocalePath(locale, `work/${project.slug}`)}
              >
                <span aria-hidden="true" className="work-index__visual">
                  <ProjectVisual project={project} locale={locale} />
                </span>
                <span className="work-index__body">
                  <span className="work-index__meta">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{labels.category[project.category]}</span>
                    {content.status ? <span>{content.status}</span> : null}
                  </span>
                  <span className="work-index__title">
                    {content.shortTitle ?? content.title}
                  </span>
                  <span className="work-index__summary sr-only">
                    {content.summary}
                  </span>
                  <span className="work-index__stack">
                    {project.technologies.slice(0, 3).join(" / ")}
                  </span>
                </span>
                <span aria-hidden="true" className="link-arrow">
                  ↗
                </span>
              </Link>
              <div
                aria-hidden="true"
                className="work-preview"
                data-preview={project.slug}
              >
                <ProjectVisual project={project} locale={locale} />
                <div className="work-preview__caption">
                  <span className="section-index">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {labels.category[project.category]}
                    {project.confidential ? ` / ${labels.confidential}` : ""}
                  </span>
                  <strong>{content.shortTitle ?? content.title}</strong>
                  <p>{content.summary}</p>
                  <span className="work-preview__role">{content.role}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
