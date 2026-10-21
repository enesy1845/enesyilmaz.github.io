import Link from "next/link";

import type { CvPageCopy, TimelineEntry } from "@/data/cv";
import type { Locale } from "@/i18n/config";
import { createLocalePath } from "@/i18n/routing";
import { getProjectBySlug } from "@/lib/content/projects";

type CvTimelineProps = {
  entries: readonly TimelineEntry[];
  copy: CvPageCopy;
  locale: Locale;
};

/**
 * Semantic ordered list drawn as a thin vertical line with date markers;
 * entries alternate sides on wide screens (CSS only, see cv.css).
 */
export function CvTimeline({ entries, copy, locale }: CvTimelineProps) {
  return (
    <ol className="cv-timeline">
      {entries.map((entry) => {
        const related = (entry.projects ?? [])
          .map((slug) => getProjectBySlug(slug))
          .filter((project) => project?.availableLocales.includes(locale));

        return (
          <li
            className="cv-timeline__item"
            data-kind={entry.kind}
            key={entry.key}
          >
            <p className="cv-timeline__period">{entry.period}</p>
            <article className="cv-timeline__card">
              <p className="cv-timeline__kind">{copy.kinds[entry.kind]}</p>
              <h3 className="font-serif text-[length:var(--font-size-lg)] leading-[var(--line-height-heading)]">
                {entry.role[locale]}
              </h3>
              <p className="mt-[var(--space-1)] text-[length:var(--font-size-sm)] text-[var(--color-foreground-muted)]">
                {entry.organization[locale]}
              </p>
              {entry.detail ? (
                <p className="mt-[var(--space-2)] font-mono text-[length:var(--font-size-xs)] text-[var(--color-foreground-subtle)]">
                  {entry.detail[locale]}
                </p>
              ) : null}
              {entry.description ? (
                <p className="mt-[var(--space-3)] text-[length:var(--font-size-sm)] leading-[var(--line-height-relaxed)] text-[var(--color-foreground-muted)]">
                  {entry.description[locale]}
                </p>
              ) : null}
              {related.length > 0 ? (
                <p className="mt-[var(--space-4)] text-[length:var(--font-size-sm)]">
                  <span className="text-[var(--color-foreground-subtle)]">
                    {copy.relatedWork}:{" "}
                  </span>
                  {related.map((project, index) =>
                    project ? (
                      <span key={project.slug}>
                        {index > 0 ? ", " : null}
                        <Link
                          href={createLocalePath(
                            locale,
                            `work/${project.slug}`,
                          )}
                        >
                          {project.content[locale].title}
                        </Link>
                      </span>
                    ) : null,
                  )}
                </p>
              ) : null}
            </article>
          </li>
        );
      })}
    </ol>
  );
}
