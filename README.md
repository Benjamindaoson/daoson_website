# 个人博客 / Personal Blog (Jekyll 版)

一个用 **Jekyll + Markdown** 维护的极客风（亮色）个人博客，专为 GitHub Pages 优化。

写新文章 = 在 `_posts/` 目录里丢一个 Markdown 文件 ✨

---

## 📁 目录结构

```
daoson_website/
├── _config.yml             # Jekyll 站点配置（必改：title / url / author）
├── Gemfile                 # Ruby 依赖
├── index.html              # 首页（自动循环 _posts）
├── about.md                # 关于我（Markdown）
├── tags.html               # 标签页（自动从 _posts 聚合）
├── projects.html           # 项目展示（数据来自 _data/projects.yml）
├── 404.html
│
├── _layouts/               # 页面模板
│   ├── default.html        # 基础模板（导航 + 页脚）
│   ├── page.html           # 普通页面
│   └── post.html           # 文章详情
│
├── _includes/              # 可复用组件
│   ├── head.html
│   ├── navbar.html
│   ├── footer.html
│   └── post-card.html
│
├── _posts/                 # ✏️ 你的文章都放这里
│   ├── 2026-05-20-vite-modern-frontend.md
│   ├── 2026-05-12-code-readability.md
│   └── ...
│
├── _data/
│   └── projects.yml        # 项目列表数据
│
├── assets/
│   ├── css/style.css       # 主样式
│   └── js/main.js          # 全局交互（搜索 / 标签筛选）
│
└── README.md
```

---

## ✏️ 写一篇新文章

1. 在 `_posts/` 目录新建一个 Markdown 文件，**文件名必须是 `YYYY-MM-DD-标题.md` 格式**。
2. 文件开头加上 front matter（YAML 元数据）：

```markdown
---
title: "我的第一篇文章"
date: 2026-06-01 10:00:00 +0800
tags: [编程, 思考]
description: 这里写文章的一句话摘要，会显示在首页和标签页。
---

# 这里开始正文

可以用任何 [Markdown](https://www.markdownguide.org/cheat-sheet/) 语法。

## 代码块

```python
def hello():
    print("Hello, world!")
```

> 引用块也支持。

- 列表项 1
- 列表项 2
```

3. 保存、push 到 GitHub —— 1 分钟后自动上线。

### 关于 tags

文章的 `tags` 数组里出现过的标签，会**自动**出现在 `/tags/` 页的标签云里。
不需要手动维护任何标签列表 ✨

---

## 🚀 部署到 GitHub Pages

### 方式 A：用根域名 `用户名.github.io`

1. 仓库名必须是 `你的GitHub用户名.github.io`。
2. 把 `_config.yml` 里：
   ```yaml
   url: "https://你的用户名.github.io"
   baseurl: ""
   ```
3. push 到 main 分支即可。

### 方式 B：用项目仓库（如 `blog`）

1. 仓库名任意，比如 `blog`。
2. 把 `_config.yml` 里：
   ```yaml
   url: "https://你的用户名.github.io"
   baseurl: "/blog"
   ```
3. push 后访问 `https://你的用户名.github.io/blog/`。

### 推送步骤

```bash
cd F:/daoson_website
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

然后到仓库 **Settings → Pages → Source → 选择 main 分支** 即可。

---

## 💻 本地预览（可选）

如果想在 push 之前预览效果：

```bash
# 1. 安装 Ruby（macOS 自带；Windows 装 RubyInstaller；Linux: sudo apt install ruby-full）
# 2. 安装 bundler
gem install bundler

# 3. 安装依赖
bundle install

# 4. 启动本地服务
bundle exec jekyll serve

# 访问 http://localhost:4000
```

> 不本地预览也完全 OK，直接 push 看 GitHub Pages 构建结果即可。

---

## 🛠 必改的占位符

部署前请全局替换：

| 占位符 | 替换为 |
|---|---|
| `你的名字` | 你的中文名（出现在首页、关于页） |
| `your_username` / `your_name` | 你的英文用户名 |
| `you@example.com` | 你的邮箱 |
| `Y`（about.md 头像字母） | 你名字的首字母 |
| `_config.yml` 里的 `url / github_username / twitter_username` | 实际值 |

---

## 🎨 改主色

`assets/css/style.css` 顶部：

```css
--accent: #2d7a3e;       /* 主色：终端绿 */
--accent-hover: #1f5a2c;
--accent-bg: #e8f3eb;
```

想换成蓝色试试 `#1565c0 / #0d47a1 / #e3f2fd`。

---

## ✨ 内置特性

- 📝 Markdown 写作，front matter 维护元数据
- 🏷️ 标签自动聚合（从 `_posts` 提取）
- 🔍 首页实时搜索（标题 + 摘要）
- ⏱ 文章阅读时长自动估算
- 📄 自动生成 RSS（`/feed.xml`）、Sitemap、SEO 标签
- 🔗 上一篇 / 下一篇导航
- 📱 响应式设计
- 🎨 代码高亮（Rouge）

---

## 📝 License

MIT — 自由使用、修改、二次分发。

---

如果你喜欢这个模板，欢迎 ⭐ Star，也欢迎拿去改成自己的样子。
