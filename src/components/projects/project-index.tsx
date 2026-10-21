import Link from "next/link";

import { contentLabels } from "@/data/content-labels";
import type { Locale } from "@/i18n/config";
import { createLocalePath } from "@/i18n/routing";
import type { Project } from "@/types/project";

type ProjectIndexProps = {
  projects: readonly Project[];
  locale: Locale;
};

/**
 * Title-first project list: one line per project. On wide screens with a
 * mouse, the summary, stack and screenshot open on hover or keyboard focus;
 * elsewhere the row is simply a link to the case study (see home.css).
 */
export function ProjectIndex({ projects, locale }: ProjectIndexProps) {
  const labels = contentLabels[locale];

  return (
    <ol className="pindex">
      {projects.map((project, index) => {
        const content = project.content[locale];
        const cover =
          project.coverImage && content.imageAlt ? project.coverImage : null;
        const meta = [labels.category[project.category], content.status]
          .filter(Boolean)
          .join(" · ");

        return (
          <li className="pindex__row" key={project.slug}>
            <Link
              className="pindex__link"
              href={createLocalePath(locale, `work/${project.slug}`)}
            >
              <span aria-hidden="true" className="pindex__num">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="pindex__title">{content.title}</span>
              <span className="pindex__meta">{meta}</span>
              <span aria-hidden="true" className="pindex__arrow">
                →
              </span>
            </Link>
            <div className="pindex__detail">
              <div>
                <p>{content.summary}</p>
                <p className="pindex__stack">
                  {project.technologies.join(" · ")}
                </p>
              </div>
            </div>
            {cover ? (
              // Decorative duplicate of the case-study cover, desktop only.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt=""
                aria-hidden="true"
                className="pindex__preview"
                decoding="async"
                height={640}
                loading="lazy"
                src={cover}
                width={1280}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
