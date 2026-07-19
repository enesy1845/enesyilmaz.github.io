# Enes Yilmaz Portfolio

This repository is being migrated from a legacy static GitHub Pages portfolio into a multilingual Next.js portfolio designed for a future Cloudflare Workers deployment through OpenNext.

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
npm run cf-typegen
```

`npm run preview` builds with OpenNext and starts a local Cloudflare-compatible runtime. It does not deploy.
Production builds currently use `next build --webpack` because OpenNext documents Webpack builds as the compatibility fallback for Turbopack chunk-loading failures.

## Environment

Copy `.env.example` to a local `.env` only when needed.

```text
NEXT_PUBLIC_SITE_URL=
```

When unset, local metadata uses `http://localhost:3000`.

## Structure

- `legacy/`: recoverable legacy static implementation for later content migration.
- `docs/`: migration inventory, architecture notes, and ADRs.
- `src/app/[locale]/`: locale-prefixed App Router shell.
- `src/i18n/`: locale configuration, routing helpers, and dictionaries.
- `src/messages/`: shared interface translations and localized metadata copy.
- `src/content/projects/`: typed multilingual project records.
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

Projects are typed in `src/types/project.ts` and stored in `src/content/projects/projects.ts`.

Current featured projects:

- anonymized municipal quality system,
- anonymized process PDF export system,
- anonymized privacy and PII workflow,
- ILC Language Centre website.

Public-sector work is intentionally anonymized. Public web work uses live links only when the URL is verified. Legacy screenshots are not migrated yet.

## Server-First Policy

Components are Server Components by default. Client components should be introduced only for browser APIs, local interactive state, animation runtime, or client-only accessibility behavior.

Current client components are limited to navigation behavior that needs current-route awareness or mobile menu state.

## Accessibility

The shell includes semantic landmarks, a skip link, visible focus states, `aria-current` route and locale indicators, keyboard-reachable footer links, and an accessible mobile menu with Escape close behavior.

## Phase 3 Limitations

The site does not include final MDX case studies, final project images, a particle hero, the interactive ecosystem graph, analytics, authentication, a database, a CMS, audio, or a server-side contact form.

## Next Phase

The next phase should refine the static Home composition and content depth without starting particle, graph, audio, analytics, or deployment work unless explicitly requested.
