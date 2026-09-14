## ADDED Requirements

### Requirement: Evidence-first homepage entry
The homepage SHALL make the AI technical-expert identity, primary project path, primary learning path, and an original supporting research visual available in the first viewport on desktop.

#### Scenario: Visitor opens the homepage on desktop
- **WHEN** the homepage loads at a desktop viewport
- **THEN** the visitor SHALL see the professional identity, two primary destination links, and the supporting visual without needing to scroll

#### Scenario: Visitor opens the homepage on a phone
- **WHEN** the homepage loads at a viewport narrower than 640 pixels
- **THEN** the thesis, action links, and supporting visual SHALL stack in a single readable column without clipping or horizontal scrolling

### Requirement: Research portfolio hierarchy
The projects page SHALL distinguish the evidence-led representative work from secondary project material through layout and visual hierarchy without inventing results or changing project data.

#### Scenario: Visitor opens the projects page
- **WHEN** a visitor opens `/projects/`
- **THEN** the page SHALL introduce the research scope and visually prioritize the current featured work before the complete project list
