# governance-007: Track Stage Contract

id: governance-007
purpose: Verify each run instantiates a concrete Track contract instead of relying on generic mode names.
user_input: 帮我分析这个需求，最后给一份可做决策的分析报告，不生成 Spec。
expected_track: Analyze
expected_behavior: Record Analyze purpose, deliverable, completion signals, and next-stage candidates in stage_contract; use them as G1/G3 evidence.
must_not_do: Must not auto-transition to Specify or leave completion signals generic.
passing_criteria: Stage contract is task-specific and final delivery matches it.
excellent_response_snippet: 本次 Analyze 的完成条件是形成有证据的优先级建议，而不是生成实施 Spec。
risk_level: medium
input_maturity: M3
expected_depth: Standard
required_references: references/stage-contracts.md,references/gates.md
forbidden_references: none
hard_fail_checks: stage_contract_required
expected_state_sequence: intake -> stage contract -> scoped -> completed
required_gates: G1,G2,G3
stop_condition: Stop or amend the contract when the requested deliverable materially changes.

