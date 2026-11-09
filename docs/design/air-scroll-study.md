# AIR intro settling study

Reference: https://aircenter.space/ (desktop, 1440x900).
Inspected live interaction and public client-side configuration on 2026-10-20.

## Findings

- Logo scaling starts with the first scroll movement. It is not held at full
  size until an 80% threshold. The desktop transform reaches its small state
  around 85% of the hero height.
- Snap points are at 0 and 900px, one full hero height apart.
- After input rests for about 250ms, the nearest snap point is selected.
  The dividing point is approximately 50%, not 80%.
- Three wheel events produced a target of 360px. The logo visibly shrank
  while scrolling, then grew back as the scroll returned to 0.
- Four events produced 480px and completed to 900px; six produced 720px and
  also completed to 900px. End logo width was 500px versus 1400px at the top.
- The automatic scroll uses a 1000ms duration and cubic-bezier(.25,0,.35,1),
  followed by the reference site's own virtual-scroll interpolation.

## Local adaptation and limits

Use nearest-endpoint settling inside the hero, with the measured idle time,
duration and easing. Keep normal native scrolling. Fresh wheel, pointer,
touch, navigation keys or tab hiding interrupt settling; reduced motion skips
it. Nothing outside the hero snaps. No event prevents normal browser input.

This reproduces the return/complete decision and nominal timing. It is not
an identical copy of AIR's entire virtual-scroll engine, touch handling or
frame-by-frame movement. Our logo and dot retain their existing motion and
rendering fixes. Reference JavaScript is not copied into the project.
