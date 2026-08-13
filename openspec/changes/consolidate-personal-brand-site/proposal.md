## Why

The public portfolio, project evidence, and learning knowledge base currently live in several independently evolved sites. This makes it harder for recruiters and peers to quickly understand the owner's technical focus and verify it through real work.

## What Changes

- Make `daoson_website` the single personal-brand entry point, retaining its Jekyll stack and editorial-terminal style.
- Publish three evidence-led project case studies: SmartOrderingAgent, Financial Asset QA System, and AI Agent Engineering Lab.
- Add a prominent “知识库 / Knowledge” route from the main-site navigation and homepage to the existing VitePress knowledge base.
- Add reciprocal author, main-site, and project-case-study links to the VitePress knowledge base.
- Replace “case studies are being verified” placeholder copy with the published case studies; no invented credentials, metrics, employers, or deployment claims.

## Capabilities

### New Capabilities

- `evidence-led-project-case-studies`: The main site provides three public project case studies that state problem, system design, verification approach, and current boundary with source links.
- `cross-site-knowledge-navigation`: The main site and the knowledge base provide clear reciprocal navigation without combining their build pipelines.

### Modified Capabilities

None.

## Impact

- Main-site pages and data: `projects.html`, `_projects/`, `_data/projects.yml`, `_includes/sidebar.html`, and `index.html`.
- Knowledge-base theme/configuration: `site/.vitepress/` and its existing Node tests.
- No framework, dependency, public API, or deployment-provider change.
