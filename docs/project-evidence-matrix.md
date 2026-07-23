# 项目证据矩阵

## 说明

本矩阵只记录当前仓库能验证的事实。未验证内容标记为“尚未验证”或“未实现”。不得把 README 声明、规划文档或 mock 测试包装成已完成能力。

## 仓库核验快照

| 项目 | 根目录 | 分支 | Git 状态 | 核验结果 |
|---|---|---|---|---|
| DeepAgents 药企数据 Agent | `D:\deepagent_search` | `master` | `A CODE_AUDIT_REPORT.md`，`?? PRODUCT_ROADMAP.md` | 已读取代码；health 通过；agent 核心链路未验证 |
| EduRAG / StuckToShip | `C:\Users\Admin（无密码）\Music\还原各种课程项目\EduRAG项目\edu-rag` | `agent-course-rag-mvp` | clean | 已读取代码；46 个代表性测试通过；32 条 route eval 通过；服务 health 未完成 |
| SmartOrderingAgent | 等待路径 | 尚未验证 | 尚未验证 | 未读取 |
| Digital Employee System | `D:\daoson_website` 内容 | `main` | 网站仓库有既有未提交修改 | 只有文章和项目数据，非实现案例 |

## 当前项目组合

| 项目 | 角色 | 当前真实状态 | 是否可作为已完成首页案例 |
|---|---|---|---|
| Enterprise Agent Runtime & Evaluation Platform | Current Build / Long-term Flagship | 规划 + 可复用能力候选 | 否 |
| Digital Employee System | Research Agenda / System Thesis | 有项目数据和中英文文章，缺实现证据 | 否 |
| EduRAG / StuckToShip | 最强候选案例 | Validated Prototype candidate；需确认来源/所有权和服务运行 | 暂否 |
| DeepAgents 药企数据 Agent | 候选支撑案例 | In Development；API health 通过但 agent 链路未验证 | 否 |
| SmartOrderingAgent | 候选支撑案例 | 等待路径 | 否 |

## 六项能力证据

| 能力 | 当前真实证据 | 缺口 |
|---|---|---|
| Agent Systems | `EduRAG` 有 LangGraph workflow、state、retry planning、MemorySaver；`DeepAgents` 有主 agent、DB sub-agent 和工具列表；`Digital Employee` 有系统 thesis | 企业 Agent Runtime、human approval、audit、真实恢复链路未完成 |
| Agent Evals & Reliability | `EduRAG` 32 条 route eval 结果 32/32；46 个代表性测试通过；`DeepAgents` 有 5 条关键词 eval 脚本但未执行 | task success、tool selection accuracy、argument accuracy、trajectory quality、cost/latency、bad case、regression 报告不足 |
| Context & Knowledge Systems | `EduRAG` 有 course/code/error/FAQ/learning_path routing、citations、ACL、prompt injection guard、retrieval adapters | 真实 Milvus 服务、本轮外部 LLM 生成质量、permission filtering 实战数据未验证 |
| Applied Model Engineering | `EduRAG` / `DeepAgents` 有 OpenAI-compatible LLM config 和 fallback 逻辑 | dataset、SFT/QLoRA、model serving、routing、fallback eval 未公开 |
| Production AI Engineering | `EduRAG` 有 FastAPI、SSE、SQLite、API key middleware、Dockerfile、production compose；`DeepAgents` API health 通过 | EduRAG 本轮 health 未完成；DeepAgents 业务 API 未接 agent；CI/CD、metrics、distributed trace 未验证 |
| Applied AI Delivery | `EduRAG` 有课程助教场景和 Web UI；DeepAgents 有 pharma 模拟 SQL 场景 | 真实用户、部署、业务结果、完整 demo 未验证 |

## Flagship：Enterprise Agent Runtime & Evaluation Platform

| 字段 | 内容 |
|---|---|
| 公开名称 | Enterprise Agent Runtime & Evaluation Platform |
| 中文名称 | 企业级 Agent Runtime 与评估平台 |
| 当前分类 | Current Build / Long-term Flagship |
| 当前状态 | 规划 + 可复用能力候选 |
| 已经完成 | 否 |
| 正在开发 | 尚未发现独立平台仓库 |
| 可以从现有项目复用 | EduRAG 的 eval、trace、retrieval gate、API security；DeepAgents 的 SQL tool use / DB sub-agent；Digital Employee 的问题定义 |
| 只有规划 | 统一 Model Layer、Agent Runtime、Evaluation dashboard、Governance |
| 尚未实现 | 独立平台、Demo、统一 Repo、完整 eval 系统、可观测性、安全治理 |
| 测试状态 | 平台级测试未实现 |
| 评估状态 | 平台级评估未实现 |
| 运行状态 | 平台未运行 |
| 网站展示限制 | 只能放 Current Build / Research Agenda，不能放 Flagship System |

## Platform Module Maturity

