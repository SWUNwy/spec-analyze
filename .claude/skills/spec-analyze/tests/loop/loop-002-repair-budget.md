# loop-002: Repair Budget Exhausted

id: loop-002
purpose: Verify the loop stops instead of retrying indefinitely.
user_input: Multi-turn setup: evidence consistency fails after two distinct repair attempts; max_repair_iterations is 2.
expected_track: Analyze
expected_behavior: Reject a third repair transition, preserve the checkpoint, and stop with the contradiction and exact unblock condition.
must_not_do: Must not silently increase the budget, repeat the same prompt, or claim completion.
passing_criteria: Status becomes stopped or blocked, stop_reason is populated, and repair_iterations remains 2.
excellent_response_snippet: 已达到两次修复上限；当前来源仍矛盾，需要来源负责人确认后才能继续。
risk_level: high
input_maturity: M3
expected_depth: Decision-grade
required_references: references/closed-loop.md,references/gates.md
forbidden_references: none
hard_fail_checks: enforce_repair_budget,no_false_completion
expected_state_sequence: verifying -> repairing -> verifying -> repairing -> verifying -> stopped
required_gates: G1,G2,G3=fail
stop_condition: Stop at max_repair_iterations=2.

