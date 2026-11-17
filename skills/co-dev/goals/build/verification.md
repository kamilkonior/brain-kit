# Verification

A step is called done when its check has been run and seen to pass, on the code as it now stands, and at the end the checks together show what the design calls success.

*Falls short:* "done" on the builder's word. *Overshoots:* checking that costs more than the mistakes it could catch.

*Borders:* finding the cause of a failing check belongs to adaptation; what the code is written against belongs to grounding; whether a test is well-made code belongs to craft; what the user is told about a result belongs to shared understanding; the user trying the work belongs to iteration.

## Desirable

- **The plan's check run:** each step's check is run as the plan writes it, and its result is read, before the step is called done.
- **Fresh run:** a claim that something passes rests on a run made after the last change to the code, not on an earlier one.
- **Whole result read:** the output is read to the end (the exit status, the counts, the warnings, the tests that were skipped), not only its last line.
- **Seen to fail:** where a mistake would be costly, the check is seen to fail before the work is done, or with the work taken out, so that passing means something.
- **Behavior observed:** what the step makes the system do is run and looked at on the real path (the request sent, the screen opened, the record read back).
- **Nothing else broke:** the existing checks the plan names are run after the step, and the whole suite where the plan says so.
- **Missing check supplied:** where a step came without a check, one is agreed or written before the work, not fitted to it afterward.
- **Check changed in the open:** a check that turns out wrong or unrunnable is changed as a change to the plan, with the reason, and is never bent until it passes.
- **Tests that could fail:** a test written during the build asserts the behavior the step is for, and fails when that behavior is taken away.
- **Failure cases run:** the failures and limits the design specifies are exercised, including what must not happen.
- **Joined parts checked:** when two parts that meet both exist, they are run together.
- **Prepared for the user's eye:** where the plan names the user as checker, they get what to run or open, what to do and what they should see.
- **Evidence kept:** what the plan asks for as proof (the output, a screenshot, the commit) is recorded where the plan says.
- **Unrun said:** a check that could not be run is reported as not run, with the reason and with what was run instead.
- **Depth follows stakes:** beyond the plan's checks, extra checking goes where a mistake would be costly or hard to see, and not elsewhere.
- **Whole at the end:** the design's main scenario is run end to end on the real path, and each success criterion is shown by a check that was seen to pass.

## Undesirable

### Falls short

- **Done by reading:** a step is called done because the code looks right.
- **Compiles, therefore works:** building or type-checking stands in for the step's check.
- **Stale pass:** the check passed before the last edits and was not run again.
- **"Tests pass":** the suite that was run does not exercise the new work.
- **Part for whole:** one test file or the main path was run, and the step's check asked for more.
- **Checking put off:** checks are left to the end of the stage, where their failures can no longer be told apart.
- **Last line only:** a failure, a skip or a warning in the middle of the output goes unread.
- **Never looked:** the screen or the output a user will see is never opened.

### Overshoots

- **Suite after every edit:** a long full run follows each small change.
- **Test everything:** tests are written for accessors, wiring and what the compiler already guarantees.
- **Checked again:** what has not changed is verified again and again.
- **Harness heavier than the work:** an environment is built to show what a glance would.
- **Gate on every step:** each step waits for a review or the user's sign-off that the plan did not ask for.
- **Frozen internals:** new tests are tied to how the step is implemented, so that any later change breaks them.

### Counterfeits (looks met, is not)

- **Weakened check:** an assertion is loosened, a test skipped or deleted, or an expected value edited, so that the run goes green.
- **Fitted expectation:** expected results are copied from what the code produces.
- **Special case for the test:** the code recognizes the test's input and answers it, without doing the work.
- **Mocked away:** the check replaces the very part in doubt with a stand-in.
- **Cannot fail:** a test passes with the work removed.
- **Existence check:** "the endpoint is defined" or "the file is there" is counted as working.
- **"I ran it":** a run is claimed that was not made, or its output is quoted selectively.
- **Green elsewhere:** the result reported comes from another branch, another environment or a subset of the checks, and is given as the result.
