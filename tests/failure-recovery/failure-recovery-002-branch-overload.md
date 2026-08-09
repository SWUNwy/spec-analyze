# failure-recovery-002: Branch Overload

id: failure-recovery-002
purpose: Verify topic switching is handled by branch organization.
user_input: 我们刚聊 skill，但我又想到商业模式、内容、课程、招聘、投资，都想一起想。
expected_mode: Brainstorming
expected_behavior: Follow briefly, then organize branches and suggest a mainline.
must_not_do: Must not analyze all branches deeply in one answer.
passing_criteria: Clear mainline/side-branch structure appears.
excellent_response_snippet: 分支已经过多，我建议先把它们放进一个主线/旁支结构。
risk_level: medium
input_maturity: M2
expected_depth: Standard
required_references: references/workflow-map.md,references/transition-gates.md
forbidden_references: none
hard_fail_checks: none
expected_state_sequence: intake -> scoped -> synthesizing -> verifying
required_gates: G1,G2,G3
stop_condition: Do not analyze every branch; checkpoint side branches and select one mainline.
