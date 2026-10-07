---
layout: project
title: "Enterprise Data Agent：从业务提问到经营分析报告"
title_en: "Enterprise Data Agent: from business questions to decision reports"
slug: enterprise-data-agent
description: "以业务语义约束分析，以多智能体推进调查，再把结论连接到可核验的数据与计算。"
description_en: "Constrain analysis with business semantics, investigate with specialist agents, and connect findings to verifiable data and calculations."
repository: "https://github.com/Benjamindaoson/enterprise-data-agent"
status: active
year: 2026
lang: zh
bilingual: true
---

{% include eda-example.html id="eda-case" %}

<div class="i18n i18n-zh" markdown="1">

企业经营分析常常需要反复取数、下钻和对齐指标口径。这个项目将一次业务提问推进为完整调查：识别分析目标，安排门店、商品、促销和客群工作流，根据结果继续下钻，最后生成带证据的经营报告。

## 关键决策：规划与计算各自承担什么

核心取舍是把调查规划与数值计算分开：工作流负责决定看哪些业务维度，确定性算子负责计算，语义层负责口径与访问边界。这使核心结果能够按输入、公式与数据来源复核，也要求新增分析能力扩展相应的语义规则和算子。

**先明确业务含义。** 语义层把问题解析为指标、维度、时间、实体、约束与意图，集中管理公式、关联关系和业务规则。分析结果携带语义包版本与内容哈希，使同一个指标的定义能够被追溯。[语义实现](https://github.com/Benjamindaoson/enterprise-data-agent/blob/a82133b35b7215a1b163f5c3afdcc241e9c4381f/src/eiw/retail/semantics.py)

**让调查能够继续。** LangGraph 图串联语义解析、初始规划、并行专家执行和重规划。Supervisor 根据已返回的结构化观察决定是否追加工作流；追问沿用父任务的分析窗口，并通过明确的 focus 继续下钻。[调查图](https://github.com/Benjamindaoson/enterprise-data-agent/blob/a82133b35b7215a1b163f5c3afdcc241e9c4381f/src/eiw/retail/graph.py) · [应用运行时](https://github.com/Benjamindaoson/enterprise-data-agent/blob/a82133b35b7215a1b163f5c3afdcc241e9c4381f/src/eiw/runtime/orchestrator.py)

**把计算和证据放进同一条链路。** 核心分析由确定性算子完成，覆盖贡献分析、价格与销量分解、异常和交叉维度扫描。结果按问题相关性排序，再组织成图表、行动建议和 HTML / PDF 报告。受控 PostgreSQL 连接器限定可访问的表、列和聚合操作，并以只读事务、超时及结果上限约束查询。[实现与证据索引](https://github.com/Benjamindaoson/enterprise-data-agent/blob/a82133b35b7215a1b163f5c3afdcc241e9c4381f/docs/RESUME_EVIDENCE.md)

## 已有结果

零售参考产品使用固定版本的公开 CC0 Complete Journey 数据。下列结果来自仓库保留的内部评测记录，采用可复现的确定性规划路径。[数据与评测报告](https://github.com/Benjamindaoson/enterprise-data-agent/blob/a82133b35b7215a1b163f5c3afdcc241e9c4381f/docs/BA_AGENT_REAL_DATA_RESULTS.md)

{% include project-evidence.html project_id="enterprise-data-agent" %}

| 检查内容 | 结果与条件 |
|---|---|
| 数据基础 | 1,469,307 条交易明细、92,331 条商品记录；导入保存来源、哈希和行数 |
| 多窗口分析 | 30 个案例，覆盖 5 个历史窗口；评测以独立只读 SQL 计算数值答案 |
| 问题相关排序 | 同一批分析输出、10 个案例，Driver Recall@K 从 0.90 提高到 1.00，增加 10 个百分点 |
| 动态调查 | 10 个案例中，有 8 个在初轮分析后追加专家工作流 |
| 异常与对抗输入 | 开发集通过 164 / 168；独立冻结集通过 42 / 42，保留 4 个缺失数据措辞案例的问题 |

这些记录描述了指定工作负载中的行为；同输出消融隔离了查询相关结果选择的贡献。实时模型策略已经有接口，外部模型服务的效果与延迟没有计入以上结果；公开数据中的促销和销售关系按相关性解释。

## 当前重点

继续完善陌生 PostgreSQL 数据库的语义接入与评测。仓库已有目录探测、受控聚合探查、失败分析和语义补丁升级流程，并记录了盲接入对照实验。模型驱动接入的实际效果仍需运行带凭据的评测后再报告。[语义演进实验](https://github.com/Benjamindaoson/enterprise-data-agent/blob/a82133b35b7215a1b163f5c3afdcc241e9c4381f/docs/SEMANTIC_EVOLUTION_EVIDENCE.md)

[查看源码与运行说明](https://github.com/Benjamindaoson/enterprise-data-agent) · [查看产品演示指南](https://github.com/Benjamindaoson/enterprise-data-agent/blob/a82133b35b7215a1b163f5c3afdcc241e9c4381f/docs/BA_AGENT_QUICKSTART.md)

</div>

<div class="i18n i18n-en" markdown="1">

Business analysis often requires repeated queries, drill-downs, and agreement on metric definitions. This project turns one question into an investigation: identify the analytical goal, dispatch store, product, promotion, and customer workstreams, follow the findings, and deliver an evidence-linked report.

## Key decision: separate planning from calculation

The design separates investigation planning from numerical execution. Workflows choose which business dimensions to inspect; deterministic operators calculate the results; the semantic layer defines meaning and access boundaries. This makes core results traceable to inputs, formulas, and sources, while new analytical capabilities require explicit semantic rules and operators.

**Resolve business meaning first.** A semantic layer maps each question to metrics, dimensions, time, entities, constraints, and intent. It owns formulas, joins, and business rules. Results carry the semantic package version and content hash so a reported metric can be traced to its definition. [Semantic implementation](https://github.com/Benjamindaoson/enterprise-data-agent/blob/a82133b35b7215a1b163f5c3afdcc241e9c4381f/src/eiw/retail/semantics.py)

**Keep the investigation moving.** A LangGraph loop connects semantic resolution, initial planning, parallel specialist execution, and re-planning. The Supervisor uses typed observations to decide whether another analytical wave is needed. Follow-ups preserve the parent analysis window and an explicit focus. [Investigation graph](https://github.com/Benjamindaoson/enterprise-data-agent/blob/a82133b35b7215a1b163f5c3afdcc241e9c4381f/src/eiw/retail/graph.py) · [Application runtime](https://github.com/Benjamindaoson/enterprise-data-agent/blob/a82133b35b7215a1b163f5c3afdcc241e9c4381f/src/eiw/runtime/orchestrator.py)

**Connect calculations to the final evidence.** Deterministic operators perform contribution analysis, price–volume decomposition, anomaly detection, and cross-dimensional scans. Query-aware ranking selects findings for charts, actions, and HTML / PDF reports. A governed PostgreSQL connector restricts tables, columns, and aggregate operations through read-only transactions, timeouts, and bounded results. [Implementation and evidence map](https://github.com/Benjamindaoson/enterprise-data-agent/blob/a82133b35b7215a1b163f5c3afdcc241e9c4381f/docs/RESUME_EVIDENCE.md)

## Recorded results

The retail reference product uses a pinned public CC0 Complete Journey dataset. These are repository-recorded internal evaluations using a reproducible deterministic planning policy. [Data and evaluation report](https://github.com/Benjamindaoson/enterprise-data-agent/blob/a82133b35b7215a1b163f5c3afdcc241e9c4381f/docs/BA_AGENT_REAL_DATA_RESULTS.md)

{% include project-evidence.html project_id="enterprise-data-agent" %}

| Evaluation | Result and scope |
|---|---|
| Data foundation | 1,469,307 transaction rows and 92,331 product records; ingestion records sources, hashes, and row counts |
| Multiple time windows | 30 cases across 5 historical windows, with numerical gold computed by independent read-only SQL |
| Query-aware ranking | On identical analytical outputs across 10 cases, Driver Recall@K rose from 0.90 to 1.00: +10 percentage points |
| Dynamic investigation | Re-planning added specialist workstreams in 8 of 10 cases |
| Adversarial inputs | 164 / 168 development cases and 42 / 42 frozen holdout cases passed; four missing-data paraphrase failures remain documented |

These results document behavior on the evaluated workload; the same-output ablation isolates the effect of query-aware finding selection. Optional live-model policies have interfaces, but their provider-backed quality and latency are outside these measurements. Associations in the observational retail data are not treated as causal effects.

## Current focus

Extend semantic onboarding for previously unseen PostgreSQL databases. The repository includes catalog introspection, bounded aggregate probes, failure mining, semantic patches, and a blind onboarding comparison. Live model-driven onboarding requires a credentialed evaluation before reporting provider-backed gains. [Semantic evolution experiment](https://github.com/Benjamindaoson/enterprise-data-agent/blob/a82133b35b7215a1b163f5c3afdcc241e9c4381f/docs/SEMANTIC_EVOLUTION_EVIDENCE.md)

[Source and setup](https://github.com/Benjamindaoson/enterprise-data-agent) · [Product demo guide](https://github.com/Benjamindaoson/enterprise-data-agent/blob/a82133b35b7215a1b163f5c3afdcc241e9c4381f/docs/BA_AGENT_QUICKSTART.md)

</div>
