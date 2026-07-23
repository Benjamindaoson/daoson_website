# 公开技术身份架构

## 正式网站定位

这个网站不是公开简历站，也不是完整求职档案。

它的正式定位是：

**一个以 Agent Systems 与 Evals 项目证据为核心、以技术写作为第二证明、以数字花园为长期知识基础的公开技术身份。**

近期公开定位：

**AI Engineer focused on Agent Systems, Evals, and reliable AI applications.**

中文：

**专注于 Agent 系统、评估与可靠 AI 应用工程的 AI 工程师。**

长期方向：

**AI Application Architect · Agent Systems · Evals · Model Engineering**

长期方向只作为后续升级目标，不作为当前首页主头衔。

## 公开与不公开边界

公开：

- AI 工程方向。
- 已核验的项目证据。
- 系统架构、测试、评估、限制和复盘。
- 技术文章和笔记。
- GitHub、职业邮箱和安全联系入口。

不公开：

- 完整简历。
- PDF 简历。
- 学校、专业、任职公司。
- 精确工作时间。
- 手机、微信、地址。
- 证书编号。
- 客户名称。
- 内部项目名称。
- 可推断完整职业轨迹的信息。

## 一级导航

目标一级导航：

- Projects
- Writing
- Notes
- About
- Search
- Contact
- 中文 / EN

姓名或 Logo 返回首页，不单独设置 Home。

以下内容不进入一级导航：

- Resume
- Experience
- Education
- Certificates
- Skills
- Teaching
- TIL
- Thoughts
- Tags
- Uses
- Archive

## 二级结构

```text
Writing
├── Start Here
├── Agent Systems
├── Agent Evals
├── RAG & Context Engineering
├── Applied Model Engineering
├── Production AI
└── Archive

Notes
├── Latest
├── TIL
├── Tags
├── Backlinks
└── Archive

Footer
├── Uses
├── Teaching
├── RSS
└── GitHub
```

## 当前阶段首页结构

当前必须使用：

```text
Hero
→ Selected Case Studies
→ Core Expertise
→ Featured Writing
→ Current Build / Research Agenda
→ Contact
→ Footer
```

当前不得使用：

```text
Hero
→ Flagship System
→ Selected Case Studies
```

原因：`Enterprise Agent Runtime & Evaluation Platform` 当前只是 `Current Build / Long-term Flagship`，没有达到 `Validated Prototype`。

## Flagship System 升级条件

`Enterprise Agent Runtime & Evaluation Platform` 只有同时满足以下条件后，才能升级为首页 `Flagship System`：

1. 存在独立代码。
2. 至少一条核心执行链路可运行。
3. 系统架构能够由真实代码支持。
4. 存在测试或评估。
5. 存在截图、Demo、运行记录或公开仓库。
6. 已完成能力与规划能力边界明确。
7. 状态达到 `Validated Prototype`。

## 项目证据等级

不得把以下证据等级混为一类：

| 等级 | 当前对象 | 说明 |
|---|---|---|
| Research Agenda / System Thesis | Digital Employee System | 网站中只有项目数据和中英文文章，未发现独立系统代码、测试、评估、Demo 或仓库 |
| Current Build / Long-term Flagship | Enterprise Agent Runtime & Evaluation Platform | 长期平台方向，当前不能放首页 Flagship System |
| Candidate Case Study — strongest verified candidate | EduRAG / StuckToShip | 有真实代码、代表性测试、32 条 route eval、架构图和部署模板；需确认来源/所有权并补运行 Demo |
| Candidate Case Study — in development | DeepAgents 药企数据 Agent | 有真实代码、agent / tools / SQL / eval 脚本和 health check；未验证 agent 端到端链路 |
| Candidate Case Study — waiting for path | SmartOrderingAgent | 用户尚未提供路径 |

## Projects 结构

### Featured Case Studies

只放达到完整案例标准的项目。当前严格判断：暂时没有项目完全达标。

优先补齐对象：`EduRAG / StuckToShip`。

### Other Builds

可放已有代码但证据未完全补齐的项目：

- `EduRAG / StuckToShip`：补运行 Demo 前可暂放这里。
- `DeepAgents 药企数据 Agent`：In Development。

### Labs / Research

- `Digital Employee System`：Research Agenda / System Thesis。
- `Enterprise Agent Runtime & Evaluation Platform`：Current Build / Long-term Flagship。
- `SmartOrderingAgent`：等待路径。

## Core Expertise

采用“两主三辅”。

核心：

1. Agent Systems
2. Evals & Reliability

支撑：

3. Context & Knowledge
4. Applied Model Engineering
5. Production AI Engineering

Applied AI Delivery 通过项目案例体现，不单独占首页卡片。

当前证据：

- Agent Systems：EduRAG LangGraph workflow；DeepAgents main/sub-agent；Digital Employee thesis。
- Evals & Reliability：EduRAG 32 条 route eval 和 46 个代表性测试；DeepAgents eval 脚本未执行。
- Context & Knowledge：EduRAG routing、citations、ACL、prompt injection guard。
- Applied Model Engineering：仅有模型调用配置，证据弱。
- Production AI Engineering：EduRAG 和 DeepAgents 的 FastAPI / Docker / health 等局部证据。

## Writing / Notes 分工

Writing：

- Agent Systems
- Agent Evals
- RAG & Context Engineering
- Applied Model Engineering
- Production AI

Notes：

- 学习笔记
- 技术实验
- TIL
- 阅读记录
- 未完成思考

当前最需要补的 Writing：

- EduRAG case study。
- EduRAG eval note。
- DeepAgents tool-use / SQL agent 运行复盘。

## About 结构

只保留：

1. What I Build
2. How I Work
3. Current Focus
4. Contact

不写学校、公司、工作时间线、完整履历、非科班解释、公开简历。

## Contact 结构

保持极简：

- Email
- GitHub
- 可选 LinkedIn

LinkedIn 只有在用户接受其公开履历风险时才放。

## 中英文策略

核心页面保持中英文一致：

- Home
- Projects
- Writing
- About
- Contact

项目案例可先用中文写完整事实底稿，再补英文摘要。英文不能夸大中文尚未验证的能力。

## 结论

公开身份结构方向正确，但当前证据仍处在候选案例阶段。现阶段不进入 V0；先把 `EduRAG / StuckToShip` 补成第一个完整公开案例，再决定首页 Selected Case Studies。
