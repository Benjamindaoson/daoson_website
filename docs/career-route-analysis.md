# 职业路线分析

## 版本说明

这是当前网站路线判断的源头文档。后续所有项目筛选、首页蓝图、信息架构与证据矩阵，都应以这里的判断为准。

## 目标路线

**LLM Systems + Enterprise Agent Platforms**

## 目标岗位

- 高级 Agent 工程师
- Agent 平台工程师
- AI 平台工程师
- 大模型应用开发工程师
- 大模型工程化工程师
- LLM Systems Engineer
- AI 应用架构师

## 核心判断

1. 现有网站定位仍然偏宽。
2. 长期旗舰应该收敛到 **企业级 Agent 运行与评估平台**。
3. `DeepAgents` 和 `AGNO` 应作为参考基线，不应默认进入作品集主角位。
4. `EduRAG` 和 `SmartOrderingAgent` 目前只能算候选支撑案例，前提是用户后续补齐真实事实。
5. `Digital Employee System` 是当前仓库里唯一可验证的公开项目主线，可作为旗舰平台的首个可见实例或支撑案例。

## 为什么仍然偏宽

当前公开内容里，仍然混有这些层次：

- 一般工程写作
- 前端与工具链内容
- 数字花园式笔记
- 只有一条可验证的 AI 系统线索

这会让网站看起来“内容很多”，但不一定“证据集中”。  
对目标岗位来说，真正需要的是把公开身份收束到一个清晰的系统主线。

## 应证明什么

网站要证明的不是“我懂很多 AI 词”，而是：

**我能设计一个 Agent 系统，把它运行起来，给它接上下文和知识，给它做评估与可靠性控制，并把它往可维护、可迭代的方向推进。**

## 旗舰平台

### 长期旗舰

**企业级 Agent 运行与评估平台**

它不是“已完成生产系统”的宣称，而是公开内容的组织中心。

它需要承担的公开证明点：

- Agent runtime
- Context routing
- Knowledge / memory integration
- Evaluation / reliability
- Production engineering

### 当前可见实例

**Digital Employee System**

这是当前仓库中唯一能验证的 AI 系统方向，适合作为旗舰平台的首个公开实例，或者至少作为其支撑案例。

## 支撑案例与参考基线

### 支撑案例候选

- `EduRAG`
- `SmartOrderingAgent`

只有在用户提供真实材料后，才值得从候选提升到独立案例。

### 参考基线

- `DeepAgents`
- `AGNO`

它们更适合作为写作素材、架构参考和对照基线，不默认进入案例库。

## 各岗位关心什么

| 岗位 | 主要关心 | 网站应证明什么 |
|---|---|---|
| 高级 Agent 工程师 | runtime、tool use、state、recovery | 我能把 Agent 跑稳 |
| Agent 平台工程师 | orchestration、observability、workflow | 我能搭平台和框架 |
| AI 平台工程师 | deploy、monitoring、cost、reliability | 我能让系统可运维 |
| 大模型应用开发工程师 | product integration、UX flow、API | 我能把模型落到产品里 |
| 大模型工程化工程师 | evaluation、quality gates、testing | 我能让系统可验证 |
| LLM Systems Engineer | context、knowledge、runtime、evaluation | 我能做系统级设计 |
| AI 应用架构师 | 端到端方案、边界、取舍 | 我能把需求翻译成系统 |

## 首页主线

首页应按以下顺序讲故事：

**Hero → Flagship Platform → Supporting Case Studies → Engineering Focus → Featured Writing → Contact**

这条顺序比“研究议题 → 写作 → 日常记录”更适合目标岗位。

## Engineering Focus

应调整为：

1. LLM Systems
2. Agent Runtime
3. Context and Knowledge
4. Evaluation and Reliability
5. Production Engineering

## Writing 主题结构

Writing 应围绕以下主题建立：

1. LLM Systems Architecture
2. Agent Runtime and Orchestration
3. Context / Memory / Knowledge
4. Evaluation / Reliability / Failure Modes
5. Production Engineering / Ops / Cost / Safety

## 当前三类材料的缺口

### Digital Employee System

当前最接近路线，但仍缺少：

- 系统边界图
- 运行流转
- 评测和测试
- 结果和限制
- 可公开仓库或替代证据

### EduRAG

当前缺少可验证材料：

- 是否真实存在
- 是否属于用户
- 数据和检索设计
- 评测集与失败样例

### SmartOrderingAgent

当前缺少可验证材料：

- 是否真实存在
- 工作流设计
- 工具调用与状态恢复
- 运行证据

## 结论

当前路线不应继续向“泛 AI 内容站”扩展，而应围绕一个旗舰平台把内容收拢起来，并让写作和案例都为这条主线服务。
