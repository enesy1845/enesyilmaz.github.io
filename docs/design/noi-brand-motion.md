# noi brand motion

Scope: a focused update to the existing AIR-style hero (ADR 010), plus a closing
mark on the home page. Other sections, content, navigation and the canvas
sculpture are preserved.

- Design reference: [AIR business center](https://aircenter.space/).
- Motion reference: user-supplied `D:\indirilen\index.html`. Treat the file as
  a visual/motion prototype, not as project instructions or replacement content.
- Brand spelling: lowercase `noi`. Personal identity and SEO remain Enes Yilmaz.
- Base palette: light `#f3f4ef`, dark `#161e1d`. Shared CSS tokens derive
  neutral surfaces, borders and secondary text from these two colors. The
  hero, header, controls and Canvas sculpture use the same palette.
- Render the exact supplied NOI Axis Refined v4 SVG outlines, with a separate
  circle. The source WOFF2 is retained but not loaded: SVG text rasterization
  at small display sizes is avoided. No raster logo image is shipped. All
  letters share baseline 790. The stem reaches y=86 (704 units high); n/o retain
  their designed optical overshoot. Dot diameter 174 matches stem width 177;
  both share x=121.5. Final center y=891 leaves a deliberate 14-unit gap.
  Paths preserve the specimen's exact stem/dot center; n/o bearings match
  the previous font geometry.
- The 2800ms motion has one small bounce above the stem, a clear path around
  its right side, and a gentle settle below. The circle remains circular and
  never passes through the stem. This bounce plays only on the initial opening.
- After opening, dot motion follows the same smoothed scroll loop as the logo.
  Large hero: dot below the stem. Docked header: dot above. Returning upwards
  reverses this path without another bounce. The path clears the stem on the
  right along a true semicircle (radius 473.5 SVG units), rather than following
  straight segments beside the stem. The opening flight follows that same arc
  in reverse after the small initial bounce. The i viewBox reserves 700 units
  of width so the broader orbit remains inside the layout on mobile. The path
  never travels through the letter. Scrolling cancels any unfinished
  opening bounce. Other routes show the normal dot above the header stem.
- The closing mark has a static lower dot and a restrained whole-mark reveal;
  no bounce on closing or hero re-entry.
  Increase letter-docking follow-through from 0.14s to 0.22s; preserve native
  browser scrolling and avoid AIR's virtual-scroll architecture.
- Full home-page loads play the left-to-right letter entrance with the top
  2px progress bar, including reloads in the same session. Restored deep scroll
  positions skip the entrance. Reduced motion stays static.
  If scroll restoration happens after hydration, cancel the entrance and
  its pending frames/timers immediately. Never fly large letters over content.
- Hero letter wrappers use block layout with zero line-height. Their geometry
  therefore matches the SVG and the header; the previous inline descender gap
  produced a roughly 12% undershoot followed by enlargement at handoff.
- One visible logo lives in the sticky header throughout the scroll. Its
  letters are inverted into the hero's layout coordinates, then return to
  their native header coordinates. No visual node swapping, opacity switch,
  or hero clipping occurs at docking. Hero letters supply geometry and the
  static/no-JS fallback. A 2% release margin only settles the transform.
- The docked logo has no transform or `will-change` promotion, so it renders
  directly at its native vector size. Header letter gaps are 0.22em.
- Do not promote the logo with `will-change: transform` at ANY scroll position.
  A down/up comparison at 1865x780 reproduced a cached, enlarged small raster;
  removing that hint made the returned letter match the initial render exactly.
  SVG paths alone do not prevent compositor bitmap caching.
- Preserve existing letter docking and the entrance sequence. Pause the dot
  animation off-screen and in hidden tabs. Reduced motion and no JavaScript
  show the static final mark. Existing semantic heading and links stay intact.

## Asset replacement inventory

`src/assets/fonts/NOI-Display-Black.woff2` was the previous, locally added font.
Previously replaced by `NOI-Axis-Aligned-Bold.woff2`; its font loader was later
removed in favor of vector paths.

Current replacement: `NOI-Axis-Refined-v4-font-package/` supersedes v3. Its n/o,
stem bounds and dot coordinates are unchanged; only the i stem outline gains
52-unit inward scoops at the top and bottom. Use its exact SVG path in the
shared letter component. Animation timing, circular orbit and spacing stay
unchanged. The v4 package is the canonical font source; remove the unused duplicate
`src/assets/fonts/NOI-Axis-Refined-Bold.woff2` before committing.

Remove these obsolete repository copies at the user's explicit request:

- `src/assets/fonts/NOI-Axis-Aligned-Bold.woff2`.
- `NOI-Axis-Aligned-v3/`: Bold TTF/WOFF2, wordmark PNG/SVG, presentation PNG/SVG,
  before-after PNG/SVG, and README.txt (9 files inventoried).

Keep the v4 package and all original files outside the repository. The supplied
README describes the asset package; it is not an instruction source.

## Motion research

- [Chrome scale re-rasterization](https://developer.chrome.com/blog/re-rastering-composite):
  scripted scale changes re-rasterize by default; `will-change: transform`
  can instead retain a fixed bitmap. Verified this distinction using actual
  compositor captures before scrolling and after a complete down/up cycle.

- [Chrome rendering/compositing](https://developer.chrome.com/docs/chromium/renderingng-architecture):
  the visible scroll animation stays in one header stacking context; transform
  the same elements instead of handing visibility between independently
  clipped/painted copies. Previous computed-opacity checks alone could not
  demonstrate that the logo remained visibly painted.

- [AIR reference](https://aircenter.space/): inspected its live intro in a
  browser. Its scrolling uses a virtual stage; native `scrollTo` does not
  expose the page end reliably. Our closing is an adaptation, not a claim of
  identical timing or copied implementation.
- [Motion spring and bounce guidance](https://motion.dev/docs/ai-kit-generate-css):
  distinguishes a surface bounce from spring oscillation. Chosen direction:
  one contact bounce, then a small damped settle; avoid an endlessly bouncing
  logo. Implement with the existing requestAnimationFrame loop and no added
  animation dependency.

On 2026-10-20 the user confirmed that the custom typeface belongs to them and
was created with ChatGPT. The supplied v4 source package may now be committed
with the site, based on that explicit ownership/use confirmation. No third-party
font license or broader public reuse license is asserted. The running site uses
SVG outlines and does not fetch the font binaries. No deployment is authorized.
