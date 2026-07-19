# AGENTS.md

## 1. Project identity

This repository contains the personal portfolio and digital identity website of Enes Yılmaz.

The website must present Enes primarily as a professional software developer while gradually revealing his broader intellectual and creative world.

The central brand structure is:

- Code
- Thought
- Craft

The central narrative is:

> I connect code, thought and craft to build thoughtful systems.

The website is not a generic developer portfolio, a template-based résumé website, or an effects showcase.

It must communicate, in this order:

1. Who Enes is
2. Which professional roles he can perform
3. Which real-world systems and projects he has worked on
4. How he approaches problems
5. What differentiates him from other developers
6. How to contact him

Visual effects must support this narrative. They must never become more important than content, usability, accessibility, SEO, or performance.

---

## 2. Current repository and migration strategy

The repository currently contains a legacy static portfolio.

Do not mix the new Next.js implementation with the existing static architecture.

Migration rules:

1. Work only on a dedicated feature branch.
2. Preserve the existing production website through Git history.
3. Do not deploy the new website during the foundation phases.
4. Do not connect Cloudflare until explicitly requested.
5. Do not delete legacy assets before determining whether they should be migrated.
6. Create a migration inventory before removing or replacing existing files.
7. Do not commit generated build folders.

Recommended initial branch:

`feat/portfolio-next-foundation`

The new Next.js application will replace the repository root only after the migration inventory has been completed.

---

## 3. Deployment target

The future production target is:

- Cloudflare Workers
- OpenNext Cloudflare adapter
- GitHub-connected deployment
- Custom domain to be configured later

Do not use deprecated Cloudflare Next.js deployment approaches.

Do not configure Cloudflare Pages for a full-stack Next.js deployment.

The application must remain compatible with the Cloudflare Workers runtime.

Cloudflare-specific deployment files may be prepared during the foundation phase, but:

- do not authenticate with Cloudflare,
- do not create Cloudflare resources,
- do not create R2, KV, D1, Images, or other bindings,
- do not deploy,
- do not change DNS,
- do not connect a custom domain,

unless a later task explicitly requests it.

Use the Node.js runtime supported by OpenNext.

Do not add `export const runtime = "edge"`.

---

## 4. Package management and runtime

Use:

- npm
- the current stable Node.js LTS version supported by the chosen Next.js version
- the current stable Next.js release compatible with OpenNext Cloudflare
- exact lockfile-controlled dependency resolution

Required repository files:

- `package.json`
- `package-lock.json`
- `.nvmrc`
- `.npmrc`
- `.gitignore`
- `.editorconfig`

Rules:

1. Never mix npm, pnpm, Yarn, or Bun.
2. Do not create multiple lockfiles.
3. Do not install a dependency without a clear project need.
4. Prefer platform and framework capabilities over additional libraries.
5. Avoid dependencies that significantly increase the client bundle.
6. Document every major dependency and its purpose.

---

## 5. Core technology

Use:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- MDX for long-form content and case studies
- Motion for lightweight interface animation
- SVG and React for the ecosystem graph
- WebGL or Canvas only for the hero particle effect
- Vitest and React Testing Library for unit/component tests
- Playwright for end-to-end tests

Do not introduce:

- Pages Router
- Bootstrap
- jQuery
- large UI component frameworks
- global state libraries without a demonstrated need
- Three.js throughout the whole application
- multiple animation libraries
- multiple styling systems
- a CMS during the initial phases
- a database during the initial phases

---

## 6. Architecture principles

### 6.1 Server-first architecture

Use React Server Components by default.

A component may use `"use client"` only when it requires:

- browser APIs,
- local interactive state,
- event handlers,
- animation runtime,
- canvas or WebGL,
- client-only accessibility behavior.

Keep client component boundaries as small as possible.

Do not mark entire pages or layouts as client components only to support one interactive child.

### 6.2 Static-first content

The portfolio is primarily a content website.

Prefer:

- static rendering,
- prerendered routes,
- server-rendered metadata,
- local typed content,
- MDX case studies,
- optimized static assets.

Do not introduce runtime data fetching when build-time content is sufficient.

### 6.3 Progressive enhancement

All essential information and navigation must work without WebGL.

The particle hero and ecosystem graph are enhancements.

Every interactive or animated section must have:

- a semantic HTML foundation,
- a loading state,
- a no-JavaScript-readable structure where practical,
- a reduced-motion alternative,
- a mobile alternative,
- a failure fallback.

---

## 7. Proposed project structure

Use a structure close to the following:

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

