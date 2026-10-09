---
layout: project
portfolio_shell: true
title: "多模态内容生产智能体：让长链路创作可以检查与恢复"
title_en: "Multimodal Content Creation Agent: inspectable, recoverable media workflows"
slug: multimodal-content-creation-agent
description: "从长视频转写与证据定位到人工审核和精确导出，把时间戳、质量门、任务状态与失败恢复做成可追踪的工程链路。"
description_en: "Connect transcript-grounded clip discovery, human review, and precise exports through timestamps, quality gates, persistent task state, and recovery."
repository: "https://github.com/Benjamindaoson/multimodal-content-creation-agent"
status: active
year: 2026
lang: zh
bilingual: true
---

<div class="i18n i18n-zh" markdown="1">

## 问题与我的角色

企业产品讲解和知识直播往往包含有价值的片段，但从长视频找到完整表达、定位可用素材、审核再导出，需要反复切换工具。多模态生成链路也会在外部调用、素材持久化或中途失败时留下不完整结果。

我研发面向这些场景的内容生产与再生产工作流，重点是让候选片段有来源、任务可恢复、审核可接管。当前公开仓库有两条独立路径：**上传长视频 → 转写 → 候选片段 → 人工选择 → FFmpeg 导出**，以及 **内容目标 → 脚本/分镜 → 视频与语音生成 → 合成 → 质量检查 → 人工审核**。发布是显式操作。[项目范围](https://github.com/Benjamindaoson/multimodal-content-creation-agent/blob/0a8b152e408b5d7b1438f2fc542464235d656075/README.md)

## 关键决策：把创作建议变成可检查的执行计划

- **时间戳与证据先于剪辑。** 长视频按音频块调用 Groq ASR，再将有重叠的转写窗口交给 DeepSeek 结构化规划。质量门检查时间范围、转写证据、时长和近重复片段；建议需附带理由与证据摘录。导出重新编码以匹配剪辑时间，而不是假设关键帧复制能精确切割。
- **恢复依据已保存的阶段结果。** FastAPI 提供任务、状态与恢复入口；PostgreSQL 保存已完成的 ASR 块和候选窗口，恢复时复用。生成式链路另外保存分镜、素材和阶段 Checkpoint，通过 MinIO/S3 重新物化丢失的本地文件。
- **不让模型分数覆盖硬失败。** 媒体流、时长、脚本完整性和素材覆盖率属于确定性质量门。可选模型 Judge 只补充判断；人工审核保留在发布之前。
- **将重试与外部副作用分开。** 仅对明确瞬时错误重试，取消失败批次的同伴任务；发布结果不明时保留尝试标记，避免自动重复发布。批量 ZIP 导出支持复用已生成 MP4，但进程重启后需要手动恢复。

[长视频实现与恢复语义](https://github.com/Benjamindaoson/multimodal-content-creation-agent/blob/0a8b152e408b5d7b1438f2fc542464235d656075/docs/LONG_VIDEO_REPURPOSING.md) · [生成式工作流](https://github.com/Benjamindaoson/multimodal-content-creation-agent/blob/0a8b152e408b5d7b1438f2fc542464235d656075/docs/MULTIMODAL_CONTENT_AGENT.md)

## 可检查的交付与验证状态

固定提交 `0a8b152` 的 CI 中，**53 项多模态测试通过**，同时通过切片范围的 Lint、Docker 构建与运维脚本检查。这个数字描述软件验证范围，不是 53 个真实客户任务。[CI 记录](https://github.com/Benjamindaoson/multimodal-content-creation-agent/actions/runs/37785137967)

| 层级 | 已有证据 | 不能据此声称 |
|---|---|---|
| 长视频媒体路径 | 真实 FFmpeg/ffprobe 处理本地生成的 17 秒媒体样例，导出约 16 秒片段并检查重复导出复用；ASR 与规划使用固定测试替身 | 真实 ASR/模型质量、真实业务素材上的速度或效果 |
| 持久化与恢复 | PostgreSQL Checkpoint 测试；历史真实 MinIO 删除/恢复验证记录，源文件与恢复文件 SHA-256 一致 | 跨进程自动接管、任意故障下的生产可用性 |
| 外部生成与 Judge | Runway、ElevenLabs 和抽帧 Judge 适配器与确定性测试 | 凭据驱动端到端已经通过或实际成片质量已评估 |
| 发布、指标与学习接口 | 显式发布、指标回收、Outcome 持久化、幂等 RL 同步保护 | 已完成真实平台反馈学习、企业偏好提升或业务增长 |

[真实媒体测试](https://github.com/Benjamindaoson/multimodal-content-creation-agent/blob/0a8b152e408b5d7b1438f2fc542464235d656075/backend/tests/test_workflow/test_multimodal_repurposing_media.py) · [基础设施与外部验证边界](https://github.com/Benjamindaoson/multimodal-content-creation-agent/blob/0a8b152e408b5d7b1438f2fc542464235d656075/docs/PRODUCTION_HARDENING_STATUS.md)

## 下一步与当前局限

企业知识检索、关键帧证据、营销目标约束、可编辑时间线，以及利用人工修改训练排序与偏好模型，是面向内容再生产的扩展方向。**当前公开长视频端点以转写证据为核心；这里不把 RAG、关键帧理解、OpenTimelineIO 或反馈学习效果列为该端点已验证能力。**

现有生成主流程是固定状态机，未验证 Judge 自动触发的开放式重规划；后台任务仍在 API 进程内执行，标准运行方式为单 worker，不能等同于分布式队列的自动故障接管。真实 Groq/DeepSeek 媒体任务与 Runway、ElevenLabs、OpenAI Judge、TikTok 的凭据驱动链路，均需要分别留下实际运行证据。

后续业务评估可记录审核通过率、精剪工时和单位合格成片成本；**目前没有可报告的业务改善数字**。现有任务记录包含源媒体时长、候选/通过片段数与执行耗时，不应据此推导供应商真实 token 用量、采纳率或偏好学习收益。

[源码与操作入口](https://github.com/Benjamindaoson/multimodal-content-creation-agent)

</div>

<div class="i18n i18n-en" markdown="1">

## Problem and my role

Product demonstrations and educational livestreams contain reusable material, but finding a self-contained passage, locating its footage, reviewing it, and exporting it requires repeated tool changes. Generative media pipelines also leave incomplete results when provider calls, artifact storage, or intermediate stages fail.

I develop content-production and repurposing workflows for these settings, focusing on traceable candidates, recoverable tasks, and human review. The public repository has two separate paths: **uploaded video → transcription → candidate clips → human selection → FFmpeg export**, and **content brief → script/storyboard → video and speech generation → assembly → quality checks → human approval**. Publishing is explicit. [Project scope](https://github.com/Benjamindaoson/multimodal-content-creation-agent/blob/0a8b152e408b5d7b1438f2fc542464235d656075/README.md)

## Key decisions: make creative suggestions inspectable and executable

- **Ground edits in timestamps and evidence.** Groq ASR processes audio chunks; overlapping transcript windows go to DeepSeek for structured planning. Quality gates check bounds, transcript support, duration, and near duplicates. Suggestions retain a reason and evidence excerpt. Exports re-encode for accurate cuts instead of assuming keyframe copying is precise.
- **Recover from completed stages.** FastAPI exposes task, status, and resume endpoints. PostgreSQL preserves completed ASR chunks and candidate windows for reuse. The generative path also checkpoints storyboards, assets, and stages, and can re-materialize missing local files from MinIO/S3.
- **Keep hard failures separate from model scores.** Media streams, duration, script completeness, and asset coverage are deterministic gates. An optional model judge adds a separate assessment; human approval remains before publishing.
- **Separate retries from external side effects.** Only explicit transient failures are retried; failed parallel batches cancel sibling work. An ambiguous publish attempt remains marked to prevent automatic duplicate posting. Batch ZIP exports reuse rendered MP4s, but process-restart recovery is manual.

[Long-video implementation and recovery](https://github.com/Benjamindaoson/multimodal-content-creation-agent/blob/0a8b152e408b5d7b1438f2fc542464235d656075/docs/LONG_VIDEO_REPURPOSING.md) · [Generative workflow](https://github.com/Benjamindaoson/multimodal-content-creation-agent/blob/0a8b152e408b5d7b1438f2fc542464235d656075/docs/MULTIMODAL_CONTENT_AGENT.md)

## Inspectable deliverables and validation status

At pinned commit `0a8b152`, CI passed **53 multimodal tests**, slice-scoped lint, a Docker build, and operations-script checks. This count describes software validation, not 53 real customer jobs. [CI record](https://github.com/Benjamindaoson/multimodal-content-creation-agent/actions/runs/37785137967)

| Layer | Available evidence | Not established by this evidence |
|---|---|---|
| Long-video media path | Real FFmpeg/ffprobe processes a locally generated 17-second fixture, exports about 16 seconds, and checks export reuse; ASR and planning use recorded test doubles | Real ASR/model quality, latency, or effectiveness on business media |
| Persistence and recovery | PostgreSQL checkpoint tests; a historical real MinIO delete/recover record with matching SHA-256 | Automatic cross-process takeover or production availability under arbitrary faults |
| External generation and judging | Runway, ElevenLabs, and frame-sampled judge adapters with deterministic tests | A completed credentialed end-to-end pass or measured generated-video quality |
| Publishing, outcomes, and learning interfaces | Explicit publishing, metrics ingestion, persisted outcomes, and idempotent RL synchronization guards | Successful real-platform feedback learning, enterprise-preference gains, or business growth |

[Real-media test](https://github.com/Benjamindaoson/multimodal-content-creation-agent/blob/0a8b152e408b5d7b1438f2fc542464235d656075/backend/tests/test_workflow/test_multimodal_repurposing_media.py) · [Infrastructure and external validation limits](https://github.com/Benjamindaoson/multimodal-content-creation-agent/blob/0a8b152e408b5d7b1438f2fc542464235d656075/docs/PRODUCTION_HARDENING_STATUS.md)

## Next steps and current limits

Enterprise-knowledge retrieval, keyframe evidence, marketing constraints, editable timelines, and training ranking or preference models from human edits are extension directions. **The current public long-video endpoint is transcript-grounded. RAG, keyframe understanding, OpenTimelineIO, and feedback-learning effectiveness are not presented here as validated capabilities of that endpoint.**

The generative path uses a fixed state machine; an open-ended judge-triggered replanning loop is not validated. Background execution remains inside the API process, with one worker as the standard operating mode; it does not provide queue-backed automatic failover. Real Groq/DeepSeek media jobs and credentialed Runway, ElevenLabs, OpenAI Judge, and TikTok paths each need retained execution evidence.

Future business evaluation can track approval rate, editing time, and cost per accepted final clip. **No measured business improvement is currently reported.** Existing job records include source duration, candidate/accepted counts, and elapsed time; these do not establish provider token usage, adoption rates, or gains from preference learning.

[Source and setup](https://github.com/Benjamindaoson/multimodal-content-creation-agent)

</div>
