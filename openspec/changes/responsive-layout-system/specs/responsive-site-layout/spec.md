## ADDED Requirements

### Requirement: Responsive public layout
The site SHALL reflow its public navigation, page gutters, content grids, and detail-page content for phone, tablet, and desktop viewports without relying on page-level horizontal scrolling.

#### Scenario: Phone viewport
- **WHEN** a visitor opens a public route at a 390px viewport width
- **THEN** the content column fits the viewport, card grids stack or reflow, and the navigation is available as a drawer.

#### Scenario: Tablet viewport
- **WHEN** a visitor opens a public route at an 820px viewport width
- **THEN** the page uses intentional tablet spacing and the navigation drawer does not overlap readable content.

#### Scenario: Desktop viewport
- **WHEN** a visitor opens a public route at a 1440px viewport width
- **THEN** the left navigation rail and centered content column remain stable.

### Requirement: Wide detail content containment
The site SHALL contain wide code blocks, tables, and displayed mathematics within the content column and expose local horizontal scrolling when their intrinsic width exceeds the viewport.

#### Scenario: Long code example on phone
- **WHEN** a visitor opens an article or TIL containing a long highlighted code line at a 390px viewport width
- **THEN** the code block is scrollable inside its own boundary and the page does not clip the code or overflow horizontally.
