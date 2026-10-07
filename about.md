---
layout: default
title: 关于
title_en: About
permalink: /about/
description: 本杰铭的 AI 工程方向、模型研究与项目实践。
bilingual: true
---

<section class="hero">
  <p class="section-label"><span class="i18n i18n-zh">关于我</span><span class="i18n i18n-en">ABOUT</span></p>
  <h1>本杰铭 <span class="about-english-name">Benjamin Daoson</span></h1>
  <p><span class="i18n i18n-zh">我构建 AI Agent 系统，研究大模型后训练与多模态评估，并通过项目和技术笔记记录实践。</span><span class="i18n i18n-en">I build AI Agent systems, study LLM post-training and multimodal evaluation, and document the work through projects and technical notes.</span></p>
</section>

<div class="post-content">
<div class="i18n i18n-zh" markdown="1">

## 当前的工作主线

**企业分析 Agent。** 把业务问题组织成可以执行的调查，围绕业务语义、工具权限、任务状态和证据验证设计系统。企业级商业分析智能体是这条主线的代表项目。[阅读案例]({{ '/projects/enterprise-data-agent/' | relative_url }})。

**模型训练与评估。** 关注训练后的模型学到了什么，以及指标是否反映预期能力。Reward Modeling Lab 通过训练、排序评估和长度捷径审计研究这一问题。[阅读案例]({{ '/projects/reward-modeling-lab/' | relative_url }})。

**多模态模型行为。** 通过控制图像中的变化，观察评判模型如何使用视觉证据。RewardLens 将静态偏好准确率与干预后的行为分别测量。[阅读案例]({{ '/projects/rewardlens/' | relative_url }})。

## 我关心的工程问题

一个 Agent 在工具超时、信息不足或任务中断后，应该如何继续工作？一次分析中的业务口径和结论，能否追溯到具体数据？模型指标上升后，增益来自目标能力，还是数据中的捷径？

这些问题决定了系统的状态设计、工具边界、评测样本和验证方式。我会在案例中说明具体做法、结果与限制，也保留源码和实验资料供进一步讨论。

## 技术笔记

我的[个人笔记网站]({{ site.notes_url }})持续记录概念理解、源码阅读和学习路径。官网呈现项目与较完整的文章，笔记站承接日常的技术积累。

## 职业与技术交流

欢迎围绕 AI Agent、大模型算法、应用 AI 工程岗位，以及相关项目或研究合作交流。完整简历可以通过职业邮箱索取。

</div>
<div class="i18n i18n-en" markdown="1">

## Current work

**Business-analysis agents.** I work on turning business questions into executable investigations, with business semantics, tool permissions, task state, and evidence verification. The business-analysis Agent is the representative project in this direction. [Read the case study]({{ '/projects/enterprise-data-agent/' | relative_url }}).

**Model training and evaluation.** I study what a trained model learns and whether its metrics reflect the intended capability. Reward Modeling Lab examines this through reward-model training, ranking evaluation, and length-shortcut audits. [Read the case study]({{ '/projects/reward-modeling-lab/' | relative_url }}).

**Multimodal model behavior.** Controlled changes to images reveal how judges use visual evidence. RewardLens measures static preference accuracy and intervention behavior separately. [Read the case study]({{ '/projects/rewardlens/' | relative_url }}).

## Engineering questions

How should an Agent continue after a tool timeout, missing information, or an interrupted task? Can the business definitions and conclusions in an analysis be traced to specific data? When a model metric improves, does the gain come from the intended capability or a shortcut in the data?

These questions shape task state, tool boundaries, evaluation cases, and verification. The case studies describe concrete design decisions, results, and limitations, with links to source code and experiment materials.

## Technical notes

My [separate notes site]({{ site.notes_url }}) collects concepts, source-code reading, and learning paths, primarily in Chinese. This website presents projects and longer essays; the notes site supports ongoing technical learning.

## Roles and collaboration

Get in touch about AI Agent, LLM, and applied AI engineering roles, or related projects and research. A full résumé is available by email.

</div>
</div>

<div class="home-actions"><a class="btn" href="{{ '/contact/' | relative_url }}"><span class="i18n i18n-zh">联系我</span><span class="i18n i18n-en">Get in touch</span></a><a class="btn secondary" href="https://github.com/{{ site.github_username }}" target="_blank" rel="noopener">GitHub ↗</a></div>
