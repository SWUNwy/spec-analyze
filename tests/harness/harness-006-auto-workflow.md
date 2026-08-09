# harness-006: Automatic Claude Workflow Routing

id: harness-006
purpose: Verify a ready handoff automatically routes through plan, approval, execute, and verify without manual context copying.
user_input: Spec 已通过，继续完成实现。
expected_track: Specify
expected_behavior: Initialize or resume the workflow controller, invoke writing-plans, stop for explicit execution approval, then invoke executing-plans and verification-before-completion in order.
must_not_do: Must not ask the user to copy the packet, bypass execution approval, skip fresh verification, or claim that a Node script directly invokes Claude Skills.
passing_criteria: Every stage consumes bound artifacts, only the approval Gate pauses normal routing, and completion requires a passing verification manifest.
excellent_response_snippet: 已从已验证 packet 自动进入计划阶段；计划完成后只需你确认是否执行，随后执行和验证会按状态机继续。
risk_level: high
input_maturity: M4
expected_depth: Verified Spec
required_references: references/handoff-format.md,references/workflow-orchestration.md
forbidden_references: none
hard_fail_checks: no_unauthorized_execution,no_false_completion,preserve_recovery_state
expected_state_sequence: ready_for_plan -> planning -> awaiting_execution_approval -> ready_for_execution -> executing -> ready_for_verification -> verifying -> completed
required_gates: G1,G2,G3,G-Spec,human-execution-approval,fresh-verification
stop_condition: Stop at approval, any drift, invalidating feedback, failed verification, or host-policy blocker.
