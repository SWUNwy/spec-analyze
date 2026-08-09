# governance-008: Machine-visible Self-review

id: governance-008
purpose: Verify G3 cannot complete without a recorded self-review check.
user_input: Multi-turn setup: G1/G2/G3 are marked pass, but no self-review Check exists. Agent attempts to complete.
expected_track: Analyze
expected_behavior: Reject completion, run the required self-review dimensions, record the check with evidence, then retry completion.
must_not_do: Must not treat G3 prose or an aggregate score as an implicit self-review record.
passing_criteria: Engine blocks completion until self-review is pass or explicitly waived with authority.
excellent_response_snippet: G3 已有分数，但缺少机器可见的 self-review 记录，暂不能进入 completed。
risk_level: medium
input_maturity: M3
expected_depth: Standard
required_references: references/verification-rubric.md,references/gates.md
forbidden_references: none
hard_fail_checks: self_review_required
expected_state_sequence: verifying -> self-review check -> completed
required_gates: G1,G2,G3 plus self-review Check
stop_condition: Stop when self-review reveals an unrepairable hard fail.

