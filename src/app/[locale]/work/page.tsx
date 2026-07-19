import type { Metadata } from "next";

import { ProjectList } from "@/components/projects/project-list";
import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
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
        <div className="grid gap-[var(--space-10)] lg:grid-cols-[18rem_minmax(0,1fr)]">
          <SectionHeader
            title={labels.featured}
            description={dictionary.pages.work.placeholderDescription}
          />
          <ProjectList projects={featuredProjects} locale={locale} />
        </div>
      </Section>
      <Section className="border-t border-[var(--color-border)]">
        <div className="grid gap-[var(--space-10)] lg:grid-cols-[18rem_minmax(0,1fr)]">
          <SectionHeader title={labels.additionalProjects} />
          <ProjectList compact projects={additionalProjects} locale={locale} />
        </div>
      </Section>
    </>
  );
}
