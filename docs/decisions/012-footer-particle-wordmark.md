# ADR 012: Particle NOI Wordmark In The Footer

## Status

Accepted.

## Context

The footer needed a brand moment above its content: the NOI wordmark spread edge to edge, as in the hero, drawn as particles. The Phase 4 particle hero ([ADR 009](009-canvas-particle-hero.md)) already established a small custom Canvas 2D particle approach, so a particle library (particles.js or similar) would add a dependency for behaviour we already own.

## Decision

- `site-footer.tsx` stays a Server Component. It renders the wordmark as the real `NoiLetter` SVGs, which are the static fallback for no JavaScript, reduced motion and load failures.
- `footer-particles-loader.tsx` imports the canvas only when the footer comes within 300px of the viewport, and never for reduced motion.
- `footer-particles-engine.ts` samples particle targets from the rendered SVG paths using their own screen transforms (`getScreenCTM`), so particles match the CSS layout and logo outlines exactly. Targets are jittered within each sample cell, so the mark reads as grain rather than a grid.
- Particles start scattered below the mark and spring into place when it becomes visible; a fine pointer pushes them aside on tablet and desktop.
- When every particle has settled, the loop stops, so a resting footer costs nothing. Input, resize or returning to view restarts it. It also pauses when the tab is hidden.
- Budgets per tier: 380 particles on desktop, 280 on tablet and 200 on mobile, kept low so the dots can be large without merging. All dots share the footer ink colour and are filled with a single path. DPR is capped at 2 (1.5 on mobile). The engine can draw squares instead of arcs for a cheaper tier, but no tier needs it at these counts.
- The static letters fade out only after the first particle frame has painted, so the mark is never blank.

## Consequences

- No new dependency; the canvas chunk loads only near the footer.
- On a 390px viewport with 4x CPU throttling, assembly runs at a p50 frame of 16.7ms (p95 33ms) after the one-off sampling step.
- The footer appears on every route, so the particle code can load on any page, but only when the visitor reaches the footer.
