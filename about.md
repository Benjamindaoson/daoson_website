---
layout: default
title: 关于
permalink: /about/
description: 我正在研究什么、如何思考，以及如何联系我。
---

<section class="hero">
  <span class="prompt">
    <span class="i18n i18n-zh">~/关于 $ 读取 判断框架</span>
    <span class="i18n i18n-en">~/about $ read thinking-profile</span>
  </span>
  <h1>
    <span class="i18n i18n-zh">关于</span>
    <span class="i18n i18n-en">About</span>
  </h1>
  <p>
    <span class="i18n i18n-zh">这里不是简历页，而是我当前研究方向、判断方式和公开构建边界的说明。</span>
    <span class="i18n i18n-en">This is not a résumé page. It explains what I study, how I think, and what I am building in public.</span>
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
      // {{ site.author }}
    </p>
  </div>

  <div>

<div markdown="1">

<span class="i18n i18n-zh">你好，我是 **{{ site.author }}**。我正在研究 AI 智能体如何从好看的演示走向可靠工作的系统，并把这个过程里的工程、产品和个人系统思考记录下来。</span>
<span class="i18n i18n-en">Hi, I’m **{{ site.author }}**. I study how AI agents move from impressive demos to reliable working systems, and I document the engineering, product, and personal systems behind that transition.</span>

<span class="i18n i18n-zh">这个网站是我的公开工作台：有较完整的文章，也有正在生长的笔记、今日所得和构建记录。它不会把实验包装成成熟产品，也不会为了显得完整而编造经历。</span>
<span class="i18n i18n-en">This site is my public workbench: essays, growing notes, TILs, and build logs. It does not present experiments as mature products, and it does not invent credentials for polish.</span>

</div>

## <span class="i18n i18n-zh">我正在研究什么</span><span class="i18n i18n-en">What I Study</span>

<div markdown="1">

- <span class="i18n i18n-zh">**AI 智能体如何协作**：任务边界、上下文交接、工具调用、失败恢复。</span><span class="i18n i18n-en">**How agents coordinate**: task boundaries, context handoff, tool use, and failure recovery.</span>
- <span class="i18n i18n-zh">**不可靠模型如何组成可靠系统**：评估、状态管理、回滚、人工确认和公开边界。</span><span class="i18n i18n-en">**How unreliable models become reliable systems**: evaluation, state management, rollback, human review, and explicit boundaries.</span>
- <span class="i18n i18n-zh">**构建者如何长期积累判断力**：写作、笔记、复盘、今日所得和小实验如何互相支撑。</span><span class="i18n i18n-en">**How builders compound judgment**: writing, notes, reviews, TILs, and small experiments reinforcing each other.</span>

</div>

## <span class="i18n i18n-zh">我为什么关注数字员工</span><span class="i18n i18n-en">Why Digital Employees</span>

<div markdown="1">

<span class="i18n i18n-zh">我关心的不是“让模型多会聊天”，而是一个更工程化的问题：当多个智能体需要使用工具、交接上下文、处理失败并让人保留控制权时，系统应该怎么设计。</span>
<span class="i18n i18n-en">I am less interested in making models chat better, and more interested in a systems question: how should agents use tools, hand off context, recover from failures, and keep humans in control?</span>

<span class="i18n i18n-zh">所以我把数字员工系统当成一个长期实验。它目前不是成熟产品，也没有被包装成案例；它是我用来研究智能体可靠性、工程边界和工作流变化的构建对象。</span>
<span class="i18n i18n-en">That is why I treat the digital employee system as a long-term experiment. It is not a mature product or a packaged case study; it is the build object I use to study agent reliability, engineering boundaries, and workflow change.</span>

</div>

## <span class="i18n i18n-zh">我的判断</span><span class="i18n i18n-en">What I Believe</span>

<div markdown="1">

- <span class="i18n i18n-zh">可靠性比炫技重要。</span><span class="i18n i18n-en">Reliability matters more than spectacle.</span>
- <span class="i18n i18n-zh">智能体系统的难点不只是模型能力，也是工程实践。</span><span class="i18n i18n-en">The hard part of agent systems is not only model capability; it is engineering practice.</span>
- <span class="i18n i18n-zh">人在回路不是退步，而是可靠系统的一部分。</span><span class="i18n i18n-en">Human-in-the-loop is not a step backward; it is part of reliable system design.</span>
- <span class="i18n i18n-zh">写作是工程判断的一部分，因为它迫使含糊的东西变清楚。</span><span class="i18n i18n-en">Writing is part of engineering judgment because it forces vague ideas to become clear.</span>
- <span class="i18n i18n-zh">少但真实，比多但虚更值得长期信任。</span><span class="i18n i18n-en">A small amount of verified work earns more trust than a large amount of filler.</span>

</div>

## <span class="i18n i18n-zh">如何阅读这个网站</span><span class="i18n i18n-en">How to Read This Site</span>

<div markdown="1">

- <span class="i18n i18n-zh">**文章**：较完整的判断、复盘和技术实践。</span><span class="i18n i18n-en">**Writing**: longer judgment, retrospectives, and technical practice.</span>
- <span class="i18n i18n-zh">**笔记**：仍在生长的概念、问题和主题线索。</span><span class="i18n i18n-en">**Notes**: evolving concepts, questions, and topic trails.</span>
- <span class="i18n i18n-zh">**今日所得**：小而具体的工程发现。</span><span class="i18n i18n-en">**TIL**: small, concrete engineering discoveries.</span>
- <span class="i18n i18n-zh">**构建记录**：真实项目的假设、状态、边界和下一步。</span><span class="i18n i18n-en">**Labs**: hypotheses, status, boundaries, and next steps for real projects.</span>
- <span class="i18n i18n-zh">**近况**：当前正在研究、构建和整理的事情。</span><span class="i18n i18n-en">**Now**: what I am currently studying, building, and organizing.</span>

</div>

## <span class="i18n i18n-zh">联系</span><span class="i18n i18n-en">Contact</span>

<div markdown="1">

<span class="i18n i18n-zh">如果你也在思考 AI 智能体、软件工程可靠性或个人知识系统，可以通过下面这些方式找到我。</span>
<span class="i18n i18n-en">If you are thinking about AI agents, software reliability, or personal knowledge systems, these are the best ways to reach me.</span>

- <span class="i18n i18n-zh">邮箱</span><span class="i18n i18n-en">Email</span>：[{{ site.email }}](mailto:{{ site.email }})
- GitHub：[本杰铭的 GitHub](https://github.com/{{ site.github_username }})
- <span class="i18n i18n-zh">订阅源</span><span class="i18n i18n-en">RSS</span>：<a class="ui-lang-zh" href="{{ '/feed-zh.xml' | relative_url }}">中文 RSS</a><a class="ui-lang-en" href="{{ '/feed-en.xml' | relative_url }}">English RSS</a>

</div>

  </div>
</section>
