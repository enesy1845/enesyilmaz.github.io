# Enes Yilmaz Portfolio

This repository is being migrated from a legacy static GitHub Pages portfolio into a multilingual Next.js portfolio designed for a future Cloudflare Workers deployment through OpenNext.

The current application is Phase 2. It has a multilingual technical foundation and a restrained visual design foundation, but it is still not the final portfolio experience.

## Status

- Supported locales: `en`, `no`, `tr`
- Default locale: `en`
- Root behavior: `/` redirects to `/en`
- Framework: Next.js App Router
- Runtime target: Cloudflare Workers through OpenNext
- Package manager: npm only
- Cloudflare is not connected
- Deployment has not occurred
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
- `src/messages/`: Phase 1 interface translations.
- `src/components/`: minimal server-rendered layout, navigation, and SEO components.
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

No external fonts, icon CDN, analytics, background video, animation library, or theme provider is used.

## Server-First Policy

Components are Server Components by default. Client components should be introduced only for browser APIs, local interactive state, animation runtime, or client-only accessibility behavior.

Current client components are limited to navigation behavior that needs current-route awareness or mobile menu state.

## Accessibility

The shell includes semantic landmarks, a skip link, visible focus states, `aria-current` route and locale indicators, keyboard-reachable footer links, and an accessible mobile menu with Escape close behavior.

## Phase 2 Limitations

The shell contains minimal translated page content only. It does not include final Home page design, project cards, case studies, MDX content, particle effects, the ecosystem graph, analytics, authentication, a database, a CMS, audio, or a contact form.

## Next Phase

Phase 3 should focus on typed content models, content loaders, and verified initial project/content records without building the final hero effects or ecosystem graph.
