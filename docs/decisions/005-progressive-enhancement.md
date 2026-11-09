# ADR 005: Use Progressive Enhancement For Visual Effects

## Status

Accepted for initial architecture

## Context

The site should communicate identity, professional capability, real work, problem-solving approach, differentiation, and contact paths. Visual effects should support that narrative without becoming required for comprehension.

Future features such as the particle hero, graph motion, media reveals, and optional audio introduce performance and accessibility risks if they become primary content.

## Decision

Use progressive enhancement for all visual effects. Essential content and navigation must render as semantic HTML first. Enhanced visuals should load later, respect reduced motion, pause when off-screen, pause when the document is hidden, and provide fallbacks.

## Alternatives Considered

- Effects-first implementation: could create a stronger first impression, but risks accessibility, performance, SEO, and maintainability.
- Static-only implementation: safest, but does not fully express the planned digital identity and interactive storytelling.
- Defer all visual planning: avoids early complexity, but can lead to architecture that is hard to enhance later.

## Consequences

- The foundation remains accessible, crawlable, and performant before animation code loads.
- Heavy components need lifecycle controls and failure states.
- Testing can assert semantic content independently from animation timing.
- Visual complexity can be added incrementally without rewriting the content architecture.
