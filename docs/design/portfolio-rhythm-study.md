# Portfolio rhythm and navigation study

Date: 2026-10-21. Scope: a visual revision of the existing home and shared
navigation (design/static-home work, with interaction feedback). This does
not start a new migration, graph, particle, audio or deployment phase.

## References inspected

The live pages were read and inspected in desktop Chromium. References are
observations, not templates or sources of copied code/assets.

- [Paco Coursey](https://paco.me/): a short identity statement, generous space,
  and separate Building / Projects / Writing columns. Short descriptions make
  links scannable. Adapt the grouping and deliberate hierarchy.
- [Emil Kowalski](https://emilkowal.ski/): a compact identity, clear Today /
  Projects / Writing groups, and concise project descriptions. Adapt the
  separation between an overview and deeper reading.
- [Rauno Freiberg](https://rauno.me/): strong typographic scale and a simple
  geometric composition make identity a visual anchor. Adapt the confidence
  of the composition; keep this portfolio's native vertical scrolling.
- [Brittany Chiang](https://brittanychiang.com/): role and professional context
  lead into experience and projects. Retain professional evidence ahead of
  the personal disciplines. This reference was read, not visually audited.

## Diagnosis

The previous home repeatedly used a heading, supporting paragraph and text
list. The long, large manifesto was followed by work, expertise, disciplines,
notes, atelier, biography and contact copy at similar visual weight. Adding
more photographs would leave that information hierarchy unresolved.

## Applied direction: a digital atelier

- Keep the NOI identity, local font and existing hero behavior.
- Crop the existing image into a shorter interlude, retaining the original
  asset rather than adding another decorative image.
- Reduce the manifesto to its existing single-sentence premise. Link to About
  for the professional narrative instead of repeating it on the overview.
- Anchor selected work with one lead project and a compact index of the other
  four. Show only existing public screenshots. Abstract linked paths are
  decoration, not a diagram of confidential municipal architecture.
- Make expertise a native details/summary index. All descriptions are present
  in server HTML, and open by keyboard or touch without JavaScript.
- Give Code / Thought / Craft a shared vocabulary of SVG line studies:
  connected paths, intersecting circles and concentric tool marks. They are
  decorative companion graphics, not a new ecosystem graph.
- Use a dark discipline section to interrupt the repeated light text sections.
  Switch writing to a system serif stack; no new font download or license.
- Label the featured note's actual language, including on other locale homes.
- Present atelier subjects as a small material index. Shorten the biography
  using a typed, localized lead drawn from existing personal facts.
- Give contact a two-column closing composition and a direct email link.
- Keep the header transparent and unframed at the top, with an underlined
  active state and a short locale indicator. Restore the existing floating
  glass island after the leading edge of the hero image passes the viewport
  by about 24px: identity and desktop language controls disappear, while
  navigation stays available. Scrolling back restores the full header.
  Two small IntersectionObservers handle the threshold and inverse-section
  ink colour. Without JavaScript the header remains in document flow.

## Motion and performance constraints

No package, tracking script, new image, or animation loop was introduced.
The follow-up adds two small client controls: header contrast and explicit
email copying. The contrast observer replaces the old per-scroll auto-hide
listener. Category filtering uses native radios and CSS, without client
state. New SVGs render on the server. CSS hover/focus feedback uses
transform on arrows, drawings and public thumbnails. All of it follows the
existing global reduced-motion override. Disclosures open without animated
height, avoiding layout animation and hover-only details. The new sections
render fully visible immediately. Existing hero and footer rendering controls
are retained. This is not a Lighthouse or real-user Core Web Vitals claim.

## Validation

The new browser coverage checks native disclosures with JavaScript disabled,
keyboard activation, 320px layouts in all three locales, case-study links,
and persistent desktop header controls. Existing shell checks cover hero
transitions, mobile navigation and automated accessibility.

To reuse an already running local server (and avoid a second Next development
process locking the same checkout), set `PLAYWRIGHT_BASE_URL`, for example:

```powershell
$env:PLAYWRIGHT_BASE_URL = 'http://localhost:3000'
npm run test:e2e
```

Without that setting, Playwright retains its existing managed server on 3100.

Initial revision verified on 2026-10-21: full lint, TypeScript, 51 unit tests, 46 Chromium
end-to-end tests (including axe checks), production build and formatting of
changed files passed. Desktop and Turkish mobile compositions were visually
reviewed. Lighthouse, INP and real-user Core Web Vitals were not measured.

The [expanded component study](minimal-components-study.md) records the
follow-up research and the user's preference for a transparent navbar.
