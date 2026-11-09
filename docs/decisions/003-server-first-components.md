# ADR 003: Use Server Components By Default

## Status

Accepted for initial architecture

## Context

The portfolio is primarily a content website. Most routes can render static content, metadata, project records, notes, and case studies without browser-side state.

The planned particle hero, ecosystem graph, mobile navigation, and future audio controls need browser APIs or interactivity, but they should not force whole pages into client rendering.

## Decision

Use React Server Components by default. Add `"use client"` only to the smallest components that require browser APIs, event handlers, local state, animation runtime, Canvas, WebGL, or client-only accessibility behavior.

## Alternatives Considered

- Make entire pages client components: simpler for interaction, but increases JavaScript and weakens the static-first architecture.
- Avoid client components entirely: good for performance, but insufficient for the planned graph, navigation, and particle enhancement.
- Use a global state library: unnecessary for the initial content website.

## Consequences

- The default payload stays smaller and more SEO-friendly.
- Interactive components need explicit boundaries and fallbacks.
- Component authors must avoid importing client-only code into server modules.
- Tests should cover both server-rendered content and client interactions.
