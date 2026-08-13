## ADDED Requirements

### Requirement: Published evidence-led project case studies
The main site SHALL publish case-study pages for SmartOrderingAgent, Financial Asset QA System, and AI Agent Engineering Lab. Each page MUST identify the problem addressed, describe the system design or engineering boundary, state how the work is verified or evaluated, state the current boundary, and link to its public repository.

#### Scenario: Visitor opens a case study
- **WHEN** a visitor opens any of the three selected case-study URLs
- **THEN** the page renders the project title, evidence-led narrative sections, current boundary, and a public GitHub source link.

#### Scenario: Visitor opens the projects index
- **WHEN** a visitor opens `/projects/`
- **THEN** the page presents cards for all three selected case studies and each card leads to its matching case-study page.

### Requirement: Accurate project positioning
The main site SHALL describe each selected project only with claims supported by its public repository and SHALL avoid unverified credentials, deployment claims, or outcome metrics.

#### Scenario: A project is presented as an MVP or learning platform
- **WHEN** the case study describes its production boundary or maturity
- **THEN** it distinguishes implemented capabilities from deferred or future production work.
