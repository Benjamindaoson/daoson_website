---
title: "CSS text-wrap: balance 让标题自动均匀换行"
date: 2026-05-25
tags: [前端, CSS]
lang: zh
---

写多行标题时，浏览器默认贪心换行 —— 第一行塞满，最后一行可能只有一两个字，难看。

```css
h1, h2 {
  text-wrap: balance;
}
```

加这一行，浏览器会把文本均匀分配到每一行。Safari 17.4+ / Chrome 114+ / Firefox 121+ 都支持，旧浏览器自动 fallback。

**适用场景**：标题、引语、按钮文字。不适合长段落（性能开销，且段落本来就不需要 balance）。

参考：[Adam Argyle 的演示](https://web.dev/articles/css-text-wrap-balance)
