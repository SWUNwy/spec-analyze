# Decision Log Format

How to record decisions during the converge phase. The goal is to preserve reasoning, not just conclusions — so future readers understand *why* a choice was made and can reassess if circumstances change.

## When to Record a Decision

Record a decision when:
- There were 2+ viable alternatives considered
- The choice has non-trivial implications (cost, risk, time, implementation effort)
- The reasoning might not be obvious to someone reading later
- The decision could be revisited as requirements evolve

Don't record a decision when:
- Only one viable option exists
- The choice is trivial and reversible (e.g., naming, file organization)
- No real deliberation happened

## Format

### In Discussion

Capture decisions inline as they happen:

> **Decision: [what was decided]**
> - Options: [A] / [B] / [C]
> - Chose: [X] because [reason]
> - Rejected [Y] because [specific reason]

### In Output (Analysis Report / Design Doc)

Tabulate decisions in the final document:

| # | Decision | Options Considered | Chosen Approach | Rationale | Rejected Alternatives |
|---|----------|--------------------|-----------------|-----------|----------------------|
| 1 | [What] | A: ..., B: ... | A | [Why A] | B: [specific reason] |

## Good Examples

**Good:**
> **Decision: Use optimistic UI for status update**
> Options: (A) Optimistic update with rollback, (B) Wait-for-API synchronous update, (C) Queue-based eventual update
> Chose: A — status update is low-risk, high-frequency; optimistic creates immediate feedback; rollback handles the 5% failure case
> Rejected B — 200ms+ delay on every tap feels sluggish for a frequently used action
> Rejected C — over-engineered; status updates don't need eventual consistency guarantees

**Good (architecture decision):**
> **Decision: Abstract payment provider behind an interface**
> Options: (A) Direct Stripe dependency, (B) Payment interface with Stripe implementation
> Chose: B — currently only Stripe, but payment provider switching is a common requirement; the abstraction costs ~1 day now vs 2 weeks if refactoring later
> Rejected A — violates "抗补丁性" principle; replacing Stripe calls scattered across codebase would be high-risk

## Bad Examples

**Bad (too vague):**
> **Decision: Use optimistic UI**
> Chose: optimistic because it's better UX

**Bad (missing alternatives):**
> **Decision: Use optimistic UI for status update**
> Chose: optimistic UI — standard approach for this pattern

**Bad (no rationale):**
> **Decision: Use abstract payment interface**
> Chose: interface pattern
> Rejected: direct dependency

## Decision Reassessment

Decisions are not permanent. When circumstances change, the decision log makes it easy to revisit:

- New information contradicts the rationale → flag for reassessment
- A rejected option becomes viable (e.g., new library, changed requirements) → reconsider
- The problem scope changes → check if the decision still applies
- A previously minor concern becomes critical → re-evaluate trade-offs

Include this note in Full path outputs:

> "Decisions in this log should be revisited if project scope, timeline, or technical landscape changes significantly."
