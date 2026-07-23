# EduRAG Evidence Sheet

## 1. 项目一句话事实定义

`EduRAG / StuckToShip` 是一个面向 AI 工程课程学习者的 RAG 助教原型，包含 FastAPI、LangGraph 编排、课程/代码/FAQ/报错路由、证据门控、引用、Trace、SSE 流式接口、离线路由评估和生产部署模板。

## 2. 项目来源

- 项目根目录：`C:\Users\Admin（无密码）\Music\还原各种课程项目\EduRAG项目\edu-rag`
- Git 分支：`agent-course-rag-mvp`
- Git 状态：干净
- 项目来源：尚需用户确认。路径包含“还原各种课程项目”，因此公开前必须确认是否属于 `Course Reconstruction`、`Personal Research` 或其他来源。

## 3. 当前状态

`Validated Prototype` 候选，但公开前仍需用户确认来源与所有权。

理由：

- 找到真实代码、测试、评估数据和架构文档。
- 代表性 pytest 测试通过 46 个。
- 离线 eval 通过 32/32 route accuracy。
- 全量 pytest 120 秒内未完成。
- 真实 uvicorn 启动后 20 秒内 `/health` 未连上，停在 startup 阶段，不能称为 Working Demo。

## 4. 解决的问题

AI 工程课程学习者在 RAG、LangGraph、Milvus、MCP、Agent、依赖配置和项目代码之间卡住时，系统根据问题类型路由到课程、代码、FAQ、报错 recipe 或学习路径，并返回带引用和 trace 的回答。

## 5. 目标用户

正在学习或实现 LLM 应用、RAG pipeline、LangGraph workflow、Milvus 检索、MCP 工具和 Agent 的课程学习者。

## 6. 用户实际工作范围

尚需用户确认。代码中可验证的模块包括：

- FastAPI app：`main.py`
- RAG API：`api/rag.py`
- RAG service：`services/rag_service.py`
- LangGraph 编排：`core/graph.py`
- 路由器：`core/intent_router.py`
- Orchestrator：`core/qa_orchestrator.py`
- 证据门控：`core/evidence.py`、`core/retrieval_gate.py`
- 权限与 prompt injection 过滤：`core/access_control.py`、`core/prompt_injection.py`
- 检索引擎与 adapters：`core/retrieval/*`
- eval CLI：`evaluation/agent_course_eval.py`
- eval 数据：`data/agent_course_eval/manual_v1.jsonl`
- Web UI：`static/index.html`
- 部署模板：`Dockerfile`、`docker-compose.production.yml`

## 7. 原始代码或框架提供的能力

- FastAPI 提供 API 框架。
- LangGraph 提供状态图编排和 MemorySaver checkpointer。
- LangChain / sentence-transformers / Milvus / BM25 / RAGAS 提供底层 RAG 组件。
- pytest 提供测试框架。

## 8. 真实系统架构

```text
Web UI / API client
  -> FastAPI main.py
      -> api/rag.py
          -> services/rag_service.py
              -> LangGraph graph
                  -> fast_path QAOrchestrator
                  -> classify
                  -> retrieve
                  -> rerank
                  -> retrieval gate
                  -> generate / abstain / retry
                  -> finalize
              -> references + trace + latency
```

辅助数据：

```text
knowledge/courses/*.md
knowledge/faq/*.jsonl
knowledge/errors/*.jsonl
data/agent_course_eval/*.jsonl
```

## 9. 核心执行流程

可验证的核心流程：

```text
用户问题
  -> route_query
  -> QAOrchestrator / LangGraph fast path
  -> course/code/error/faq/learning_path 检索
  -> prompt injection 与 ACL 过滤
  -> evidence gate
  -> grounded answer
  -> citations + trace
```

## 10. 已验证功能

- 静态解析：`parsed 114 project python files`
- pytest 收集：`146 tests collected`
- 代表性测试集 1：`20 passed`
- 代表性测试集 2：`26 passed`
- 离线路由评估：`32/32 route accuracy`
- 架构图文件存在：`docs/assets/edu-rag-architecture.svg`
- Graph 流程图存在：`docs/assets/rag-graph-flow.svg`
- Dockerfile 与 Milvus / production compose 模板存在

## 11. 部分实现功能

- RAG：代码中存在课程文档检索、代码符号检索、FAQ、error recipe、证据门控、引用。
- Agent Runtime：存在 LangGraph workflow、state、retry planning、MemorySaver checkpointer，但不是企业 Agent Runtime。
- Context Engineering：存在 context trimming、references、source metadata、ACL filter、prompt injection guard。
- Evaluation：存在 32 条 route eval 和 retrieval evaluation tests，但不是完整 answer quality / faithfulness / cost eval 闭环。
- Production Engineering：存在 FastAPI、SSE、SQLite、Docker、compose、API key middleware、health route，但本轮未完成真实服务 health check。

## 12. Mock 功能

- 多个 graph/service 测试使用 FakeStore、FakeReranker、mock graph 或 stub answer。
- 未配置 LLM API key 时生成节点会回退到 mock answer。
- 本轮验证的 route eval 主要评估路由准确率和引用数量，不等于真实 LLM 答案质量。

