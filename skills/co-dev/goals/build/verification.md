# Verification

Each step, and the build as a whole, has been shown to be done: its check was run and seen to pass after the last change, the evidence is at hand, and the last check is the design's own measure of success.

*Falls short:* done because you say so. *Overshoots:* checking that costs more than what it protects.

*Borders:* finding why a check fails belongs to grounding; what is done when a check cannot be made to pass belongs to adaptation; whether the user's picture of the result is right belongs to shared understanding.

## Desirable

- **Baseline taken:** the checks are run before the first change and their state recorded, so that a new failure can be told from an old one.
- **The plan's check run:** each step is closed by the check the plan gives it, run as written; where the check itself proves wrong, it is changed in the plan, in the open.
- **After the last change:** the check that closes a step is run on the code as it is committed, and an edit after the check means the check again.
- **Seen, not assumed:** the result is read from the output (what ran, what passed, what was skipped), not taken from the absence of an error.
- **Seen to fail:** where a test is the check and the work allows, the test is written and seen to fail before the change that makes it pass.
- **Cover before change:** where the code to be changed has no tests, they are added and pass before the change, as the plan provides.
- **Nothing broken:** the existing checks the plan names are run with each step, and a failure that was not in the baseline is yours until shown otherwise.
- **Tests test the thing:** a test written during the build exercises the code that was built, checks what the step is for, and would fail if the code were wrong.
- **Failing check, changed code:** when a check fails, the code is changed; a test is changed only when it is shown to be wrong, and you say so.
- **Checked as used:** at milestones and at the end, the work is exercised the way it will be used (run, through its interface, with realistic data), not only through its tests.
- **Success criteria checked:** at the end, each success criterion of the design is checked and reported one by one.
- **Evidence kept:** what the plan asks for as proof (the output of a command, a screenshot) is kept and reported, so that the user can judge without redoing the check.
- **The user's checks handed over:** a check marked as the user's is prepared (what to run, what to look at, what to expect) and waits for them; it is not passed on their behalf.
- **Depth follows stakes:** checking beyond the plan's goes where a mistake would cost most (data, security, an interface others rely on) and where the build departed from the plan.
- **Unverified named:** what could not be checked (no access, no data, visible only in use) is said, with what would check it.

## Undesirable

### Falls short

- **Done by assertion:** a step is marked done with its check not run.
- **Builds, therefore works:** the check run is that the code compiles or that the old tests pass, though none covers the change.
- **Stale pass:** the check passed before the last edits and was not run again.
- **Never run:** the code was never executed; it was read and judged right.
- **Checking at the end:** the steps' checks are saved up and run together when everything is written.
- **No baseline:** nobody knows whether a failing check was failing before.
- **"Unrelated" failure:** a failing check is waved through as not caused by this work, without a look at the baseline.
- **Parts only:** each step's check passed, and the whole was never exercised.

### Overshoots

- **Check ceremony:** trivial steps get elaborate verification.
- **Everything every time:** the slow, broad suite runs after each small edit where a quick, targeted check would do.
- **Tests for their own sake:** tests of code too simple to break, or written to reach a number.
- **Brittle tests:** tests are tied to details that are free to change, so that correct changes break them.
- **Proof beyond need:** evidence is piled up (every log, every screenshot) for steps nobody doubts.
- **Re-verifying the settled:** steps closed and untouched since are checked again at every later step.

### Counterfeits (looks met, is not)

- **Check bent to pass:** the test is weakened, skipped or deleted, or its expected value is changed to what the code produces.
- **Check that cannot fail:** the test passes whether or not the change is there.
- **Test of the stand-in:** the test exercises a mock or a stub, not the thing built.
- **Special-cased:** the code recognizes the test's input and answers it, without doing the work.
- **Checked elsewhere:** the tests pass, and none of them touches the changed code.
- **Substituted check:** an easier check than the plan's is run and reported as the step's.
- **Selective report:** "the tests pass" is said of the ones that were run, with failures, skips or errors left out.
