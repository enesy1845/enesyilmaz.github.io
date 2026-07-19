import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import "@/app/globals.css";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { StructuredData } from "@/components/seo/structured-data";
import { SkipLink } from "@/components/ui/skip-link";
import { siteConfig } from "@/config/site";
import { htmlLang, isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import {
  createPersonJsonLd,
  createWebSiteJsonLd,
} from "@/lib/structured-data/schema";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || siteConfig.localUrl,
  ),
  title: {
    default: siteConfig.defaultTitle,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.defaultDescription,
  twitter: {
    card: "summary",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const dictionary = await getDictionary(locale);

  return (
    <html lang={htmlLang[locale]} data-scroll-behavior="smooth">
      <body>
        <SkipLink label={dictionary.accessibility.skipToContent} />
        <SiteHeader dictionary={dictionary} locale={locale} />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter dictionary={dictionary} locale={locale} />
        <StructuredData data={[createPersonJsonLd(), createWebSiteJsonLd()]} />
      </body>
    </html>
  );
}
