# ADR 011: WebGL Code Helix As The Primary Hero Sculpture

## Status

Accepted. Amends [ADR 010](010-air-style-hero.md): the Canvas 2D sculpture becomes the fallback.

## Context

The approved "NOI Code Helix / Studio 3D" prototype is a porcelain-white sculpture: about 54 beveled code panels with tone-on-tone syntax inlays, joined by curved ribs over two helical turns, lit like a studio object. The Canvas 2D painter's-algorithm renderer from ADR 010 cannot produce beveled geometry, soft self-shadowing or environment reflections at that fidelity.

## Decision

- Add `three` (direct Three.js, no React Three Fiber) as the only new runtime dependency, installed through npm. There are no CDN imports.
- `helix-model.ts` holds the pure model: panel layout, the periodic pose, framing per hero layout, and quality tiers. It has no Three.js import and is unit tested.
- `helix-webgl-engine.ts` builds the scene once:
  - extruded, beveled panels and instanced inlays;
  - tube ribs and `MeshPhysicalMaterial` porcelain;
  - hemisphere, key (shadow-casting), fill, rim and accent lights;
  - a generated PMREM softbox environment (no HDR download).
- Animation is a whole-sculpture transform: one full Y revolution plus sin terms over exactly 16s. Phase is wrapped to [0, 1) and elapsed time is kept modulo the period, so the loop has no seam and time never accumulates.
- `hero-sculpture-webgl.tsx` is the small client wrapper:
  - It creates its canvas only after the preloader intro has finished (the backdrop is hidden until then), two frames later and on an idle callback. Setup therefore never competes with the intro or the largest contentful paint, and Strict Mode's immediate unmount cancels before any context exists.
  - It caps DPR per tier, renders mobile at about 30fps and pauses off-screen or when the tab is hidden.
  - On unmount it disposes geometries, materials, the shadow map, the environment target and the renderer, then forces context loss.
- `hero-sculpture-loader.tsx` keeps the existing lazy, IntersectionObserver-gated loading. It tries WebGL when WebGL 2 exists and the device is not obviously low-power. It mounts the Canvas 2D sculpture instead when:
  - the WebGL chunk fails to load,
  - the renderer cannot be created (`failIfMajorPerformanceCaveat` rejects software rendering), or
  - the context is lost.
- Only one renderer is mounted at a time, so only one loop runs.
- Reduced motion is unchanged: no canvas is loaded and the static composition is shown.

## Performance

Measured on a production build (`npm run perf:hero`); figures and the procedure are in [the hero sculpture performance notes](../performance/hero-sculpture.md).

- Panels and ribs are merged into one mesh per material (54 panel meshes and 3 ribs become 3 meshes), cutting draw calls from about 116 to 8 per frame including the shadow pass.
- Shaders compile in parallel with `renderer.compileAsync` (KHR_parallel_shader_compile).
- The PMREM environment compiled its blur and GGX shaders synchronously, blocking the main thread for about 1.3s on Windows/ANGLE. `prewarmPmrem` compiles the generator's own materials asynchronously first, so `fromScene` hits the program cache (about 50ms). It reads PMREMGenerator internals of the exactly pinned `three` version; if an upgrade changes them, the pre-warm is skipped and the old synchronous path still works. Re-check this when upgrading `three`.
- The remaining synchronous work (context, geometry, environment, first frame) runs as separate tasks.

## Consequences

- The hero route loads an additional async chunk for Three.js (see the bundle note in the PR). No other route or the shared layout imports it.
- Devices that are blocklisted, software-rendered or low-memory get the lighter Canvas 2D sculpture.
- No screen-space ambient occlusion pass or CSS drop-shadow filter. Depth comes from self-shadowing and the hemisphere light, which avoids a post-processing pipeline and continuously re-blurring a full-viewport layer.
