---
name: ice-scoring
description: Score and rank experiments or feature ideas by Impact, Confidence, and Ease
source: PMFrame/ICE_评分模型
imported: 2026-09-15
---

# ICE Scoring

Prioritize experiments by scoring each on three dimensions (1-10) and multiplying to get a composite rank.

## Steps

1. List all candidate experiments or feature ideas
2. Score **Impact** (1-10): How much will this move the target metric if it works?
3. Score **Confidence** (1-10): How sure are you it will work, based on evidence?
4. Score **Ease** (1-10): How quickly and cheaply can you run this experiment?
5. Calculate ICE = Impact x Confidence x Ease for each item
6. Rank by ICE score and select the top experiments to run

## Output Format

| Experiment | Impact | Confidence | Ease | ICE Score |
|-----------|--------|-----------|------|-----------|
| [Idea 1] | [1-10] | [1-10] | [1-10] | [Score] |
| [Idea 2] | [1-10] | [1-10] | [1-10] | [Score] |

**Selected for next sprint:** [Top N experiments]
