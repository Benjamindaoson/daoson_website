# Consolidate Personal Brand Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn `daoson_website` into the evidence-led personal-brand entry point and connect it bidirectionally to the existing knowledge base.

**Architecture:** Main-site project collection documents hold the case-study narratives; `_data/projects.yml` remains the card source. Both sites keep independent build/deploy pipelines and connect with configured, safe external links.

**Tech Stack:** Jekyll/Liquid/Markdown; VitePress/Node.js; GitHub Pages.

**Spec:** `openspec/changes/consolidate-personal-brand-site/`

## Global Constraints

- Preserve Jekyll and VitePress; add no runtime dependency.
- Do not make unsupported credentials, metrics, or deployment claims.
- Keep the sites independently deployable and use `https://benjamindaoson.github.io/gitpagewebnote/` as the current knowledge-base URL.
- Verify both production builds and rendered links before handoff.

---

### Task 1: Evidence-led Jekyll case studies

**Files:**
- Create: `_projects/smart-ordering-agent.md`
- Create: `_projects/financial-asset-qa-system.md`
- Create: `_projects/ai-agent-engineering-lab.md`
- Modify: `_data/projects.yml`
- Modify: `projects.html`

**Interfaces:**
- Consumes: the Jekyll `projects` collection and `project-card.html` card schema.
- Produces: `/projects/smart-ordering-agent/`, `/projects/financial-asset-qa-system/`, and `/projects/ai-agent-engineering-lab/` with source links and matching project-grid cards.

- [ ] **Step 1: Add the three case-study documents**

Use front matter with `title`, `description`, `slug`, `repository`, `status`, and `year`. Each body includes Problem, System Design, Verification, Current Boundary, and Source sections. State only details visible in the public repositories.

- [ ] **Step 2: Add cards and Projects index copy**

Add one `public` record per case study using its internal `/projects/<slug>/` URL. Replace the “being verified” copy with a statement explaining that the three cards are source-linked evidence-led cases.

- [ ] **Step 3: Build and inspect output**

Run: `bundle exec jekyll build`

Expected: exit code 0 and generated `_site/projects/` pages containing each repository URL and the source-linked cards.

### Task 2: Reciprocal knowledge navigation

**Files:**
- Modify: `_includes/sidebar.html`
- Modify: `index.html`
- Modify: `D:/01_project/gitpagewebnote/site/.vitepress/theme/index.mjs`
- Modify: `D:/01_project/gitpagewebnote/site/.vitepress/theme/style.css` only if needed for existing header styling

**Interfaces:**
- Consumes: current external knowledge URL and the main-site base URL.
- Produces: labelled main-to-knowledge and knowledge-to-main links without a shared build artifact.

- [ ] **Step 1: Add main-site knowledge links**

Add a sidebar item and homepage knowledge card pointing to `https://benjamindaoson.github.io/gitpagewebnote/` with `target="_blank"` and `rel="noopener"`.

- [ ] **Step 2: Add knowledge-base return links**

Expose three theme links: “关于作者 / About” to `https://benjamindaoson.github.io/daoson_website/about/`, “个人主站 / Main site” to `https://benjamindaoson.github.io/daoson_website/`, and “项目案例 / Case studies” to `https://benjamindaoson.github.io/daoson_website/projects/`.

- [ ] **Step 3: Build both sites**

Run: `bundle exec jekyll build` in `D:/01_project/daoson_website` and `npm run docs:build` in `D:/01_project/gitpagewebnote`.

Expected: both exit with code 0 and contain the cross-site links in their generated HTML.

### Task 3: Regression and release verification

**Files:**
- Test: existing Node test suite in `D:/01_project/gitpagewebnote/tests/`

**Interfaces:**
- Consumes: both generated site trees.
- Produces: evidence that no existing VitePress behavior regressed and that the required links render.

- [ ] **Step 1: Run established verification**

Run: `powershell -ExecutionPolicy Bypass -File scripts/check.ps1` in `D:/01_project/daoson_website`; then `npm test` and `npm run docs:build` in `D:/01_project/gitpagewebnote`.

- [ ] **Step 2: Inspect rendered artifacts**

Use `rg` against `_site/` and `site/.vitepress/dist/` to confirm all three project-page paths and both directions of navigation are present.

- [ ] **Step 3: Review diffs**

Run `git diff --check` and `git status --short` in both repositories; preserve unrelated existing changes.
