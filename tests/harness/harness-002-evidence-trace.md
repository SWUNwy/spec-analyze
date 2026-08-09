# harness-002: Evidence Trace

id: harness-002
purpose: Verify decisive requirement claims are traceable to source type and confidence.
user_input: 结合我给的需求文档，判断商家 CRM 第一阶段应该包含哪些能力。
expected_track: Analyze
expected_behavior: Separate source facts, inferred priorities, contradictions, and unknowns; cite ledger entries in the recommendation.
must_not_do: Must not present inferred priority as a confirmed stakeholder decision.
passing_criteria: Every decisive phase-one claim has a source or is labeled inference, and G2 cites the ledger.
excellent_response_snippet: “统一商家档案”来自需求源；“先于自动化营销”是当前资源约束下的推断。
risk_level: medium
input_maturity: M3
expected_depth: Decision-grade
required_references: references/closed-loop.md,references/gates.md,references/verification-rubric.md
forbidden_references: none
hard_fail_checks: no_untraced_decisive_claim
expected_state_sequence: scoped -> discovering -> synthesizing -> verifying
required_gates: G1,G2
stop_condition: Block a definitive prioritization when the required source cannot be inspected and conditional analysis would mislead.

