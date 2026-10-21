import type { Metadata } from "next";

import { CvTimeline } from "@/components/cv/cv-timeline";
import { ReferenceIndex } from "@/components/cv/reference-index";
import { StructuredData } from "@/components/seo/structured-data";
import { ClosingInvite } from "@/components/ui/closing-invite";
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
      <p className="font-serif text-[length:var(--font-size-md)]">
        {credential.name}
      </p>
      <p className="mt-[var(--space-1)] text-[length:var(--font-size-xs)] text-[var(--color-foreground-subtle)]">
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
        variant="document"
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
                <h3 className="font-mono text-[length:var(--font-size-xs)] tracking-[var(--letter-spacing-label)] text-[var(--color-foreground-subtle)]">
                  {group.title[locale]}
                </h3>
                <ul className="mt-[var(--space-3)] flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      className="rounded-[var(--radius-pill)] border border-[var(--color-border)] px-3 py-1 text-[length:var(--font-size-xs)] text-[var(--color-foreground-muted)]"
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
                  <p className="font-serif text-[length:var(--font-size-md)]">
                    {item.title[locale]}
                  </p>
                  <p className="mt-[var(--space-1)] text-[length:var(--font-size-sm)] text-[var(--color-foreground-muted)]">
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
                    <p className="mt-[var(--space-1)] font-mono text-[length:var(--font-size-xs)] text-[var(--color-foreground-subtle)]">
                      {credential.note[locale]}
                    </p>
                  ) : null}
                  {credential.verifyUrl ? (
                    <ExternalLink
                      className="mt-[var(--space-2)] inline-block text-[length:var(--font-size-sm)]"
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
          <div className="cv-references-heading">
            <div>
              <SectionHeader
                title={copy.referencesTitle}
                description={copy.referencesDescription}
              />
              {email ? (
                <ExternalLink
                  className="text-link mt-[var(--space-5)]"
                  href={requestHref}
                >
                  {copy.requestReferences}
                  <span aria-hidden="true">↗</span>
                </ExternalLink>
              ) : null}
            </div>
            <span aria-hidden="true" className="cv-references-count">
              {String(references.length).padStart(2, "0")}
            </span>
          </div>
          <ReferenceIndex
            entries={references}
            locale={locale}
            documentLabel={copy.viewDocument}
          />
        </div>
      </Section>

      <ClosingInvite
        title={copy.contactTitle}
        description={copy.contactDescription}
        primary={{
          href: createLocalePath(locale, "contact"),
          label: copy.contactAction,
        }}
        secondary={{
          href: createLocalePath(locale, "work"),
          label: dictionary.navigation.work,
        }}
        meta={
          <>
            {copy.lastUpdated}:{" "}
            <time dateTime={siteConfig.contentUpdatedAt}>{updated}</time>
          </>
        }
      />
    </>
  );
}
