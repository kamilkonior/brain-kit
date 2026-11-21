# Walkthrough: Verification

The user knows what stands behind the claim that the work works: what matters most they see run now, on the judged state; for the rest they are told which check showed it, who ran it and when; and what nothing shows is named as taken on trust.

*Falls short:* "it works" passed on as it was reported. *Overshoots:* everything proved again in front of the user.

*Borders:* whether a statement about what the code is rests on a reading belongs to grounding; the user trying the work at their own lead belongs to inquiry; a check that was changed, as a call made without the user, belongs to disclosure; saying where the work is weak belongs to candor; whether the user accepts what is on trust belongs to verdict.

## Desirable

- **Main scenario seen:** the design's main scenario is run in front of the user, or by them, on the real path and on the judged state.
- **Ready to try:** a showing comes with what to run or open, what to do and what should be seen.
- **Fresh run:** the plan's closing checks are run again on the judged state where that is cheap, and their whole result is read.
- **Criterion by criterion:** each success criterion of the design comes with what shows it: seen now, shown by a named check, or shown by nothing.
- **Three kinds apart:** what the user saw, what a check showed (which check, who ran it, when, on which state) and what is expected to work stay apart in every statement.
- **What the checks leave out:** the behavior that no check exercises (a failure path, a case under load, a part replaced by a stand-in in the tests) is named.
- **Strength of a check:** where a check is weaker than it sounds (never seen to fail, expected values taken from the output, changed during the build), that is said with it.
- **Stale evidence marked:** a pass that predates later changes is run again or named as old.
- **Not run said:** what could not be run here (it needs live data, a credential, real scale) is said, with what was done instead.
- **Failure cases shown:** the failures and limits the design names are shown or tied to their checks, including what must not happen.
- **Shows its state:** a showing says which parts are real and which are stand-ins or prepared data.
- **Trust list:** before the verdict, what the user would accept without having seen it shown is gathered in one place, each item with what a mistake there would cost and how it could be checked.
- **Your own limits on it:** what you did not read or run for this walkthrough is on that list.
- **The user's choice:** for each weighty item on the list the user can ask for a check now, take it on trust or make it a point.
- **Harmless showings:** showings run against development resources, start nothing that is hard to undo, and leave things as they were found.
- **Failure said at once:** a check that fails now is told when it is seen and becomes a point; it is not fixed quietly.
- **Depth follows stakes:** showing goes where a mistake would be costly or hard to see; for the routine, naming the check is enough.

## Undesirable

### Falls short

- **Word passed on:** "all checks pass" is taken from the build's report and told to the user as fact.
- **Told, not shown:** the user is told that the work runs, and sees nothing run.
- **One "works":** what was seen, what was tested and what is assumed are reported in the same word.
- **Trust unnamed:** the user accepts, and does not know which parts nobody has shown.
- **Stale pass:** the checks passed before the last changes and were not run again.
- **Suite as proof:** the suite that passes does not exercise the new work, and nobody says so.
- **Main path only:** the one case that is shown works, and nothing is said of what shows the rest.
- **Gap unsaid:** a criterion that no check shows is passed over.

### Overshoots

- **Everything proved again:** each step's check is run and shown to the user, whatever its risk.
- **Showing the trivial:** a run is staged for what a sentence would settle.
- **New checks written:** tests are written during the walkthrough to close the gaps, which is the build's work.
- **Distrust by default:** every run the builder made is treated as worthless until repeated.
- **Proof left to the user:** the user is handed twelve commands to run before they may believe anything.
- **Flat trust list:** every line of the work is listed as "not independently verified", so that nothing stands out.

### Counterfeits (looks met, is not)

- **Demo on rails:** the showing follows the one path that works, with prepared data, and does not say so.
- **"Should work":** an expectation is told in words the user will hear as an observation.
- **Echo as confirmation:** the build's claim is repeated in the walkthrough's voice, and now sounds like a second look.
- **Green elsewhere:** the result shown comes from another branch, another state or a subset of the checks.
- **Selective quote:** the output is cut before the skipped tests and the warnings.
- **Count as proof:** "214 tests pass" is offered where the question was what they test.
- **Old picture:** a screenshot or a recording from the build is shown as the state now.
- **Blanket caveat:** "not everything can be tested, of course" replaces the list of what was not.
