---
layout: project
title: "AI Agent Engineering Lab：把 Agent 学习变成可运行、可检查的工程路径"
slug: ai-agent-engineering-lab
description: "一个包含 19 个可运行 Python Agent 子项目、课程闯关工具与本地学习平台的工程教学实验库。"
repository: "https://github.com/Benjamindaoson/ai-agent-engineering-lab"
status: active
year: 2026
---

## 问题

学习 Agent 工程时，零散 Demo 很难说明工具调用、状态、记忆、协议、工作流和评审如何组合成可维护系统。学习者需要一条能运行、能自检、能逐步解锁的练习路径，而不是只读课件。

## 系统设计

仓库把内容拆为 19 个独立的 Python Agent 工程主题，涵盖工具调用、任务执行、RAG、MCP、A2A、多模态、图工作流和评审。`course.py` 以关卡顺序运行测试与离线演示；AgentLab 本地平台进一步把学习规划、项目实战、沙箱运行、Agent 评审和能力证据串成闭环。

这种模块化设计把“概念讲解”与“可执行工程练习”连接起来，同时允许每个子项目独立阅读、运行和测试。

## 验证方式

每个教学项目带有源码、测试、`self_check` 和离线演示。课程工具以当前关卡的测试与演示作为解锁条件，因此学习路径并不依赖单纯的阅读完成状态。

## 当前边界

这是一个面向课程、训练营、企业内训和个人作品集的本地工程教学项目库。它不是托管式在线教育服务；部署、身份、多人协作和运营能力不属于当前公开实现的承诺范围。

## 源码

- [查看 AI Agent Engineering Lab 公开仓库]({{ page.repository }})
