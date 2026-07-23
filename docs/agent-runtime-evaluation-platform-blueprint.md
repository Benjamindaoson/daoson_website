# Agent Runtime & Evaluation Platform Blueprint

## 定位

长期旗舰：

**Enterprise Agent Runtime & Evaluation Platform**  
**企业级 Agent Runtime 与评估平台**

当前状态：**规划中，不是 Working Demo，不是生产系统。**

## 平台目标模块

1. Model Layer
2. Agent Runtime
3. Context & Data
4. Evaluation
5. Production Engineering
6. Security & Governance

## 模块成熟度矩阵

| 模块 | 现有复用来源 | 已存在能力 | 缺口 | 实施顺序 | 验收条件 |
|---|---|---|---|---:|---|
| Model Layer | 无公开来源 | 未实现 | model config、routing、fallback、serving | 4 | 至少有模型选择、fallback 策略和调用边界 |
| Agent Runtime | Digital Employee System | 问题定义：协作、工具调用、状态恢复、人类确认 | execution loop、state、checkpoint、tool registry、timeout/retry、audit | 1 | 有最小可运行 loop 或可公开流程图 |
| Context & Data | Digital Employee System；EduRAG 候选 | 上下文交接概念 | retrieval、rerank、citation、memory、permission filtering | 2 | 有数据流、上下文窗口策略和权限边界 |
| Evaluation | Digital Employee System | 评估理念 | golden dataset、task success、tool accuracy、argument accuracy、trajectory quality、regression | 3 | 有最小 eval schema、样例和一次评估记录 |
| Production Engineering | SmartOrderingAgent 候选 | 未实现 | API、async、streaming、database、cache、Docker、CI/CD、logs/metrics/trace | 5 | 有本地运行、日志和最小部署说明 |
| Security & Governance | public privacy docs | 公开隐私边界 | approval、audit、permission、secret handling、data boundary | 6 | 有权限、审计和敏感信息处理边界 |

## 最小实施顺序

1. Agent Runtime：先证明 agent 能按 loop 跑起来。
2. Context & Data：再证明上下文和数据如何进入系统。
3. Evaluation：补最小评估闭环。
4. Model Layer：补模型选择、路由和 fallback。
5. Production Engineering：补 API、运行方式、日志。
6. Security & Governance：补权限、审计、隐私边界。

## 进入网站前 P0 条件

- 明确写“当前状态”，不能写成完成态。
- 至少有一个可公开流程图或运行链路。
- 至少有一个评估样例。
- 至少有一个测试或运行记录。
- 明确哪些能力未实现。
- 明确可公开边界。

## 不得写入

- Production
- Enterprise-grade 成品
- Serving real customers
- 未验证性能数据
- 未公开客户或公司名称

