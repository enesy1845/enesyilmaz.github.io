import { HeroScrollTransition } from "@/components/home/hero/hero-scroll-transition";
import { ParticleHeroLoader } from "@/components/home/hero/particle-hero-loader";
import { ButtonLink } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { socialLinks } from "@/config/social";
import type { HomeContent } from "@/data/home";
import type { Locale } from "@/i18n/config";
import { createLocalePath } from "@/i18n/routing";
import type { Dictionary } from "@/i18n/types";

type HomeHeroProps = {
  dictionary: Dictionary;
  locale: Locale;
  page: HomeContent;
};

export function HomeHero({ dictionary, locale, page }: HomeHeroProps) {
  const primarySocialLinks = socialLinks.filter((link) =>
    ["linkedin", "github"].includes(link.key),
  );

  return (
    <section
      aria-labelledby="home-hero-title"
      className="surface-grid relative isolate overflow-hidden border-b border-[var(--color-border)] py-[clamp(3.5rem,8svh,7rem)]"
      data-home-hero=""
      id="home-hero"
    >
      <HeroScrollTransition heroId="home-hero" />
      <div
        aria-hidden="true"
        className="hidden font-serif font-semibold lg:block"
        data-hero-large-identity=""
      >
        ENES YILMAZ
      </div>
      <div className="mx-auto grid min-h-[min(82svh,54rem)] w-full max-w-[var(--layout-wide)] items-center gap-[var(--space-10)] px-[var(--layout-gutter)] lg:grid-cols-[minmax(0,0.88fr)_minmax(25rem,0.9fr)]">
        <div
          className="relative z-10 max-w-[var(--layout-reading)]"
          data-hero-identity=""
        >
          <p className="font-mono tracking-[var(--letter-spacing-label)] text-[var(--color-accent)] text-[var(--font-size-xs)]">
            {page.heroKicker}
          </p>
          <h1
            className="mt-[var(--space-5)] font-serif leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] text-balance"
            data-hero-title=""
            id="home-hero-title"
          >
            {page.heading}
          </h1>
          <p className="mt-[var(--space-4)] font-semibold text-[var(--color-foreground)] text-[var(--font-size-xl)]">
            {page.role}
          </p>
          <p className="mt-[var(--space-6)] leading-[var(--line-height-relaxed)] text-[var(--color-foreground-muted)] text-[var(--font-size-lg)]">
            {page.position}
          </p>
          <p className="mt-[var(--space-3)] text-[var(--color-foreground-subtle)]">
            {page.support}
          </p>
          <nav
            aria-label="Hero links"
            className="mt-[var(--space-8)] flex flex-wrap gap-[var(--space-3)]"
          >
            <ButtonLink href={createLocalePath(locale, "work")}>
              {page.primaryAction}
            </ButtonLink>
            <ButtonLink
              href={createLocalePath(locale, "about")}
              variant="secondary"
            >
              {page.secondaryAction}
            </ButtonLink>
          </nav>
          <aside className="mt-[var(--space-8)] border-l border-[var(--color-border-strong)] pl-[var(--space-5)]">
            <p className="font-mono text-[var(--color-foreground-subtle)] text-[var(--font-size-xs)]">
              {dictionary.footer.location}
            </p>
            <ul className="mt-[var(--space-3)] flex flex-wrap gap-x-[var(--space-5)] gap-y-2">
              {primarySocialLinks.map((link) => (
                <li key={link.key}>
                  <ExternalLink href={link.href}>{link.label}</ExternalLink>
                </li>
              ))}
            </ul>
          </aside>
        </div>
        <div
          className="relative min-h-[19rem] sm:min-h-[24rem] lg:min-h-[34rem]"
          data-hero-particle-stage=""
        >
          <ParticleHeroLoader label="Decorative particle rendering of Enes Yilmaz" />
        </div>
      </div>
    </section>
  );
}
