import type { Metadata } from "next";

import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { atelierPreview } from "@/data/supporting-content";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { routes } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata/pages";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const route =
  routes.find((candidate) => candidate.key === "atelier") ?? routes[0];

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  return createPageMetadata(locale as Locale, route, dictionary);
}

export default async function AtelierPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const dictionary = await getDictionary(localeParam);
  const locale = isLocale(localeParam) ? localeParam : "en";
  const content = atelierPreview[locale];

  return (
    <>
      <PageIntro
        heading={dictionary.pages.atelier.heading}
        description={content.description}
        locale={locale}
        meta={dictionary.pages.atelier.placeholderTitle}
      />
      <Section>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {content.categories.map((category) => (
            <li
              className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5)] font-serif text-[var(--font-size-lg)]"
              key={category}
            >
              {category}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
