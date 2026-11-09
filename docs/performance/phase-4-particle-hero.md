# Home Hero Performance Notes

## Scope

The home hero follows the AIR reference (see ADR 010): preloader, wordmark docking into the header, fading copy and a Canvas 2D sculpture background.

## Budget Decisions

- The sculpture renderer is dynamically imported only after the hero intersects the viewport.
- Non-home routes do not render the sculpture host or load its code.
- Reduced-motion users get no canvas, no preloader and no docking.
- Rendering pauses when the hero leaves view or the document becomes hidden.
- Scroll work is one `requestAnimationFrame` per scroll burst and only writes `transform`, `opacity` and two custom properties on the hero element.
- Letter rectangles are measured on load, resize and font load, never during scroll.

## Sculpture Tier Caps

| Tier          | Width            | Plates | Max DPR | Frame interval |
| ------------- | ---------------- | -----: | ------: | -------------- |
| mobile        | below 640px      |     84 |     1.5 | ~30 fps        |
| tablet        | 640px to 1023px  |    104 |     1.5 | ~60 fps        |
| desktop       | 1024px to 1599px |    128 |    1.75 | display rate   |
| large-desktop | 1600px and above |    144 |    1.75 | display rate   |

## Validation

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- Playwright: semantics, no-JS, reduced motion, sculpture route isolation, docking hand-over, preloader, client-navigation cleanup, CTA clickability and viewport fit at 320x568, 375x667, 390x844 and 844x390.
