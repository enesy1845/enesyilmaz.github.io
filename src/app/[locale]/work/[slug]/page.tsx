import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudySection } from "@/components/projects/case-study-section";
import { ExternalLink } from "@/components/ui/external-link";
import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { contentLabels } from "@/data/content-labels";
import { isLocale, locales } from "@/i18n/config";
import { createLocalePath } from "@/i18n/routing";
import { getProjectBySlug, getProjects } from "@/lib/content/projects";
import { createLocalizedAlternates } from "@/lib/metadata/alternates";
import { absoluteUrl } from "@/lib/utils/url";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return getProjects().flatMap((project) =>
    locales.map((locale) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = isLocale(localeParam) ? localeParam : "en";
  const project = getProjectBySlug(slug);

  if (!project || !project.availableLocales.includes(locale)) {
    return {};
  }

  const content = project.content[locale];
  const path = `work/${project.slug}`;

  return {
    title: content.title,
    description: content.summary,
    alternates: createLocalizedAlternates(locale, {
      key: "work",
      segment: path,
    }),
    openGraph: {
      title: content.title,
      description: content.summary,
      url: absoluteUrl(createLocalePath(locale, path)),
      type: "article",
    },
    twitter: {
      card: "summary",
      title: content.title,
      description: content.summary,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = isLocale(localeParam) ? localeParam : "en";
  const project = getProjectBySlug(slug);

  if (!project || !project.availableLocales.includes(locale)) {
    notFound();
  }

  const labels = contentLabels[locale];
  const content = project.content[locale];

  return (
    <>
      <PageIntro
        heading={content.title}
        description={content.description ?? content.summary}
        locale={locale}
        meta={`${labels.category[project.category]} / ${content.role}`}
      />
      <Section container="reading">
        <div className="grid gap-[var(--space-6)]">
          <div>
            <h2 className="font-serif text-[var(--font-size-xl)]">
              {labels.technologies}
            </h2>
            <ul className="mt-[var(--space-4)] flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <li
                  className="rounded-[var(--radius-pill)] border border-[var(--color-border)] px-3 py-1 text-[var(--color-foreground-muted)] text-[var(--font-size-xs)]"
                  key={technology}
                >
                  {technology}
                </li>
              ))}
            </ul>
          </div>
          {project.confidential ? (
            <p className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-4)] text-[var(--color-foreground-muted)] text-[var(--font-size-sm)]">
              {labels.sourceNotice}
            </p>
          ) : null}
          {project.externalUrl ? (
            <ExternalLink href={project.externalUrl}>
              {labels.visitProject}
            </ExternalLink>
          ) : null}
        </div>

        <CaseStudySection
          title={labels.context}
          body={[content.organization, content.location, content.period]
            .filter(Boolean)
            .join(" / ")}
        />
        <CaseStudySection
          title={labels.responsibilities}
          items={content.responsibilities}
        />
        <CaseStudySection
          title={labels.challenges}
          items={content.challenges}
        />
        <CaseStudySection title={labels.decisions} items={content.decisions} />
        <CaseStudySection title={labels.outcomes} items={content.outcomes} />
        <CaseStudySection title={labels.lessons} items={content.lessons} />
      </Section>
    </>
  );
}
