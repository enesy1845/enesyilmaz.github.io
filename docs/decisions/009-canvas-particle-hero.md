# ADR 009: Use Canvas 2D For The Phase 4 Particle Hero

## Status

Accepted for Phase 4

## Context

The home hero needs a progressive visual identity layer that supports the Code / Thought / Craft narrative without making the effect more important than content. The semantic name, role, description, links, and route structure must render before the visual enhancement and remain usable without JavaScript, Canvas, or motion.

The implementation must stay inside Phase 4. It should not introduce the final Phase 5 particle system, a site-wide animation system, Three.js, audio, or any Cloudflare deployment work.

## Decision

Use a small custom Canvas 2D renderer that is dynamically imported only from the home hero when the hero is visible and the browser capabilities allow it.

The renderer samples an offscreen text canvas with `getImageData`, caps particle count by viewport tier, caps DPR, disables pointer interaction on coarse pointers, pauses when the hero is off-screen, pauses when the document is hidden, and skips initialization for `prefers-reduced-motion`.

The hero keeps a static decorative fallback behind semantic HTML. The Canvas layer is `aria-hidden` because it duplicates visible text.

## Alternatives Considered

- WebGL: useful for a later heavier renderer, but more complexity than Phase 4 needs.
- Three.js: rejected for this phase because it adds a large dependency and is unnecessary for a text-particle layer.
- A small particle package: rejected because the behavior needed here is narrow, and a package would still require accessibility, motion, visibility, and bundle isolation wrappers.
- Pure CSS/SVG: simpler, but less suitable for capped particle sampling and pointer displacement.

## Consequences

- No new runtime dependency is added.
- Client JavaScript remains route-local and lazy-loaded.
- The visual enhancement has explicit fallback, reduced-motion, visibility, and pointer behavior.
- The final Phase 5 particle system can replace or extend this renderer without changing the semantic hero content.
