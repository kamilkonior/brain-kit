# Gate: Verification

What the build says about the work is put to the test: the steps called done are done, the checks said to pass are run again on the examined state and would fail if the work were wrong, the record agrees with the history, and the instructions work as written.

*Falls short:* "all checks pass" taken from the build's report. *Overshoots:* everything the build showed proved a second time.

*Borders:* whether the work is what was decided belongs to fidelity; trying what no check exercises belongs to trial; whether a test is well-made code belongs to craft; whether what the gate itself reports was seen belongs to grounding; how far the testing goes belongs to completeness.

## Desirable

- **Claim by claim:** each claim gathered in the frame (a status, a pass, a recorded departure, an open item, "nothing else changed") is tested, or named as not tested.
- **Fresh run:** the plan's closing checks and the project's suite are run by the gate on the examined state, and their whole result is read (the exit status, the counts, the skips, the warnings).
- **As the plan writes them:** each check is run as the plan states it, and a difference between the check as planned and the check as it now exists is found.
- **Exercises the work:** for the checks that carry the build's "done", it is established what each exercises: that it reaches the new code and asserts the behavior its step is for.
- **Could it fail:** where a mistake would be costly, a check is shown able to fail, by running it against a copy with the work taken out or broken.
- **Changed checks found:** checks that were loosened, skipped, deleted or given new expected values during the build are found from the history, and compared with what the record says about it.
- **Stand-ins in the checks:** where a check replaces a part with a stand-in, it is established whether the part replaced is the part in doubt.
- **Done means done:** for each step marked done, its result is looked for in the code and its check passes now.
- **Evidence opened:** the proof the plan asked for (an output, a screenshot, a commit) is opened and compared with the examined state, not counted as present.
- **Record against history:** the record's account of what was done, what turned out differently and who decided is compared with the commits, and with the conversation where it is at hand.
- **Baseline told apart:** a failure is checked against the starting state before it is laid to the build, and what failed before is named as that.
- **Instructions followed:** the written way to set up, run and check the work is followed as written, and where it does not lead is noted.
- **Open list tested:** the build's list of omissions and open items is compared with what the gate found open, and what is missing from it is a finding.
- **Not run said:** a check that could not be run here (it needs a credential, live data, real scale) is recorded as not run, with what was done instead.
- **Strength noted:** for each weighty claim that held, the record says what stands behind it: run by the gate, seen able to fail, or taken from the build's evidence.
- **Depth follows stakes:** the costly claims are tested hardest; a routine pass is run once and read.

## Undesirable

### Falls short

- **Word passed on:** "all checks pass" goes from the build's report into the gate's record.
- **Stale pass:** the checks passed before the last commits, and the gate did not run them on the examined state.
- **Last line only:** the suite is run, and the skipped tests and the warnings in the middle of the output go unread.
- **Suite as proof:** the suite passes, and nobody looked at whether it exercises the new work.
- **Status trusted:** the boxes are ticked, and no step's result was looked for.
- **Evidence counted:** a screenshot is in the record, and nobody opened it or asked which state it shows.
- **Instructions untried:** the way to run the work is written down, and the gate started it some other way.
- **Open list accepted:** what the build names as open is taken as all that is open.

### Overshoots

- **Everything proved again:** each step's check is run and analyzed singly, whatever its risk, though the closing run covers them.
- **Break everything:** every test is shown able to fail, for a change to a label.
- **New suite written:** the gate writes the tests it finds missing, which is the build's work.
- **Clean machine for two files:** a new environment is built from nothing to follow the instructions for a small change.
- **Past the claim:** the gate sets out to prove properties nobody claimed and no criterion asks for.

### Counterfeits (looks met, is not)

- **Echo as confirmation:** the build's claim is repeated in the gate's voice, and now reads as a second look.
- **Same blind spot:** the builder's tests are run again, and their passing is taken to show that the work does what was decided.
- **Green elsewhere:** the run the gate reports is from another branch, another state or a subset of the checks.
- **Count as proof:** "214 tests pass" is recorded where the question was what they test.
- **"I ran it":** a run is claimed that was not made, or its output is quoted selectively.
- **Fails for another reason:** a check is "seen to fail" because the broken copy did not build, not because the behavior was missing.
- **Mended run:** the checks pass for the gate after it adjusted something in its environment, and the adjustment is not mentioned.
