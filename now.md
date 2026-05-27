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

<span class="i18n i18n-zh">
在构建 **multi-agent system / 数字员工系统** ——
让多个 LLM agent 协作完成本来需要真人员工才能做的工作。
重点放在三件事上：
</span>
<span class="i18n i18n-en">
Building a **multi-agent system / digital employee platform** —
where multiple LLM agents collaborate on work that previously needed human employees.
Focus areas:
</span>

- <span class="i18n i18n-zh">Agent 之间的协议与协作模式（不是单 agent 越长越强，是多 agent 怎么分工）</span><span class="i18n i18n-en">protocols and collaboration patterns between agents (not a longer single agent — coordination across many)</span>
- <span class="i18n i18n-zh">工具调用的可靠性 —— 失败重试、状态恢复、人在回路</span><span class="i18n i18n-en">reliability of tool use — retries, recovery, human-in-the-loop</span>
- <span class="i18n i18n-zh">把"演示能跑"做到"7×24 真正在替人干活"之间的工程鸿沟</span><span class="i18n i18n-en">the engineering chasm between "demo works" and "actually replaces human labor 24/7"</span>

## <span class="i18n i18n-zh">📚 在读</span><span class="i18n i18n-en">📚 Reading</span>

> TODO：当前在读的 1-3 本书。可以加一句话感想。
> 建议跟工作主题相关，让读者一眼看出"这人有思想线"。

- *书名 1* — 一句话评价
- *书名 2* — 一句话评价

## <span class="i18n i18n-zh">🧠 在想</span><span class="i18n i18n-en">🧠 Thinking about</span>

<span class="i18n i18n-zh">
这段时间反复出现在脑子里的几个问题：
</span>
<span class="i18n i18n-en">
Questions that keep coming back:
</span>

- <span class="i18n i18n-zh">数字员工真正取代的是哪些"工作"，而不是哪些"任务"？这两个概念差异巨大。</span><span class="i18n i18n-en">Which kinds of *work* — not just tasks — do digital employees actually replace? The distinction matters more than it seems.</span>
- <span class="i18n i18n-zh">Agent 系统的可靠性瓶颈是模型能力，还是工程实践？我越来越倾向是后者。</span><span class="i18n i18n-en">Is the reliability bottleneck in agent systems the models, or engineering? I increasingly think it's the latter.</span>
- <span class="i18n i18n-zh">2026 年还该不该投资学习"传统软件工程"？答案不是简单的 yes / no。</span><span class="i18n i18n-en">In 2026, is "traditional software engineering" still worth investing in? The answer is not a simple yes/no.</span>

## <span class="i18n i18n-zh">🎯 接下来 90 天</span><span class="i18n i18n-en">🎯 Next 90 days</span>

> TODO：3 个你想完成的具体目标。**写下来才有意义**，不写会忘。
> 建议至少一个是"输出"（文章 / 演讲 / 代码发布），一个是"输入"（读完什么 / 学会什么）。

1. <span class="i18n i18n-zh">目标 1：（比如：把数字员工系统的 v0.1 跑通在 1 个真实场景上）</span><span class="i18n i18n-en">Goal 1: (e.g., ship v0.1 of the digital employee platform in one real-world scenario)</span>
2. <span class="i18n i18n-zh">目标 2：（比如：在博客写 6 篇 agent 工程长文）</span><span class="i18n i18n-en">Goal 2: (e.g., 6 long-form posts on agent engineering)</span>
3. <span class="i18n i18n-zh">目标 3：（比如：读完 X 本书 / 跟 Y 个同行深聊）</span><span class="i18n i18n-en">Goal 3: (e.g., finish X books / have deep conversations with Y peers)</span>

---

<p class="mono small subtle">
<span class="i18n i18n-zh">「Now 页」灵感来自 <a href="https://sive.rs/now" target="_blank" rel="noopener">Derek Sivers</a>。这是一种比社交媒体诚实、比简历真实的"现在"。</span>
<span class="i18n i18n-en">The Now page idea comes from <a href="https://sive.rs/now" target="_blank" rel="noopener">Derek Sivers</a>. More honest than social media, more real than a CV.</span>
</p>

</div>
