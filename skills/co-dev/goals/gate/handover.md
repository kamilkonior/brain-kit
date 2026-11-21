# Gate: Handover

What the gate found can be acted on without the gate: its record is written where the build and the walkthrough will find it, names the state it covers, gives each finding with where it is, how it was seen and what will show it put right, puts what waits for the user in their terms, and says what was examined and what was not.

*Falls short:* findings that live in the conversation, or cannot be acted on as written. *Overshoots:* an audit report that has to be read before the work.

*Borders:* to whom a finding goes, and with what weight, belongs to sorting; whether it is true belongs to grounding; adding the record without touching anything else belongs to containment; the outcome the record ends in belongs to closure; naming what was not examined is asked by completeness, and is carried here.

## Desirable

- **Written as it goes:** findings enter the record when they are found, so that an interrupted gate leaves what it had.
- **Findable place:** the record is where the build and the walkthrough will read (with the plan's record or beside it, or where the project keeps such things), and whoever started the gate is told where.
- **State and date:** the record names the examined state (the commit), the starting state, when the gate was made and from what standpoint.
- **Outcome at the top:** the record opens with the outcome and with how many findings are to put right, to decide and to know, and the lists follow.
- **Finding that can be acted on:** each finding for the build says what is wrong, where, how it was seen (the command, the input, the lines) and what will show it put right.
- **Measure cited:** each finding names what it is measured against: the decision, the step, the claim or the standard.
- **Result, not remedy:** a finding says what must be true afterward, and leaves the way there to the build.
- **For the user, in their terms:** each item that waits for the user says what they get and do not get, what the choice is and what each side of it costs, who made the call and why as far as the record shows, and where it can be seen in the work.
- **Ready for the walkthrough:** what waits for the user is ordered weightiest first and tied to the part of the work it concerns, so that it can be brought up there.
- **Behind the claims:** for the weighty claims that held, the record says in a line what the gate ran itself, what it saw able to fail and what it took from the build's evidence.
- **Examined and not:** the record says what was read, what was tried and what was not examined, with what a slip there would cost.
- **Standing kept:** whether a finding was seen, inferred or only suspected is in the record as it was found.
- **Standalone wording:** the record has no "as noted earlier", leaves no label coined during the gate undefined, and names things as the design and the code name them.
- **Stable names:** each finding has a number or a name that the build's commits and the second look can point at.
- **One current version:** after a second look the record shows each finding's standing (put right, open, moved, withdrawn) in one place, with the state on which it was checked.
- **Cold read:** before the gate ends, the record is read as the build will read it and as the walkthrough will, and what either would have to ask is put in.
- **Proportion:** the record is as large as what was found; a gate that found nothing is three lines: the state, what was examined, the outcome.

## Undesirable

### Falls short

- **Record in the chat:** the findings were said in the conversation, and are written nowhere.
- **Vague finding:** "the error handling needs work" is recorded with no place, no case and nothing that would show it put right.
- **No way to see it:** a failure is recorded without the command or the input that shows it.
- **Stateless record:** nothing says which commit the findings belong to.
- **Filed where nobody reads:** the record is in a place that neither the build nor the walkthrough opens.
- **Code words for the user:** an item for the user is written in files and functions, and they cannot tell what it changes for them.
- **Context dependence:** findings lean on the gate's session: "the second issue", "the case from before".
- **Coverage unsaid:** the record lists findings, and nothing says what the gate examined.
- **Written from memory:** the record is put together at the end, shorter and tidier than what was found.

### Overshoots

- **Audit report:** a document with a summary, a method and appendices is produced for a build of five steps.
- **Everything listed:** each file and each check that was sound gets an entry of its own.
- **Repair written out:** findings carry the code to write.
- **Evidence dump:** full outputs and whole diffs are pasted into the record.
- **Second account of the work:** the record tells what the work does and how it fits together, which is the walkthrough's to tell.
- **Unasked documents:** review files, checklists and reports are created in the repository beside the one record.
- **Form heavier than content:** each of three findings carries ten fields.

### Counterfeits (looks met, is not)

- **Looks standalone:** the sentences are complete, and the key terms resolve only with the gate's session.
- **Looks specific:** a finding names a file and a line, and not what is wrong there or what would be right.
- **Test that cannot fail:** what will show a finding put right is "the code is improved" or "the tests pass", which was true before.
- **Dangling pointers:** the record points to lines and commits that were not checked when it was written, or have moved since.
- **Summary over the list:** the top says "minor issues only", and the list below holds a dropped decision.
- **Filed and lost:** the record exists, and whoever started the gate does not know where it is, or which version is current.
