# 站点审计报告

审计日期：2026-07-19

## 结论先行

这个站点**不需要迁移到 Next.js** 才能解决当前问题。  
它的 Jekyll 架构、内容系统、SEO、RSS、sitemap、Pagefind、双语机制和自定义插件已经具备继续扩展的基础。当前真正短板是：

1. 招聘导向不够明确。
2. 项目案例不够结构化。
3. 简历入口缺失。
4. 首页更像“研究型数字花园”，还不像“求职作品集入口”。

## 项目现状

- 技术栈：Jekyll + Liquid + Markdown + 手写 CSS + 原生 JavaScript
- 搜索：Pagefind
- 部署：GitHub Pages + GitHub Actions
- 构建：自定义 Ruby 插件 + Actions 里生成 Pagefind
- 语言：中英双语
- 内容类型：文章、笔记、TIL、项目数据、教学索引、外部发布索引

### 运行验证

- `node --check assets/js/main.js` 通过
- `ruby scripts/check_content_schema.rb` 通过
- `C:\Ruby34-x64\bin\jekyll.bat build` 通过
- `powershell -ExecutionPolicy Bypass -File scripts/build_pagefind.ps1` 通过（临时补 PATH 后）
- 本地浏览器检查通过：首页、About、Projects、Notes、中文文章、英文文章、404、移动端首页

`bundle exec jekyll build` 在当前 PowerShell 会话里失败，原因是 `bundle` 未进入 PATH；但同一 Ruby 安装里的 `jekyll.bat build` 可正常构建。

## 项目结构说明表

