# Content Schema

This site is a personal brand system, not a generic blog template. Content should
be accurate, specific, and maintainable. If a fact is not confirmed, leave it out
or mark it as still being organized.

## Global rules

- Do not invent education, employers, titles, clients, revenue, users, awards, or certificates.
- Prefer a small amount of verified content over a large amount of filler.
- Use bilingual content only when both versions are understandable and honest.
- Keep summaries short. Link to original sources instead of copying external platform content.
- If a page is incomplete, say so plainly.

## Automated check

Run this before publishing:

```powershell
ruby scripts/check_content_schema.rb
```

The script checks required front matter, project status values, external publication
fields, and the most obvious Chinese/English UI-label mixing mistakes.

## Posts

Required front matter:

```yaml
title: "Post title"
date: 2026-06-01 10:00:00 +0800
tags: [AI, engineering]
description: "One sentence summary."
lang: zh
```

Recommended optional fields:

```yaml
series: "Series name"
translation_key: "stable-shared-key"
cover: /assets/img/covers/example.svg
math: false
```

Guidelines:

- Posts should contain personal judgment, tradeoffs, or reflection.
- Tutorials should explain why a choice matters, not only copy official steps.
- Remove template text, fake video IDs, and placeholder screenshots before publishing.

## Notes

Required front matter:

```yaml
title: "Concept name"
date: 2026-06-01
tags: [frontend, systems]
description: "What this note is about."
lang: zh
```

Recommended optional fields:

```yaml
status: seedling
translation_key: "stable-shared-key"
```

Allowed `status` values:

- `seedling`: early idea
- `growing`: useful but still evolving
- `evergreen`: stable reference

Guidelines:

- Notes can be incomplete, but they should still be useful.
- Add links to related posts, TILs, and Labs when possible.
- Use wiki links for connected notes and posts: `[[esbuild]]` or `[[esbuild|Go bundler]]`.
- Update `updated` when a note changes meaningfully, so `/notes/` remains useful.

## TIL

Required front matter:

```yaml
title: "Specific thing learned"
date: 2026-06-01
tags: [jekyll, liquid]
lang: zh
```

Guidelines:

- Keep each TIL narrow.
- Include the command, code, or exact condition when it matters.
- Avoid turning TIL entries into full essays.

## Writing workflow

Use the site as a three-layer public knowledge system:

| Layer | Directory | Purpose | Public |
|---|---|---|---|
| Posts | `_posts/` | Finished essays and retrospectives | yes |
| Notes | `_notes/` | Growing ideas and linked concepts | yes |
| TIL | `_til/` | Small concrete learnings | yes |
| Drafts | `_drafts/` | Unpublished work | no |
| Daily | `_daily/` | Private notes | no |

Recommended loop:

1. Capture rough thoughts privately in `_drafts/` or `_daily/`.
2. Promote stable concepts into `_notes/`.
3. Record small discoveries in `_til/`.
4. Turn connected notes into a post when there is a clear argument.
5. Link posts back to notes with wiki links when useful.

## Bilingual workflow

Use `lang` and `translation_key` consistently:

```yaml
lang: zh
translation_key: stable-shared-key
```

For a bilingual post:

```text
_posts/2026-06-01-example.md
_posts/2026-06-01-example.en.md
```

Rules:

- Chinese versions should be fully Chinese except unavoidable proper nouns or technical terms.
- English versions should be fully English.
- Do not mix section labels such as `Labs / 构建记录` in user-facing UI.
- Single-language posts are fine; do not create weak translations just for symmetry.

## Projects / Labs

Data file: `_data/projects.yml`

Required fields:

```yaml
- name_zh: "项目名"
  name_en: "Project name"
  description_zh: "这个项目想做什么。"
  description_en: "What this project is trying to do."
  status: active
  category: ai
  year: 2026
```

Recommended optional fields:

```yaml
icon: ">"
url: "https://..."
lang: "Python · TypeScript"
hypothesis_zh: "正在验证的核心假设。"
hypothesis_en: "The core hypothesis being tested."
problem_zh: "正在探索的问题。"
problem_en: "The problem being explored."
next_zh: "下一步真实计划。"
next_en: "The next honest step."
visibility: writing
public_boundary_zh: "当前公开什么，不公开什么。"
public_boundary_en: "What is public and what is not public yet."
```

Allowed `status` values:

- `active`: ongoing work
- `prototype`: working prototype, still validating
- `learning`: learning project
- `archived`: no longer active, kept for reflection

Allowed `visibility` values:

- `public`: public repo or demo exists
- `private`: cannot be linked publicly
- `writing`: public explanation exists or is being prepared

Guidelines:

- Do not present an experiment as a mature product.
- If the project links only to a GitHub profile, say what is not public yet.
- Prefer explicit boundaries over vague confidence.

## Elsewhere

Data file: `_data/elsewhere.yml`

Required fields when an item exists:

```yaml
- title: "External publication title"
  platform: "YouTube"
  date: 2026-06-01
  type: video
  summary: "A short summary written for this site."
  url: "https://..."
  language: zh
```

Recommended optional fields:

```yaml
tags: ["AI", "frontend"]
```

Allowed `type` values:

- `article`
- `video`
- `short`
- `thread`
- `newsletter`

Guidelines:

- Do not scrape external platforms.
- Do not copy full text or transcripts from external platforms.
- Link to the original platform.
- If there are no real links yet, keep the data file as `[]`.
