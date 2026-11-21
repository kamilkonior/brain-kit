# Gate: Framing

The gate task is settled before the examining, from the records wherever they answer: you can say which work is examined and in what state, what it is measured against (what the design and the plan decided, and what the build says about the work), how closely it is to be looked at, and what the gate may run.

*Falls short:* a look at whatever the build left, measured against nothing. *Overshoots:* the user called in to settle what the records already say.

*Borders:* whether what the build says holds belongs to verification; whether the whole of the work was then covered belongs to completeness; who answers what belongs to agency; from where the gate looks belongs to independence; keeping the gate's runs harmless, once it is known what they may touch, belongs to containment.

## Desirable

- **Work in hand:** the work examined is something that can be pointed to: the branch and the commits it consists of, from the starting state the plan names to the state the build calls done.
- **Fixed state:** the examined state is named (a commit), uncommitted work found beside it is named as that, and when the work changes during the gate, the new state is named and what was found on the old one is checked again.
- **Claim established:** what the build says is done (the whole plan or a stage) and to which end state is established first; work that makes no such claim is not gated as if it did, and that is said.
- **Records read first:** the design, the plan with its statuses and record, the build's closing report and the history are read in full before anything is examined or asked.
- **Stated measure:** what the work is measured against is taken from the records and listed: the design's decisions, success criteria and limits, the plan's steps, checks, end state and rules, and the project's own standards.
- **Claims gathered:** what the build says about the work (the statuses, the record's entries, the closing report, the evidence it kept, the instructions for running it) is gathered as the list of what is to be tested.
- **Standards located:** the project's conventions, its instructions for contributors and the tools it checks itself with are found, since the builder's choices are measured against them.
- **Measure without records:** where the work has no written design or plan, what it was meant to do is put in a few lines from what there is (the request, the issue, the conversation), and the gate's record says that the comparison is thinner for it.
- **Depth from the stakes:** how closely the gate looks is set from what a slip would cost once the work is accepted and whether it could be taken back, from the size of the work and from what the record shows of how the build went, and it may differ from part to part.
- **Settled matters known:** what the user decided, saw and tried during the build is taken from the record, so that the gate does not find again what they have settled.
- **Rules of the gate:** what the gate may run and where (the environment, the data, what costs money or reaches outside) and where its record goes are taken from the plan's rules or the project's habit.
- **Asked only what nothing answers:** the user is asked only what neither the records, the code nor a run can answer and a wrong guess would make costly, in one question.
- **Earlier gate known:** at a second look the earlier gate's record is read first, and what this look covers is stated.
- **Working frame:** the frame is used during the gate to decide what counts as a finding and how much of a look a part gets.
- **Enough to start:** framing matches the size and risk of the work; a small change with a clear plan is framed in a line.
- **Revisited frame:** when the gate shows that the state, the measure or the depth was off, it is changed and the record says so.

## Undesirable

### Falls short

- **Unknown subject:** the gate examines whatever is in the working tree, with committed and uncommitted work, or this build and another, mixed.
- **No measure:** the design and the plan are not opened, and the work is judged by general ideas of good code.
- **Report as frame:** what the work is and what it should do is taken from the build's closing report.
- **Claims not gathered:** nothing lists what the build said, so that only what happens to be noticed is tested.
- **Unfinished gated:** work with steps still open is examined at length as if it claimed to be done.
- **Assumed depth:** every part gets the same look, or the depth is whatever the session allowed.
- **Unknown rules:** the gate runs migrations, calls outside services or writes its record wherever it likes, because nobody established what it may do.
- **Moving subject:** the build goes on changing the work under the gate, and nothing says which state the findings belong to.
- **Settled found again:** a departure the user decided during the build is reported as a finding, because the record was not read.

### Overshoots

- **User called in:** the user is asked which commit, which plan or how closely, though the records say.
- **Kick-off ceremony:** a change of three files gets a written frame with measures, depths and rules.
- **Design on trial:** the frame sets out to judge whether the design and the plan were right, not whether the work is what they decided.
- **Gate widened:** code the build did not touch, or an earlier build, is drawn into the examination.
- **Readiness perfectionism:** the gate is refused over a gap in the records that could have been named and worked around.

### Counterfeits (looks met, is not)

- **Hollow measure:** "the requirements" or "best practice" stands in for decisions and criteria that can be checked.
- **Plan summary as frame:** the plan is restated, and the state, the claims and the rules were never established.
- **Claimed reading:** "the design and the plan were read" is said, and a later finding shows that a decision was never seen.
- **Moved measure:** what the work is measured against is adjusted to what was built.
- **Depth in words:** "a thorough gate" is announced, and nothing says where the close look goes.
- **Shelved frame:** the measure and the depth are set, and never used to leave something out or to look harder.
