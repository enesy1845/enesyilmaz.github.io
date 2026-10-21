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
    <div className="journal-page">
      <PageIntro
        heading={dictionary.pages.notes.heading}
        description={dictionary.pages.notes.description}
        locale={locale}
        meta={content.introMeta}
      />
      <Section>
        <div className="section-heading">
          <h2>{content.featuredTitle}</h2>
          <span className="section-index">
            {String(notes.length).padStart(2, "0")}
          </span>
        </div>
        <div>
          {notes.map((note) => (
            <article
              className="note-index"
              key={note.slug}
              lang={note.language}
            >
              <time className="note-index__date" dateTime={note.publishedAt}>
                {new Intl.DateTimeFormat(locale, {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  timeZone: "UTC",
                }).format(new Date(note.publishedAt))}
              </time>
              <div className="note-index__body">
                <p className="font-mono text-[length:var(--font-size-xs)] text-[var(--color-foreground-subtle)]">
                  {note.category}
                  {note.language !== locale
                    ? ` · ${content.languageLabel[note.language]}`
                    : null}
                </p>
                <h2>
                  <Link
                    href={createLocalePath(note.language, `notes/${note.slug}`)}
                    hrefLang={note.language}
                  >
                    {note.title}
                  </Link>
                </h2>
                <p>{note.description}</p>
                <Link
                  className="text-link"
                  href={createLocalePath(note.language, `notes/${note.slug}`)}
                  hrefLang={note.language}
                >
                  {content.readAction}
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section className="border-t border-[var(--color-border)]">
        <div className="grid gap-[var(--space-10)] md:grid-cols-2">
          <div>
            <SectionHeader title={content.topicsTitle} />
            <ul className="note-topics">
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
    </div>
  );
}
