# 零成本内容管理方案

## 最终推荐架构

**保持纯静态网站，用 Git 管内容，用本地工具辅助生成文件，不增加公网后端。**

公开内容默认按用户指定的中文站处理：站点公开名为 **本杰铭**，新增内容默认 `lang: zh`，不再为了对称新增英文版本。

推荐组合：

1. 日常少量修改：直接编辑 Markdown / YAML。
2. 临时远程修改：使用 GitHub 网页编辑。
3. 批量导入、slug 检查、预览发布：先使用本轮新增的本地命令行脚本；只有内容量明显增加后，再考虑只跑在 `http://127.0.0.1` 的本地内容管理界面。

不需要：

- 公网 `/admin`。
- 数据库。
- 对象存储。
- GitHub PAT 写在前端。
- 付费 CMS。
- 长久在线后端。

## 三种内容管理方案比较

| 方案 | 做法 | 成本 | 复杂度 | 风险 | 推荐 |
|---|---|---:|---:|---|---|
| A：直接编辑 Markdown / YAML | 在 `_posts`、`_notes`、`_til`、`_data` 中编辑 | 0 | 低 | 手动 front matter 容易写错 | 当前主方案 |
| B：GitHub 网页入口 | 在 GitHub 网页编辑文件、上传小图、commit | 0 | 低 | 网页编辑体验一般；不适合批量图片 | 远程兜底 |
| C：本地内容管理器 | 本机 `127.0.0.1` 表单生成 Markdown、复制图片、跑检查 | 0 | 中 | 需要维护脚本；不能部署公网 | 后续最值得做 |

最终推荐：**A + B 先用，C 等内容量上来后再做。**

## 当前内容存储

| 内容 | 当前位置 | 说明 |
|---|---|---|
| 正式文章 | `_posts/*.md` | Jekyll posts |
| 笔记 | `_notes/*.md` | collection |
| 每日所学 | `_til/*.md` | collection |
| 项目数据 | `_data/projects.yml` | 当前项目页数据源 |
| 外部发布索引 | `_data/elsewhere.yml` | 当前为空数组 |
| 页面 | `*.md` / `*.html` | 静态页面 |
| 图片 | `assets/img/` | 静态资源 |
| 搜索索引 | `_site/pagefind/` | 构建产物，不提交 |

## 建议目录规则

```text
_projects/                         # 项目案例 Markdown，已存在
_posts/                            # 正式文章
_notes/                            # 笔记
_til/                              # 每日所学
_data/
  projects.yml                     # 项目索引/摘要
  elsewhere.yml                    # 外部文章链接卡片
  external_posts.yml               # 可选：外部内容统一数据
assets/
  img/
    projects/<slug>/               # 项目图片
    posts/<slug>/                  # 文章图片
    covers/                        # 封面图
  files/
    pdf/                           # 少量必要 PDF
tmp/
  imports/                         # 临时导入文件，不提交
```

说明：当前不必立刻创建所有目录。需要时再建，空目录没有价值。

## 哪些文件适合进 Git

适合：

- Markdown
- YAML / JSON
- 压缩后的图片
- SVG 架构图
- 少量必要 PDF
- 小型示例数据

不适合：

- 视频
- 大型压缩包
- 模型权重
- 数据集
- 数据库文件
- 大量原始高清图片
- `.env`
- Token、密钥、私密文件
- 未脱敏日志

## 文件上传策略

### 当前阶段

文件不是“上传到后端”，而是放入仓库：

```text
本地文件
→ 复制到 assets/img 或 assets/files
→ Markdown / YAML 引用
→ git commit
→ GitHub Actions build
→ GitHub Pages 静态发布
```

GitHub 网页也能上传小文件，但不适合大量图片处理。

### 本地内容管理器阶段

本地工具只在：

```text
http://127.0.0.1
```

运行。它写入本地仓库文件，不部署公网。

功能保持最小：

1. 选择内容类型。
2. 填写标题、摘要、栏目、标签。
3. 上传 Markdown、TXT、图片、少量 PDF。
4. 生成 Front Matter。
5. 生成安全文件名。
6. 检查重复 slug。
7. 图片放入正确目录。
8. 检查失效链接。
9. 本地预览。
10. 执行 Jekyll build。
11. 执行内容 Schema 检查。
12. 执行 Pagefind 构建。
13. 显示 git diff。
14. 用户确认后 commit。
15. 可选 push。

不做：

- 保存 GitHub Token。
- 建数据库。
- 部署公网。
- 多用户权限。
- 所见即所得编辑器。

## 本地工具技术选择

| 选择 | 优点 | 缺点 | 判断 |
|---|---|---|---|
| Ruby 脚本 | 和 Jekyll 同栈，能复用 YAML/front matter 习惯 | Windows PATH 当前不稳定；做文件上传 UI 麻烦 | 不优先 |
| Node.js 工具 | 当前 Node 可用；适合本地小 Web UI、文件处理、链接检查 | 需要少量脚本维护 | 最合适 |
| Python 工具 | 适合 URL 抓取、HTML 清洗、图片处理 | 当前网站不是 Python 栈；依赖容易膨胀 | 适合导入脚本，不适合主 CMS |
| 直接扩展现有脚本 | 最少新增 | PowerShell/Ruby 跨平台体验一般 | 可先做检查脚本 |

当前已落地：**Python 标准库脚本 + 现有 Jekyll / Ruby 构建链路**。

