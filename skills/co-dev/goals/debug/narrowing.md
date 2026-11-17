# Narrowing

Each probe rules something out: it is chosen for what its result would tell, its outcome is predicted before it runs, it changes one thing, and after each result the room in which the cause can lie is smaller.

*Falls short:* changes tried to see what happens. *Overshoots:* method where the evidence already points at the place.

*Borders:* where the candidates come from belongs to hypothesis; the way to make the failure happen belongs to reproduction; whether what was read off a probe is true belongs to grounding; showing that the candidate left over is the cause belongs to proof; taking the probes out at the end belongs to containment.

## Desirable

- **Question before probe:** before a probe is run it is said what it is to decide, and what each outcome would mean.
- **Prediction first:** the expected result is stated before the run, and a result that differs is treated as a finding.
- **Telling probe:** a probe is chosen whose outcomes differ between the candidates still standing.
- **One thing at a time:** a probe changes one thing; where two were changed together, they are separated before anything is concluded.
- **Cheap and likely first:** among the telling probes, the one that rules out most for its cost comes first.
- **Halving:** where the cause lies somewhere along a line (a range of commits, the stages of a pipeline, an input, a list of settings), the line is cut in the middle, not walked from one end.
- **Difference by difference:** the failing case and the working one are compared, and their differences are removed one at a time until the failure moves.
- **Followed back:** a wrong value is traced from where it shows to the first place where it is wrong.
- **Look before change:** where reading a value and changing the code would tell the same, the value is read.
- **Result read and kept:** the outcome is read in full, held against the prediction and noted: what was run, what came, what it rules out.
- **Smaller each time:** after each result it can be said what is now excluded, and of a probe that excluded nothing, that is said.
- **Clean between probes:** what a probe changed is taken back before the next, unless it is kept on purpose and that is said.
- **Probe checked:** when results contradict each other, the probe itself is checked: whether the line is reached, the build is fresh and the code that runs is the code that was changed.
- **Different when stuck:** after two probes that told nothing, the next move is a different kind (start from the other end, widen the room again, tell the failing path to the user step by step), not a third variation.
- **Bounded line:** a line of search has a stated limit, and at the limit it is reported and decided anew.
- **Trail kept:** what was tried and what came of it is kept in a list, so that nothing is tried twice and the user can follow.
- **Proportion:** a look that takes a second is taken without the apparatus.

## Undesirable

### Falls short

- **Try and see:** changes are made to see what happens, with nothing predicted.
- **Several at once:** three things are changed, the failure stops, and nobody knows which did it.
- **Walking the line:** commits or stages are checked one by one from one end.
- **Untelling probe:** a test is run that every candidate would pass.
- **Confirming only:** probes are chosen that can only agree with the favored cause.
- **Changes piled up:** probe changes stay in, and later results rest on a mix nobody can name.
- **Same again:** a probe is repeated in the hope of another outcome.
- **Staring:** the code is read again and again for the fault, where a run would show the value.
- **Lost trail:** nobody can say what was tried, or with what result.

### Overshoots

- **Bisecting the obvious:** forty commits are bisected where the stack trace and yesterday's change name the place.
- **Protocol for a glance:** prediction, control and record are produced for a look that takes a second.
- **Ruling out the ruled out:** probes are run against candidates that an earlier result excluded.
- **Past the cause:** the narrowing goes on, to the exact character, after the cause is plain.
- **Instrument everything:** logging is added throughout before any question was asked.
- **Tool detour:** time goes into setting up a debugger, a profiler or tracing that the question did not need.

### Counterfeits (looks met, is not)

- **Prediction after the fact:** "as expected" is said of a result nobody predicted.
- **Uncontrolled comparison:** two cases that differ in many things are compared, and the outcome is credited to one of them.
- **Excluded by a blind probe:** a candidate is ruled out by a probe that could not have shown it: the log line was never reached, the build was stale.
- **Excluded by one run:** one passing run excludes a candidate, though the failure comes one time in ten.
- **Activity as progress:** many commands are run and the trail is long, and the room for the cause is as large as before.
