# Refactor: Proof

That the behavior is the same is shown, not supposed: the same checks, unchanged, pass on the code as it now stands as they passed before, what they cannot show is shown another way or named as not shown, and the claim says what it covers and how sure it is.

*Falls short:* "no change in behavior", on your word. *Overshoots:* certainty pursued past what a slip would cost.

*Borders:* making the checks, and seeing that they can fail, belongs to baseline; running them step by step belongs to increment; not changing the behavior belongs to preservation; whether each fact used was read or run belongs to grounding; what the user understands by the claim belongs to shared understanding.

## Desirable

- **Before and after:** the claim rests on two runs of the same checks: one on the code as it was, one on the code as it now stands.
- **Checks unchanged:** the checks that passed before pass afterward without having been edited; where a move forces an edit to a test (an import, a renamed symbol), the edit is that and nothing more, and is shown.
- **Fresh run:** the run after was made after the last change to the code.
- **Whole result read:** the output is read to the end and held against the run before: the same number of tests ran, none is newly skipped, and no warning is new.
- **Whole at the end:** at the end the project's full checks are run (the build, the types, the linter, the whole suite), not only those for the code in hand.
- **Old against new:** where the checks are thin, the old and the new code are run on the same inputs (recorded, real or generated) and their outputs are compared.
- **Carried by the tool:** where a move was made by a tool that keeps the meaning (a rename the compiler checks, an automated extraction), that is named as the ground, with what the tool does not guarantee.
- **What the compiler shows:** what the type checker or the compiler guarantees for this change is used, and named for what it shows and what it does not.
- **Diff that shows a move:** where a step is a pure move, the diff is made so that it shows the moved lines as moved, and is read for anything else.
- **Reasoned where not run:** where the sameness can only be argued, the argument is given step by step, and marked as reasoning and not as a result.
- **Edges run:** the cases in which restructured code most often differs (empty, failing, at the boundary, the order of effects) were among those run.
- **On the real path:** where a difference would be costly, the code is exercised the way its users reach it (the request, the command), not only through tests of its parts.
- **Cost measured where it counts:** where the frame counts speed or memory as behavior, they are measured before and after, on the same input.
- **Not shown said:** what no check, comparison or tool covered (a path, a caller outside the project, timing) is listed, with what would show it.
- **Stated sureness:** the claim says for which behavior the sameness is shown, for which it is likely and for which assumed, and what each rests on.
- **Evidence shown:** the user sees the commands and the results of before and after, not a statement that it was verified.
- **Depth follows stakes:** proof is heaviest where a silent difference would be costly or hard to undo, and light where the tool and the compiler carry the move.

## Undesirable

### Falls short

- **"Should behave the same":** the sameness is claimed from reading the diff.
- **After only:** the tests passed after the change, and were never run before it.
- **Stale pass:** the checks passed before the last edits and were not run again.
- **Part for whole:** one test file was run, and the claim is made for the module.
- **Compiles, therefore the same:** building or type-checking stands in for running the behavior.
- **Last line only:** a failure, a skip or a warning in the middle of the output goes unread.
- **Gap passed over:** the part no check reaches is covered by the same "all tests pass".

### Overshoots

- **Certainty for the trivial:** a rename made by a tool in typed code is proven with recorded outputs and runs side by side.
- **Every path to the ground:** paths the change did not touch are proven one by one.
- **Checked again:** what has not changed since the last run is verified again and again.
- **Past the decision:** more is shown after the user could already accept the change, and would accept it the same.
- **Hedged to nothing:** a sameness that was shown is reported with so many reservations that it says nothing.

### Counterfeits (looks met, is not)

- **Weakened check:** an assertion is loosened, a test skipped or deleted, or an expected value edited, so that the run after goes green.
- **Tests moved with the code:** the tests were rewritten together with the code they test, and pass on whatever the new code does.
- **Record refreshed:** the recorded outputs are taken again after the change, "because the format differs slightly".
- **Fewer than before:** the run after passes with fewer tests than the run before, because some are no longer found, and nobody compared.
- **Green elsewhere:** the result reported comes from another branch, another environment or a subset of the checks, and is given as the result.
- **Confident wording:** "this is a pure refactoring" stands in for evidence.
- **Claimed confirmation:** "verified" is said, and no output shows a run before and a run after.
- **Boilerplate uncertainty:** "should be equivalent, but please test" is attached, with no word on which part was not shown.
