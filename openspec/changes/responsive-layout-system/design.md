## Context

The Jekyll site already has a desktop sidebar, mobile drawer, responsive card rules, and a viewport meta tag. Their spacing and width rules were introduced independently, so some components still use fixed desktop gutters or minimum widths. Long code examples were also clipped because highlighted Rouge tables could not overflow their container.

## Goals / Non-Goals

**Goals:**
- Give the existing site a consistent phone (`<= 640px`), tablet (`<= 900px`), and desktop layout model.
- Keep page content within the viewport while allowing intrinsically wide code, tables, and maths to scroll inside their own component.
- Preserve the sidebar interaction, Pagefind integration, Jekyll build, URLs, and Editorial Terminal styling.

**Non-Goals:**
- No template rewrite, new framework, new JavaScript behavior, visual redesign, or content changes.
- No bespoke breakpoint logic per route when a shared CSS rule applies.

## Decisions

- Use CSS custom properties and `clamp()` for shared gutters and vertical rhythm. This keeps spacing fluid without JavaScript and fits the existing handwritten stylesheet.
- Use the existing `640px` and `900px` bands for phone and tablet. The sidebar already switches at `900px`, so aligning grids and page spacing avoids competing layout modes.
- Change fixed card grid minima to `minmax(min(100%, <card-min>), 1fr)`. This preserves readable desktop cards but guarantees a one-column fallback on narrow content areas.
- Keep wide content inside scrollable components (`.highlight`, `pre`, tables, and KaTeX displays), rather than enabling page-level horizontal scrolling.
- Retain the recent highlighted-code overflow fix as part of the shared detail-page rule; it fixes the root cause for every Rouge code block.

## Risks / Trade-offs

- [Dense cards may become taller on phones] -> Stack cards and preserve readable line lengths instead of reducing text size.
- [Long code still exceeds the viewport] -> Provide component-level horizontal scrolling with `max-width: 100%`.
- [Existing media queries may overlap] -> Consolidate only the rules that govern the shared 640px/900px bands; leave unrelated component styling intact.
- [Desktop composition changes unintentionally] -> Verify the critical route set at 1440px after every CSS pass.
