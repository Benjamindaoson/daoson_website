---
layout: default
title: Now
permalink: /now/
description: 我当前在做什么、读什么、想什么。每月更新一次。
---

<section class="hero">
  <span class="prompt">~/now $ date && cat current.md</span>
  <h1>
    <span class="i18n i18n-zh">在做什么</span>
    <span class="i18n i18n-en">What I'm doing now</span>
  </h1>
  <p>
    <span class="i18n i18n-zh">这是一个 <a href="https://nownownow.com/about" target="_blank" rel="noopener">「Now 页」</a>。
    跟博客时间线不同，它只显示<strong>此刻</strong>。每隔一两个月我会手动更新一次。</span>
    <span class="i18n i18n-en">This is a <a href="https://nownownow.com/about" target="_blank" rel="noopener">"Now page"</a>.
    Unlike the blog timeline, it shows only <strong>right now</strong>. I update it manually every month or two.</span>
  </p>
</section>

<div markdown="1" class="now-content">

<p class="mono small subtle">
<span class="i18n i18n-zh">// 最近更新：</span>
<span class="i18n i18n-en">// Last updated: </span>
<strong>{{ site.time | date: "%Y-%m-%d" }}</strong>
</p>

## <span class="i18n i18n-zh">🛠 工作</span><span class="i18n i18n-en">🛠 Working on</span>

> TODO：一两句话当前的工作重点。比如"在重构 X 项目的认证模块"、"在写一本关于 Y 的小册子"。

## <span class="i18n i18n-zh">📚 在读</span><span class="i18n i18n-en">📚 Reading</span>

> TODO：当前在读的 1-3 本书。可以加一句话感想。

- *书名 1* — 一句话评价
- *书名 2* — 一句话评价

## <span class="i18n i18n-zh">🧠 在想</span><span class="i18n i18n-en">🧠 Thinking about</span>

> TODO：几个反复出现在脑子里的问题或主题。可以很模糊。

## <span class="i18n i18n-zh">🎯 接下来 90 天</span><span class="i18n i18n-en">🎯 Next 90 days</span>

> TODO：3 个你想完成的具体目标。比如"写完 X 系列博文"、"把 Y 项目发 v1.0"、"读完 Z"。

1. 目标 1
2. 目标 2
3. 目标 3

---

<p class="mono small subtle">
<span class="i18n i18n-zh">「Now 页」灵感来自 <a href="https://sive.rs/now" target="_blank" rel="noopener">Derek Sivers</a>。这是一种比社交媒体诚实、比简历真实的"现在"。</span>
<span class="i18n i18n-en">The Now page idea comes from <a href="https://sive.rs/now" target="_blank" rel="noopener">Derek Sivers</a>. More honest than social media, more real than a CV.</span>
</p>

</div>
