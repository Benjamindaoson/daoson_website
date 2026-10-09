---
layout: default
title: 关于我
title_en: About
permalink: /about/
description: 赖建铭 Benjamin Taoson，高级 AI 算法工程师，佐治亚理工计算机科学硕士在读。大模型后训练、智能体系统与机器人学习。
description_en: Benjamin Taoson, Senior AI Algorithm Engineer and M.S. CS student at Georgia Tech. LLM post-training, agent systems, and robot learning.
portfolio_shell: true
bilingual: true
---
{% assign profile = site.data.profile %}
<article class="portfolio-page profile-page">
  <header class="portfolio-page-header">
    <p class="page-kicker"><span class="i18n i18n-zh">关于我</span><span class="i18n i18n-en">ABOUT</span></p>
    <h1>{{ profile.display_name }} <span class="about-english-name">{{ profile.name_zh }}</span></h1>
    <p class="page-lead"><span class="i18n i18n-zh">{{ profile.role_zh }}。从企业数字化走向大模型与智能体，也研究模型如何学习、判断与行动。</span><span class="i18n i18n-en">{{ profile.role_en }}. My path runs from enterprise digitalization to language models and agents, alongside research on how models learn, judge, and act.</span></p>
    <p><span class="i18n i18n-zh">{{ profile.summary_zh }}</span><span class="i18n i18n-en">{{ profile.summary_en }}</span></p>
    <div class="page-actions"><a class="btn" href="{{ '/projects/' | relative_url }}"><span class="i18n i18n-zh">查看作品与研究</span><span class="i18n i18n-en">Explore the work</span></a><a class="text-link" href="{{ '/resume/' | relative_url }}"><span class="i18n i18n-zh">履历与 PDF</span><span class="i18n i18n-en">Résumé &amp; PDFs</span> →</a></div>
  </header>
  <section class="content-section">
    <h2><span class="i18n i18n-zh">从业务问题到模型与系统</span><span class="i18n i18n-en">From business problems to models and systems</span></h2>
    {% include profile-career.html compact=true %}
  </section>
  <section class="content-section">
    <h2><span class="i18n i18n-zh">我怎样推进工作</span><span class="i18n i18n-en">How I work</span></h2>
    <p><span class="i18n i18n-zh">企业系统的经历让我习惯追问：输入从哪里来，业务约束是什么，工具可以执行什么，失败后怎样继续。现在构建 Agent 时，我把这些问题落实到结构化状态、受控工具、检查点和轨迹评测中，也参与需求共创、方案设计与跨职能交付。</span><span class="i18n i18n-en">Enterprise work taught me to ask where inputs come from, which business constraints matter, what tools may execute, and how work continues after failure. In agent systems, those questions become structured state, governed tools, checkpoints, and trace evaluation, supported by customer discovery and cross-functional delivery.</span></p>
    <p><span class="i18n i18n-zh">研究里也一样。Reward Modeling Lab 得到较高的偏好判断准确率后，我继续检查长度捷径：一个总选更长回答的规则得分更高，因此需要长度匹配、反长度挑战与整体排序共同解释结果。<a href="{{ '/projects/reward-modeling-lab/' | relative_url }}">查看实验与技术取舍 →</a></span><span class="i18n i18n-en">The same approach applies to research. After a high preference score in Reward Modeling Lab, I examined length shortcuts: an always-pick-the-longer-answer rule scored even higher. Length-matched, reversed-length, and ranking evaluations help explain the result. <a href="{{ '/projects/reward-modeling-lab/' | relative_url }}">Explore the experiments and decisions →</a></span></p>
  </section>
  <section class="content-section">
    <h2><span class="i18n i18n-zh">Digital AI 与 Physical AI</span><span class="i18n i18n-en">Digital AI and Physical AI</span></h2>
    <div class="profile-directions">
      <div><h3>Digital AI</h3><p><span class="i18n i18n-zh">把企业任务变成可执行、可恢复的智能体流程，并研究模型训练与可靠性。工作包括经营分析、多模态内容生产、领域 SFT、奖励建模与强化学习工程。</span><span class="i18n i18n-en">Build executable, recoverable workflows for enterprise tasks and study model training and reliability: business analysis, multimodal content, domain SFT, reward modeling, and RL infrastructure.</span></p><a class="text-link" href="{{ '/projects/#digital-ai' | relative_url }}"><span class="i18n i18n-zh">数字 AI 项目</span><span class="i18n i18n-en">Digital AI projects</span> →</a></div>
      <div><h3>Physical AI</h3><p><span class="i18n i18n-zh">关注机器人学习、VLA、世界模型与闭环决策。SpatialMind 从二维仿真出发，研究空间记忆、主动感知与纠错；这些也是我在佐治亚理工硕士阶段继续深入的方向。</span><span class="i18n i18n-en">Explore robot learning, VLA policies, world models, and closed-loop decisions. SpatialMind studies spatial memory, active perception, and correction in 2D simulation, connected to my graduate interests at Georgia Tech.</span></p><a class="text-link" href="{{ '/projects/spatialmind/' | relative_url }}">SpatialMind →</a></div>
    </div>
  </section>
  <section class="content-section">
    <h2><span class="i18n i18n-zh">当前研究</span><span class="i18n i18n-en">Current research</span></h2>
    <h3><a href="{{ profile.research.case_url | relative_url }}">{{ profile.research.name }}</a> · <span class="i18n i18n-zh">{{ profile.research.role_zh }}</span><span class="i18n i18n-en">{{ profile.research.role_en }}</span></h3>
    <p class="research-status"><span class="i18n i18n-zh">{{ profile.research.status_zh }}</span><span class="i18n i18n-en">{{ profile.research.status_en }}</span> · <a href="{{ profile.research.review_url }}">OpenReview ↗</a></p>
    <p><span class="i18n i18n-zh">{{ profile.research.summary_zh }}</span><span class="i18n i18n-en">{{ profile.research.summary_en }}</span></p>
  </section>
  <section class="content-section">
    <h2><span class="i18n i18n-zh">教育与语言</span><span class="i18n i18n-en">Education and languages</span></h2>
    {% include profile-education.html show_focus=true %}
    <p><span class="i18n i18n-zh">{{ profile.languages_zh }}</span><span class="i18n i18n-en">{{ profile.languages_en }}</span></p>
    <p class="resume-certifications"><strong><span class="i18n i18n-zh">认证：</span><span class="i18n i18n-en">Certifications: </span></strong>{{ profile.certifications | join: ' · ' }}</p>
  </section>
  <section class="content-section">
    <h2><span class="i18n i18n-zh">写作、教学与交流</span><span class="i18n i18n-en">Writing, teaching, and conversation</span></h2>
    <p><span class="i18n i18n-zh">我把技术文章、源码阅读与学习记录整理在独立的<a href="{{ site.notes_url }}">知识网站 ↗</a>。欢迎讨论工程合作、研究问题、授课与分享邀请，或适合深入投入的职业机会。</span><span class="i18n i18n-en">My technical writing, source-code reading, and learning notes live on a separate <a href="{{ site.notes_url }}">knowledge site ↗</a>. I welcome engineering collaboration, research conversations, teaching and speaking invitations, and meaningful career opportunities.</span></p>
    <a class="btn" href="{{ '/contact/' | relative_url }}"><span class="i18n i18n-zh">联系我</span><span class="i18n i18n-en">Get in touch</span></a>
  </section>
</article>
