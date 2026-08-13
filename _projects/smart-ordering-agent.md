---
layout: project
title: "SmartOrderingAgent：让 Agent 参与交易，但不拥有最终承诺权"
slug: smart-ordering-agent
description: "一个餐厅订位 MVP：模型理解自然语言并调用白名单工具，业务系统负责确认、校验、事务与容量承诺。"
repository: "https://github.com/Benjamindaoson/SmartOrderingAgent"
status: prototype
year: 2026
---

## 问题

用户会用自然语言表达订位需求，而真实订位不能依赖模型“猜对了”：菜单、价格、容量和最终预订必须来自业务系统；同时，两个用户在同一时段确认时不能造成超卖。

## 系统设计

项目把模型限制在“理解与协助”的位置。DeepSeek 通过 tool calling 调用有限的只读查询、推荐与“准备订位”工具；模型不能直接创建或取消预订。后端先返回与会话绑定、限时的确认令牌，只有用户明确确认后，FastAPI 服务才在 MySQL 事务中重新校验容量并写入预订。

这条边界把自然语言交互与真实业务承诺分开：菜单和容量是数据库事实，模型不是事实来源；推荐基于结构化菜单规则，避免把小规模强一致数据错误地交给向量检索。

## 验证方式

仓库提供本地测试、前端构建与浏览器 E2E 验证入口，覆盖确认令牌、订位校验、容量边界、Agent API 合约和核心流程。代码也明确展示了 MySQL 事务、行锁和二阶段确认在高峰订位场景中的作用。

## 当前边界

这是一个可以写入 MySQL 的 MVP，而不是完整的公网订位产品。账户或 OTP、TLS、密钥托管、持久化限流、备份恢复、监控告警和真实桌台容量模型仍是上线前需要补足的系统能力。

## 源码

- [查看 SmartOrderingAgent 公开仓库]({{ page.repository }})
