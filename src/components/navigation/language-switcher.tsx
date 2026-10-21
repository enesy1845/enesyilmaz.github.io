"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { LanguageFlag } from "@/components/navigation/language-flag";
import { switcherLocales, type Locale } from "@/i18n/config";
import { switchLocalePath } from "@/i18n/routing";
import type { Dictionary } from "@/i18n/types";

function ChevronIcon() {
  return (
    <svg
      aria-hidden="true"
      className="language-switcher__chevron h-3 w-3"
      fill="none"
      viewBox="0 0 12 12"
    >
      <path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      fill="none"
      viewBox="0 0 14 14"
    >
      <path d="m3 7.2 2.6 2.6L11 4.4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

type LanguageSwitcherProps = {
  dictionary: Dictionary;
  locale: Locale;
};

/**
 * Icon-only language disclosure: the trigger shows the current flag and the
 * panel, centred under it, lists the offered locales as flags. Names stay
 * available to assistive technology through visually hidden dictionary text.
 */
export function LanguageSwitcher({
  dictionary,
  locale,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false);
        }
      }}
      ref={rootRef}
    >
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        className="language-switcher__toggle inline-flex min-h-11 items-center gap-1.5 rounded-[var(--radius-pill)] border border-[var(--color-border)] py-1 pr-2.5 pl-1.5 text-[var(--color-foreground-muted)] transition-colors duration-[var(--duration-fast)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-foreground)] aria-expanded:border-[var(--color-border-strong)] aria-expanded:text-[var(--color-foreground)]"
        onClick={() => setIsOpen((open) => !open)}
        ref={toggleRef}
        type="button"
      >
        <span className="sr-only">
          {`${dictionary.accessibility.languageSwitcher}. ${dictionary.accessibility.currentLanguage}: ${dictionary.language[locale]}`}
        </span>
        <LanguageFlag locale={locale} />
        <ChevronIcon />
      </button>

      {isOpen ? (
        <nav
          aria-label={dictionary.accessibility.languageSwitcher}
          className="language-switcher__panel absolute top-full left-1/2 z-[var(--z-navigation)] mt-2 -translate-x-1/2"
          id={panelId}
        >
          <ul className="flex flex-col gap-0.5 p-1">
            {switcherLocales.map((candidate) => (
              <li key={candidate}>
                <Link
                  aria-current={candidate === locale ? "true" : undefined}
                  className="language-switcher__item flex min-h-11 items-center gap-2.5 rounded-[var(--radius-md)] px-2.5 text-[var(--color-foreground)] no-underline transition-colors duration-[var(--duration-fast)]"
                  href={switchLocalePath(pathname, candidate)}
                  hrefLang={candidate}
                  lang={candidate}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="sr-only">
                    {dictionary.language[candidate]}
                  </span>
                  <LanguageFlag locale={candidate} />
                  <span className="flex w-3.5 justify-center">
                    {candidate === locale ? <CheckIcon /> : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
