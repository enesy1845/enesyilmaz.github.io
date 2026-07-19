import Link from "next/link";

import { ExternalLink } from "@/components/ui/external-link";
import { contentLabels } from "@/data/content-labels";
import type { Locale } from "@/i18n/config";
import { createLocalePath } from "@/i18n/routing";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  locale: Locale;
  index?: number;
  compact?: boolean;
};

export function ProjectCard({
  project,
  locale,
  index,
  compact = false,
}: ProjectCardProps) {
  const labels = contentLabels[locale];
  const content = project.content[locale];
  const title = content.shortTitle ?? content.title;
  const href = createLocalePath(locale, `work/${project.slug}`);

  return (
    <article className="group grid gap-[var(--space-5)] border-t border-[var(--color-border)] py-[var(--space-6)] md:grid-cols-[5rem_minmax(0,1fr)]">
      <div className="flex items-center gap-3 md:block">
        {typeof index === "number" ? (
          <p
            aria-hidden="true"
            className="font-mono text-[var(--color-foreground-subtle)] text-[var(--font-size-sm)]"
          >
            {String(index + 1).padStart(2, "0")}
          </p>
        ) : null}
        <p className="rounded-[var(--radius-pill)] border border-[var(--color-border)] px-3 py-1 font-mono text-[var(--color-foreground-subtle)] text-[var(--font-size-xs)] md:mt-[var(--space-3)]">
          {labels.category[project.category]}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-serif leading-[var(--line-height-heading)] text-[var(--font-size-xl)]">
            <Link
              className="text-[var(--color-foreground)] no-underline hover:text-[var(--color-accent-hover)]"
              href={href}
            >
              {title}
            </Link>
          </h3>
          {project.confidential ? (
            <span className="rounded-[var(--radius-pill)] bg-[var(--color-surface-muted)] px-2.5 py-1 font-mono text-[var(--color-foreground-subtle)] text-[var(--font-size-xs)]">
              {labels.confidential}
            </span>
          ) : null}
        </div>

        <p className="mt-[var(--space-3)] max-w-[var(--layout-reading)] leading-[var(--line-height-relaxed)] text-[var(--color-foreground-muted)] text-[var(--font-size-md)]">
          {content.summary}
        </p>

        <p className="mt-[var(--space-4)] font-mono text-[var(--color-foreground-subtle)] text-[var(--font-size-xs)]">
          {labels.role}: {content.role}
        </p>

        {!compact ? (
          <ul
            aria-label={labels.technologies}
            className="mt-[var(--space-5)] flex flex-wrap gap-2"
          >
            {project.technologies.map((technology) => (
              <li
                className="rounded-[var(--radius-pill)] border border-[var(--color-border)] px-3 py-1 text-[var(--color-foreground-muted)] text-[var(--font-size-xs)]"
                key={technology}
              >
                {technology}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-[var(--space-5)] flex flex-wrap gap-[var(--space-4)] text-[var(--font-size-sm)]">
          <Link href={href}>{labels.readCaseStudy}</Link>
          {project.externalUrl ? (
            <ExternalLink href={project.externalUrl}>
              {labels.visitProject}
            </ExternalLink>
          ) : null}
        </div>
      </div>
    </article>
  );
}
