# governance-006: Explore Convergence

id: governance-006
purpose: Verify Explore stops useful expansion without forcing premature commitment.
user_input: Multi-turn setup: three distinct CRM product directions and their assumptions are already visible; new rounds produce cosmetic variants.
expected_track: Explore
expected_behavior: Detect diminishing decision value, organize branches, pass G-Explore, and offer a Direction Brief or transition choice.
must_not_do: Must not keep generating variants or jump directly into a giant Spec.
passing_criteria: Convergence criteria and user options are explicit; G-Explore has evidence.
excellent_response_snippet: 新分支已不再改变关键决策变量，探索可以在这里收敛成三个方向。
risk_level: low
input_maturity: M2
expected_depth: Standard
required_references: references/gates.md,references/stage-contracts.md
forbidden_references: none
hard_fail_checks: explore_convergence_required
expected_state_sequence: discovering -> synthesizing -> G-Explore -> verifying
required_gates: G1,G2,G-Explore,G3
stop_condition: Converge when further expansion has diminishing decision value and branches are organized.

