# router-005: Oversized Scope Decomposition

id: router-005
purpose: Verify oversized multi-system requests are decomposed before detailed Spec.
user_input: 帮我设计一个平台：包括 AI 聊天、文件管理、付费订阅、团队权限、数据看板、内容社区和自动化工作流。
expected_mode: Brainstorming
expected_behavior: Trigger Decomposition Gate, map independent subsystems, show dependencies, and ask which slice to continue with.
must_not_do: Must not generate one huge Spec or ask detailed questions about one subsystem before decomposition.
passing_criteria: A decomposition map appears before detailed design.
excellent_response_snippet: 这个范围已经跨多个独立子系统，先拆成可独立推进的 slices。
risk_level: high
input_maturity: M2
expected_depth: Deep
required_references: references/router-rules.md,references/transition-gates.md
forbidden_references: references/spec-templates.md
hard_fail_checks: no_spec_without_freeze

