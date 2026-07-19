import type { Metadata } from "next";

import { PageIntro } from "@/components/layout/page-intro";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { routes, type RouteKey } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata/pages";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function createShellPage(routeKey: Exclude<RouteKey, "home">) {
  const route = routes.find((candidate) => candidate.key === routeKey);

  if (!route) {
    throw new Error(`Unknown route: ${routeKey}`);
  }

  const resolvedRoute = route;

  async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    const dictionary = await getDictionary(locale);
    return createPageMetadata(locale as Locale, resolvedRoute, dictionary);
  }

  async function Page({ params }: PageProps) {
    const { locale: localeParam } = await params;
    const dictionary = await getDictionary(localeParam);
    const locale = isLocale(localeParam) ? localeParam : "en";
    const page = dictionary.pages[routeKey];

    return (
      <PageIntro
        heading={page.heading}
        description={page.description}
        locale={locale}
      />
    );
  }

  return { generateMetadata, default: Page };
}
