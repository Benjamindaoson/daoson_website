---
title: "Jekyll Liquid: where_exp 比 where 强大得多"
date: 2026-05-26
tags: [jekyll, liquid]
lang: zh
---

`where` 只能精确匹配单个字段。如果想"找出 lang 为 zh **或** nil 的 post"，得用 `where_exp`：

```liquid
{%- comment -%} 错的，nil 匹配不到 {%- endcomment -%}
{% assign zh = site.posts | where: "lang", "zh" %}

{%- comment -%} 对的，支持任意表达式 {%- endcomment -%}
{% assign zh = site.posts | where_exp: "p", "p.lang == 'zh' or p.lang == nil" %}
```

`where_exp` 的第一个参数是变量名，第二个是布尔表达式。任何 Liquid 能算出 true/false 的表达式都行。

我搭真双语 RSS 时踩了这坑 —— 给老文章漏写 `lang` 字段，`where: "lang", "zh"` 直接把它们当成"无语言"过滤掉了。
