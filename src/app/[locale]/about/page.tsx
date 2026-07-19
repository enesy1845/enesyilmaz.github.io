import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button";
import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
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

  return (
    <>
      <PageIntro
        heading={dictionary.pages.about.heading}
        description={dictionary.pages.about.description}
        locale={locale}
        meta={content.introMeta}
      />
      <Section>
        <div className="grid gap-[var(--space-8)]">
          {content.sections.map((section) => (
            <article
              className="border-t border-[var(--color-border)] pt-[var(--space-6)]"
              key={section.title}
            >
              <h2 className="font-serif text-[var(--font-size-xl)]">
                {section.title}
              </h2>
              <p className="mt-[var(--space-3)] max-w-[var(--layout-reading)] leading-[var(--line-height-relaxed)] text-[var(--color-foreground-muted)]">
                {section.body}
              </p>
            </article>
          ))}
        </div>
      </Section>
      <Section
        className="border-t border-[var(--color-border)]"
        container="reading"
      >
        <SectionHeader
          title={content.closingTitle}
          description={content.closingBody}
        />
        <ButtonLink
          className="mt-[var(--space-6)]"
          href={createLocalePath(locale, "contact")}
          variant="secondary"
        >
          {dictionary.navigation.contact}
        </ButtonLink>
      </Section>
    </>
  );
}
