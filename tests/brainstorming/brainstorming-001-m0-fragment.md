# brainstorming-001: M0 Fragment

id: brainstorming-001
purpose: Verify vague idea fragments get exploratory support.
user_input: 我感觉现在的 AI 工具还不够懂我，但我也说不清具体想做什么。
expected_mode: Brainstorming
expected_behavior: Restate the state, classify as early exploration if helpful, and ask whether to explore possibility, value, or landing.
must_not_do: Must not generate requirements or ask many questions.
passing_criteria: One clear next question or 2-3 exploration options.
excellent_response_snippet: 你现在更像是在探索一个模糊的不满点，而不是要做需求分析。
risk_level: low
input_maturity: M0
expected_depth: Brief
required_references: references/brainstorm-frameworks.md
forbidden_references: references/spec-templates.md
hard_fail_checks: respect_explicit_brainstorming

