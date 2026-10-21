import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/i18n/config";

type PageIntroAction = {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "ghost" | "text";
};

type PageIntroProps = {
  heading: string;
  description: string;
  eyebrow?: string;
  locale: Locale;
  actions?: PageIntroAction[];
  meta?: string;
};

export function PageIntro({
  heading,
  description,
  eyebrow,
  locale,
  actions = [],
  meta,
}: PageIntroProps) {
  return (
    <section className="surface-grid border-b border-[var(--color-border)] py-[var(--space-section)]">
      <Container className="grid gap-[var(--space-10)] lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <div>
          {eyebrow ? (
            <p className="font-mono text-[length:var(--font-size-xs)] tracking-[var(--letter-spacing-label)] text-[var(--color-accent)]">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-[var(--space-4)] max-w-4xl font-serif text-[length:var(--font-size-display)] leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] text-balance">
            {heading}
          </h1>
          <p className="mt-[var(--space-6)] max-w-[var(--layout-reading)] text-[length:var(--font-size-lg)] leading-[var(--line-height-relaxed)] text-[var(--color-foreground-muted)]">
            {description}
          </p>
          {actions.length > 0 ? (
            <div className="mt-[var(--space-8)] flex flex-wrap gap-[var(--space-3)]">
              {actions.map((action) => (
                <ButtonLink
                  href={action.href}
                  key={action.href}
                  variant={action.variant}
                >
                  {action.label}
                </ButtonLink>
              ))}
            </div>
          ) : null}
        </div>
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5)] text-[length:var(--font-size-sm)] text-[var(--color-foreground-muted)] shadow-[var(--shadow-subtle)]">
          <p className="font-mono text-[length:var(--font-size-xs)] text-[var(--color-foreground-subtle)]">
            /{locale}
          </p>
          {meta ? <p className="mt-[var(--space-3)]">{meta}</p> : null}
        </div>
      </Container>
    </section>
  );
}
