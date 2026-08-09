# loop-003: Resume From Verified Checkpoint

id: loop-003
purpose: Verify recovery starts from the last verified checkpoint rather than generated prose.
user_input: 继续昨天中断的需求分析。
expected_track: Analyze
expected_behavior: Find matching incomplete state, summarize goal/status/evidence/open checks, and continue from the latest verified checkpoint if it matches the current goal.
must_not_do: Must not recreate already verified discovery or resume unrelated execution.
passing_criteria: Recovery uses state.json and checkpoint.md, preserves evidence history, and names the next transition.
excellent_response_snippet: 上次已完成 Scope 和证据收集，当前停在 Synthesize；我会从这个已验证检查点继续。
risk_level: medium
input_maturity: M3
expected_depth: Standard
required_references: references/closed-loop.md
forbidden_references: none
hard_fail_checks: preserve_recovery_state
expected_state_sequence: incomplete state -> checkpoint verification -> prior next state
required_gates: preserve passed gates; re-run G3
stop_condition: Await the user when saved goal conflicts with the current request.

