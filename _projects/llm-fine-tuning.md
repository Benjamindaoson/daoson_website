---
layout: project
title: "金融大模型微调：数据治理、两阶段 SFT 与 LLMOps"
title_en: "Financial LLM fine-tuning: data governance, two-stage SFT, and LLMOps"
slug: llm-fine-tuning
description: "将金融数据生产、assistant-only 训练、质量评测与双版本部署连接起来，建立可恢复、可追溯的领域微调流程。"
description_en: "Connect financial data production, assistant-only training, quality evaluation, and dual-version serving in a recoverable, traceable fine-tuning workflow."
repository: "https://github.com/Benjamindaoson/LLM-Fine-tuning"
status: active
year: 2026
lang: zh
bilingual: true
portfolio_shell: true
---

<div class="i18n i18n-zh" markdown="1">

金融领域微调需要解决的不只是“让模型说得更专业”。数值计算、事实引用和连续追问都可能出错；如果数据隔离、训练格式与部署版本没有统一管理，一次看似有效的训练也很难稳定复用。

我围绕这些问题实现了从金融文本治理、本地监督数据生成、两阶段 LoRA SFT，到离线评测和 vLLM 双版本服务的工程链路。公开代码默认以 **Qwen3.5-9B** 为文本基座，并把数据、训练、合并和评测拆成可独立执行的步骤。[项目与架构](https://github.com/Benjamindaoson/LLM-Fine-tuning/blob/933730feebd9e2fed02cc411c0376b7eb291b9bd/README.md)

## 先切分来源，再生成问题

同一篇金融原文可以生成多个不同问法。只在生成后的问答层面随机切分，容易让同一来源同时出现在训练集和测试集。

数据链路先清洗金融文本，用 SQLite 磁盘索引做全局精确去重，再按稳定的 `source_id` 划分来源。监督数据生成保留来源标识，支持有界并发、失败重试与断点恢复；审计脚本同时检查来源重叠和完整对话哈希重叠。[生成脚本](https://github.com/Benjamindaoson/LLM-Fine-tuning/blob/933730feebd9e2fed02cc411c0376b7eb291b9bd/scripts/generate_sft.py) · [切分审计](https://github.com/Benjamindaoson/LLM-Fine-tuning/blob/933730feebd9e2fed02cc411c0376b7eb291b9bd/scripts/audit_splits.py)

项目配置与公开摘要记录的规模为 **160 万条原始文本、12.8 万条监督样本、2,000 条验证样本和 8,000 条测试样本**。这些数值是项目记录的规模；公开仓库不分发私有金融文本或完整数据清单。[规模配置](https://github.com/Benjamindaoson/LLM-Fine-tuning/blob/933730feebd9e2fed02cc411c0376b7eb291b9bd/configs/project_scale.yaml)

## 两阶段训练中的关键取舍

第一阶段覆盖金融知识和常见分析任务；第二阶段聚焦数值推理与多轮对话。第二阶段还按来源哈希、以 **0.20 的抽样概率回放其他金融任务**，使专项训练保留更广的任务覆盖。这不是“最终训练集中恰好 20% 是回放样本”。[阶段划分实现](https://github.com/Benjamindaoson/LLM-Fine-tuning/blob/933730feebd9e2fed02cc411c0376b7eb291b9bd/scripts/partition_training_stages.py)

训练使用原生 Chat Template，并只对 assistant 回复计算损失；多轮对话中的每次 assistant 回复都参与监督，用户输入和 padding 不计入损失。LoRA 默认配置为 `all-linear`，训练器支持 DeepSpeed ZeRO-2、梯度检查点、断点恢复、验证集早停与最佳 Adapter 保存。[格式与损失掩码](https://github.com/Benjamindaoson/LLM-Fine-tuning/blob/933730feebd9e2fed02cc411c0376b7eb291b9bd/src/finllm_prod/formatting.py) · [训练入口](https://github.com/Benjamindaoson/LLM-Fine-tuning/blob/933730feebd9e2fed02cc411c0376b7eb291b9bd/scripts/train_sft.py)

四卡配置下，每卡微批次 3、梯度累积 16，对应全局有效批次 **192**。这是训练配置的计算关系，不是吞吐或显存性能测量。

## 把评测与版本交付连接起来

评测链路把 Base、第一阶段模型和两阶段模型放在同一测试协议下，保存生成回答，再用固定 JSON rubric 分别评审任务正确性、数值与事实正确性、无依据数字。训练得到的 Adapter 可合并为独立模型；部署脚本为 Base 与 Candidate 提供独立的 vLLM 服务、健康检查及同题 A/B 比较入口。[质量评审实现](https://github.com/Benjamindaoson/LLM-Fine-tuning/blob/933730feebd9e2fed02cc411c0376b7eb291b9bd/scripts/judge_quality.py) · [模型版本与交付](https://github.com/Benjamindaoson/LLM-Fine-tuning/blob/933730feebd9e2fed02cc411c0376b7eb291b9bd/docs/LLMOPS.md)

### 公开汇总记录

仓库的评测快照记录了以下 8,000 条测试样本上的汇总值：[原始快照](https://github.com/Benjamindaoson/LLM-Fine-tuning/blob/933730feebd9e2fed02cc411c0376b7eb291b9bd/reports/benchmark_snapshot.json)。

| 指标 | Base | 两阶段 SFT |
|---|---:|---:|
| 金融综合任务正确率 | 51.8% | 73.6% |
| 数值与事实回答准确率 | 62.4% | 81.1% |
| 无依据数字生成率 | 14.7% | 5.2% |

这里引用的是项目公开的汇总记录，未把它表述为一次独立复现。公开仓库没有附带该次运行的训练日志、权重标识或逐样本评审输出；对应评审代码使用模型裁判，也不能直接等同人工金融审校正确率。

## 当前可核查的工程成果

公开 CI 已通过核心测试、Python 编译和 Shell 语法检查，覆盖回复区域监督、数据结构、来源切分和指标计算等基础环节。[固定提交 CI](https://github.com/Benjamindaoson/LLM-Fine-tuning/actions/runs/37729887373)

这项工作的工程价值是把数据生产、训练格式、质量指标和部署版本纳入同一流程。进一步完善证据时，重点是补充可分享的运行摘要、固定模型版本和脱敏逐题评审，让结果能追溯到具体模型与样本。

[查看项目源码](https://github.com/Benjamindaoson/LLM-Fine-tuning)

</div>

<div class="i18n i18n-en" markdown="1">

Financial fine-tuning is about more than making a model sound knowledgeable. Numerical calculations, factual references, and follow-up questions can fail in different ways. Without consistent data isolation, training formats, and model versioning, a promising run is difficult to reuse reliably.

I implemented a workflow spanning financial-text governance, local supervision generation, two-stage LoRA SFT, offline evaluation, and dual-version vLLM serving. The public code defaults to **Qwen3.5-9B** as its text backbone and separates data, training, merging, and evaluation into independently executable stages. [Project and architecture](https://github.com/Benjamindaoson/LLM-Fine-tuning/blob/933730feebd9e2fed02cc411c0376b7eb291b9bd/README.md)

## Split sources before generating questions

One financial document can produce several differently worded questions. Randomly splitting generated question-answer pairs can put the same underlying source in both training and test data.

The pipeline cleans documents, performs exact deduplication with a disk-backed SQLite index, and splits stable `source_id` values before generating supervision. Generation retains provenance and supports bounded concurrency, retries, and resume. Audits check both source overlap and exact conversation hashes. [Generation](https://github.com/Benjamindaoson/LLM-Fine-tuning/blob/933730feebd9e2fed02cc411c0376b7eb291b9bd/scripts/generate_sft.py) · [Split audit](https://github.com/Benjamindaoson/LLM-Fine-tuning/blob/933730feebd9e2fed02cc411c0376b7eb291b9bd/scripts/audit_splits.py)

The configuration and public project summary record **1.6 million source texts, 128,000 supervised examples, 2,000 validation examples, and 8,000 test examples**. These are recorded project-scale figures; the public repository does not distribute the private financial corpus or its complete inventory. [Scale configuration](https://github.com/Benjamindaoson/LLM-Fine-tuning/blob/933730feebd9e2fed02cc411c0376b7eb291b9bd/configs/project_scale.yaml)

## Decisions in the two-stage trainer

Stage 1 covers financial knowledge and common analytical tasks. Stage 2 focuses on numerical reasoning and multi-turn dialogue, while deterministically replaying other financial tasks with a **0.20 sampling probability** based on source hashes. This preserves broader task coverage; it does not imply that exactly 20% of the final Stage 2 dataset consists of replay examples. [Stage partitioning](https://github.com/Benjamindaoson/LLM-Fine-tuning/blob/933730feebd9e2fed02cc411c0376b7eb291b9bd/scripts/partition_training_stages.py)

The native chat template supplies a consistent format, with loss applied only to assistant responses, including every assistant turn in a conversation. User input and padding are excluded. The LoRA trainer defaults to `all-linear` and supports DeepSpeed ZeRO-2, gradient checkpointing, resume, validation-based early stopping, and best-adapter export. [Formatting and loss masks](https://github.com/Benjamindaoson/LLM-Fine-tuning/blob/933730feebd9e2fed02cc411c0376b7eb291b9bd/src/finllm_prod/formatting.py) · [Training entry point](https://github.com/Benjamindaoson/LLM-Fine-tuning/blob/933730feebd9e2fed02cc411c0376b7eb291b9bd/scripts/train_sft.py)

The four-GPU configuration combines a per-device micro-batch of 3 with 16 accumulation steps for a global effective batch of **192**. This is configuration arithmetic, not a measured throughput or memory result.

## Connect evaluation to model delivery

The evaluation workflow compares Base, Stage 1, and Stage 2 models under a common test protocol. It saves generated answers and applies a fixed JSON rubric for task correctness, numerical/factual correctness, and unsupported numbers. Adapters can be merged into standalone models, while deployment scripts provide separate Base and Candidate vLLM services, health checks, and same-question A/B comparisons. [Quality judge](https://github.com/Benjamindaoson/LLM-Fine-tuning/blob/933730feebd9e2fed02cc411c0376b7eb291b9bd/scripts/judge_quality.py) · [Versioning and delivery](https://github.com/Benjamindaoson/LLM-Fine-tuning/blob/933730feebd9e2fed02cc411c0376b7eb291b9bd/docs/LLMOPS.md)

### Published aggregate record

The repository's evaluation snapshot records these aggregate values for 8,000 test examples. [Source snapshot](https://github.com/Benjamindaoson/LLM-Fine-tuning/blob/933730feebd9e2fed02cc411c0376b7eb291b9bd/reports/benchmark_snapshot.json)

| Metric | Base | Two-stage SFT |
|---|---:|---:|
| Financial task accuracy | 51.8% | 73.6% |
| Numerical and factual accuracy | 62.4% | 81.1% |
| Unsupported-number rate | 14.7% | 5.2% |

These are the project's published aggregate records, not a separate independent reproduction. The public repository does not include the associated training logs, weight identities, or per-example judgments. The corresponding evaluation code uses a model judge; its scores are not equivalent to human financial review accuracy.

## Engineering evidence available today

The public CI run passed core tests, Python compilation, and shell syntax checks. Its scope includes response-only supervision, data structures, source splitting, and metric calculations. [CI for the pinned commit](https://github.com/Benjamindaoson/LLM-Fine-tuning/actions/runs/37729887373)

The engineering contribution is a common workflow for data production, training formats, quality metrics, and model versions. The next evidence improvement is to publish shareable run summaries, pinned model identities, and sanitized per-example judgments so that results can be traced to particular models and samples.

[Project source](https://github.com/Benjamindaoson/LLM-Fine-tuning)

</div>
