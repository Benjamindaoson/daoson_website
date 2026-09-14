## Context

The site is a Jekyll portfolio with a VitePress knowledge hub at `/knowledge/`. Its existing dark refresh compresses type, makes the content feel heavier than it is, and hides the user's professional identity behind a research manifesto. The user wants a bright, calm Silicon Valley portfolio standard that lets hiring teams, students, and research partners understand the work quickly, while keeping the evidence-first voice, existing paths, and GitHub Pages deployment.

## Goals / Non-Goals

**Goals:**

- Make the primary identity legible within the first viewport: AI technical expert working on LLM post-training, multimodal algorithms, reliable agent systems, and technical education.
- Use a cohesive light ivory and cobalt palette, system fonts, an original generated research asset, generous spacing, and low-motion interaction feedback.
- Make three audience paths obvious without asking a visitor to infer the site map: hiring and technical collaboration, AI learning, and academic or institutional partnership.
- Preserve Chinese-first copy, all public routes, the side navigation model, and the knowledge hub’s reading and search features.
- Explicitly support mobile layout, keyboard focus, reduced motion, and readable contrast.

**Non-Goals:**

- No framework replacement, database, external font dependency, new analytics, fake product screenshots, invented metrics, or content claims.
- No route, navigation-label, logo, or publishing workflow changes.

## Decisions

### One shared light editorial token system

Use CSS custom properties to replace the dark refresh with warm-white surfaces, ink text, and a restrained cobalt accent. This is the lowest-risk way to make all existing Jekyll page types feel deliberate without reimplementing templates. The VitePress theme receives equivalent variables so the knowledge hub retains a single brand family.

Alternative considered: a full React or Tailwind rewrite. Rejected because the static GitHub Pages deployment and already working content pipeline do not need it.

### Audience-first, evidence-led homepage

Keep the current homepage content but make the first viewport a two-column professional introduction: concise identity and two primary paths on the left, original research imagery on the right. An audience-path strip follows immediately, then representative work before further explanation. The visual is editorial rather than a fake interface, so it supports the subject without manufacturing evidence.

Alternative considered: a centered text-only manifesto. Rejected because it makes a research portfolio feel unfinished and gives no visual anchor.

### Presentation hierarchy over uniform cards

Use varied grid spans and dark surface contrast for the three research questions, selected writing, project evidence, and knowledge pathways. Cards remain where clickability or project grouping needs a container; ordinary lists use spacing and rules instead.

Alternative considered: retain a uniform three-column card system. Rejected because it flattens priority and looks like a generic generated portfolio.

### Conservative motion

Use only CSS hover, focus, and entrance polish. All automatic motion is disabled under `prefers-reduced-motion`. No scroll handlers or animation libraries are introduced.

## Risks / Trade-offs

- [A light palette could lose technical character] -> Retain strong typographic hierarchy, evidence labels, and restrained cobalt details rather than using decorative effects.
- [Generated image could slow the first render] -> Use a single compressed asset, define its dimensions, and load it only on the homepage.
- [Global CSS overrides could affect long-form pages] -> Scope page-specific styles under existing classes and test representative pages at desktop and mobile widths.
- [Visual inconsistency between Jekyll and VitePress] -> Match semantic color roles rather than attempting an identical layout across the portfolio and documentation products.

## Migration Plan

1. Add the asset and visual tokens with no route changes.
2. Update the homepage structure and scoped portfolio styles.
3. Align the VitePress knowledge home and documentation tokens.
4. Run builds and browser checks, then deploy through the existing GitHub Actions workflow.
5. Rollback is a normal commit revert because no data or deployment settings change.

## Open Questions

None. The user explicitly authorized the visual direction and implementation.