| 模块 | 当前代码来源 | 可复用项目 | 已存在能力 | 缺失能力 | 测试状态 | 评估状态 | 运行状态 | 进入网站前 P0 条件 |
|---|---|---|---|---|---|---|---|---|
| Model Layer | 未发现独立平台代码 | EduRAG / DeepAgents | LLM config、OpenAI-compatible 调用 | model routing、fallback policy、serving | 项目局部测试 | 未实现 | 未验证 | 公开模型调用边界和 fallback 证据 |
| Agent Runtime | 未发现独立平台代码 | EduRAG / DeepAgents | LangGraph state/retry；DeepAgents sub-agent | 统一 execution loop、human approval、audit、recovery | EduRAG 局部测试通过 | 未实现 | 平台未运行 | 至少一条平台核心 loop 可运行 |
| Context & Data | EduRAG | EduRAG | routing、citations、ACL、prompt injection guard | production vector service、permission filtering demo | 代表性测试通过 | 部分 route eval | HTTP health 未完成 | 跑通真实 QA 流程 |
| Evaluation | EduRAG / DeepAgents eval 脚本 | EduRAG | 32 条 route eval；retrieval tests | task success、tool/argument accuracy、trajectory quality、cost/latency | 部分通过 | route eval 通过 | CLI eval 可运行 | 做一个 30-50 条真实 eval 闭环 |
| Production Engineering | EduRAG / DeepAgents | EduRAG | FastAPI、SSE、Docker、API key、health route；DeepAgents health 通过 | CI/CD、metrics、trace、rate limit、deployment proof | 部分通过 | 不适用 | EduRAG health 未完成 | 提供可复现本地运行记录 |
| Security & Governance | EduRAG / 隐私文档 | EduRAG | API key、ACL、prompt injection guard、隐私边界 | approval、audit、secret handling report | 部分通过 | 未实现 | 部分验证 | 上线前隐私和密钥检查 |

## 支撑案例能力矩阵

| 案例 | Agent Runtime | Tool Use | SQL / Data Agent | RAG | Context Engineering | Evaluation | Backend | Full-stack Delivery | Testing | Observability | Deployment |
|---|---|---|---|---|---|---|---|---|---|---|---|
| DeepAgents 药企数据 Agent | 部分实现：DeepAgents main/sub-agent；未运行验证 | 代码中存在 MySQL tools | 部分实现：schema + SELECT tools + prompt 规则 | 不适用 | 弱：prompt 内表结构和查询上下文 | 只有 5 条脚本，未执行 | FastAPI health 已运行验证 | 无前端 | 静态解析通过；无 pytest | trace 未实现 | 未验证 |
| EduRAG / StuckToShip | 部分实现：LangGraph workflow、state、retry、MemorySaver | 不适用或弱 | 不适用 | 代码中存在；真实向量服务未验证 | 存在 citations、ACL、prompt injection、context trimming | 32/32 route eval；46 个代表性测试通过 | FastAPI、SSE、API key | Web UI 存在；未浏览器验证 | 代表性测试通过；全量测试超时 | trace 字段和 preview 存在 | Docker/compose 模板存在；未部署 |
| SmartOrderingAgent | 尚未验证 | 尚未验证 | 尚未验证 | 尚未验证 | 尚未验证 | 尚未验证 | 尚未验证 | 尚未验证 | 尚未验证 | 尚未验证 | 尚未验证 |
| Digital Employee System | 概念证据 | 概念证据 | 不适用 | 未实现 | 概念证据 | 概念证据 | 未实现 | 未实现 | 未实现 | 未实现 | 未实现 |

## 项目状态判定

| 项目 | 状态 |
|---|---|
| EduRAG / StuckToShip | `Validated Prototype candidate`，公开前需确认来源/所有权和服务运行 |
| DeepAgents 药企数据 Agent | `In Development` |
| SmartOrderingAgent | `尚未验证` |
| Digital Employee System | `Research Agenda / System Thesis` |
| Enterprise Agent Runtime & Evaluation Platform | `Current Build / Long-term Flagship` |

## Writing 对应矩阵

| 内容 | Agent Systems | Agent Evals | RAG & Context | Model Engineering | Production AI | 首页推荐 |
|---|---|---|---|---|---|---|
| 我为什么在构建数字员工系统 | 强，作为 thesis | 中，作为问题定义 | 弱 | 无 | 弱 | 是，但不能替代项目证据 |
| Why I’m Building a Digital Employee System | 强，作为 thesis | 中，作为问题定义 | 弱 | 无 | 弱 | 是，但不能替代项目证据 |
| EduRAG case study | 待写 | 强候选 | 强候选 | 弱 | 中 | 应优先补 |
| DeepAgents eval note | 强候选 | 强候选 | 不适用 | 弱 | 中 | 应在链路跑通后补 |
| 代码可读性的本质是什么 | 无 | 无 | 无 | 无 | 工程判断辅助 | 可作为辅助 |

## 最小评估闭环建议

最适合优先补齐评估闭环的项目：`EduRAG / StuckToShip`。

理由：

- 已有 32 条 eval 数据和 CLI。
- 已有 route accuracy 输出。
- 已有 retrieval/evidence/graph/API 测试。
- 最小扩展路径清楚：从 route eval 扩展到 answer quality、citation correctness、bad case、latency 和 regression。

`DeepAgents` 适合作为第二个 eval 闭环，因为它有 5 条业务问题和关键词验收脚本，但需要先跑通 DB + LLM + agent 调用链。

## 结论

当前不存在可作为首页第二屏 `Flagship System` 的项目，也没有项目完全达到完整首页案例标准。`EduRAG / StuckToShip` 是最接近标准的项目；`DeepAgents` 是有明确补齐路径的第二候选；`Digital Employee System` 只作为研究命题；`SmartOrderingAgent` 等待路径。
