"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { localeNames, locales, type Locale } from "@/i18n/config";
import { switchLocalePath } from "@/i18n/routing";
import type { Dictionary } from "@/i18n/types";

type LanguageSwitcherProps = {
  dictionary: Dictionary;
  locale: Locale;
};

export function LanguageSwitcher({
  dictionary,
  locale,
}: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={dictionary.accessibility.languageSwitcher}>
      <ul className="flex flex-wrap gap-2 text-sm">
        {locales.map((candidate) => {
          const isCurrent = candidate === locale;

          return (
            <li key={candidate}>
              <Link
                aria-current={isCurrent ? "true" : undefined}
                className="inline-flex min-h-10 items-center rounded border border-[var(--color-border)] px-3 text-[var(--color-muted)] aria-current:border-[var(--color-accent)] aria-current:text-[var(--color-foreground)]"
                href={switchLocalePath(pathname, candidate)}
                hrefLang={candidate}
                lang={candidate}
              >
                <span className="sr-only">
                  {isCurrent
                    ? `${dictionary.accessibility.currentLanguage}: `
                    : ""}
                </span>
                {localeNames[candidate]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
