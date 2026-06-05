# Daoson Website

这是 Benjamin Daoson 的个人品牌数字花园，使用 Jekyll、Liquid、Markdown、手写 CSS 和原生 JavaScript 构建，并通过 GitHub Pages 发布。

这个站点不是通用博客模板。它的长期目标是清晰、克制、可信地记录 AI、编程、产品思考、个人系统和真实构建过程。

## 项目结构

```text
daoson_website/
├── _config.yml              # Jekyll 站点配置
├── Gemfile                  # Ruby 依赖
├── index.html               # 首页 / 个人品牌入口
├── about.md                 # 关于 / 判断力页面
├── projects.html            # 构建记录页面
├── now.md                   # 近况页面
├── uses.md                  # 工具栈页面
├── elsewhere.md             # 外部发布索引
├── notes.html               # 笔记索引
├── til.html                 # 今日所得索引
├── tags.html                # 标签聚合页
├── 404.html
├── site.webmanifest         # Web App manifest，必须输出纯 JSON
├── robots.txt               # 搜索引擎入口
│
├── _layouts/
│   ├── default.html         # 基础页面模板
│   ├── post.html            # 文章详情模板
│   ├── note.html            # 笔记详情模板
│   └── til.html             # 今日所得详情模板
│
├── _includes/
│   ├── head.html            # head、SEO、结构化数据
│   ├── sidebar.html         # 侧边栏导航
│   ├── footer.html
│   ├── post-card.html       # 文章卡片
│   ├── project-card.html    # 项目卡片
│   ├── project-status.html  # 项目状态徽章
│   ├── translation-link.html
│   └── backlinks.html
│
├── _posts/                  # 长文章
├── _notes/                  # 数字花园笔记
├── _til/                    # 今日所得
├── _data/
│   ├── projects.yml         # 构建记录数据
│   └── elsewhere.yml        # 外部发布索引数据
├── _plugins/                # wiki 链接、反向链接、OG 图生成
├── assets/
│   ├── css/style.css        # 主样式
│   ├── js/main.js           # 全局交互
│   └── img/                 # 图片资源
├── scripts/
│   ├── check.ps1             # 发布前统一检查入口
│   ├── build_pagefind.ps1    # Windows 本地 Pagefind 构建入口
│   └── check_content_schema.rb
├── CONTENT_SCHEMA.md        # 内容字段、真实性和语言规则
├── AGENTS.md                # Codex 项目规则，不发布到站点产物
└── README.md
```

## 本地开发

安装依赖：

```powershell
bundle install
```

启动本地预览：

```powershell
bundle exec jekyll serve
```

项目仓库模式下，常用预览地址是：

```text
http://localhost:4000/daoson_website/
```

## Pagefind 本地预览

普通 `jekyll serve` 不会自动生成 Pagefind 搜索索引。需要本地验证全站搜索时，先构建站点并生成索引：

```powershell
powershell -ExecutionPolicy Bypass -File scripts/build_pagefind.ps1
bundle exec jekyll serve --skip-initial-build
```

这个脚本会使用项目内 `.tmp-npm-cache/` 作为 npm 临时缓存，避免 Windows 用户目录路径或全局 `_npx` 半成品缓存导致 `npx pagefind` 卡住。

线上 GitHub Actions 会在部署时自动运行 Pagefind，并检查：

```text
_site/pagefind/pagefind-ui.js
_site/pagefind/pagefind-ui.css
```

## 发布前检查

每次修改后优先运行统一入口：

```powershell
powershell -ExecutionPolicy Bypass -File scripts/check.ps1
```

脚本内部会依次运行：

```powershell
node --check assets/js/main.js
ruby scripts/check_content_schema.rb
bundle exec jekyll build
git diff --check
git status --short
```

如果本机没有可用的 `node` 命令，可以使用 Codex runtime 中的 Node.js 路径执行同样检查。

Pagefind 生成不放进默认检查：搜索索引只在需要验证搜索时单独执行，避免每轮普通内容或样式修改都触发 npm 下载和索引构建。

## 内容维护规则

完整字段规范见：

```text
CONTENT_SCHEMA.md
```

核心原则：

- 中文版本保持中文，英文版本保持英文。
- 不编造学历、职位、公司、客户、用户数、证书、奖项或项目成果。
- 项目可以是实验，但必须写清楚状态、公开边界和下一步。
- 外部发布只做索引，不爬取、不复制全文、不绕过平台限制。
- 少但真实，优先于多但虚。

## 写一篇文章

在 `_posts/` 中新建 Markdown 文件，文件名格式：

```text
YYYY-MM-DD-title.md
```

基础 front matter：

```yaml
---
title: "文章标题"
date: 2026-06-01 10:00:00 +0800
tags: [AI, engineering]
description: "一句话说明这篇文章解决什么问题。"
lang: zh
---
```

英文文章使用 `.en.md` 后缀，并设置：

```yaml
lang: en
translation_key: stable-shared-key
```

## 维护项目数据

项目数据在：

```text
_data/projects.yml
```

新增项目时必须至少包含：

```yaml
- name_zh: "项目名"
  name_en: "Project name"
  description_zh: "一句话说明这个项目想解决什么问题。"
  description_en: "One sentence describing the problem."
  status: active
  category: ai
  year: 2026
```

状态只允许：

```text
active
prototype
learning
archived
```

如果项目还没有公开仓库或演示，要明确写 `public_boundary_zh` 和 `public_boundary_en`。

## 维护外部发布索引

外部发布数据在：

```text
_data/elsewhere.yml
```

没有真实数据时保持：

```yaml
[]
```

有真实外部链接后再添加：

```yaml
- title: "外部发布标题"
  platform: "YouTube"
  date: 2026-06-01
  type: video
  summary: "为本站写的一句话摘要，不复制平台正文。"
  url: "https://..."
  tags: ["AI", "frontend"]
  language: "zh"
```

## 不应提交

以下文件或目录是本地环境或构建产物，不应提交：

```text
.bundle/
.jekyll-cache/
.tmp-npm-cache/
Gemfile.lock
_site/
```

`AGENTS.md`、`CONTENT_SCHEMA.md` 和 `README.md` 应保留在源码仓库中，但通过 `_config.yml` 的 `exclude` 防止发布到网站产物。

## 当前技术边界

保留现有 Jekyll 技术栈：

- Jekyll / Liquid / Markdown
- 手写 CSS
- 原生 JavaScript
- Pagefind 搜索
- GitHub Pages + GitHub Actions

不要为了视觉效果引入复杂前端框架或动画库。这个网站的高级感应该来自结构、文字、节奏、真实性和稳定体验。
