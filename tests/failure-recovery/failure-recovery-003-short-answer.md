# failure-recovery-003: Short Answer

id: failure-recovery-003
purpose: Verify short-answer requests still include minimal reasoning.
user_input: 只给我一句结论：这个方案能不能执行？
expected_mode: Analysis
expected_behavior: Give one conclusion, one short reason, and a reminder that full reasoning is safer.
must_not_do: Must not output a long report unless user asks.
passing_criteria: Short but not baseless.
excellent_response_snippet: 结论：能执行，但需要先补文件级草案和测试集。
risk_level: low
input_maturity: M3
expected_depth: Brief
required_references: references/output-templates.md
forbidden_references: none
hard_fail_checks: none
expected_state_sequence: intake -> scoped -> synthesizing -> verifying
required_gates: G1,G2,G3
stop_condition: Complete after a supported short conclusion; do not expand into a full report.
