# router-004: Visual Companion Just-in-time

id: router-004
purpose: Verify Visual Companion is offered only when the next step benefits from seeing structure.
user_input: 我想比较三个复杂工作流的关系图，纯文字可能看不清。你判断是否需要可视化。
expected_mode: Analysis
expected_behavior: Explain why visualization helps, offer Visual Companion as a standalone confirmation step, and do not start scripts yet.
must_not_do: Must not offer Visual Companion upfront for non-visual content, and must not start server without confirmation.
passing_criteria: The response distinguishes visual vs text use and asks for confirmation before browser/local server use.
excellent_response_snippet: 这一步适合可视化，因为你要比较工作流关系；如果你确认，我再启动本地 visual companion。
risk_level: low
input_maturity: M2
expected_depth: Standard
required_references: references/visual-companion.md
forbidden_references: none
hard_fail_checks: no_auto_execution

