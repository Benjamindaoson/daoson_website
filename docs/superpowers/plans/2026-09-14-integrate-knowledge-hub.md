# Knowledge Hub Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the existing VitePress notes experience beneath the personal Jekyll site at `/knowledge/`.

**Architecture:** Keep the notes pipeline intact inside `knowledge/`; the Pages workflow builds VitePress and Jekyll into one `_site` artifact. Jekyll owns brand and project evidence; VitePress owns technical notes.

**Tech Stack:** Jekyll 4, Ruby, Node 20, VitePress 1.6, GitHub Pages Actions.

**Spec:** `openspec/changes/integrate-knowledge-hub/specs/unified-knowledge-hub/spec.md`

## Global Constraints

- Do not add a CMS, database, runtime server, or framework.
- Preserve VitePress content validation, tests, import flow, and local admin.
- Publish notes only from `knowledge/site/`.
- Build both static outputs before indexing and upload one Pages artifact.

---

### Task 1: Embed and prove the knowledge project

**Files:** `knowledge/`; `tests/knowledge-integration.test.mjs`

- [ ] Write a failing Node test that requires `knowledge/package.json`, `knowledge/site/.vitepress/config.mts`, and `base = '/daoson_website/knowledge/'`.
- [ ] Copy the notes project without `.git`, `.codegraph`, or `node_modules`.
- [ ] Change the VitePress base and main-site links.
- [ ] Run the new test and the inherited knowledge tests.

### Task 2: Produce one Pages artifact

**Files:** `.github/workflows/deploy.yml`; `scripts/build-unified-site.ps1`; `tests/knowledge-integration.test.mjs`

- [ ] Write a failing test requiring the combined build contract to place `knowledge/index.html` in `_site`.
- [ ] Add the smallest build script that runs VitePress, Jekyll, and copies the VitePress output.
- [ ] Make the workflow install Node dependencies, run inherited tests, invoke the unified build, and index the result.
- [ ] Run the unified build locally and assert `_site/index.html` plus `_site/knowledge/index.html`.

### Task 3: Make the public narrative canonical

**Files:** `_includes/sidebar.html`; `notes.html`; `_data/projects.yml`; `index.html`; `README.md`; profile `README.md`

- [ ] Replace the duplicate Jekyll notes entry with the canonical knowledge hub link.
- [ ] Curate projects around LLM post-training, multimodal research, and evidence-backed agent systems.
- [ ] Repair the Profile README portfolio URL and align its project hierarchy.

### Task 4: Release and retire duplicate public endpoints

**Files:** `gitpagewebnote` redirect deployment; GitHub Pages settings

- [ ] Push only after local content, tests, and production builds pass.
- [ ] Verify Actions, canonical pages, and redirect responses by read-back.
- [ ] Remove the archived legacy Pages deployment only after the replacement is live.
