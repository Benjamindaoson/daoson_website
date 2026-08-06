# Responsive System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the site into a true responsive system so the same content reorganizes cleanly across phone, tablet, laptop, and desktop screens instead of behaving like a compressed desktop page.

**Architecture:** Keep the Jekyll templates intact where possible and do the bulk of the work in `assets/css/style.css`. Start from layout primitives, then navigation shell, then page-level grids, then dense detail-page components such as code blocks, metadata rows, TOC, and cards. Validate each pass with local build output and real mobile/tablet/desktop viewport checks.

**Tech Stack:** Jekyll, Liquid, Markdown, hand-written CSS, native JavaScript, GitHub Pages, Pagefind

## Global Constraints

- Keep the Jekyll / Liquid / Markdown stack.
- Use hand-written CSS and native JavaScript only.
- Do not introduce React, Next.js, Vue, Astro, or any new frontend framework.
- Do not add unnecessary dependencies.
- Do not break GitHub Pages compatibility.
- Do not submit `_site/`, `.bundle/`, `.jekyll-cache/`, `.tmp-npm-cache/`, `tmp/`, or `Gemfile.lock`.
- Keep the visible public brand name as `本杰铭`.
- Treat responsive behavior as re-layout, not zooming or squeezing.
- Verify with `node --check assets/js/main.js`, `bundle exec jekyll build`, and browser-level viewport checks.

---

### Task 1: Define Responsive Layout Primitives

**Files:**
- Modify: `assets/css/style.css`
- Verify: local `_site` output at `/`, `/writing/`, `/projects/`, `/notes/`, `/about/`, `/contact/`, `/uses/`

**Interfaces:**
- Consumes: existing CSS variables, `.container`, `.hero`, `.site-main`, `.site-main-inner`
- Produces: a consistent breakpoint and spacing system reused by later tasks

- [ ] **Step 1: Capture the current failure baseline**

Run:

```powershell
node --check assets/js/main.js
$env:Path='C:\Ruby34-x64\bin;'+$env:Path
bundle exec jekyll build
```

Then capture three viewport baselines:

```powershell
& 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe' --headless --disable-gpu --window-size=390,844 --screenshot='C:\temp\home-mobile-before.png' 'http://127.0.0.1:4016/daoson_website/'
& 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe' --headless --disable-gpu --window-size=820,1180 --screenshot='C:\temp\home-tablet-before.png' 'http://127.0.0.1:4016/daoson_website/'
& 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe' --headless --disable-gpu --window-size=1440,1200 --screenshot='C:\temp\home-desktop-before.png' 'http://127.0.0.1:4016/daoson_website/'
```

Expected: the current layout loads, but spacing, hierarchy, and component fit are still desktop-biased on small screens.

- [ ] **Step 2: Add breakpoint and fluid spacing primitives**

Modify the root token section in `assets/css/style.css`:

```css
:root {
  --bp-phone: 640px;
  --bp-tablet: 900px;
  --bp-wide: 1400px;

  --page-gutter: clamp(16px, 3vw, 40px);
  --section-gap: clamp(2rem, 4vw, 3.5rem);
  --hero-gap: clamp(2rem, 4vw, 3rem);
  --content-max: 760px;
  --content-max-wide: 820px;
}
```

- [ ] **Step 3: Replace fixed layout spacing with fluid rules**

Update the main layout primitives:

```css
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--page-gutter);
}

.hero {
  padding: var(--hero-gap) 0 calc(var(--hero-gap) - 0.5rem);
  margin-bottom: var(--section-gap);
}

.site-main-inner,
body.has-sidebar .footer {
  width: 100%;
  max-width: var(--content-max);
  margin-right: auto;
  margin-left: auto;
}
```

- [ ] **Step 4: Rebuild and verify the primitives**

Run:

```powershell
node --check assets/js/main.js
$env:Path='C:\Ruby34-x64\bin;'+$env:Path
bundle exec jekyll build
git diff --check
```

Expected: build passes and no syntax or whitespace errors appear.

- [ ] **Step 5: Commit**

```bash
git add assets/css/style.css
git commit -m "refactor: add responsive layout primitives"
```

### Task 2: Rework the Global Navigation Shell

**Files:**
- Modify: `assets/css/style.css`
- Inspect only: `_layouts/default.html`, `_includes/sidebar.html`

**Interfaces:**
- Consumes: existing `.site-layout`, `.site-sidebar`, `.site-main`, `.sidebar-toggle`, `.sidebar-backdrop`
- Produces: a stable shell where desktop uses a fixed left rail and phone/tablet use a slide-in drawer without blocking content

