---
layout: default
title: 近况
permalink: /now/
description: 我当前正在研究、构建和整理的事情。
---

<section class="hero">
  <span class="prompt">
    <span class="i18n i18n-zh">~/近况 $ 查看 当前状态</span>
    <span class="i18n i18n-en">~/now $ cat current-state.md</span>
  </span>
  <h1>
    <span class="i18n i18n-zh">近况</span>
    <span class="i18n i18n-en">Now</span>
  </h1>
  <p>
    <span class="i18n i18n-zh">这是当前研究状态页。它不追踪所有动态，只记录我此刻正在押注、构建、学习和整理的事情。</span>
    <span class="i18n i18n-en">This is a current-state page. It does not track everything, only what I am currently betting on, building, learning, and organizing.</span>
  </p>
</section>

<div markdown="1" class="now-content">

<p class="mono small subtle">
<span class="i18n i18n-zh">// 最近更新：</span>
<span class="i18n i18n-en">// Last updated: </span>
<strong>{{ site.time | date: "%Y-%m-%d" }}</strong>
</p>

## <span class="i18n i18n-zh">当前押注</span><span class="i18n i18n-en">Current Bet</span>

<span class="i18n i18n-zh">
我正在押注一个问题：AI 智能体真正重要的进展，不只是更会聊天，而是能被组织成可靠、可恢复、可被人监督的工作系统。
</span>
<span class="i18n i18n-en">
My current bet: the important progress in AI agents is not just better chat, but turning agents into reliable, recoverable, human-supervised working systems.
</span>

## <span class="i18n i18n-zh">当前构建</span><span class="i18n i18n-en">Current Build</span>

<span class="i18n i18n-zh">
我正在构建 **数字员工系统**。它目前是一个实验，不是成熟产品。重点放在：
</span>
<span class="i18n i18n-en">
I am building a **digital employee system**. It is currently an experiment, not a mature product. The focus areas are:
</span>

- <span class="i18n i18n-zh">智能体之间如何分工和交接上下文。</span><span class="i18n i18n-en">how agents divide work and hand off context</span>
- <span class="i18n i18n-zh">工具调用失败后如何恢复到可控状态。</span><span class="i18n i18n-en">how tool failures recover into controlled states</span>
- <span class="i18n i18n-zh">哪些环节必须保留人工确认。</span><span class="i18n i18n-en">where human review should remain in the loop</span>
- <span class="i18n i18n-zh">如何把一次演示变成可反复运行的工作流。</span><span class="i18n i18n-en">how a one-off demo becomes a repeatable workflow</span>

## <span class="i18n i18n-zh">当前问题</span><span class="i18n i18n-en">Current Question</span>

<span class="i18n i18n-zh">
我现在最关心的问题是：当一个智能体工作流在中途失败时，系统能否清楚知道失败发生在哪里、哪些状态仍然可信、下一步应该自动恢复还是交给人处理？
</span>
<span class="i18n i18n-en">
The question I care about most right now: when an agent workflow fails halfway through, can the system know where it failed, which state is still trustworthy, and whether to recover automatically or hand off to a human?
</span>

## <span class="i18n i18n-zh">当前限制</span><span class="i18n i18n-en">Current Constraints</span>

<span class="i18n i18n-zh">
这个项目还有很多没有公开的部分。具体仓库、演示和实现细节仍在整理中；目前公开的是方向、问题背景、构建记录和下一步计划。
</span>
<span class="i18n i18n-en">
Much of this project is not public yet. The repository, demo, and implementation details are still being organized; what is public for now is the direction, problem context, build log, and next steps.
</span>

## <span class="i18n i18n-zh">正在学习</span><span class="i18n i18n-en">Learning</span>

<span class="i18n i18n-zh">
在读书单仍在整理中。暂时不写书名，避免把还没认真读完、还没形成判断的内容放上来。当前更确定的学习方向是：
</span>
<span class="i18n i18n-en">
The reading list is still being organized. I am not listing book titles yet, because I only want to include books I have read enough to think about. Current learning directions:
</span>

- <span class="i18n i18n-zh">智能体协作协议、工具调用可靠性和人在回路设计。</span><span class="i18n i18n-en">agent coordination protocols, tool-use reliability, and human-in-the-loop design</span>
- <span class="i18n i18n-zh">轻量个人网站系统的长期维护方式。</span><span class="i18n i18n-en">long-term maintenance of lightweight personal websites</span>
- <span class="i18n i18n-zh">如何把文章、笔记、今日所得和构建记录组织成可持续的知识系统。</span><span class="i18n i18n-en">how to organize essays, notes, TILs, and build logs into a sustainable knowledge system</span>

## <span class="i18n i18n-zh">接下来九十天</span><span class="i18n i18n-en">Next 90 Days</span>

<span class="i18n i18n-zh">
接下来九十天，我会把范围控制在已经公开的方向里：
</span>
<span class="i18n i18n-en">
For the next 90 days, I am keeping the scope close to what is already public:
</span>

1. <span class="i18n i18n-zh">把首页、关于、构建记录、近况和外部发布索引统一到同一个研究主命题下。</span><span class="i18n i18n-en">Align the homepage, About, Labs, Now, and Elsewhere around one research thesis.</span>
2. <span class="i18n i18n-zh">补一篇关于数字员工系统的公开说明，讲清楚问题、边界、当前状态和下一步。</span><span class="i18n i18n-en">Publish a public note on the digital employee system: the problem, boundaries, current state, and next steps.</span>
3. <span class="i18n i18n-zh">持续补充 AI 辅助开发、前端工程和个人知识系统相关的文章、笔记和今日所得。</span><span class="i18n i18n-en">Keep adding essays, notes, and TILs around AI-assisted development, frontend engineering, and personal knowledge systems.</span>

---

<p class="mono small subtle">
<span class="i18n i18n-zh">「近况页」灵感来自 <a href="https://sive.rs/now" target="_blank" rel="noopener">Derek Sivers</a>。它比社交媒体慢，也更接近真实状态。</span>
<span class="i18n i18n-en">The Now page idea comes from <a href="https://sive.rs/now" target="_blank" rel="noopener">Derek Sivers</a>. It is slower than social media, and closer to the actual state of work.</span>
</p>

</div>
