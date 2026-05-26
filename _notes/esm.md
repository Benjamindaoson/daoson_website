---
title: "ESM（ES Modules）"
status: evergreen
tags: [前端, JavaScript]
date: 2026-05-20
updated: 2026-05-26
description: 浏览器和 Node 都原生支持的 JavaScript 模块系统，import/export 语法。
lang: zh
translation_key: esm
---

JavaScript 官方的模块系统，2015 年随 ES6 进入语言规范，2017 年后浏览器陆续原生支持。

## 关键特征

```html
<script type="module" src="main.js"></script>
```

- **静态分析**：`import` 必须在文件顶部、字符串字面量、不能动态拼路径 —— 这让工具能在不运行代码的前提下推断依赖
- **延迟执行**：自带 `defer` 行为，不会阻塞 HTML 解析
- **严格模式**：默认 strict mode
- **顶层 await**：模块顶部可以直接 `await`，CJS 做不到

## 和 CJS 的关键区别

| | CJS (Node 老式) | ESM |
|---|---|---|
| 加载 | 同步、运行时 | 异步、解析时 |
| 导出 | `module.exports = ...` | `export ... ` |
| 动态导入 | `require()` 任意位置 | `import()` 返回 Promise |
| 浏览器原生支持 | ❌ | ✅ |

## 为什么这事重要

ESM 让"零打包开发"成为可能 —— 这是 [[vite-is-fast|Vite]] 的核心前提。
没有 ESM，Vite 启动 187ms 那个数字根本不可能存在。

但 ESM 也不是免费午餐 —— 大量旧 npm 包还是 CJS，
所以 [[esbuild]] 这种工具的"CJS → ESM 转换"能力才会变成基础设施。

---

*这条笔记标记为 🌳 常青：基础概念稳定，不会再大改。*
