import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  CaseStudySection,
  type CaseStudySectionProps,
} from "@/components/projects/case-study-section";
import { ProjectPagination } from "@/components/projects/project-pagination";
import { ExternalLink } from "@/components/ui/external-link";
import { ProjectCover } from "@/components/projects/project-cover";
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

  const sections: readonly CaseStudySectionProps[] = [
    {
      id: "context",
      title: labels.context,
      body: [
        content.organization,
        content.location,
        content.period,
        content.status,
      ]
        .filter(Boolean)
        .join(" / "),
    },
    {
      id: "responsibilities",
      title: labels.responsibilities,
      items: content.responsibilities,
    },
    { id: "challenges", title: labels.challenges, items: content.challenges },
    { id: "decisions", title: labels.decisions, items: content.decisions },
    { id: "outcomes", title: labels.outcomes, items: content.outcomes },
    { id: "lessons", title: labels.lessons, items: content.lessons },
  ];
  const visibleSections = sections.filter(
    (section) => section.body || section.items?.length,
  );

  return (
    <>
      <PageIntro
        heading={content.title}
        description={content.description ?? content.summary}
        locale={locale}
        meta={`${labels.category[project.category]} / ${content.role}`}
        variant="document"
      />
      <Section>
        <div className="case-study-layout">
          <nav aria-label={labels.onThisPage} className="case-study-toc">
            <h2>{labels.onThisPage}</h2>
            <ol>
              {visibleSections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ol>
          </nav>
          <div>
            {project.coverImage && content.imageAlt ? (
              <ProjectCover
                alt={content.imageAlt}
                className="mb-[var(--space-8)]"
                priority
                sizes="(min-width: 768px) 42rem, 100vw"
                src={project.coverImage}
              />
            ) : null}
            <div className="project-facts">
              <div>
                <h2>{labels.technologies}</h2>
                <ul>
                  {project.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </div>
              {project.confidential ? (
                <p className="project-disclosure">{labels.sourceNotice}</p>
              ) : null}
              {project.externalUrl ? (
                <ExternalLink href={project.externalUrl}>
                  {labels.visitProject}
                </ExternalLink>
              ) : null}
            </div>

            {visibleSections.map((section) => (
              <CaseStudySection {...section} key={section.id} />
            ))}
          </div>
        </div>
        <ProjectPagination slug={project.slug} locale={locale} />
      </Section>
    </>
  );
}
