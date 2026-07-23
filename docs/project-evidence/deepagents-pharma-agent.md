# DeepAgents Pharma Data Agent Evidence Sheet

## 1. 项目一句话事实定义

`DeepAgents 药企数据 Agent` 是一个基于 `deepagents`、OpenAI-compatible LLM、MySQL 工具和 FastAPI 的药企模拟数据分析 Agent 原型。当前已发现可启动的 API 壳、独立 agent 组装代码、MySQL 查询工具、模拟业务 SQL 数据和 5 条关键词验收脚本，但尚未验证完整 agent 业务链路。

## 2. 项目来源

- 项目根目录：`D:\deepagent_search`
- Git 分支：`master`
- Git 状态：`A CODE_AUDIT_REPORT.md`，`?? PRODUCT_ROADMAP.md`
- 项目来源：尚需用户确认。当前只能标记为 `Personal Research / Open-source Extension` 候选。
- 不能自动断定：完全独立开发、企业生产项目、服务真实客户。

## 3. 当前状态

`In Development`

原因：FastAPI `/health` 在临时端口 `8017` 验证通过，但 `/api/task` 只返回任务接收信息，没有调用 `agent/main_agent.py` 中的 `main_agent`。核心 agent 执行需要 LLM API、MySQL 和模拟数据，尚未在本轮跑通。

## 4. 解决的问题

使用自然语言查询药品、库存和销售记录，生成结构化经营分析，例如库存、销量、销售额、区域排名和库存风险。

## 5. 目标用户

尚需用户确认。根据代码和提示词，可公开描述为“需要从结构化药品库存与销售数据中获得分析结论的业务分析人员”。不得写成真实药企客户。

## 6. 用户实际工作范围

尚需用户确认。代码中可验证的工作范围包括：

- FastAPI 服务入口：`api/server.py`
- DeepAgents 主 agent 组装：`agent/main_agent.py`
- DB sub-agent：`agent/sub_agents/db_sub_agent.py`
- MySQL 工具：`tools/mysql_tools.py`
- 业务提示词和 SQL 约束：`prompt/prompts.yaml`
- 模拟数据库 schema 与 seed data：`sql/db.sql`
- 关键词验收脚本：`evals/db_agent_eval.py`

## 7. 原始代码或框架提供的能力

- `deepagents.create_deep_agent` 提供 agent runtime 基础能力。
- `langchain.chat_models.init_chat_model` 提供 OpenAI-compatible 模型调用封装。
- FastAPI / Uvicorn 提供 HTTP 服务能力。
- MySQL connector 提供数据库连接与查询。

## 8. 真实系统架构

```text
main.py
  -> api.server.start_server()
      -> FastAPI app
          -> GET /health
          -> POST /api/task 只返回 accepted，不执行 agent

agent/main_agent.py
  -> create_deep_agent(model=llm, system_prompt=..., subagents=[db_sub_agent])
      -> db_sub_agent
          -> list_sql_tables
          -> get_table_data
          -> execute_sql_query

sql/db.sql
  -> pharma_db
      -> drugs
      -> inventory
      -> sales_records
```

## 9. 核心执行流程

已发现但未端到端验证：

```text
用户自然语言问题
  -> main_agent.invoke(...)
  -> 主 agent 判断是否需要 DB sub-agent
  -> DB sub-agent 选择 MySQL 工具
  -> 执行 SELECT / SHOW / DESCRIBE 类查询
  -> 基于返回数据生成中文分析
```

API 侧当前流程：

```text
POST /api/task
  -> 生成 thread_id
  -> 返回 TaskResponse(status="started")
```

该 API 流程尚未接入 agent 执行。

## 10. 已验证功能

- 项目 Python 文件静态 AST 解析通过：`parsed 11 project python files`
- FastAPI `/health` 临时端口验证通过：`{"status":"ok"}`
- `api/server.py` 中存在 `/`、`/health`、`/api/task`
- `agent/main_agent.py` 中存在 DeepAgents 主 agent 组装
- `tools/mysql_tools.py` 中存在 3 个 MySQL 工具
- `sql/db.sql` 中存在模拟药品、库存、销售数据

## 11. 部分实现功能

- Agent Runtime：部分实现。存在 DeepAgents agent 和 sub-agent，但 API 未接入，未验证运行链路。
- Tool Registry：部分实现。工具以 Python 函数列表传入 DB sub-agent。
- SQL / Data Agent：部分实现。存在 schema、SQL prompt 规则和查询工具。
- Evals：部分实现。存在 5 条关键词验收脚本，但本轮未执行。
- Backend：部分实现。API 可启动并健康检查通过，但核心业务 API 未执行 agent。

