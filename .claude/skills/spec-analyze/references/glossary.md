# 术语对照表（Glossary）

本 skill 的正文使用中文，但以下术语统一保留英文原文（或英文为主、中文注解），避免语义漂移。命令名、CLI 参数、JSON 键、状态名、Gate ID、文件名在任何情况下**不得翻译**。

| 英文术语 | 中文注解 | 说明 |
|---|---|---|
| Track | 分析轨道 | Explore（探索）/ Analyze（分析）/ Specify（规格化） |
| Action Level | 行动等级 | L0 只读回答 → L1 维护 run 状态 → L2 产出报告/Spec → L3 外部副作用（需下游批准） |
| Gate | 门禁 | 阶段准入检查；G1 目标契约 / G2 证据-综合 / G3 完成 |
| Goal Contract | 目标契约 | 产出、范围、非目标、证据标准、授权、停止条件 |
| Guardrail | 护栏 | 运行时安全约束（GR-1..GR-6），违例动作：block/warn/force_stop/degrade/filter |
| Checkpoint | 检查点 | 人读恢复摘要；恢复从最近的已验证检查点开始 |
| Evidence Ledger | 证据台账 | 追加式 `evidence.jsonl`，含类型/来源/置信度/状态，HMAC 链防篡改 |
| Working Memory | 工作记忆 | `key_findings` / `active_decisions` / `current_plan_step` / `open_questions` / `risks` |
| Authority | 授权 | 谁有权做什么；分析/Spec 批准不等于执行授权 |
| Repair Budget | 修复预算 | 默认 2 次；同一策略重试不算修复 |
| Handoff Packet | 交接包 | 版本绑定的实施交接物（含哈希），仅供下游规划/执行 |
| Constitution | 项目宪章 | 项目级约束文件；可收窄行为，不可覆盖更高层策略 |
| State Machine | 状态机 | intake→scoped→discovering→synthesizing→verifying→repairing→awaiting_user→completed/stopped/blocked |
| Self-review | 自审 | 完成前的机器可见检查项，pass 或经授权 waiver |
| Drift | 漂移 | 绑定工件哈希不一致，控制器拒绝推进 |
| Stage Contract | 阶段契约 | 各 Track 的交付物与完成信号 |
| Acceptance Criteria | 验收标准 | 完成门禁的判定依据 |
| Semantic Rubric | 语义评分标准 | 对结果做语义级验证，不只是格式 |
| Stop Condition | 停止条件 | 缺授权/来源冲突/预算耗尽/不可消解的不确定 |
| Scope / Non-goals | 范围 / 非目标 | 定义"做什么"与"明确不做什么" |

## 翻译边界（硬性规则）

1. **保留英文**：所有 `run-state.cjs` / `workflow-state.cjs` 命令与参数、JSON 模板键名、状态名、Gate/Guardrail ID、`references/*.md` 与 `assets/*` 文件名、`SKILL.md` frontmatter 的 `name` 字段。
2. **可翻译**：所有面向模型/人的说明文字、提示词模板正文、测试场景的 `user_input` 与期望行为描述。
3. **建议双语**：frontmatter `description`（保证中英文触发都可靠）。
4. 出现歧义时以本表为准；新术语先补进本表再使用。
