type CaseStudySectionProps = {
  title: string;
  items?: readonly string[];
  body?: string;
};

export function CaseStudySection({
  title,
  items,
  body,
}: CaseStudySectionProps) {
  if (!body && (!items || items.length === 0)) {
    return null;
  }

  return (
    <section className="border-t border-[var(--color-border)] py-[var(--space-8)]">
      <h2 className="font-serif text-[var(--font-size-xl)]">{title}</h2>
      {body ? (
        <p className="mt-[var(--space-4)] max-w-[var(--layout-reading)] leading-[var(--line-height-relaxed)] text-[var(--color-foreground-muted)]">
          {body}
        </p>
      ) : null}
      {items ? (
        <ul className="mt-[var(--space-4)] grid gap-3 text-[var(--color-foreground-muted)]">
          {items.map((item) => (
            <li className="leading-[var(--line-height-relaxed)]" key={item}>
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
