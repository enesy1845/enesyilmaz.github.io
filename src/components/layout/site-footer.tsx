import Link from "next/link";

import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { createLocalePath } from "@/i18n/routing";
import type { Dictionary } from "@/i18n/types";

type SiteFooterProps = {
  dictionary: Dictionary;
  locale: Locale;
};

export function SiteFooter({ dictionary, locale }: SiteFooterProps) {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="mx-auto flex w-full max-w-[var(--max-content-width)] flex-col gap-4 px-[var(--space-page-x)] py-8 text-sm text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.author}.{" "}
          {dictionary.footer.copyright}
        </p>
        <nav aria-label={dictionary.accessibility.footerNavigation}>
          <Link href={createLocalePath(locale, "contact")}>
            {dictionary.navigation.contact}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
