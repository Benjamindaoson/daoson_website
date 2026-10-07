---
layout: project
title: "RewardLens：相同静态分数下的视觉干预行为"
title_en: "RewardLens: visual intervention behavior at the same static score"
slug: rewardlens
description: "固定问题与候选回答，观察多模态评判模型何时应改变选择、何时应保持稳定。"
description_en: "Keep the question and candidate responses fixed, then measure when a multimodal judge should change its choice or remain stable."
repository: "https://github.com/Benjamindaoson/RewardLens"
status: prototype
year: 2026
lang: zh
bilingual: true
---

{% include rewardlens-example.html id="rewardlens-case" %}

<div class="i18n i18n-zh" markdown="1">

两个多模态评判模型取得相同的静态偏好准确率，是否意味着它们都会正确响应视觉证据的变化？RewardLens 用独立静态评测和受控图像干预，测量这个分数背后仍可能存在的行为差异。[论文](https://github.com/Benjamindaoson/RewardLens/blob/d0f355a9e3926eb25ab46fd5a9797034fb4c7394/paper/REWARDLENS_RelatedWork_Original.pdf)

## 关键决策：固定语言输入，改变视觉证据

每组审计样本包含原图、相关编辑图和无关编辑图。问题、候选回答及候选顺序保持固定；相关编辑被构造成改变正确选项，无关编辑则保持正确选项。程序在渲染后重新检查场景事实与标签关系。[构造与验证](https://github.com/Benjamindaoson/RewardLens/blob/d0f355a9e3926eb25ab46fd5a9797034fb4c7394/paper/sections/04_audit_construction.tex)

在模型原图判断正确的子集上，分别测量：

- **相关适应 RA**：相关视觉事实改变后，能否选对新的答案。
- **无关不变 II**：无关视觉事实改变后，能否继续保持正确判断。

这两个量使用各模型自身的原图正确子集作为分母；独立静态准确率在另一组样本上测量。[指标定义](https://github.com/Benjamindaoson/RewardLens/blob/d0f355a9e3926eb25ab46fd5a9797034fb4c7394/paper/sections/03_problem_formulation.tex)

实验覆盖 **8 个多模态评判模型、4 类视觉因素**：数量、属性、存在性和空间关系。独立静态集包含 800 个条目；CLEVR 风格审计包含 800 组三元组、2,400 张渲染图像。[实验设置](https://github.com/Benjamindaoson/RewardLens/blob/d0f355a9e3926eb25ab46fd5a9797034fb4c7394/paper/sections/05_experimental_setup.tex)

## 一个直观结果

在 Attribute 因素上，两模型的实测静态准确率均为 80.5%，但相关编辑后的表现不同：[结果表与分析](https://github.com/Benjamindaoson/RewardLens/blob/d0f355a9e3926eb25ab46fd5a9797034fb4c7394/paper/sections/06_results.tex)

| 模型 | 独立静态准确率 | 相关适应 RA |
|---|---:|---:|
| Phi-3.5-Vision | 80.5% | 84.95% |
| LLaVA-OneVision-7B | 80.5% | 100.00% |

{% include project-evidence.html project_id="rewardlens" %}

RA 相差 **15.05 个百分点**，配对 bootstrap 的 95% 区间为 10.21–20.43 个百分点。按同一因素内静态分数差不超过 1 个百分点的规则，全部 7 组比较的 RA 差异中位数同样为 15.05 个百分点。[匹配比较数据](https://github.com/Benjamindaoson/RewardLens/blob/d0f355a9e3926eb25ab46fd5a9797034fb4c7394/results/paper_analysis/eight_model_raii/matched_1pp.json)

另一例来自 Qwen3-VL-4B 的 Count 审计：200 个原图正确案例中，166 个在相关编辑后仍保留原选择，因正确选项已改变而变成错误。这说明在该分支中，保持不变也可能是失败。[对应结果](https://github.com/Benjamindaoson/RewardLens/blob/d0f355a9e3926eb25ab46fd5a9797034fb4c7394/paper/sections/06_results.tex)

## 这项工作带来的判断

当应用依赖模型随证据变化而调整判断时，静态偏好分数之外还需要检查具体干预行为。RewardLens 为评估增加了这个维度，并保留完整匹配比较、指标定义和结果工件，便于追溯结论。

当前结果限于四类受控因素和冻结的候选顺序。静态分数相等指有限样本中的实测相等；研究没有由此推断模型内部推理，也没有验证部署系统的实际安全性。[讨论与限制](https://github.com/Benjamindaoson/RewardLens/blob/d0f355a9e3926eb25ab46fd5a9797034fb4c7394/paper/sections/08_discussion.tex)

[查看研究仓库](https://github.com/Benjamindaoson/RewardLens) · [阅读论文](https://github.com/Benjamindaoson/RewardLens/blob/d0f355a9e3926eb25ab46fd5a9797034fb4c7394/paper/REWARDLENS_RelatedWork_Original.pdf)

</div>

<div class="i18n i18n-en" markdown="1">

If two multimodal judges have the same static preference accuracy, will they respond equally well when visual evidence changes? RewardLens combines an independent static evaluation with controlled image interventions to measure behavioral differences that a shared score can leave unresolved. [Paper](https://github.com/Benjamindaoson/RewardLens/blob/d0f355a9e3926eb25ab46fd5a9797034fb4c7394/paper/REWARDLENS_RelatedWork_Original.pdf)

## Key decision: fix the language inputs and edit visual evidence

Each audit triplet contains a base image, a relevant edit, and an irrelevant edit. The question, candidate responses, and candidate order stay fixed. Relevant edits are constructed to change the correct choice; irrelevant edits preserve it. Post-render programmatic checks verify the scene facts and label relationships. [Construction and validation](https://github.com/Benjamindaoson/RewardLens/blob/d0f355a9e3926eb25ab46fd5a9797034fb4c7394/paper/sections/04_audit_construction.tex)

Among cases answered correctly on the base image, the audit measures:

- **Relevant Adaptation (RA):** correctness after a relevant visual fact changes.
- **Irrelevant Invariance (II):** correctness after an irrelevant visual fact changes.

Both use each judge's own base-correct subset as the denominator. Independent static accuracy is measured on a separate set. [Metric definitions](https://github.com/Benjamindaoson/RewardLens/blob/d0f355a9e3926eb25ab46fd5a9797034fb4c7394/paper/sections/03_problem_formulation.tex)

The experiment covers **eight multimodal judges and four visual factors**: Count, Attribute, Presence, and Spatial. The independent static set has 800 items; the CLEVR-style audit has 800 triplets and 2,400 rendered images. [Experimental setup](https://github.com/Benjamindaoson/RewardLens/blob/d0f355a9e3926eb25ab46fd5a9797034fb4c7394/paper/sections/05_experimental_setup.tex)

## A concrete result

On Attribute, two judges both achieve 80.5% measured static accuracy, yet differ after relevant edits. [Results and analysis](https://github.com/Benjamindaoson/RewardLens/blob/d0f355a9e3926eb25ab46fd5a9797034fb4c7394/paper/sections/06_results.tex)

| Judge | Independent static accuracy | Relevant Adaptation |
|---|---:|---:|
| Phi-3.5-Vision | 80.5% | 84.95% |
| LLaVA-OneVision-7B | 80.5% | 100.00% |

{% include project-evidence.html project_id="rewardlens" %}

The RA gap is **15.05 percentage points**, with a paired-bootstrap 95% interval of 10.21–20.43 points. Across all seven within-factor comparisons whose measured static scores differ by at most one percentage point, the median RA gap is also 15.05 points. [Matched comparison data](https://github.com/Benjamindaoson/RewardLens/blob/d0f355a9e3926eb25ab46fd5a9797034fb4c7394/results/paper_analysis/eight_model_raii/matched_1pp.json)

Qwen3-VL-4B's Count audit provides another example: in 166 of 200 base-correct cases, it retained its original choice after a relevant edit changed the correct answer. Prediction stability was a failure in that branch. [Corresponding result](https://github.com/Benjamindaoson/RewardLens/blob/d0f355a9e3926eb25ab46fd5a9797034fb4c7394/paper/sections/06_results.tex)

## What the work adds

When an application depends on a judge adapting to changing evidence, static preference accuracy can be complemented with direct intervention measurements. RewardLens supplies this additional axis and preserves the complete matched comparison set, metric definitions, and result artifacts.

The findings apply to four controlled factors and a frozen candidate order. An equal static score means equal observed accuracy on a finite sample. The study does not identify internal reasoning or establish deployed-system safety. [Discussion and limitations](https://github.com/Benjamindaoson/RewardLens/blob/d0f355a9e3926eb25ab46fd5a9797034fb4c7394/paper/sections/08_discussion.tex)

[Research repository](https://github.com/Benjamindaoson/RewardLens) · [Read the paper](https://github.com/Benjamindaoson/RewardLens/blob/d0f355a9e3926eb25ab46fd5a9797034fb4c7394/paper/REWARDLENS_RelatedWork_Original.pdf)

</div>
