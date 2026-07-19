export function ParticleHeroFallback() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden rounded-[var(--radius-lg)] bg-[radial-gradient(circle_at_25%_20%,color-mix(in_srgb,var(--color-accent),transparent_84%),transparent_34%),linear-gradient(135deg,color-mix(in_srgb,var(--color-surface),transparent_20%),color-mix(in_srgb,var(--color-background),var(--color-surface)_34%))]"
      data-particle-fallback=""
    >
      <div className="grid gap-1 text-center font-serif text-[clamp(3.4rem,7vw,6.5rem)] leading-[0.88] font-semibold text-[color-mix(in_srgb,var(--color-foreground),transparent_18%)]">
        <span>ENES</span>
        <span>YILMAZ</span>
      </div>
      <div className="absolute inset-x-[var(--space-5)] bottom-[var(--space-5)] flex justify-between border-t border-[var(--color-border)] pt-[var(--space-3)] font-mono text-[var(--color-foreground-subtle)] text-[var(--font-size-xs)]">
        <span>Code</span>
        <span>Thought</span>
        <span>Craft</span>
      </div>
    </div>
  );
}
