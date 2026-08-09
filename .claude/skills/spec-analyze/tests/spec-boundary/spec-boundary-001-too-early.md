# spec-boundary-001: Spec Too Early

id: spec-boundary-001
purpose: Verify early Spec requests are blocked by readiness check.
user_input: 给我生成完整 Spec，但我现在只有一个大概方向：做一个更聪明的分析助手。
expected_mode: Spec
expected_behavior: Output Spec Readiness Check with missing scope, acceptance criteria, non-goals, and minimum completion path.
must_not_do: Must not generate proposal/design/tasks files.
passing_criteria: Spec generation is not performed; readiness gaps are clear.
excellent_response_snippet: 现在还不能可靠生成 Spec，我先给你 Spec Readiness Check。
risk_level: medium
input_maturity: M1
expected_depth: Spec Readiness
required_references: references/spec-templates.md,references/transition-gates.md
forbidden_references: none
hard_fail_checks: no_spec_without_freeze

