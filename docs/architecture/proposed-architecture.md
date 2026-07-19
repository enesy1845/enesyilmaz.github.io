# Proposed Architecture

Phase: 0 - architecture planning only. This document describes the intended Next.js implementation; it does not create the application directories.

## Goals

- Present Enes Yilmaz primarily as a professional software developer.
- Support the Code, Thought, Craft identity without turning the site into an effects showcase.
- Keep content, accessibility, SEO, and performance ahead of visual effects.
- Prepare for Cloudflare Workers deployment through OpenNext without connecting Cloudflare during foundation work.

## Proposed Directory Tree

```text
.
├── AGENTS.md
├── README.md
├── package.json
├── package-lock.json
├── next.config.ts
├── open-next.config.ts
├── wrangler.jsonc
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
├── vitest.config.ts
├── playwright.config.ts
├── .editorconfig
├── .gitignore
├── .npmrc
├── .nvmrc
├── public/
│   ├── fonts/
│   ├── icons/
│   ├── images/
│   │   ├── projects/
│   │   ├── atelier/
│   │   ├── profile/
│   │   └── social/
│   ├── audio/
│   ├── favicon.ico
│   ├── manifest.webmanifest
│   └── _headers
├── content/
│   ├── projects/
│   ├── notes/
│   ├── atelier/
│   └── pages/
├── src/
│   ├── app/
│   │   ├── (site)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── work/
│   │   │   ├── notes/
│   │   │   ├── atelier/
│   │   │   ├── about/
│   │   │   └── contact/
│   │   ├── api/
│   │   ├── error.tsx
│   │   ├── global-error.tsx
│   │   ├── not-found.tsx
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   ├── manifest.ts
│   │   ├── opengraph-image.tsx
│   │   └── layout.tsx
│   ├── components/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── sections/
│   │   ├── projects/
│   │   ├── ecosystem/
│   │   ├── motion/
│   │   ├── media/
│   │   ├── seo/
│   │   └── ui/
│   ├── config/
│   │   ├── navigation.ts
│   │   ├── site.ts
│   │   └── social.ts
│   ├── data/
│   │   ├── ecosystem.ts
│   │   ├── experience.ts
│   │   └── skills.ts
│   ├── lib/
│   │   ├── content/
│   │   ├── metadata/
│   │   ├── performance/
│   │   ├── validation/
│   │   └── utils/
│   ├── styles/
│   │   ├── globals.css
│   │   └── tokens.css
│   └── types/
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── accessibility/
└── docs/
    ├── architecture/
    ├── content-inventory/
    ├── decisions/
    └── performance/
```

Directories should be created only when they contain real files required by the current phase.

## Next.js App Router Architecture

Phase 1 updates the public route plan to use locale prefixes from the beginning:

```text
/en
/no
/tr
/en/work
/no/work
/tr/work
/en/notes
/no/notes
/tr/notes
/en/atelier
/no/atelier
/tr/atelier
/en/about
/no/about
/tr/about
/en/contact
/no/contact
/tr/contact
```

The root `/` redirects to `/en`. Route segments remain stable across locales during Phase 1.

The future app should use Next.js App Router with route groups for layout organization. Public URLs should remain stable, lowercase, and content-oriented:

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

The root layout should provide document-level metadata, language, skip link, persistent shell, and shared styles. Site pages should be statically rendered whenever possible.

## TypeScript Strict Mode

TypeScript should run in strict mode from the foundation phase. Domain types should live near content and feature boundaries rather than being duplicated across pages.

External or content-derived data should be validated before rendering. Avoid `any`; use `unknown` with narrowing where the source is not trusted.

## Server Components By Default

React Server Components should be the default. Client components should be limited to:

- mobile navigation state,
- interactive graph behavior,
- animation runtime,
- browser APIs,
- canvas or WebGL,
- contact form behavior if a future server-validated form is approved.

Pages and layouts should not be marked as client components only to support a small interactive child.

## Tailwind And Design Tokens

Tailwind CSS should provide component styling, while CSS custom properties define semantic tokens for:

- color,
- typography,
- spacing,
- radii,
- shadows,
- layout widths,
- motion durations and easing,
- z-index layers.

The visual direction should combine modern software engineering, editorial clarity, intellectual depth, and physical craftsmanship. Avoid importing the legacy Bootstrap visual system.

## MDX Content Structure

Long-form case studies, notes, and atelier entries should use MDX with typed frontmatter. The compilation pipeline must be controlled and must not render untrusted content with unsafe HTML.

Suggested content families:

- `content/projects/` for project case studies and project metadata,
- `content/notes/` for essays, technical notes, and reflective writing,
- `content/atelier/` for craft/process narratives,
- `content/pages/` for stable page-level copy if useful.

## Project And Case Study Models

Project records should support:

