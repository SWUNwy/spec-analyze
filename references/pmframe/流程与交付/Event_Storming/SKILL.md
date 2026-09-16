---
name: event-storming
description: Model a business domain collaboratively by mapping domain events, commands, and aggregates
source: PMFrame/Event_Storming
imported: 2026-09-15
---

# Event Storming

A workshop-based technique for discovering domain complexity by mapping events on a timeline, then layering commands, actors, and policies.

## Steps

1. **Chaotic exploration** -- everyone writes domain events (past tense verbs) on orange sticky notes
2. **Timeline ordering** -- arrange events left-to-right in chronological flow
3. **Add commands** -- identify what triggers each event (blue stickies)
4. **Add actors and systems** -- note who or what issues each command (yellow stickies)
5. **Identify aggregates and bounded contexts** -- group related events into clusters
6. **Surface hotspots** -- mark conflicts, unknowns, or bottlenecks with pink stickies

## Output Format

**Event Flow:** [Ordered list of domain events]
**Commands:** [Trigger -> Event mappings]
**Aggregates:** [Clustered event groups with names]
**Bounded Contexts:** [Context boundaries and relationships]
**Hotspots:** [Open questions and risks]
