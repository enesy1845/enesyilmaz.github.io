# ADR 012: Particle NOI Wordmark In The Footer

## Status

Accepted.

## Context

The home page ended with a large solid NOI closing mark (animated by `NoiMotion`). It was replaced by a particle version that sits at the top of the footer on every route; the solid mark and `NoiMotion` were removed so the logo is not shown twice. The Phase 4 particle hero ([ADR 009](009-canvas-particle-hero.md)) already established a small custom Canvas 2D particle approach, so a particle library (particles.js or similar) would add a dependency for behaviour we already own.

## Decision

- `site-footer.tsx` stays a Server Component. It renders the wordmark as the real `NoiLetter` SVGs, which are the static fallback for no JavaScript, reduced motion and load failures.
- `footer-particles-loader.tsx` imports the canvas only when the footer comes within 300px of the viewport, and never for reduced motion.
- `footer-particles-engine.ts` samples particle targets from the rendered SVG paths using their own screen transforms (`getScreenCTM`), so particles match the CSS layout and logo outlines exactly. Targets lie on an even dot-matrix grid: the pitch is derived from the letter height (`rows` per tier) and columns and rows are fitted to each shape, so every letter starts and ends on a whole dot. A randomly jittered grain was tried first and looked noisy.
- Particles start scattered below the mark and spring into place when it becomes visible; a fine pointer pushes them aside on tablet and desktop.
- When every particle has settled, the loop stops, so a resting footer costs nothing. Input, resize or returning to view restarts it. It also pauses when the tab is hidden.
- Rows per tier: 16 on desktop, 14 on tablet and 12 on mobile, which keeps the dots large and evenly spaced (a few hundred to about a thousand dots). All dots share the footer ink colour and size and are filled with a single path. DPR is capped at 2 (1.5 on mobile).
- The static letters fade out only after the first particle frame has painted, so the mark is never blank.

## Consequences

- No new dependency; the canvas chunk loads only near the footer.
- The footer appears on every route, so the particle code can load on any page, but only when the visitor reaches the footer.
