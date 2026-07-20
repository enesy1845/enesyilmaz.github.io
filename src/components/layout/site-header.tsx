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
        <div className="flex min-w-0 items-center gap-3">
          <Link
            aria-label={`${dictionary.site.name}: Code / Thought / Craft`}
            className="inline-flex min-w-0 font-mono tracking-[var(--letter-spacing-label)] text-[var(--color-accent)] text-[var(--font-size-xs)] no-underline"
            data-header-signature=""
            href={createLocalePath(locale)}
          >
            Code / Thought / Craft
          </Link>
          <span
            aria-hidden="true"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] font-serif text-[var(--color-accent)] text-[var(--font-size-sm)] no-underline"
            data-header-compact-mark=""
          >
            EY
          </span>
        </div>
        <div
          className="hidden items-center gap-4 lg:flex"
          data-header-navigation=""
        >
          <MainNavigation dictionary={dictionary} locale={locale} />
          <LanguageSwitcher dictionary={dictionary} locale={locale} />
        </div>
        <MobileNavigation dictionary={dictionary} locale={locale} />
      </div>
    </header>
  );
}
