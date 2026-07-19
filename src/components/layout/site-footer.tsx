import Link from "next/link";

import { Container } from "@/components/ui/container";
import { ExternalLink } from "@/components/ui/external-link";
import { socialLinks } from "@/config/social";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { createLocalePath, routes } from "@/i18n/routing";
import type { Dictionary } from "@/i18n/types";

type SiteFooterProps = {
  dictionary: Dictionary;
  locale: Locale;
};

export function SiteFooter({ dictionary, locale }: SiteFooterProps) {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-background-elevated)]">
      <Container className="grid gap-[var(--space-10)] py-[var(--space-12)] md:grid-cols-[minmax(0,1fr)_auto_auto]">
        <div className="max-w-md">
          <Link
            className="font-serif text-[var(--font-size-xl)] no-underline"
            href={createLocalePath(locale)}
          >
            {siteConfig.author}
          </Link>
          <p className="mt-[var(--space-4)] leading-[var(--line-height-relaxed)] text-[var(--color-foreground-muted)] text-[var(--font-size-sm)]">
            {dictionary.footer.statement}
          </p>
          <p className="mt-[var(--space-3)] font-mono text-[var(--color-foreground-subtle)] text-[var(--font-size-xs)]">
            {dictionary.footer.location}
          </p>
        </div>

        <nav aria-label={dictionary.accessibility.footerNavigation}>
          <p className="font-mono tracking-[var(--letter-spacing-label)] text-[var(--color-foreground-subtle)] text-[var(--font-size-xs)]">
            {dictionary.accessibility.footerNavigation}
          </p>
          <ul className="mt-[var(--space-4)] grid gap-2 text-[var(--color-foreground-muted)] text-[var(--font-size-sm)]">
            {routes.map((route) => (
              <li key={route.key}>
                <Link href={createLocalePath(locale, route.segment)}>
                  {dictionary.navigation[route.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-mono tracking-[var(--letter-spacing-label)] text-[var(--color-foreground-subtle)] text-[var(--font-size-xs)]">
            {dictionary.footer.professionalLinks}
          </p>
          <ul className="mt-[var(--space-4)] grid gap-2 text-[var(--color-foreground-muted)] text-[var(--font-size-sm)]">
            {socialLinks.map((link) => (
              <li key={link.key}>
                <ExternalLink href={link.href}>{link.label}</ExternalLink>
              </li>
            ))}
          </ul>
        </div>

        <p className="border-t border-[var(--color-border)] pt-[var(--space-6)] text-[var(--color-foreground-subtle)] text-[var(--font-size-xs)] md:col-span-3">
          &copy; {new Date().getFullYear()} {siteConfig.author}.{" "}
          {dictionary.footer.copyright}
        </p>
      </Container>
    </footer>
  );
}
