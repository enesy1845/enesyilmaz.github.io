# Initial Performance Plan

Phase: 0 - planning only. Exact budgets should be set after image dimensions, bundle output, and route behavior can be measured in later phases.

## Targets

Core Web Vitals targets:

- LCP: 2.5 seconds or less.
- INP: 200 milliseconds or less.
- CLS: 0.1 or less.

Lighthouse targets for production builds:

- Performance: 90 or higher.
- Accessibility: 95 or higher.
- Best Practices: 95 or higher.
- SEO: 95 or higher.

## Current Legacy Findings

- The current page loads Bootstrap CSS and JS from jsDelivr.
- The current page loads Font Awesome from cdnjs.
- The current page loads Google Fonts.
- The current page embeds three YouTube iframes eagerly.
- Portfolio screenshots are PNG files and many are large.
- `images/profil.png` is 1.6 MB and appears to be mismatched with the HTML reference to `images/profile.png`.
- Portfolio image tags do not include explicit width and height.
- Exact image dimensions and compression opportunities require later measurement.

## JavaScript Budget Principles

- Ship minimal client JavaScript.
- Keep pages and layouts as Server Components by default.
- Create client components only for real interactivity.
- Avoid large UI frameworks and broad animation packages.
- Avoid barrel imports from icon or animation libraries.
- Load route-specific code only on routes that need it.
- Treat WebGL, Canvas, audio, and rich graph behavior as opt-in enhancements.

Exact JavaScript size budgets are measurements required in a later phase after the first Next.js build exists.

## Image Budget Principles

- Every migrated image must have a purpose, known dimensions, and correct alt text.
- Use `next/image` where it improves layout stability and optimization.
- Prefer WebP or AVIF for screenshots and photos where quality is acceptable.
- Avoid committing duplicate image variants without a clear naming and generation policy.
- Lazy-load below-the-fold media.
- Reserve dimensions or aspect ratios for all media to prevent layout shift.

Exact per-image and per-route image budgets are measurements required in a later phase.

## Font Budget Principles

- Use local fonts only after license confirmation.
- Minimize font families, weights, and styles.
- Do not load fonts from Google Fonts or another third-party CDN in production.
- Use `next/font/local` for future self-hosted fonts.
- Prefer system fonts until local font choices are confirmed.

Exact font file budgets are measurements required in a later phase.

## Route-Level Code Splitting

Next.js App Router should naturally split by route. The implementation should preserve that by keeping route-only components and data close to the route or feature that needs them.

The ecosystem graph, particle hero, MDX rendering helpers, video embeds, and any future audio controls should not load on routes that do not use them.

## Dynamic Loading Strategy

Dynamic imports should be used for:

- particle hero rendering,
- SVG ecosystem graph interaction if the static fallback is enough for first paint,
- YouTube embed previews,
- any browser-only visualization,
- noncritical animation runtime.

Dynamic components must include loading, failure, and reduced-motion fallbacks.

## WebGL Lifecycle Rules

The future particle hero may use WebGL or Canvas, but only as an isolated enhancement. It must:

- render after semantic hero content,
- pause when off-screen,
- pause when the document is hidden,
- reduce density on mobile and low-power devices,
- stop or simplify when `prefers-reduced-motion` is enabled,
- avoid continuous rendering when the visual state is static,
- never contain the only readable copy of the heading.

## Ecosystem Graph Performance Rules

- Start with SVG and React, not Three.js.
- Avoid continuously unstable force simulations.
- Keep graph data typed and small.
- Render a static semantic fallback.
- Use controlled transitions only on interaction or reveal.
- Prefer mobile hierarchy or accordion behavior over dense graph rendering.
- Do not load graph code outside routes that use it.

## Reduced-Motion Behavior

When `prefers-reduced-motion` is enabled:

- disable particle motion,
- disable scroll or entrance motion,
- keep hover/focus feedback non-motion-based where possible,
- preserve all content and navigation,
- avoid animation-dependent tests.

## Mobile Degradation Strategy

Mobile should receive simpler visual behavior by default:

- lower particle density,
- simpler ecosystem hierarchy,
- fewer simultaneous animations,
- smaller media payloads,
- touch-friendly controls,
- stable layout dimensions.

Mobile behavior should be designed intentionally rather than treated as a compressed desktop layout.

## Off-Screen Animation Pausing

Use Intersection Observer or an equivalent React abstraction for heavy visual components. Heavy rendering should stop when the component leaves the viewport and resume only when useful.

## Document Visibility Pausing

Use the Page Visibility API for the particle hero, graph animation if any, and future audio. Rendering or playback should stop when `document.hidden` is true.

## Third-Party Script Policy

- No analytics by default.
- No trackers in the foundation.
- No third-party forms without review.
- No eager YouTube embeds on the critical path.
- No CDN CSS or JS for framework, icon, or font dependencies in production.

Third-party resources should require an explicit purpose, privacy review, and performance review.

## Production Bundle Analysis Plan

After the first Next.js foundation exists:

1. Run production build.
2. Inspect route-level JavaScript output.
3. Identify shared chunks and unexpected client components.
4. Check image optimization output and route payloads.
5. Add bundle analysis tooling only if needed and documented.
6. Record measured budgets in a future `docs/performance/budgets.md`.
7. Re-run analysis after adding the particle hero, ecosystem graph, MDX, or video embeds.
