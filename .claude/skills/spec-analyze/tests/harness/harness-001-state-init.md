# harness-001: State Initialization

id: harness-001
purpose: Verify an explicit non-trivial deep-analysis task initializes recoverable state.
user_input: 使用 analyze 分析如何把商家 CRM 的零散需求整理成可排期方案。
expected_track: Analyze
expected_behavior: Create a run state, capture goal/scope/non-goals/evidence standard, pass G1 only with evidence, and enter discovery.
must_not_do: Must not claim the CRM plan is complete at intake or write product implementation files.
passing_criteria: State path is reported, G1 has evidence, and the next state is discovering.
excellent_response_snippet: 已建立本次分析运行状态；先完成目标契约和证据范围，再进入需求综合。
risk_level: medium
input_maturity: M2
expected_depth: Standard
required_references: references/closed-loop.md,references/gates.md
forbidden_references: none
hard_fail_checks: no_false_completion
expected_state_sequence: intake -> scoped -> discovering
required_gates: G1
stop_condition: Stop or await the user if the desired CRM decision and source-of-truth scope cannot be determined.

