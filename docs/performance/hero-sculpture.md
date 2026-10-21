# Hero Sculpture: Performance And Test Guide

How to verify the WebGL Code Helix (see [ADR 011](../decisions/011-webgl-code-helix.md)) and its Canvas 2D fallback, and what the current numbers are.

## Current measurements

Production build, Windows, Chromium with GPU (D3D11), measured with `npm run perf:hero`. Mobile is a 390x844 viewport at DPR 3 with 4x CPU throttling. Each value is a single run, so treat differences under about 150ms as noise. Draws/frame is averaged over all animation frames; a rendered frame costs 8 draws (5 meshes plus 3 in the shadow pass).

| Scenario       | Renderer  | LCP    | CLS   | Longest task | FPS | p95 frame | Draws/frame | Off-screen draws |
| -------------- | --------- | ------ | ----- | ------------ | --- | --------- | ----------- | ---------------- |
| Desktop        | WebGL     | 2.94 s | 0     | 140 ms       | 57  | 16.8 ms   | 4           | 0                |
| Desktop        | Canvas 2D | 2.90 s | 0     | 69 ms        | 61  | 16.7 ms   | -           | -                |
| Mobile, 4x CPU | WebGL     | 4.98 s | 0     | 593 ms       | 58  | 16.8 ms   | 4           | 0                |
| Mobile, 4x CPU | Canvas 2D | 5.13 s | 0.005 | 575 ms       | 58  | 16.8 ms   | -           | -                |

### Before and after the optimisation (desktop)

| Metric                       | First WebGL version | Now    |
| ---------------------------- | ------------------- | ------ |
| Longest main-thread task     | 2.6 s               | 140 ms |
| LCP                          | 4.5 s               | 2.94 s |
| LCP cost vs Canvas 2D        | +1.6 s              | none   |
| Draws per rendered frame     | 116                 | 8      |
| Mobile LCP cost vs Canvas 2D | about +1.3 s        | none   |

Where the 2.6s went: about 1.47s was the PMREM environment compiling its shaders synchronously, 0.6s the material shaders (now compiled in parallel) and the rest context creation, geometry and the first frame. The fixes are described in ADR 011.

### Bundle

Three.js loads as two async chunks, about 143 KB gzipped (573 KB raw), only on the home hero after the page is interactive. Initial JavaScript for every route is unchanged.

### Known limits

- **LCP is bounded by the preloader, not the sculpture.** The LCP element is the hero copy revealed at the end of the intro, so LCP sits near 2.9s on a fast desktop even with Canvas 2D. Reaching the 2.5s target requires shortening or reworking the intro (ADR 010), which is a design decision.
- Under 4x CPU throttling, hydration itself produces 500 to 600ms tasks on the Canvas 2D path too.
- The canvas covers the viewport, so very large high-DPR screens are fill-rate bound. DPR is capped at 1.5 to 1.75 per tier.

## Automated checks

```bash
npm run test                                   # helix model: periodic loop, panels, framing, tiers
npx playwright test -g "sculpture|without animation|JavaScript is disabled"
npm run build && npm run start                 # production server on :3000
npm run perf:hero                              # table above; pass another origin as an argument
```

Headless Chromium in CI renders WebGL in software, so `failIfMajorPerformanceCaveat` sends it to the Canvas 2D fallback. The e2e suite therefore covers the fallback path. The real WebGL path is covered by `perf:hero` (which launches Chromium with the GPU) and the manual checks below.

## Manual checks

Use a production build (`npm run build && npm run start`). Development mode includes extra checks and shader warnings that do not reflect production.

### 1. Which renderer is running

In the DevTools console:

```js
document.querySelector("[data-sculpture-host]").dataset.sculptureRenderer;
// "webgl" | "canvas2d" | "none" (reduced motion, intro still running, or not loaded)
```

The canvas appears only after the intro finishes, so `none` during the first few seconds is expected.

### 2. Main thread and frame rate

1. DevTools > Performance > record a reload of `/en` for about 8 seconds.
2. In the Main track, the WebGL setup should appear after the intro as several short tasks, none longer than about 200ms on desktop. A single long yellow block after the intro means the PMREM pre-warm is no longer effective (likely after a `three` upgrade).
3. The LCP marker (Timings track) should sit before those tasks.
4. For live FPS: Rendering panel > Frame Rendering Stats. Expect a steady 60 fps on desktop and about 30 fps on phones (the mobile tier renders every other frame).

### 3. Mobile and low-end devices

- Device Toolbar at 390x844 and 768x1024; Performance panel with CPU 4x or 6x slowdown.
- Devices reporting less than 4 GB memory or 2 or fewer CPU cores get Canvas 2D automatically. DevTools cannot emulate these values, so check this on a real low-end phone.
- Remote-debug a real Android phone over `chrome://inspect` and an iPhone through Safari's Develop menu. Mobile Safari is the most important browser to verify by hand.

### 4. Pausing and the seamless loop

| Check            | How                                                                | Expected                            |
| ---------------- | ------------------------------------------------------------------ | ----------------------------------- |
| Off-screen pause | Scroll past the hero and watch Frame Rendering Stats               | No GPU frames from the sculpture    |
| Hidden tab pause | Switch tabs for a few seconds, then return                         | Animation resumes where it left off |
| 16s loop         | Watch for 40s                                                      | No jump at 16s or 32s               |
| Reduced motion   | Rendering panel > Emulate `prefers-reduced-motion: reduce`, reload | No canvas, static hero              |
| Resize           | Drag the window between desktop and mobile widths                  | Sculpture reframes, no stretching   |

### 5. Fallback and recovery

Simulate a lost GPU context (production or development):

```js
document
  .querySelector("canvas")
  .getContext("webgl2")
  .getExtension("WEBGL_lose_context")
  .loseContext();
// dataset.sculptureRenderer becomes "canvas2d"
```

Software rendering: turn off "Use graphics acceleration when available" in Chrome settings, restart, reload. The renderer must be `canvas2d`. Turn it back on afterwards.

### 6. GPU memory and leaks

1. Open `/en`, wait for the sculpture, then navigate to Work with the header link.
2. `document.querySelectorAll("canvas").length` must be `0`.
3. Repeat home and Work ten times with the Memory panel open; the JS heap should return to the same level and `chrome://gpu` should not report lost contexts.

### 7. Lighthouse

DevTools > Lighthouse > Mobile and Desktop on the production build, in an incognito window without extensions. Compare against the targets in AGENTS.md. Expect LCP to be limited by the intro, as noted above.

## Re-measure when

- `three` is upgraded (the PMREM pre-warm depends on its internals),
- the panel count, materials, lights or shadow settings change,
- the intro timing changes,
- a quality tier (DPR, shadow map size, frame interval) changes.
