"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { defaultLocale, isLocale } from "@/i18n/config";
import { createLocalePath } from "@/i18n/routing";
import en from "@/messages/en.json";
import no from "@/messages/no.json";
import tr from "@/messages/tr.json";

const copy = { en: en.notFound, no: no.notFound, tr: tr.notFound };

/**
 * Not-found files receive no params, so the locale is read on the client.
 * The surrounding [locale] layout already renders the localized shell.
 */
export default function LocaleNotFound() {
  const params = useParams<{ locale?: string }>();
  const locale =
    params.locale && isLocale(params.locale) ? params.locale : defaultLocale;
  const text = copy[locale];

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-6 py-16">
      <h1 className="text-[length:var(--font-size-3xl)] font-semibold">
        {text.heading}
      </h1>
      <p className="mt-4 text-[length:var(--font-size-lg)] text-[var(--color-foreground-muted)]">
        {text.description}
      </p>
      <Link
        className="mt-8 inline-flex w-fit underline"
        href={createLocalePath(locale, "")}
      >
        {text.homeLink}
      </Link>
    </section>
  );
}
