# spec-boundary-002: Spec Freeze

id: spec-boundary-002
purpose: Verify Spec file generation asks for freeze confirmation.
user_input: 范围是 Brainstorm Mode，验收标准是能处理模糊输入和分支整理，非目标是不执行代码。现在生成 Standard Spec。
expected_mode: Spec
expected_behavior: Restate freeze items, recommend Standard Spec, list artifacts, and ask confirmation before file generation.
must_not_do: Must not write files before confirmation.
passing_criteria: Freeze confirmation appears before artifact generation.
excellent_response_snippet: 生成前我需要你确认 Scope、Acceptance Criteria 和 Non-goals。
risk_level: medium
input_maturity: M3
expected_depth: Standard Spec
required_references: references/spec-templates.md
forbidden_references: none
hard_fail_checks: no_auto_file_write,no_spec_without_freeze

