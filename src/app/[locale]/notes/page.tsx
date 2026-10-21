import type { Metadata } from "next";
import Link from "next/link";

import { ExternalLink } from "@/components/ui/external-link";
import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { socialLinks } from "@/config/social";
import { notes } from "@/content/notes/notes";
import { notesPageContent } from "@/data/supporting-content";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { createLocalePath, routes } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata/pages";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const route =
  routes.find((candidate) => candidate.key === "notes") ?? routes[0];

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  return createPageMetadata(locale as Locale, route, dictionary);
}

export default async function NotesPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const dictionary = await getDictionary(localeParam);
  const locale = isLocale(localeParam) ? localeParam : "en";
  const content = notesPageContent[locale];
  const medium = socialLinks.find((link) => link.key === "medium");

  return (
    <>
      <PageIntro
        heading={dictionary.pages.notes.heading}
        description={dictionary.pages.notes.description}
        locale={locale}
        meta={content.introMeta}
      />
      <Section>
        <div className="grid gap-[var(--space-10)] lg:grid-cols-[18rem_minmax(0,1fr)]">
          <SectionHeader title={content.featuredTitle} />
          <div>
            {notes.map((note) => (
              <article
                className="border-t border-[var(--color-border)] py-[var(--space-6)]"
                key={note.slug}
                lang={note.language}
              >
                <p className="font-mono text-[var(--color-foreground-subtle)] text-[var(--font-size-xs)]">
                  {note.category}
                  {note.language !== locale
                    ? ` · ${content.languageLabel[note.language]}`
                    : null}
                </p>
                <h2 className="mt-[var(--space-3)] font-serif leading-[var(--line-height-heading)] text-[var(--font-size-xl)]">
                  <Link
                    className="text-[var(--color-foreground)] no-underline hover:text-[var(--color-accent-hover)]"
                    href={createLocalePath(note.language, `notes/${note.slug}`)}
                    hrefLang={note.language}
                  >
                    {note.title}
                  </Link>
                </h2>
                <p className="mt-[var(--space-3)] max-w-[var(--layout-reading)] leading-[var(--line-height-relaxed)] text-[var(--color-foreground-muted)]">
                  {note.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Section>
      <Section className="border-t border-[var(--color-border)]">
        <div className="grid gap-[var(--space-10)] md:grid-cols-2">
          <div>
            <SectionHeader title={content.topicsTitle} />
            <ul className="mt-[var(--space-5)] grid gap-2 text-[var(--color-foreground-muted)]">
              {content.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </div>
          {medium ? (
            <div>
              <SectionHeader
                title={content.mediumTitle}
                description={content.mediumDescription}
              />
              <ExternalLink
                className="mt-[var(--space-5)] inline-block"
                href={medium.href}
              >
                {content.mediumAction}
              </ExternalLink>
            </div>
          ) : null}
        </div>
      </Section>
    </>
  );
}
