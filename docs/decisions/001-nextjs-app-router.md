# ADR 001: Use Next.js App Router

## Status

Accepted for initial architecture

## Context

The future portfolio needs a route-based content architecture, strong SEO metadata support, static-first rendering, dynamic visual enhancements, and compatibility with a future Cloudflare Workers deployment through OpenNext.

The legacy site is a single static `index.html` page with anchor navigation. That structure limits route-specific metadata, case studies, notes, and content growth.

## Decision

Use Next.js App Router for the new implementation.

Initial public routes should include:

```text
/
/work
/work/[slug]
/notes
/notes/[slug]
/atelier
/atelier/[slug]
/about
/contact
```

## Alternatives Considered

- Keep the current static single-page site: simple, but too limited for the planned content model, metadata, and phased architecture.
- Use Next.js Pages Router: mature, but not aligned with the desired Server Component and App Router architecture.
- Use another static site generator: possible, but less aligned with the requested React, Server Components, and OpenNext target.

## Consequences

- The site can use route-level metadata, layouts, and static rendering.
- Future MDX content and case studies can map cleanly to stable URLs.
- The implementation must avoid accidentally turning broad layouts into client components.
- The migration requires a build pipeline and package setup in Phase 1.
