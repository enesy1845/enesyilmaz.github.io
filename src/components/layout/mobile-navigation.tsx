"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { LanguageSwitcher } from "@/components/navigation/language-switcher";
import { navigationRoutes } from "@/config/navigation";
import type { Locale } from "@/i18n/config";
import { createPathForRoute, getRouteFromPath } from "@/i18n/routing";
import type { Dictionary } from "@/i18n/types";

type MobileNavigationProps = {
  dictionary: Dictionary;
  locale: Locale;
};

function MenuIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function MobileNavigation({
  dictionary,
  locale,
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const pathname = usePathname();
  const activeRoute = getRouteFromPath(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="lg:hidden">
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        className="inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 font-semibold text-[var(--color-foreground)] text-[var(--font-size-sm)] transition-colors duration-[var(--duration-fast)] hover:border-[var(--color-accent)] sm:px-4"
        onClick={() => setIsOpen((value) => !value)}
        ref={toggleRef}
        type="button"
      >
        <MenuIcon />
        <span className="max-[359px]:sr-only">
          {dictionary.accessibility.openMenu}
        </span>
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[var(--z-overlay)] bg-black/60 p-[var(--space-4)]"
          role="presentation"
        >
          <div
            aria-label={dictionary.accessibility.mobileNavigation}
            className="ml-auto flex max-h-[calc(100vh-2rem)] w-full max-w-sm flex-col overflow-y-auto rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-[var(--color-background-elevated)] p-[var(--space-5)] shadow-[var(--shadow-elevated)]"
            id={panelId}
            role="dialog"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono tracking-[var(--letter-spacing-label)] text-[var(--color-foreground-subtle)] text-[var(--font-size-xs)]">
                {dictionary.accessibility.mobileNavigation}
              </p>
              <button
                aria-label={dictionary.accessibility.closeMenu}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-border)] text-[var(--color-foreground)]"
                onClick={() => {
                  closeMenu();
                  toggleRef.current?.focus();
                }}
                ref={closeRef}
                type="button"
              >
                <CloseIcon />
              </button>
            </div>

            <nav
              aria-label={dictionary.accessibility.mobileNavigation}
              className="mt-[var(--space-8)]"
            >
              <ul className="grid gap-2">
                {navigationRoutes.map((route) => (
                  <li key={route.key}>
                    <Link
                      aria-current={
                        activeRoute.key === route.key ? "page" : undefined
                      }
                      className="flex min-h-12 items-center justify-between rounded-[var(--radius-md)] border border-transparent px-3 text-[var(--color-foreground-muted)] text-[var(--font-size-lg)] no-underline transition-colors aria-current:border-[var(--color-border-strong)] aria-current:bg-[var(--color-surface)] aria-current:text-[var(--color-foreground)]"
                      href={createPathForRoute(locale, route)}
                      onClick={closeMenu}
                    >
                      {dictionary.navigation[route.key]}
                      {activeRoute.key === route.key ? (
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-[var(--radius-pill)] bg-[var(--color-accent)]"
                        />
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-[var(--space-8)] border-t border-[var(--color-border)] pt-[var(--space-5)]">
              <LanguageSwitcher dictionary={dictionary} locale={locale} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
