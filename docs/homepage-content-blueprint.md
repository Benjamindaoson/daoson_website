# 首页内容蓝图

## 首页目标

首页只做一件事：

**让合适的人在 30 秒内知道我专注 Agent Systems、Evals 和可靠 AI 应用工程，并能进入已核验项目、技术文章或安全联系入口。**

本轮已经读取真实仓库后，首页仍然不能使用 `Flagship System` 模块。

## 当前阶段首页结构

必须使用：

```text
Hero
→ Selected Case Studies
→ Core Expertise
→ Featured Writing
→ Current Build / Research Agenda
→ Contact
→ Footer
```

不得使用：

```text
Hero
→ Flagship System
→ Selected Case Studies
```

原因：`Enterprise Agent Runtime & Evaluation Platform` 当前仍是 `Current Build / Long-term Flagship`，没有独立平台代码、可运行核心链路、平台测试/评估和公开 Demo。

## Flagship System 升级条件

只有当 `Enterprise Agent Runtime & Evaluation Platform` 同时满足以下条件后，才能升级为首页 `Flagship System`：

1. 存在独立代码。
2. 至少一条核心执行链路可运行。
3. 系统架构能够由真实代码支持。
4. 存在测试或评估。
5. 存在截图、Demo、运行记录或公开仓库。
6. 已完成能力与规划能力边界明确。
7. 状态达到 `Validated Prototype`。

## 1. Hero

### 信息目标

- 当前头衔：`AI Engineer focused on Agent Systems, Evals, and reliable AI applications.`
- 不使用 `Senior`、`Architect`、`Expert` 作为当前首页主头衔。
- 不放学校、公司、工作年限、PDF 简历或完整履历。
- CTA 指向 Projects、Writing、Contact。

### 推荐文案骨架

中文：

```text
专注于 Agent 系统、评估与可靠 AI 应用工程的 AI 工程师。

我关注 Agent execution loop、tool use、state recovery、evaluation、context engineering，以及从原型走向可验证 AI 应用的工程过程。
```

英文：

```text
AI Engineer focused on Agent Systems, Evals, and reliable AI applications.

I work on agent execution loops, tool use, state recovery, evaluation, context engineering, and the engineering path from prototype to verifiable AI application.
```

CTA：

- Projects
- Writing
- Contact

## 2. Selected Case Studies

### 当前核验结论

严格按照“真实代码 + 来源边界 + 可运行/替代证据 + 测试或评估 + 可公开证据 + 限制”标准，当前没有项目已经完全达到完整首页案例标准。

最接近首页案例标准的是：

1. `EduRAG / StuckToShip`
2. `DeepAgents 药企数据 Agent`

`SmartOrderingAgent` 因路径缺失，仍不能进入首页候选展示。

### 阶段性展示建议

在生产页面真正改造前，首页应采用保守表达：

```text
Selected Case Studies

Verified case studies are being prepared. Current repository verification found one strongest candidate and one in-development build.
```

若必须展示项目卡片，只能使用以下证据等级：

| 项目 | 首页位置建议 | 状态 | 是否可作为完整案例 |
|---|---|---|---|
| EduRAG / StuckToShip | 第一候选 | Validated Prototype candidate | 否，需确认来源/所有权并补运行 Demo |
| DeepAgents 药企数据 Agent | Other Build / Lab | In Development | 否，API 未接入 agent 核心链路 |
| SmartOrderingAgent | 暂不展示 | 等待路径 | 否 |
| Digital Employee System | Current Build / Research Agenda | Research Agenda / System Thesis | 否 |

### 项目卡片固定结构

```text
项目名称

一句话说明解决的问题。

系统方案：
一句话说明系统如何处理问题。

我的工作：
架构 / 后端 / Agent / RAG / 测试 / 部署。

状态：
Working Demo / Validated Prototype / In Development / Archived

证据：
Case Study / Architecture / Demo / Repository / Test / Eval
```

标签最多四个，不写框架清单。

## 3. Core Expertise

