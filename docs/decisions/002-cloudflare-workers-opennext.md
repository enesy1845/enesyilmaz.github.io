# ADR 002: Target Cloudflare Workers Through OpenNext

## Status

Accepted for initial architecture

## Context

The planned production target is Cloudflare Workers with the OpenNext Cloudflare adapter, GitHub-connected deployment, and a custom domain later. The project should avoid deprecated Cloudflare Next.js approaches and should not use Cloudflare Pages for a full-stack Next.js deployment.

Phase 0 must not authenticate with Cloudflare, create resources, configure DNS, or deploy.

## Decision

Target Cloudflare Workers through OpenNext for the future production deployment.

Prepare architecture and documentation now. Add configuration and validation scripts only in later foundation work when explicitly in scope.

## Alternatives Considered

- GitHub Pages: matches the current static repository shape, but does not match the future full-stack Next.js target.
- Cloudflare Pages: useful for static sites, but explicitly not the target for this full-stack Next.js deployment.
- Generic Node hosting: simpler for Next.js defaults, but not the requested deployment platform.

## Consequences

- The app must remain compatible with the Workers runtime supported by OpenNext.
- Cloudflare preview validation becomes a required pre-deployment step in later phases.
- Runtime-specific APIs and unsupported Node assumptions need review.
- No Cloudflare resources should be created until a later explicit deployment phase.
