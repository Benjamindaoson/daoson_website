---
layout: default
title: Elsewhere / 外部发布
permalink: /elsewhere/
description: 我在其他平台发布内容的索引，只收录摘要和原平台链接。
---

<section class="hero elsewhere-hero">
  <span class="prompt">~/elsewhere $ open original-links.log</span>
  <h1>
    <span class="i18n i18n-zh">Elsewhere / 外部发布</span>
    <span class="i18n i18n-en">Elsewhere / Published elsewhere</span>
  </h1>
  <p>
    <span class="i18n i18n-zh">这里收录我在其他平台发布的文章、视频和短内容，只提供摘要和原文链接。</span>
    <span class="i18n i18n-en">An index of articles, videos, and short-form posts I publish on other platforms, with summaries and links to the originals.</span>
  </p>
</section>

<section class="elsewhere-section" aria-labelledby="elsewhere-platforms-heading">
  <div class="elsewhere-section-header">
    <span class="elsewhere-kicker mono small">platforms</span>
    <h2 id="elsewhere-platforms-heading">
      <span class="i18n i18n-zh">平台范围</span>
      <span class="i18n i18n-en">Platform Overview</span>
    </h2>
  </div>
  <div class="elsewhere-platforms" aria-label="External publishing platforms">
    <span class="elsewhere-platform">The Information</span>
    <span class="elsewhere-platform">微信公众号</span>
    <span class="elsewhere-platform">YouTube</span>
    <span class="elsewhere-platform">小红书</span>
    <span class="elsewhere-platform">
      <span class="i18n i18n-zh">其他</span>
      <span class="i18n i18n-en">Other</span>
    </span>
  </div>
</section>

{% assign elsewhere_items = site.data.elsewhere | sort: "date" | reverse %}

<section class="elsewhere-section" aria-labelledby="elsewhere-list-heading">
  <div class="elsewhere-section-header">
    <span class="elsewhere-kicker mono small">external_index</span>
    <h2 id="elsewhere-list-heading">
      <span class="i18n i18n-zh">外部发布</span>
      <span class="i18n i18n-en">External Publication List</span>
    </h2>
  </div>

  {% if elsewhere_items.size > 0 %}
    <div class="elsewhere-list">
      {% for item in elsewhere_items %}
        <article class="elsewhere-card">
          <div class="elsewhere-card-head">
            {% if item.platform %}<span class="elsewhere-platform">{{ item.platform }}</span>{% endif %}
            {% if item.type %}<span class="elsewhere-type">{{ item.type }}</span>{% endif %}
            {% if item.date %}<time class="mono small subtle" datetime="{{ item.date | date: '%Y-%m-%d' }}">{{ item.date | date: "%Y-%m-%d" }}</time>{% endif %}
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
            <a class="elsewhere-link mono small" href="{{ item.url }}" target="_blank" rel="noopener">
              <span class="i18n i18n-zh">查看原文</span>
              <span class="i18n i18n-en">Open original</span>
            </a>
          {% endif %}
        </article>
      {% endfor %}
    </div>
  {% else %}
    <div class="elsewhere-empty">
      <span class="mono small subtle">// empty for now</span>
      <p>
        <span class="i18n i18n-zh">外部发布正在整理中。这里会收录我在其他平台发布的真实内容链接。</span>
        <span class="i18n i18n-en">External publications are being organized. This page will only list real links to original platforms.</span>
      </p>
    </div>
  {% endif %}
</section>

<section class="elsewhere-section elsewhere-note" aria-labelledby="elsewhere-boundary-heading">
  <span class="elsewhere-kicker mono small">boundary</span>
  <h2 id="elsewhere-boundary-heading">
    <span class="i18n i18n-zh">边界说明</span>
    <span class="i18n i18n-en">Boundary Note</span>
  </h2>
  <p>
    <span class="i18n i18n-zh">本站只保存外部发布的索引、简短摘要和原平台链接，不复制外部平台全文、转录稿或受限制内容。</span>
    <span class="i18n i18n-en">This site only keeps an index, short summaries, and original links. It does not copy full text, transcripts, or restricted platform content.</span>
  </p>
</section>