首页采用“两主三辅”，但每项必须连接真实项目或文章。

### 核心一：Agent Systems

当前证据：

- `DeepAgents`：DeepAgents 主 agent、DB sub-agent、MySQL tools、prompt 规则存在；未验证完整 agent 执行。
- `EduRAG`：LangGraph workflow、state、retry planning、MemorySaver checkpointer 存在；不是企业 Agent Runtime。
- `Digital Employee System`：问题定义和系统 thesis。

限制：没有可公开的企业 Agent Runtime 平台。

### 核心二：Evals & Reliability

当前证据：

- `EduRAG`：32 条 route eval，结果 32/32；代表性测试 46 个通过；retrieval/evidence/API/graph 测试存在。
- `DeepAgents`：5 条关键词验收脚本存在，但未执行。
- `Digital Employee System`：文章讨论评估、恢复、监督。

限制：尚无完整 Agent task success、tool accuracy、argument accuracy、trajectory quality、cost / latency 闭环。

### 支撑一：Context & Knowledge

当前证据：

- `EduRAG`：course/code/error/FAQ/learning path routing、citations、ACL、prompt injection guard、retrieval adapters、architecture SVG。

限制：本轮未验证真实 Milvus 检索服务和外部 LLM 生成质量。

### 支撑二：Applied Model Engineering

当前证据：

- 仅有 LLM config、OpenAI-compatible model 调用和 mock fallback。

限制：没有 dataset、SFT、QLoRA、model serving、routing、fallback 的真实项目证据。

### 支撑三：Production AI Engineering

当前证据：

- `EduRAG`：FastAPI、SSE、SQLite、API key middleware、Dockerfile、docker-compose production template。
- `DeepAgents`：FastAPI health check 通过。

限制：`EduRAG` 本轮 uvicorn startup 未完成 health check；`DeepAgents` 业务 API 未接入 agent。

## 4. Featured Writing

首页只放 3-5 篇人工选择文章。

当前可推荐：

| 文章 | 作用 | 首页推荐等级 |
|---|---|---|
| 我为什么在构建数字员工系统 | Agent Systems / System Thesis | 推荐，但标注为研究命题 |
| Why I’m Building a Digital Employee System | 英文同题 | 推荐，但标注为研究命题 |
| 代码可读性的本质是什么 | 工程判断辅助 | 可作为辅助 |
| Vite / CSS / ESM / esbuild 内容 | 前端工程背景 | 不作为 AI 主线推荐 |

需要补：

- EduRAG case study / eval note。
- DeepAgents tool-use eval note。
- Agent eval 最小闭环文章。

## 5. Current Build / Research Agenda

### Enterprise Agent Runtime & Evaluation Platform

分类：`Current Build / Long-term Flagship`

当前只能描述为长期构建方向，不得称为 Working Demo、Validated Prototype 或已完成旗舰项目。

已可复用候选：

- `EduRAG` 的 eval dataset、route eval、retrieval gate、trace 和 API 安全边界。
- `DeepAgents` 的 SQL tool use、DB sub-agent 和 pharma 模拟数据分析场景。
- `Digital Employee System` 的问题定义。

### Digital Employee System

分类：`Research Agenda / System Thesis`

它能够证明：

- 对企业 Agent 系统问题的持续关注；
- 对工具可靠性、状态恢复、人类确认和协作流程的问题定义；
- 系统化技术表达能力。

它不能证明：

- Agent Runtime 已实现；
- 状态恢复已实现；
- Human Approval 已实现；
- Agent Evals 已实现；
- 企业级平台已经存在。

## 6. Contact

允许：

- GitHub
- Email
- 可选 LinkedIn

不允许：

- Resume 下载
- 手机
- 微信
- 地址
- 学校 / 公司 / 完整履历

## 尚不能写入页面的内容

- “旗舰平台已完成”
- “企业级生产系统”
- “服务真实客户”
- “DeepAgents 已完成自动评估闭环”
- “EduRAG 已生产部署”
- “SmartOrderingAgent 已核验”
