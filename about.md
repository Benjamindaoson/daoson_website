---
layout: default
title: 关于
permalink: /about/
description: 我是谁 · 我在想什么 · 怎么找到我
---

<section class="hero">
  <span class="prompt">~/about $ cat me.md</span>
  <h1>
    <span class="i18n i18n-zh">关于</span>
    <span class="i18n i18n-en">About</span>
  </h1>
  <p>
    <span class="i18n i18n-zh">不写「在哪上的学」，只写「在做什么 · 在想什么 · 怎么找到我」。</span>
    <span class="i18n i18n-en">No CV. Just what I'm building, what I'm thinking, and how to reach me.</span>
  </p>
</section>

<section class="about-layout">

  <div>
    <div class="avatar avatar-photo">
      <img src="{{ '/assets/img/avatar.jpg' | relative_url }}"
           alt="{{ site.author }}"
           onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'{{ site.author | slice: 0, 1 }}',className:'avatar-fallback'}))">
    </div>
    <p class="mono small subtle" style="margin-top: 0.75rem; text-align: center;">
      // {{ site.github_username }}
    </p>
  </div>

  <div>

<div markdown="1">

你好 👋 我是 **{{ site.author }}**。

工程师 / agent 系统折腾者。**我目前在做 multi-agent system 和数字员工系统** ——
把 LLM 从"会聊天的工具"推到"能独立完成工作的同事"。
我相信接下来 3-5 年里，能把这条曲线做对的人会塑造软件的下一种形态。

这个博客是我记录沿途思考的地方：agent 架构、LLM 工程实践、读到的好书、踩过的坑。
中英双语写作，因为这个领域的好东西分散在两种语言里，
而我想做一个能让两边读者都看见对方思考的小桥梁。

网站本身用 Jekyll + 手写 CSS 搭 —— **没有评论、没有追踪、没有广告**，
就是个干净的角落。文章和源代码都在 [GitHub](https://github.com/{{ site.github_username }}/daoson_website) 上公开。

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
    <span class="line gray">{{ site.author }}</span>
    <span class="line"><span class="green">$</span> cat ~/.profile</span>
    <span class="line"><span class="cyan">building</span>:&nbsp;&nbsp;<span class="i18n i18n-zh">小而有用的东西</span><span class="i18n i18n-en">small useful things</span></span>
    <span class="line"><span class="cyan">writing</span>:&nbsp;&nbsp;&nbsp;<span class="i18n i18n-zh">技术 · 工具 · 思考 · 生活</span><span class="i18n i18n-en">tech · tools · thinking · life</span></span>
    <span class="line"><span class="cyan">stack</span>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TypeScript · Python · Rust</span>
    <span class="line"><span class="cyan">contact</span>:&nbsp;&nbsp;{{ site.email }}</span>
    <span class="line"><span class="green">$</span> <span class="yellow">_</span></span>
  </div>
</div>

## <span class="i18n i18n-zh">🛠 在做什么</span><span class="i18n i18n-en">🛠 Currently</span>

<div markdown="1">

- **<span class="i18n i18n-zh">在做</span><span class="i18n i18n-en">Building</span>**：<span class="i18n i18n-zh">multi-agent system / 数字员工系统</span><span class="i18n i18n-en">multi-agent systems / digital employees</span>
- **<span class="i18n i18n-zh">在写</span><span class="i18n i18n-en">Writing</span>**：<span class="i18n i18n-zh">agent 架构 · LLM 工程 · 读书与思考</span><span class="i18n i18n-en">agent architectures · LLM engineering · reading notes</span>
- **<span class="i18n i18n-zh">在读</span><span class="i18n i18n-en">Reading</span>**：<span class="i18n i18n-zh">详见 <a href="{{ '/now/' | relative_url }}">/now</a> 页面，每月更新</span><span class="i18n i18n-en">see <a href="{{ '/now/' | relative_url }}">/now</a>, updated monthly</span>

</div>

## <span class="i18n i18n-zh">📦 项目</span><span class="i18n i18n-en">📦 Projects</span>

<div markdown="1">

<span class="i18n i18n-zh">我做过的东西都在 [projects 页]({{ '/projects/' | relative_url }})。源代码在 [GitHub](https://github.com/{{ site.github_username }})。</span><span class="i18n i18n-en">See [projects]({{ '/projects/' | relative_url }}) for what I've built. Source on [GitHub](https://github.com/{{ site.github_username }}).</span>

</div>

## <span class="i18n i18n-zh">💭 我相信什么</span><span class="i18n i18n-en">💭 What I believe</span>

<div markdown="1">

- <span class="i18n i18n-zh">**保持简单** 比想象中难，但值得反复练习。</span><span class="i18n i18n-en">**Simplicity** is harder than it looks, and worth practicing.</span>
- <span class="i18n i18n-zh">**写下来** 是把含糊变清晰的唯一方法。</span><span class="i18n i18n-en">**Writing** is the only way to turn vague into clear.</span>
- <span class="i18n i18n-zh">**慢慢来**，比较快。</span><span class="i18n i18n-en">**Slow** is fast.</span>
- <span class="i18n i18n-zh">**工具应该服务于思想**，而不是相反。</span><span class="i18n i18n-en">**Tools should serve thinking**, not the other way around.</span>

</div>

## <span class="i18n i18n-zh">📬 联系</span><span class="i18n i18n-en">📬 Get in touch</span>

<div markdown="1">

<span class="i18n i18n-zh">下面这些都能找到我，我会尽量回复：</span><span class="i18n i18n-en">Any of these work — I try to reply:</span>

- 📧 <span class="i18n i18n-zh">邮箱</span><span class="i18n i18n-en">Email</span>：[{{ site.email }}](mailto:{{ site.email }})
- 🐙 GitHub：[github.com/{{ site.github_username }}](https://github.com/{{ site.github_username }})
{% if site.twitter_username and site.twitter_username != '' %}- 🐦 Twitter：[@{{ site.twitter_username }}](https://twitter.com/{{ site.twitter_username }})
{% endif %}- 📡 RSS：[{{ '/feed.xml' | relative_url }}]({{ '/feed.xml' | relative_url }})

</div>

<blockquote>
  <span class="i18n i18n-zh">「保持好奇，温柔地对待这个世界。」</span>
  <span class="i18n i18n-en">"Stay curious. Be gentle to the world."</span>
</blockquote>

  </div>
</section>
