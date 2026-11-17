# Completeness

The build is finished: every step is done in full, the finish line is reached, nothing temporary is left behind, and anything not done is named.

*Falls short:* nearly done, called done. *Overshoots:* work past the plan and the finish line.

*Borders:* whether what was built is what the plan says belongs to fidelity; whether done has been shown belongs to verification; what the record must hold belongs to handoff.

## Desirable

- **Finish line in view:** the plan's finish line (merged, released, in use, the old code gone) is known from the start, and the build ends there.
- **Whole step:** a step is closed when all of its outcome is true, for every case it names, not for the first case or the main path.
- **Every instance:** a change that applies in many places (every caller, every screen, every file of a kind) is made in all of them, found by search, not from memory.
- **All kinds of work:** the tests, data, configuration and documentation a step lists are done with the step, not saved for the end.
- **Connections made:** the parts are joined to each other and to what surrounds them, and the path through them has been run.
- **Nothing temporary left:** stubs, placeholders, debugging output, commented-out code, trial code and unused files are gone, or named with the step that removes them.
- **Removal done:** what the work makes obsolete (old code, flags, scaffolding) is removed where the plan says.
- **Steady depth:** the late steps get the same care as the early ones.
- **Other people's part asked for:** what someone other than you must do (an approval, a credential, a review) is asked for in time, and where it stands is known.
- **To the end of the plan:** the steps after the code (migration, release, switching on) are carried out as far as the finish line reaches and the remit allows, or handed to whoever must do them.
- **Loose ends caught:** something found along the way that needs doing (a follow-up, a fault nearby) is written where it will be seen, not left in a comment or a passing remark.
- **Named gaps:** what was dropped, deferred or could not be done is listed, each with its reason and who or what closes it.
- **Gap hunting:** what is missing is looked for on purpose: the diff searched for markers and leftovers, the plan walked step by step, the work used as its user would use it.
- **Bounded by the plan:** nothing is built that neither the plan nor the making of its steps calls for.
- **Final check:** the build is compared with the finish line before it is called done, and you say what was checked and what was not.

## Undesirable

### Falls short

- **Premature "done":** the build, or a step, is declared finished while pieces are missing.
- **Stubbed and left:** a function returns a fixed value, raises "not implemented" or carries a TODO, and the step is closed.
- **"The rest follows":** the first few of many instances are done, and the others are left "in the same pattern".
- **Code only:** the code is written, and the tests, the documentation, the migration or the configuration the step lists are not.
- **Unconnected parts:** each part exists, and nothing calls it.
- **Leftovers:** debugging output, commented-out code, trial files and scaffolding stay in the repository.
- **Trailing off:** the early steps are built with care and the late ones thin out, because effort or context ran out.
- **Silent omission:** something is skipped and not mentioned.
- **Stopped short of the line:** the build ends at "the code is written" where the finish line was "in use".

### Overshoots

- **Scope creep:** "while I was here" features, refactoring and upgrades nobody asked for.
- **Gold-plating:** tests, documentation or tooling beyond what the plan lists or the project keeps.
- **Past the finish line:** the build runs on into what comes after the agreed end.
- **Nothing may wait:** a follow-up that could be noted is forced into this build.
- **Every finding fixed:** each fault met along the way is repaired, whatever the plan says.
- **Reluctance to close:** the build is kept open for one more improvement.

### Counterfeits (looks met, is not)

- **Mention as done:** a gap is covered by a comment, a TODO or a line in the report, and counted as handled.
- **Caveats below:** "complete" stands in the first line, and what is missing far down.
- **Works in the demo:** the path that was shown works, and the others were not built.
- **"Out of scope" as a bin:** hard parts are declared out of scope, or left "as a follow-up", to avoid building them.
- **Disabled to finish:** a feature, a case or a check is switched off so that the build can be called done.
- **Claimed check:** "everything is in place" is said without the comparison having been made.