- [ ] **Step 1: Verify current shell behavior on phone and tablet**

Check these pages:

```text
/ 
/writing/
/projects/
/about/
```

Expected failure to look for: oversized first-screen dead space, cramped hero alignment, or drawer chrome overlapping page content.

- [ ] **Step 2: Adjust shell rules for three screen bands**

Modify `assets/css/style.css` around the sidebar layout block:

```css
.site-layout {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  min-height: 100vh;
}

.site-main {
  min-width: 0;
  padding: 3rem var(--page-gutter) 2rem;
}

@media (max-width: 900px) {
  .site-layout {
    display: block;
  }

  .site-sidebar {
    position: fixed;
    top: 0;
    left: -270px;
    width: min(260px, calc(100vw - 32px));
    height: 100vh;
  }

  .site-main {
    padding: 4rem var(--page-gutter) 1.25rem;
  }
}

@media (max-width: 640px) {
  .sidebar-toggle {
    top: 0.75rem;
    right: 0.75rem;
  }
}
```

- [ ] **Step 3: Tighten mobile hero clearance so the drawer button and content both fit**

Update the mobile hero spacing:

```css
@media (max-width: 640px) {
  body.has-sidebar .hero {
    padding-top: 2.5rem;
    margin-bottom: 1.5rem;
  }
}
```

- [ ] **Step 4: Rebuild and smoke-check the shell**

Run:

```powershell
$env:Path='C:\Ruby34-x64\bin;'+$env:Path
bundle exec jekyll build
```

Then capture:

```powershell
& 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe' --headless --disable-gpu --window-size=390,844 --screenshot='C:\temp\shell-mobile-after.png' 'http://127.0.0.1:4016/daoson_website/'
& 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe' --headless --disable-gpu --window-size=820,1180 --screenshot='C:\temp\shell-tablet-after.png' 'http://127.0.0.1:4016/daoson_website/'
```

Expected: content is readable without looking like a desktop layout shrunk down.

- [ ] **Step 5: Commit**

```bash
git add assets/css/style.css
git commit -m "refactor: make global shell responsive"
```

### Task 3: Reflow Home and Listing Pages

**Files:**
- Modify: `assets/css/style.css`
- Verify against: `index.html`, `writing.html`, `projects.html`, `notes.html`, `uses.md`, `elsewhere.md`

**Interfaces:**
- Consumes: `.home-card-grid`, `.home-garden-grid`, `.home-now-panel`, `.post-list`, `.project-grid`, `.labs-*`, `.elsewhere-list`
- Produces: page-level responsive grids that reflow naturally instead of relying on desktop card widths

- [ ] **Step 1: Confirm which grids still feel desktop-first**

Open these page groups at `390px`, `820px`, and `1440px`:

```text
/ 
/writing/
/projects/
/notes/
/elsewhere/
```

Expected failure to look for: cards too wide for phone rhythm, too much empty space on tablet, or inconsistent section spacing.

- [ ] **Step 2: Replace hard minimum card widths with fluid minimums**

Modify grid rules like these:

```css
.post-list,
.labs-grid,
.elsewhere-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 1rem;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  gap: 1rem;
}
```

- [ ] **Step 3: Normalize phone/tablet behavior for the homepage modules**

Update the home modules:

```css
@media (max-width: 900px) {
  .home-card-grid,
  .home-garden-grid,
  .elsewhere-home-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .home-card-grid,
  .home-garden-grid,
  .home-project-grid,
  .elsewhere-home-list {
    grid-template-columns: 1fr;
  }

  .home-section {
    margin: 2.25rem 0;
  }
}
```

- [ ] **Step 4: Rebuild and verify page-level screenshots**

Run:

```powershell
$env:Path='C:\Ruby34-x64\bin;'+$env:Path
bundle exec jekyll build
```

Then capture:

```powershell
& 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe' --headless --disable-gpu --window-size=390,844 --screenshot='C:\temp\projects-mobile-after.png' 'http://127.0.0.1:4016/daoson_website/projects/'
& 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe' --headless --disable-gpu --window-size=390,844 --screenshot='C:\temp\writing-mobile-after.png' 'http://127.0.0.1:4016/daoson_website/writing/'
```

Expected: cards stack or split appropriately without oversized gutters or compressed copy.

- [ ] **Step 5: Commit**

```bash
git add assets/css/style.css
git commit -m "refactor: reflow home and listing pages responsively"
```

