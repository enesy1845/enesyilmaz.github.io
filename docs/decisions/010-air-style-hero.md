# ADR 010: AIR-Style Wordmark Hero With A Canvas Sculpture

## Status

Accepted. Supersedes [ADR 009](009-canvas-particle-hero.md).

## Context

The Phase 4 particle hero was a two-column layout with a sampled text-particle canvas. It did not match the intended reference (the intro of [aircenter.space](https://aircenter.space/)), and on mobile the canvas was pushed below the fold, cropped and sparse.

The reference intro consists of:

- a white preloader with a 2px progress bar and logo letters sliding in from the left;
- a full-bleed light stage with a looping sculptural background film;
- a wordmark spread edge to edge, centred uppercase copy and an arrow to the next section;
- on scroll, the copy fades in place while the wordmark letters shrink and dock into the header logo.

## Decision

Rebuild the home hero around that structure:

- The visual mark is "NOI" (`siteConfig.wordmark`), three uppercase letters spread edge to edge like AIR's logo, used by both the hero and the header. The person's name stays the semantic `h1` and the header link's accessible name.
- `home-hero.tsx` renders all copy as semantic HTML. The `h1` is visually hidden; the wordmark letters are decorative (`aria-hidden`).
- `hero-motion.tsx` measures each hero letter and its matching header letter (both built by `getWordmarkWords`) and interpolates translate + scale per scroll frame (FLIP). Letters stay pinned to the viewport while travelling; on the stacked mobile layout the second word trails the first so the rows never collide.
- The preloader plays once per session (`sessionStorage`), is set up by a tiny inline script before first paint, and has a 5s safety timeout.
- The background film is replaced by a Canvas 2D sculpture (a twisting stack of shaded plates), because AGENTS.md forbids autoplaying background video in the foundation phases. It is dynamically imported, paused off-screen and when the tab is hidden, and skipped for reduced motion.
- The header switches to a light, transparent theme while the hero is on screen and back to the site theme once the hero has passed.
- Display type uses Onest (SIL Open Font License) through `next/font/google`, which downloads the files at build time and serves them from the site origin. No request goes to Google at runtime.

## Consequences

- No new runtime dependency.
- Reduced-motion and no-JS users get the full static composition: no preloader, no canvas, header wordmark always visible.
- The build needs network access to fetch Onest. If that is undesirable, the font files can be committed and loaded with `next/font/local` instead.
