## ADDED Requirements

### Requirement: Cohesive responsive visual system
The public Jekyll portfolio SHALL use a single light editorial palette with one accent color, readable typography, visible keyboard focus, and explicit mobile layouts.

#### Scenario: Visitor opens any portfolio page
- **WHEN** a visitor loads a public Jekyll route at a desktop or phone viewport
- **THEN** the route SHALL use the shared palette, contain no page-level horizontal overflow, and present interactive controls with discernible hover and keyboard focus states

#### Scenario: Visitor prefers reduced motion
- **WHEN** the browser reports `prefers-reduced-motion: reduce`
- **THEN** nonessential transitions and animations SHALL be disabled or reduced without removing content or controls

### Requirement: Accessible sidebar navigation
The portfolio sidebar SHALL retain its existing routes and labels while presenting a clear active state and keyboard-operable mobile navigation.

#### Scenario: Visitor uses keyboard navigation
- **WHEN** focus reaches a sidebar control or link
- **THEN** the focused element SHALL have a visible, high-contrast focus indicator
