---
name: rice-prioritization
description: Prioritize features using RICE scoring (Reach, Impact, Confidence, Effort)
source: PMFrame/RICE_优先级模型
imported: 2026-09-15
---

# RICE Prioritization

Score and rank features or initiatives using a consistent formula to remove bias from prioritization. Use when your backlog has many competing items and stakeholders disagree on order.

## Steps

1. **Reach** — estimate how many users/events this will affect in a given time period.
2. **Impact** — rate the expected effect per user (3 = massive, 2 = high, 1 = medium, 0.5 = low, 0.25 = minimal).
3. **Confidence** — rate how certain you are about estimates (100% = high, 80% = medium, 50% = low).
4. **Effort** — estimate work required in person-months (or person-weeks).
5. **Calculate** — RICE Score = (Reach x Impact x Confidence) / Effort.
6. **Rank** — sort by score descending; review the top items for sanity.

## Output Format

A ranked table with columns: Feature, Reach, Impact, Confidence, Effort, RICE Score. Include a brief rationale for each estimate.

> 深度展开：本模型的详细步骤、示例与适用边界见同目录 `README.md`（SKILL.md 为快速路由入口，README 为完整参考）。
