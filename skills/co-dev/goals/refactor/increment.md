# Refactor: Increment

The refactoring advances in small steps that each keep the code working: a step is one change of structure, it is checked and recorded before the next begins, and a step that breaks something is taken back, not patched forward.

*Falls short:* a rewrite: everything taken apart at once, and nothing that works until all of it does. *Overshoots:* ceremony around every rename.

*Borders:* where the steps lead belongs to target; the checks that are run belong to baseline, and what their passing shows to proof; whether a step changed the behavior belongs to preservation; the user's work, and what a revert does not undo, belong to containment; what the history has to tell the waiting work belongs to return; how the steps reach the user's eye belongs to economy.

## Desirable

- **Way sketched:** the way from the present shape to the target is laid out as a short list of moves before the first one, coarse where the code will decide.
- **One move per step:** a step is one change of structure (an extraction, a move, a rename, an inlining), not several at once.
- **Checked after each:** the baseline checks for the code in hand are run after each step, and the next step starts when they pass.
- **Working state:** after each step the code builds and runs, so that the refactoring could stop there and leave working code.
- **Recorded as it goes:** each step is committed (or recorded as the rules of the work say) with the move it made, so that it can be read and reverted on its own.
- **Back, not forward:** when a step turns the checks red, the step is taken back and tried smaller or another way; the cause is not hunted in a growing pile of edits.
- **Move apart from edit:** code is moved in one step and changed in another, so that the diff of the move shows nothing but the move.
- **Structure apart from behavior:** a change in behavior that the user has agreed (a fault repaired, a format changed) is a step of its own, never in the same change as a move.
- **Code apart from tests:** tests are not restructured in the step that restructures the code they test.
- **Tool where there is one:** a rename, a move or an extraction that the editor, the compiler or a script can carry out is made with it, and its result is read.
- **Added, switched, removed:** where the users of a thing cannot all change at once, the new form is added, the users are brought over a group at a time and the old form is then removed, each as steps that keep the code working.
- **Pattern tried once:** where the same move is to be made in many places, it is made in one, checked and shown, before the rest follow.
- **Doubtful move early:** the move most likely to show that the target does not hold is made early.
- **Clean stop:** when the refactoring pauses or is interrupted, no step is half done, and what is done and what remains is said.
- **Proportion:** the size of a step follows the risk: fine where a slip would be costly or hard to see, larger where a tool and the compiler carry the move.

## Undesirable

### Falls short

- **Big bang:** the module is rewritten in one go, and first run when all of it is in place.
- **Several at once:** a rename, a move and a changed signature go into one step, the checks fail, and nobody knows which did it.
- **Broken in between:** the code does not build for a dozen edits in a row, "until the pieces are back together".
- **Patching forward:** after a red run, edits are piled on to get back to green, where taking the step back would have.
- **Moved and edited:** a function is moved to a new file and rewritten on the way, and the diff cannot show what changed.
- **Mixed change:** one commit holds a restructuring and a repair, so that neither can be reviewed or undone alone.
- **Uncommitted pile:** hours of moves sit in the working tree with no point to return to.
- **Long edit, no run:** hundreds of lines are rearranged before anything is run.

### Overshoots

- **Crumb commits:** every renamed local variable is committed and announced.
- **Step ritual:** each trivial move gets the full suite and a report.
- **By hand what a tool does:** forty call sites are edited one at a time, with a run between each, where the rename tool and the compiler would have carried them.
- **Two forms for the simple:** an old and a new form are kept side by side for a change that one safe step would have made.
- **Slicing for its own sake:** a move that is one coherent change is cut into pieces that mean nothing alone.

### Counterfeits (looks met, is not)

- **Split after the fact:** one big change is cut afterward into step-shaped commits that never ran on their own.
- **Green by switching off:** the code "works after each step" because a failing test was skipped or the unfinished part stubbed.
- **Step in name:** a commit is called "extract function" and holds the extraction and three other changes.
- **Checked beside the point:** after each step a quick subset is run that does not exercise the code that moved.
- **Checkpoint that isn't:** a "working state" is recorded that was never built or run.
