import type { Metadata } from "next";
import Link from "next/link";

import { DisciplineMark } from "@/components/home/discipline-mark";
import { HomeHero } from "@/components/home/hero/home-hero";
import { HomeImage } from "@/components/home/home-image";
import { ProjectIndex } from "@/components/projects/project-index";
import { MaterialStudy } from "@/components/media/material-study";
import { CopyEmail } from "@/components/ui/copy-email";
import { ExternalLink } from "@/components/ui/external-link";
import { Section } from "@/components/ui/section";
import { socialLinks } from "@/config/social";
import { notes } from "@/content/notes/notes";
import { evidenceItems } from "@/data/experience";
import { contentLabels } from "@/data/content-labels";
import { homeContent } from "@/data/home";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { createLocalePath, routes } from "@/i18n/routing";
import { getFeaturedProjects } from "@/lib/content/projects";
import { createPageMetadata } from "@/lib/metadata/pages";

type PageProps = { params: Promise<{ locale: string }> };
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
  const featuredNote = notes[0];
  const email = socialLinks.find((link) => link.key === "email");
  const profileLinks = socialLinks.filter((link) =>
    ["linkedin", "github"].includes(link.key),
  );

  return (
    <>
      <HomeHero dictionary={dictionary} locale={locale} page={page} />
      <HomeImage />

      <Section className="home-statement" id="home-next">
        <div className="home-statement__inner reveal">
          <span aria-hidden="true" className="section-index">
            01 /
          </span>
          <h2>{page.manifestoTitle}</h2>
          <Link className="text-link" href={createLocalePath(locale, "about")}>
            {page.aboutAction}
            <span aria-hidden="true"> ↗</span>
          </Link>
        </div>
      </Section>

      <Section className="home-work" id="selected-work">
        <div className="section-heading">
          <h2>
            <span aria-hidden="true" className="section-index">
              02 /
            </span>
            {page.selectedWorkTitle}
          </h2>
          <Link className="text-link" href={createLocalePath(locale, "work")}>
            {page.allWorkAction}
            <span aria-hidden="true"> ↗</span>
          </Link>
        </div>
        <ProjectIndex projects={getFeaturedProjects()} locale={locale} />
      </Section>

      <Section className="home-expertise">
        <div className="expertise-layout reveal">
          <div className="section-heading">
            <h2>
              <span aria-hidden="true" className="section-index">
                03 /
              </span>
              {page.expertiseTitle}
            </h2>
          </div>
          <div className="expertise-list">
            {evidenceItems.map((item, index) => (
              <details className="expertise-item" key={item.key}>
                <summary>
                  <span aria-hidden="true" className="section-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item.content[locale].title}</span>
                  <span aria-hidden="true" className="expertise-item__toggle">
                    +
                  </span>
                </summary>
                <p>{item.content[locale].description}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <Section className="home-disciplines" tone="inverse">
        <div className="section-heading">
          <h2>
            <span aria-hidden="true" className="section-index">
              04 /
            </span>
            {page.disciplinesTitle}
          </h2>
        </div>
        <ul className="disciplines">
          {page.disciplines.map((item, index) => (
            <li key={item.segment}>
              <Link
                className={`discipline discipline--${item.segment}`}
                href={createLocalePath(locale, item.segment)}
              >
                <span aria-hidden="true" className="discipline__index">
                  0{index + 1}
                </span>
                <DisciplineMark kind={item.segment} />
                <span className="discipline__word">{item.title}</span>
                <span className="discipline__action">
                  {item.action}
                  <span aria-hidden="true" className="link-arrow">
                    ↗
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="home-journal">
        <div className="journal-grid reveal">
          <article className="journal-entry">
            <div className="journal-entry__meta">
              <h2>{page.notesTitle}</h2>
              {featuredNote ? (
                <span lang={featuredNote.language}>
                  {dictionary.language[featuredNote.language]}
                </span>
              ) : null}
            </div>
            {featuredNote ? (
              <h3>
                <Link
                  href={createLocalePath(
                    featuredNote.language,
                    `notes/${featuredNote.slug}`,
                  )}
                  hrefLang={featuredNote.language}
                  lang={featuredNote.language}
                >
                  {featuredNote.title}
                  <span aria-hidden="true" className="link-arrow">
                    ↗
                  </span>
                </Link>
              </h3>
            ) : null}
            <Link
              className="text-link"
              href={createLocalePath(locale, "notes")}
            >
              {page.notesAction}
              <span aria-hidden="true"> ↗</span>
            </Link>
          </article>
          <article className="journal-entry journal-entry--atelier">
            <div className="journal-entry__meta">
              <h2>{page.atelierTitle}</h2>
              <span aria-hidden="true">↘</span>
            </div>
            <div className="material-index">
              <MaterialStudy kind="wood" />
              <ul className="material-list">
                {page.atelierItems.map((item, index) => (
                  <li key={item}>
                    <span aria-hidden="true" className="section-index">
                      0{index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              className="text-link"
              href={createLocalePath(locale, "atelier")}
            >
              {page.atelierAction}
              <span aria-hidden="true"> ↗</span>
            </Link>
          </article>
        </div>
      </Section>

      <Section className="home-about">
        <div className="about-strip reveal">
          <h2>{page.aboutTitle}</h2>
          <p>{page.aboutLead}</p>
          <Link className="text-link" href={createLocalePath(locale, "cv")}>
            {page.cvAction}
            <span aria-hidden="true"> ↗</span>
          </Link>
        </div>
      </Section>

      <Section className="home-contact">
        <div className="contact-layout reveal">
          <h2>{page.contactTitle}</h2>
          <div className="contact-layout__actions">
            {email ? (
              <div className="contact-email">
                <a className="mail-link" href={email.href}>
                  {email.description}
                  <span aria-hidden="true"> ↗</span>
                </a>
                <CopyEmail
                  email={email.description}
                  labels={contentLabels[locale]}
                />
              </div>
            ) : null}
            <div className="contact-links">
              <Link
                className="text-link"
                href={createLocalePath(locale, "contact")}
              >
                {page.contactAction}
                <span aria-hidden="true">↗</span>
              </Link>
              {profileLinks.map((link) => (
                <ExternalLink href={link.href} key={link.key}>
                  {link.label}
                </ExternalLink>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
