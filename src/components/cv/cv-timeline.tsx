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
 * A chronological ledger: dates stay on one reading axis, without
 * alternating cards or implying that overlapping roles were sequential.
 */
export function CvTimeline({ entries, copy, locale }: CvTimelineProps) {
  return (
    <ol className="cv-timeline" role="list">
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
            <div className="cv-timeline__date">
              <p className="cv-timeline__period">{entry.period}</p>
              <p className="cv-timeline__kind">{copy.kinds[entry.kind]}</p>
            </div>
            <article className="cv-timeline__card">
              <header className="cv-timeline__identity">
                <p className="cv-timeline__organization">
                  {entry.organization[locale]}
                </p>
                <h3>{entry.role[locale]}</h3>
                {entry.detail ? (
                  <p className="mt-[var(--space-2)] font-mono text-[length:var(--font-size-xs)] text-[var(--color-foreground-subtle)]">
                    {entry.detail[locale]}
                  </p>
                ) : null}
              </header>
              <div className="cv-timeline__narrative">
                {entry.description ? (
                  <p className="cv-timeline__description">
                    {entry.description[locale]}
                  </p>
                ) : null}
                {related.length > 0 ? (
                  <div className="cv-timeline__projects">
                    <p>{copy.relatedWork}</p>
                    <ul role="list">
                      {related.map((project) =>
                        project ? (
                          <li key={project.slug}>
                            <Link
                              className="text-link"
                              href={createLocalePath(
                                locale,
                                `work/${project.slug}`,
                              )}
                            >
                              {project.content[locale].title}
                              <span aria-hidden="true" className="link-arrow">
                                ↗
                              </span>
                            </Link>
                          </li>
                        ) : null,
                      )}
                    </ul>
                  </div>
                ) : null}
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
