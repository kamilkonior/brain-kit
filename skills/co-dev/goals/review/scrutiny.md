# Review: Scrutiny

The work is questioned, not read along with: the reading asks of each part what it has to do and how it could fail, takes the place of those who will rely on it, tries the work on concrete cases and runs it where it can be run, and looks for what is missing as well as at what is there.

*Falls short:* a reading that follows the work and agrees with it. *Overshoots:* a hunt in which the number of findings is the aim.

*Borders:* whether a suspected fault is real belongs to proof; how much it matters belongs to weight; whether every part was read belongs to completeness; what the review looks for at all belongs to framing; the facts the questions start from belong to grounding; running the work without harm belongs to containment.

## Desirable

- **Whole before parts:** the work is first read through for what it is trying to do and how it goes about it, before any part is examined.
- **Approach before detail:** whether the approach can deliver what the work is for is asked before the details are; where it cannot, that is the finding, and the details wait.
- **Standard held both ways:** the work is held against the standard in both directions: what was asked for and is absent, and what is there and was not asked for.
- **One thing at a time:** the work is read once for each thing the frame says to look for, with that alone in mind, not for all of them in one reading.
- **Places taken:** the work is read from the place of each one who will rely on it (the planner for a design; the builder for a plan; the caller, the maintainer, the operator and the one who means harm for code), and it is asked what each would lack.
- **Concrete case traced:** a real case is followed through the work from end to end (a request through the code, a step through the plan, a user through the design), and what happens at each point can be told.
- **Unhappy cases tried:** the work is tried on the cases its maker most easily leaves out: the empty, the absent, the repeated, the very large, the out of order, the failure halfway.
- **Assumptions drawn out:** what the work takes for granted (about its input, its surroundings, the order of things) is listed, and each is checked or named as unchecked.
- **What is missing:** the reading asks what is not there and should be: the case not handled, the step not planned, the check not written, the decision not made.
- **Run, not only read:** where the work can be run, it is: its checks are run and read, and its behavior is looked at on the real path.
- **Checks questioned:** of the work's own checks it is asked whether they could fail: what they assert, what they leave out, what they replace with a stand-in.
- **Around the work:** what uses the work and what the work uses are read for what the work breaks there: the callers, the stored data, the later steps of the plan, the other parts of the design.
- **Closest where it costs:** the hardest look goes where a fault would be costly or hard to see (data, money, access, what cannot be undone, parts made late or in a hurry), and routine parts get a lighter one.
- **Odd things followed:** something that surprises (a special case, a value from nowhere, a part that seems to serve nothing) is looked into until it is understood or put as a question.
- **Failure handed on:** a failure that a run turns up, and whose cause is not plain, is reported as a finding with the way to make it happen, and its cause is not hunted here.
- **Stops when dry:** the search in a part ends when further questions bring nothing new; a part that keeps yielding gets more.

## Undesirable

### Falls short

- **Reading along:** the work is followed in its own order, each part seems reasonable, and nothing was asked of it.
- **Surface only:** the findings are about names, formatting and wording, and whether the thing works was never examined.
- **Main path only:** the case the work shows is traced, and the cases it does not mention are not thought of.
- **Present only:** what is there is checked, and nobody asked what is missing.
- **Read, never run:** the code is judged by reading, though the suite and the program were there to be run.
- **Checks trusted:** the checks are green, and nobody looked at what they check.
- **One place taken:** the work is read as its maker would use it, and never as the one who must maintain, operate or misuse it.
- **Even attention:** the migration and the renamed variable get the same look.
- **Change in isolation:** the changed lines are examined, and what calls them is not.

### Overshoots

- **Finding count:** the reading goes on until the list is long, and its length is offered as thoroughness.
- **Invented failures:** cases are constructed that cannot occur here, in order to have something to report.
- **Everything suspect:** each line is examined as if it guarded money, and the reading never ends.
- **Checklist march:** every question of a long list is put to a change of ten lines.
- **Premise reopened:** asked to read a change, the review spends itself on whether the feature should exist, which the frame did not ask.
- **Cause hunted:** a failure found on the way is chased to its root, and the review waits.
- **Rig for a reading:** a harness is built to exercise what a careful reading would have shown.

### Counterfeits (looks met, is not)

- **Checklist ticked:** "security: ok, performance: ok, tests: ok" is reported, and nothing was done to find out.
- **Questions for show:** "have you considered concurrency?" is asked, and you did not consider it either.
- **Pattern matching:** findings are raised by what the code looks like (a loop, a cast, a catch), not by what it does here.
- **Case in the head:** a case is said to have been traced, and no step of it can be told.
- **Run of the wrong thing:** the suite that was run does not exercise the work under review.
- **Rigor by tone:** the report is stern, and the search was a skim.