This is a target structure, not permission to create empty folders.

Only create directories when they contain a real file or are required by the current phase.

Avoid both extremes:

- one giant components folder,
- excessive folder nesting for trivial files.

---

## 8. Route architecture

Initial public routes:

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

Potential future routes must not be implemented prematurely.

Use route groups where they improve layout organization without affecting public URLs.

Use lowercase, readable, stable URLs.

Do not expose implementation details in URLs.

---

## 9. Main page narrative

The planned home page sequence is:

1. Particle identity hero
2. Name transitions into persistent navigation identity
3. Short manifesto
4. Selected work
5. Professional evidence
6. Interactive ecosystem
7. Notes preview
8. Atelier preview
9. About preview
10. Contact and closing convergence

Do not build all these sections in the foundation phase.

Create each section incrementally in later tasks.

The first functional version may use static placeholders for heavy visual effects.

---

## 10. Visual direction

The visual language must combine:

- modern software engineering,
- editorial clarity,
- intellectual depth,
- physical craftsmanship.

Avoid:

- generic startup gradients,
- excessive neon,
- full-site cyberpunk styling,
- template-like developer visuals,
- excessive glassmorphism,
- animation on every element,
- decorative code snippets,
- meaningless 3D objects.

Suggested palette direction:

- charcoal black or very dark brown,
- warm off-white,
- subtle wood tones,
- restrained brass or aged-gold accents,
- optional muted olive.

Typography roles:

- sans-serif for interface and professional content,
- serif for editorial writing and reflective sections,
- monospace for code, metadata, labels, and technical annotations.

Use local, self-hosted fonts through `next/font/local` where licensing permits.

Do not load fonts from Google Fonts or another third-party CDN in production.

Do not commit font files until their licenses and use are confirmed.

---

## 11. Motion system

Motion must be purposeful and restrained.

Motion categories:

### Heavy

Allowed only in:

1. the particle hero,
2. the ecosystem graph if necessary.

Only one heavy animation may actively render at a time.

### Medium

Allowed for:

- project transitions,
- timeline progression,
- image reveals,
- section transitions.

Use CSS transforms, opacity, masks, and Motion.

### Light

Allowed for:

- hover feedback,
- focus feedback,
- link transitions,
- subtle text entrances,
- small state transitions.

Animation requirements:

1. Respect `prefers-reduced-motion`.
2. Do not block content rendering.
3. Stop rendering when off-screen.
4. Stop animation when the document is hidden.
5. Reduce complexity on mobile and low-power devices.
6. Avoid layout-triggering animation properties.
7. Prefer `transform` and `opacity`.
8. Do not animate large blurred layers continuously.
9. Do not create scroll-jacking.
10. Preserve normal browser scrolling.

---

## 12. Particle hero

The hero may eventually use a WebGL or Canvas particle text effect.

The particle system must:

- be dynamically imported,
- be isolated in a small client component,
- render only after essential hero content is available,
- have a static fallback,
- reduce particle density on mobile,
- pause when off-screen,
- pause when the tab is hidden,
- support reduced motion,
- never contain the only copy of the heading.

The actual name and professional description must exist as semantic HTML.

Do not implement the final particle system until a later dedicated phase.

---

## 13. Ecosystem graph

The ecosystem graph is a core navigation and storytelling feature.

It must be included later in the home page after selected professional work.

Primary structure:

```text
Enes
├── Code
├── Thought
└── Craft
```

Possible child nodes:

```text
Code
├── Python
├── Data
├── AI
├── React
├── .NET
└── Web

Thought
├── Education
├── Mathematical Thinking
├── Essays
├── Poetry
└── Literature

Craft
├── Wood
├── Watches
├── Visual Design
└── Video
```

Implementation direction:

- React
- SVG
- semantic companion content
- Motion for controlled transitions
- typed graph data
- keyboard navigation
- touch-friendly interaction
- accessible labels
- real navigation links where applicable

Do not begin with Three.js.

Do not use a continuously unstable force simulation.

The graph should feel magnetic and responsive, not chaotic.

On mobile, replace or simplify the free-form graph with an expandable hierarchical navigation structure.

Do not implement the final graph until a later dedicated phase.

---

## 14. Audio policy

Audio is optional and must not be included in the foundation phase.

Future audio rules:

1. Audio must be disabled by default.
2. Never autoplay audible sound.
3. Require explicit user activation.
4. Persist the preference locally only after consent through interaction.
5. Provide a visible sound toggle.
6. Stop audio when the page becomes hidden.
7. Do not attach sounds to every interaction.
8. Do not load nonessential audio during the critical rendering path.
9. Provide a complete silent experience.
10. Never make audio necessary to understand content.

