import type { Metadata } from "next";
import Image from "next/image";

import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { atelierAreas } from "@/data/supporting-content";
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

  return (
    <>
      <PageIntro
        heading={dictionary.pages.atelier.heading}
        description={dictionary.pages.atelier.description}
        locale={locale}
      />
      <Section>
        <div className="grid gap-x-[var(--space-10)] gap-y-[var(--space-12)] md:grid-cols-2">
          {atelierAreas.map((area) => (
            <article
              className="border-t border-[var(--color-border)] pt-[var(--space-6)]"
              key={area.key}
            >
              {area.images.length > 0 ? (
                <div className="mb-[var(--space-6)] grid grid-cols-2 gap-3">
                  {area.images.map((image, index) => (
                    <Image
                      alt={image.alt[locale]}
                      className={`h-auto w-full rounded-[var(--radius-md)] object-cover ${
                        index === 0 ? "col-span-2" : ""
                      }`}
                      height={image.height}
                      key={image.src}
                      sizes="(min-width: 768px) 40vw, 100vw"
                      src={image.src}
                      unoptimized
                      width={image.width}
                    />
                  ))}
                </div>
              ) : null}
              <h2 className="font-serif leading-[var(--line-height-heading)] text-[var(--font-size-xl)]">
                {area.title[locale]}
              </h2>
              <p className="mt-[var(--space-4)] max-w-[var(--layout-reading)] leading-[var(--line-height-relaxed)] text-[var(--color-foreground-muted)]">
                {area.body[locale]}
              </p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
