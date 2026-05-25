---
layout: default
title: 关于我
permalink: /about/
description: 我做了什么 · 我在想什么 · 怎么找到我
---

<section class="hero">
  <span class="prompt">~/about $ cat me.md</span>
  <h1>关于我</h1>
  <p>这页是我的「数字简历」。不写「在哪上的学」，只写「做了什么 / 在想什么 / 怎么找到我」。</p>
</section>

<section class="about-layout">

  <div>
    <div class="avatar">{{ site.author | slice: 0, 1 | default: 'G' }}</div>
    <p class="mono small subtle" style="margin-top: 0.75rem; text-align: center;">
      // {{ site.github_username | default: 'your_name' }}
    </p>
  </div>

  <div>

<div markdown="1">

你好 👋 我是 **{{ site.author }}**。

工程师 / 写作者 / 折腾爱好者。喜欢用代码做小而有用的东西，喜欢把复杂的事讲清楚。

这个网站是我自己用 Jekyll + 手写 CSS 搭的——**没有评论、没有追踪、没有广告**，就是个干净的角落。

</div>

<!-- 终端块 -->
<div class="terminal">
  <div class="terminal-head">
    <span class="dot r"></span>
    <span class="dot y"></span>
    <span class="dot g"></span>
    <span class="title">~ — zsh</span>
  </div>
  <div class="terminal-body">
    <span class="line"><span class="green">$</span> whoami</span>
    <span class="line gray">{{ site.github_username | default: 'your_name' }}</span>
    <span class="line"><span class="green">$</span> cat ~/.profile</span>
    <span class="line"><span class="cyan">building</span>:&nbsp;&nbsp;小而有用的东西</span>
    <span class="line"><span class="cyan">writing</span>:&nbsp;&nbsp;&nbsp;技术、工具、思考、生活</span>
    <span class="line"><span class="cyan">stack</span>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TypeScript · Python · Rust</span>
    <span class="line"><span class="cyan">contact</span>:&nbsp;&nbsp;{{ site.email }}</span>
    <span class="line"><span class="green">$</span> <span class="yellow">_</span></span>
  </div>
</div>

## 🛠 我在做什么

<div markdown="1">

- **正在做**：[填一句话当前重点]——比如"重构 X 项目"、"在写一本 Y 书"、"做一个 Z 工具"。
- **正在写**：技术文章、工具评测、思考随笔。每月 2-4 篇，发到 [博客]({{ '/' | relative_url }})。
- **正在折腾**：开源工具、独立产品、副业实验。

</div>

## 📦 我做过的项目

<div markdown="1">

我做过的项目都列在 [projects 页]({{ '/projects/' | relative_url }})。挑几个有代表性的简单说说：

- **[项目 A]** — 一句话描述这个项目解决了什么问题。
- **[项目 B]** — 一句话描述这个项目解决了什么问题。
- **[项目 C]** — 一句话描述这个项目解决了什么问题。

</div>

## ⚙️ 技术栈

<div class="info-block">
  <ul class="skill-list">
    <li class="tag">TypeScript</li>
    <li class="tag">Python</li>
    <li class="tag">Rust</li>
    <li class="tag">React</li>
    <li class="tag">Vue</li>
    <li class="tag">Node.js</li>
    <li class="tag">PostgreSQL</li>
    <li class="tag">Docker</li>
    <li class="tag">Linux</li>
    <li class="tag">Git</li>
    <li class="tag">Figma</li>
    <li class="tag">Markdown</li>
  </ul>
</div>

## 💭 我相信什么

<div markdown="1">

- **保持简单** 比想象中难，但值得反复练习。
- **写下来** 是把含糊变清晰的唯一方法。
- **慢慢来**，比较快。
- **工具应该服务于思想**，而不是相反。

</div>

## 📬 怎么找到我

<div markdown="1">

下面这些都能联系到我，我会尽量回复：

- 📧 邮箱：[{{ site.email }}](mailto:{{ site.email }})
- 🐙 GitHub：[github.com/{{ site.github_username }}](https://github.com/{{ site.github_username }})
{% if site.twitter_username and site.twitter_username != 'your_username' %}- 🐦 Twitter：[@{{ site.twitter_username }}](https://twitter.com/{{ site.twitter_username }}){% endif %}
- 📡 RSS：[订阅本站]({{ '/feed.xml' | relative_url }})

</div>

<blockquote>
  「保持好奇，温柔地对待这个世界。」
</blockquote>

  </div>
</section>
