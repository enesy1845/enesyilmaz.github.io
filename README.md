# Enes Yilmaz Portfolio

This repository is being migrated from a legacy static GitHub Pages portfolio into a multilingual Next.js portfolio designed for a future Cloudflare Workers deployment through OpenNext.

The latest home/navigation revision uses a shorter manifesto, a stationary
project preview with a compact index, native expertise disclosures, and an
asymmetric Code / Thought / Craft composition. See the [portfolio rhythm study](docs/design/portfolio-rhythm-study.md)
for live references, design decisions, motion constraints and browser checks.
The [expanded component study](docs/design/minimal-components-study.md) covers
the transparent header with its floating glass navigation, native category
filters and email-copy feedback.
The [interior folio study](docs/design/interior-folio-study.md) extends this
direction across Work, Notes, Atelier, About, Contact and case studies,
including shared navigation behaviour on every route.
The [Awwwards research and proposed direction](docs/design/awwwards-study.md)
compares twelve references and records the applied visual refinements: CSS-only
project previews, category studies, editorial Notes and asymmetric Atelier layouts.
The foundation notes below describe the earlier Phase 3 baseline.

The [editorial portrait refinement](docs/design/editorial-portrait.md) documents
the shared monochrome portrait and the Home/About layouts using it.

The current application is Phase 3. It has a multilingual technical foundation, a restrained visual design foundation, typed content records, real static Home content, selected projects, and improved Work/About/Contact pages. It is still not the final interactive portfolio experience.

## Status

- Supported locales: `en`, `no`, `tr`
- Default locale: `en`
- Root behavior: `/` redirects to `/en`
- Framework: Next.js App Router
- Runtime target: Cloudflare Workers through OpenNext
- Package manager: npm only
- Cloudflare is not connected
- Deployment has not occurred
- Typed project content exists
- Static Home page content exists
- Work and project detail foundations exist
- About, Notes, Atelier, and Contact pages have meaningful static content
- The visual system is a foundation, not final brand polish
- The particle hero is not implemented
- The ecosystem graph is not implemented
- Advanced route/page motion is not implemented
- Custom fonts are not finalized
- Audio is not implemented

## Requirements

Use Node.js 22 and npm.

```text
nvm use
npm install
```

## Scripts

```text
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run test
npm run test:watch
npm run test:e2e
npm run format
npm run format:check
npm run preview
npm run deploy
npm run upload
npm run content
npm run cf-typegen
```

`npm run dev` compiles `./content`, watches it and starts `next dev`; `npm run content` compiles once (it also runs before `build`, `typecheck` and `test`). `npm run deploy`/`upload` need a Cloudflare login and are normally run by Workers Builds; see [docs/deployment/cloudflare.md](docs/deployment/cloudflare.md).

`npm run preview` builds with OpenNext and starts a local Cloudflare-compatible runtime. It does not deploy.
Production builds currently use `next build --webpack` because OpenNext documents Webpack builds as the compatibility fallback for Turbopack chunk-loading failures.

## Environment

Copy `.env.example` to a local `.env` only when needed.

```text
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=
KEYSTATIC_GITHUB_CLIENT_ID=
KEYSTATIC_GITHUB_CLIENT_SECRET=
KEYSTATIC_SECRET=
```

When `NEXT_PUBLIC_SITE_URL` is unset, local metadata uses `http://localhost:3000` and robots blocks indexing. The `KEYSTATIC_*` values are needed only for the production admin panel (GitHub mode); local development needs none of them.

## Structure

- `legacy/`: recoverable legacy static implementation for later content migration.
- `docs/`: migration inventory, architecture notes, and ADRs.
- `src/app/[locale]/`: locale-prefixed App Router shell.
- `src/i18n/`: locale configuration, routing helpers, and dictionaries.
- `src/messages/`: shared interface translations and localized metadata copy.
- `content/`: admin-managed content — `projects/*.json` (Work) and `notes/*.mdoc` (blog).
- `keystatic.config.ts`: admin panel schema; `scripts/build-content.ts` compiles `content/` into the git-ignored `src/content/generated.ts`.
- `src/data/`: translated Home, evidence, page, label, notes, and atelier content.
- `src/components/`: server-rendered layout, navigation, content, project, SEO, and UI components.
- `src/lib/content/`: content loaders and validation helpers.
- `src/styles/tokens.css`: semantic design tokens for color, type, spacing, layout, radius, shadow, motion, and z-index.
- `tests/`: unit and Playwright tests.

## Visual System

The Phase 2 visual system uses semantic CSS custom properties as the source of truth and Tailwind utilities to consume them in components.

Current design direction:

- primary dark warm editorial theme,
- system font stacks only,
- sans-serif for interface/professional content,
- serif for page identity and editorial emphasis,
- monospace for metadata and technical labels,
- restrained brass accent,
- responsive containers and section spacing,
- sticky header with desktop and mobile navigation,
- production-quality footer with verified professional links.

No external fonts, icon CDN, analytics, background video, animation library, remote image hotlinking, or theme provider is used.

## Content System

Work and notes are edited in the admin panel at `/keystatic` (Keystatic, [ADR 013](docs/decisions/013-keystatic-admin.md)):

- `npm run dev`, then open `http://localhost:3000/keystatic`: edits are written to `content/` and appear in the site immediately. Commit them like code.
- In production the panel signs in with GitHub and each save is a commit that triggers a Cloudflare rebuild.

Rules enforced at build time: English title, summary and role are required; a locale is published only when its own title, summary and role exist; covers need alt text in every published locale; 3–5 featured projects; drafts are skipped. Types live in `src/types/project.ts` and `src/types/note.ts`.

All English page copy is collected, with its sources, in [docs/content/site-content.md](docs/content/site-content.md). It is regenerated by every `npm run content` (also run by `dev`, `build`, `typecheck` and `test`).

Public-sector work is intentionally anonymized; do not add confidential details through the panel.

## Server-First Policy

Components are Server Components by default. Client components should be introduced only for browser APIs, local interactive state, animation runtime, or client-only accessibility behavior.

Current client components are limited to navigation behavior that needs current-route awareness or mobile menu state.

## Accessibility

The shell includes semantic landmarks, a skip link, visible focus states, `aria-current` route and locale indicators, keyboard-reachable footer links, and an accessible mobile menu with Escape close behavior.

## Phase 3 Limitations

The site does not include final MDX case studies, final project images, a particle hero, the interactive ecosystem graph, analytics, authentication, a database, a CMS, audio, or a server-side contact form.

## Next Phase

The next phase should refine the static Home composition and content depth without starting particle, graph, audio, analytics, or deployment work unless explicitly requested.
