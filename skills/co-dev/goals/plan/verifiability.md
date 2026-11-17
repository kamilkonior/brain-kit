# Verifiability

Every step, and the plan as a whole, can be shown to be done: each step ends in a check the builder can run, and the last check is the design's own measure of success.

*Falls short:* done is a matter of opinion. *Overshoots:* checking that costs more than what it protects.

*Borders:* whether a command exists and runs belongs to grounding; what the builder does when a check fails belongs to resilience; whether every design decision has a step belongs to fidelity.

## Desirable

- **Check per step:** each step states how it is shown done: a command and its expected result, a test that passes, a behavior that can be observed.
- **Checks the outcome:** the check observes what the step is for, not that code was written.
- **Can fail:** the check would come out differently if the step were not done, or done wrong.
- **Runnable by the builder:** the builder can carry out the check with what it has; a check that needs the user's eyes is marked as theirs.
- **Nothing broken:** each step's check includes that what worked before still works, and says which existing checks to run.
- **Baseline taken:** the state of the checks before the first step is recorded, so that a new failure can be told from an old one.
- **Cover before change:** where the code to be changed has no tests, a step adds them before the change.
- **Seen to fail:** where a test is the check and the work allows, the test is written and seen to fail before the change that makes it pass.
- **Success criteria placed:** each success criterion of the design has a check in the plan, and the plan ends in them.
- **Checked as used:** the last checks exercise the work the way it will be used (through its interface, with realistic data), not only its parts.
- **Evidence kept:** the plan says what the builder reports as proof (the output of a command, a screenshot), so that the user can judge without redoing the check.
- **The user's acceptance:** what the user will look at to accept a milestone is agreed in advance.
- **Depth follows stakes:** checking is deepest where a mistake would cost most.
- **Cost in proportion:** quick checks run at every step, slow ones at milestones.
- **Unverifiable named:** what cannot be checked before release (behavior under real load) is said, with what will watch it afterward.

## Undesirable

### Falls short

- **Done by assertion:** a step has no check; it is done when the builder says so.
- **Testing at the end:** all verification is one last step.
- **Vague check:** "verify that it works", "test thoroughly".
- **Unrunnable check:** the check needs access, data or tools the builder does not have.
- **Builds, therefore works:** the check is that the code compiles or that the existing tests pass, though none covers the change.
- **No baseline:** nobody knows whether a failing check was failing before.
- **Unplaced criteria:** a success criterion of the design has no check in the plan.
- **Parts only:** each part is checked, and the whole never is.

### Overshoots

- **Check ceremony:** trivial steps carry elaborate checks.
- **Everything every time:** slow, broad checks run after each step where a quick, targeted one would do.
- **Tests for their own sake:** coverage targets, or tests of code too simple to break.
- **Measured where judged:** a number is demanded where the right check is someone looking.
- **Brittle checks:** a check is tied to details the builder was free to choose, so that a correct solution fails it.

### Counterfeits (looks met, is not)

- **Check that cannot fail:** it passes whether or not the step was done.
- **Restated outcome:** the check repeats the outcome in other words ("check: caching works").
- **Checked elsewhere:** the tests pass, and none of them touches the changed code.
- **Test of the stand-in:** the check exercises a stub or a mock, not the thing built.
- **Check left to the builder:** "add suitable tests" lets the builder define afterward what done means.
- **Escape hatch:** "adjust the tests as needed" lets a failing check be changed instead of the code.
