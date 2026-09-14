## ADDED Requirements

### Requirement: Knowledge hub brand continuity
The knowledge hub SHALL use the same dark research-studio color family and accessible interaction language as the portfolio while preserving its documentation navigation, search, and content routes.

#### Scenario: Visitor enters the knowledge hub
- **WHEN** a visitor opens `/knowledge/`
- **THEN** the hub SHALL visibly belong to the portfolio brand and retain working course links, search access, and readable documentation content

#### Scenario: Visitor uses the knowledge hub on a phone
- **WHEN** a visitor opens `/knowledge/` at a viewport narrower than 640 pixels
- **THEN** navigation and course entry points SHALL remain usable without horizontal overflow
