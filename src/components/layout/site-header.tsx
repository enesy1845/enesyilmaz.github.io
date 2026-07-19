import Link from "next/link";

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
    <header className="border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-background),transparent_8%)]">
      <div className="mx-auto flex w-full max-w-[var(--max-content-width)] flex-col gap-4 px-[var(--space-page-x)] py-5 sm:flex-row sm:items-center sm:justify-between">
        <Link className="text-lg font-semibold" href={createLocalePath(locale)}>
          {dictionary.site.name}
        </Link>
        <div className="flex flex-col gap-4 sm:items-end">
          <MainNavigation dictionary={dictionary} locale={locale} />
          <LanguageSwitcher dictionary={dictionary} locale={locale} />
        </div>
      </div>
    </header>
  );
}
