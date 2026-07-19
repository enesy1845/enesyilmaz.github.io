# ADR 006: Use Locale-Prefixed Multilingual Routing

## Status

Accepted for initial architecture

## Context

The portfolio must support English, Norwegian Bokmal, and Turkish from the technical foundation. The route strategy needs to be stable, crawlable, and simple enough for Phase 1 while allowing localized metadata and interface copy.

## Decision

Use locale prefixes for all public routes with `en`, `no`, and `tr`. English is the default locale, and `/` redirects deterministically to `/en`.

Route segments remain stable across locales during Phase 1:

```text
/en/about
/no/about
/tr/about
```

Dictionaries are loaded server-side. Metadata helpers generate self-referencing canonicals and alternate-language URLs for every Phase 1 route.

## Alternatives Considered

- Browser-language auto-detection: deferred to avoid cookies, hydration dependency, redirect loops, and SEO ambiguity.
- Translated route segments: deferred because it adds route mapping complexity before the content model exists.
- Unprefixed default locale: rejected because it makes canonical and alternate-language behavior less explicit.
- `nb` for Norwegian Bokmal URLs: rejected for Phase 1 because the agreed public locale identifier is `no`.

## Consequences

- URLs are predictable and language-specific from the beginning.
- Locale-aware SEO can be generated from shared route configuration.
- Missing translations must be explicit rather than silently falling back.
- Future translated route segments would require a new architecture decision and redirect plan.
