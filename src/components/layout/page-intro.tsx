import type { Locale } from "@/i18n/config";

type PageIntroProps = {
  heading: string;
  description: string;
  eyebrow?: string;
  locale: Locale;
};

export function PageIntro({
  heading,
  description,
  eyebrow,
  locale,
}: PageIntroProps) {
  return (
    <section className="mx-auto w-full max-w-[var(--max-content-width)] px-[var(--space-page-x)] py-[var(--space-section-y)]">
      {eyebrow ? (
        <p className="font-mono text-sm tracking-[0.12em] text-[var(--color-accent)] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-4 max-w-3xl text-4xl font-semibold text-pretty sm:text-5xl">
        {heading}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
        {description}
      </p>
      <p className="mt-8 font-mono text-sm text-[var(--color-muted)]">
        /{locale}
      </p>
    </section>
  );
}
