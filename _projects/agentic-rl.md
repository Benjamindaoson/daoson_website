---
layout: project
title: "Agentic-RL：面向 Text-to-SQL 的可验证 GRPO 训练链路"
title_en: "Agentic-RL: a verifiable GRPO workflow for Text-to-SQL"
slug: agentic-rl
description: "将数据库执行反馈、答案隔离、GRPO 训练接口与严格对照连接起来，检验策略是否真正学会改进 SQL 决策。"
description_en: "Connect database feedback, answer isolation, GRPO integration, and controlled evaluation to test whether policy learning improves SQL decisions."
repository: "https://github.com/Benjamindaoson/Agentic-RL"
status: prototype
year: 2026
lang: zh
bilingual: true
portfolio_shell: true
---

<div class="i18n i18n-zh" markdown="1">

一个 SQL Agent 多试几次、看到更多上下文，成功率也可能上升。真正需要回答的是：**在相同观察信息、轮次和计算预算下，强化学习是否让策略本身作出了更好的决策？**

Agentic-RL 围绕这个问题实现可审计的 Text-to-SQL 训练与评测链路：以 **Qwen2.5-Coder-3B-Instruct** 为目标策略，连接 SQLite 执行环境、Agent Lightning 和 veRL GRPO，并把原始轨迹、模型身份、权重变化和统计对照纳入验收。[项目说明](https://github.com/Benjamindaoson/Agentic-RL/blob/4c92020acf2bc04f640ae5bb717eb5b8e683365e/README.md)

## 首先保证 Agent 没有偷看答案

我把带标准 SQL 的私有任务与模型可见任务拆成不同类型。策略只接收问题、Schema、允许的额外证据与执行反馈；运行器拒绝直接接收包含 Gold SQL 的私有任务。标准答案在整条轨迹结束后才进入独立评估器，计算奖励与测试指标。[类型隔离](https://github.com/Benjamindaoson/Agentic-RL/blob/4c92020acf2bc04f640ae5bb717eb5b8e683365e/src/agentic_rl_sql/types.py)

这也约束了多轮纠错：是否继续、是否检查、何时结束，不能由 Gold 是否匹配来决定。模型输出 `final` 或 `inspect`，环境提供真实 SQLite 结果或错误。交换 Gold SQL 的变形测试要求策略输入、SQL、轮次与终止行为不变，评分则可以改变。[策略运行器](https://github.com/Benjamindaoson/Agentic-RL/blob/4c92020acf2bc04f640ae5bb717eb5b8e683365e/src/agentic_rl_sql/agent.py) · [泄漏审计](https://github.com/Benjamindaoson/Agentic-RL/blob/4c92020acf2bc04f640ae5bb717eb5b8e683365e/scripts/audit_leakage.py)

## 从执行奖励到可追溯的策略更新

已实现的链路包括：

- **执行环境**：SQL 安全解析、只读查询、超时、结果预览和可观察错误反馈。
- **训练入口**：Agent Lightning 记录模型请求与奖励，veRL 执行 GRPO；配置覆盖 FSDP、梯度检查点、vLLM rollout 和上下文预算。
- **工件记录**：保存数据哈希、训练配置、步级指标、GPU 记录和 Checkpoint 清单，并提供 FSDP 到 Hugging Face 权重的导出工具。
- **权重验收**：直接比较 Base、GRPO 和 No-update 的张量，要求 GRPO 权重发生变化、No-update 权重保持不变。

[训练入口](https://github.com/Benjamindaoson/Agentic-RL/blob/4c92020acf2bc04f640ae5bb717eb5b8e683365e/scripts/train_sql_agent.py) · [权重变化检查](https://github.com/Benjamindaoson/Agentic-RL/blob/4c92020acf2bc04f640ae5bb717eb5b8e683365e/scripts/check_weight_change.py)

这些工具把“命令返回成功”和“训练确实发生”分开。报告门禁要求真实优化步骤、权重、原始评测轨迹及对照记录齐备，缺项时停止发布实验结论。[证据校验器](https://github.com/Benjamindaoson/Agentic-RL/blob/4c92020acf2bc04f640ae5bb717eb5b8e683365e/scripts/verify_evidence.py)

## 关键取舍：把学习收益与推理预算分开

实验矩阵分别控制上下文长度、单轮／多轮、可选检查器，并设置 **No-update（学习率为 0）** 与 **validity-only reward** 对照。比较时锁定任务 ID、数据哈希、Prompt、轮次、Token 和 SQL 执行预算，提供配对 bootstrap 区间与 McNemar 检验。[评测协议](https://github.com/Benjamindaoson/Agentic-RL/blob/4c92020acf2bc04f640ae5bb717eb5b8e683365e/docs/EVALUATION_PROTOCOL.md)

数据协议同样区分三条用途：从 Spider 官方训练集按数据库划分训练与内部验证，把官方 Dev 留作最终测试；不可评分的 Gold SQL 单独审计并披露覆盖率。BIRD 作为外部分布评测入口，不能与 Spider 混报一个准确率。

## 当前已经验证到哪里

最新公开 CI 已通过 CPU 单元与集成测试、实际 Agent Lightning 1.0.2／veRL 0.8.0 配置契约验证、Gold 泄漏审计及离线就绪检查。[固定提交 CI](https://github.com/Benjamindaoson/Agentic-RL/actions/runs/37860801847)

CPU 测试还验证了一个小型线性策略在真实 AdamW 步骤后参数发生变化，证明本地 GRPO 目标函数可以驱动梯度更新。它验证的是算法实现，不是 Qwen 的 GPU 训练结果。[优化器测试](https://github.com/Benjamindaoson/Agentic-RL/blob/4c92020acf2bc04f640ae5bb717eb5b8e683365e/tests/test_grpo_cpu_optimizer.py)

项目当前处于**工程链路已实现、GPU 实验待验证**的阶段。下一步是完成真实 Qwen GRPO 更新、导出重载，以及固定预算下的 Base／GRPO／No-update 盲评测。仓库将既有准确率表明确标为参考实验快照，本案例不把它当作已完成的训练收益。[当前执行计划](https://github.com/Benjamindaoson/Agentic-RL/blob/4c92020acf2bc04f640ae5bb717eb5b8e683365e/docs/WORK_PLAN.md) · [参考表的来源说明](https://github.com/Benjamindaoson/Agentic-RL/blob/4c92020acf2bc04f640ae5bb717eb5b8e683365e/reports/benchmark_snapshot.json)

这项工作的价值在于让一次 Agent 强化学习实验能够回答三个具体问题：模型看到什么、参数是否真的更新、收益是否来自学习本身。它为后续 GPU 运行准备了可执行的验证路径。

[查看项目源码](https://github.com/Benjamindaoson/Agentic-RL)

</div>

<div class="i18n i18n-en" markdown="1">

A SQL agent may solve more tasks simply by receiving more context or making more attempts. The harder question is: **with the same observations, turns, and compute budget, does reinforcement learning improve the policy's decisions?**

Agentic-RL implements an auditable Text-to-SQL training and evaluation workflow around that question. It targets **Qwen2.5-Coder-3B-Instruct**, connects SQLite execution to Agent Lightning and veRL GRPO, and treats raw trajectories, model identities, weight changes, and statistical controls as part of experimental acceptance. [Project overview](https://github.com/Benjamindaoson/Agentic-RL/blob/4c92020acf2bc04f640ae5bb717eb5b8e683365e/README.md)

## Keep the answer out of the policy

I separated private tasks containing Gold SQL from the public task type passed to the model. The policy receives the question, schema, permitted evidence, and execution feedback; the runner rejects the private task type. Only after the full trajectory ends does an independent evaluator use Gold SQL to calculate reward and test metrics. [Type boundary](https://github.com/Benjamindaoson/Agentic-RL/blob/4c92020acf2bc04f640ae5bb717eb5b8e683365e/src/agentic_rl_sql/types.py)

This also constrains correction and stopping. Gold correctness cannot decide whether to retry, invoke a checker, or stop. The model chooses `final` or `inspect`, while the environment returns actual SQLite results or errors. A Gold-mutation audit requires policy inputs, SQL, turns, and stopping behavior to remain unchanged when the answer is swapped; scores may change. [Policy runner](https://github.com/Benjamindaoson/Agentic-RL/blob/4c92020acf2bc04f640ae5bb717eb5b8e683365e/src/agentic_rl_sql/agent.py) · [Leakage audit](https://github.com/Benjamindaoson/Agentic-RL/blob/4c92020acf2bc04f640ae5bb717eb5b8e683365e/scripts/audit_leakage.py)

## Connect execution rewards to traceable updates

The implemented workflow includes:

- **Execution environment:** SQL safety parsing, read-only queries, timeouts, result previews, and observable error feedback.
- **Training integration:** Agent Lightning records model requests and rewards; veRL performs GRPO, with configuration for FSDP, gradient checkpointing, vLLM rollouts, and context budgets.
- **Run artifacts:** dataset hashes, training configuration, step metrics, GPU telemetry, and checkpoint manifests, plus tools to export FSDP weights into Hugging Face format.
- **Weight checks:** direct tensor comparisons across Base, GRPO, and No-update, requiring a changed GRPO policy and an unchanged No-update control.

[Training entry point](https://github.com/Benjamindaoson/Agentic-RL/blob/4c92020acf2bc04f640ae5bb717eb5b8e683365e/scripts/train_sql_agent.py) · [Weight-change audit](https://github.com/Benjamindaoson/Agentic-RL/blob/4c92020acf2bc04f640ae5bb717eb5b8e683365e/scripts/check_weight_change.py)

The evidence gate separates a command returning successfully from training having actually occurred. Measured optimization steps, weights, evaluation trajectories, and controls must be present before a report can claim experimental completion. [Evidence verifier](https://github.com/Benjamindaoson/Agentic-RL/blob/4c92020acf2bc04f640ae5bb717eb5b8e683365e/scripts/verify_evidence.py)

## Separate learning gains from inference budget

The experiment matrix controls context length, single versus multiple turns, and an optional checker. It includes **No-update (zero learning rate)** and **validity-only reward** controls. Comparisons lock task IDs, data hashes, prompts, turns, token limits, and SQL execution budgets, with paired-bootstrap intervals and McNemar tests. [Evaluation protocol](https://github.com/Benjamindaoson/Agentic-RL/blob/4c92020acf2bc04f640ae5bb717eb5b8e683365e/docs/EVALUATION_PROTOCOL.md)

Spider's official training set is split by database into training and internal validation; official Dev is reserved for final testing. Unscorable Gold SQL is audited separately with coverage disclosed. BIRD is an external-distribution evaluation path and must not be mixed into a single Spider score.

## What has been verified

The latest public CI run passed CPU unit and integration tests, configuration-contract checks against Agent Lightning 1.0.2 and veRL 0.8.0, Gold-leakage auditing, and an offline-readiness gate. [CI for the pinned commit](https://github.com/Benjamindaoson/Agentic-RL/actions/runs/37860801847)

A CPU test also verifies that a small linear policy changes after a real AdamW step using the local GRPO objective. This validates the implementation's gradient path; it is not evidence of GPU training or benchmark gains for Qwen. [Optimizer test](https://github.com/Benjamindaoson/Agentic-RL/blob/4c92020acf2bc04f640ae5bb717eb5b8e683365e/tests/test_grpo_cpu_optimizer.py)

The current status is **an implemented engineering workflow awaiting GPU experimental validation**. The next milestone is a real Qwen GRPO update, export and reload, followed by blind Base/GRPO/No-update evaluation under fixed budgets. The repository explicitly labels its existing accuracy table as a reference experiment snapshot; this case does not present it as a completed training gain. [Current work plan](https://github.com/Benjamindaoson/Agentic-RL/blob/4c92020acf2bc04f640ae5bb717eb5b8e683365e/docs/WORK_PLAN.md) · [Reference-table provenance](https://github.com/Benjamindaoson/Agentic-RL/blob/4c92020acf2bc04f640ae5bb717eb5b8e683365e/reports/benchmark_snapshot.json)

The contribution is an executable path for answering three concrete questions about agent RL: what the model observed, whether its parameters changed, and whether any improvement came from learning. The GPU experiments can then be evaluated against that protocol.

[Project source](https://github.com/Benjamindaoson/Agentic-RL)

</div>
