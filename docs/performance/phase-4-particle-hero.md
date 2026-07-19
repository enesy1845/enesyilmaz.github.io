# Phase 4 Particle Hero Performance Notes

## Scope

Phase 4 adds a home-only progressive particle hero and a CSS-variable based hero-to-header scroll transition.

## Budget Decisions

- The Canvas renderer is dynamically imported only after the home hero intersects the viewport.
- Non-home routes must not load or render the particle host.
- Reduced-motion users receive the static fallback only.
- Coarse pointers keep the particle animation but disable pointer displacement.
- Particle count and DPR are capped by viewport tier.
- Animation pauses when the hero leaves view or the document becomes hidden.

## Initial Tier Caps

| Tier          | Width            | Max particles | Max DPR |
| ------------- | ---------------- | ------------: | ------: |
| small-mobile  | below 360px      |           420 |       1 |
| large-mobile  | 360px to 639px   |           620 |    1.25 |
| tablet        | 640px to 1023px  |           900 |     1.5 |
| desktop       | 1024px to 1599px |          1300 |     1.5 |
| large-desktop | 1600px and above |          1600 |     1.5 |

## Validation Expectations

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- Playwright checks for home route semantics, no-JS fallback, reduced motion, particle route isolation, CTA clickability, and scroll state.
