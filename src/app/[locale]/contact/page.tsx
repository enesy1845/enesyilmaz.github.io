import type { Metadata } from "next";

import { ExternalLink } from "@/components/ui/external-link";
import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { socialLinks } from "@/config/social";
import { contentLabels } from "@/data/content-labels";
import { contactPageContent } from "@/data/pages";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { routes } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata/pages";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const route =
  routes.find((candidate) => candidate.key === "contact") ?? routes[0];

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  return createPageMetadata(locale as Locale, route, dictionary);
}

export default async function ContactPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const dictionary = await getDictionary(localeParam);
  const locale = isLocale(localeParam) ? localeParam : "en";
  const content = contactPageContent[locale];
  const labels = contentLabels[locale];

  return (
    <>
      <PageIntro
        heading={dictionary.pages.contact.heading}
        description={content.description}
        locale={locale}
        meta={content.introMeta}
      />
      <Section>
        <div className="grid gap-[var(--space-10)] lg:grid-cols-[18rem_minmax(0,1fr)]">
          <SectionHeader
            title={labels.contactLinks}
            description={content.note}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {socialLinks.map((link) => (
              <article
                className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5)]"
                key={link.key}
              >
                <h2 className="font-serif text-[var(--font-size-xl)]">
                  {link.label}
                </h2>
                <p className="mt-[var(--space-3)] break-words text-[var(--color-foreground-muted)] text-[var(--font-size-sm)]">
                  {link.description}
                </p>
                <ExternalLink
                  className="mt-[var(--space-5)] inline-block"
                  href={link.href}
                >
                  {link.label}
                </ExternalLink>
              </article>
            ))}
          </div>
        </div>
      </Section>
      <Section
        className="border-t border-[var(--color-border)]"
        container="reading"
      >
        <p className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5)] text-[var(--color-foreground-muted)]">
          {labels.noFormNotice}
        </p>
      </Section>
    </>
  );
}
