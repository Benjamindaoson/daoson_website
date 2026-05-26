---
title: "esbuild"
status: seedling
tags: [前端, 构建工具]
date: 2026-05-23
updated: 2026-05-26
description: 用 Go 写的 JavaScript/TypeScript 打包器，比 webpack 快 10-100 倍。
lang: zh
---

Go 写的 JavaScript bundler，作者 Evan Wallace（Figma 联合创始人）。

## 为什么快

- **Go 而不是 JavaScript**：编译型语言，CPU 密集型任务天然快几倍
- **真正的多线程**：JS bundler 受限于 Node 单线程，esbuild 用了 Go 的 goroutine 并行处理
- **省略很多功能**：不做 type checking，不做 source map 的精细化，专注 bundle 这一件事

## 在生态里的定位

esbuild 自己作为 production bundler 用得少（社区在等它的 plugin 体系成熟），
但作为**底层构建块**它无处不在：

- [[vite-is-fast|Vite]] 用它做开发期的依赖预构建
- tsx / tsup 用它作 TypeScript 转译引擎
- Bun、Deno 也内置或参考了它

## 我的判断

esbuild 是那种"基础设施被重写一次后，整个生态都受益十年"的项目。
类似 [[ripgrep]]（重写 grep）、[[swc]]（重写 babel）。
看清这个模式后，下一个"快 10 倍的 X"出来时就该立刻关注。
