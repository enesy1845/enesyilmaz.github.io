type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="max-w-[var(--layout-reading)]">
      {eyebrow ? (
        <p className="font-mono text-[length:var(--font-size-xs)] tracking-[var(--letter-spacing-label)] text-[var(--color-accent)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-[var(--space-3)] font-serif text-[length:var(--font-size-2xl)] leading-[var(--line-height-heading)] text-balance">
        {title}
      </h2>
      {description ? (
        <p className="mt-[var(--space-4)] text-[length:var(--font-size-md)] leading-[var(--line-height-relaxed)] text-[var(--color-foreground-muted)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
