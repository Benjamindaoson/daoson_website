---
layout: default
title: Colophon
permalink: /colophon/
description: 这个网站本身的元信息 —— 怎么搭的、用了什么、为什么这样选。
---

<section class="hero">
  <span class="prompt">~/colophon $ stat site</span>
  <h1>
    <span class="i18n i18n-zh">站点本身</span>
    <span class="i18n i18n-en">Colophon</span>
  </h1>
  <p>
    <span class="i18n i18n-zh">这个网站是怎么搭的、为什么这样选。</span>
    <span class="i18n i18n-en">How this site is built, and why I chose what I did.</span>
  </p>
</section>

<div markdown="1" class="colophon-content">

## <span class="i18n i18n-zh">🧱 技术栈</span><span class="i18n i18n-en">🧱 Stack</span>

- **静态站生成器**：[Jekyll](https://jekyllrb.com) 4.3
- **托管**：GitHub Pages
- **构建**：GitHub Actions（用自定义 Ruby plugin，所以没用 Pages 默认构建）
- **域名**：暂用 `*.github.io`（迁移到自定义域名待定）
- **CSS**：完全手写，无框架。约 50KB
- **JS**：原生 JavaScript，无框架。约 15KB
- **Markdown 引擎**：kramdown + GFM 模式
- **代码高亮**：Rouge
- **数学公式**：KaTeX
- **搜索**：Pagefind（站内全文）+ 简易客户端过滤（首页）

## <span class="i18n i18n-zh">🌱 内容结构</span><span class="i18n i18n-en">🌱 Content structure</span>

站点分三层内容，每层有不同的"完成度"标准：

- **[博客 / Posts]({{ '/' | relative_url }})** —— 完成品。有结构、有论证、定稿后基本不动
- **[笔记 / Notes]({{ '/notes/' | relative_url }})** —— 数字花园。原子化、互相 wiki-link、随时间生长。三种成熟度：🌱 新芽 / 🌿 成长中 / 🌳 常青
- **[TIL]({{ '/til/' | relative_url }})** —— 每天学到的一个小东西。短、独立、可索引

笔记之间用 `[[wiki-link]]` 互相引用，自动生成反向引用（backlinks）。

## <span class="i18n i18n-zh">🌐 双语</span><span class="i18n i18n-en">🌐 Bilingual</span>

文章通过 `lang` 字段标明语言，互译版本共享 `translation_key`：

- 切换语言时列表自动过滤
- 有翻译时文章顶部显示跳转链接
- `<head>` 自动注入 `hreflang` 让 Google 关联各语言版本
- 提供独立的 [中文 RSS]({{ '/feed-zh.xml' | relative_url }}) 和 [English RSS]({{ '/feed-en.xml' | relative_url }})

## <span class="i18n i18n-zh">🎨 设计选择</span><span class="i18n i18n-en">🎨 Design choices</span>

- **暗色优先**：背景 `#0d1117`，跟 GitHub 暗色一致 —— 工程师视觉熟悉
- **品牌色**：绿 `#3fb950`（终端提示符）+ 蓝 `#58a6ff`（链接、强调）
- **字体**：等宽字体用于代码和元数据；正文用系统字体栈避免远程加载
- **页面宽度**：正文 ≤ 720px，行长保持在 65-75 字
- **无评论**：避免噪音 + 隐私 + 维护成本
- **无追踪**：不挂 Google Analytics、不挂任何 cookies

## <span class="i18n i18n-zh">📜 隐私</span><span class="i18n i18n-en">📜 Privacy</span>

<div markdown="1">

这个站**不放**：

- ❌ 任何分析脚本（Google Analytics、Plausible、Umami……都没装）
- ❌ Cookie
- ❌ 第三方追踪
- ❌ 广告

你访问这个站，**没有任何数据被记录、汇总、出售**。
唯一会有日志的是 GitHub Pages 自己的 CDN，那个我也看不到。

</div>

## <span class="i18n i18n-zh">📂 源代码</span><span class="i18n i18n-en">📂 Source code</span>

整个站点（包括所有博文、笔记、模板）都在 [GitHub 上开源](https://github.com/{{ site.github_username }}/daoson_website)。
欢迎 fork 来搭自己的；如果你发现 bug 或想加功能，pull request 也欢迎。

License：内容（博文 / 笔记 / TIL）CC BY-NC-SA 4.0；代码（模板 / CSS / JS / plugin）MIT。

## <span class="i18n i18n-zh">🙏 致谢</span><span class="i18n i18n-en">🙏 Acknowledgments</span>

灵感和借鉴来自这些站点：

- [Gwern.net](https://gwern.net) — sidenotes、链接归档、长文工程
- [Maggie Appleton](https://maggieappleton.com) — 数字花园概念
- [Andy Matuschak's notes](https://notes.andymatuschak.org) — 常青笔记理论
- [Simon Willison's TIL](https://til.simonwillison.net) — TIL 体系
- [Tufte CSS](https://edwardtufte.github.io/tufte-css/) — 排版基底

</div>
