# 后端与运行时审计

## 审计结论

**当前网站没有后端。**

它是 Jekyll 静态网站：构建时由 Ruby/Jekyll/Liquid/自定义插件生成 `_site`，部署后由 GitHub Pages 托管静态文件。当前未发现运行时 API、Serverless Functions、数据库、上传接口、身份认证或常驻服务进程。

## 本轮 git 状态

审计开始时执行：

```powershell
git status --short
```

结果显示工作树已有未提交修改：

```text
 M _config.yml
 M _includes/footer.html
 M _includes/note-status.html
 M _includes/sidebar.html
 M _notes/vite-is-fast.md
 M assets/css/style.css
 M notes.html
 M projects.html
 M uses.md
?? _layouts/project.html
?? _projects/
?? contact.md
?? docs/
?? teaching-rl.html
?? teaching.html
?? writing.html
```

本轮只新增审计文档，不修改生产页面。

## 当前技术架构

## 公开名称与语言状态

用户指定的新公开名称是：**本杰铭**。用户指定网站全部使用中文。

当前源码仍显示：

- `_config.yml`：`title: "Jianming Lai · Agent Systems / Evals / AI Engineering"`
- `_config.yml`：`author: "Jianming Lai"`
- `_config.yml`：仍配置 `languages: zh / en`
- `_includes/sidebar.html`：品牌名显示 `Jianming Lai`
- 多个页面和脚本仍有 `i18n i18n-zh` / `i18n i18n-en`

这不是后端问题，而是内容与信息架构配置问题。本轮按要求不修改生产页面，只记录：后续若执行“全中文 + 本杰铭”统一，需要改 `_config.yml`、导航、SEO、RSS、结构化数据和双语 UI。

## 当前技术架构

| 组件 | 证据 | 分类 |
|---|---|---|
| Jekyll | `Gemfile` 中 `gem "jekyll", "~> 4.3"`；`_config.yml` 配置 collections、defaults、plugins | 构建时逻辑 |
| Liquid / Markdown | `_layouts/`、`_includes/`、`_posts/`、`_notes/`、`_til/` | 构建时模板与内容 |
| 自定义 Ruby 插件 | `_plugins/backlinks.rb`、`_plugins/wikilinks.rb`、`_plugins/og_image.rb` | 构建时逻辑 |
| Pagefind | `_includes/head.html` 引入 `/pagefind/pagefind-ui.js`；`scripts/build_pagefind.ps1` 和 Actions 生成索引 | 静态搜索 |
| 原生 JavaScript | `assets/js/main.js` | 浏览器端逻辑 |
| RSS | `feed-zh.xml`、`feed-en.xml`、`feed.xml` | 静态 XML |
| sitemap | `jekyll-sitemap`、`sitemap.xml` | 构建时生成的静态 XML |
| robots | `robots.txt` | 静态文本 |
| GitHub Actions | `.github/workflows/deploy.yml` | CI/CD |
| GitHub Pages | `.github/workflows/deploy.yml` 的 `actions/deploy-pages@v4` | 静态托管 |

## 构建时与运行时区分

### Jekyll

Jekyll 只是构建工具。它在本地或 GitHub Actions 中读取 Markdown、YAML、Liquid、插件，输出 `_site` 静态文件。访客访问网站时不会运行 Jekyll。

### `_plugins`

`_plugins/backlinks.rb`、`_plugins/wikilinks.rb`、`_plugins/og_image.rb` 都只在 Jekyll build 阶段执行：

- `backlinks.rb`：扫描 Markdown 中的 wikilink，写入 `site.data["backlinks"]`。
- `wikilinks.rb`：构建 wikilink 索引并在渲染前替换链接。
- `og_image.rb`：构建时写入 `_site/assets/og-cards/*.svg` 并设置 `image` 字段。

这些不是线上后端。

### Pagefind

Pagefind 是静态搜索。Actions 中执行：

```bash
npx --yes pagefind@1.5.2 --site _site --output-subdir pagefind
```

浏览器加载 `/pagefind/pagefind-ui.js` 和静态索引文件，在前端完成搜索。它不需要服务器数据库或搜索 API。

### GitHub Actions

`.github/workflows/deploy.yml` 只负责：

1. checkout；
2. setup Ruby；
3. `bundle exec jekyll build`；
4. setup Node；
5. 转换 OG 图片；
6. 生成 Pagefind；
7. 上传 `_site`；
8. 部署到 GitHub Pages。

它是 CI/CD，不是访客访问时的后端。

## 后端迹象检查

| 检查项 | 结果 | 分类 |
|---|---|---|
| `package.json` | 未发现 | 不适用 |
| `server/`、`backend/`、`api/`、`functions/` | 未发现站点源码运行时目录 | 不存在 |
| `netlify/functions/` | 未发现 | 不存在 |
| Vercel Functions / Cloudflare Workers / Firebase / Supabase | 未发现配置 | 不存在 |
| FastAPI / Flask / Django / Express / NestJS / PHP / Rails API | 未在生产站点源码中发现 | 不存在 |
| 数据库文件或连接 | 未发现 `.db`、`.sqlite`、数据库连接配置 | 不存在 |
| 上传接口 | 未发现 `<form>`、upload endpoint、FormData 上传逻辑 | 不存在 |
| 用户认证 | 未发现登录、auth、session、OAuth | 不存在 |
| Webhook | 未发现 | 不存在 |
| 动态表单处理 | 未发现 | 不存在 |

