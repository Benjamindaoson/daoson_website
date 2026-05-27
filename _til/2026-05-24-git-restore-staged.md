---
title: "用 git restore 取消 staged 文件比 git reset 更直观"
date: 2026-05-24
tags: [git, 工具]
lang: zh
---

之前每次想取消 `git add` 都是查文档。今天才记牢：

```bash
git restore --staged <file>    # 把文件从暂存区拿回来（不动正文）
git restore <file>             # 撤销正文里的未提交修改
```

比 `git reset HEAD <file>` 直观得多 —— **restore 的语义是"恢复"，reset 的语义是"重置 HEAD 指针"**，前者跟用户的心智模型对得上。

Git 2.23 之后官方推荐用 `git switch` / `git restore` 替代 checkout 的双重职责。
