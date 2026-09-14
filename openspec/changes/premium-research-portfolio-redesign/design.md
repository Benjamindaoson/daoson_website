## Context

The site is a Jekyll portfolio with a VitePress knowledge hub at `/knowledge/`. Its current light terminal theme, dotted background, dense cards, and multiple equal-weight calls to action make the research direction harder to scan than the content warrants. The user wants a more considered Silicon Valley research and early-stage company standard, while keeping the evidence-first voice, existing paths, and GitHub Pages deployment.

## Goals / Non-Goals

**Goals:**

- Make the primary identity legible within the first viewport: LLM post-training, multimodal algorithms, and reliable agent systems.
- Use a cohesive dark graphite palette with one restrained signal-green accent, system fonts, an original generated research asset, strong spacing, and low-motion interaction feedback.
- Preserve Chinese-first copy, all public routes, the side navigation model, and the knowledge hub’s reading and search features.
- Explicitly support mobile layout, keyboard focus, reduced motion, and readable contrast.

**Non-Goals:**

- No framework replacement, database, external font dependency, new analytics, fake product screenshots, invented metrics, or content claims.
- No route, navigation-label, logo, or publishing workflow changes.

## Decisions

### One shared research-studio token system

Use CSS custom properties to replace the light terminal palette with graphite surfaces, muted cool-gray text, and a single signal-green accent. This is the lowest-risk way to make all existing Jekyll page types feel deliberate without reimplementing templates. The VitePress theme receives equivalent variables so the knowledge hub retains a single brand family.

Alternative considered: a full React or Tailwind rewrite. Rejected because the static GitHub Pages deployment and already working content pipeline do not need it.

### Asymmetric evidence-first homepage

Keep the current homepage content but make the first viewport a two-column research thesis: concise copy and two primary paths on the left, original research imagery on the right. The visual is documentary-like rather than a fake interface, so it supports the subject without manufacturing evidence.

Alternative considered: a centered text-only manifesto. Rejected because it makes a research portfolio feel unfinished and gives no visual anchor.

### Presentation hierarchy over uniform cards

Use varied grid spans and dark surface contrast for the three research questions, selected writing, project evidence, and knowledge pathways. Cards remain where clickability or project grouping needs a container; ordinary lists use spacing and rules instead.

Alternative considered: retain a uniform three-column card system. Rejected because it flattens priority and looks like a generic generated portfolio.

### Conservative motion

Use only CSS hover, focus, and entrance polish. All automatic motion is disabled under `prefers-reduced-motion`. No scroll handlers or animation libraries are introduced.

## Risks / Trade-offs

- [Dark surfaces could lower reading comfort] -> Keep body content on elevated graphite surfaces, use high-contrast text, and preserve explicit focus states.
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
