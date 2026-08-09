# failure-recovery-004: Session Recovery

id: failure-recovery-004
purpose: Verify the agent offers Session Recovery when resuming a conversation with possible interrupted execution.
user_input: Multi-turn setup: previous session had an interrupted execution (manifest.md found with progress 2/4). New session starts with "我们继续之前的工作"。
expected_mode: Analysis
expected_behavior: Check for saved execution state files. If found with incomplete progress, output Session Recovery summary with progress, last stage, and outputs, then ask whether to continue or start fresh. If no state file is found but user signals resumption, use Conversational Recovery to rebuild context.
must_not_do: Must not auto-resume execution. Must not ignore previous execution state.
passing_criteria: Recovery summary or conversational recovery prompt is shown, and user is asked whether to continue or restart.
excellent_response_snippet: "### Session Recovery\n\n**Previous execution detected:** [topic]\n**Progress:** 2/4\n**Last stage:** API layer\n**Outputs:** [file list]\n\nContinue from where it left off, or start fresh?"
risk_level: medium
input_maturity: M3
expected_depth: Standard
required_references: references/workflow-map.md
forbidden_references: none
hard_fail_checks: session_recovery
expected_state_sequence: intake -> awaiting_user OR resume from latest verified checkpoint
required_gates: preserve prior G1/G2 state and re-run G3
stop_condition: Do not auto-resume when the current goal or authority conflicts with saved state.
