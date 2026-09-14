## ADDED Requirements

### Requirement: The published personal site SHALL include a canonical knowledge hub

The GitHub Pages artifact SHALL serve the VitePress knowledge hub beneath the personal site's project base URL at `/knowledge/`. The hub SHALL retain its existing Markdown content, metadata validation, local search, and internal wiki-link behavior.

#### Scenario: A reader opens the canonical knowledge hub

- **WHEN** a reader requests `/daoson_website/knowledge/`
- **THEN** the response is the VitePress knowledge-hub index
- **AND** its navigation provides a return link to the personal-site root.

### Requirement: Notes SHALL have one public source of truth

Technical notes, tutorials, learning paths, and knowledge-map content SHALL be authored only in the embedded knowledge project. The Jekyll notes route SHALL direct readers to the knowledge hub and SHALL NOT render a competing note index.

#### Scenario: A reader follows the main-site Notes navigation item

- **WHEN** a reader selects Notes from the personal-site navigation
- **THEN** the reader reaches the canonical knowledge hub
- **AND** no duplicate Jekyll note list is presented as the current knowledge base.

### Requirement: The deployment workflow SHALL publish both static outputs atomically

The main-site Pages workflow SHALL validate and build the embedded VitePress project, build Jekyll, place the VitePress distribution at `_site/knowledge/`, and create the Pagefind index only after both outputs exist.

#### Scenario: A production deployment build runs

- **WHEN** the workflow builds a push to `main`
- **THEN** it fails if VitePress validation, VitePress tests, VitePress build, or Jekyll build fails
- **AND** the uploaded Pages artifact contains both `_site/index.html` and `_site/knowledge/index.html`.
