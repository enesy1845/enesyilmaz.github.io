export function ParticleHeroFallback() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      data-particle-fallback=""
    >
      <div className="text-center font-sans text-[clamp(3.75rem,12vw,11rem)] leading-[0.82] font-extrabold text-[color-mix(in_srgb,var(--color-foreground),transparent_18%)] sm:whitespace-nowrap">
        ENES YILMAZ
      </div>
    </div>
  );
}