### Task 4: Make Detail Pages Dense but Mobile-Safe

**Files:**
- Modify: `assets/css/style.css`
- Verify against: `_site` pages for posts, notes, and TILs after rebuild

**Interfaces:**
- Consumes: `.post-meta`, `.post-toc`, `.highlight`, `pre`, `blockquote`, `.about-layout`, tables, KaTeX blocks
- Produces: detail pages that keep content readable on phone without clipping code, metadata, or side structures

- [ ] **Step 1: Confirm the failure cases**

Check these representative pages:

```text
/posts/2026/05/12/code-readability/
/posts/2026/05/20/vite-modern-frontend/
/notes/esm/
/til/2026-05-24-git-restore-staged/
/about/
```

Expected failures before the fix: clipped code, crowded metadata rows, or desktop-first side structures.

- [ ] **Step 2: Make code, tables, and math horizontally safe**

Keep or extend the code-block rules:

```css
pre,
.highlight,
.katex-display,
.post-content table {
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}

.highlight table {
  width: max-content;
  min-width: 100%;
}
```

- [ ] **Step 3: Reflow metadata and TOC for phone**

Add mobile detail-page rules:

```css
@media (max-width: 640px) {
  .post-meta,
  .note-meta {
    gap: 0.5rem 0.75rem;
    font-size: 0.85rem;
    flex-wrap: wrap;
  }

  .post-toc {
    padding: 0.8rem 1rem;
  }

  .post-toc .toc-head {
    align-items: flex-start;
    gap: 0.5rem;
  }
}
```

- [ ] **Step 4: Make About page layout explicitly phone-first**

Refine the avatar/about split:

```css
@media (max-width: 640px) {
  .about-layout {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .avatar {
    width: 128px;
    height: 128px;
  }
}
```

- [ ] **Step 5: Rebuild and verify the dense content pages**

Run:

```powershell
node --check assets/js/main.js
$env:Path='C:\Ruby34-x64\bin;'+$env:Path
bundle exec jekyll build
git diff --check
```

Expected: the pages build cleanly and long code remains readable via horizontal scroll rather than clipping.

- [ ] **Step 6: Commit**

```bash
git add assets/css/style.css
git commit -m "fix: make detail pages responsive on small screens"
```

### Task 5: Final Responsive QA Pass

**Files:**
- Verify: `assets/css/style.css`, `_includes/sidebar.html`, `_layouts/default.html`, `_site/*` build output
- Do not modify unless a real regression is found

**Interfaces:**
- Consumes: all prior responsive CSS work
- Produces: ship evidence for phone, tablet, and desktop behavior

- [ ] **Step 1: Run the full local verification loop**

Run:

```powershell
node --check assets/js/main.js
python scripts/validate_content.py
$env:Path='C:\Ruby34-x64\bin;'+$env:Path
ruby scripts/check_content_schema.rb
bundle exec jekyll build
powershell -ExecutionPolicy Bypass -File scripts/build_pagefind.ps1
git diff --check
git status --short
```

Expected: all checks pass.

- [ ] **Step 2: Perform viewport QA on the critical route set**

Verify:

```text
/ 
/writing/
/projects/
/notes/
/about/
/contact/
/uses/
/elsewhere/
/posts/2026/05/12/code-readability/
/til/2026-05-24-git-restore-staged/
```

Viewports:

```text
390x844   phone
820x1180  tablet
1440x1200 desktop
```

Expected: no clipped content, no desktop-only assumptions, no forced zoom feel, and no horizontal page overflow.

- [ ] **Step 3: Check navigation and search behavior**

Verify manually:

```text
Phone: drawer opens, closes, does not trap content under it
Tablet: layout still reads as intentional, not stretched desktop
Desktop: left rail remains stable
Search modal: opens and remains usable in all three viewport bands
```

- [ ] **Step 4: Commit**

```bash
git add assets/css/style.css
git commit -m "test: complete responsive QA pass"
```

## Self-Review

**1. Spec coverage:** This plan covers the responsive system at four levels: layout primitives, navigation shell, page grids, and dense content details. It also includes viewport QA rather than stopping at CSS edits.

**2. Placeholder scan:** No `TBD`, `TODO`, or abstract “fix responsive issues” steps remain. Each task names exact files, concrete CSS targets, and verification commands.

**3. Type consistency:** The plan stays in CSS/layout territory and reuses the existing class names already present in `assets/css/style.css`, `_layouts/default.html`, and `_includes/sidebar.html`.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-23-responsive-system.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
