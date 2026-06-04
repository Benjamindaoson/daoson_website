---
title: "使用 Vite 搭建现代化前端项目"
date: 2026-05-20 10:00:00 +0800
tags: [前端, 工具]
description: 从零开始，一步步配置一个干净、快速、可维护的前端开发环境。
cover: /assets/img/covers/vite.svg
series: "前端工程实践"
lang: zh
translation_key: vite-modern-frontend
---

这篇记录我如何用 Vite 搭一个干净、快速、可维护的前端实验环境。
它不是完整框架教程，而是一份偏实践的项目初始化笔记。

> 「工具应该服务于思想，而不是相反。」

## 为什么选择 Vite

Vite 利用浏览器原生的 ES Modules 能力，开发时无需打包，启动速度极快。
相比传统的 Webpack，它在以下几个方面有明显优势：

- 冷启动时间从「秒级」缩短到「毫秒级」
- HMR（热更新）几乎是即时的，文件越多优势越明显
- 开箱即用支持 TypeScript、JSX、CSS 预处理器
- 生产环境用 Rollup 打包，输出更精简

下面这张图是 `npm run dev` 启动后的终端输出示意，注意那个 187ms 的启动时间：

![Vite 开发服务器启动后的终端输出](/assets/img/posts/vite-modern-frontend/dev-server.svg)
*Vite dev server · 冷启动 187ms*

## 快速开始

用一行命令就能创建一个新项目：

```bash
npm create vite@latest my-app -- --template vue-ts
cd my-app
npm install
npm run dev
```

就这么简单。打开 `http://localhost:5173`，你就能看到默认页面了。

这篇文章暂时不放视频演示。等有真实录制的项目过程，再补到外部发布或文章里。

## 常用配置

下面是我常用的 `vite.config.ts` 配置：

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
```

## 小结

工具会变，但解决问题的本质不会。希望这篇文章能帮你少踩一些坑。
如果你有更好的实践，欢迎给我发邮件交流。

---

*本文写于 2026 年 5 月。如有疏漏，欢迎指正。*
