import type { Metadata } from "next";
import Link from "next/link";

import { HomeHero } from "@/components/home/hero/home-hero";
import { HomeImage } from "@/components/home/home-image";
import { ProjectList } from "@/components/projects/project-list";
import { ButtonLink } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { socialLinks } from "@/config/social";
import { notes } from "@/content/notes/notes";
import { evidenceItems } from "@/data/experience";
import { homeContent } from "@/data/home";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { createLocalePath, routes } from "@/i18n/routing";
import { getFeaturedProjects } from "@/lib/content/projects";
import { createPageMetadata } from "@/lib/metadata/pages";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const route = routes[0];

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  return createPageMetadata(locale as Locale, route, dictionary);
}

export default async function HomePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const dictionary = await getDictionary(localeParam);
  const locale = isLocale(localeParam) ? localeParam : "en";
  const page = homeContent[locale];
  const featuredProjects = getFeaturedProjects();
  const featuredNote = notes[0];
  const contactLinks = socialLinks.filter((link) =>
    ["email", "github", "linkedin"].includes(link.key),
  );
  const mediumUrl =
    socialLinks.find((link) => link.key === "medium")?.href ?? "";

  return (
    <>
      <HomeHero dictionary={dictionary} locale={locale} page={page} />
      <HomeImage />

      <Section
        className="scroll-mt-[var(--layout-header-height)]"
        container="reading"
        id="home-next"
      >
        <SectionHeader
          title={page.manifestoTitle}
          description={page.manifestoText}
        />
      </Section>

      <Section className="border-t border-[var(--color-border)]">
        <div className="grid gap-[var(--space-10)] lg:grid-cols-[18rem_minmax(0,1fr)]">
          <div>
            <SectionHeader
              title={page.selectedWorkTitle}
              description={page.selectedWorkDescription}
            />
            <Link
              className="mt-[var(--space-5)] inline-block"
              href={createLocalePath(locale, "work")}
            >
              {page.allWorkAction}
            </Link>
          </div>
          <ProjectList projects={featuredProjects} locale={locale} />
        </div>
      </Section>

      <Section className="border-t border-[var(--color-border)]">
        <div className="grid gap-[var(--space-8)] lg:grid-cols-[18rem_minmax(0,1fr)]">
          <SectionHeader title={page.expertiseTitle} />
          <div className="grid gap-4 sm:grid-cols-2">
            {evidenceItems.map((item) => {
              const content = item.content[locale];
              return (
                <article
                  className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5)]"
                  key={item.key}
                >
                  <h3 className="font-serif text-[var(--font-size-lg)]">
                    {content.title}
                  </h3>
                  <p className="mt-[var(--space-3)] leading-[var(--line-height-relaxed)] text-[var(--color-foreground-muted)] text-[var(--font-size-sm)]">
                    {content.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </Section>

      <Section className="border-t border-[var(--color-border)]">
        <div className="grid gap-[var(--space-8)]">
          <SectionHeader title={page.disciplinesTitle} />
          <div className="grid gap-4 md:grid-cols-3">
            {page.disciplines.map((item) => (
              <article
                className="border-t border-[var(--color-border)] pt-[var(--space-5)]"
                key={item.title}
              >
                <h3 className="font-serif text-[var(--font-size-xl)]">
                  {item.title}
                </h3>
                <p className="mt-[var(--space-3)] leading-[var(--line-height-relaxed)] text-[var(--color-foreground-muted)]">
                  {item.description}
                </p>
                <Link
                  className="mt-[var(--space-4)] inline-block text-[var(--font-size-sm)]"
                  href={createLocalePath(locale, item.segment)}
                >
                  {item.action}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-t border-[var(--color-border)]">
        <div className="grid gap-[var(--space-6)] md:grid-cols-2">
          <article>
            <h2 className="font-serif text-[var(--font-size-2xl)]">
              {page.notesTitle}
            </h2>
            <p className="mt-[var(--space-4)] leading-[var(--line-height-relaxed)] text-[var(--color-foreground-muted)]">
              {page.notesDescription}
            </p>
            {featuredNote ? (
              <p className="mt-[var(--space-5)]">
                <Link
                  className="font-serif text-[var(--font-size-lg)]"
                  href={createLocalePath(
                    featuredNote.language,
                    `notes/${featuredNote.slug}`,
                  )}
                  hrefLang={featuredNote.language}
                >
                  {featuredNote.title}
                </Link>
              </p>
            ) : null}
            <p className="mt-[var(--space-5)] flex flex-wrap gap-[var(--space-4)]">
              <Link href={createLocalePath(locale, "notes")}>
                {page.notesAction}
              </Link>
              {mediumUrl ? (
                <ExternalLink href={mediumUrl}>
                  {page.mediumAction}
                </ExternalLink>
              ) : null}
            </p>
          </article>
          <article>
            <h2 className="font-serif text-[var(--font-size-2xl)]">
              {page.atelierTitle}
            </h2>
            <p className="mt-[var(--space-4)] leading-[var(--line-height-relaxed)] text-[var(--color-foreground-muted)]">
              {page.atelierDescription}
            </p>
            <ul className="mt-[var(--space-5)] grid gap-2 text-[var(--color-foreground-muted)] text-[var(--font-size-sm)]">
              {page.atelierItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link
              className="mt-[var(--space-5)] inline-block"
              href={createLocalePath(locale, "atelier")}
            >
              {page.atelierAction}
            </Link>
          </article>
        </div>
      </Section>

      <Section className="border-t border-[var(--color-border)]">
        <div className="grid gap-[var(--space-8)] lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            <SectionHeader
              title={page.aboutTitle}
              description={page.aboutDescription}
            />
            <Link
              className="mt-[var(--space-6)] inline-block"
              href={createLocalePath(locale, "about")}
            >
              {page.aboutAction}
            </Link>
          </div>
          <aside className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5)]">
            <h2 className="font-serif text-[var(--font-size-xl)]">
              {page.contactTitle}
            </h2>
            <p className="mt-[var(--space-3)] leading-[var(--line-height-relaxed)] text-[var(--color-foreground-muted)] text-[var(--font-size-sm)]">
              {page.contactDescription}
            </p>
            <div className="mt-[var(--space-5)] flex flex-wrap gap-3">
              <ButtonLink href={createLocalePath(locale, "contact")}>
                {page.contactAction}
              </ButtonLink>
              <ButtonLink
                href={createLocalePath(locale, "cv")}
                variant="secondary"
              >
                {page.cvAction}
              </ButtonLink>
            </div>
            <ul className="mt-[var(--space-5)] flex flex-wrap gap-[var(--space-4)] text-[var(--font-size-sm)]">
              {contactLinks.map((link) => (
                <li key={link.key}>
                  <ExternalLink href={link.href}>{link.label}</ExternalLink>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>
    </>
  );
}
