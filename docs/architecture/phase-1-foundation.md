# Phase 1 Foundation Implementation Record

## Selected Versions

| Package                | Version | Purpose                                                                                            |
| ---------------------- | ------: | -------------------------------------------------------------------------------------------------- |
| Node.js                |      22 | Current stable compatible LTS major used for local development.                                    |
| npm                    |  10.9.2 | Sole package manager.                                                                              |
| Next.js                | 16.2.10 | App Router framework.                                                                              |
| React                  |  19.2.7 | UI runtime.                                                                                        |
| TypeScript             |   5.9.3 | Strict type checking; selected for compatibility with the current Next ESLint stack.               |
| Tailwind CSS           |   4.3.3 | Styling foundation.                                                                                |
| @opennextjs/cloudflare |  1.20.1 | Cloudflare Workers adapter for Next.js.                                                            |
| Wrangler               | 4.112.0 | Cloudflare Workers local runtime and type generation.                                              |
| Vitest                 |  4.1.10 | Unit test runner.                                                                                  |
| Playwright             |  1.61.1 | End-to-end test runner.                                                                            |
| ESLint                 |  9.39.5 | Linting; selected because `eslint-config-next` transitive plugins currently peer against ESLint 9. |

## Compatibility Sources

- Next.js installation docs state that current Next.js supports App Router, TypeScript, Tailwind, ESLint, `src/`, and `@/*`, with Node.js 20.9 or newer required.
- Cloudflare Workers Next.js docs state that Next.js apps deploy to Workers through the OpenNext adapter, with App Router and React Server Components supported.
- OpenNext Cloudflare docs state that all minor and patch versions of Next.js 16 are supported by `@opennextjs/cloudflare`.
- Cloudflare and OpenNext docs require `nodejs_compat` and a compatibility date of `2024-09-23` or later.
- Next.js 16 uses Turbopack by default, but OpenNext troubleshooting documents Webpack builds as the fallback for runtime chunk-load failures. Phase 1 therefore uses `next build --webpack` for production and OpenNext preview builds.

## Actual Directory Structure

Phase 1 creates only files needed for the working shell:

- `legacy/` for the recoverable legacy implementation.
- `src/app/[locale]/` for localized App Router pages.
- `src/components/` for layout, navigation, SEO, and skip-link primitives.
- `src/i18n/` and `src/messages/` for locale configuration and dictionaries.
- `src/lib/metadata/` for canonical and alternate URL generation.
- `src/lib/structured-data/` for JSON-LD helpers.
- `tests/unit/` and `tests/e2e/` for required validation.

## Locale Design

Public locales are `en`, `no`, and `tr`. English is the default. The root path redirects to `/en`. Unknown locale prefixes are not silently mapped to English.

Route segments remain English and stable across locales during Phase 1. The language switcher uses normal links and does not require JavaScript.

## Metadata Design

Site metadata is centralized in `src/config/site.ts`. Page metadata is generated with dictionary values and shared route definitions.

Each localized route has:

- page-specific title and description,
- self-referencing canonical URL,
- `en`, `no`, `tr`, and `x-default` alternates,
- Open Graph locale mapping: `en_US`, `nb_NO`, `tr_TR`,
- Twitter summary metadata.

The canonical strategy uses locale-prefixed URLs and `x-default` pointing to `/en`.

## Testing Design

Unit tests cover locale configuration, dictionary key alignment, unsupported locale validation, path generation, alternates, structured data, navigation labels, and language switcher output.

Playwright covers root redirect, locale home routes, language switching, locale-preserving navigation, invalid locale not found behavior, keyboard reachability, mobile overflow, and a basic Axe accessibility scan.

## Cloudflare Configuration

`wrangler.jsonc` points to `.open-next/worker.js` and `.open-next/assets`, uses `nodejs_compat`, and sets compatibility date `2026-07-19`. No account ID, routes, custom domains, KV, D1, R2, Analytics Engine, or other bindings are configured.

`open-next.config.ts` uses `defineCloudflareConfig()`.

`next.config.ts` initializes OpenNext dev support with `initOpenNextCloudflareForDev()`.

## Performance Baseline Plan

The Phase 1 shell uses system fonts, no images, no analytics, no external font/icon CDNs, and no client components for navigation or language switching. First-load JavaScript should remain close to the framework baseline.

The production build output should be recorded in the final Phase 1 report after validation.

## Known Limitations

- The final visual design is not implemented.
- The particle hero is not implemented.
- The ecosystem graph is not implemented.
- MDX content is not implemented.
- Legacy content is preserved but not migrated.
- No final security hardening or CSP is claimed.
- The manually maintained `cloudflare-env.d.ts` should be refreshed with `npm run cf-typegen` after dependencies are installed.

## Deferred Work

- Phase 2 design tokens and typography refinement.
- Phase 3 typed content models and content loaders.
- Future image optimization and media migration.
- Future MDX setup.
- Future Cloudflare preview/deployment hardening.
