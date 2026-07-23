# 外部内容导入与展示方案

## 结论

外部文章不要默认全文嵌入。当前站点最稳的做法是：

1. 自己拥有版权或已获授权的内容，保存为本地 Markdown。
2. 其他平台内容，优先做外部链接卡片。
3. 只有平台明确支持时，使用官方嵌入。
4. URL 自动导入只在本地构建前执行，必须人工确认后才发布。

**“输入任意文章 URL 并在网站内完整展示全文”不可靠，也不应该作为公开网站运行时功能。**

## 当前基础

当前已有外部发布索引：

```text
_data/elsewhere.yml
```

当前内容为：

```yaml
[]
```

README 和 `CONTENT_SCHEMA.md` 已明确：外部发布只做索引，不爬取、不复制全文、不绕过平台限制。

新导入内容默认服务中文站：公开作者名使用 **本杰铭**，默认 `lang: zh`。已有英文内容和双语机制属于后续生产页面清理范围，本轮不修改。

## 三种展示模式

### 模式一：本地全文

适用：

- 自己原创；
- 已获得授权；
- 需要进入本站搜索、标签、RSS 和关联文章；
- 原平台可能失效，希望本站保留长期版本。

存储：

```text
_posts/YYYY-MM-DD-slug.md
assets/img/posts/slug/
```

Front Matter：

```yaml
title: "文章标题"
slug: "safe-slug"
summary: "一句话摘要"
category: "Agent Systems"
tags: [Agent, Evals]
published_at: 2026-07-22
updated_at: 2026-07-22
content_mode: local
source_platform: "微信公众号"
source_url: "https://..."
canonical_url: "https://..."
cover: "/assets/img/posts/slug/cover.webp"
featured: false
visibility: public
lang: zh
```

优点：

- 可搜索；
- 可归档；
- 可内链；
- 可被 RSS 收录；
- 不依赖原平台渲染。

风险：

- 版权；
- 图片授权；
- 原文更新后本站过期；
- 仓库体积增长。

### 模式二：外部链接卡片

适用：

- 文章在其他平台发表；
- 不适合复制全文；
- 想在本站建立统一作品索引；
- 原平台有登录墙或动态渲染。

存储：

```text
_data/elsewhere.yml
```

数据：

```yaml
- title: "外部文章标题"
  summary: "为本站写的一句话摘要，不复制平台正文。"
  platform: "知乎"
  url: "https://..."
  published_at: 2026-07-22
  date: 2026-07-22
  category: article
  type: article
  tags: ["Agent", "Evals"]
  language: zh
  content_mode: external
  cover: "/assets/img/covers/example.webp"
```

优点：

- 零版权风险或低风险；
- 零抓取成本；
- 不受 CORS / X-Frame-Options 影响；
- 对仓库体积友好。

缺点：

- 不能全文搜索；
- 原平台失效会断链；
- 站内只证明“发表索引”，不证明完整内容沉淀。

### 模式三：官方嵌入

适用：

- 视频平台官方 iframe；
- GitHub Gist；
- CodePen / StackBlitz / Observable 等演示；
- 明确支持 oEmbed 的内容。

存储：

```yaml
content_mode: embed
embed_url: "https://..."
source_platform: "YouTube"
source_url: "https://..."
```

原则：

- 只用官方 embed。
- iframe 使用白名单域名。
- 不嵌入任意网页。
- 不把 embed 当成本地全文。

## 任意网页全文嵌入的限制

输入任意文章 URL 并在网站内完整展示全文不可靠，原因包括：

- CORS 阻止浏览器读取跨域内容；
- CSP 限制资源加载；
- `X-Frame-Options` 禁止 iframe；
- 登录墙；
- 付费墙；
- JavaScript 动态渲染；
- 防爬；
- 防盗链；
- 图片热链失效；
- 原文版权；
- 原文删除或 URL 变更；
- 平台反自动化；
- 抓取结果结构不稳定。

因此不要做“访客打开页面时实时抓取外部 URL”。这会把静态站变成不稳定代理服务，还引入安全和版权问题。

## URL 自动导入流程

导入只在本地或构建前执行：

```text
用户输入 URL
→ 本地脚本获取网页
→ 提取标题和正文
→ 尝试提取图片
→ 转换为 Markdown
→ 保存 source_url / source_platform
→ 生成预览
→ 人工确认
→ 写入 _posts 或 _data/elsewhere.yml
→ Jekyll build
→ Pagefind build
→ git diff
→ 人工确认发布
```

不得在访客访问页面时实时执行。

## 是否适合新增 `scripts/import_article.py`

适合，但不要现在就做公网功能。

`scripts/import_article.py` 的定位应是本地辅助工具：

```powershell
python scripts/import_article.py --url "https://example.com/article"
python scripts/import_article.py --file ".\article.md" --source-url "https://example.com/original"
python scripts/import_article.py --manual --title "手动粘贴文章"
```

输出到：

```text
tmp/imports/YYYY-MM-DD-<slug>.md
```

人工确认后再移动到：

```text
_posts/
assets/img/posts/<slug>/
```

