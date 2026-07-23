---
layout: default
title: 联系
permalink: /contact/
description: 低风险职业联系入口。
---

<section class="hero">
  <span class="prompt">
    <span class="i18n i18n-zh">~/contact $ open</span>
    <span class="i18n i18n-en">~/contact $ open</span>
  </span>
  <h1>
    <span class="i18n i18n-zh">联系</span>
    <span class="i18n i18n-en">Contact</span>
  </h1>
  <p>
    <span class="i18n i18n-zh">如有 AI 工程岗位、技术合作、产品开发或课程合作需求，请通过职业邮箱联系。</span>
    <span class="i18n i18n-en">For AI engineering roles, technical collaboration, product development, or course collaboration, reach out by email.</span>
  </p>
  <div class="home-actions">
    <a class="btn" href="mailto:{{ site.email }}">Email</a>
    {% if site.github_username %}
      <a class="btn secondary" href="https://github.com/{{ site.github_username }}" target="_blank" rel="noopener">GitHub</a>
    {% endif %}
  </div>
</section>
