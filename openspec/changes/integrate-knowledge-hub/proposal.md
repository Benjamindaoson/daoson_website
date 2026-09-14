# Integrate the knowledge hub into the personal site

## Why

The personal site and the VitePress notes site currently expose two public URLs and overlapping note concepts. The GitHub profile also points to an unavailable root Pages URL. The public presence should center LLM training, multimodal model research, and only evidence-backed agent systems.

## What changes

- Move the existing VitePress note source, importer, validator, tests, and local admin into `knowledge/` in this repository.
- Build that source into the Jekyll Pages artifact at `/knowledge/` without rewriting its publishing pipeline.
- Make the Jekyll main navigation and former notes page route readers to the knowledge hub, leaving one public source of truth for notes.
- Refresh the profile, project catalogue, and homepage around model training, multimodal research, and selected high-signal agent systems.
- Retire the former notes-site deployment by redirecting it to the new knowledge route; retire the conflicting archived personal-site Pages deployment after the replacement is verified.

## Non-goals

- No new CMS, database, server, analytics provider, or frontend framework.
- No automatic GitHub API project harvesting at build time.
- No claim that a project is production-ready without repository-level evidence.
