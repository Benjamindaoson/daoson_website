# 笔记系统使用指南

> 这份文档**不会发布到站点**（README.md 已被 `_config.yml` 的 `exclude` 排除，
> 这份文档也不会被 Jekyll 处理）。给自己看的工作流参考。

## 三层结构

| 层 | 目录 | 性质 | 是否公开 |
|---|---|---|---|
| 博客 | `_posts/` | 完成品、有日期、面向陌生读者 | ✅ 公开 |
| 笔记 | `_notes/` | 半成品、网状链接、不断生长 | ✅ 公开 |
| 草稿 | `_drafts/` | 还没想好要不要发的 | ❌ 已 gitignore |
| 日记 | `_daily/` | 私人记录 | ❌ 已 gitignore |

---

## 新建一条笔记

文件路径：`_notes/<slug>.md`（slug 用小写、连字符，不要带日期）

最小模板：

```markdown
---
title: "笔记标题"
status: seedling           # seedling 🌱 / sapling 🌿 / evergreen 🌳
tags: [前端, 工具]
date: 2026-05-26           # 创建日期
updated: 2026-05-26        # 最后更新日期（重要！排序按这个）
description: "一句话摘要，会显示在 /notes/ 列表里"
lang: zh                   # zh 或 en
---

正文。可以用 [[其它笔记 slug]] 互相引用。
```

**front matter 字段说明：**

- `status` —— 成熟度：`seedling`（刚记下）/ `sapling`（在打磨）/ `evergreen`（基本定稿）
- `updated` —— **每次改正文都更新这个日期**，它决定笔记在 `/notes/` 页面的排序
- `lang` —— 不传默认 zh，所以英文笔记必须明确写 `lang: en`

---

## Wiki 链接语法

```markdown
看看 [[esbuild]] 是怎么工作的            ← 链接显示 "esbuild"（用目标的 title）
看看 [[esbuild|Go 写的打包器]]            ← 链接显示 "Go 写的打包器"
看看 [[vite-modern-frontend]]            ← 也能链到 _posts/ 里的博文（去掉日期前缀）
```

- 找得到目标 → 渲染成绿色 wiki 链接
- 找不到目标 → 渲染成红色 broken 链接（提示你"这篇还没写"）

**Backlinks** 是自动的 —— 你不需要手动维护"反向引用"，
只要 A 笔记里有 `[[B]]`，B 笔记页底部就会自动出现 "← Referenced by A"。

---

## 推荐的 Obsidian 设置

1. **把整个 `daoson_website` 文件夹作为 Obsidian 库（vault）打开**
2. Settings → Files & Links：
   - "Use [[Wikilinks]]" → **ON**
   - "New link format" → `Shortest path when possible`
   - "Default location for new attachments" → `Specified folder` → `assets/img/notes`
3. 推荐安装的社区插件：
   - **Templater** —— 自动给新笔记填 front matter
   - **Obsidian Git** —— Cmd+P 一键 commit + push
   - **Paste image rename** —— 截图粘贴时自动重命名
   - **Tag Wrangler** —— 标签查重/重命名

只在你自己的 Obsidian 里看：还可以装 **Dataview** 做笔记内查询、装 **Graph view** 看关系图。
这些都不影响发布到网上的样子。

---

## 本地预览

```bash
bundle install        # 第一次或 Gemfile 改了之后
bundle exec jekyll serve
# 打开 http://localhost:4000/daoson_website/
```

注意：`_plugins/` 下的自定义插件**只在 GitHub Actions 上才会跑**（如果你之前依赖 GitHub Pages 默认构建）。
现在切到 Actions 之后，本地和线上行为一致。

---

## 发布流程

```bash
git add .
git commit -m "notes: add note on X"
git push
```

`.github/workflows/deploy.yml` 自动触发，约 60-90 秒后线上更新。

**第一次推送之前**，要在 GitHub 仓库 Settings → Pages 把 "Source" 从 "Deploy from branch" 改成 **"GitHub Actions"**。
这是切换构建方式的关键一步，不改的话 Actions 跑了但 Pages 不会用它的产物。

---

## 工作流建议

**捕捉**（任何时候）：手机或电脑 Obsidian，新建到 `_drafts/inbox-<日期>.md`，先写两句。

**整理**（每周一次）：把 inbox 里的内容拆成原子笔记，移到 `_notes/<slug>.md`，
加 front matter，标 `seedling`。能想到关联就用 `[[]]` 链上。

**升级**：当你回头看一条 seedling，发现已经能自洽成段了 → 改成 `sapling`；
当你反复修改了几次都没大动 → 改成 `evergreen`。

**长出博客**：当几条相关的 notes 形成完整论述 → 在 `_posts/` 写一篇博文，
正文里大量用 `[[]]` 链到笔记。读者读完博客可以顺着链接挖到原始思考过程。

这就是「博客 + 花园」的完整循环。