说明：`docs/` 里出现的 FastAPI、SQLite、API 等词来自项目证据文档，不属于当前网站运行时代码。

## 浏览器与网络请求检查

本轮尝试使用 Playwright，但本机没有 Playwright 浏览器二进制；按“不安装依赖”原则，未执行 `playwright install`。

改用 `_site` 静态产物启动本机静态服务并请求核心路径。结果：

| 路径 | 状态 | 表单 | `/api/` | `fetch()` |
|---|---:|---|---|---|
| `/` | 200 | 否 | 否 | 否 |
| `/projects/` | 200 | 否 | 否 | 否 |
| `/writing/` | 200 | 否 | 否 | 否 |
| `/notes/` | 200 | 否 | 否 | 否 |
| `/contact/` | 200 | 否 | 否 | 否 |
| `/robots.txt` | 200 | 否 | 否 | 否 |
| `/sitemap.xml` | 200 | 否 | 否 | 否 |
| `/feed-zh.xml` | 200 | 否 | 否 | 否 |
| `/api/` | 404 | 不适用 | 不适用 | 不适用 |
| `/pagefind/pagefind-ui.js` | 404 | 不适用 | 不适用 | 不适用 |

`/pagefind/pagefind-ui.js` 在当前本地 `_site` 中 404，原因是本轮没有重新执行 Pagefind 构建；线上 GitHub Actions 会生成它。这个 404 不表示缺后端。

文章页静态 HTML 中发现第三方静态资源：

- `https://cdn.jsdelivr.net/npm/katex@0.16.9/...`
- `https://github.com/Benjamindaoson`

这些是 CDN / 外链，不是网站后端。

## 部署方式

证据：`.github/workflows/deploy.yml`

```text
source repo
  -> GitHub Actions
      -> bundle exec jekyll build
      -> rsvg-convert OG PNG
      -> npx pagefind
      -> upload _site artifact
      -> GitHub Pages deploy
  -> visitor receives static files
```

部署产物是 `_site`。线上没有常驻应用进程，没有数据库服务，没有上传服务。

## 功能是否需要后端

| 功能 | 当前实现方式 | 是否需要后端 | 推荐 |
|---|---|---|---|
| 项目展示 | `_data/projects.yml` + Liquid | 否 | 保持静态 |
| 正式文章 | `_posts/*.md` | 否 | 保持静态 |
| 笔记 | `_notes/*.md` | 否 | 保持静态 |
| TIL | `_til/*.md` | 否 | 保持静态 |
| 标签 | 构建时聚合 / 前端过滤 | 否 | 保持静态 |
| 搜索 | Pagefind 静态索引 | 否 | 保持静态 |
| 图片 | `assets/img/` | 否 | Git 管理压缩图 |
| 少量 PDF | 静态附件即可 | 否 | 严格控制体积 |
| 外部链接 | `_data/elsewhere.yml` | 否 | 保持索引 |
| GitHub 链接 | 静态 `<a>` | 否 | 保持静态 |
| RSS / SEO | Jekyll 插件和静态 XML | 否 | 保持静态 |
| 联系邮箱 | `mailto:` | 否 | 保持静态 |
| 内容上传 | 当前没有 | 不建议公网后端 | 用本地工具或 GitHub 网页 |
| 在线编辑 | 当前没有 | 不建议公网后端 | 用 GitHub 网页或本地工具 |
| 外部文章导入 | 当前没有 | 不需要运行时后端 | 本地脚本导入，人工确认 |
| 外部文章嵌入 | 当前没有 | 仅官方 embed 需要静态代码 | 不做任意网页 iframe |

## 费用来源

当前持续费用接近 0：

- GitHub Pages：静态托管。
- GitHub Actions：构建额度内使用。
- Pagefind：构建时 npm 包，免费。
- jsDelivr KaTeX：免费 CDN，但属于第三方请求。

没有付费服务器、数据库、对象存储或后端运行时。

## 是否需要后端

明确结论：**继续保持纯静态，不增加后端。**

理由：

1. 当前功能都是内容展示、搜索、RSS、SEO、外链和联系入口，静态站足够。
2. 单人内容管理不值得维护公网后台、数据库、认证和上传接口。
3. 上传和导入可以放到本地工具或 GitHub 网页完成。
4. 任意 URL 抓取不应在访客访问时实时执行，避免安全、版权、CORS、稳定性和费用问题。

只有未来出现以下需求，才考虑 Serverless：

- 需要公开表单并防 spam；
- 需要私密内容权限；
- 需要多人协作审核流；
- 需要实时订阅或动态查询。

即便如此，也优先 Serverless，不上完整后端。

## 尚未验证事项

- 本机 Ruby/Bundler 当前不在 PATH，`bundle exec jekyll build` 未能执行。
- Playwright 浏览器二进制缺失，未做真实浏览器 Network 面板截图。
- 当前 `_site` 缺 Pagefind 输出目录，未验证本地搜索 UI。
- 线上 GitHub Pages 实际页面未联网访问核验。
