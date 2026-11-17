# Resilience

The plan holds up when it turns out to be wrong: what it assumes and what could upset it are named, and the builder knows when to go on, when to adapt and when to stop.

*Falls short:* a plan that only works if nothing goes wrong. *Overshoots:* a contingency for everything.

*Borders:* placing the uncertain step early belongs to route; who is asked when the build stops belongs to agency; whether a fact was checked belongs to grounding.

## Desirable

- **Named assumptions:** what the plan takes for granted and has not checked is listed, each with the steps that rest on it and the step that confirms it.
- **Named risks:** the few things most likely to upset this plan are listed, each with what would show it and what is done then.
- **Stop conditions:** the plan says what makes the builder stop and come back: an assumption that fails, a check that cannot be made to pass, a step several times its size, a need to change something fixed.
- **Small surprises absorbed:** a surprise inside a step (another file, one more caller) is handled by the builder within the step's outcome and fixed points, and noted.
- **Amendable plan:** the plan says how it is changed during the build: the change is written into it with its reason, and the user is told when it touches what they decided.
- **Replanning points:** at each milestone the rest of the plan is read again against what was learned, and revised before the work goes on.
- **Honest horizon:** where the plan cannot see (past a trial, past an answer still owed), it says so, and plans up to that point and the decision to be made there.
- **Fallbacks where they matter:** for a step with a real chance of failing, the plan names the other way, or says that there is none and what follows.
- **Way back:** a step that changes data, or anything outside the working copy, says how it is undone or is marked as not undoable.
- **Contained damage:** risky changes are kept apart (a branch, a flag, a copy of the data), so that a failure costs one step.
- **Waiting planned:** where the build depends on someone else (an approval, another team's change), the plan says what can go on meanwhile.
- **Failure imagined:** the plan is imagined as having failed, and the likeliest reasons are looked for, with the user.
- **Proportion:** the care matches the stakes: a small change that a revert undoes carries none of this.

## Undesirable

### Falls short

- **Happy-path plan:** each step assumes that everything before it went as written.
- **Hidden assumptions:** the plan fails without warning when an unstated condition turns out not to hold.
- **No stop condition:** the builder pushes on through failing checks, or makes a new plan alone.
- **Unwatched risk:** a risk is known, and nothing would show that it is coming true.
- **No way back:** a step that cannot be undone has no backup and is not marked.
- **All or nothing:** a failure in one step loses the work of the others.
- **Plan as script:** the plan is written to be followed to the letter, so that the first difference between plan and code leaves the builder without guidance.
- **No way to amend:** nothing provides for changing the plan, and after the first deviation it describes a different build.

### Overshoots

- **Contingency for everything:** second and third ways are planned for steps unlikely to fail.
- **Risk register:** a long list of risks buries the two that matter.
- **Hedged into vagueness:** the steps are so conditional that the plan commits to nothing.
- **Stop at every bump:** the stop conditions are so sensitive that the builder comes back for every small surprise.
- **Needless safety work:** backups, flags and rollbacks for a change that a revert undoes.
- **Padded sizes:** sizes are inflated, or buffer steps added, in place of naming what is uncertain.
- **Replanning by habit:** the plan is reworked after every step.

### Counterfeits (looks met, is not)

- **Generic risks:** "requirements may change", "integration may be harder than expected".
- **Risk without response:** a risk is listed with no sign to watch for and nothing to do about it.
- **Mitigation in words:** "we will be careful", "monitor closely".
- **Untried way back:** a rollback is written down that nobody checked could work.
- **Same-bet fallback:** the other way depends on the same assumption as the first.
- **Boilerplate caveat:** "this plan may change" at the top replaces saying where.
