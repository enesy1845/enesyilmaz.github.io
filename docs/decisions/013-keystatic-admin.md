# ADR 013: Keystatic Admin Panel For Work And Notes

## Status

Accepted. Deliberately relaxes AGENTS.md "no CMS in the initial phases" at the owner's request; there is still no database.

## Context

Work entries and notes were TypeScript files, so every content change needed a code edit. The owner wants an easy, pleasant admin panel for Work and the blog, and the site is deployed to Cloudflare Workers through OpenNext. Options considered: Keystatic (Git-based), Payload CMS (D1 + R2), and a custom Tiptap panel on D1 + R2.

## Decision

- Keystatic at `/keystatic`, schema in `keystatic.config.ts`, field labels in Turkish.
- Content is stored in the repository: `content/projects/*.json` and `content/notes/*.mdoc` (Markdoc). Images go to `public/images/projects` and `public/images/notes`.
- Storage mode: `local` in development (edits write to disk), `github` otherwise (each save is a commit; Cloudflare Workers Builds rebuilds on push).
- `scripts/build-content.ts` compiles the content into the git-ignored `src/content/generated.ts` before `dev`, `build`, `typecheck` and `test`. Pages import only that module, so they stay prerendered and the Worker never needs a filesystem. It also validates (English title/summary/role, cover alt text, 3–5 featured projects); invalid content fails the build and the previous deployment stays live.
- Drafts (`draft: true`) are excluded at build time. A locale is published only when its title, summary and role are filled, so missing translations are never presented as translations.
- Notes are rendered with `Markdoc.renderers.react` in a Server Component: no raw HTML, no client JavaScript.
- The admin UI is loaded with `next/dynamic` and `ssr: false`, so it stays out of public routes and the Worker bundle (gzip ≈ 1.2 MB, below the 3 MB free-plan limit). `/keystatic` is `noindex` and disallowed in `robots.txt`. The API route creates its handler on the first request, because GitHub mode reads secrets that exist only at runtime.

## Consequences

- Free, no database, and no new runtime service beyond a GitHub App for sign-in.
- Publishing is not instant: a save goes through a commit and a rebuild (a few minutes).
- R2 is not needed. The hero helix is procedural Three.js with no media assets, and the current images total under 1 MB. Reconsider R2 only if large galleries or video are added.