```ts
type Project = {
  slug: string;
  title: string;
  summary: string;
  description?: string;
  role: string;
  period?: string;
  location?: string;
  organization?: string;
  technologies: string[];
  disciplines: string[];
  responsibilities?: string[];
  outcomes?: string[];
  challenges?: string[];
  lessons?: string[];
  featured: boolean;
  confidential?: boolean;
  externalUrl?: string;
  repositoryUrl?: string;
  coverImage?: string;
  gallery?: string[];
  language: "en" | "no" | "tr";
};
```

Case studies should cover context, problem, constraints, responsibility, decisions, implementation, outcome, and lessons. Sensitive employer or client details should be anonymized.

## Component Boundaries

Suggested boundary categories:

- `layout`: shell, footer, page frame, skip link.
- `navigation`: desktop navigation, mobile navigation, active route state.
- `sections`: home page narrative sections.
- `projects`: project cards, project lists, case study templates.
- `ecosystem`: typed graph data, SVG graph, accessible fallback.
- `motion`: reduced-motion helpers and isolated animation primitives.
- `media`: responsive images, video placeholders, lazy embeds.
- `seo`: structured data helpers.
- `ui`: small reusable primitives with clear need.

Avoid large page components and broad generic components with many flags.

## SEO Architecture

Use Next.js Metadata APIs for global defaults and per-route metadata. Central site configuration should define:

- canonical base URL,
- owner identity,
- title template,
- social links,
- default Open Graph image,
- default description.

Each public page needs a unique title and description. Route-level metadata should remain available before animation code loads.

## Structured Data Plan

Add structured data only when it is supported by visible content:

- `Person` for Enes Yilmaz profile identity,
- `WebSite` for site-level identity,
- `ProfilePage` for the home or about page,
- `CreativeWork` for projects and atelier work,
- `Article` for notes,
- `BreadcrumbList` for nested content routes.

Structured data helpers should be tested because malformed JSON-LD harms SEO and trust.

## Image And Font Strategy

Legacy images should be audited before migration. Future images should live under `public/images/` with clear subdirectories and known dimensions.

Use `next/image` where it improves optimization and layout stability. Every image needs a purpose, dimensions, and accurate alt text or an intentional empty alt.

Fonts should be self-hosted through `next/font/local` only after licensing is confirmed. Do not load Google Fonts or other font CDNs in production.

## Accessibility Strategy

Target WCAG 2.2 AA. The foundation should include:

- semantic landmarks,
- skip link,
- keyboard navigation,
- visible focus states,
- one meaningful `h1` per page,
- sufficient contrast,
- reduced-motion support,
- descriptive link text,
- accessible names for icon buttons,
- graph fallback content,
- no hover-only essential interactions.

Accessibility requirements should shape the component design before animation is added.

## Testing Strategy

Use Vitest and React Testing Library for utilities and components. Use Playwright for end-to-end navigation, rendering, mobile menu, contact links, and keyboard flows.

Automated accessibility checks should be included, but manual keyboard review remains required before production hardening.

## Error And Loading Strategy

Create root error and not-found handling in the foundation. Loading UI should be route-appropriate and should not block content that can render immediately.

Dynamic visual enhancements should include loading, empty, failure, and reduced-motion fallbacks.

## Cloudflare Workers And OpenNext Compatibility

Target Cloudflare Workers through the OpenNext Cloudflare adapter. Prepare configuration only when requested in the foundation phase; do not authenticate, create resources, bind storage, change DNS, or deploy.

Use the Node.js runtime supported by OpenNext. Do not add `export const runtime = "edge"` as a blanket setting.

Cloudflare preview validation should happen before any later deployment phase.

## Future Particle Hero Isolation

The particle hero should be isolated in a small dynamically imported client component. The semantic name, heading, and role copy must render as HTML first.

The particle layer should:

- be decorative or supplementary,
- support reduced motion,
- lower density on mobile,
- pause off-screen,
- pause when the document is hidden,
- fail back to a static visual.

## Future SVG Ecosystem Graph

The ecosystem graph should start as accessible React and SVG, backed by typed graph data and semantic companion content.

It should support keyboard operation, touch interaction, visible focus, and real navigation links. Mobile can use an expandable hierarchical structure rather than a dense free-form graph.

Canvas or WebGL should not be used for the first graph implementation.

## Future Audio Opt-In Policy

Audio is out of scope for the foundation. If introduced later, it must be disabled by default, require explicit activation, preserve a complete silent experience, stop when the document is hidden, and avoid loading on the critical path.

## Migration Strategy

1. Preserve the current static production site until the new foundation is ready.
2. Keep the legacy inventory as the source of migration decisions.
3. Initialize Next.js only in Phase 1.
4. Convert reusable legacy content into typed data rather than hardcoded page JSX.
5. Migrate and optimize only confirmed assets.
6. Replace CDN dependencies with local framework-managed assets.
7. Build the accessible shell before adding heavy visual enhancements.
8. Validate with lint, typecheck, tests, and build before considering each phase complete.
