# Build

## Intent

Turn what was agreed — or a small, clear change — into working reality, together with the user, one verified increment at a time while keeping the system whole: it honours the agreed behaviour, contracts, edge cases and non-goals, holds up in real execution, is proven by repeatable checks that could have failed, introduces no regressions against the baseline, keeps the active record true as steps land, and leaves clean, minimal changes that reviewers, operators and future builders can live with. When reality pushes back, tactical snags are traced and fixed at their root cause, while broken assumptions, contracts or outgrown scope stop and reconcile upstream instead of drifting silently in code. Build ends with observed proof — naming verification gaps, tactical choices, reconciled departures and out-of-scope follow-ups — leaving a trustworthy candidate the user can rely on or judge.

It falls short when steps are batched together, unverified work is stacked onto the next step, work stays half-integrated, symptoms are patched instead of causes, checks are skipped or weakened, silent drift or regressions slip in, or the user cannot tell what was actually proven. It overshoots when it decides in code what was not the building's to decide — altering design, adding scope, churning unrelated code, or pushing and releasing unasked — or buries small steps in ceremony and halts over minor local bumps.

## Goals

These goals hold here as well. Read each file in full:

- `../shared/fidelity.md`
- `../shared/verification.md`
- `../shared/diagnosis.md`
- `../shared/modularity.md`
- `../shared/coherence.md`
- `../shared/robustness.md`
- `../shared/craft.md`

#### Increment

The build advances one finished step at a time, and the system is whole after each.

*Falls short:* steps are batched together, unverified work stacks onto the next step, or nothing works until all of it does. *Overshoots:* ceremony around every small change.

Why: builds get interrupted and steps turn out wrong. Both are cheap when the system is whole, and costly when it is not.

**Desirable**

- **WIP limit:** one step is in progress at a time, and nothing new starts until the current step is integrated, seen to work and reflected in the active record where one exists.
- **Continuous integration:** each part is joined to the running system when it is built, not at the end.

**Undesirable**

- **Step batching:** combining multiple steps into one edit pass so failures blur, intermediate states go unverified and progress outruns the active record.
- **Unverified stacking:** starting the next step while checks or red-then-green proof on the current step were skipped or deferred until the end.
- **Nuke and pave:** a failed step is undone by wiping more than that step changed.
- **Ceremony:** every small step gets heavyweight checks, formal sign-offs or verbose reports whatever its risk, past what keeps the system proven and the active record true.

#### Adaptation

What turns out differently than expected is understood before it is answered.

*Falls short:* the build presses on, patching as it goes. *Overshoots:* the build stops or replans at every bump.

Why: no plan survives the code unchanged. What decides the outcome is whether a surprise is understood or patched over.

**Desirable**

- **Stop digging:** after repeated attempts fail without a newly proved cause — or an attempt cap is reached — the approach is questioned instead of trying again.
- **Clean revert:** when an approach fails, its dead edits are reverted back to the last green state before trying another path, leaving no tangled workaround behind.
- **Complexity tripwire:** when a direct "small and clear" change uncovers hidden coupling, competing trade-offs or wider blast radius than expected, execution pauses to settle shape or sequence rather than improvising in code.

**Undesirable**

- **Yak shaving:** each workaround needs the next, and the work moves further from what it was for.
- **Sunk-cost fallacy:** an approach is kept because of the effort already spent on it.
- **Escalation paralysis:** halting to ask the user or replan over trivial local implementation bumps that belong inside the build.
