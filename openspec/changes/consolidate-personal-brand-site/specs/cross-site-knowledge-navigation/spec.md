## ADDED Requirements

### Requirement: Main-site knowledge-base navigation
The main site SHALL expose a “知识库 / Knowledge” navigation link to `https://benjamindaoson.github.io/gitpagewebnote/` from its global navigation and homepage.

#### Scenario: Visitor navigates from the main-site sidebar
- **WHEN** a visitor activates the global “知识库 / Knowledge” link
- **THEN** the browser opens the maintained VitePress knowledge base in a new tab with safe external-link attributes.

#### Scenario: Visitor navigates from the main-site homepage
- **WHEN** a visitor activates the homepage knowledge-base card
- **THEN** the browser opens the maintained VitePress knowledge base in a new tab with safe external-link attributes.

### Requirement: Knowledge-base return navigation
The VitePress knowledge base SHALL display links to the main site and its project-case-study index, while preserving all existing documentation navigation and content routes.

#### Scenario: Reader is on a knowledge-base page
- **WHEN** a reader views the VitePress site
- **THEN** the reader can find links labelled “关于作者 / About”, “个人主站 / Main site”, and “项目案例 / Case studies” that target the configured main-site URLs.
