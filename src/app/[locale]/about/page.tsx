import type { Metadata } from "next";
import Link from "next/link";

import { ClosingInvite } from "@/components/ui/closing-invite";
import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { contentLabels } from "@/data/content-labels";
import { siteConfig } from "@/config/site";
import { aboutPageContent } from "@/data/pages";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { createLocalePath, routes } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata/pages";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const route =
  routes.find((candidate) => candidate.key === "about") ?? routes[0];

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  return createPageMetadata(locale as Locale, route, dictionary);
}

export default async function AboutPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const dictionary = await getDictionary(localeParam);
  const locale = isLocale(localeParam) ? localeParam : "en";
  const content = aboutPageContent[locale];
  const destinations = ["cv", "work", "notes", "atelier"] as const;

  return (
    <div className="about-page">
      <PageIntro
        heading={dictionary.pages.about.heading}
        description={dictionary.pages.about.description}
        eyebrow={siteConfig.author}
        locale={locale}
        meta={content.introMeta}
      />
      <Section className="about-narrative">
        <div className="about-overview">
          <nav
            className="about-contents"
            aria-label={contentLabels[locale].onThisPage}
          >
            <ol role="list">
              {content.sections.map((section, index) => (
                <li key={section.title}>
                  <a href={`#about-${index + 1}`}>
                    <span aria-hidden="true">0{index + 1}</span>
                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="about-chapters">
            {content.sections.map((section, index) => {
              const destination = destinations[index];
              return (
                <article
                  className="about-chapter"
                  id={`about-${index + 1}`}
                  key={section.title}
                >
                  <header>
                    <span aria-hidden="true" className="section-index">
                      0{index + 1}
                    </span>
                    <h2>{section.title}</h2>
                  </header>
                  {section.lead ? (
                    <p className="about-chapter__lead">{section.lead}</p>
                  ) : null}
                  <p>{section.body}</p>
                  {destination ? (
                    <Link
                      className="text-link"
                      href={createLocalePath(locale, destination)}
                    >
                      {dictionary.navigation[destination]}
                      <span aria-hidden="true">↗</span>
                    </Link>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </Section>
      <ClosingInvite
        title={content.closingTitle}
        description={content.closingBody}
        primary={{
          href: createLocalePath(locale, "cv"),
          label: content.cvAction,
        }}
      />
    </div>
  );
}
