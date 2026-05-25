---
layout: default
title: 关于我
permalink: /about/
description: 一个开发者的自白
---

<section class="hero">
  <span class="prompt">~/about $ cat me.md</span>
  <h1>关于我</h1>
  <p>一行 bio：把自己最想介绍的一句话写在这里。</p>
</section>

<section class="about-layout">

  <!-- 头像 -->
  <div>
    <div class="avatar">Y</div>
    <p class="mono small subtle" style="margin-top: 0.75rem; text-align: center;">
      // {{ site.github_username | default: 'your_name' }}
    </p>
  </div>

  <!-- 详情 -->
  <div>

<div markdown="1">

你好 👋 我是 **{{ site.author }}**，一名 *软件工程师* / *设计师* / *写作者*。
目前生活在某个城市，喜欢用代码解决问题，也喜欢用文字记录生活。

这个博客是我用 Jekyll + Markdown 维护的小空间。
没有评论、没有追踪、没有广告——就只是个干净的角落。

</div>

    <!-- 一个小终端 -->
    <div class="terminal">
      <div class="terminal-head">
        <span class="dot r"></span>
        <span class="dot y"></span>
        <span class="dot g"></span>
        <span class="title">~ — zsh</span>
      </div>
      <div class="terminal-body">
        <span class="line"><span class="green">$</span> whoami</span>
        <span class="line gray">{{ site.github_username | default: 'your_name' }}</span>
        <span class="line"><span class="green">$</span> cat ~/.profile</span>
        <span class="line"><span class="cyan">location</span>:&nbsp; somewhere on Earth</span>
        <span class="line"><span class="cyan">stack</span>:&nbsp;&nbsp;&nbsp;&nbsp;TypeScript, Python, Rust</span>
        <span class="line"><span class="cyan">currently</span>: building something small but useful</span>
        <span class="line"><span class="cyan">contact</span>:&nbsp;&nbsp;{{ site.email }}</span>
        <span class="line"><span class="green">$</span> <span class="yellow">_</span></span>
      </div>
    </div>

    <!-- 技能 -->
    <div class="info-block">
      <h3>常用工具与语言</h3>
      <ul class="skill-list">
        <li class="tag">JavaScript</li>
        <li class="tag">TypeScript</li>
        <li class="tag">Python</li>
        <li class="tag">Rust</li>
        <li class="tag">Vue</li>
        <li class="tag">React</li>
        <li class="tag">Node.js</li>
        <li class="tag">Docker</li>
        <li class="tag">PostgreSQL</li>
        <li class="tag">Linux</li>
        <li class="tag">Figma</li>
        <li class="tag">Git</li>
      </ul>
    </div>

    <!-- 经历 -->
    <h2>经历</h2>
    <ul class="timeline">
      <li>
        <span class="time">2024 — 现在</span>
        <strong class="event">某某公司 / 高级工程师</strong>
        <p class="muted small">负责前端基础设施与设计系统的建设。</p>
      </li>
      <li>
        <span class="time">2021 — 2024</span>
        <strong class="event">某某公司 / 全栈工程师</strong>
        <p class="muted small">参与一款 SaaS 产品从 0 到 1 的开发。</p>
      </li>
      <li>
        <span class="time">2017 — 2021</span>
        <strong class="event">某大学 / 计算机科学</strong>
        <p class="muted small">本科毕业，主修分布式系统方向。</p>
      </li>
    </ul>

    <!-- 联系 -->
    <h2>联系我</h2>
    <p>欢迎通过以下方式找到我，我会尽量回复每一封来信。</p>
    <p class="mono small">
      📧 <a href="mailto:{{ site.email }}">{{ site.email }}</a><br>
      🐙 <a href="https://github.com/{{ site.github_username }}">github.com/{{ site.github_username }}</a><br>
      🐦 <a href="https://twitter.com/{{ site.twitter_username }}">@{{ site.twitter_username }}</a><br>
      📡 <a href="{{ '/feed.xml' | relative_url }}">RSS feed</a>
    </p>

    <blockquote>
      「保持好奇，温柔地对待这个世界。」
    </blockquote>

  </div>
</section>
