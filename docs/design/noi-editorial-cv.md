# NOI composition, About hierarchy and downloadable CV

1 November 2026 · Targeted refinement of the existing portfolio, following
commit `301c8d6`. This is visual and CV maintenance in the existing design and
About/contact work, rather than a new foundation or deployment phase.

## Research and interpretation

- [Awwwards typography collection](https://www.awwwards.com/websites/typography/):
  type scale, line length, spacing and readability form one system.
- [Endcap Design on Awwwards](https://www.awwwards.com/sites/endcap-design):
  its description foregrounds oversized typography and warm paper. The
  [live site](https://endcap.design/) separates a concise professional identity,
  selected work and numbered process content.
- [Study Hall on Awwwards](https://www.awwwards.com/sites/study-hall) and its
  [live site](https://www.studyhall.design/): one clear introductory statement,
  a work index and a mixture of disciplines within one identity.

The sources were read through their public pages. The following composition
is our interpretation for NOI; it does not reproduce another site's assets,
palette, typography or effects, or claim an Awwwards award for this portfolio.

## Applied decisions

The former rounded NOI explanation card becomes an open typographic specimen:
three large existing Axis vector letters, shared baselines, quiet vertical
rules and numbered meanings. An asymmetric desktop grid puts the personal
explanation beside the specimen. Mobile uses normal document flow with three
compact letter columns. The original brand copy and personal/professional
hero remain intact. The oversized decorative letters are hidden from assistive
technology; the definition list carries their meanings.

The EN/NO/TR selector remains a native radio group. Arrow keys, focus indicators
and CSS visibility work without JavaScript; unsupported `:has()` falls back
to displaying all interpretations. Only a short letter entrance runs on a
language change. Reduced motion removes it. No idle animation or additional
client component/dependency was introduced.

About keeps a single page `h1`, followed by five peer `h2` chapter headings.
Each chapter is labelled by its heading. Sans-serif chapter titles now have
a larger scale than serif introductory paragraphs. Leads remain paragraphs,
since they are introductory sentences rather than nested section headings.

## PDF workflow

Every localized CV page offers the same English PDF download. Norwegian and
Turkish button labels explicitly identify the document as English:

- `/documents/Enes-Yilmaz-CV-EN.pdf`

This is a real, two-page A4 document with selectable Unicode text, PDF tags,
heading outlines, contact links and page numbers. It uses the existing English CV
timeline, skills, education, certifications and learning records and the
existing English identity. Expired credential dates and overlapping roles
remain explicit. No invented degree, achievement or private reference details
are added. Reference letters remain unavailable until supplied and approved.

Run `npm run cv:pdf` after editing English CV records, English copy or contact
links. The script uses the already installed Playwright Chromium and system
Arial; run `npx playwright install chromium` if the browser is missing. It
requires no server, remote fonts, new package or runtime PDF generation.
The exported PDF is an intentional public document asset and must be included
with the source change. Review its pagination before shipping, since system
font metrics can differ between export environments. It is not generated
on each build. Unit checks verify the linked PDF exists and has a PDF header;
browser tests verify download filenames and MIME types.

## Validation

Desktop and mobile section screenshots were inspected. PDF text extraction
confirmed the Unicode name, and rendered pages were inspected. Browser checks
cover the English download from all three interface languages, 320px/1440px reading without JavaScript,
native radio keyboard interaction, heading hierarchy, overflow and axe checks.
Existing locale typography and CV language-switching tests are also retained.
Full Lighthouse measurement, manual screen-reader certification and PDF/UA
certification are outside this change. No deployment or infrastructure change.
