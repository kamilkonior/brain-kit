# Decomposition

The work is cut into steps that can each be built, checked and reviewed alone: each is one change with one outcome, small enough to finish in one go, and leaves the code working.

*Falls short:* steps too large to check or to finish. *Overshoots:* steps too small to mean anything alone.

*Borders:* the order of the steps belongs to route; how much a step says belongs to detail; the check itself belongs to verifiability.

## Desirable

- **One outcome each:** a step is named by what will be true when it is done, in one sentence without "and".
- **Cut along behavior:** where the work allows, a step adds or changes one thing the system does, through every layer that takes, and is not cut by layer or by file.
- **Leaves it working:** after each step the code builds, what passed before still passes, and the step could be committed alone.
- **Checkable alone:** each step ends in something that can be observed without the steps after it.
- **One sitting:** a step is small enough for the builder to finish in one session and for the user to review in one reading.
- **Size follows risk:** steps are smaller where the work is uncertain or hard to undo, and larger where it is routine.
- **Even grain:** steps are of comparable size, and one much larger than the rest is cut or explained.
- **Rough sizes:** each step carries a rough size (small, medium, large) and what it rests on; a step nobody can size is not yet understood, and is cut or preceded by a trial.
- **One kind of change:** restructuring that changes no behavior is a step of its own, apart from the change in behavior it prepares.
- **Undone alone:** a step can be reverted without reverting the ones before it.
- **Stated seams:** where one step hands something to another (an interface, a data shape, a file), both steps say the same thing about it.
- **One owner:** each piece of work belongs to exactly one step.
- **Separate ground:** steps marked as independent touch different files, or say where they meet.
- **Cut tried on the code:** what each step touches is looked up, and a step that turns out to touch everything is cut again.
- **Proportion:** the number of steps matches the work: three are not made of one, nor one of ten.

## Undesirable

### Falls short

- **Boulders:** a step ("implement the backend") hides a dozen decisions and cannot be checked until all of it is done.
- **Compound steps:** a step holds several outcomes joined by "and", and can be left half done.
- **Horizontal cut:** steps follow layers or files, so that nothing works until several are done.
- **Broken in between:** a step leaves the code not building, or checks failing, for a later step to repair.
- **Tangled steps:** two steps change the same thing, or one cannot be finished without half of another.
- **Mixed change:** restructuring and new behavior share a step, so that a failure cannot be traced to either.
- **Uneven grain:** one step is an hour's work and the next a week's, with nothing said.
- **Hidden unknown:** a step contains a question nobody has answered, and is listed as if it were work.

### Overshoots

- **Crumbs:** steps the size of a line or a single edit, none of which means anything alone.
- **Keystroke list:** steps are actions (open the file, add the import), not outcomes.
- **Overhead per step:** every small step carries its own check, commit and report, and the overhead exceeds the work.
- **Forced slices:** work that is one change by nature (a rename, a format change) is split to fit a size rule, and the pieces do not work alone.
- **Cut for parallel work:** work is split so that it can run side by side, and joining it costs more than the split saved.
- **Too many to read:** there are so many steps that the user cannot take in the plan.

### Counterfeits (looks met, is not)

- **Renamed boulder:** a large step is split into "part 1" and "part 2", neither with an outcome of its own.
- **Outcome in name only:** the step is worded as an outcome ("the service is robust") that nothing could show.
- **Working by stub:** the code works after the step only because the hard part is stubbed, and nothing says when the stub goes.
- **Slice in name:** a step named after a feature changes a single layer.
- **Sizes for show:** sizes or hours are attached with no basis.
