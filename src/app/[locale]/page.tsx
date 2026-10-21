import type { Metadata } from "next";
import Link from "next/link";

import { HomeHero } from "@/components/home/hero/home-hero";
import { HomeImage } from "@/components/home/home-image";
import { InkReveal } from "@/components/home/ink-reveal";
import { ProjectIndex } from "@/components/projects/project-index";
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
  const email = socialLinks.find((link) => link.key === "email");
  const profileLinks = socialLinks.filter((link) =>
    ["linkedin", "github"].includes(link.key),
  );
  const mediumUrl =
    socialLinks.find((link) => link.key === "medium")?.href ?? "";

  return (
    <>
      <HomeHero dictionary={dictionary} locale={locale} page={page} />
      <HomeImage />

      <Section
        className="scroll-mt-[var(--layout-header-height)]"
        id="home-next"
      >
        <h2 className="sr-only">{page.manifestoTitle}</h2>
        <InkReveal
          className="max-w-5xl"
          text={`${page.manifestoTitle} ${page.manifestoText}`}
        />
      </Section>

      <Section className="border-t border-[var(--color-border)]">
        <div className="reveal grid gap-[var(--space-10)] lg:grid-cols-[18rem_minmax(0,1fr)]">
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
          <ProjectIndex projects={featuredProjects} locale={locale} />
        </div>
      </Section>

      <Section className="border-t border-[var(--color-border)]">
        <div className="reveal grid gap-[var(--space-8)] lg:grid-cols-[18rem_minmax(0,1fr)]">
          <SectionHeader title={page.expertiseTitle} />
          <ul className="label-rows">
            {evidenceItems.map((item) => {
              const content = item.content[locale];
              return (
                <li key={item.key}>
                  <strong>{content.title}</strong>
                  <span>{content.description}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      <Section className="border-t border-[var(--color-border)]">
        <div className="reveal grid gap-[var(--space-10)]">
          <SectionHeader title={page.disciplinesTitle} />
          <ul className="disciplines">
            {page.disciplines.map((item) => (
              <li key={item.title}>
                <Link
                  className="discipline"
                  href={createLocalePath(locale, item.segment)}
                >
                  <span className="discipline__word">{item.title}</span>
                  <span className="discipline__text">{item.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="border-t border-[var(--color-border)]">
        <div className="reveal grid gap-[var(--space-10)] md:grid-cols-2">
          <article>
            <h2 className="font-mono text-[length:var(--font-size-xs)] tracking-[var(--letter-spacing-label)] text-[var(--color-foreground-subtle)]">
              {page.notesTitle}
            </h2>
            {featuredNote ? (
              <h3 className="mt-[var(--space-4)] font-serif text-[length:var(--font-size-2xl)] leading-[var(--line-height-heading)] text-balance">
                <Link
                  className="text-[var(--color-foreground)] no-underline hover:text-[var(--color-accent-hover)]"
                  href={createLocalePath(
                    featuredNote.language,
                    `notes/${featuredNote.slug}`,
                  )}
                  hrefLang={featuredNote.language}
                >
                  {featuredNote.title}
                </Link>
              </h3>
            ) : null}
            <p className="mt-[var(--space-5)] flex flex-wrap gap-[var(--space-4)] text-[length:var(--font-size-sm)]">
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
            <h2 className="font-mono text-[length:var(--font-size-xs)] tracking-[var(--letter-spacing-label)] text-[var(--color-foreground-subtle)]">
              {page.atelierTitle}
            </h2>
            <ul className="mt-[var(--space-4)] font-serif text-[length:var(--font-size-2xl)] leading-[var(--line-height-heading)]">
              {page.atelierItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link
              className="mt-[var(--space-5)] inline-block text-[length:var(--font-size-sm)]"
              href={createLocalePath(locale, "atelier")}
            >
              {page.atelierAction}
            </Link>
          </article>
        </div>
      </Section>

      <Section className="border-t border-[var(--color-border)]">
        <div className="reveal grid gap-[var(--space-10)] lg:grid-cols-[18rem_minmax(0,1fr)]">
          <SectionHeader title={page.aboutTitle} />
          <div>
            <p className="max-w-[var(--layout-reading)] text-[length:var(--font-size-lg)] leading-[var(--line-height-relaxed)] text-[var(--color-foreground-muted)]">
              {page.aboutDescription}
            </p>
            <Link
              className="mt-[var(--space-5)] inline-block"
              href={createLocalePath(locale, "about")}
            >
              {page.aboutAction}
            </Link>
          </div>
        </div>
      </Section>

      <Section className="border-t border-[var(--color-border)]">
        <div className="reveal">
          <h2 className="max-w-4xl font-serif text-[length:var(--font-size-display)] leading-[var(--line-height-tight)] text-balance">
            {page.contactTitle}
          </h2>
          <p className="mt-[var(--space-5)] max-w-[var(--layout-reading)] leading-[var(--line-height-relaxed)] text-[var(--color-foreground-muted)]">
            {page.contactDescription}
          </p>
          {email ? (
            <a className="mail-link mt-[var(--space-8)]" href={email.href}>
              {email.description}
            </a>
          ) : null}
          <div className="mt-[var(--space-8)] flex flex-wrap items-center gap-3">
            <ButtonLink href={createLocalePath(locale, "contact")}>
              {page.contactAction}
            </ButtonLink>
            <ButtonLink
              href={createLocalePath(locale, "cv")}
              variant="secondary"
            >
              {page.cvAction}
            </ButtonLink>
            <ul className="flex flex-wrap gap-[var(--space-4)] text-[length:var(--font-size-sm)] sm:ml-[var(--space-4)]">
              {profileLinks.map((link) => (
                <li key={link.key}>
                  <ExternalLink href={link.href}>{link.label}</ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
