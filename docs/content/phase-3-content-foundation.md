# Phase 3 Content Foundation

## Scope

Phase 3 turns the design shell into a meaningful static portfolio experience. It adds typed project data, translated page copy, reusable project components, Home page content sections, Work page entries, minimal project detail pages, About content, Contact links, Notes preview, and Atelier preview.

It does not add the particle hero, the interactive ecosystem graph, advanced scroll effects, route transitions, audio, analytics, a CMS, a database, Cloudflare resources, or deployment.

## Content Strategy

The content prioritizes professional software development before personal and creative interests.

The Home page order is:

1. Static identity hero
2. Short manifesto
3. Selected work
4. Professional evidence
5. Static Code / Thought / Craft section
6. Notes preview
7. Atelier preview
8. About preview
9. Contact section

The broader Code / Thought / Craft identity is present as supporting structure, not as the main job title.

## Featured Projects

Featured projects are stored in `src/content/projects/projects.ts`.

- `municipal-quality-system`: anonymized public-sector quality/deviation/case workflow system.
- `process-pdf-export`: anonymized PDF/document export and SharePoint storage workflow.
- `privacy-pii-workflow`: anonymized privacy and sensitive-information review workflow.
- `ilc-language-centre`: public web project linked to the live ILC Language Centres site.

Additional public work:

- `quiver-blog-support`: volunteer web support and UI maintenance context linked to the live Quiver site.

## Anonymization Decisions

Public-sector projects are marked as anonymized and intentionally omit:

- internal URLs,
- repository details,
- screenshots,
- personal data,
- sensitive field names,
- internal architecture,
- organization-identifying details,
- claims of sole ownership.

The copy uses contribution language such as "contributed to", "worked on", and "implemented parts of".

## Content Sources

Sources used:

- Existing legacy portfolio inventory and `legacy/index.html`.
- Public legacy contact links: email, LinkedIn, GitHub, YouTube.
- Live public website checks for ILC Language Centres, ILC Accommodation, and Quiver Blog.
- User-provided task details for anonymized municipal system themes.

No Medium profile was added because no verified Medium URL exists in the repository.

## Multilingual Approach

Phase 3 supports `en`, `no`, and `tr`.

- Shared interface labels remain in `src/messages`.
- Home page copy lives in `src/data/home.ts`.
- Project summaries and case-study sections are translated in `src/content/projects/projects.ts`.
- Content labels live in `src/data/content-labels.ts`.
- Project availability is explicit through `availableLocales`.

All current project records are available in all three locales. There is no silent long-form fallback.

## Reused Assets

No legacy images were migrated in Phase 3.

Reason: the available screenshots require later rights, relevance, dimensions, and optimization review. The current project layout is text-first and avoids confidential screenshots.

## Deferred Content

- Full long-form MDX case studies.
- Final project screenshots and image optimization.
- Individual certifications.
- Medium/article titles.
- Full notes archive.
- Full atelier entries.
- CV link, unless a verified public CV file is added later.
- Interactive ecosystem graph.
- Particle hero.

## Unresolved Questions

- Which public-sector project details can be disclosed more specifically.
- Which public web projects should remain public in the selected work set.
- Whether the public email should remain the preferred contact channel.
- Whether YouTube should be kept as a contact/content link or moved into a teaching page later.
- Which legacy screenshots have clear permission and should be optimized.
