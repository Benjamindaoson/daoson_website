# Knowledge hub integration design

## Architecture

`daoson_website` remains the single Pages repository. Its Jekyll build produces the personal-brand pages. The checked-in `knowledge/` subproject retains the VitePress content and local Node administration flow. The Pages workflow builds VitePress first, builds Jekyll, then copies the VitePress distribution into `_site/knowledge/` before Pagefind indexes the combined artifact.

## Content authority

- `knowledge/site/` is the only source for technical notes, tutorials, learning paths, and wiki links.
- Jekyll `_posts/` remains for long-form judgment, research commentary, and project case studies.
- Jekyll `_notes/` receives no new content. Its public route becomes a clear link to `/knowledge/` rather than a second note feed.
- `_data/projects.yml` is manually curated. It stores public status, evidence boundary, repository URL, and next step; GitHub is not fetched at build time.

## URL and retirement behavior

- New canonical knowledge route: `/daoson_website/knowledge/`.
- The former `gitpagewebnote` Pages site becomes a minimal redirect to that route and retains its repository as a migration record.
- The archived `Benjamindaoson_website` repository remains source-preserved, but its Pages deployment is removed only after the main-site release is verified.

## Verification

- Existing VitePress unit tests, content validation, and production build pass inside `knowledge/`.
- Jekyll content checks and production build pass.
- A combined artifact contains both the Jekyll homepage and `knowledge/index.html`.
- GitHub Actions succeeds after push; live URLs and redirects are read back.