## 12. Mock 功能

- `sql/db.sql` 使用模拟业务数据。
- `/api/task` 当前返回任务接收消息，不能作为真实 agent 任务执行证据。

## 13. 未实现功能

- HTTP API 到 `main_agent` 的真实执行链路。
- Checkpoint / 持久化 session。
- Timeout / retry / idempotency / recovery。
- Human approval。
- Audit log / distributed trace。
- 自动化评估结果。
- 部署与 CI/CD。
- 生产安全控制。

## 14. 测试情况

- 未发现 pytest 测试目录。
- 发现 `evals/db_agent_eval.py`，包含 5 条关键词验收 case。
- 本轮未执行该 eval，因为它会调用外部 LLM / MySQL，并写入 `output/evals/...`。

## 15. 评估情况

`只有评估脚本，未运行验证。`

评估指标当前是关键词命中，不是完整 Agent eval。没有验证：

- Tool Selection Accuracy
- Argument Accuracy
- Trajectory Quality
- Failure Attribution
- Cost / Latency
- Regression

## 16. 运行验证

已执行：

```powershell
.\.venv\Scripts\python.exe --version
$env:PYTHONDONTWRITEBYTECODE='1'; .\.venv\Scripts\python.exe -B -c "..."
.\.venv\Scripts\python.exe -B -m uvicorn api.server:app --host 127.0.0.1 --port 8017
Invoke-RestMethod http://127.0.0.1:8017/health
```

结果：

- Python：`3.13.9`
- 静态解析：通过
- `/health`：通过
- 默认端口 `8000`：已被占用，未使用
- 核心 agent 问答：未运行

## 17. 可公开代码

尚需用户确认仓库是否可公开。当前路径为本地仓库，不等于公开 repository。

## 18. 可公开截图

尚未验证。可安全截图的最低要求是先跑通 `/health` 和一个非敏感 agent 查询流程。

## 19. 可公开输入输出

可公开候选：基于 `sql/db.sql` 的模拟药品库存/销售查询样例。必须注明是模拟数据。

## 20. 隐私与安全风险

- `.env` 存在于仓库根目录，本轮未读取其内容，不能公开。
- `.env.example` 公开了所需变量名，但无真实密钥。
- `get_table_data(table_name)` 使用字符串插值构造 SQL，表名需增加白名单校验后才能对外展示为安全实现。
- `execute_sql_query(sql)` 接受任意 SQL 字符串，prompt 约束只读，但代码层没有只读 SQL parser。

## 21. 已知限制

- API 与 agent 执行未打通。
- 依赖外部 LLM、MySQL、API keys。
- Eval 未运行。
- 没有 UI。
- 没有完整 trace / audit。
- 来源和用户实际贡献边界未确认。

## 22. 网站可以使用的事实

- “一个正在开发中的药企模拟数据 Agent，围绕自然语言 SQL 分析、DB tool use 和 DeepAgents sub-agent 编排。”
- “已验证 FastAPI health check 和静态代码解析。”
- “存在 MySQL 查询工具、模拟 pharma schema、5 条关键词验收脚本。”
- “当前仍在补 API 到 agent 的执行链路和真实评估记录。”

## 23. 网站不得使用的表述

- Production / Enterprise-grade / Serving real customers
- 已服务药企客户
- 已完成企业级数据 Agent
- 已有完整 Agent Runtime
- 已完成自动评估闭环
- 已部署生产系统

## 24. 达到完整案例还缺什么

P0：

- 用户确认项目来源和所有权边界。
- API 接入 `main_agent` 或提供可复现 CLI demo。
- 提供 MySQL 初始化步骤和脱敏模拟数据说明。
- 跑通 1 条完整查询链路并记录输入、工具调用、SQL、输出。
- 执行 5 条 eval 并保存可公开结果。
- 增加只读 SQL 安全边界说明。

P1：

- 增加 Tool Selection / Argument Accuracy / Task Success 指标。
- 增加 latency / cost 记录。
- 增加失败 case 和恢复策略。

## 25. 需要用户确认的问题

1. 该项目来源属于 Independent Build、Open-source Extension、Course Reconstruction、Personal Research 还是 Collaborative Project？
2. 哪些代码是用户新增，哪些由课程、框架或模板提供？
3. `.env` 中是否有任何不可公开服务或数据连接？
4. `sql/db.sql` 是否完全为模拟数据？
5. 是否允许公开仓库、截图或运行日志？
