import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { StructuredData } from "@/components/seo/structured-data";
import { siteConfig } from "@/config/site";
import { getNoteBySlug, notes } from "@/content/notes/notes";
import { notesPageContent } from "@/data/supporting-content";
import { contentLabels } from "@/data/content-labels";
import { isLocale, openGraphLocales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { createLocalePath } from "@/i18n/routing";
import { createArticleJsonLd } from "@/lib/structured-data/schema";
import { absoluteUrl } from "@/lib/utils/url";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

// Notes exist only in the language they were written in; other locales 404
// instead of showing an untranslated page as if it were translated.
export const dynamicParams = false;

export function generateStaticParams() {
  return notes.map((note) => ({ locale: note.language, slug: note.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note || note.language !== locale) return {};
  const url = absoluteUrl(
    createLocalePath(note.language, `notes/${note.slug}`),
  );

  return {
    title: note.title,
    description: note.description,
    alternates: { canonical: url },
    openGraph: {
      title: note.title,
      description: note.description,
      url,
      siteName: siteConfig.name,
      locale: openGraphLocales[note.language],
      type: "article",
      publishedTime: note.publishedAt,
      authors: [siteConfig.author],
    },
    twitter: {
      card: "summary",
      title: note.title,
      description: note.description,
    },
  };
}

export default async function NotePage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  const note = getNoteBySlug(slug);
  if (!isLocale(localeParam) || !note || note.language !== localeParam) {
    notFound();
  }
  const locale = localeParam;
  const dictionary = await getDictionary(locale);
  const content = notesPageContent[locale];
  const readingMinutes = Math.max(
    1,
    Math.ceil(note.paragraphs.join(" ").trim().split(/\s+/u).length / 200),
  );
  const published = new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
  }).format(new Date(note.publishedAt));

  return (
    <div className="journal-page">
      <StructuredData data={[createArticleJsonLd(note)]} />
      <PageIntro
        heading={note.title}
        description={note.description}
        locale={locale}
        meta={`${note.category} · ${published}`}
        variant="document"
      />
      <Section>
        <div className="reading-layout">
          <aside className="reading-rail">
            <time dateTime={note.publishedAt}>{published}</time>
            <p>
              {contentLabels[locale].readingMinutes.replace(
                "{minutes}",
                String(readingMinutes),
              )}
            </p>
            <p>{note.category}</p>
          </aside>
          <article className="note-body">
            {note.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </div>
        <p className="mt-[var(--space-10)] border-t border-[var(--color-border)] pt-[var(--space-6)] text-[length:var(--font-size-sm)]">
          <Link href={createLocalePath(locale, "notes")}>
            {dictionary.navigation.notes}
          </Link>
          {note.externalUrl ? (
            <>
              {" · "}
              <a
                href={note.externalUrl}
                rel="noreferrer noopener"
                target="_blank"
              >
                {content.mediumAction}
              </a>
            </>
          ) : null}
        </p>
      </Section>
    </div>
  );
}
