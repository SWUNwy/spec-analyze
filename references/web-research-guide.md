# Web Research Guide

When and how to use web search during spec-analyze sessions. Tailored for product requirement analysis and competitive benchmarking.

## Trigger Conditions

Propose web research when the discussion touches on any of these:

### 1. Competitive Benchmark

Need to understand how competitors solve the same problem, or industry best practices for a feature.

**Probe:** "This relates to [feature] which competitors likely already handle. Should I check current industry approaches?"

**Search patterns:**
- `[competitor] [feature] implementation UX`
- `[industry] best practices for [feature] [current year]`
- `[product category] comparison [feature]`
- `how does [competitor] handle [scenario]`

### 2. Component & Interaction Patterns

Need to validate interaction design decisions against established patterns.

**Probe:** "The [interaction] pattern being discussed has precedent in the industry. Want me to check common approaches and anti-patterns?"

**Search patterns:**
- `[component] UX pattern best practices [current year]`
- `[interaction] UX anti-patterns`
- `[UI pattern] accessibility considerations`
- `[component library] [component] API reference`

### 3. Technology Evaluation

Need to compare technical options for implementation.

**Probe:** "The technical choice here matters for implementation effort and maintability. I can check the current state of [technology] options."

**Search patterns:**
- `[library] vs [library] comparison [current year]`
- `[library] known issues limitations`
- `[technology] API changes deprecation [version]`
- `[npm package] downloads maintenance status`

### 4. Compliance & Data Standards

Discussion involves data format standards, regulatory requirements, or industry conventions.

**Probe:** "This touches on [topic] which may have standard conventions or regulatory requirements. Should I verify?"

**Search patterns:**
- `[data format] standard specification`
- `[regulation] requirements for [feature] [current year]`
- `[industry] data format best practices`

## When NOT to Search

Don't propose web research when:
- The question is about the user's specific business logic, internal systems, or preferences
- The information is available in local project files or docs
- The discussion is purely conceptual or opinion-based
- The user has already provided authoritative information

## Information Integration

Structure all research findings using the As-is → Gap → Edge framework:

| Section | Content | Purpose |
|---------|---------|---------|
| **As-is** | Current industry standard, common approach, or competitor solution | Grounding — what's normal? |
| **Gap** | Where our approach differs from or falls short of the standard | Risk awareness — what are we missing? |
| **Edge** | Where we can differentiate or improve upon the standard | Opportunity — where can we do better? |

### Inline vs. Appendix

- **Inline**: Brief findings (1-3 facts) that directly affect a specific design decision → present in the discussion
- **Appendix**: Extensive research (competitive analysis, multi-source synthesis) → summarize key points inline, full details in output appendix

## Source Quality

When evaluating search results for requirement analysis:
- Prefer official documentation, established UX research, and primary sources
- Be skeptical of marketing content and vendor comparisons
- Note the publication date — UX patterns evolve slower than tech, but still evolve
- Cross-reference important claims across multiple sources
- Always cite sources so the reviewer can verify
