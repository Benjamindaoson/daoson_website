# Professional Positioning Evidence Map

## 公开定位

**AI Engineer focused on Agent Systems, Evals, and reliable AI applications.**

中文：

**专注于 Agent 系统、评估与可靠 AI 应用工程的 AI 工程师。**

## 长期方向

**AI Application Architect · Agent Systems · Evals · Model Engineering**

说明：长期方向不作为当前首页主头衔；在项目证据尚未充分前，不使用 Architect、Senior、Expert 作为公开主头衔。

## 证据链

公开定位 → 所需能力 → 对应项目 → 对应代码 → 对应测试/评估 → 对应文章 → 当前缺口

## 能力证据图

| 公开定位 | 所需能力 | 对应项目 | 对应代码 | 对应测试/评估 | 对应文章 | 当前缺口 |
|---|---|---|---|---|---|---|
| AI Engineer | Agent Systems | EduRAG；DeepAgents；Digital Employee System | `core/graph.py`、`core/state.py`、`agent/main_agent.py`、`agent/sub_agents/db_sub_agent.py` | EduRAG graph tests 通过；DeepAgents 未运行 agent 链路 | 数字员工系统中英文文章 | 企业 Agent Runtime、human approval、audit、recovery 未实现 |
| AI Engineer | Agent Evals & Reliability | EduRAG；DeepAgents | `evaluation/agent_course_eval.py`、`data/agent_course_eval/manual_v1.jsonl`、`evals/db_agent_eval.py` | EduRAG 32/32 route eval；46 个代表性测试通过；DeepAgents eval 未执行 | 数字员工系统文章提到评估、恢复、监督 | task success、tool/argument accuracy、trajectory quality、cost/latency、bad case、regression |
| AI Engineer | Context & Knowledge Systems | EduRAG | `core/qa_orchestrator.py`、`core/evidence.py`、`core/retrieval/*`、`core/access_control.py` | QA/evidence/retrieval tests 部分通过；真实 Milvus 未验证 | 待补 EduRAG case study | 真实向量服务、citation correctness、permission filtering demo |
| AI Engineer | Applied Model Engineering | EduRAG；DeepAgents | `core/llm.py`、`core/nodes/generator.py`、`agent/llm.py` | 尚无模型工程评估 | 暂无主线文章 | dataset、SFT/QLoRA、serving、routing、fallback eval |
| AI Engineer | Production AI Engineering | EduRAG；DeepAgents | `main.py`、`api/rag.py`、`services/rag_service.py`、`api/server.py`、Docker/compose | EduRAG 部分 tests 通过；DeepAgents health 通过；EduRAG health 未完成 | 代码可读性文章仅作辅助 | 本地 demo、CI/CD、metrics、trace、rate limit、部署证据 |
| AI Engineer | Applied AI Delivery | EduRAG；DeepAgents；SmartOrderingAgent 待核验 | EduRAG Web UI / API；DeepAgents API 壳 | EduRAG route eval；DeepAgents static/health | 待补案例文章 | 用户场景、端到端运行、结果和限制 |

## 当前最强证据

1. `EduRAG / StuckToShip`：真实代码、RAG/route/evidence/trace 结构、32 条 route eval、46 个代表性测试通过、架构图和部署模板。
2. `DeepAgents 药企数据 Agent`：DeepAgents main/sub-agent、SQL tools、pharma 模拟数据和 5 条 eval 脚本；API health 通过。
3. `Digital Employee System`：中英文系统 thesis，证明问题定义和长期研究方向。

## 当前最大缺口

1. 没有可作为 `Flagship System` 的独立平台仓库。
2. 没有任何项目完全达到完整首页案例标准。
3. `EduRAG` 缺来源/所有权确认和真实本地服务 health / demo。
4. `DeepAgents` 缺 agent 端到端运行和 eval 结果。
5. `SmartOrderingAgent` 缺路径。
6. Agent eval 证据仍偏 route/retrieval，没有完整 task success / tool accuracy / cost latency 闭环。

## 首页证据策略

当前首页采用：

```text
Hero
→ Selected Case Studies
→ Core Expertise
→ Featured Writing
→ Current Build / Research Agenda
→ Contact
→ Footer
```

`Enterprise Agent Runtime & Evaluation Platform` 放入 `Current Build / Research Agenda`，不能放入 `Flagship System`。

## 用户必须补充

- `EduRAG` 的来源和所有权边界：是否课程重构、个人研究或其他。
- `EduRAG` 可公开范围：仓库、截图、知识库内容、eval 数据。
- `EduRAG` startup 卡住原因，或提供可复现运行环境。
- `DeepAgents` 的来源、数据脱敏方式、哪些代码由用户新增。
- `DeepAgents` 的可公开 eval 运行记录。
- `SmartOrderingAgent` 准确路径。
- 是否存在 `Digital Employee System` 独立仓库或只保留为研究命题。

## 结论

公开定位是合理的，但证据还处在“强候选 + 待补齐案例”的阶段。下一步不应进入 V0 视觉阶段，而应先把 `EduRAG` 补成第一个完整案例，并为它建立最小真实评估闭环。
