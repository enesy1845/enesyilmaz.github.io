import { HeroScrollTransition } from "@/components/home/hero/hero-scroll-transition";
import { ParticleHeroLoader } from "@/components/home/hero/particle-hero-loader";
import { ButtonLink } from "@/components/ui/button";
import type { HomeContent } from "@/data/home";
import type { Locale } from "@/i18n/config";
import { createLocalePath } from "@/i18n/routing";

type HomeHeroProps = {
  locale: Locale;
  page: HomeContent;
};

export function HomeHero({ locale, page }: HomeHeroProps) {
  return (
    <>
      <section
        aria-labelledby="home-hero-title"
        className="surface-grid relative isolate flex min-h-[calc(100svh-var(--layout-header-height))] overflow-hidden border-b border-[var(--color-border)]"
        data-home-hero=""
        id="home-hero"
      >
        <HeroScrollTransition heroId="home-hero" />
        <h1 className="sr-only" id="home-hero-title">
          {page.heading}
        </h1>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 font-serif font-semibold"
        >
          <span data-hero-background-mark="">
            <span>E</span>
            <span>Y</span>
          </span>
        </div>
        <div
          className="relative z-10 mx-auto flex min-h-[calc(100svh-var(--layout-header-height))] w-full max-w-[var(--layout-wide)] items-center justify-center px-[var(--layout-gutter)] py-[clamp(4rem,8svh,7rem)]"
          data-hero-particle-stage=""
        >
          <ParticleHeroLoader label="Decorative particle rendering of Enes Yilmaz" />
        </div>
      </section>

      <section
        aria-labelledby="home-hero-support-title"
        className="border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-background),var(--color-surface)_18%)] py-[clamp(3.5rem,8vw,7rem)]"
        data-home-hero-support=""
      >
        <div className="mx-auto w-full max-w-[var(--layout-wide)] px-[var(--layout-gutter)]">
          <div className="max-w-[var(--layout-reading)] border-t border-[var(--color-border)] pt-[var(--space-8)]">
            <h2
              className="font-semibold text-[var(--color-foreground)] text-[var(--font-size-xl)]"
              id="home-hero-support-title"
            >
              {page.role}
            </h2>
            <p className="mt-[var(--space-4)] leading-[var(--line-height-relaxed)] text-[var(--color-foreground-muted)] text-[var(--font-size-lg)]">
              {page.position}
            </p>
            <p className="mt-[var(--space-3)] text-[var(--color-foreground-subtle)]">
              {page.support}
            </p>
            <div className="mt-[var(--space-8)]">
              <ButtonLink href={createLocalePath(locale, "work")}>
                {page.primaryAction}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
