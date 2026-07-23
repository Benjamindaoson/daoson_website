# 实施计划

目标：把当前站点升级成一个**能尽快用于求职**的个人品牌入口，同时保留 Jekyll 内容体系。

## Phase 0：备份与基线确认

### 目标

- 锁定当前可运行状态
- 确认哪些是现有未提交改动
- 固定部署基线

### 修改范围

- 不改业务页面
- 只做快照和记录

### 涉及文件

- `git status`
- `docs/site-audit.md`
- `docs/rebuild-decision.md`

### 预计工作量

- 0.5 天

### 验收标准

- 已记录当前状态
- 已记录构建和浏览器验证结果
- 已记录不提交的目录：`.bundle/`、`.jekyll-cache/`、`_site/`、`Gemfile.lock`

### 风险

- 现有工作树里已经有未提交改动，后续不能误覆盖

### 依赖

- 无

## Phase 1：首页和信息架构

### 目标

- 首页 30 秒内说清楚你是谁、做什么、为什么值得看
- 明确目标岗位
- 把最强内容提到首屏和前两屏

### 修改范围

- 首页 hero
- 导航文案
- About 页摘要
- Contact CTA
- Resume 入口

### 涉及文件

- `index.html`
- `about.md`
- `_includes/sidebar.html`
- `_includes/footer.html`
- `uses.md`
- `now.md`

### 预计工作量

- 1-2 天

### 验收标准

- 首页首屏明确写出目标岗位或能力定位
- 有 Resume / CV 入口
- GitHub、Email、项目入口清晰可见
- 移动端首屏不拥挤

### 风险

- 文案如果太泛，会继续像博客

### 依赖

- 依赖 Phase 0

## Phase 2：项目案例系统

### 目标

- 把 `Labs` 从 build log 变成 case study
- 每个项目都能说清楚背景、职责、架构、技术选型、难点、结果

### 修改范围

- `_data/projects.yml`
- `projects.html`
- 可能新增项目详情页集合
- 项目截图 / 演示链接

### 涉及文件

- `_data/projects.yml`
- `projects.html`
- `_includes/project-card.html`
- 可能新增 `_projects/` 或 `projects/*.md`

### 预计工作量

- 2-4 天

### 验收标准

- 至少 3-5 个最强项目可展示
- 每个项目都有：问题、职责、架构、结果、证据
- 项目页可以直接用于面试分享

### 风险

- 真实材料不足时不要编造

### 依赖

- 依赖 Phase 1

## Phase 3：文章和笔记系统

### 目标

- 保留数字花园
- 让文章和笔记成为“能力证据”，而不是纯阅读记录

### 修改范围

- `archive.html`
- `notes.html`
- `til.html`
- `_posts/`
- `_notes/`
- `_til/`

### 涉及文件

- `archive.html`
- `notes.html`
- `til.html`
- `_posts/*.md`
- `_notes/*.md`
- `_til/*.md`

### 预计工作量

- 1-2 天（结构调整）
- 持续内容更新另算

### 验收标准

- Featured Writing 只保留最能代表判断力的文章
- Notes 和 TIL 仍然可增长，但不抢主角

### 风险

- 内容太多会重新把首页压回“博客感”

### 依赖

- 依赖 Phase 1

## Phase 4：视觉系统和响应式

### 目标

- 保持终端感和数字花园感
- 但更像高级工程作品集，而不是模板站

### 修改范围

- `assets/css/style.css`
- 必要时少量 `assets/js/main.js`
- 首页、项目页、About 页、Resume 页的布局微调

### 涉及文件

- `assets/css/style.css`
- `assets/js/main.js`
- `index.html`
- `projects.html`
- `about.md`
- 可能新增 `resume.md`

### 预计工作量

- 2-4 天

### 验收标准

- 桌面端、移动端、文章页、项目页都不乱
- 卡片、按钮、标签风格统一
- 首页首屏更聚焦

### 风险

- 视觉改动过猛会破坏当前站点的克制感

### 依赖

- 依赖 Phase 1 / 2

## Phase 5：SEO、性能和无障碍

### 目标

- 保持搜索引擎可读
- 保持多语言索引
- 保持可访问性

### 修改范围

- `_includes/head.html`
- `_config.yml`
- `robots.txt`
- `site.webmanifest`
- 文章 / 页面 front matter

### 涉及文件

- `_includes/head.html`
- `_config.yml`
- `robots.txt`
- `site.webmanifest`
- `feed-zh.xml`
- `feed-en.xml`

### 预计工作量

- 1-2 天

### 验收标准

- canonical、OG、sitemap、RSS、hreflang 都正确
- 键盘操作、skip link、按钮语义正常

### 风险

- 过度优化会增加维护复杂度

### 依赖

- 依赖 Phase 1

## Phase 6：部署、测试和上线

### 目标

- 让求职版可稳定发布
- 确保本地和 GitHub Pages 行为一致

### 修改范围

- `.github/workflows/deploy.yml`
- `scripts/check.ps1`
- `scripts/build_pagefind.ps1`
- 必要时补文档

### 涉及文件

- `.github/workflows/deploy.yml`
- `scripts/check.ps1`
- `scripts/build_pagefind.ps1`
- `README.md`

### 预计工作量

- 0.5-1 天

### 验收标准

- 本地 build 通过
- Pagefind 通过
- 浏览器检查通过
- GitHub Pages 发布通过

### 风险

- Windows 机器上的 PATH / Bundler 环境差异

### 依赖

- 依赖前面所有阶段

## 最小上线版本

只保留这些内容：

1. 清晰的首页定位
2. 3-5 个最强项目
3. 关于我
4. 技术能力
5. 简历入口
6. GitHub 和邮箱
7. 移动端适配
8. 基础 SEO
9. 可正常部署

### 最小上线版本建议保留的页面

- `index.html`
- `about.md`
- `projects.html`
- `now.md`
- `uses.md`
- `resume.md`（建议新增）
- `archive.html`
- `notes.html`
- `til.html`

## 回滚方案

1. 保留当前 Jekyll 架构，不引入大规模框架迁移
2. 每个 Phase 只改一类页面
3. 每次改动后都保留构建和浏览器验证结果
4. 如新视觉不成立，退回当前组件体系，只保留文案和信息架构改动

