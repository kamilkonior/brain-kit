# Debug: Return

The finding goes back to the work it interrupted: the diagnosis is written where that work keeps its record, it says what the cause means there, the reproduction is handed over as the check for the repair, and the work is taken up where it stopped.

*Falls short:* a finding that stays in the conversation. *Overshoots:* a postmortem nobody asked for, or the repair made on the way out.

*Borders:* who decides what is done about the cause belongs to agency; at what level the fault sits belongs to depth; whether the user has the same picture of the cause belongs to shared understanding; removing the probes belongs to containment; making the reproduction belongs to reproduction; the repair itself belongs to the work returned to.

## Desirable

- **Diagnosis written:** the finding is written in a few lines: the failure, the cause, how it was shown, how sure it is and what stays unexplained.
- **Where the work keeps it:** it is written where the interrupted work keeps its record (the plan's record, the design's open items, the issue), and where there is no such work, where the user says.
- **What it means there:** it says what the cause means for that work: a repair within the step, a change to the plan, a decision of the design to reopen, a report to someone outside, or nothing to do.
- **Options with the cause:** the ways of dealing with the cause are given with what each costs and risks, and a recommendation.
- **Reproduction handed over:** the recipe or the test that shows the failure is handed over in a form that can serve as the check for the repair, with the result it gives now.
- **Workspace stated:** the user is told what the search left: nothing, or a trial change and where it is, and the saved evidence and where it is.
- **Back at the same place:** the interrupted work is taken up where it stopped (the step, the question), and the user is told that this is where they are.
- **Repair on the user's word:** where the user wants the repair made at once, it is made after the diagnosis has been stated, as a change of its own, under the rules of the work it belongs to.
- **Unfinished search returned too:** a search that ends without a cause hands back what was ruled out, what is left, what would be the next probe and any trap that was set.
- **Ruled out recorded:** the main causes that were excluded are recorded in a line each, with what excluded them, so that they are not chased again.
- **Report for others:** where the fault lies with someone else, what they need is drafted for the user: the small reproduction, the versions, expected and observed.
- **Prevention offered:** what would have caught this sooner (a check, an assertion, a line of logging) is offered as an option, not built.
- **Standalone wording:** the written diagnosis has no "as we saw" and no label coined in the search left undefined.
- **Closing word:** at the end the user is told the cause, how sure it is, what is theirs to decide and where it is written.
- **Proportion:** the diagnosis of a misspelled name is a sentence.

## Undesirable

### Falls short

- **Finding in the chat:** the cause was said in the conversation and is written nowhere else.
- **Cause without consequence:** the cause is named, and nothing says what it means for the step, the plan or the design.
- **Reproduction not handed over:** the repair is made later, and nothing can show that it removed the failure.
- **Left dangling:** the search ends, and the user has to work out where the interrupted work stood.
- **Empty-handed stop:** a search that was given up returns "could not find it", with nothing on what was excluded.
- **Workspace unknown:** the user does not know whether the tree holds a trial change.
- **Lost exclusions:** what was ruled out is not recorded, and the next search starts with it.

### Overshoots

- **Repair on the way out:** the cause is repaired, and the code around it tidied, before anybody decided.
- **Postmortem:** a failing unit test gets a report with a timeline, contributing factors and action items.
- **Unasked documents:** a notes file about the search is created in the repository.
- **Search diary:** every probe and every dead end is written into the plan's record.
- **Prevention program:** tests, assertions and logging are added "so that this cannot happen again".
- **Staying on:** the debug session carries on into building the rest of the step.

### Counterfeits (looks met, is not)

- **Story as diagnosis:** the course of the search is told in place of the cause.
- **"Fixed" as report:** the failure is reported gone, and why it failed is written nowhere.
- **Check that cannot fail:** the test handed over passes with the fault and without it.
- **Level softened:** a fault of the design is handed back as a small repair in the code, because that is easier to say.
- **Looks standalone:** the sentences are complete, and "the second theory" resolves only with the session.
- **Filed and lost:** the diagnosis is written down, and the user does not know where.
