---
title: "Vite 为什么这么快"
status: growing
tags: [前端, 构建工具]
date: 2026-05-22
updated: 2026-05-26
description: 拆解 Vite 启动 187ms 背后的两件事 —— ESM 原生加载 + esbuild 冷预构建。
lang: zh
translation_key: vite-is-fast
---

很多人以为 [[esm]] 就是 Vite 快的全部原因，其实只对了一半。

## 核心机制

Vite 把"开发"和"生产"两个阶段彻底解耦：

- **开发时**：浏览器直接通过 `<script type="module">` 加载源文件，**不打包**。
  改动一个文件只需要让浏览器重新请求那一个 ESM 模块，所以 HMR 几乎是即时的。
- **生产时**：用 Rollup 打包成传统 chunks，保证体积和兼容性。

但 ESM 有个先天问题：node_modules 里很多包是 CJS（CommonJS）格式，浏览器认不出来。
而且就算都是 ESM，几百个小文件的 HTTP 请求也会拖慢首次加载。

## 那 187ms 是怎么来的

答案是 [[esbuild]]。

Vite 启动时做了一次 **依赖预构建**（dependency pre-bundling）：
扫描你的 `node_modules`，用 [[esbuild]]（Go 写的，比 webpack 快 10-100 倍）
把 CJS 转成 ESM，把许多小文件合并成少数大文件。

这一步只在首次启动或依赖变化时跑，结果缓存到 `node_modules/.vite/`。
所以你看到的"187ms 启动"其实是冷启动后的热启动数字。

## 给我自己的启发

> 工具的速度不是单点优化堆出来的，是**架构选择**带来的。
> Vite 没有比 Webpack 写得更巧，它只是把"打包"这个问题在开发阶段绕开了。

相关：[[esm]] / [[esbuild]]
