import type { Metadata } from "next";

import { CvTimeline } from "@/components/cv/cv-timeline";
import { StructuredData } from "@/components/seo/structured-data";
import { ButtonLink } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { siteConfig } from "@/config/site";
import { socialLinks } from "@/config/social";
import {
  additionalLearning,
  certifications,
  cvDocument,
  cvPageCopy,
  education,
  references,
  skillGroups,
  timeline,
  type Credential,
} from "@/data/cv";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { createLocalePath, routes } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata/pages";
import { createProfilePageJsonLd } from "@/lib/structured-data/schema";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const route = routes.find((candidate) => candidate.key === "cv") ?? routes[0];

const email =
  socialLinks
    .find((link) => link.key === "email")
    ?.href.replace("mailto:", "") ?? "";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  return createPageMetadata(locale as Locale, route, dictionary);
}

function CredentialItem({ credential }: { credential: Credential }) {
  return (
    <>
      <p className="font-serif text-[var(--font-size-md)]">{credential.name}</p>
      <p className="mt-[var(--space-1)] text-[var(--color-foreground-subtle)] text-[var(--font-size-xs)]">
        {credential.issuer}
      </p>
    </>
  );
}

export default async function CvPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const dictionary = await getDictionary(localeParam);
  const locale = isLocale(localeParam) ? localeParam : "en";
  const copy = cvPageCopy[locale];
  const updated = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(new Date(siteConfig.contentUpdatedAt));
  const requestHref = `mailto:${email}?subject=${encodeURIComponent(
    copy.requestReferences,
  )}`;

  const actions = [
    ...(cvDocument.href
      ? [{ href: cvDocument.href, label: copy.downloadAction }]
      : []),
    {
      href: "#references",
      label: copy.referencesAction,
      variant: cvDocument.href ? ("secondary" as const) : ("primary" as const),
    },
    {
      href: createLocalePath(locale, "contact"),
      label: copy.contactAction,
      variant: "secondary" as const,
    },
  ];

  return (
    <>
      <StructuredData data={[createProfilePageJsonLd(locale)]} />
      <PageIntro
        actions={actions}
        description={dictionary.pages.cv.description}
        eyebrow={copy.eyebrow}
        heading={dictionary.pages.cv.heading}
        locale={locale}
        meta={`${siteConfig.author} · ${dictionary.footer.location}`}
      />

      <Section>
        <div className="grid gap-[var(--space-10)]">
          <SectionHeader title={copy.timelineTitle} />
          <CvTimeline copy={copy} entries={timeline} locale={locale} />
        </div>
      </Section>

      <Section className="border-t border-[var(--color-border)]">
        <div className="grid gap-[var(--space-10)] lg:grid-cols-[18rem_minmax(0,1fr)]">
          <SectionHeader
            title={copy.skillsTitle}
            description={copy.skillsNote}
          />
          <div className="grid gap-[var(--space-6)] sm:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.title.en}>
                <h3 className="font-mono tracking-[var(--letter-spacing-label)] text-[var(--color-foreground-subtle)] text-[var(--font-size-xs)]">
                  {group.title[locale]}
                </h3>
                <ul className="mt-[var(--space-3)] flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      className="rounded-[var(--radius-pill)] border border-[var(--color-border)] px-3 py-1 text-[var(--color-foreground-muted)] text-[var(--font-size-xs)]"
                      key={skill}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-t border-[var(--color-border)]">
        <div className="grid gap-[var(--space-10)] md:grid-cols-2">
          <div>
            <SectionHeader title={copy.educationTitle} />
            <ul className="mt-[var(--space-6)] grid gap-[var(--space-5)]">
              {education.map((item) => (
                <li
                  className="border-t border-[var(--color-border)] pt-[var(--space-4)]"
                  key={item.title.en}
                >
                  <p className="font-serif text-[var(--font-size-md)]">
                    {item.title[locale]}
                  </p>
                  <p className="mt-[var(--space-1)] text-[var(--color-foreground-muted)] text-[var(--font-size-sm)]">
                    {item.detail[locale]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader title={copy.certificationsTitle} />
            <ul className="mt-[var(--space-6)] grid gap-[var(--space-5)]">
              {certifications.map((credential) => (
                <li
                  className="border-t border-[var(--color-border)] pt-[var(--space-4)]"
                  key={credential.name}
                >
                  <CredentialItem credential={credential} />
                  {credential.note ? (
                    <p className="mt-[var(--space-1)] font-mono text-[var(--color-foreground-subtle)] text-[var(--font-size-xs)]">
                      {credential.note[locale]}
                    </p>
                  ) : null}
                  {credential.verifyUrl ? (
                    <ExternalLink
                      className="mt-[var(--space-2)] inline-block text-[var(--font-size-sm)]"
                      href={credential.verifyUrl}
                    >
                      {copy.verify}
                    </ExternalLink>
                  ) : null}
                </li>
              ))}
            </ul>
            <details className="cv-details mt-[var(--space-6)]">
              <summary>{copy.additionalLearning}</summary>
              <ul className="mt-[var(--space-4)] grid gap-[var(--space-4)]">
                {additionalLearning.map((credential) => (
                  <li key={credential.name}>
                    <CredentialItem credential={credential} />
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </div>
      </Section>

      <Section
        className="scroll-mt-[var(--layout-header-height)] border-t border-[var(--color-border)]"
        id="references"
      >
        <div className="grid gap-[var(--space-10)]">
          <div>
            <SectionHeader
              title={copy.referencesTitle}
              description={copy.referencesDescription}
            />
            {email ? (
              <ExternalLink
                className="mt-[var(--space-5)] inline-block"
                href={requestHref}
              >
                {copy.requestReferences}
              </ExternalLink>
            ) : null}
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {references.map((reference) => (
              <li
                className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5)]"
                key={reference.key}
              >
                <p className="font-mono text-[var(--color-foreground-subtle)] text-[var(--font-size-xs)]">
                  {reference.field[locale]}
                </p>
                <h3 className="mt-[var(--space-2)] font-serif text-[var(--font-size-lg)]">
                  {reference.organization}
                </h3>
                <p className="mt-[var(--space-3)] leading-[var(--line-height-relaxed)] text-[var(--color-foreground-muted)] text-[var(--font-size-sm)]">
                  {reference.description[locale]}
                </p>
                {reference.documentUrl ? (
                  <ExternalLink
                    className="mt-[var(--space-4)] inline-block text-[var(--font-size-sm)]"
                    href={reference.documentUrl}
                  >
                    {copy.viewDocument}
                  </ExternalLink>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        className="border-t border-[var(--color-border)]"
        container="reading"
      >
        <SectionHeader
          title={copy.contactTitle}
          description={copy.contactDescription}
        />
        <div className="mt-[var(--space-6)] flex flex-wrap gap-3">
          <ButtonLink href={createLocalePath(locale, "contact")}>
            {copy.contactAction}
          </ButtonLink>
          <ButtonLink
            href={createLocalePath(locale, "work")}
            variant="secondary"
          >
            {dictionary.navigation.work}
          </ButtonLink>
        </div>
        <p className="mt-[var(--space-8)] font-mono text-[var(--color-foreground-subtle)] text-[var(--font-size-xs)]">
          {copy.lastUpdated}:{" "}
          <time dateTime={siteConfig.contentUpdatedAt}>{updated}</time>
        </p>
      </Section>
    </>
  );
}
