# Editorial portrait refinement

1 November 2026. Scoped refinement of the existing Home/About presentation.

The portrait sits after the work, disciplines and journal sections on Home,
beside the existing personal introduction. About reuses it beside the chapter
index. A monochrome treatment, serif introduction and generous asymmetric grid
bring the person into the existing Code / Thought / Craft narrative.

References reviewed: the portrait/typography compositions in Awwwards'
[2023 portfolio collection](https://assets.awwwards.com/awards/gallery/2023/07/HOT-RIGHT-NOW-BOOK-2023.pdf)
and [Bruno Arizio presentation](https://assets.awwwards.com/awards/gallery/2020/09/live-presentation-jonas-bruno.pdf).
Direct inspiration-page requests were unavailable; these references were reviewed
through the indexed document text and visual descriptions, not live interaction.

Asset: the user-supplied `resim.jpeg` (1200 × 1600), preserved in the project
root. The previously inventoried `legacy/images/profil.png` remains untouched.
The supplied photo's optimized colour derivative is
`public/images/profile/enes-yilmaz.webp` (1000 × 1333, 57,612 bytes). CSS applies
grayscale and a small contrast adjustment; the source's colour is retained.
Next Image provides responsive sizing and lazy loading. The frame reserves a
4:5 aspect ratio. The same semantic figure works without JavaScript and has no
animation or hover-dependent content. Captions reuse existing localized copy.

No dependencies or infrastructure were added. No publication was performed.

Validation: full lint, typecheck, 53 unit tests and production build passed.
Targeted Playwright checks passed for all-locale 320px interior routes,
all-locale mobile Home, and the existing interior-page axe scan. The route loop
needed a 90-second test allowance after its initial 30-second timeout; it passed
in 23 seconds on the final run. Desktop/mobile screenshots were inspected, and
a JavaScript-disabled Turkish About probe confirmed a loaded portrait, one h1
and no horizontal overflow. The full end-to-end suite was not run.
