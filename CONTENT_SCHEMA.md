# Content Schema

本网站公开名称统一为 **本杰铭**。当前公开站点保持中文优先，新增公开内容默认使用 `lang: zh`。

这个站点是个人技术身份和数字花园，不是通用博客模板。内容必须准确、具体、可维护；无法确认的事实不要写，或明确标记为“正在整理中”。

## Global rules

- Do not invent education, employers, titles, clients, revenue, users, awards, or certificates.
- Prefer a small amount of verified content over a large amount of filler.
- Use bilingual content only when both versions are understandable and honest.
- Keep summaries short. Link to original sources instead of copying external platform content.
- If a page is incomplete, say so plainly.

## Automated check

发布前运行：

```powershell
ruby scripts/check_content_schema.rb
python scripts/validate_content.py
```

Ruby 脚本保留原有项目字段、基础 front matter 和 UI 文案检查。Python 脚本补充检查 Markdown 文件名、Front Matter、slug 重复、YAML 格式、外部 URL、图片路径、大文件、危险 HTML、敏感文件和未确认导入草稿。

## Posts

Required front matter:

```yaml
title: "文章标题"
date: 2026-06-01 10:00:00 +0800
tags: [Agent, Evals]
description: "一句话摘要。"
lang: zh
```

Recommended optional fields:

```yaml
summary: "一句话摘要，可与 description 保持一致。"
category: "Agent Systems"
content_mode: local
source_platform: ""
source_url: ""
canonical_url: ""
featured: false
visibility: public
series: "系列名"
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
- title: "外部文章标题"
  summary: "为本站写的一句话摘要，不复制平台正文。"
  platform: "知乎"
  url: "https://..."
  published_at: 2026-06-01
  date: 2026-06-01
  category: article
  type: article
  content_mode: external
  language: zh
```

Recommended optional fields:

```yaml
tags: ["Agent", "Evals"]
cover: "/assets/img/covers/example.webp"
featured: false
```

`date`、`type`、`language` 保留用于兼容旧校验脚本；新页面优先读取 `published_at`、`category`、`content_mode`。

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
- `content_mode: external` 只展示链接卡片，不创建外部全文页面。
- 普通文章不要用 iframe 强行嵌入；只有官方支持嵌入时才使用 `content_mode: embed`。

## Local content scripts

创建内容：

```powershell
python scripts/new_content.py
```

非交互示例：

```powershell
python scripts/new_content.py --type post --title "Agent 评估闭环" --summary "一篇关于评估闭环的文章。" --category "Agent Evals" --tags "Agent,Evals"
python scripts/new_content.py --type note --title "工具调用失败分类" --summary "整理 Agent 工具调用失败类型。" --tags "Agent,可靠性"
python scripts/new_content.py --type til --title "Jekyll where_exp 的一个用法" --tags "Jekyll,Liquid"
python scripts/new_content.py --type external --title "外部文章标题" --summary "本站摘要。" --platform "知乎" --url "https://example.com/article" --category "article" --tags "Agent"
```

导入外部文章为待确认草稿：

```powershell
python scripts/import_article.py --url "https://example.com/article"
python scripts/import_article.py --file ".\local-article.md" --source-url "https://example.com/original"
python scripts/import_article.py --manual --title "手动粘贴文章"
```

导入脚本只写入 `tmp/imports/`，并设置：

```yaml
draft: true
import_status: needs_review
```

人工确认前不得移动到 `_posts/`，不得设为 `featured: true`。
