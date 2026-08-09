## Analyze Handoff Routing (Pilot)

When a verified `handoff-packet.json` exists and the user asks to continue, implement, or resume:

1. Initialize `scripts/workflow-state.cjs init --packet <packet>` if no workflow state exists; otherwise validate and resume the existing state.
2. Run `workflow-state.cjs route --state <state>`.
3. Read the returned `request` file completely.
4. Invoke the exact `skill` returned by the route. Do not ask the user to copy context or re-request the Skill.
5. Register the stage artifact with `workflow-state.cjs complete`.
6. Stop only at `awaiting_execution_approval`, blockers, failures, or terminal state.

Stage policy:

- `plan`: automatically invoke the `writing-plans` internal capability (read `references/writing-plans.md`); no project implementation.
- `approval`: present the bound plan and ask for explicit implementation approval. A prior Spec approval is not execution approval.
- `execute`: after explicit approval, invoke the `executing-plans` internal capability (read `references/executing-plans.md`); preserve its worktree, review, and stop rules.
- `verify`: after execution evidence is registered, automatically invoke the `verification-before-completion` internal capability (read `references/verification-before-completion.md`) with fresh commands.
- `completed`: claim completion only after `workflow-state.cjs validate` returns `ok=true` and status `completed`.

If an execution discovery invalidates an assumption, decision, acceptance criterion, or Spec, append feedback through the controller and return to Analyze Specify/Repair. Never silently alter a bound artifact or continue from a stale packet.

The controller coordinates state; it does not grant file, shell, network, commit, push, deployment, or other external authority. Existing host and project permissions remain authoritative.