| 目录或文件 | 作用 | 是否仍在使用 | 是否需要保留 | 是否存在问题 | 重构或迁移建议 |
|---|---|---:|---:|---|---|
| `_config.yml` | 站点配置、collections、双语、插件、排除规则 | 是 | 是 | 结构清楚，但依赖自定义插件和 GitHub Pages baseurl | 保留，继续扩展 collections 和 SEO 配置 |
| `index.html` | 首页，当前品牌入口 | 是 | 是 | 研究型定位强，求职 CTA 不够明确 | 作为首页核心重构对象 |
| `about.md` | 关于页 | 是 | 是 | 不是简历页，缺少岗位目标和简历下载入口 | 改成“关于 + 能力 + 简历入口” |
| `projects.html` | 项目 / Labs 入口 | 是 | 是 | 现在只有 1 个真实项目卡，缺少案例化详情 | 改成项目案例系统入口 |
| `notes.html` | 笔记索引 | 是 | 是 | 内容量少，但结构可用 | 保留，继续扩展 |
| `til.html` | TIL 索引 | 是 | 是 | 目前只有 3 条 | 保留，低成本扩展 |
| `teaching.html` | 教学 / 学习路径入口 | 是 | 是 | 有价值，但更像主题索引，不是求职核心页 | 保留为内容支线 |
| `teaching-rl.html` | RL 专题索引 | 是 | 是 | 当前还是目录页，不是内容页 | 保留，后续补内容 |
| `colophon.md` | 站点说明 / 技术说明 | 是 | 是 | 很有价值，能证明工程能力 | 保留，可放到更低优先级导航 |
| `elsewhere.md` | 外部发布索引页 | 是 | 是 | 数据为空时会显得空 | 保留，先填真实条目 |
| `archive.html` | 文章归档 | 是 | 是 | 正常 | 保留 |
| `tags.html` | 标签页 | 是 | 是 | 正常 | 保留 |
| `now.md` | 近况页 | 是 | 是 | 正常，但偏研究叙述 | 保留，适合放工作状态 |
| `uses.md` | 工具栈页 | 是 | 是 | 已去掉“待确认”段落，信息更诚实 | 保留，后续补真实工具 |
| `404.html` | 404 页面 | 是 | 是 | 正常 | 保留 |
| `_posts/` | 长文章 | 是 | 是 | 10 篇里只有 2 篇是英文章对，AI/Agent 相关内容偏少 | 保留，补项目案例型文章 |
| `_notes/` | 数字花园笔记 | 是 | 是 | 仅 3 篇，量少但结构已通 | 保留，继续增长 |
| `_til/` | 今日所学 | 是 | 是 | 仅 3 条，数量偏少 | 保留，低成本扩展 |
| `_data/projects.yml` | 项目数据源 | 是 | 是 | 目前只有 1 个真实项目，案例颗粒太粗 | 扩展为结构化案例数据 |
| `_data/elsewhere.yml` | 外部发布数据源 | 是 | 是 | 当前为空 | 保留，只有真实内容才添加 |
| `_layouts/*.html` | 页面模板 | 是 | 是 | 复用良好 | 保留并做局部优化 |
| `_includes/*.html` | 组件片段 | 是 | 是 | 组件体系已经成型 | 保留，继续抽象项目卡/CTA |
| `_plugins/*.rb` | wikilink、backlinks、OG 图生成 | 是 | 是 | 是该站点最有辨识度的工程资产之一 | 保留，不建议迁移到更重的前端栈 |
| `assets/css/style.css` | 全站样式 | 是 | 是 | 单文件较大，但系统性还可以 | 保留，做局部重构而不是全删 |
| `assets/js/main.js` | 语言切换、搜索、目录、分享、侧栏 | 是 | 是 | 功能集中，逻辑偏长 | 保留，做小步整理 |
| `assets/img/` | 头像、封面、文章图 | 是 | 是 | 数量少，偏够用 | 保留，补更有信息量的项目图 |
| `.github/workflows/deploy.yml` | GitHub Pages 部署 | 是 | 是 | 正常，包含 Pagefind 和 OG PNG 生成 | 保留 |
| `scripts/` | 发布前检查、Pagefind 构建 | 是 | 是 | `bundle` 依赖 PATH，当前 PowerShell 里需要补 PATH | 保留，建议让脚本更稳一点 |
| `feed-zh.xml` / `feed-en.xml` | 双语 RSS | 是 | 是 | 正常 | 保留 |
| `site.webmanifest` | PWA manifest | 是 | 是 | 构建后为纯 JSON，已验证 | 保留 |
| `robots.txt` | 搜索引擎入口声明 | 是 | 是 | 正常 | 保留 |
| `_site/` | 构建产物 | 否 | 否 | 不应提交 | 继续排除出版本管理 |

## 内容盘点

### 数量

- 文章：10
- 笔记：3
- TIL：3
- 真实项目：1
- 教学索引页：2
- 外部发布：0
- 图片资源：4 个正文/封面图，外加 favicon / manifest 图标
- 生成的 HTML 页面：31
- 生成文件总数：46

### 语言分布

- 中文文章：8
- 英文文章：2
- 笔记：全中文
- TIL：全中文
- 首页和关键页：中英双语 UI

### 内容判断

- 文章主题集中在前端、工程思考、Vite、代码可读性、个人工作流、数字员工系统
- AI / Agent 相关内容存在，但还不够“项目案例化”
- 目前没有独立简历页
- 目前没有专门的“项目案例详情页”集合

### 站内引用

- `[[wikilink]]` 共有 13 次
- 唯一目标 6 个
- 这说明数字花园已经有连接关系，但密度还不高

## 产品定位审计

### 30 秒测试

现在的首页能让招聘方快速看出：

- 你在研究 AI Agent、可靠系统、数字员工
- 你有一套内容系统和工程化站点
- 你在公开写作和持续构建

但还看不出：

- 你要投的岗位非常明确是什么
- 你最强的 3-5 个项目是什么
- 每个项目的职责、架构、难点、结果是什么
- 为什么应该立刻约面试

### 结论

现在更像“研究型个人网站 + 数字花园”，还不是“高级 AI 工程师求职作品集”。

## 设计与 UX 审计

### 已经做对的地方

