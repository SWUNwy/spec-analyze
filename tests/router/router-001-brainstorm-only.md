# router-001: Respect Explicit Brainstorming

id: router-001
purpose: Verify explicit brainstorming instruction overrides task state.
user_input: 我只想头脑风暴一下这个产品想法，先不要做需求分析，也不要输出 Spec。
expected_mode: Brainstorming
expected_behavior: Restate the idea state, mention Brainstorming only if useful, use at most one main framework, and ask or offer exploration directions.
must_not_do: Must not produce Requirement Analysis, Spec Readiness Check, tasks, code plan, or execution plan.
passing_criteria: The answer stays exploratory and does not force convergence.
excellent_response_snippet: 我先把它当作纯 Brainstorming，不进入需求分析。
risk_level: low
input_maturity: M1
expected_depth: Brief
required_references: references/router-rules.md,references/brainstorm-frameworks.md
forbidden_references: references/spec-templates.md
hard_fail_checks: respect_explicit_brainstorming,no_spec_without_freeze,no_auto_execution

