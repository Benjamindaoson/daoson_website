# 项目组合筛选方案

## 当前目标

本阶段不再扩展职业定位或抽象平台规划。目标是通过真实仓库核验，决定哪些项目可以进入首页 `Selected Case Studies`。

## 已核验项目

| 项目 | 仓库/位置 | 读取结果 |
|---|---|---|
| DeepAgents 药企数据 Agent | `D:\deepagent_search` | 已读取代码、依赖、prompt、SQL、eval 脚本，并验证 API health |
| EduRAG / StuckToShip | `C:\Users\Admin（无密码）\Music\还原各种课程项目\EduRAG项目\edu-rag` | 已读取代码、README、测试、评估、架构和部署模板 |
| SmartOrderingAgent | 未提供路径 | 未读取 |
| Digital Employee System | 网站仓库内容 | 已确认只有项目数据和中英文文章，没有独立系统代码 |

## 当前证据等级

| 项目 | 当前分类 | 原因 |
|---|---|---|
| Digital Employee System | Research Agenda / System Thesis | 只有项目数据和中英文技术文章，没有独立可运行系统代码、测试、评估、Demo 或仓库 |
| Enterprise Agent Runtime & Evaluation Platform | Current Build / Long-term Flagship | 长期平台方向，尚未达到 Validated Prototype |
| EduRAG / StuckToShip | Candidate Case Study — strongest verified candidate | 有真实代码、测试、32 条 route eval、架构图和部署模板；但来源/所有权未确认，uvicorn health 未完成 |
| DeepAgents 药企数据 Agent | Candidate Case Study — in development | 有真实代码、FastAPI health、agent 和 DB tools；但 API 未接入 agent，eval 未执行，来源边界未确认 |
| SmartOrderingAgent | Candidate Case Study — waiting for path | 等待用户提供路径并核验 |

不得把 `Research Agenda`、`Current Build` 和 `Completed Case Study` 混为同一证据等级。

## 当前阶段首页顺序

当前首页必须使用：

```text
Hero
→ Selected Case Studies
→ Core Expertise
→ Featured Writing
→ Current Build / Research Agenda
→ Contact
→ Footer
```

当前首页不设置 `Flagship System` 模块。

## Flagship System 升级条件

`Enterprise Agent Runtime & Evaluation Platform` 只有同时满足以下条件后，才能升级为首页 `Flagship System`：

1. 存在独立代码。
2. 至少一条核心执行链路可运行。
3. 系统架构能够由真实代码支持。
4. 存在测试或评估。
5. 存在截图、Demo、运行记录或公开仓库。
6. 已完成能力与规划能力边界明确。
7. 状态达到 `Validated Prototype`。

## 首页案例推荐

### 当前严格结论

**当前没有项目完全达到完整首页案例标准。**

原因：`EduRAG` 技术证据最强，但来源/所有权边界尚未由用户确认，真实本地服务 health check 未完成；`DeepAgents` 核心 agent 链路尚未验证；`SmartOrderingAgent` 缺路径；`Digital Employee System` 不是实现案例。

### 最接近标准的项目

1. `EduRAG / StuckToShip`
   - 推荐作为第一个优先补齐的首页案例。
   - 当前可写为 `Validated Prototype candidate`，不能写成 `Working Demo`。
   - P0：确认来源/所有权，跑通真实 `/health` 和一条 API/Web QA 流程。

2. `DeepAgents 药企数据 Agent`
   - 推荐作为第二个候选案例或 Lab。
   - 当前状态应为 `In Development`。
   - P0：打通 API 或 CLI agent 查询链路，执行 5 条 eval，确认模拟数据边界。

3. `SmartOrderingAgent`
   - 不能排序进入首页。
   - P0：用户提供准确路径。

## Projects 页面分层建议

### Featured Case Studies

暂时为空，或只在补齐 P0 后放 `EduRAG / StuckToShip`。

### Other Builds

- `DeepAgents 药企数据 Agent`：In Development。
- `EduRAG / StuckToShip`：如果未补运行 Demo，可暂放 Other Builds。

### Labs / Research

- `Digital Employee System`：Research Agenda / System Thesis。
- `Enterprise Agent Runtime & Evaluation Platform`：Current Build / Long-term Flagship。
- `SmartOrderingAgent`：等待路径。

## Digital Employee System 当前能证明什么

能够证明：

- 对企业 Agent 系统问题的持续关注；
- 对工具可靠性、状态恢复、人类确认和协作流程的问题定义；
- 系统化技术表达能力。

不能证明：

- Agent Runtime 已实现；
- 状态恢复已实现；
- Human Approval 已实现；
- Agent Evals 已实现；
- 企业级平台已经存在。

## Selected Case Studies 准入标准

一个项目进入首页 `Selected Case Studies`，必须至少满足：

1. 找到真实代码。
2. 来源和所有权边界明确。
3. 至少一条核心流程可运行，或有可靠替代证据。
4. 能画出真实系统架构。
5. 能说明用户实际完成的部分。
6. 有测试、E2E 或评估中的至少一种。
7. 有一项可公开证据。
8. 有明确状态。
9. 有已知限制。
10. 不依赖虚构公司、客户和生产数据。

## 最小补齐顺序

1. 先补 `EduRAG`：确认来源/所有权，修复或解释 startup 卡住，录制 1 条 API/Web QA 流程，写 case study。
2. 再补 `DeepAgents`：打通 agent 执行链路，执行 5 条 eval，补 SQL 安全边界。
3. 等用户提供路径后核验 `SmartOrderingAgent`。
4. `Digital Employee System` 继续放在 Current Build / Research Agenda，不进入 Selected Case Studies。
