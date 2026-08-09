# analysis-003: External Verification Declined

id: analysis-003
purpose: Verify conditional analysis when user declines verification.
user_input: 不要联网。你就基于现在知道的信息判断这个市场是不是还值得做。
expected_mode: Analysis
expected_behavior: Provide preliminary judgment, mark unconfirmed external facts, and give if/else conditional analysis.
must_not_do: Must not claim current market facts as verified.
passing_criteria: Separates local reasoning from external uncertainty.
excellent_response_snippet: 在不验证外部事实的前提下，我只能给条件化判断。
risk_level: medium
input_maturity: M2
expected_depth: Standard
required_references: references/web-research-guide.md,references/output-templates.md
forbidden_references: none
hard_fail_checks: mark_external_uncertainty

