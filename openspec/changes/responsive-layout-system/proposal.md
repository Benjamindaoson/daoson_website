## Why

The site renders on phones, tablets, and desktops, but several layouts still preserve desktop assumptions: fixed spacing, card widths, navigation clearance, and dense content blocks. This produces clipped code or compressed hierarchy on small screens instead of an intentional re-layout.

## What Changes

- Establish shared fluid spacing and breakpoint tokens for the site shell.
- Make the sidebar, homepage modules, content listings, and detail-page overflow rules respond consistently across phone, tablet, and desktop widths.
- Preserve the existing Jekyll templates, visual identity, public routes, and native JavaScript behavior.

## Capabilities

### New Capabilities

- `responsive-site-layout`: The public site reflows without horizontal page overflow across supported phone, tablet, and desktop viewports.

### Modified Capabilities

None.

## Impact

- Affected code: `assets/css/style.css`.
- Verification: existing content/schema checks, Jekyll and Pagefind builds, plus browser viewport checks.
- No API, dependency, deployment-path, or framework changes.
