import type { Metadata } from "next";
import Link from "next/link";

import { HomeHero } from "@/components/home/hero/home-hero";
import { ProjectList } from "@/components/projects/project-list";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
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

  return (
    <>
      <HomeHero dictionary={dictionary} locale={locale} page={page} />

      <Section container="reading">
        <SectionHeader
          title={page.manifestoTitle}
          description={page.manifestoLines.join(" ")}
        />
      </Section>

      <Section className="border-t border-[var(--color-border)]">
        <div className="grid gap-[var(--space-10)] lg:grid-cols-[18rem_minmax(0,1fr)]">
          <SectionHeader
            title={page.selectedWorkTitle}
            description={page.selectedWorkDescription}
          />
          <ProjectList projects={featuredProjects} locale={locale} />
        </div>
      </Section>

      <Section className="border-t border-[var(--color-border)]">
        <div className="grid gap-[var(--space-8)] lg:grid-cols-[18rem_minmax(0,1fr)]">
          <SectionHeader
            title={page.evidenceTitle}
            description={page.evidenceDescription}
          />
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
          <SectionHeader
            title={page.ecosystemTitle}
            description={page.ecosystemDescription}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {page.ecosystemItems.map((item) => (
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
            <Link
              className="mt-[var(--space-5)] inline-block"
              href={createLocalePath(locale, "notes")}
            >
              {page.notesAction}
            </Link>
          </article>
          <article>
            <h2 className="font-serif text-[var(--font-size-2xl)]">
              {page.atelierTitle}
            </h2>
            <p className="mt-[var(--space-4)] leading-[var(--line-height-relaxed)] text-[var(--color-foreground-muted)]">
              {page.atelierDescription}
            </p>
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
            <div className="mt-[var(--space-8)] grid gap-4 sm:grid-cols-2">
              {page.aboutItems.map((item) => (
                <article key={item.title}>
                  <h3 className="font-mono text-[var(--color-accent)] text-[var(--font-size-xs)]">
                    {item.title}
                  </h3>
                  <p className="mt-[var(--space-2)] text-[var(--color-foreground-muted)] text-[var(--font-size-sm)]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
          <aside className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5)]">
            <h2 className="font-serif text-[var(--font-size-xl)]">
              {page.contactTitle}
            </h2>
            <p className="mt-[var(--space-3)] leading-[var(--line-height-relaxed)] text-[var(--color-foreground-muted)] text-[var(--font-size-sm)]">
              {page.contactDescription}
            </p>
            <ButtonLink
              className="mt-[var(--space-5)]"
              href={createLocalePath(locale, "contact")}
              variant="secondary"
            >
              {page.contactAction}
            </ButtonLink>
          </aside>
        </div>
      </Section>
    </>
  );
}
