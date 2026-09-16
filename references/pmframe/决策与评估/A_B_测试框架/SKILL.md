---
name: ab-testing
description: Design and run a rigorous A/B test to validate a product change
source: PMFrame/A_B_测试框架
imported: 2026-09-15
---

# A/B Testing Framework

Compare two variants with statistical rigor to determine which performs better. Use when you have enough traffic and need data-driven evidence before shipping a change.

## Steps

1. **Hypothesis** — state what you expect to change and why (e.g., "Changing CTA color to green will increase click-through by 10%").
2. **Metric** — define the primary metric and any guardrail metrics.
3. **Variant design** — create control (A) and treatment (B); change only one variable.
4. **Sample size** — calculate required sample size for desired statistical power (typically 80%) and significance (p < 0.05).
5. **Run** — randomly assign users, run until sample size is reached; do not peek early.
6. **Analyze** — compute statistical significance, effect size, and check guardrail metrics.

## Output Format

A test plan document with hypothesis, metrics, variant descriptions, sample size calculation, run duration estimate, and a results summary table with confidence intervals.

> 深度展开：本模型的详细步骤、示例与适用边界见同目录 `README.md`（SKILL.md 为快速路由入口，README 为完整参考）。
