# 公开技术身份内容优先级计划

审计日期：2026-07-20

## 目标

把当前网站收敛成一个面向 AI 技术负责人、招聘经理、创始人和高级工程师面试官的公开技术身份站。

核心路径：

**Projects → Writing → Notes → About → Contact**

## 保留清单

- Jekyll / Liquid / Markdown / 原生 JS / 手写 CSS
- 双语机制
- Pagefind 搜索
- RSS / sitemap / SEO / OG
- 数字花园三层结构：Posts / Notes / TIL
- 真实、克制、长期可维护的写作风格
- 以 `LLM Systems + Enterprise Agent Platforms` 为中心的公开路线

## 强化清单

| 内容 | 当前状态 | 目标 |
|---|---|---|
| 首页 Hero | 有方向，但还不够聚焦 | 直接说明公开技术身份 |
| Flagship Platform | 不足 | 1 个长期旗舰叙事中心 |
| Supporting Case Studies | 不足 | 只展示真实可验证案例 |
| Engineering Focus | 偏泛 | 对齐 LLM Systems / Agent Runtime / Context / Evaluation / Production |
| Featured Writing | 有，但主题不够集中 | 3-5 篇正式文章 |
| Contact | 存在但不够收口 | 成为稳定终点 |
| Projects | 构建记录 | 案例库 |

## 隐藏或降级清单

- Teaching
- TIL
- Thoughts / Tags
- Uses
- Archive

这些可以保留，但应进入 Writing、Notes 或页脚二级入口，不应作为一级导航核心。

## P0 问题

| 问题 | 现状 | 为什么重要 |
|---|---|---|
| Projects 还不是完整案例库 | 目前只有一个可验证项目线索 | 不能证明系统设计能力 |
| 旗舰平台证据不足 | 现在只有路线与边界，没有完整证据 | 不能证明工程交付 |
| 支撑案例数量不足 | `EduRAG` 和 `SmartOrderingAgent` 还未验证 | 公开身份路径不完整 |
| 测试/评测/运行证据不足 | 只有理念和部分问题陈述 | 面试官无法判断可靠性 |
| 首页没有形成旗舰平台优先序列 | 仍容易被一般写作与笔记分散 | 公开身份主线不够强 |

## P1 问题

| 问题 | 处理方向 |
|---|---|
| Writing 缺 Start Here | 增加主题导读 |
| About 偏说明页 | 压缩为定位、方法、当前关注、联系 |
| 导航过多 | 收敛到 Projects / Writing / Notes / About / Search / Contact |
| 中英文内容不均衡 | 保证首页、About、系统卡、核心文章有双语基础 |

## P2 问题

- Notes 继续积累 Agent / runtime / context / eval / production 主题
- TIL 保持小而具体
- Teaching 继续作为学习路径，但降级
- Uses / Archive 保留为辅助入口

## 用户需要补充的事实

这些事实必须由用户提供，Codex 不能编造：

- 3 个核心项目的真实情况
- 个人在每个项目中的工作范围
- 项目仓库 / Demo / 截图 / 文档链接
- 测试、评测、运行结果
- 可公开边界
- 可选 LinkedIn

## 最小公开身份结构

### Home

1. Hero
2. Flagship Platform
3. Supporting Case Studies
4. Engineering Focus
5. Featured Writing
6. Contact CTA
7. Footer

### Projects

1. 旗舰系统
2. 支撑案例
3. 参考基线
4. 实验 / 归档

### Writing

1. Start Here
2. LLM Systems
3. Agent Runtime
4. Context and Knowledge
5. Evaluation and Reliability
6. Production Engineering

### Notes

1. Learning Notes
2. TIL
3. Technical Experiments
4. Tags / Search / Backlinks

### About

1. 当前定位
2. 构建什么
3. 工程方法
4. 当前关注
5. 联系方式

### Contact

- GitHub
- Email
- 可选 LinkedIn

## 文件级后续修改范围

| 文件 | 方向 |
|---|---|
| `_includes/sidebar.html` | 收敛导航 |
| `index.html` | 改成首页蓝图 |
| `projects.html` | 改成案例库结构 |
| `about.md` | 压缩为公开技术身份说明 |
| `archive.html` | 降级为 Writing 辅助入口 |
| `notes.html` / `til.html` | 保留为积累层 |

## 验收标准

- 首页 30 秒能看懂公开技术身份
- Projects 具备案例结构
- 至少 1 个项目有详情页
- Writing 有主题入口
- Contact 可稳定到达
- 没有公开简历、学校、公司、精确时间等敏感信息
