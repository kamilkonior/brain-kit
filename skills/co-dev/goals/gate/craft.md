# Gate: Craft

The builder's own choices are weighed: where the plan and the design left room, what the builder made of it (the code, its tests, how it fits the project, what it does where nothing was decided) is held to whether it is well made, by the project's standards and the plan's reasons, not by how you would have made it.

*Falls short:* "it passes" taken for "it is well made". *Overshoots:* findings that say only that you would have built it differently.

*Borders:* whether a behavior was decided belongs to fidelity; whether a check holds belongs to verification; how the work behaves when it is used belongs to trial; whether a call the builder made in the silence is the user's to decide belongs to sorting; whether the case a finding names can really occur belongs to grounding.

## Desirable

- **Change read whole:** the full change is read as a maintainer of the project will read it, not skimmed for what stands out.
- **Standard and consequence:** each finding names the standard the choice falls short of (a convention of the project, a reason in the plan, a failure that will occur) and what leaving it would cost.
- **Failures followed:** at each place where something can fail (an input, the network, a missing record, two requests at once), what the code does then is read, and swallowed errors and silent fallbacks are found.
- **Real edges asked:** the inputs and states that will occur here (empty, absent, repeated, large, at the same time) are put to the code, and those it does not deal with are found.
- **Boundaries looked at:** where data comes in from outside (a user, a file, the network), what is checked there is looked at, and access and secrets get the first look.
- **Followable cold:** places that a reader of the project could not follow without the session (a name that hides, a trick, a comment that tells the conversation) are found.
- **Fit with the project:** the change is compared with how the project does things (structure, naming, error handling, tests, its instructions for contributors) and with what it already has, so that a reinvented helper is found.
- **Reach followed:** for what others depend on and the build changed (a signature, a format, a setting), its users are looked up, and those not dealt with are found.
- **Excess found:** layers, options and parameters with a single use, and generality nobody asked for, are found as excess.
- **Tests read as code:** the build's tests are read for what each asserts, whether it is tied to behavior or to internals, and whether it can be followed without the implementation open.
- **Leftovers searched:** debug output, commented-out code, unused files, the remains of abandoned attempts and "temporary" shortcuts with nothing that removes them are searched for.
- **What must not be there:** keys, tokens and personal data are searched for in the change and in its history.
- **Project's tools run:** the formatter, the linter and the type checker the project uses are run on the examined state, and new exceptions and silenced rules are found.
- **Trouble spots read closest:** where the record shows several attempts, a workaround or a changed check, the code that came of it is read line by line.
- **Calls in the silence weighed:** a choice the builder made where nothing was decided is weighed against the reasons the design gives, and noted with what it does for the one who uses the work.
- **Unusual and sound left alone:** a choice that is unusual and holds is not a finding.
- **Care follows stakes:** the closest reading goes where a mistake would be costly or hard to see (data, money, access, concurrency), and routine code is not agonized over.

## Undesirable

### Falls short

- **Green, therefore fine:** the checks pass, and the code is not read.
- **Skimmed change:** the change is scrolled through, and the findings come from what caught the eye.
- **Main path read:** the main flow is followed, and what happens on failure is never asked.
- **Tests counted:** the tests are counted, not read.
- **Surface only:** names and formatting are remarked on, and the logic is not followed.
- **Island reading:** the new code is read alone, and its callers and the project's conventions are not looked at.
- **Hack waved through:** a "temporary" shortcut with nothing that removes it passes without a word.
- **Too big to read:** a large change is passed because reading it would take long.

### Overshoots

- **Taste:** a finding says that a name, a structure or a pattern could be different, and names no consequence.
- **Rewrite in the head:** the work is measured against the implementation the gate would have written.
- **Polish demanded:** clear code that passes is sent back for better names and a tidier structure.
- **Speculative demands:** safeguards, generality or speed are asked for that the design does not ask for and reality will not need.
- **Neighborhood gated:** code the build did not change is sent back to the build as its finding.
- **Fashion as standard:** a practice the project does not follow is cited as the standard the code breaks.
- **Nit flood:** forty small remarks go back, and the two that matter are among them.

### Counterfeits (looks met, is not)

- **Finding by pattern:** "possible race condition" or "consider error handling" is recorded from the look of the code, and no case was traced.
- **Praise as reading:** "clean, well-structured code" stands where a reading should have been.
- **Linter as reader:** the tools came out clean, and that is recorded as the code being well made.
- **Invented standard:** a finding cites "the project's convention", and the project has no such convention.
- **Consequence in general:** "this could cause problems later" stands in for the case in which it does.
- **Volume as depth:** many small findings are offered as the sign of a close reading.
