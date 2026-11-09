# Minimal component study

2026-10-21. Follow-up to the home rhythm revision, on the same feature branch.
Scope: transparent header, the existing glass navigation island, and small,
useful home-page interactions.

## Expanded references

All five live homepages below were read and visually inspected in desktop
Chromium, alongside the earlier Paco / Emil / Rauno study. These are design
observations; no reference code, artwork or component library was imported.

| Reference                              | Observation                                                                            | Application to this portfolio                                                                                       |
| -------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [Linear](https://linear.app/)          | Precise labels, small counters and clear group boundaries in the product presentation. | Derive a compact, count-bearing category selector for selected work. Keep the site's own light palette and content. |
| [Jakub Krehel](https://jakub.kr/)      | Small project symbols and inline links give a simple list distinctive detail.          | Develop the existing SVG vocabulary with brief interaction feedback; preserve whole-row project links.              |
| [Benji Taylor](https://benji.org/)     | Writing uses aligned rows, quiet dates and generous empty space.                       | Keep metadata secondary and project counts aligned; avoid adding another layer of introductory copy.                |
| [Brian Lovin](https://brianlovin.com/) | A concise identity, small social controls and direct writing/project lists.            | Keep direct contact visible and add one adjacent utility: copying the public email.                                 |
| [Anthony Fu](https://antfu.me/)        | An unframed top navigation and compact inline project references.                      | Remove the full header fill, navigation capsule border, shadow, and active-link fill. Use a restrained underline.   |

The category filter and clipboard control are our adaptations of the shared
principles of compact metadata and direct actions. This study does not claim
that those exact controls appear on each reference homepage.

## Implemented components

### Transparent header and floating glass navigation

The full-width header stays transparent. Its height remains stable so the
existing hero-to-header logo transition retains its geometry. Once the leading
edge of the image following the hero passes the top by about 24px, the identity
and desktop language controls hide, and navigation becomes the original
centred floating island. Scrolling back restores the full header. The island
and language popover use the original subtle tint and 20px backdrop blur;
browsers without backdrop-filter get a solid, readable fallback. Mobile keeps
the menu control in glass and its expanded dialog operable.

An IntersectionObserver on a one-pixel sentinel drives the island threshold.
An IntersectionObserver watches a narrow band at the header's centre and
changes text colour over explicitly marked inverse sections. It has no
per-scroll handler, continuous animation or React state updates while scrolling.
The observer rebuilds on viewport resize and route changes, with cleanup.

Without the enhancement, the transparent header scrolls in normal flow.
Language and mobile disclosure panels keep their own readable surfaces.
The original island, disappearing identity and glass are explicitly retained
at the user's request. Native section anchors leave room for the island, and
text-link arrows share the same small hover/focus feedback as project links.

### Native project categories

Labels and counts are derived from the typed featured projects. Native radio
controls support keyboard arrows and touch. CSS `:has` selects the visible
server-rendered projects; there is no request or client filter bundle.
Browsers without selector support show the complete index and omit the controls.
The complete index remains the initial view. Filtering changes the layout
immediately, without animated height or reordered items.

### Copy email

The existing mail link remains the primary contact action. The secondary
button writes only the public email, following an explicit click. It is hidden
until hydration and reports success or failure through a localized live status.
Failure keeps the normal email link available. No legacy clipboard fallback,
permission preflight or additional package is needed.

### SVG interaction studies

Code's connected paths move together, Thought's circles converge slightly,
and Craft's hand turns inside its fixed rings. Each responds only to hover
or keyboard focus, with transform transitions. Reduced motion keeps the
drawings static. These remain decorative SVGs beside ordinary navigation links.

## Further patterns identified

The subsequent [interior folio pass](interior-folio-study.md) implements the
case-study contents, dated notes index and project-to-project navigation below,
and extends the glass island to all routes.

These are candidates for a later, separately scoped pass, rather than new
features added to this revision:

| Pattern                        | Appropriate place                        | Reason to revisit                                          |
| ------------------------------ | ---------------------------------------- | ---------------------------------------------------------- |
| Compact table of contents      | Long work case studies and notes         | Gives long-form text structure and direct navigation.      |
| Quiet chronological index      | Notes, when real dated entries exist     | Makes an archive scannable with little decoration.         |
| Local project preview          | Work index, when approved covers exist   | Adds evidence while preserving confidentiality.            |
| Contextual previous/next links | Published note and project detail routes | Helps exploration without another global navigation layer. |

No command menu, carousel, continuous marquee, theme picker or extra photo
gallery is needed for the current five-project home overview.

## Checks

Browser coverage exercises filtering without JavaScript, radio keyboard
navigation, glass-island contrast over the inverse section, return to the
full header, mobile-menu operation while the identity is hidden, route
cleanup, clipboard success and clipboard failure. Three-locale mobile layout
and the original hero and accessibility checks remain part of the full suite.
Lighthouse and real-user Core Web Vitals are outside this visual verification.

Prior follow-up checks on 2026-10-21 passed: lint, TypeScript, 51 unit tests,
49 Chromium end-to-end tests (including accessibility checks), and the
production build. Desktop transparent navigation and mobile project controls
were also visually reviewed. No deployment was performed.

Glass-island restoration verified on 2026-10-21: lint, TypeScript, 51 unit
tests, all 51 Chromium end-to-end tests, production build and formatting
checks passed. The restored island was visually reviewed. Tests now distinguish
intentional identity hiding from the earlier vector-rendering regressions,
and use scroll events to interrupt settling without a timing-sensitive poll.
