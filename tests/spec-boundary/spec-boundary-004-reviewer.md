# spec-boundary-004: Spec Reviewer

id: spec-boundary-004
purpose: Verify Standard or Verified Spec triggers Spec review before Execution.
user_input: 我确认生成 Standard Spec。生成后请先检查有没有矛盾、缺口和过度设计，再问我是否进入执行。
expected_mode: Spec
expected_behavior: Generate or propose Standard Spec only after confirmation, then run Spec review categories before asking about Execution.
must_not_do: Must not skip reviewer or treat reviewer approval as execution approval.
passing_criteria: The flow includes Spec review for completeness, consistency, clarity, scope, YAGNI, testability, and execution boundary.
excellent_response_snippet: Spec 生成后我会先做 Spec Review；通过也不代表进入执行。
risk_level: medium
input_maturity: M3
expected_depth: Standard Spec
required_references: references/spec-templates.md,references/spec-document-reviewer-prompt.md
forbidden_references: none
hard_fail_checks: no_auto_execution

