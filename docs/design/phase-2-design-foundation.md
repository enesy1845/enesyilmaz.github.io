# Phase 2 Design Foundation

## Concept

The visual system is built around `Code / Thought / Craft`: professional software work first, with editorial and tactile details supporting the broader identity.

The design direction is calm, dark, warm, precise, and readable. It intentionally avoids a generic developer-template look, SaaS hero styling, neon effects, glassmorphism, and decorative animation.

## Color System

Color tokens live in `src/styles/tokens.css` and are semantic rather than component-specific.

Primary roles:

- `--color-background`: primary dark charcoal page background.
- `--color-background-elevated`: header/footer and elevated page areas.
- `--color-surface`: grouped content surfaces.
- `--color-surface-muted`: active navigation and secondary surfaces.
- `--color-foreground`: primary text.
- `--color-foreground-muted`: body-support text.
- `--color-foreground-subtle`: metadata and low-emphasis labels.
- `--color-border` and `--color-border-strong`: structural borders.
- `--color-accent` and `--color-accent-hover`: restrained brass interaction color.
- `--color-accent-foreground`: text on accent backgrounds.
- `--color-focus`: visible keyboard focus.
- `--color-success`, `--color-warning`, `--color-error`: future semantic status colors.
- `--color-code`, `--color-thought`, `--color-craft`: restrained future ecosystem colors.

Contrast was checked through automated Axe coverage on `/en` and `/en/work`, plus manual review of navigation, buttons, language switching, footer links, and muted copy. The primary button contrast issue found during e2e was fixed by scoping global link color rules to unclassed links.

## Typography

Phase 2 uses system font stacks only. No Google Fonts, external font CDN, or unverified local font files are used.

Roles:

- `--font-sans`: interface, navigation, and professional content.
- `--font-serif`: page identity and editorial emphasis.
- `--font-mono`: metadata, locale labels, and technical annotations.

The type scale uses `clamp()` tokens from `--font-size-xs` through `--font-size-display`. Headings avoid extreme sizes so Norwegian and Turkish labels can wrap naturally.

## Spacing

Spacing tokens use a restrained scale:

`--space-1`, `--space-2`, `--space-3`, `--space-4`, `--space-5`, `--space-6`, `--space-8`, `--space-10`, `--space-12`, `--space-16`, `--space-20`, `--space-24`, and `--space-section`.

Section spacing is responsive and intentionally generous on desktop without becoming wasteful on mobile.

## Layout

Layout tokens:

- `--layout-max`: standard content width.
- `--layout-wide`: header and wide layout width.
- `--layout-reading`: readable line-length container.
- `--layout-gutter`: responsive page gutter.
- `--layout-header-height`: sticky-header baseline.

Foundational components:

- `Container`
- `Section`
- `SectionHeader`
- `PageIntro`

The current pages use shared intro and content sections to demonstrate the rhythm without pretending final content exists.

## Borders, Radius, And Surfaces

The system uses restrained radii:

- `--radius-sm`
- `--radius-md`
- `--radius-lg`
- `--radius-pill`

Borders are used for grouping and state. Shadows are defined but used sparingly. There are no glowing shadows.

## Motion Tokens

Motion tokens exist for basic interactions only:

- `--duration-fast`
- `--duration-normal`
- `--duration-slow`
- `--ease-standard`
- `--ease-emphasized`
- `--ease-exit`

Phase 2 does not add page transitions, scroll entrances, parallax, custom cursors, or animation libraries.

## Navigation

The header is sticky, stable, and intentionally restrained. It includes:

- locale-aware identity link,
- desktop navigation,
- desktop language switcher,
- mobile menu controller,
- active route state through `aria-current="page"`.

The mobile menu is a small client component because it requires local open state, Escape handling, body scroll control, and focus return. It uses a dialog panel rather than a cinematic full-screen menu.

## Accessibility

Implemented foundations:

- skip link,
- semantic header/nav/main/footer,
- visible focus states,
- current route state,
- current locale state,
- keyboard-openable mobile menu,
- Escape close behavior,
- route-changing mobile links that close the menu,
- touch targets of at least 44px for key controls,
- reduced-motion baseline.

Manual review covered `/en`, `/en/work`, `/no`, `/no/about`, `/tr`, and `/tr/contact` at 320px, 375px, 768px, 1024px, and 1440px. No horizontal overflow, clipped language labels, unreadable heading wraps, or footer overflow were observed.

## Future Particle Integration

The current home page remains static. The future particle hero should mount below semantic content, be dynamically imported, and respect the existing layout, focus, and reduced-motion rules.

## Future Ecosystem Integration

The `--color-code`, `--color-thought`, and `--color-craft` tokens are intentionally restrained so the future ecosystem graph can use them without becoming three unrelated brands.

## Deferred Decisions

- Final font families and local font files.
- Final home page composition.
- Project card and case-study visual design.
- MDX editorial typography.
- Full production security header and CSP hardening.
- Light theme support.
