# ADR 008: Use A Small Client Component For Mobile Navigation

## Status

Accepted for initial architecture

## Context

The shared header needs to remain server-rendered where possible, but mobile navigation requires browser interaction state. It must support open/close behavior, Escape key handling, body scroll control, focus return, touch targets, and route-changing links.

Turning the entire locale layout or header into a client component would weaken the server-first architecture.

## Decision

Use a small isolated `MobileNavigation` client component for the mobile menu. Keep the shared header itself as a Server Component.

The mobile menu uses semantic buttons and links, `aria-expanded`, `aria-controls`, a labelled dialog panel, Escape close behavior, and focus return to the toggle button.

## Alternatives Considered

- Keep all navigation visible and wrapping on mobile: simplest, but quickly becomes crowded across three locales.
- Make the whole header a client component: easier implementation, but unnecessary hydration.
- Use a third-party menu package: unnecessary for the current interaction scope.
- Create a full-screen animated menu: visually excessive for Phase 2 and outside the motion scope.

## Consequences

- Client JavaScript remains focused on actual interaction needs.
- Mobile navigation can be tested independently.
- The header keeps a server-rendered foundation.
- Future route transition or animation behavior must not be added to this component without a new scope decision.
