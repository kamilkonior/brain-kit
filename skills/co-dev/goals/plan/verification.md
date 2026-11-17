# Verification

Every step, and the plan as a whole, says how it will be shown to be done: by a check that can be run or observed and would fail if the work were wrong, and the checks together show what the design calls success.

*Falls short:* "done" left to the builder's opinion. *Overshoots:* checking that costs more than the mistakes it could catch.

*Borders:* what a step is meant to produce belongs to decomposition; whether the test tools exist and run belongs to grounding; what happens when a check fails belongs to resilience; where the build waits for the user belongs to agency.

## Desirable

- **A check per step:** each step names how it is shown to be done: a test that passes, a command with its expected output, a thing to look at.
- **Could fail:** each check would fail if the step were wrong or not done; where a mistake would be costly, it is seen to fail before the work is done.
- **Runnable as written:** a check gives the exact command or procedure, with the tools the project has, and the result that counts as passing.
- **Behavior, not existence:** a check observes what the work does (a request answered, a record written, a screen shown), not that files or functions exist.
- **Success traced:** each success criterion of the design is tied to a check in the plan, and the last checks show the end state of the frame.
- **Nothing else broke:** the plan says which existing checks and behaviors must still hold after a step, and when the whole suite is run.
- **Checks where parts meet:** where steps or parts connect, a check exercises them together as soon as both exist.
- **Failure cases checked:** the failures and limits the design specifies have checks, including what must not happen.
- **Depth follows stakes:** checking is heaviest where a mistake would be costly or hard to see, and light where it would be obvious and cheap to fix.
- **Named checker:** each check says who makes it: the builder alone, or the user looking at a result, who is told what to look for.
- **Means planned:** what a check needs that does not exist yet (test data, a fixture, an environment) is planned as work.
- **Honest manual checks:** where automating a check would cost more than it is worth, the manual procedure is written out with its expected result.
- **Evidence:** the plan says what the builder records as proof that a check passed (the output, a screenshot, a commit).
- **Whole at the end:** the plan ends with the design's main scenario run end to end on the real path.

## Undesirable

### Falls short

- **No check:** a step ends when the builder thinks it is finished.
- **"Tests pass":** the check is the existing suite, which does not exercise the new work.
- **Vague check:** "verify it works" or "test thoroughly", with no procedure and no expected result.
- **Checking at the end:** all checking is gathered in a final "add tests" step.
- **Main path only:** nothing checks the failures, limits and cases the design names.
- **Orphan criterion:** a success criterion of the design is shown by no check.
- **Unrunnable check:** a check needs data, access or an environment that nobody planned for.

### Overshoots

- **Test everything:** every function gets every kind of test, whatever the risk.
- **Gate on every step:** each small step waits for a full run, a review or the user's sign-off.
- **Check heavier than the work:** a harness or an environment is built to show what a glance would.
- **Proving the obvious:** checks are planned for what the compiler or the next step would catch anyway.
- **Frozen internals:** checks are tied to how a step is implemented, so that any later change breaks them.

### Counterfeits (looks met, is not)

- **Cannot fail:** a check asserts what is always true, or passes before the work is done.
- **Existence check:** "the file exists" or "the endpoint is defined" is counted as working.
- **Self-graded:** the builder is told to "confirm" or "review" the result, with nothing outside their own judgment to compare it against.
- **Mocked away:** the check replaces the very part in doubt with a stand-in.
- **Fitted check:** expected results are to be taken from what the code produces.
- **Criterion restated:** a success criterion is repeated as its own check, with no way to observe it.
- **Coverage number:** a percentage stands in for judgment about what must be checked.
