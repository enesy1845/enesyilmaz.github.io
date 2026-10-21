import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { contentLabels } from "@/data/content-labels";
import type { Locale } from "@/i18n/config";
import { createLocalePath } from "@/i18n/routing";

type PageIntroAction = {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "ghost" | "text";
};

type PageIntroProps = {
  heading: string;
  description: string;
  eyebrow?: string;
  locale: Locale;
  actions?: PageIntroAction[];
  meta?: string;
  /** Choose by page role so translations cannot change typography or layout. */
  variant?: "page" | "document";
};

export function PageIntro({
  heading,
  description,
  eyebrow,
  locale,
  actions = [],
  meta,
  variant = "page",
}: PageIntroProps) {
  return (
    <section
      className={
        variant === "document"
          ? "page-intro page-intro--document"
          : "page-intro"
      }
    >
      <span
        aria-hidden="true"
        className="header-island-marker"
        data-header-island-trigger=""
      />
      <Container>
        <div className="page-intro__topline">
          <Link className="text-link" href={createLocalePath(locale)}>
            <span aria-hidden="true">←</span>
            {contentLabels[locale].backHome}
          </Link>
          {eyebrow ? <p>{eyebrow}</p> : null}
        </div>
        <div className="page-intro__grid">
          <h1 className="page-intro__title">{heading}</h1>
          <div className="page-intro__lead">
            <p>{description}</p>
            {actions.length ? (
              <div className="page-intro__actions">
                {actions.map((action) => (
                  <ButtonLink
                    href={action.href}
                    key={action.href}
                    variant={action.variant}
                  >
                    {action.label}
                  </ButtonLink>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        {meta ? <p className="page-intro__meta">{meta}</p> : null}
      </Container>
    </section>
  );
}
