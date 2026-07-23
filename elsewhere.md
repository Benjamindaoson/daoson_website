---
layout: default
title: 外部发布
permalink: /elsewhere/
description: 我在其他平台发布内容的索引，只收录摘要和原平台链接。
---

<section class="hero elsewhere-hero">
  <span class="prompt">~/elsewhere $ open original-links.log</span>
  <h1>外部发布</h1>
  <p>这里收录我在其他平台发布的文章、视频和短内容。本站只保存标题、摘要、平台、日期和原文链接，不在访客访问时抓取外部网页。</p>
</section>

<section class="elsewhere-section" aria-labelledby="elsewhere-platforms-heading">
  <div class="elsewhere-section-header">
    <span class="elsewhere-kicker mono small">platforms</span>
    <h2 id="elsewhere-platforms-heading">平台范围</h2>
  </div>
  <div class="elsewhere-platforms" aria-label="External publishing platforms">
    <span class="elsewhere-platform">微信公众号</span>
    <span class="elsewhere-platform">知乎</span>
    <span class="elsewhere-platform">掘金</span>
    <span class="elsewhere-platform">CSDN</span>
    <span class="elsewhere-platform">GitHub</span>
    <span class="elsewhere-platform">其他</span>
  </div>
</section>

{% assign elsewhere_items = site.data.elsewhere | sort: "published_at" | reverse %}

<section class="elsewhere-section" aria-labelledby="elsewhere-list-heading">
  <div class="elsewhere-section-header">
    <span class="elsewhere-kicker mono small">external_index</span>
    <h2 id="elsewhere-list-heading">外部文章链接</h2>
  </div>

  {% if elsewhere_items.size > 0 %}
    <div class="elsewhere-list">
      {% for item in elsewhere_items %}
        {% assign mode = item.content_mode | default: "external" %}
        {% assign published_at = item.published_at | default: item.date %}
        {% assign category = item.category | default: item.type %}
        <article class="elsewhere-card">
          {% if item.cover %}
            <div class="elsewhere-cover">
              <img src="{{ item.cover | relative_url }}" alt="{{ item.title }} 封面" loading="lazy">
            </div>
          {% endif %}
          <div class="elsewhere-card-head">
            {% if item.platform %}<span class="elsewhere-platform">{{ item.platform }}</span>{% endif %}
            {% if category %}<span class="elsewhere-type">{{ category }}</span>{% endif %}
            <span class="elsewhere-mode mono small">{{ mode }}</span>
            {% if published_at %}<time class="mono small subtle" datetime="{{ published_at | date: '%Y-%m-%d' }}">{{ published_at | date: "%Y-%m-%d" }}</time>{% endif %}
          </div>
          <h3>{{ item.title }}</h3>
          {% if item.summary %}<p>{{ item.summary }}</p>{% endif %}
          {% if item.tags %}
            <div class="elsewhere-tags">
              {% for tag in item.tags %}
                <span class="tag">{{ tag }}</span>
              {% endfor %}
            </div>
          {% endif %}
          {% if item.url %}
            <a class="elsewhere-link mono small" href="{{ item.url }}" target="_blank" rel="noopener noreferrer">
              阅读原文
            </a>
          {% endif %}
        </article>
      {% endfor %}
    </div>
  {% else %}
    <div class="elsewhere-empty" data-pagefind-ignore>
      <span class="mono small subtle">// empty for now</span>
      <p>外部发布正在整理中。这里只会收录真实、可公开访问的原平台链接。</p>
    </div>
  {% endif %}
</section>

<section class="elsewhere-section elsewhere-note" aria-labelledby="elsewhere-boundary-heading">
  <span class="elsewhere-kicker mono small">boundary</span>
  <h2 id="elsewhere-boundary-heading">边界说明</h2>
  <p>本站只保存外部发布的索引、简短摘要和原平台链接，不复制外部平台全文、转录稿或受限制内容，也不通过 iframe 强行嵌入普通文章。</p>
</section>
