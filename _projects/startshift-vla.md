---
layout: project
portfolio_shell: true
title: "StartShift-VLA：机器人策略的初始化敏感性研究记录"
title_en: "StartShift-VLA: a research record on robot-policy initialization sensitivity"
slug: startshift-vla
description: "保留 920 条 SmolVLA 仿真基线记录，说明观察到了什么、证据有哪些限制，以及为什么停止方法开发。"
description_en: "Preserve 920 SmolVLA simulation baseline records, the observed results, their limitations, and why method development stopped."
repository: "https://github.com/Benjamindaoson/StartShift-VLA"
status: archived
year: 2026
lang: zh
bilingual: true
---

<div class="i18n i18n-zh" markdown="1">

**当前状态：研究归档。** StartShift-VLA 研究视觉—语言—动作（VLA）策略是否依赖训练演示中常见的默认初始状态。公开仓库保留核心代码、历史仿真基线与研究复盘；RISE-E、RISE-EA 和 RISE-EAR 仍是未验证的原型，其后续开发已经停止。[项目说明](https://github.com/Benjamindaoson/StartShift-VLA/blob/8fb03bbaa6982115a54aaa7c4945375a6139a056/README.md)

## 研究问题与保留证据

实验使用同一个 SmolVLA 基础检查点，在 vanilla LIBERO 的任务子集和 LIBERO-Plus 的 Robot Initial States 子集上记录策略表现。公开的主要评估共 **920 条保存记录**：ID 组 120 条、RobotInit 组 800 条。每组任务或变体运行 10 个 episode。[实验条件](https://github.com/Benjamindaoson/StartShift-VLA/blob/8fb03bbaa6982115a54aaa7c4945375a6139a056/results_summary.md)

| 历史仿真评估 | 任务 / 变体组 | 成功次数 / 总次数 | 实测成功率 |
|---|---:|---:|---:|
| ID：vanilla LIBERO 子集 | 12 | 86 / 120 | 71.67% |
| RobotInit：LIBERO-Plus 审计子集 | 80 | 36 / 800 | 4.50% |

封面图根据[公开汇总数据](https://github.com/Benjamindaoson/StartShift-VLA/blob/8fb03bbaa6982115a54aaa7c4945375a6139a056/results/analysis/summary.json)重绘。两组成功率的描述性差异为 67.17 个百分点。**两组没有按基础任务和物理场景配对，因此不能把全部差异解释为初始状态变化的因果效应。** 结果也仅覆盖一个策略与一套记录的种子安排。

## 能说明什么，仍缺少什么

这些历史结果与初始化敏感性的假设一致，使重置条件下的可靠性成为值得继续研究的问题。公开记录同时保留了限制：[完整限制说明](https://github.com/Benjamindaoson/StartShift-VLA/blob/8fb03bbaa6982115a54aaa7c4945375a6139a056/docs/limitations.md)

- 920 条主要记录均未保存初始状态向量和视频引用，无法仅凭任务标签重建物理状态配对。
- 798 次失败仍为 `UNLABELED`，尚无完整的失败机制分类。
- 未完成第二个模型、多种子复验或真机验证，不能由此概括所有 VLA 策略。
- 未验证 RISE 的方法收益；方法效果记为 **N/A**，不能解释为有效或无效。

## 为什么停在这里

训练尝试停在数据来源核验：已有 episode 元数据不足以确认其对应的 RobotInit 变体。保存的 G2 记录明确写明 `gpu_training_started=false`，因此没有完成基线微调与 RISE 的匹配数据比较。[阻塞记录](https://github.com/Benjamindaoson/StartShift-VLA/blob/8fb03bbaa6982115a54aaa7c4945375a6139a056/results/historical/run_receipts/g2_data_contract_blocked.json)

这份归档的价值是让已观察的现象、未完成的假设和证据缺口可以被分别检查。进一步研究需要配对评估、可追溯的初始状态、多个模型与失败分类；这些是复盘中识别的缺口，并非本项目已经完成的结果。[研究复盘](https://github.com/Benjamindaoson/StartShift-VLA/blob/8fb03bbaa6982115a54aaa7c4945375a6139a056/docs/research_reflection.md)

## 如何复核

公开仓库提供 `python scripts/verify_archive.py`，用于检查保存文件的哈希、920 条记录、成功次数、分组与种子安排，并从已有记录重算指标。**它复核保存证据，不重新运行仿真器或训练。** 本页引用固定提交 `8fb03bb`；没有据此声称完成新的机器人实验、论文或部署系统。[复核说明](https://github.com/Benjamindaoson/StartShift-VLA/blob/8fb03bbaa6982115a54aaa7c4945375a6139a056/docs/verification.md)

[公开研究仓库](https://github.com/Benjamindaoson/StartShift-VLA) · [ID 原始记录](https://github.com/Benjamindaoson/StartShift-VLA/blob/8fb03bbaa6982115a54aaa7c4945375a6139a056/results/baseline/id/eval_records.jsonl) · [RobotInit 原始记录](https://github.com/Benjamindaoson/StartShift-VLA/blob/8fb03bbaa6982115a54aaa7c4945375a6139a056/results/baseline/robotinit/eval_records.jsonl)

</div>

<div class="i18n i18n-en" markdown="1">

**Status: research archive.** StartShift-VLA asks whether a vision-language-action (VLA) policy depends on the default reset states common in its training demonstrations. The public repository preserves core code, historical simulation baselines, and a research reflection. RISE-E, RISE-EA, and RISE-EAR remain unvalidated prototypes; their further development has stopped. [Project overview](https://github.com/Benjamindaoson/StartShift-VLA/blob/8fb03bbaa6982115a54aaa7c4945375a6139a056/README.md)

## Question and retained evidence

The evaluations used the same base SmolVLA checkpoint on a vanilla LIBERO task subset and the Robot Initial States subset of LIBERO-Plus. The principal public evidence contains **920 saved evaluation records**: 120 ID episodes and 800 RobotInit episodes, with ten trials per task or variant group. [Experimental conditions](https://github.com/Benjamindaoson/StartShift-VLA/blob/8fb03bbaa6982115a54aaa7c4945375a6139a056/results_summary.md)

| Historical simulation evaluation | Task / variant groups | Successes / episodes | Observed success rate |
|---|---:|---:|---:|
| ID: vanilla LIBERO subset | 12 | 86 / 120 | 71.67% |
| RobotInit: LIBERO-Plus audit subset | 80 | 36 / 800 | 4.50% |

The cover chart is redrawn from the [public summary data](https://github.com/Benjamindaoson/StartShift-VLA/blob/8fb03bbaa6982115a54aaa7c4945375a6139a056/results/analysis/summary.json). The descriptive difference is 67.17 percentage points. **The selections were not paired by base task and physical scene, so the entire difference cannot be attributed causally to reset state.** The evidence covers one policy and one recorded seed schedule.

## Interpretation and remaining gaps

The historical observations are consistent with initialization sensitivity and make reset robustness a concrete reliability question. The archive also preserves its limitations. [Full limitations](https://github.com/Benjamindaoson/StartShift-VLA/blob/8fb03bbaa6982115a54aaa7c4945375a6139a056/docs/limitations.md)

- All 920 principal rows lack saved initial-state vectors and video references. Task labels alone cannot reconstruct physical-state pairing.
- All 798 failed episodes remain `UNLABELED`; a complete failure-mechanism taxonomy is missing.
- No second model, independent multi-seed replication, or physical-robot validation was completed. The result does not generalize to all VLA policies.
- RISE benefits were not validated. Its method effect is **N/A**, which establishes neither effectiveness nor ineffectiveness.

## Why the method work stopped

The training attempt stopped at a provenance check: available episode metadata could not certify the requested RobotInit variant membership. The retained G2 receipt states `gpu_training_started=false`. A matched-data comparison of baseline fine-tuning and RISE was therefore not completed. [Blocked-run receipt](https://github.com/Benjamindaoson/StartShift-VLA/blob/8fb03bbaa6982115a54aaa7c4945375a6139a056/results/historical/run_receipts/g2_data_contract_blocked.json)

The archive makes the observed behavior, unfinished hypotheses, and evidence gaps independently inspectable. Stronger follow-up research would require paired evaluations, traceable initial states, multiple models, and failure classification. These are identified gaps rather than completed project results. [Research reflection](https://github.com/Benjamindaoson/StartShift-VLA/blob/8fb03bbaa6982115a54aaa7c4945375a6139a056/docs/research_reflection.md)

## Verification boundary

The public entry point, `python scripts/verify_archive.py`, checks saved-file hashes, all 920 records, success counts, group identities, and the recorded seed schedule, then recomputes metrics from existing records. **It verifies saved evidence; it does not rerun simulation or training.** This page references commit `8fb03bb` and claims no new robotics experiment, completed paper, or deployed system. [Verification notes](https://github.com/Benjamindaoson/StartShift-VLA/blob/8fb03bbaa6982115a54aaa7c4945375a6139a056/docs/verification.md)

[Public research repository](https://github.com/Benjamindaoson/StartShift-VLA) · [ID records](https://github.com/Benjamindaoson/StartShift-VLA/blob/8fb03bbaa6982115a54aaa7c4945375a6139a056/results/baseline/id/eval_records.jsonl) · [RobotInit records](https://github.com/Benjamindaoson/StartShift-VLA/blob/8fb03bbaa6982115a54aaa7c4945375a6139a056/results/baseline/robotinit/eval_records.jsonl)

</div>
