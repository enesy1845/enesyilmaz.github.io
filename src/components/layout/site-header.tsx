import Link from "next/link";
import type { CSSProperties } from "react";

import { NoiLetter } from "@/components/brand/noi-letter";
import { HeaderContrast } from "@/components/layout/header-contrast";
import { HeaderIsland } from "@/components/layout/header-island";

import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { LanguageSwitcher } from "@/components/navigation/language-switcher";
import { MainNavigation } from "@/components/navigation/main-navigation";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { createLocalePath } from "@/i18n/routing";
import type { Dictionary } from "@/i18n/types";
import { getWordmarkWords } from "@/lib/utils/wordmark";

type SiteHeaderProps = {
  dictionary: Dictionary;
  locale: Locale;
};

export function SiteHeader({ dictionary, locale }: SiteHeaderProps) {
  return (
    <header
      className="site-header sticky top-0 z-[var(--z-sticky)]"
      data-site-header=""
    >
      <HeaderContrast />
      <HeaderIsland />
      <div className="mx-auto flex min-h-[var(--layout-header-height)] w-full max-w-[var(--layout-wide)] items-center justify-between gap-4 px-[var(--layout-gutter)] py-2 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <Link
          className="site-wordmark justify-self-start no-underline"
          data-header-identity=""
          href={createLocalePath(locale)}
        >
          <span className="sr-only">{dictionary.site.name}</span>
          <span aria-hidden="true" className="site-wordmark__letters">
            {getWordmarkWords(siteConfig.wordmark).map((word) => (
              <span className="site-wordmark__word" key={word[0]?.index}>
                {word.map((letter) => (
                  <span data-header-letter={letter.index} key={letter.index}>
                    <span
                      className="site-wordmark__letter-inner"
                      style={{ "--i": letter.index } as CSSProperties}
                    >
                      <NoiLetter
                        character={letter.character}
                        dotPosition="top"
                      />
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </span>
        </Link>
        {/* Logo, page-centred navigation and language stay on three equal
            outer tracks, so the nav is centred whatever their widths. */}
        <div className="site-header__island hidden lg:block">
          <MainNavigation dictionary={dictionary} locale={locale} />
        </div>
        <div className="site-header__extra hidden justify-self-end lg:block">
          <LanguageSwitcher dictionary={dictionary} locale={locale} />
        </div>
        <MobileNavigation dictionary={dictionary} locale={locale} />
      </div>
    </header>
  );
}