选择 Python 的原因：

- 本轮不安装依赖，Python 标准库足够生成 Markdown、追加 YAML、做基础 URL 导入和内容检查。
- URL 导入和 HTML 清洗用 Python 更直接。
- 脚本只在本机执行，不影响 GitHub Pages 静态部署。

第一版不做 Web UI，先做命令行：

```powershell
python scripts/new_content.py --type post
python scripts/new_content.py --type note
python scripts/new_content.py --type til
python scripts/new_content.py --type external
python scripts/import_article.py --url "https://example.com/article"
python scripts/validate_content.py
```

等确实频繁上传图片和外部文章，再加本地 `127.0.0.1` 页面。

## 文件安全规则

### 文件名清洗

- 只允许小写字母、数字、短横线。
- 中文标题转 slug 时必须人工确认。
- 禁止 `..`、`\`、`/`、绝对路径。
- 同名文件自动提示，不自动覆盖。

### 图片处理

- 图片进入 `assets/img/posts/<slug>/` 或 `assets/img/projects/<slug>/`。
- 自动压缩 JPEG / PNG / WebP。
- 移除 EXIF。
- 单图建议小于 500 KB。
- 封面图建议小于 300 KB。
- 大图保留外链，不进仓库。

### 大文件拦截

建议规则：

- 图片单文件超过 2 MB：拦截或要求压缩。
- PDF 单文件超过 5 MB：拦截。
- 仓库新增总量超过 20 MB：提示人工确认。
- 视频、模型、数据库：直接拒绝。

### MIME 检查

不要只看扩展名。至少检查：

- Markdown / TXT：文本文件。
- 图片：JPEG / PNG / WebP / SVG。
- PDF：application/pdf。

SVG 要当代码审计，避免内嵌脚本。

### HTML 清洗

外部 HTML 导入后不能直接渲染。必须转 Markdown 或经过白名单清洗：

- 保留标题、段落、列表、引用、代码块、链接、图片。
- 删除 script、style、iframe、事件属性、表单。
- 删除未知 embed。

### 隐私检查

发布前检查：

- `.env`
- token / api key
- 手机 / 微信 / 地址
- 私人邮箱
- 学校 / 公司 / 完整履历
- 本机路径
- 图片 EXIF

## Git 忽略规则建议

当前 README 已声明不提交：

```text
.bundle/
.jekyll-cache/
.tmp-npm-cache/
Gemfile.lock
_site/
```

当前已加入：

```text
tmp/
imports/
*.log
*.db
*.sqlite
*.sqlite3
.env
.env.*
```

注意：是否忽略 `Gemfile.lock` 目前沿用项目既有策略，本轮不改。

## 内容发布流程

推荐流程：

```text
创建 Markdown / YAML
→ 放入压缩图片
→ 运行 Python 内容校验
→ 运行 Ruby 内容 schema 检查
→ Jekyll build
→ Pagefind build
→ 本地预览
→ 查看 git diff
→ 人工确认
→ commit
→ push
→ GitHub Actions 构建部署
```

最小命令：

```powershell
node --check assets/js/main.js
python scripts/validate_content.py
ruby scripts/check_content_schema.rb
bundle exec jekyll build
powershell -ExecutionPolicy Bypass -File scripts/build_pagefind.ps1
git diff --check
git status --short
```

## 成本分析

| 项目 | 成本 |
|---|---|
| 持续费用 | 0 |
| 存储增长 | 由 Git 仓库承担，需控制图片/PDF |
| 构建时间 | Markdown 增长影响很小；Pagefind 随内容增加变慢 |
| 仓库体积 | 最大风险来自图片、PDF、误提交大文件 |
| 运维成本 | 低；主要维护脚本和内容规范 |
| 安全成本 | 低；没有公网后台、数据库和上传接口 |
| 使用复杂度 | A 最低，C 中等 |

## 安全策略

明确禁止：

1. 在前端代码中保存 GitHub PAT。
2. 在公开 `/admin` 页面中直接调用 GitHub 写入接口。
3. 无认证上传。
4. 用户可控路径写入。
5. 任意 HTML 直接渲染。
6. 未验证 MIME 文件上传。
7. 把 `.env`、数据库和密钥提交仓库。
8. 自动导入内容后不经人工确认直接发布。
9. 使用后台代理实时抓取任意网页。
10. 为了上传功能引入不必要的数据库和云服务器。

## 分阶段实施计划

### Phase 0：现在

- 继续直接编辑 Markdown / YAML。
- 外部文章只放 `_data/elsewhere.yml` 链接卡片。
- 不做后端。

### Phase 1：最小脚本（已实施）

- 增加 `scripts/new_content.py` 生成文章、笔记、TIL、外部链接和项目数据草稿。
- 增加 `scripts/import_article.py` 生成待人工确认的导入草稿。
- 增加 `scripts/validate_content.py` 做内容安全和结构校验。
- 不做 Web UI。

### Phase 2：本地导入工具

- 支持 Markdown/TXT 上传。
- 支持图片复制、压缩、EXIF 清理。
- 显示 git diff。

### Phase 3：本地 URL 导入

- 增加 `scripts/import_article.py` 或 Node 同等脚本。
- 只在本地执行。
- 抓取后必须人工确认。

### Phase 4：只有需求变复杂时

如果出现多人协作、私密内容、公开表单，再考虑 Serverless。仍不建议完整后端。
