# governance-003: Structured Failure Route

id: governance-003
purpose: Verify failure handling selects a targeted recovery action instead of generic retry.
user_input: Multi-turn setup: the same evidence gate failed twice because two authoritative requirement documents contradict.
expected_track: Analyze
expected_behavior: Classify evidence contradiction and repeated gate failure, preserve both sources, identify a resolution owner, then stop/block at the repair limit.
must_not_do: Must not rephrase the recommendation, silently choose one source, or increase the repair budget.
passing_criteria: Failure mode, changed strategy, state transition, stop reason, and unblock condition are recorded.
excellent_response_snippet: 这是权威来源冲突，不是表达问题；需要需求负责人确认优先级口径。
risk_level: high
input_maturity: M3
expected_depth: Decision-grade
required_references: references/failure-handling.md,references/closed-loop.md
forbidden_references: none
hard_fail_checks: enforce_repair_budget
expected_state_sequence: verifying -> repairing -> verifying -> stopped or blocked
required_gates: G2=fail,G3=fail
stop_condition: Stop when no authorized conflict-resolution method exists or the repair budget is exhausted.

