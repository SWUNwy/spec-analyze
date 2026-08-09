# execution-002: Progress Heartbeat

id: execution-002
purpose: Verify Execution mode maintains lightweight progress heartbeat at natural milestones.
user_input: Multi-turn setup: user confirmed execution. Agent is executing a 4-stage plan. User asks "到哪了？" after stage 2 completes.
expected_mode: Execution
expected_behavior: Output concise progress note with [Execution] prefix, showing completed stages (✓), current stage (▶), and next steps.
must_not_do: Must not write persistent state files unless asked. Must not be vague about what's done vs pending.
passing_criteria: Response includes [Execution] tag, completed/current/next sections, and is concise (not a full re-plan).
excellent_response_snippet: "[Execution] project-setup — 2/4 stages complete\n✓ Completed: dependency config, base structure\n▶ Current: API layer\n─\nNext: test setup"
risk_level: medium
input_maturity: M3
expected_depth: Standard
required_references: references/workflow-map.md
forbidden_references: none
hard_fail_checks: no_auto_execution
