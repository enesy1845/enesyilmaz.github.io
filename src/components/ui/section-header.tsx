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
        <p className="font-mono tracking-[var(--letter-spacing-label)] text-[var(--color-accent)] text-[var(--font-size-xs)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-[var(--space-3)] font-serif leading-[var(--line-height-heading)] text-balance text-[var(--font-size-2xl)]">
        {title}
      </h2>
      {description ? (
        <p className="mt-[var(--space-4)] leading-[var(--line-height-relaxed)] text-[var(--color-foreground-muted)] text-[var(--font-size-md)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