- 统一的终端风格和浅色编辑感视觉系统
- 首页、项目页、笔记页、文章页的组件语言一致
- 桌面端和移动端都能正常访问
- 字体层级、留白和卡片统一性尚可
- Pagefind 搜索、双语切换、侧栏、TOC、分享按钮都已存在

### 仍然不足

- 首页首屏还不够直接面向招聘场景
- 项目区目前内容太少，案例感不够
- 关于页不是简历页
- 手机端虽然能用，但信息密度高，首屏目标不够聚焦

### 浏览器验证结果

- 首页：通过
- About：通过
- Projects：通过
- Notes：通过
- 中文文章：通过
- 英文文章：通过
- 404：通过
- 移动端首页：通过
- 搜索弹窗：通过，搜索 “Vite” 可返回 11 个结果

## 技术质量审计

### 总评

Jekyll 架构本身没有拖后腿，反而是当前最适合继续积累内容的底座。

### 评分

| 项目 | 评分(5分制) | 说明 |
|---|---:|---|
| 项目结构 | 4 | 分层清楚，collections 和 includes 已成体系 |
| 代码可读性 | 3 | `main.js` 和 `style.css` 偏长，仍可继续拆 |
| 组件复用 | 4 | project/post/note 组件复用已经到位 |
| 内容与展示层分离 | 4 | 数据、模板、内容区分明显 |
| 配置管理 | 4 | `_config.yml`、数据文件、workflow 配置清晰 |
| 构建稳定性 | 4 | Jekyll build、schema check、Pagefind 都能跑通 |
| 部署稳定性 | 4 | GitHub Actions + Pages 路线明确 |
| 响应式设计 | 4 | 桌面和移动端都可用 |
| 浏览器兼容性 | 4 | 原生 HTML/CSS/JS 路线很稳 |
| 性能 | 3 | 轻量，但首页内容多，仍有优化空间 |
| 图片优化 | 3 | 图片数量少，尚可，但项目图证据不足 |
| SEO | 4 | `jekyll-seo-tag`、sitemap、robots、canonical 基础都在 |
| Open Graph | 4 | OG 图生成链路已经存在 |
| sitemap | 5 | 已启用并生成 |
| robots.txt | 5 | 已启用并指向 sitemap |
| RSS | 5 | 中英文双 feed 已可用 |
| canonical URL | 4 | 依赖 SEO 插件和 baseurl 配置 |
| 结构化数据 | 4 | Person schema 已声明，但没有乱编履历 |
| 404 页面 | 4 | 可用，且带搜索入口 |
| 安全性 | 4 | 没有明显敏感配置泄露；外链和邮箱是公开信息 |
| 无障碍 | 3 | 有 skip link、aria、按钮和键盘逻辑，但还可继续打磨 |
| 可测试性 | 3 | 有 schema check 和构建命令，但缺少自动化页面测试 |
| 可维护性 | 4 | 现在已经能维护，不需要推倒重来 |
| 后续扩展成本 | 4 | 继续扩展内容成本低，重建成本高 |

## 关键风险

1. 没有简历页
2. 没有结构化项目案例页
3. 首页没有直接对准招聘目标
4. 项目数量太少，案例颗粒不够
5. 当前工作树有未提交改动，说明基线并不干净

## 关键证据

- `_config.yml` 已启用 `jekyll-feed`、`jekyll-seo-tag`、`jekyll-sitemap`、`jekyll-paginate`
- `_includes/head.html` 已输出 RSS、hreflang、SEO 和 manifest
- `.github/workflows/deploy.yml` 已在部署里生成 Pagefind 和 OG PNG
- 浏览器实测首页、About、Projects、Notes、中文文章、英文文章、404、移动端首页都可打开
- `site.webmanifest` 在生成物里是有效 JSON
- `robots.txt`、`sitemap.xml`、`feed.xml`、`feed-zh.xml`、`feed-en.xml` 都已生成