---

## 15. Content model

Do not hardcode repeated portfolio content directly inside page JSX.

Use typed content models.

Projects should support fields such as:

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

Case studies should focus on:

- context,
- problem,
- constraints,
- responsibility,
- decisions,
- implementation,
- outcome,
- lessons.

Do not expose confidential employer or municipal information.

Anonymize sensitive systems, data, users, internal URLs, screenshots, organization details, and architecture where necessary.

Do not claim outcomes that cannot be supported.

---

## 16. Content languages

The site must support English, Norwegian Bokmal, and Turkish from the architecture foundation.

Use these public locale identifiers:

- `en` for English
- `no` for Norwegian Bokmal
- `tr` for Turkish

English is the initial default locale.

Multilingual architecture begins in Phase 1. The site interface must eventually be fully translated across all supported locales, and all public language routing must remain stable.

Individual editorial content, such as notes or atelier entries, may remain available only in its original language when a real translation is not available. Missing translations must be handled explicitly through content state, fallback copy, or route behavior. Do not silently present untranslated content as translated.

Do not create machine-generated placeholder translations merely to fill language versions.

Locale-aware SEO is mandatory. Every localized public page must support correct canonical URLs, alternate-language metadata, and stable locale-prefixed paths.

Do not use `nb` in public URLs unless a later architecture decision explicitly changes the agreed URL strategy.

---

## 17. SEO requirements

SEO is a foundation requirement, not a final cleanup task.

Use Next.js Metadata APIs.

Implement:

- global metadata defaults,
- per-page titles and descriptions,
- metadata title templates,
- canonical URLs,
- Open Graph metadata,
- Twitter card metadata,
- favicon and icon conventions,
- `robots.ts`,
- `sitemap.ts`,
- structured data,
- semantic headings,
- descriptive links,
- image alt text,
- stable human-readable URLs.

Potential structured data:

- `Person`
- `WebSite`
- `ProfilePage`
- `CreativeWork`
- `Article`
- `BreadcrumbList`

Rules:

1. Every public page must have a unique title and description.
2. Use exactly one meaningful page-level `h1`.
3. Do not place critical text only inside Canvas, SVG paths, or images.
4. Do not use keyword stuffing.
5. Do not generate fake testimonials or employment claims.
6. Do not index incomplete staging environments.
7. Do not add structured data unsupported by visible page content.
8. Canonical base URL must come from central site configuration.
9. Metadata must remain functional before animation code loads.

---

## 18. Accessibility requirements

Target WCAG 2.2 AA.

Required:

- semantic landmarks,
- skip link,
- keyboard navigation,
- visible focus states,
- sufficient contrast,
- descriptive labels,
- accessible names for icon-only buttons,
- reduced-motion support,
- touch target sizing,
- correct heading hierarchy,
- form labels and error messaging,
- screen-reader alternatives for visual diagrams,
- no hover-only essential interactions.

The ecosystem graph must support:

- keyboard focus,
- Enter or Space activation,
- accessible relationship descriptions,
- a structured non-graph alternative.

The particle hero must be `aria-hidden` when it duplicates visible text.

Never remove outlines without providing an equal or stronger focus indicator.

---

## 19. Performance requirements

Performance is a core product constraint.

Initial Lighthouse targets for production builds:

- Performance: 90 or higher
- Accessibility: 95 or higher
- Best Practices: 95 or higher
- SEO: 95 or higher

Core Web Vitals targets:

- LCP: 2.5 seconds or less
- INP: 200 milliseconds or less
- CLS: 0.1 or less

Performance rules:

1. Ship minimal client JavaScript.
2. Use Server Components by default.
3. Dynamically import heavy interactive components.
4. Do not load ecosystem graph code on routes that do not use it.
5. Do not load hero WebGL code on other pages.
6. Use route-level code splitting.
7. Pause off-screen rendering.
8. Optimize and correctly size images.
9. Use `next/image` where appropriate.
10. Avoid uncompressed PNG screenshots when WebP or AVIF is suitable.
11. Reserve media dimensions to prevent layout shift.
12. Self-host fonts and minimize font variants.
13. Avoid third-party scripts.
14. Do not add analytics until explicitly requested.
15. Do not preload noncritical media.
16. Avoid large barrel imports from animation or icon libraries.
17. Prefer inline SVG icons or a small controlled icon set.
18. Audit bundle size after adding heavy features.

