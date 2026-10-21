import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { CopyEmail } from "@/components/ui/copy-email";
import { socialLinks } from "@/config/social";
import { contentLabels } from "@/data/content-labels";
import { contactPageContent } from "@/data/pages";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { createLocalePath, routes } from "@/i18n/routing";
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
  const email = socialLinks.find((link) => link.key === "email");

  return (
    <>
      <PageIntro
        heading={dictionary.pages.contact.heading}
        description={dictionary.pages.contact.description}
        locale={locale}
        meta={content.introMeta}
      />
      <Section>
        <div className="contact-directory">
          <SectionHeader
            title={labels.contactLinks}
            description={content.description}
          />
          <div>
            {email ? (
              <div className="contact-primary">
                <h2>{email.label}</h2>
                <a
                  aria-label={email.label}
                  className="contact-address"
                  href={email.href}
                >
                  {email.description}
                  <span aria-hidden="true" className="link-arrow">
                    ↗
                  </span>
                </a>
                <CopyEmail email={email.description} labels={labels} />
              </div>
            ) : null}
            <div className="contact-channels">
              {socialLinks
                .filter((link) => link.key !== "email")
                .map((link, index) => (
                  <ExternalLink
                    aria-label={link.label}
                    className="contact-channel"
                    href={link.href}
                    key={link.key}
                  >
                    <span aria-hidden="true" className="section-index">
                      0{index + 1}
                    </span>
                    <span>
                      <strong>{link.label}</strong>
                      <span className="contact-channel__detail">
                        {link.description}
                      </span>
                    </span>
                    <span aria-hidden="true" className="link-arrow">
                      ↗
                    </span>
                  </ExternalLink>
                ))}
            </div>
          </div>
        </div>
      </Section>
      <Section
        className="border-t border-[var(--color-border)]"
        container="reading"
      >
        <p className="leading-[var(--line-height-relaxed)] text-[var(--color-foreground-muted)]">
          {labels.noFormNotice}
        </p>
        <ButtonLink
          className="mt-[var(--space-6)]"
          href={createLocalePath(locale, "cv")}
          variant="secondary"
        >
          {content.cvAction}
        </ButtonLink>
      </Section>
    </>
  );
}
