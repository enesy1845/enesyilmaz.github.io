# Interior folio study

2026-10-21. A visual refinement of the existing portfolio routes on
`feat/portfolio-visual-rhythm`. This extends the earlier home and component
studies without introducing a new content platform or deployment phase.

## References and adaptations

The expanded research includes these primary sites, alongside the references
in [the component study](minimal-components-study.md). These are observations
about presentation, not imported code or artwork.

| Reference                                        | Useful principle                                                                         | Portfolio adaptation                                                                                      |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [Pentagram work](https://www.pentagram.com/work) | A category-led catalogue lets visitors scan a large body of work.                        | Separate featured work from a compact numbered archive, with independent category filters.                |
| [Linear Now](https://linear.app/now)             | Publication headings, restrained metadata and clear grouping create editorial hierarchy. | Distinct page introductions and a dated Notes index, without adding filler content.                       |
| [Benji Taylor](https://benji.org/)               | Quiet lists and generous space let content carry the identity.                           | Remove framing around page titles; use large type, thin rules and aligned rows instead of repeated cards. |
| [Jakub Krehel](https://jakub.kr/)                | Small graphic details can give a restrained interface a recognisable voice.              | Draw original material studies for Atelier using lightweight decorative SVG.                              |

The reference principles inform the layout. The palette, Code / Thought /
Craft narrative and factual content remain specific to Enes.

## Implemented direction

- Shared page introductions use an oversized title, a shorter adjacent lead,
  optional actions and a quiet metadata line. CV, case-study and article routes
  explicitly select the document variant with a smaller title scale and stacked
  lead across every locale. Public-facing locale-code boxes were removed.
- Work has a lead project and selected-work index, followed by a compact archive.
  The filters are native radios with CSS selection, including without JavaScript.
- About presents its existing four topics as numbered editorial chapters.
- Notes uses actual publication dates, serif reading typography and a quiet
  metadata rail on the article page. Estimated reading time derives from words.
- Atelier uses original static drawings of wood grain, beads, a watch face and
  a visual frame. They illustrate material categories; they are not presented
  as photographs or evidence of finished works. Approved images take precedence
  when the content supplies them.
- Contact makes the email address the main action and presents the remaining
  verified destinations as a compact directory. Copy-email feedback is retained.
- Case studies have a sticky contents list on wide screens, real section anchors,
  simplified technical metadata and previous/next links based on the existing
  typed project order. Empty content sections are not included.

## Shared glass navigation

`HeaderIsland` is mounted once in the shared site header. A static marker
inside each introduction supplies its threshold. The home marker stays at
the image after the hero, retaining the existing hero transition; inner pages
use the beginning of their introduction. Passing the marker hides the identity
and extra desktop controls, leaving the centred glass navigation. Returning
above it restores them. The full-width header remains transparent.

The controller uses IntersectionObserver, resets on pathname changes and
handles restored scroll positions. It replaces the home-only controller.
There is no per-frame React update or continuous scroll animation. Existing
contrast switching, mobile disclosure, keyboard focus and reduced-motion
behaviour remain in place.

## Constraints and verification

The new page layouts, archive, contents list, pagination and drawings are server
components or static CSS/SVG. No dependency, external font, image download,
analytics or service was added. Interface labels cover English, Norwegian and
Turkish; original-language editorial content keeps its explicit language state.

Targeted browser coverage checks shared navigation across eight route types,
mobile scroll restoration and route changes, independent no-JavaScript archive
filtering, case-study anchors and locale-preserving project links, 320px layouts
in all three interface languages, and automated accessibility on seven routes.
Visual review covered Work, About, Atelier, Contact, a note, a case study and
the interior glass island. Lighthouse and production Core Web Vitals have not
been measured in this visual pass. No deployment was performed.

Final checks passed: repository lint, TypeScript, 51 unit tests, all 57 Chromium
end-to-end tests, production build and formatting of changed files. The build
prerenders 82 pages; the local canonical-URL warning is expected before production
site configuration.

Locale typography correction: title length no longer selects the introduction
variant. The former 30-character threshold made the English CV heading 128px
while Norwegian used 81.28px at 1440px. Page role now determines the variant,
so translated equivalents share font size, family, weight, line height, tracking
and grid layout. Natural line wrapping still follows each translation's text.
Regression coverage compares H1/H2 styles across eight routes in all three
locales at 320px and 1440px, and exercises the CV language-switch control.
