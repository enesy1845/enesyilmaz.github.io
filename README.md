# Enes Yilmaz Portfolio

This repository is being migrated from a legacy static GitHub Pages portfolio into a multilingual Next.js portfolio designed for a future Cloudflare Workers deployment through OpenNext.

The current application is Phase 1 only. It is a minimal technical foundation, not the final design.

## Status

- Supported locales: `en`, `no`, `tr`
- Default locale: `en`
- Root behavior: `/` redirects to `/en`
- Framework: Next.js App Router
- Runtime target: Cloudflare Workers through OpenNext
- Package manager: npm only
- Cloudflare is not connected
- Deployment has not occurred
- The particle hero is not implemented
- The ecosystem graph is not implemented
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
- `tests/`: unit and Playwright tests.

## Server-First Policy

Components are Server Components by default. Client components should be introduced only for browser APIs, local interactive state, animation runtime, or client-only accessibility behavior.

## Phase 1 Limitations

The shell contains minimal translated page content only. It does not include final visual design, project cards, case studies, MDX content, particle effects, the ecosystem graph, analytics, authentication, a database, a CMS, audio, or a contact form.

## Next Phase

Phase 2 should focus on design tokens, typography, base layout refinement, and accessible visual primitives without adding final hero effects or the ecosystem graph.
