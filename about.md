---
layout: default
title: 关于我
title_en: About
permalink: /about/
description: 赖建铭 Benjamin Taoson 的技术方向、项目方法与个人思考。关注大模型、智能体系统、模型可靠性与机器人学习。
description_en: Benjamin Taoson's technical interests, approach to projects, and reflections on language models, agents, model reliability, and robot learning.
portfolio_shell: true
bilingual: true
---
{% assign profile = site.data.profile %}
<article class="portfolio-page profile-page">
  <header class="portfolio-page-header">
    <p class="page-kicker"><span class="i18n i18n-zh">关于我</span><span class="i18n i18n-en">ABOUT</span></p>
    <h1>{{ profile.display_name }} <span class="about-english-name">{{ profile.name_zh }}</span></h1>
    <p class="page-lead"><span class="i18n i18n-zh">{{ profile.summary_zh }}</span><span class="i18n i18n-en">{{ profile.summary_en }}</span></p>
    <p><span class="i18n i18n-zh">这个网站收录项目的完整过程：问题怎么定义，为什么这样设计，做出了什么，以及实验结果说明了什么。</span><span class="i18n i18n-en">This site documents the full story behind each project: how I frame the problem, why I choose a design, what I build, and what the experiments show.</span></p>
    <div class="page-actions"><a class="btn" href="{{ '/projects/' | relative_url }}"><span class="i18n i18n-zh">查看作品与研究</span><span class="i18n i18n-en">Explore the work</span></a><a class="text-link" href="{{ site.notes_url }}"><span class="i18n i18n-zh">阅读我的笔记</span><span class="i18n i18n-en">Read my notes</span> ↗</a></div>
  </header>
  <section class="content-section">
    <h2><span class="i18n i18n-zh">两个方向，同一个问题</span><span class="i18n i18n-en">Two directions, a shared question</span></h2>
    <p><span class="i18n i18n-zh">一个 AI 系统怎样利用证据做出判断，并在判断错误时修正行动？这连接了我在数字 AI 与物理 AI 中的兴趣。</span><span class="i18n i18n-en">How does an AI system use evidence to make a decision, and correct its actions when that decision is wrong? That question connects my interests in digital and physical AI.</span></p>
    <div class="profile-directions">
      <div><h3>Digital AI</h3><p><span class="i18n i18n-zh">从大模型到智能体系统，关注任务理解、工具使用、模型后训练与可靠性。项目涉及经营分析、多模态内容生产、领域微调和奖励建模。</span><span class="i18n i18n-en">Language models and agent systems, with a focus on task understanding, tool use, post-training, and reliability. Projects cover business analysis, multimodal content, domain fine-tuning, and reward modeling.</span></p><a class="text-link" href="{{ '/projects/#digital-ai' | relative_url }}"><span class="i18n i18n-zh">数字 AI 项目</span><span class="i18n i18n-en">Digital AI projects</span> →</a></div>
      <div><h3>Physical AI</h3><p><span class="i18n i18n-zh">关注机器人学习、VLA、世界模型与闭环决策。以 SpatialMind 的二维仿真为起点，探索空间记忆、主动感知，以及环境变化后的纠错与恢复。</span><span class="i18n i18n-en">Robot learning, VLA policies, world models, and closed-loop decisions. SpatialMind's 2D simulation is a starting point for exploring spatial memory, active perception, and recovery when the environment changes.</span></p><a class="text-link" href="{{ '/projects/spatialmind/' | relative_url }}">SpatialMind →</a></div>
    </div>
  </section>
  <section class="content-section">
    <h2><span class="i18n i18n-zh">我怎样做项目</span><span class="i18n i18n-en">How I approach a project</span></h2>
    <p><span class="i18n i18n-zh">{{ profile.approach_zh }}</span><span class="i18n i18n-en">{{ profile.approach_en }}</span></p>
    <h3><span class="i18n i18n-zh">把设计放回具体任务</span><span class="i18n i18n-en">Let the task shape the design</span></h3>
    <p><span class="i18n i18n-zh">在 AI BA 中，模型负责理解问题与安排调查，程序负责受控查询和确定性计算。这样的分工来自一个具体要求：分析结论需要能追溯到一致的指标定义和数据。<a href="{{ '/projects/enterprise-data-agent/' | relative_url }}">查看 AI BA 的架构与取舍 →</a></span><span class="i18n i18n-en">In AI BA, the model interprets questions and plans investigations, while code handles governed queries and deterministic calculations. This division follows a concrete requirement: conclusions must trace back to consistent metric definitions and data. <a href="{{ '/projects/enterprise-data-agent/' | relative_url }}">Explore AI BA's architecture and decisions →</a></span></p>
    <h3><span class="i18n i18n-zh">继续追问结果为什么成立</span><span class="i18n i18n-en">Ask why a result holds</span></h3>
    <p><span class="i18n i18n-zh">Reward Modeling Lab 得到较高的偏好判断准确率后，我继续检查长度捷径：一个总选更长回答的规则得分更高。长度匹配、反长度挑战和整体排序，帮助我更准确地解释模型学到了什么。<a href="{{ '/projects/reward-modeling-lab/' | relative_url }}">查看实验与反思 →</a></span><span class="i18n i18n-en">After a high preference score in Reward Modeling Lab, I checked for length shortcuts: an always-pick-the-longer-answer rule scored even higher. Length-matched, reversed-length, and ranking evaluations helped clarify what the model had learned. <a href="{{ '/projects/reward-modeling-lab/' | relative_url }}">Read the experiments and reflections →</a></span></p>
  </section>
  <section class="content-section">
    <h2><span class="i18n i18n-zh">持续探索的问题</span><span class="i18n i18n-en">Questions I keep exploring</span></h2>
    <p><span class="i18n i18n-zh">评测得分接近的模型，面对关键证据变化时，会作出相似的判断吗？如果机器人记得的位置已经过时，它应该相信记忆，还是重新观察？我通过 <a href="{{ '/projects/rewardlens/' | relative_url }}">RewardLens</a> 与 <a href="{{ '/projects/spatialmind/' | relative_url }}">SpatialMind</a> 中的实验，逐步探索这些问题。</span><span class="i18n i18n-en">Do models with similar evaluation scores behave similarly when key evidence changes? When a robot's remembered location becomes outdated, should it trust its memory or look again? Experiments in <a href="{{ '/projects/rewardlens/' | relative_url }}">RewardLens</a> and <a href="{{ '/projects/spatialmind/' | relative_url }}">SpatialMind</a> help me explore these questions.</span></p>
  </section>
  <section class="content-section">
    <h2><span class="i18n i18n-zh">写作与交流</span><span class="i18n i18n-en">Writing and conversation</span></h2>
    <p><span class="i18n i18n-zh">项目之外，我把技术文章、源码阅读与学习记录整理在独立的<a href="{{ site.notes_url }}">知识星球 ↗</a>。欢迎带着一个工程问题、研究观察、合作想法或授课邀请来交流。</span><span class="i18n i18n-en">Beyond the projects, my technical writing, source-code reading, and learning notes live in a separate <a href="{{ site.notes_url }}">knowledge hub ↗</a>. I welcome engineering questions, research observations, collaboration ideas, and teaching invitations.</span></p>
    <a class="btn" href="{{ '/contact/' | relative_url }}"><span class="i18n i18n-zh">联系我</span><span class="i18n i18n-en">Get in touch</span></a>
  </section>
</article>
