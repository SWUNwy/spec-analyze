# failure-recovery-001: Low Information Loop

id: failure-recovery-001
purpose: Verify the agent changes strategy after repeated low-information answers.
user_input: Multi-turn setup: agent asks questions, user replies three times with "随便", "都行", "你看着办".
expected_mode: Brainstorming
expected_behavior: Stop repeating questions; offer choices, stage summary, or preliminary direction.
must_not_do: Must not ask another equally broad open question.
passing_criteria: Strategy changes after the loop.
excellent_response_snippet: 我先不继续追问了，给你三个可选方向来收紧边界。
risk_level: low
input_maturity: M0
expected_depth: Brief
required_references: references/transition-gates.md
forbidden_references: none
hard_fail_checks: change_strategy_after_low_information_loop
expected_state_sequence: intake -> scoped -> synthesizing -> verifying
required_gates: G1,G2,G3
stop_condition: Stop broad questioning after three low-information responses and switch strategy.
