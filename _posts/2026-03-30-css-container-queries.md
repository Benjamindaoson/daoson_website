---
title: "CSS 容器查询完全指南"
date: 2026-03-30 16:00:00 +0800
tags: [前端, CSS]
description: 媒体查询的时代正在过去——容器查询让组件真正实现「响应式」。
series: "前端工程实践"
---

很长一段时间，"响应式设计"约等于"媒体查询"。但媒体查询有个根本问题：
**它只能根据视口（viewport）来响应，而不是组件所在的容器**。

容器查询（Container Queries）解决了这个问题。

## 基本用法

```css
/* 1. 把父元素声明为容器 */
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

/* 2. 根据容器宽度调整子元素 */
@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

注意，这个查询关心的不是浏览器窗口宽度，而是 `.card-wrapper` 的宽度。

## 为什么这是革命性的

想象一个 `<UserCard>` 组件，它可能出现在：
- 侧边栏（窄）
- 主内容区（宽）
- 模态框（中等）

用媒体查询，你只能基于整个页面的宽度决定它的布局，
但同一个页面里，同一个组件可能既在侧边栏又在主区域——
这时容器查询才是唯一的解法。

## 浏览器支持

到 2026 年，所有主流浏览器（Chrome、Safari、Firefox、Edge）都已经稳定支持。
可以放心使用了。

---

*容器查询配合 CSS Grid 的 `auto-fit/auto-fill`，几乎可以让你扔掉 99% 的媒体查询。*
