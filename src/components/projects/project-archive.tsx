import Link from "next/link";
import { ProjectFilters } from "@/components/projects/project-filters";
import { contentLabels } from "@/data/content-labels";
import type { Locale } from "@/i18n/config";
import { createLocalePath } from "@/i18n/routing";
import type { Project } from "@/types/project";

export function ProjectArchive({
  projects,
  locale,
}: {
  projects: readonly Project[];
  locale: Locale;
}) {
  const labels = contentLabels[locale];
  return (
    <div className="project-explorer project-archive">
      <ProjectFilters
        projects={projects}
        locale={locale}
        name="archive-work-category"
      />
      <ol>
        {projects.map((project, index) => {
          const content = project.content[locale];
          return (
            <li
              className="archive-row"
              data-project-category={project.category}
              key={project.slug}
            >
              <span aria-hidden="true" className="section-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>
                  <Link
                    className="archive-row__link"
                    href={createLocalePath(locale, `work/${project.slug}`)}
                  >
                    {content.shortTitle ?? content.title}
                  </Link>
                </h3>
                <p className="archive-row__meta">
                  {labels.category[project.category]}
                  {content.status ? ` / ${content.status}` : ""}
                  {project.confidential ? ` / ${labels.confidential}` : ""}
                </p>
              </div>
              <p className="archive-row__stack">
                {project.technologies.slice(0, 3).join(" / ")}
              </p>
              <span aria-hidden="true" className="link-arrow">
                ↗
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
