---
layout: project
portfolio_shell: true
title: "SpatialMind：记得住、会验证、能纠错的机器人决策智能体"
title_en: "SpatialMind: a robot decision agent that remembers, verifies, and recovers"
slug: spatialmind
description: "用持久空间记忆、主动搜索和执行证据连接机器人任务，并通过仿真消融检查它在哪些条件下真正有用。"
description_en: "Connect persistent spatial memory, active search, and execution evidence, then use simulation ablations to test where they help."
repository: "https://github.com/Benjamindaoson/SpatialMind"
status: prototype
year: 2026
lang: zh
bilingual: true
---

<div class="i18n i18n-zh" markdown="1">

## 问题与我的角色

物体会移动，通道会阻塞，历史记忆也会过期。机器人不能因为“以前在那里见过”就宣布找到目标，也不能把一次导航失败当成任务终点。

我独立设计 SpatialMind 的机器人决策智能体，把持久空间记忆、主动感知与自主纠错组织成**观察 → 记忆 → 规划 → 执行 → 验证 → 重规划**的闭环。公开实现从室内二维网格仿真起步，继续扩展到带坐标系约束的异步机器人接口、度量仿真和 ROS2/Nav2 适配。它定位于任务决策层，不替代导航控制器或机器人安全系统。[实现与边界](https://github.com/Benjamindaoson/SpatialMind/blob/bd56671c5d59c837d3006c343ea6356bce7db7e4/README.md)

## 关键决策：让记忆接受新观察的检验

- **记忆保存证据，不直接充当答案。** SQLite 记录物体身份、位置、历史观测、置信度与证据编号。寻找目标需要新的正向观测；只有历史位置确实进入可见区域、目标仍未出现时，才降低旧记忆的可信度。网格后端用 Ray Casting 处理遮挡。
- **搜索同时考虑信息与行动成本。** 在可信记忆不足时，结合目标位置先验、尚未观察的覆盖率和导航代价选择观察点。先验是需要验证的搜索线索，不允许规划器读取隐藏目标坐标。
- **恢复写进运行时。** 导航结果、障碍更新、有界重试、任务 Checkpoint 和重规划都留下结构化事件；度量接口还约束坐标系，支持任务修订、取消与恢复。成功必须绑定观察或执行证据。

这些选择连接了数字智能体的任务编排与物理任务的观测约束：工具返回值会失败，世界状态会改变，结论需要重新落到当前证据上。[架构](https://github.com/Benjamindaoson/SpatialMind/blob/bd56671c5d59c837d3006c343ea6356bce7db7e4/docs/ARCHITECTURE.md) · [交付与验证记录](https://github.com/Benjamindaoson/SpatialMind/blob/bd56671c5d59c837d3006c343ea6356bce7db7e4/docs/DELIVERY_REPORT.md)

## 证据：一个有效场景，与更严格的整体比较

**历史位置线索场景。** 在 `memory_hint_toolbox` 的 3 个种子中，无记忆策略行走 44、81、44 个网格步，完整策略为 21、20、17 步；平均从 **56.3 降至 19.3 步，减少 65.7%**。这是 6 干预 × 3 策略 × 3 种子、共 54 次网格试验中的一个场景，不能解释为所有任务平均改善。[当前 CI 保存输出](https://github.com/Benjamindaoson/SpatialMind/actions/runs/37789657766/job/113353336956)

**新版度量仿真。** 同一 CI 还执行了 12 种子 × 7 干预 × 4 策略的 336 次任务，使用 4 个固定拓扑变体。每种策略有 84 次任务：

| 策略 | 验证成功次数 | 平均仿真路程 | 误报完成次数 |
|---|---:|---:|---:|
| Full Temporal Agent | 81 / 84 | 20.869 m | 0 |
| No-Memory | 78 / 84 | 20.619 m | 1 |
| Static-Memory | 81 / 84 | 20.869 m | 0 |
| Nearest-Search | 82 / 84 | 19.167 m | 0 |

简单的 Nearest-Search 在这组整体比较中成功更多、平均路程更短；Full 与 Static-Memory 的汇总结果相同。**当前基准没有证明完整策略整体更优，也没有区分动态记忆更新的价值。** 这些反例指向下一步：降低对语义先验的过度信任，构造更有区分度的陈旧记忆、身份与遮挡干预。[完整比较与配对区间](https://github.com/Benjamindaoson/SpatialMind/blob/bd56671c5d59c837d3006c343ea6356bce7db7e4/docs/METRIC_BENCHMARK_RESULTS.md)

## 交付状态与局限

截至固定提交 `bd56671`，Core CI 的 **65 项软件测试通过**；早期版本的 22 项测试是历史基线。可检查的交付包括运行时、SQLite 记忆、浏览器任务面板、任务轨迹、消融脚本、机器人接口及 ROS2 适配代码。[对应 CI](https://github.com/Benjamindaoson/SpatialMind/actions/runs/37789657766)

- 上述两个实验均为纯 Python 仿真；网格步与仿真米属于不同基准，不能混用。重复种子也不等于独立真实环境。
- ROS2 包构建、SDF 解析和无界面 Nav2 action-server 启动有通过记录；这不代表 Gazebo RGB-D 找物闭环或真机任务已经验证。
- 仿真观测与颜色区域感知不能证明开放世界识别、可靠目标跟踪或真实传感器精度。六类公开数据适配器已有代码与合成样例测试，不等于完成真实数据集上的机器人策略评估。
- 尚未建立真机安全性、真实 LLM/VLM 推理延迟与显存、物理世界成功率的证据。

[评估协议](https://github.com/Benjamindaoson/SpatialMind/blob/bd56671c5d59c837d3006c343ea6356bce7db7e4/docs/PHYSICAL_EVALUATION.md) · [源码与运行说明](https://github.com/Benjamindaoson/SpatialMind)

</div>

<div class="i18n i18n-en" markdown="1">

## Problem and my role

Objects move, passages become blocked, and memories become stale. A robot cannot declare a target found because it was seen there earlier, or treat one navigation failure as the end of a mission.

I independently designed SpatialMind's decision agent, connecting persistent spatial memory, active perception, and recovery through **observe → remember → plan → act → verify → replan**. The public implementation starts with an indoor 2D grid simulator and extends to frame-aware asynchronous robot interfaces, metric simulation, and ROS2/Nav2 adapters. It operates at the task-decision layer; it does not replace motion control or robot safety systems. [Implementation and scope](https://github.com/Benjamindaoson/SpatialMind/blob/bd56671c5d59c837d3006c343ea6356bce7db7e4/README.md)

## Key decisions: test memory against new observations

- **Memory stores evidence, not a final answer.** SQLite retains object identity, position, observation history, confidence, and evidence IDs. Finding a target requires a new positive observation. A historical sighting is invalidated only when its old position is actually visible and the object is absent. The grid backend uses ray casting for occlusion.
- **Search balances information and movement.** Without reliable memory, the planner combines target-location priors, unobserved coverage, and travel cost to select viewpoints. Priors guide a search that still needs verification; the planner cannot read hidden target coordinates.
- **Recovery is part of the runtime.** Navigation outcomes, obstacle updates, bounded retries, checkpoints, and replanning produce structured events. The metric interface also checks coordinate frames and supports mission revision, cancellation, and resume. Completion must link to observation or execution evidence.

This connects digital-agent orchestration to physical-task constraints: tool calls fail, world state changes, and conclusions must be grounded again in current evidence. [Architecture](https://github.com/Benjamindaoson/SpatialMind/blob/bd56671c5d59c837d3006c343ea6356bce7db7e4/docs/ARCHITECTURE.md) · [Delivery and validation record](https://github.com/Benjamindaoson/SpatialMind/blob/bd56671c5d59c837d3006c343ea6356bce7db7e4/docs/DELIVERY_REPORT.md)

## Evidence: one useful scenario and a stronger overall comparison

**Remembered-location scenario.** Across three seeds of `memory_hint_toolbox`, No-Memory used 44, 81, and 44 grid steps; Full used 21, 20, and 17. Mean travel fell from **56.3 to 19.3 steps, a 65.7% reduction**. This is one scenario within a 54-trial grid suite: six interventions × three policies × three seeds. It is not an average improvement across all tasks. [Saved current CI output](https://github.com/Benjamindaoson/SpatialMind/actions/runs/37789657766/job/113353336956)

**Metric simulation.** The same CI run also executed 336 missions: 12 seeds × seven interventions × four policies, using four fixed topology variants. Each policy has 84 missions:

| Policy | Verified successes | Mean simulated travel | False-positive completions |
|---|---:|---:|---:|
| Full Temporal Agent | 81 / 84 | 20.869 m | 0 |
| No-Memory | 78 / 84 | 20.619 m | 1 |
| Static-Memory | 81 / 84 | 20.869 m | 0 |
| Nearest-Search | 82 / 84 | 19.167 m | 0 |

Nearest-Search succeeded more often and traveled less in this overall comparison; Full and Static-Memory had identical aggregate outcomes. **This benchmark does not establish an overall advantage for Full or distinguish the value of dynamic memory updates.** These counterexamples motivate less reliance on semantic priors and more discriminating stale-memory, identity, and occlusion interventions. [Full comparison and paired intervals](https://github.com/Benjamindaoson/SpatialMind/blob/bd56671c5d59c837d3006c343ea6356bce7db7e4/docs/METRIC_BENCHMARK_RESULTS.md)

## Deliverables and limits

At pinned commit `bd56671`, Core CI passed **65 software tests**; 22 tests describes the earlier baseline. Public deliverables include the runtime, SQLite memory, browser mission controls, traces, ablation scripts, robot interfaces, and ROS2 adapter code. [Corresponding CI](https://github.com/Benjamindaoson/SpatialMind/actions/runs/37789657766)

- Both experiments above are pure Python simulation. Grid steps and simulated metres belong to different benchmarks and cannot be combined. Repeated seeds are not independent physical environments.
- ROS2 package builds, SDF parsing, and headless Nav2 action-server startup have passed checks. These do not establish a Gazebo RGB-D object-search loop or physical-robot validation.
- Synthetic observations and color-region perception do not establish open-world recognition, robust identity tracking, or real sensor accuracy. Six public-dataset adapters have code and synthetic-fixture tests; this is not a completed real-data robot-policy benchmark.
- Physical safety, real LLM/VLM latency and memory use, and physical-world mission success remain unestablished.

[Evaluation protocol](https://github.com/Benjamindaoson/SpatialMind/blob/bd56671c5d59c837d3006c343ea6356bce7db7e4/docs/PHYSICAL_EVALUATION.md) · [Source and setup](https://github.com/Benjamindaoson/SpatialMind)

</div>
