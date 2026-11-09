import type { Metadata } from "next";

import { ProjectIndex } from "@/components/projects/project-index";
import { ProjectArchive } from "@/components/projects/project-archive";
import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { contentLabels } from "@/data/content-labels";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { routes } from "@/i18n/routing";
import { getFeaturedProjects, getProjects } from "@/lib/content/projects";
import { createPageMetadata } from "@/lib/metadata/pages";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const route = routes.find((candidate) => candidate.key === "work") ?? routes[0];

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  return createPageMetadata(locale as Locale, route, dictionary);
}

export default async function WorkPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const dictionary = await getDictionary(localeParam);
  const locale = isLocale(localeParam) ? localeParam : "en";
  const labels = contentLabels[locale];
  const featuredProjects = getFeaturedProjects();
  const additionalProjects = getProjects().filter(
    (project) => !project.featured,
  );

  return (
    <>
      <PageIntro
        heading={dictionary.pages.work.heading}
        description={dictionary.pages.work.description}
        locale={locale}
        meta={labels.sourceNotice}
      />
      <Section>
        <div className="section-heading">
          <h2>{labels.featured}</h2>
          <p className="section-caption">
            {dictionary.pages.work.featuredDescription}
          </p>
        </div>
        <ProjectIndex projects={featuredProjects} locale={locale} />
      </Section>
      <Section className="border-t border-[var(--color-border)]">
        <div className="section-heading">
          <h2>{labels.additionalProjects}</h2>
          <span className="section-index">
            {String(additionalProjects.length).padStart(2, "0")}
          </span>
        </div>
        <ProjectArchive projects={additionalProjects} locale={locale} />
      </Section>
    </>
  );
}
