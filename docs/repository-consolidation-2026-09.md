# Website Repository Consolidation

This document records the canonical ownership of Benjamin Daoson's public website and notes.

## Canonical repositories

- `Benjamindaoson/daoson_website` — personal website, technical writing, project notes, and public knowledge base.
- `Benjamindaoson/Benjamindaoson` — GitHub profile README only.
- `Benjamindaoson/TIAI_website` — institutional website only.

## Migrated / legacy repositories

### Benjamindaoson_website

Earlier personal-portfolio implementation.

Status: already archived.

Any unique public-profile information should be maintained in the GitHub profile or this canonical personal website instead of reviving the old repository.

### gitpagewebnote

Earlier standalone Markdown-notes publishing system.

The repository itself already documents that the public knowledge base has moved to the personal website.

Status: migration complete and repository archived.

## Rule

New personal-site, writing, notes, and public knowledge-base work belongs in `daoson_website`.

Do not create another parallel personal website repository unless it has a materially different deployment or organizational purpose.


## Unique-content audit — 2026-09-21

The archived `Benjamindaoson_website` tree was compared with the canonical site.

- Two old standalone posts remain unique in the archived source: a generic production-AI article and a website-refactor retrospective.
- Earlier `_data/projects.yml`, `_data/papers.yml`, and Working Papers entries contain stale placeholder links or unsupported submission/status claims.
- The canonical site already has a newer content model, project evidence records, and current technical positioning.

Decision: **do not import the old pages automatically**. The archived repository remains the provenance source; only a future editorial rewrite with current evidence may reuse those ideas. No unique verified project evidence was lost.
