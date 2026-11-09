# ADR 004: Use An Accessible SVG-Based Ecosystem Graph

## Status

Accepted for initial architecture

## Context

The ecosystem graph is a core storytelling and navigation feature for Code, Thought, and Craft. It needs to be responsive, accessible, keyboard-operable, touch-friendly, and understandable without visual effects.

A continuously animated physics simulation or 3D graph would add complexity and risk before the content model is proven.

## Decision

Implement the first ecosystem graph with React, typed graph data, SVG, controlled Motion transitions, and semantic companion content. Provide a simplified hierarchical mobile alternative.

Canvas or WebGL should not be used for the first graph implementation.

## Alternatives Considered

- Three.js graph: visually rich, but too heavy and unnecessary for the first implementation.
- Canvas graph: flexible, but weaker for semantics and accessibility.
- Force simulation: dynamic, but can feel unstable and can be harder to control across devices.
- Static list only: accessible and fast, but misses the intended navigation/storytelling experience.

## Consequences

- SVG supports accessible labels, links, focus states, and crisp responsive rendering.
- Typed graph data can power both visual and fallback views.
- The first implementation remains easier to test and optimize.
- More advanced rendering can be reconsidered later only if SVG cannot satisfy the design.
