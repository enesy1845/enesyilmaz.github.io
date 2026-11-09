# ADR 007: Use Semantic CSS Custom Properties For Design Tokens

## Status

Accepted for initial architecture

## Context

Phase 2 needs a coherent visual foundation without locking the portfolio into a large design-system abstraction or scattering hardcoded values through components.

The project already uses Tailwind CSS v4 and CSS custom properties. The future site may need a light theme, richer content layouts, particle visuals, and an ecosystem graph, but Phase 2 should keep one primary dark theme.

## Decision

Use semantic CSS custom properties in `src/styles/tokens.css` as the design-system source of truth. Components consume these tokens through Tailwind arbitrary-value utilities and focused CSS classes.

Build one primary dark theme during initial development. Preserve token semantics so a future light theme can be added without rewriting component structure.

Avoid repeated hardcoded component colors, spacing, radii, shadows, and motion values.

## Alternatives Considered

- Hardcode Tailwind values directly in every component: fast initially, but makes visual consistency and future theming harder.
- Create a large custom design-system package: too much structure for the current phase.
- Use a third-party UI theme system: unnecessary dependency and likely mismatch with the portfolio identity.
- Add dark/light mode now: increases validation scope and complicates future media/WebGL decisions.

## Consequences

- Visual decisions are centralized and easier to audit.
- Components remain relatively small while still using semantic values.
- Future themes remain possible.
- Designers and developers must update tokens first rather than inventing local one-off values.