Set explicit performance budgets later in `docs/performance/budgets.md`.

---

## 20. Image and media rules

Every image must have:

- a purpose,
- an appropriate format,
- known dimensions,
- descriptive alt text or empty alt text when decorative,
- an optimized source,
- a predictable responsive behavior.

Do not:

- use remote images without configuration,
- use arbitrary stock imagery,
- commit duplicate image versions,
- use huge screenshots directly,
- use animated GIFs,
- autoplay background video in the foundation phases.

Future project galleries should load below-the-fold media lazily.

---

## 21. Security and privacy

Initial site should avoid unnecessary user data collection.

Rules:

1. Do not add trackers or analytics by default.
2. Do not embed third-party forms without review.
3. Do not expose private email processing secrets.
4. Keep environment variables out of Git.
5. Commit only `.env.example`, never real `.env` values.
6. Validate all future form input on the server.
7. Add rate limiting and abuse protection before enabling a contact form.
8. Do not use `dangerouslySetInnerHTML` with untrusted content.
9. Sanitize or compile MDX through a controlled pipeline.
10. Add security headers before production deployment.

The first contact experience may use a mail link and social links instead of a server-side form.

---

## 22. Cloudflare compatibility

Prepare for OpenNext and Cloudflare Workers.

Expected future files include:

- `open-next.config.ts`
- `wrangler.jsonc`
- `cloudflare-env.d.ts`
- `public/_headers`

Expected scripts may include:

```json
{
	"dev": "next dev",
	"build": "next build",
	"start": "next start",
	"preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
	"deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
	"upload": "opennextjs-cloudflare build && opennextjs-cloudflare upload",
	"cf-typegen": "wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts"
}
```

Do not assume the Node.js development server is identical to the Cloudflare runtime.

Before future deployment, validate with the Cloudflare preview command.

Do not configure R2 caching until it is actually needed and explicitly approved.

---

## 23. Styling rules

Use Tailwind CSS for component styling and CSS custom properties for design tokens.

Centralize tokens for:

- colors,
- typography,
- spacing,
- radii,
- shadows,
- layout widths,
- motion durations,
- motion easing,
- z-index layers.

Do not scatter arbitrary visual values throughout components.

Prefer reusable semantic classes and component variants where repetition is real.

Do not create abstractions for one-off styles prematurely.

Do not use inline styles except when required for dynamic computed values.

---

## 24. Component rules

Components should be:

- focused,
- typed,
- composable,
- accessible,
- testable,
- named by responsibility.

Avoid:

- components over approximately 250 lines without a strong reason,
- giant page components,
- deeply nested prop drilling,
- generalized components with dozens of flags,
- premature design-system complexity,
- duplicate mobile and desktop markup when CSS can solve it.

Separate:

- content data,
- rendering,
- interaction,
- animation logic.

---

## 25. TypeScript rules

TypeScript must use strict mode.

Rules:

1. Do not use `any` unless unavoidable and documented.
2. Prefer `unknown` with narrowing.
3. Validate external or content-derived data.
4. Prefer explicit domain types.
5. Do not duplicate types across features.
6. Keep global types minimal.
7. Do not suppress TypeScript errors without explaining why.
8. Avoid non-null assertions unless logically guaranteed and documented.

---

## 26. Error and loading states

Every asynchronous or dynamically loaded feature must define:

- loading behavior,
- empty behavior,
- failure behavior,
- fallback behavior.

Create:

- root error handling,
- not-found handling,
- route-appropriate loading UI only when necessary.

Do not use full-screen spinners for content that could render immediately.

---

## 27. Testing strategy

Required test layers:

### Unit tests

For:

- utilities,
- content transformations,
- metadata helpers,
- validation,
- ecosystem data logic.

### Component tests

For:

- navigation,
- accessible controls,
- content cards,
- graph fallback,
- sound toggle when introduced.

### End-to-end tests

For:

- primary navigation,
- selected work navigation,
- mobile menu,
- contact links,
- critical page rendering,
- keyboard navigation.

### Accessibility tests

Include automated checks, but do not treat automation as a replacement for manual keyboard and screen-reader review.

Do not write tests that depend on animation timing when a stable semantic assertion is possible.

---

## 28. Quality commands

