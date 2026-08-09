# governance-004: Formal Decomposition Gate

id: governance-004
purpose: Verify multi-system requests cannot enter detailed Scope without selecting a coherent slice.
user_input: 设计一个包含 CRM、结算、营销自动化、权限和数据看板的平台。
expected_track: Explore
expected_behavior: Set decomposition_required=true, map independent systems/dependencies, preserve deferred branches, and select one verifiable vertical slice.
must_not_do: Must not create one giant Spec or pass G-Decompose with only a list of modules.
passing_criteria: Selected slice has its own goal, non-goals, evidence, and completion conditions before scoped.
excellent_response_snippet: 当前请求包含五个独立交付循环，先选择“统一商家档案”作为第一条可验收切片。
risk_level: high
input_maturity: M2
expected_depth: Deep
required_references: references/gates.md,references/router.md
forbidden_references: none
hard_fail_checks: no_giant_spec
expected_state_sequence: intake -> G-Decompose -> scoped
required_gates: G1,G-Decompose
stop_condition: Await one slice selection when different slices imply incompatible deliverables.