## 13. 未实现功能

- 本轮未验证真实 Web UI 交互。
- 本轮未验证真实向量库检索服务。
- 本轮未验证外部 LLM 生成质量。
- 本轮未验证完整 Docker 部署。
- 本轮未验证生产域名、HTTPS、真实用户访问。
- 不是企业级 Agent Runtime 平台。

## 14. 测试情况

已执行：

```powershell
.\.venv\Scripts\python.exe -B -m pytest -q test\test_agent_course_eval.py test\test_qa_orchestrator.py test\test_evidence_gate.py test\test_api_auth.py test\test_retrieval_evaluation.py test\test_production_readiness.py
```

结果：`20 passed, 2 warnings`

已执行：

```powershell
.\.venv\Scripts\python.exe -B -m pytest -q test\test_graph_v1.py test\test_unified_graph_fast_path.py test\test_rag_service_orchestrator.py test\test_rag_service_one_path.py test\test_agent_course_app_surface.py test\test_agent_course_frontend.py test\test_agent_course_frontend_trace.py
```

结果：`26 passed, 2 warnings`

全量测试：

```powershell
.\.venv\Scripts\python.exe -B -m pytest -q
```

结果：120 秒内未完成，记录为尚未验证。

## 15. 评估情况

已执行：

```powershell
.\.venv\Scripts\python.exe -B -m evaluation.agent_course_eval --file data\agent_course_eval\manual_v1.jsonl --json
```

结果：

- total：32
- correct：32
- route_accuracy：1.0
- 覆盖 route：course、code、error、faq、learning_path、clarify

仍缺：

- Answer faithfulness
- Context precision / recall
- Human rubric
- Cost / latency 评估报告
- Regression 对比报告
- Bad case 分类

## 16. 运行验证

已尝试：

```powershell
.\.venv\Scripts\python.exe -B -m uvicorn main:app --host 127.0.0.1 --port 8021
Invoke-RestMethod http://127.0.0.1:8021/health
```

结果：

- 20 秒后仍无法连接。
- stdout 显示已注册 API 路由，并进入 startup。
- 日志显示 `Vector store disabled: local Milvus Lite is unavailable`。
- 进程停在 `Waiting for application startup`，本轮未完成健康检查。

## 17. 可公开代码

尚需用户确认仓库是否可公开，以及哪些内容来自课程项目、模板或个人重构。

## 18. 可公开截图

候选：

- `static/index.html` Web UI 截图。
- `docs/assets/edu-rag-architecture.svg`
- `docs/assets/rag-graph-flow.svg`

公开前必须确认 UI 不泄漏私人路径、课程版权或敏感数据。

## 19. 可公开输入输出

可公开：

- README 中示例问题。
- `data/agent_course_eval/manual_v1.jsonl` 中 32 条 eval 问题和 route 结果。
- 测试命令输出摘要。

## 20. 隐私与安全风险

- 本地路径暴露了“课程项目”来源线索，网站公开时不应暴露本机路径。
- 需要确认 `knowledge/` 中课程材料是否可公开。
- `uploaded_docs/` 和 SQLite 数据库文件存在，公开前需检查是否包含非公开数据。
- `.env.production` 存在，公开前需确认没有真实 key。

## 21. 已知限制

- 本轮未跑通真实 HTTP health check。
- 全量 pytest 未完成。
- 真实 LLM / Milvus 生成链路未验证。
- 来源与所有权边界未确认。
- 评估目前偏 route/retrieval，不足以证明完整回答质量。

## 22. 网站可以使用的事实

- “一个面向 AI 工程课程学习者的 RAG 助教原型。”
- “包含课程、代码、FAQ、报错和学习路径路由。”
- “支持 citations、trace、SSE streaming 和 API key middleware。”
- “本轮验证 46 个代表性测试通过，32 条 route eval 全部通过。”
- “当前仍需补真实服务启动截图、完整回归和所有权说明。”

## 23. 网站不得使用的表述

- Production-ready
- Enterprise-grade
- Serving real students/customers
- 完整部署上线
- 完整 Agent 平台
- 完整 RAGAS 评估闭环

## 24. 达到完整案例还缺什么

P0：

- 用户确认来源、所有权和可公开范围。
- 修复或解释本地 uvicorn startup 未完成原因，并提供可复现 health check。
- 提供 1 条完整 API 或 Web UI 问答流程截图/日志。
- 明确 eval 只证明 route accuracy，不夸大为 answer quality。

P1：

- 扩展 30-50 条 eval 到 answer quality、citation correctness、bad case。
- 增加 latency / cost 统计。
- 补完整 case study 的架构、workflow、限制和下一步。

## 25. 需要用户确认的问题

1. 该项目来源属于 Course Reconstruction 还是 Personal Research？
2. `knowledge/` 中课程内容是否允许公开？
3. 是否允许公开仓库或只公开截图/文档？
4. 本地 startup 卡住是否是模型下载、Milvus、数据库初始化或其他环境问题？
5. 是否接受将它作为第一个首页候选案例补齐？
