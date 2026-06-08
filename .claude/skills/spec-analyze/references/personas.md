# Expert Persona Matrix

Five core personas for multi-perspective requirement analysis. Personas are perspectives the agent incorporates into questions — not characters the agent plays. Spec-analyze's persona system is specialized for product requirement analysis: personas focus on requirement completeness, edge cases, and implementation readiness.

## Activation Rules

| Path | Personas Activated |
|------|--------------------|
| Lightweight | None (free-form questioning) |
| Standard | 2-3 most relevant, selected by agent, confirmed with user |
| Full | All 5; Risk Challenger participates throughout |

---

## Product Strategist

**Focus:** PMF, value proposition, user segmentation, requirement priority, differentiation

**Core questions to ask:**
- Who exactly is this feature for? What user type? (Be specific — not "everyone")
- What problem does this solve that the user's current workaround doesn't?
- What's the minimum version of this feature that still delivers value?
- If we don't ship this, what's the actual impact? (Gauge real priority)
- How does this feature fit into the user's existing workflow?
- What's the success metric for this feature? (Outcome, not output)

**Red flags to watch for:**
- "All users need this" — usually means no specific user segment has a strong need
- Feature requested without a concrete user scenario
- No answer to "what happens if we don't do this"
- Success measured by "having the feature" not "users behave differently"

**Escalate to:**
- Growth & Market Analyst when priority justification relies on competitive pressure
- User Advocate when user persona feels generic or untested

---

## Growth & Market Analyst

**Focus:** Competitive landscape, market alternatives, business impact, adoption strategy, success measurement

**Core questions to ask:**
- Do competitors have this feature? How does theirs work? Is it well-received?
- What would make users switch from their current solution to ours for this use case?
- How do users solve this problem today (before this feature exists)?
- What's the adoption threshold? (Do users need to change behavior? Install something?)
- How do we measure this feature's success post-launch?
- What's the cost of getting this wrong? (Revenue? Trust? Churn?)

**Red flags to watch for:**
- "Competitors don't have this" — check if there's a reason (low demand, high complexity, proven to not work)
- No defined success metric — feature will ship but no one knows if it worked
- Adoption assumed without considering user behavior change cost
- Feature justified by "competitor has it" without understanding why

**Escalate to:**
- Product Strategist when competitive findings suggest a different feature direction
- Risk Challenger when market assumptions seem untested

---

## User Advocate

**Focus:** User journey, pain points, usability, discoverability, error experience, learnability

**Core questions to ask:**
- Walk through the happy path — how many steps from start to completion?
- What's the most confusing moment for a first-time user?
- What happens when something goes wrong? (Loading state? Error? Empty state?)
- How does a user discover this feature exists? (Is it buried in a menu?)
- What emotional state is the user in when they encounter this UI?
- Can the user complete the task in under 30 seconds? Under 10 seconds?

**Red flags to watch for:**
- More than 3 steps before user gets value
- Error states, empty states, or loading states not designed
- Feature is technically complete but users won't find it
- Jargon or technical terminology in user-facing copy
- Assumption that users will read documentation, instructions, or tooltips

**Escalate to:**
- System Architect when UX requirements (responsive, animation, offline) have cost implications
- Product Strategist when usability issues suggest the feature scope should change

---

## System Architect

**Focus:** Technical feasibility, data model, API contracts, state management, boundaries, reusability

**Core questions to ask:**
- What's the data entity behind this feature? What are its fields and their types?
- Where does this data come from? API? Local state? Cache? Third-party?
- What if the API response format changes — how many places need updating?
- Is this a new component or can an existing one be extended?
- What are the integration points with existing systems?
- What's the loading strategy? (Eager? Lazy? Skeleton? Placeholder?)
- Is there a caching strategy? Stale-while-revalidate? Polling? WebSocket?

**Red flags to watch for:**
- Data model not defined before UI interaction is designed
- Component reusability not considered ("this is just for this one page")
- No loading/error/empty state handling defined
- State management unclear — where does this state live?
- "补丁叠补丁" — stacking patches on existing code instead of addressing root cause
- Introducing a new pattern that conflicts with existing architecture

**Escalate to:**
- Risk Challenger when architectural decisions have reliability implications
- User Advocate when technical constraints would degrade UX

---

## Risk Challenger

**Focus:** Edge cases, failure modes, data integrity, security, assumption testing, blind spots

**Core questions to ask:**
- What's the strongest reason this feature might fail in production?
- What assumption, if wrong, would break the entire design?
- What's the worst thing a user could intentionally or accidentally do?
- What happens when: network is slow, API is down, data is corrupted?
- What happens with concurrent operations? (Two tabs, two users, rapid clicks)
- If this feature fails silently, how long before anyone notices?
- What happens to existing data when we deploy this? Migration? Backfill?

**Red flags to watch for:**
- No identified assumptions (means they're probably hidden)
- Happy-path-only thinking — no error states considered
- No consideration of malicious input or accidental misuse
- "Users won't do that" — users absolutely do unexpected things
- Data integrity not discussed (concurrent edits, partial saves, stale data)

**Escalate to:**
- System Architect when risk findings require architectural changes
- User Advocate when risk mitigations would affect user experience
