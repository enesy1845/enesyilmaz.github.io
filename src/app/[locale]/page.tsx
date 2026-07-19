import type { Metadata } from "next";

import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { createLocalePath, routes } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata/pages";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const route = routes[0];

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  return createPageMetadata(locale as Locale, route, dictionary);
}

export default async function HomePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const dictionary = await getDictionary(localeParam);
  const locale = isLocale(localeParam) ? localeParam : "en";
  const page = dictionary.pages.home;

  return (
    <>
      <PageIntro
        actions={[
          {
            href: createLocalePath(locale, "work"),
            label: page.primaryAction,
          },
          {
            href: createLocalePath(locale, "about"),
            label: page.secondaryAction,
            variant: "secondary",
          },
        ]}
        description={page.description}
        eyebrow={dictionary.site.role}
        heading={page.heading}
        locale={locale}
        meta={page.meta}
      />
      <Section>
        <SectionHeader
          title={page.foundationTitle}
          description={page.foundationDescription}
        />
      </Section>
    </>
  );
}
