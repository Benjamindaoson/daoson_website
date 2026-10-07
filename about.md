---
layout: default
title: 关于我
title_en: About
permalink: /about/
description: 本杰铭 Benjamin Taoson 的工程背景、研究兴趣与工作方法。
description_en: Benjamin Taoson's engineering background, research interests, and approach to work.
portfolio_shell: true
bilingual: true
---

<article class="portfolio-page profile-page">
  <header class="portfolio-page-header">
    <p class="page-kicker"><span class="i18n i18n-zh">关于我</span><span class="i18n i18n-en">ABOUT</span></p>
    <h1>Benjamin Taoson <span class="about-english-name">本杰铭</span></h1>
    <p class="page-lead"><span class="i18n i18n-zh">我做 AI 工程，也研究模型如何学习、判断与行动。大模型与智能体是我的工程主线，机器人学习与具身智能是我持续关注的研究方向。</span><span class="i18n i18n-en">I build AI systems and study how models learn, judge, and act. Language models and agents are the core of my engineering work; robot learning and embodied intelligence are ongoing research interests.</span></p>
  </header>

  <section class="content-section">
    <h2><span class="i18n i18n-zh">从业务问题走到模型与系统</span><span class="i18n i18n-en">From business problems to models and systems</span></h2>
    <p><span class="i18n i18n-zh">我的工作从企业数字化项目开始，涉及需求梳理、数据与 API 集成、系统联调和上线验证。随后，我转向 NLP 分类、信息抽取与语义匹配，再进入大模型、知识检索和 Agent 系统的研发。</span><span class="i18n i18n-en">I started with enterprise digitalization projects: understanding requirements, integrating data and APIs, connecting systems, and validating releases. I then moved into NLP classification, information extraction, and semantic matching, followed by language models, retrieval, and agent systems.</span></p>
    <p><span class="i18n i18n-zh">这段经历让我习惯把模型放回实际任务中思考：输入从哪里来，工具可以做什么，结果由谁验证，失败以后如何继续。一个系统是否有用，最终要落实到这些具体问题。</span><span class="i18n i18n-en">That path taught me to consider a model within the task around it: where inputs come from, what tools can do, who verifies the result, and how the system continues after a failure. Those concrete questions shape whether a system is useful.</span></p>
  </section>

  <section class="content-section">
    <h2><span class="i18n i18n-zh">我怎样做项目</span><span class="i18n i18n-en">How I approach the work</span></h2>
    <ul class="profile-principles">
      <li><strong><span class="i18n i18n-zh">先明确问题与边界。</span><span class="i18n i18n-en">Define the problem and its boundaries.</span></strong> <span class="i18n i18n-zh">把业务语义、数据来源和工具权限说明白，再决定哪些部分交给模型，哪些部分使用确定性计算。</span><span class="i18n i18n-en">Clarify business meaning, data sources, and tool permissions before deciding what belongs to a model and what needs deterministic computation.</span></li>
      <li><strong><span class="i18n i18n-zh">把验证放进实现。</span><span class="i18n i18n-en">Build verification into the implementation.</span></strong> <span class="i18n i18n-zh">我会追踪任务状态、保留计算依据，并检查异常输入、缺失信息和工具失败。案例中展示的结论，应当能回到代码或实验记录。</span><span class="i18n i18n-en">I track task state, preserve the basis for calculations, and examine invalid inputs, missing information, and tool failures. A claim in a case study should lead back to code or an experiment record.</span></li>
    </ul>
  </section>

  <section class="content-section">
    <h2><span class="i18n i18n-zh">高分之后，检查模型靠什么得分</span><span class="i18n i18n-en">After a high score, examine what earns it</span></h2>
    <p><span class="i18n i18n-zh">Reward Modeling Lab 的公开记录提供了一个具体例子：微调后的奖励模型在冻结测试集上得到较高准确率，但“总选更长回答”的简单规则得分更高。只报告原始准确率，无法区分偏好判断能力与数据中的长度捷径。</span><span class="i18n i18n-en">The public Reward Modeling Lab records provide a concrete example: the fine-tuned reward model scored well on a frozen test set, yet a simple rule that always picked the longer answer scored higher. Original accuracy alone could not separate preference judgment from a length shortcut in the data.</span></p>
    <p><span class="i18n i18n-zh">记录中的后续检查加入了长度匹配与反长度挑战，并结合整体排序来解释结果。这让讨论从“分数涨了多少”转向“哪些条件下仍能判断正确”。已完成的实验与尚未运行的改进方案也分别列明。<a href="{{ '/projects/reward-modeling-lab/' | relative_url }}">阅读案例与实验依据 →</a></span><span class="i18n i18n-en">The follow-up checks used length-matched and reversed-length challenges, alongside global ranking, to interpret the result. That shifts the question from how much a score rose to the conditions under which judgments remain correct. Completed experiments and unrun improvements are documented separately. <a href="{{ '/projects/reward-modeling-lab/' | relative_url }}">Read the case study and experiment evidence →</a></span></p>
  </section>

  <section class="content-section">
    <h2><span class="i18n i18n-zh">数字 AI 与物理 AI</span><span class="i18n i18n-en">Digital AI and Physical AI</span></h2>
    <p><span class="i18n i18n-zh">在数字 AI 中，我构建业务分析智能体，研究大模型后训练与多模态评估。你可以从 <a href="{{ '/projects/enterprise-data-agent/' | relative_url }}">Enterprise Data Agent</a>、<a href="{{ '/projects/reward-modeling-lab/' | relative_url }}">Reward Modeling Lab</a> 和 <a href="{{ '/projects/rewardlens/' | relative_url }}">RewardLens</a> 了解具体实现与实验边界。</span><span class="i18n i18n-en">In Digital AI, I build business-analysis agents and investigate post-training and multimodal evaluation. <a href="{{ '/projects/enterprise-data-agent/' | relative_url }}">Enterprise Data Agent</a>, <a href="{{ '/projects/reward-modeling-lab/' | relative_url }}">Reward Modeling Lab</a>, and <a href="{{ '/projects/rewardlens/' | relative_url }}">RewardLens</a> show the implementation choices and scope of the experiments.</span></p>
    <p><span class="i18n i18n-zh">在物理 AI 中，我关注机器人学习、视觉语言行动模型（VLA）和仿真评估。我想进一步理解：当环境、起始条件或感知发生变化时，学到的策略怎样保持可靠行动。<a href="{{ '/projects/startshift-vla/' | relative_url }}">StartShift-VLA</a> 保留了一份相关的仿真研究记录。</span><span class="i18n i18n-en">In Physical AI, I am interested in robot learning, vision-language-action models, and simulation evaluation. I want to understand how learned policies can act reliably when environments, initial conditions, or perception change. <a href="{{ '/projects/startshift-vla/' | relative_url }}">StartShift-VLA</a> preserves a related simulation research record.</span></p>
  </section>

  <section class="content-section">
    <h2><span class="i18n i18n-zh">写作与交流</span><span class="i18n i18n-en">Writing and conversation</span></h2>
    <p><span class="i18n i18n-zh">我的公开笔记放在独立的<a href="{{ site.notes_url }}">知识网站 ↗</a>，用于整理概念、源码阅读和学习过程。如果你想讨论工程问题、研究思路、授课邀请或职业机会，欢迎写信给我。</span><span class="i18n i18n-en">My public notes live on a separate <a href="{{ site.notes_url }}">knowledge site ↗</a>, where I organize concepts, source-code reading, and learning notes. I welcome conversations about engineering, research, teaching invitations, and career opportunities.</span></p>
    <div class="page-actions"><a class="btn" href="{{ '/contact/' | relative_url }}"><span class="i18n i18n-zh">联系我</span><span class="i18n i18n-en">Get in touch</span></a><a class="btn secondary" href="{{ '/resume/' | relative_url }}"><span class="i18n i18n-zh">查看公开简历</span><span class="i18n i18n-en">View public résumé</span></a></div>
  </section>
</article>
