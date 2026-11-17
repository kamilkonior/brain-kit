# Refactor: Baseline

What the code does is pinned down before it is touched: checks exercise the code to be changed through what its users see, they have been seen to pass on the code as it was and would fail if it did something else, and where they do not reach, the gap is closed or named before the change.

*Falls short:* a structure changed with nothing that would notice. *Overshoots:* a harness heavier than the change, or checks that pin the very structure that is to change.

*Borders:* which behavior must stay belongs to framing; finding who uses the code belongs to grounding; running the checks after each step belongs to increment; what their passing shows at the end, and that they were not changed on the way, belongs to proof; whether added checks stay in the project is the user's call and belongs to agency, and telling them which stayed to return.

## Desirable

- **Existing checks found:** the tests, type checks and other checks the project has for the code to be changed are found and read for what they exercise and what they do not.
- **Seen passing first:** the checks are run on the code as it is, before the first move, and the result is kept: what was run, what passed, and what was skipped or failing already.
- **Reach known:** which parts of the code to be changed the checks run through is established (by a coverage run, or by reading the tests), and the paths they miss are named.
- **Seen to fail:** where a slip would be costly, a check is seen to fail when the behavior is changed on purpose (a line taken out, a value altered), so that its passing means something.
- **Gap closed before the move:** where code that is to be moved is not exercised, checks are added first, as a change of their own, and seen to pass before the structure changes.
- **Behavior as it is:** an added check records what the code does now, also where that looks wrong; what looks wrong is reported, and not corrected in the check.
- **At a surface that stays:** checks sit at an interface the refactoring leaves alone (the public function, the endpoint, the command), so that they do not have to change with the structure.
- **Doubtful paths in:** the cases a restructuring changes most easily are among those pinned: errors, empty and boundary inputs, the order of effects, what is written and sent.
- **Recorded output:** where the behavior is too broad to assert by hand, the output of the old code on real or representative inputs is recorded, to be compared with the new.
- **Unsteady checks set apart:** checks that fail now and then are identified beforehand, so that a later failure can be read.
- **Quick enough to repeat:** the checks for the code in hand run in a time that allows running them after every step.
- **Gap named:** what could not be pinned (a path that needs the live system, timing, a caller outside the repository) is named to the user before the change, with what will stand in for it.
- **Made to stay or to go:** a check added for the refactoring is written to the project's standard where it is to stay, and marked where it is to go.
- **Depth follows stakes:** a rename that a tool makes in compiled code needs the build; a change to how an amount is worked out needs cases.

## Undesirable

### Falls short

- **No net:** code without tests is restructured, and nothing was run before or after.
- **Not run first:** the checks are first run after the change, and a failure cannot be told from one that was there before.
- **"There are tests":** the project has a suite, and nobody looked whether it runs through the code being moved.
- **Main path only:** the ordinary case is pinned, and the error handling that the move rearranges is not.
- **Net after the fact:** tests are written after the restructuring, and record what the new code does.
- **Gap unsaid:** the part no check reaches is moved along with the rest, and the user is not told.
- **Red at the start:** the refactoring starts on checks that fail, and nobody noted which.

### Overshoots

- **Coverage campaign:** the whole module is brought under test before one function is pulled out.
- **Pinned internals:** tests are written against private functions and sequences of calls that the refactoring is about to change, and have to be rewritten with every move.
- **Every accident pinned:** incidental output (the exact wording of a log line, the order of keys) is asserted though the frame says nobody relies on it.
- **Harness heavier than the work:** a rig for recording and comparing is built for a change the compiler checks.
- **Tests on principle:** tests are demanded before a move that a tool carries out and the compiler checks.

### Counterfeits (looks met, is not)

- **Cannot fail:** a check passes with the behavior changed, because it asserts nothing that the change would alter.
- **Mocked away:** the checks replace the very code being restructured with a stand-in.
- **Run, not checked:** the tests run through the lines, and nothing about their result is asserted.
- **Baseline of the new:** the recorded output was taken after the change, and compares the new code with itself.
- **Corrected in the check:** an added test asserts what the code ought to do, not what it does, and the refactoring then "has to" change the behavior.
- **Claimed green:** "the tests pass" is said of a run that was not made on this code, or whose skipped and failing tests were not read.
