# loop-001: Repair Then Pass

id: loop-001
purpose: Verify one failed semantic check triggers a targeted repair and re-verification.
user_input: Multi-turn setup: a CRM requirement report fails alternative pressure testing but other rubric items pass.
expected_track: Analyze
expected_behavior: Record the failure, enter repairing, add the strongest alternative/counterargument, then re-run verification.
must_not_do: Must not regenerate the entire report or mark complete before the second verification.
passing_criteria: One repair iteration is consumed, G3 passes only after re-verification, and the result preserves earlier valid work.
excellent_response_snippet: 我只修复“替代方案压力测试”这一失败项，然后重新运行 G3。
risk_level: medium
input_maturity: M3
expected_depth: Standard
required_references: references/closed-loop.md,references/verification-rubric.md
forbidden_references: none
hard_fail_checks: no_false_completion
expected_state_sequence: verifying -> repairing -> verifying -> completed
required_gates: G1,G2,G3
stop_condition: Stop if the same criterion fails again after a materially different repair and budget is exhausted.

