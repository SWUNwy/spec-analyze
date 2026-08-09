# governance-005: Section Review Gate

id: governance-005
purpose: Verify complex Specify work is reviewed in coherent sections before package verification.
user_input: 生成并审查商家 CRM 的 Verified Spec，重点检查流程、数据状态、异常和验收是否一致。
expected_track: Specify
expected_behavior: Review scope, workflow, architecture, data/state, error/recovery, and acceptance/handoff; resolve cross-section contradictions.
must_not_do: Must not treat one summary review or section approval as implementation authority.
passing_criteria: Each applicable section has a result; contradictions are resolved; G-Section has evidence.
excellent_response_snippet: 数据状态章节与异常恢复章节对“重复商家合并”的处理冲突，先修复后再过 G-Section。
risk_level: medium
input_maturity: M3
expected_depth: Verified Spec
required_references: references/gates.md,references/spec-document-reviewer-prompt.md
forbidden_references: none
hard_fail_checks: section_review_required
expected_state_sequence: synthesizing -> G-Spec -> G-Section -> verifying
required_gates: G1,G2,G-Spec,G-Section,G3
stop_condition: Return to Analyze when section gaps change the chosen solution or scope.

