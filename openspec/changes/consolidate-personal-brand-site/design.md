## Context

`daoson_website` is a Jekyll personal-site foundation with an existing Projects page, project-card data model, sidebar navigation, and homepage. `gitpagewebnote` is an independently deployed VitePress knowledge base. The user has selected three public repositories with source-backed descriptions as initial case studies and has explicitly chosen independent sites with reciprocal links rather than a merged build.

## Goals / Non-Goals

**Goals:**
- Make the main site communicate a coherent, evidence-led AI Agent engineering focus.
- Publish three durable, source-linked project case studies using the existing Jekyll `projects` collection.
- Make the external knowledge base discoverable from the main site and provide a clear route back.
- Preserve the current Jekyll/VitePress stacks, public URLs, and independent GitHub Pages deployments.

**Non-Goals:**
- No custom domain, subdomain, repository merge, iframe embedding, account system, or visual redesign.
- No invented employment history, education, customers, traffic, benchmark results, or production claims.
- No automatic synchronization of project content between the two repositories.

## Decisions

1. **Use collection documents for case studies and data entries for cards.** Each case study is a standalone Markdown document in `_projects/`; its companion entry in `_data/projects.yml` supplies the existing homepage and project-grid card components. This follows the current Jekyll data model and avoids bespoke templates.

2. **Use source and repository links as evidence.** Every case study points to its public GitHub repository and confines descriptions to implementation details visible in the repository. This is preferred over performance marketing copy because the site is intended for hiring and peer review.

3. **Keep cross-site navigation as ordinary external links.** The main site links to `https://benjamindaoson.github.io/gitpagewebnote/`, while the knowledge-base theme uses a configured `mainSiteUrl` and case-study URLs. This keeps deployments decoupled; visitors receive a clear route without shared build artifacts or fragile path rewriting.

4. **Treat the legacy in-site notes section and the VitePress knowledge base as distinct.** The new “知识库 / Knowledge” link names the maintained VitePress knowledge base. It does not rename or remove historical Jekyll notes, preserving their URLs.

## Risks / Trade-offs

- [A visitor leaves one site when following a cross-site link] → Label the destination consistently as “知识库 / Knowledge” and use reciprocal links.
- [Public repository claims become stale] → Case studies use modest wording and state an explicit current boundary; later updates are content edits, not architecture changes.
- [Duplicate project cards and case-study documents diverge] → Use the project name, description, repository URL, year, and status consistently; verify rendered card and page links after build.
- [The main-site URL changes with a future custom domain] → Keep the URL in one VitePress theme configuration module so it has a single replacement point.

## Migration Plan

1. Add the three case-study documents and corresponding project-card data.
2. Replace the current verification placeholder on the Projects page and expose the external Knowledge navigation link.
3. Add VitePress theme links to the main site and its three case-study URLs.
4. Build both repositories locally and inspect their rendered links.
5. Push each repository independently after review; rollback is a normal Git revert in the affected repository.

## Open Questions

None for this phase. A custom domain and `notes.` subdomain are explicitly deferred until content and traffic are stable.
