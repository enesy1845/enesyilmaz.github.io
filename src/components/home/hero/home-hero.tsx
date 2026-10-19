import Link from "next/link";
import type { CSSProperties } from "react";

import { HeroMotion } from "@/components/home/hero/hero-motion";
import { HeroSculptureLoader } from "@/components/home/hero/hero-sculpture-loader";
import { siteConfig } from "@/config/site";
import type { HomeContent } from "@/data/home";
import type { Locale } from "@/i18n/config";
import { createLocalePath } from "@/i18n/routing";
import type { Dictionary } from "@/i18n/types";
import { getWordmarkWords } from "@/lib/utils/wordmark";

type HomeHeroProps = {
  dictionary: Dictionary;
  locale: Locale;
  page: HomeContent;
  nextSectionId?: string;
};

/**
 * Runs before first paint so the preloader state is in place without a flash.
 * The timeout is a safety net in case the client bundle never hydrates.
 */
const introScript = `(function(){try{var d=document.documentElement;if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.heroMotion="reduced";return}d.dataset.heroMotion="full";d.dataset.heroState=window.scrollY>8?"hero-transitioning":"hero-top";if(sessionStorage.getItem("hero-intro-seen"))return;d.dataset.heroIntro="loading";setTimeout(function(){if(d.dataset.heroIntro==="loading")d.dataset.heroIntro="done"},5000)}catch(e){}})();`;

function ArrowDownIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
    >
      <path
        d="M10 3v13m0 0-5.5-5.5M10 16l5.5-5.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="16"
      viewBox="0 0 16 16"
      width="16"
    >
      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function HomeHero({
  locale,
  page,
  nextSectionId = "home-next",
}: HomeHeroProps) {
  const words = getWordmarkWords(siteConfig.wordmark);

  function renderWord(letters: (typeof words)[number], wordIndex: number) {
    return (
      <span
        aria-hidden="true"
        className="hero__word"
        data-hero-word={wordIndex}
        key={wordIndex}
      >
        {letters.map((letter) => (
          <span
            className="hero__letter"
            data-hero-letter={letter.index}
            key={letter.index}
          >
            <span
              className="hero__letter-inner"
              style={{ "--i": letter.index } as CSSProperties}
            >
              {letter.character}
            </span>
          </span>
        ))}
      </span>
    );
  }

  return (
    <section
      aria-labelledby="home-hero-title"
      className="hero"
      data-home-hero=""
      id="home-hero"
    >
      <script dangerouslySetInnerHTML={{ __html: introScript }} />
      <HeroMotion heroId="home-hero" />
      <div aria-hidden="true" className="hero__progress" />

      <div className="hero__backdrop">
        <HeroSculptureLoader />
      </div>

      {/* Pinned layer: held in place by the browser (position: fixed once
          motion is enabled) so scrolling never makes it jitter; the next
          section slides over it, like AIR's sticky intro. */}
      <div className="hero__stage hero__pinned">
        <h1 className="sr-only" id="home-hero-title">
          {page.heading}
        </h1>

        <div className="hero__subtitle" data-hero-fade="">
          <p className="hero__reveal">
            <span>{page.role}</span>
            <span>{page.heroKicker}</span>
          </p>
        </div>

        <div className="hero__wordmark">
          <div className="hero__letters">
            {words.map((letters, index) => renderWord(letters, index))}
          </div>
          <div className="hero__lead" data-hero-fade="">
            <p className="hero__reveal">{page.position}</p>
          </div>
        </div>

        <div aria-hidden="true" className="hero__footer-space" />
      </div>

      <div className="hero__stage hero__flow">
        <div className="hero__footer" data-hero-fade="">
          <nav
            aria-label="Hero links"
            className="hero__actions hero__reveal-bottom"
          >
            <Link
              className="hero__button hero__button--primary"
              href={createLocalePath(locale, "work")}
            >
              <span>{page.primaryAction}</span>
              <PlusIcon />
            </Link>
            <Link
              className="hero__button hero__button--secondary"
              href={createLocalePath(locale, "about")}
            >
              {page.secondaryAction}
            </Link>
          </nav>
          <a
            aria-label={page.manifestoTitle}
            className="hero__next hero__reveal-bottom"
            href={`#${nextSectionId}`}
          >
            <ArrowDownIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