The repository should eventually support:

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
```

Before considering a phase complete, run all commands relevant to that phase.

At minimum, foundation work must pass:

```text
npm run lint
npm run typecheck
npm run test
npm run build
```

Do not report success when a required command has not been run.

---

## 29. Git workflow

Use small, focused commits.

Recommended branch naming:

```text
feat/portfolio-next-foundation
feat/home-hero
feat/selected-work
feat/ecosystem-graph
feat/notes
feat/atelier
feat/about
chore/cloudflare-deployment
fix/<clear-description>
```

Commit format:

```text
feat: initialize Next.js portfolio foundation
feat: add accessible site navigation
feat: add project content model
fix: pause hero animation when hidden
docs: document performance budgets
```

Do not:

- commit directly to `main`,
- combine unrelated changes,
- commit generated output,
- rewrite Git history without explicit approval,
- deploy merely because a build succeeds.

---

## 30. Documentation requirements

Maintain:

- `README.md`
- architecture decision records,
- content migration inventory,
- performance budget documentation,
- deployment notes,
- environment variable documentation.

For important architectural choices, create short ADR files under:

```text
docs/decisions/
```

Suggested initial ADRs:

```text
001-nextjs-app-router.md
002-cloudflare-workers-opennext.md
003-server-first-components.md
004-svg-ecosystem-graph.md
005-progressive-enhancement.md
```

---

## 31. Phase discipline

The project must be implemented incrementally.

Do not implement future phases while completing the current phase.

Proposed phases:

### Phase 0 — Repository audit and planning

- inspect legacy repository,
- record content and asset inventory,
- identify reusable material,
- identify obsolete material,
- define migration risks,
- create architecture documentation.

### Phase 1 — Next.js foundation

- initialize framework,
- configure TypeScript,
- configure linting and formatting,
- establish base structure,
- add basic metadata,
- add test infrastructure,
- add Cloudflare-compatible local configuration,
- create a minimal accessible shell.

### Phase 2 — Design foundation

- tokens,
- typography,
- color system,
- grid,
- spacing,
- base UI,
- navigation,
- footer.

### Phase 3 — Content foundation

- project schema,
- content loaders,
- initial selected projects,
- route metadata,
- case study templates.

### Phase 4 — Home page static structure

- static semantic hero,
- manifesto,
- selected work,
- ecosystem fallback,
- notes preview,
- atelier preview,
- contact.

### Phase 5 — Particle hero

- progressive enhancement,
- performance controls,
- reduced-motion version,
- mobile version.

### Phase 6 — Ecosystem graph

- typed graph model,
- accessible SVG,
- keyboard interaction,
- mobile hierarchy,
- content links.

### Phase 7 — Work and case studies

- full Work page,
- project detail routes,
- anonymized municipal case studies,
- image optimization.

### Phase 8 — Notes and MDX

- note routes,
- language labels,
- code blocks,
- metadata,
- feeds if later required.

### Phase 9 — Atelier

- project structure,
- visual gallery,
- process narratives.

### Phase 10 — About and contact

- professional narrative,
- timeline,
- CV link,
- contact experience.

### Phase 11 — Motion and page transitions

- lightweight transitions,
- scroll effects,
- cross-route continuity,
- performance verification.

### Phase 12 — Optional audio

- explicit opt-in,
- preference control,
- minimal sound design,
- accessibility and performance review.

### Phase 13 — Production hardening

- security headers,
- full SEO review,
- structured data,
- accessibility review,
- responsive review,
- performance budgets,
- Lighthouse,
- bundle analysis,
- browser testing.

### Phase 14 — Cloudflare deployment

- Cloudflare account connection,
- preview deployment,
- environment configuration,
- GitHub integration,
- custom domain,
- redirects from old URLs,
- production validation.

---

## 32. Agent operating rules

For every task:

1. Read this file first.
2. Inspect existing files before editing.
3. Confirm the current phase.
4. Do not expand scope beyond the task.
5. Explain material architectural choices.
6. Prefer the smallest correct change.
7. Preserve working behavior unless replacement is part of the task.
8. Do not invent personal, professional, or project facts.
9. Do not add placeholder claims presented as real content.
10. Use TODO markers only when they identify a real deferred decision.
11. Do not silently add services, accounts, trackers, dependencies, or infrastructure.
12. Do not deploy unless explicitly instructed.
13. Do not change Cloudflare resources unless explicitly instructed.
14. Do not remove legacy material before inventorying it.
15. Run relevant quality checks.
16. Summarize changed files and validation results.
17. Clearly state anything not completed.

When requirements conflict, use this priority:

1. Accessibility
2. Correctness
3. Content clarity
4. Performance
5. SEO
6. Maintainability
7. Visual effects

Visual spectacle is never allowed to override the first six priorities.
