---
layout: project
title: "Reward Modeling Lab：8B 奖励模型训练与捷径审计"
title_en: "Reward Modeling Lab: 8B training and shortcut audits"
slug: reward-modeling-lab
description: "从单卡 QLoRA 训练到受控挑战集，检验奖励模型的高分依赖什么。"
description_en: "From single-GPU QLoRA to controlled challenge sets, investigate what a reward model's high score depends on."
repository: "https://github.com/Benjamindaoson/reward-modeling-lab"
status: active
year: 2026
lang: zh
bilingual: true
---

<div class="i18n i18n-zh" markdown="1">

奖励模型需要给较好的回答更高分，但回答长度、格式和数据生成方式也可能与偏好标签相关。这个项目围绕 Skywork Reward Llama 3.1 8B，把训练与审计放在同一条实验链路中：完成后训练，检查冻结测试集，再用受控挑战和多候选排序分析模型学到了什么。

## 关键决策：高分需要通过捷径审计

冻结测试集包含 451 个问题、4,510 对比较。微调后准确率达到 91.35%，但“总选更长回答”的规则达到 94.61%。因此，原始分数需要结合长度控制实验一起解释。[结果与挑战集口径](https://github.com/Benjamindaoson/reward-modeling-lab/blob/bead1bb8b084166beede3f5101d7613a9ff3f7ee/docs/results/data/shortcut_audit_summary.json)

| 评测 | 基础模型 | 微调模型 | 样本与条件 |
|---|---:|---:|---|
| 原始冻结测试 | 50.42% | 91.35% | 4,510 对；长度启发式为 94.61% |
| 长度匹配挑战 | 49.56% | 77.78% | 450 对；两回答相对长度差不超过 10% |
| 反长度挑战 | 47.70% | 74.90% | 239 对；较优回答更短 |

模型在长度匹配和反长度样本上仍优于基础模型，原始分布的高分也明显受到长度相关性的影响。这促使后续评估同时追踪偏好区分能力和捷径依赖。

## 训练与实验设计

基础模型为 Skywork Reward Llama 3.1 8B。正式实验在单张 NVIDIA A10 23GB 上使用 4-bit NF4 QLoRA 与 BF16 计算，运行 1,000 个优化步骤，耗时约 3 小时 18 分钟。训练池包含 3,599 个问题、35,990 对偏好样本；这次固定步数实验实际处理约 8,000 个样本对实例，未遍历全部可用训练对。[数据规模](https://github.com/Benjamindaoson/reward-modeling-lab/blob/bead1bb8b084166beede3f5101d7613a9ff3f7ee/README.md) · [冻结配置](https://github.com/Benjamindaoson/reward-modeling-lab/blob/bead1bb8b084166beede3f5101d7613a9ff3f7ee/configs/training/formal_gpu_qlora_1000_final.json) · [实验记录](https://github.com/Benjamindaoson/reward-modeling-lab/blob/bead1bb8b084166beede3f5101d7613a9ff3f7ee/docs/results/data/results_summary.json)

训练目标优化 chosen 与 rejected 回答的奖励差；LoRA 覆盖注意力和前馈层，并保存奖励 score head。评测同时观察成对准确率、五候选排序、长度相关性和检查点差异。[训练实现](https://github.com/Benjamindaoson/reward-modeling-lab/blob/bead1bb8b084166beede3f5101d7613a9ff3f7ee/src/financial_reward_rl/train.py)

## 排序与检查点

同一批测试问题还被重构为五候选排序：记录的 Kendall τ 为 0.8828、NDCG@5 为 0.9474，完全正确排序比例为 57.87%。这些指标补充了成对准确率无法覆盖的整体顺序信息。[排序记录](https://github.com/Benjamindaoson/reward-modeling-lab/blob/bead1bb8b084166beede3f5101d7613a9ff3f7ee/docs/results/data/results_summary.json)

检查点对比中，最低验证损失与更好的下游排序指标没有完全一致。实验也记录到，512-token 限制下，2,255 条去重测试回答中约 98.54% 被截断。这两点都进入了下一轮实验设计。[检查点对照](https://github.com/Benjamindaoson/reward-modeling-lab/blob/bead1bb8b084166beede3f5101d7613a9ff3f7ee/docs/results/data/amd_bf16_checkpoint_comparison.json) · [结果说明](https://github.com/Benjamindaoson/reward-modeling-lab/blob/bead1bb8b084166beede3f5101d7613a9ff3f7ee/docs/results/README.md)

## 当前进展

V1 是单随机种子的金融问答偏好实验，原始偏好数据不随公开仓库分发。V2 已实现长度平衡采样、反长度样本增曝和 1,024-token 上下文配置，并将原始分布、长度匹配与反长度挑战纳入同一晋级协议；真实 GPU 训练尚未执行，因此没有 V2 性能结论。[V2 实验协议](https://github.com/Benjamindaoson/reward-modeling-lab/blob/bead1bb8b084166beede3f5101d7613a9ff3f7ee/docs/V2_SHORTCUT_ROBUSTNESS.md)

[查看源码与复现实验入口](https://github.com/Benjamindaoson/reward-modeling-lab) · [完整结果工件](https://github.com/Benjamindaoson/reward-modeling-lab/tree/bead1bb8b084166beede3f5101d7613a9ff3f7ee/docs/results)

</div>

<div class="i18n i18n-en" markdown="1">

A reward model should give better answers higher scores, yet response length, format, and data-generation choices may correlate with preference labels. This project connects training and auditing around Skywork Reward Llama 3.1 8B: fine-tune the model, evaluate a frozen test set, then examine controlled challenges and multi-candidate ranking.

## Key decision: audit the shortcut behind a high score

The frozen test set contains 451 questions and 4,510 comparisons. Fine-tuned accuracy reached 91.35%, while a rule that always chooses the longer response reached 94.61%. The original score therefore needs to be read alongside length-controlled evaluations. [Results and challenge definitions](https://github.com/Benjamindaoson/reward-modeling-lab/blob/bead1bb8b084166beede3f5101d7613a9ff3f7ee/docs/results/data/shortcut_audit_summary.json)

| Evaluation | Base | Fine-tuned | Sample and condition |
|---|---:|---:|---|
| Original frozen test | 50.42% | 91.35% | 4,510 pairs; longer-answer heuristic: 94.61% |
| Length-matched challenge | 49.56% | 77.78% | 450 pairs; relative length difference at most 10% |
| Reversed-length challenge | 47.70% | 74.90% | 239 pairs; the preferred answer is shorter |

The fine-tuned model retains gains over the base model on both challenges, while the original high score is also affected by length correlation. This motivated an evaluation process that tracks preference discrimination and shortcut dependence together.

## Training and experiment design

The base model is Skywork Reward Llama 3.1 8B. The formal run used 4-bit NF4 QLoRA with BF16 compute on one NVIDIA A10 23GB for 1,000 optimizer steps, taking approximately 3 hours 18 minutes. The training pool contained 3,599 questions and 35,990 preference pairs; the fixed-step run processed approximately 8,000 pair instances, rather than traversing the full pool. [Data scope](https://github.com/Benjamindaoson/reward-modeling-lab/blob/bead1bb8b084166beede3f5101d7613a9ff3f7ee/README.md) · [Frozen configuration](https://github.com/Benjamindaoson/reward-modeling-lab/blob/bead1bb8b084166beede3f5101d7613a9ff3f7ee/configs/training/formal_gpu_qlora_1000_final.json) · [Experiment record](https://github.com/Benjamindaoson/reward-modeling-lab/blob/bead1bb8b084166beede3f5101d7613a9ff3f7ee/docs/results/data/results_summary.json)

The objective optimizes the reward difference between chosen and rejected responses. LoRA targets attention and feed-forward layers, and the reward score head is saved with the adapter. Evaluation covers pairwise accuracy, five-way ranking, length correlations, and checkpoint differences. [Training implementation](https://github.com/Benjamindaoson/reward-modeling-lab/blob/bead1bb8b084166beede3f5101d7613a9ff3f7ee/src/financial_reward_rl/train.py)

## Ranking and checkpoint selection

The same questions were reconstructed as five-candidate rankings. Recorded results include Kendall τ of 0.8828, NDCG@5 of 0.9474, and 57.87% perfectly ordered rankings. These measurements expose global ordering behavior beyond pairwise accuracy. [Ranking record](https://github.com/Benjamindaoson/reward-modeling-lab/blob/bead1bb8b084166beede3f5101d7613a9ff3f7ee/docs/results/data/results_summary.json)

The checkpoint with the lowest validation loss did not lead on every downstream ranking metric. A context audit also recorded truncation for approximately 98.54% of unique test responses at the 512-token limit. Both observations informed the next experiment. [Checkpoint comparison](https://github.com/Benjamindaoson/reward-modeling-lab/blob/bead1bb8b084166beede3f5101d7613a9ff3f7ee/docs/results/data/amd_bf16_checkpoint_comparison.json) · [Result notes](https://github.com/Benjamindaoson/reward-modeling-lab/blob/bead1bb8b084166beede3f5101d7613a9ff3f7ee/docs/results/README.md)

## Current progress

V1 is a single-seed financial-QA preference experiment; raw preference data is not distributed with the public repository. V2 implements length-balanced sampling, greater exposure to natural reversed-length pairs, and a 1,024-token configuration, with a joint promotion protocol for IID, length-matched, and reversed-length evaluations. Its GPU training has not run, so no V2 performance result is reported. [V2 protocol](https://github.com/Benjamindaoson/reward-modeling-lab/blob/bead1bb8b084166beede3f5101d7613a9ff3f7ee/docs/V2_SHORTCUT_ROBUSTNESS.md)

[Source and experiment entry points](https://github.com/Benjamindaoson/reward-modeling-lab) · [Result artifacts](https://github.com/Benjamindaoson/reward-modeling-lab/tree/bead1bb8b084166beede3f5101d7613a9ff3f7ee/docs/results)

</div>