如果当前不想引入 Python 依赖，也可以先做 Node 版本。考虑网页解析和编码处理，Python 更适合 URL 导入；考虑站点已有 Node 可用，Node 更适合本地管理 UI。两者可以分工，不需要统一成一个大系统。

## 导入脚本必须处理的问题

| 问题 | 处理策略 |
|---|---|
| 网页无法访问 | 生成外部链接卡片草稿 |
| 正文提取不完整 | 停在预览，不自动发布 |
| JavaScript 动态页面 | 提示手动粘贴 Markdown/TXT |
| 登录限制 | 不绕过，改用链接卡片 |
| 微信公众号 | 优先手动粘贴；注意版权和图片防盗链 |
| 知乎 | 优先链接卡片；全文导入需确认版权 |
| CSDN | 优先链接卡片；注意广告和 HTML 清洗 |
| 图片防盗链 | 下载失败则保留原文链接或要求手动上传 |
| 重复文章 | 根据 canonical_url / source_url / slug 检查 |
| 编码问题 | 自动检测，失败则要求手动粘贴 |
| HTML 清洗 | 白名单转换为 Markdown |
| 标题冲突 | 自动追加短 hash，人工确认 |
| 原文更新 | 保留 `source_url` 和 `imported_at`，不自动覆盖 |
| 手动兜底 | 支持上传 Markdown/TXT |

## 人工确认步骤

导入后必须展示：

- 标题；
- 摘要；
- 原文 URL；
- 识别的平台；
- 提取正文预览；
- 图片清单；
- 文件将写入的位置；
- slug；
- Front Matter；
- 版权和可公开确认项。

用户确认前不写入 `_posts`，不进入首页，不进入 RSS，不进入 Pagefind。

## 统一内容数据模型

正式内容至少支持：

```yaml
title: "标题"
slug: "safe-slug"
summary: "一句话摘要"
category: "Agent Systems"
tags: [Agent, Evals]
published_at: 2026-07-22
updated_at: 2026-07-22
content_mode: local
source_platform: ""
source_url: ""
canonical_url: ""
cover: ""
featured: false
visibility: public
lang: zh
```

`content_mode` 只允许：

- `local`
- `external`
- `embed`

兼容当前 `CONTENT_SCHEMA.md`：

- `title` 对应现有必填 `title`。
- `summary` 可映射到现有 `description`，避免两套摘要长期分裂。
- `published_at` 可映射到 Jekyll `date`。
- `lang` 保持现有规则，但新定位要求网站全部中文，后续应停止新增英文公开 UI 和英文文章。
- `source_url`、`source_platform` 可作为新增可选字段。

最少改动建议：

```yaml
title: "标题"
date: 2026-07-22 10:00:00 +0800
description: "一句话摘要"
tags: [Agent, Evals]
lang: zh
content_mode: local
source_platform: ""
source_url: ""
canonical_url: ""
featured: false
visibility: public
```

## 项目案例 Schema

项目案例可继续使用 `_projects/*.md` 或 `_data/projects.yml`，不和文章强行共用模型。

建议字段：

```yaml
title: "项目名称"
slug: "project-slug"
summary: "一句话说明"
status: in-development
source_type: personal-research
featured: false
visibility: public
repo_url: ""
demo_url: ""
evidence:
  tests: ""
  evals: ""
  screenshots: []
```

## Notes Schema

Notes 保持轻量：

```yaml
title: "笔记标题"
date: 2026-07-22
updated: 2026-07-22
description: "说明"
tags: [Agent]
status: seedling
lang: zh
```

不需要把所有外部来源字段塞进 Notes。

## 网站展示规则

| content_mode | 展示方式 | 搜索 | RSS | 风险 |
|---|---|---|---|---|
| local | 本站全文页面 | 是 | 是 | 版权和仓库体积 |
| external | 链接卡片，跳转原平台 | 只搜标题摘要 | 可选 | 断链 |
| embed | 官方嵌入块 | 只搜标题摘要 | 可选 | 平台加载失败 |

首页只推荐：

- `local` 的高质量正式文章；
- 少量 `external` 代表性链接；
- 不推荐未经确认的自动导入草稿。

## 安全红线

禁止：

1. 前端保存 GitHub PAT。
2. 公开 `/admin` 调 GitHub API 写文件。
3. 无认证上传。
4. 用户可控路径写入。
5. 任意 HTML 直接渲染。
6. 未验证 MIME 上传。
7. 提交 `.env`、数据库、密钥。
8. 自动导入后直接发布。
9. 后台代理实时抓任意网页。
10. 为上传功能引入数据库和云服务器。

## 最小实施顺序

1. 已用 `_data/elsewhere.yml` 管外部链接卡片。
2. 已新增 `scripts/new_content.py`，用于追加外部链接数据。
3. 已新增 `scripts/import_article.py`，只输出到 `tmp/imports/`，等待人工确认。
4. 已新增 `scripts/validate_content.py`，防止未确认导入草稿进入正式推荐内容。
5. 后续只有在内容维护频率变高时，才考虑本地内容管理器 UI。

公网后端不进入当前路线。
