# 交接包协议（Handoff Packet Protocol）

在 `Specify` run 完成、下一阶段将由宿主代理或其他 Skill 处理时使用本协议。包保留已验证的分析边界；**它不授权实施**。

## 导出前置条件

仅当所有条件成立时才导出：

1. run 的 Track 为 `specify` 且 status 为 `completed`。
2. G1、G2、G3、G-Spec、每个适用的条件门禁与每个 Constitution 门禁均为 `pass`。
3. `self-review` Check 为 `pass` 或显式 `waived`。
4. 每个声明的 Spec 工件存在且是常规文件。
5. 执行计划声明了 objective、至少一个有界 step、至少一个 verification check。
6. 项目 Constitution 自应用以来未漂移。

任一条件失败，不产出 `ready` 包。修复 run 或返回精确的未满足前置条件。

## 导出输入

创建一个小 JSON manifest。决策保留在 `evidence.jsonl` 中（`kind=decision`），不要在 manifest 中手工重复。

```json
{
  "schema_version": "1.0",
  "target": {
    "stage": "plan",
    "recommended_skill": "writing-plans"
  },
  "spec_subtypes": ["form_data_heavy", "product_frontend"],
  "spec_artifacts": [
    { "path": "specs/crm.md", "role": "primary_spec" }
  ],
  "execution_plan": {
    "objective": "Implement the verified CRM Spec",
    "steps": [
      {
        "id": "S1",
        "action": "Create the domain model",
        "outputs": ["model files"],
        "depends_on": []
      }
    ],
    "verification": ["Run unit tests", "Check every acceptance criterion"],
    "constraints": ["Do not change unrelated modules"]
  }
}
```

`spec_subtypes` 可选但建议提供。允许值：`form_data_heavy`、`product_frontend`、`event_driven`、`infrastructure_algorithm`。可多选。省略时导出器回退到 `state.spec_subtypes`（若存在），否则用空数组且验证器发警告（下游 skill 会失去扩展层可见性）。

导出：

```bash
node <skill-dir>/scripts/export-handoff.cjs \
  --state <run-dir>/state.json \
  --input <handoff-input.json>
```

消费前验证：

```bash
node <skill-dir>/scripts/verify-handoff.cjs \
  --packet <run-dir>/handoff-packet.json
```

默认输出为 `<run-dir>/handoff-packet.json`。除非提供 `--force`，否则不覆盖已存在的包。

## 包契约

导出器创建：

- `handoff-packet.json`：结构化下游输入。
- `handoff-packet.sha256`：包字节的精确校验和。
- `execution-feedback.jsonl`：下游发现的追加式目标。

包包含：

| 区块 | 含义 |
|---|---|
| `source` | Run、状态快照哈希、Track、status 与项目根 |
| `readiness` | 已通过门禁与 self-review 证据 |
| `artifacts` | 按 SHA-256、大小、role 与路径绑定的 Spec 文件 |
| `context` | Goal、范围、非目标、假设、验收证据、声明的 Spec Subtypes 与决策事件 |
| `evidence_ledger` | 证据文件引用、SHA-256、条数与全部解析事件（含行号） |
| `execution` | 目标 stage/Skill、有界步骤、验证与约束 |
| `authority` | 显式声明：包不授予任何实施或外部授权 |
| `feedback` | 执行发现的追加式位置与必需事件字段 |

## Spec Subtype 传播

`context.spec_subtypes` 把 Specify 阶段声明的 Spec Subtype（见 `spec-templates.md`）带进每个下游阶段。下游 skill 据此知道哪些扩展区块应已起草、哪些验证维度适用。

| Subtype 值 | 上游必需起草的 Spec 区块 | 下游强制 |
|---|---|---|
| `form_data_heavy` | Field List、Display Rules、Edit Rules、Validation Rules | Plan 必须包含字段级任务；Verify 必须检查 Validation Rules 覆盖 |
| `product_frontend` | Page Inventory、Key Interactions | Plan 必须包含页面/交互任务；Verify 必须检查交互错误态 |
| `event_driven` | Events Emitted、Side Effects、Subscribers | Plan 必须包含事件契约任务；Verify 必须检查幂等性与订阅者失败路径 |
| `infrastructure_algorithm` | 无（仅核心层） | Plan/Verify 仅应用核心维度 |

`spec_subtypes` 为空或缺失时，下游消费者按 core-only 处理并发警告。没有匹配 subtype 却包含扩展层工作的计划是可疑的——计划评审应标记此不匹配。

## 消费者协议

规划或实施前，下游消费者必须：

1. 重算 `handoff-packet.sha256` 与每个工件哈希。
2. 确认 `source.status=completed`、`source.track=specify`、`readiness.status=ready`。
3. 改计划前读 `context.assumptions`、`context.decisions` 与矛盾证据。
4. 把 `execution.steps` 视为规划输入，不是许可或不可变指令。
5. 应用宿主代理当前的批准、仓库、测试与安全策略。
6. 若实施使假设、决策、验收标准或 Spec 文件失效：停止受影响的步骤，并向 `execution-feedback.jsonl` 追加事件。

推荐反馈事件：

```json
{
  "timestamp": "2026-07-20T00:00:00.000Z",
  "kind": "assumption_invalidated",
  "step_id": "S1",
  "claim": "The existing RBAC model cannot express the required scope",
  "evidence": "src/rbac/model.ts:42",
  "impact": "Spec decision D2 must be revisited",
  "recommended_route": "return_to_analyze"
}
```

Claude Code 场景继续读 `workflow-orchestration.md`：它增加共享生命周期状态与宿主驱动的路由（writing-plans → 人工执行门禁 → executing-plans → verification-before-completion）。宿主仍执行 Skill 调用；无人值守执行与多宿主调度仍在本阶段之外。
