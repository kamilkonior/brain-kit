# Increment

The build advances one finished step at a time: each step is built, checked and recorded before the next begins, and the code works after each.

*Falls short:* everything open at once, and nothing that works until all of it does. *Overshoots:* ceremony around every small change.

*Borders:* how a step is shown to be done belongs to verification; whether a change is what the step called for belongs to fidelity; what the record and the history must say belongs to handover; taking back what a revert does not undo belongs to containment; when the user looks at the work belongs to iteration.

## Desirable

- **One step in hand:** one step is in progress at a time, unless the plan marks steps as independent, and it is the next one in the plan's order.
- **Finished before the next:** a step's check has passed, its change is committed (or recorded as the rules of the build say) and its status is updated before the next step is started.
- **Working state:** after every step the code builds, the checks that passed still pass and what worked still works; where the plan lets a step break something for a while, that is noted, and ended at the step the plan names.
- **One step, one change:** the change made for a step holds that step's work and nothing else: no unrelated fix, no reformatting of lines it did not need to touch.
- **Unit that can be undone:** each step's change can be reviewed and reverted on its own, without taking other steps with it.
- **Small moves inside a step:** within a step the work goes in small edits, each run soon after it is made, so that a failure points at the last edit.
- **Thin first:** within a step the narrowest version that passes the check is made to work before it is widened or tidied.
- **Joined as built:** each part is connected to the running system when it is built, as the plan orders, and is not left loose for a joining at the end.
- **Step split in the open:** a step that proves too large to finish as one piece is split, and the plan shows the split.
- **Order changed in the open:** when the build shows that two steps must swap, the order is changed in the plan, with the reason, before the work follows it.
- **Stage closed:** at the end of a stage everything in it is done and the code is in the state the plan says the stage ends in, before the next stage starts.
- **Parallel without collision:** steps the plan marks as independent may be built side by side, each keeping to its own files, and they are joined and checked together before either counts as done.
- **Clean stop:** when the build pauses or is interrupted, at most one step is open, and what is open is said.
- **Proportion:** the size of a move follows the risk: fine where a mistake would be costly or hard to see, larger where the work is routine.

## Undesirable

### Falls short

- **Big bang:** several steps are written in one go and first run together.
- **Open on all fronts:** many steps are started and none is finished.
- **Running ahead:** the next step is begun while the last one's check has not passed.
- **Broken in between:** a step leaves the code not building or the checks failing, and the build goes on.
- **Mixed change:** one commit holds two steps, or a step and an unrelated cleanup, so that neither can be reviewed or undone alone.
- **Uncommitted pile:** hours of work sit in the working tree with no point to return to.
- **Joined at the end:** parts are built side by side and first meet in the last step.
- **Long edit, no run:** hundreds of lines are written before anything is run.

### Overshoots

- **Crumb commits:** every edit is committed, recorded and announced.
- **Step ritual:** each small step gets the full round of suite, review and report, whatever its risk.
- **Slicing for its own sake:** a step that is one coherent change is cut into pieces that have no result of their own.
- **Serial by habit:** steps marked independent are queued behind each other, though nothing connects them and time matters.
- **Order as law:** the plan's order is held to where the build has shown that it forces rework.

### Counterfeits (looks met, is not)

- **Split after the fact:** one big change is cut afterward into step-shaped commits that never worked on their own.
- **Green by stub:** the code "works after each step" because the part not yet working is stubbed, skipped or switched off.
- **Step in name:** a commit carries one step's number and holds parts of three.
- **Done but open:** a step is marked done, and its remaining work is carried silently into the next.
- **Checkpoint that isn't:** a "working state" is recorded that was never built or run.
