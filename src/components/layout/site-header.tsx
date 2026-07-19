import Link from "next/link";

import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { LanguageSwitcher } from "@/components/navigation/language-switcher";
import { MainNavigation } from "@/components/navigation/main-navigation";
import type { Locale } from "@/i18n/config";
import { createLocalePath } from "@/i18n/routing";
import type { Dictionary } from "@/i18n/types";

type SiteHeaderProps = {
  dictionary: Dictionary;
  locale: Locale;
};

export function SiteHeader({ dictionary, locale }: SiteHeaderProps) {
  return (
    <header
      className="sticky top-0 z-[var(--z-sticky)] border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-background),transparent_4%)]"
      data-site-header=""
    >
      <div className="mx-auto flex min-h-[var(--layout-header-height)] w-full max-w-[var(--layout-wide)] items-center justify-between gap-4 px-[var(--layout-gutter)] py-3">
        <Link
          className="group inline-flex items-center gap-3 no-underline"
          data-header-identity=""
          href={createLocalePath(locale)}
        >
          <span
            aria-hidden="true"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] font-serif text-[var(--color-accent)] text-[var(--font-size-md)]"
          >
            EY
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-semibold text-[var(--color-foreground)] text-[var(--font-size-md)]">
              {dictionary.site.name}
            </span>
            <span className="mt-1 text-[var(--color-foreground-subtle)] text-[var(--font-size-xs)]">
              {dictionary.site.role}
            </span>
          </span>
        </Link>
        <div className="hidden items-center gap-4 lg:flex">
          <MainNavigation dictionary={dictionary} locale={locale} />
          <LanguageSwitcher dictionary={dictionary} locale={locale} />
        </div>
        <MobileNavigation dictionary={dictionary} locale={locale} />
      </div>
    </header>
  );
}
