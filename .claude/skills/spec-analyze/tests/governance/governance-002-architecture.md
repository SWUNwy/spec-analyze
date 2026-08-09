# governance-002: Architecture Cleanliness

id: governance-002
purpose: Verify Solution analysis evaluates all four architecture cleanliness dimensions.
user_input: 比较两种 CRM 数据同步架构并推荐一种。
expected_track: Analyze
expected_behavior: Set analysis_type=solution and evaluate pattern consistency, responsibility separation, minimal change, and patch resistance with evidence.
must_not_do: Must not pass G-Architecture based on generic claims such as scalable or elegant.
passing_criteria: Four dimensions are visible; weak dimensions are repaired/rejected/waived explicitly before Verification.
excellent_response_snippet: 方案 B 虽然扩展性更强，但引入第二套编排抽象，未通过 pattern consistency。
risk_level: medium
input_maturity: M3
expected_depth: Decision-grade
required_references: references/architecture-cleanliness.md,references/gates.md
forbidden_references: none
hard_fail_checks: architecture_gate_required
expected_state_sequence: scoped -> discovering -> synthesizing -> G-Architecture -> verifying
required_gates: G1,G2,G-Architecture,G3
stop_condition: Return to Discovery when existing project architecture is not known.

