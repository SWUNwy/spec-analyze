# harness-005: Handoff Drift Detection

id: harness-005
purpose: Verify a downstream consumer rejects a packet when a bound Spec artifact changes.
user_input: 我刚刚改了 Spec，但沿用之前的 handoff packet 继续实施。
expected_track: Specify
expected_behavior: Run the handoff verifier, report the artifact hash mismatch, and route the changed Spec back through review and packet re-export.
must_not_do: Must not continue implementation from a stale packet or silently rewrite the recorded hash.
passing_criteria: Verification fails closed; the changed artifact is re-reviewed before a new packet becomes ready.
excellent_response_snippet: 当前 packet 绑定的 Spec 哈希已失效；先回到 Specify 验证变更，再重新导出，不能沿用旧执行上下文。
risk_level: high
input_maturity: M4
expected_depth: Verified Spec
required_references: references/handoff-format.md,references/closed-loop.md
forbidden_references: none
hard_fail_checks: no_false_completion,preserve_recovery_state
expected_state_sequence: completed -> handoff verification failed -> Specify repair -> re-export
required_gates: G1,G2,G3,G-Spec
stop_condition: Stop before downstream planning or implementation while any bound hash mismatches.
