# Build: Handover

The build can be taken over without this session: the plan shows what is done and what turned out differently, the history shows what each step changed, and the user knows how to run what they have.

*Falls short:* a state of the build that lives only in the conversation. *Overshoots:* a build diary nobody will read.

*Borders:* whether a step may be called done belongs to verification; whether plan, design and code agree belongs to fidelity; whether the user has the same picture as you belongs to shared understanding; code that can be read without the session belongs to craft.

## Desirable

- **Status as it changes:** each step's status in the plan is updated when it changes: in progress when it is started, done when its check has passed.
- **Recorded as it goes:** what turned out differently and what was decided along the way enters the plan's record when it happens, with the reason and who decided.
- **History that maps:** each commit says which step it serves, what it changes and why, in words that stand without the session.
- **Resumable:** a build interrupted at any point can be picked up, by someone else, from the plan, the code and the history alone.
- **Nothing only in the session:** uncommitted work, a running process, a half-made decision or a finding that matters is written down before a pause.
- **One current version:** the plan and the design are each current in one place; when they change, superseded content is removed or marked.
- **Where the project keeps it:** how to set up, run and check what was built is written where the project keeps such things, and was tried as written.
- **Reasons that outlive the build:** why the code departs from the obvious, or from the plan as first written, is in the record or beside the code, wherever a maintainer will look.
- **Open items written:** what remains (omissions, known limits, follow-ups, assumptions not yet confirmed) is written where it will be found, each with who or what picks it up.
- **Evidence findable:** the proof the plan asked for can be found from the step it belongs to.
- **Stage note:** at the end of a stage the record says in what state the code is and what the next stage starts from.
- **Closing hand-off:** at the end the user is told where the work is (branch, commits, whether merged), how to run it, what departs from the plan, what is open and what is theirs to do next.
- **Cold read:** before the build is called done, the plan, the record and the history are read as someone who has only them, and what they would have to ask is put in.
- **Proportion:** the record is as large as the build; a build of three steps is recorded in three lines.

## Undesirable

### Falls short

- **Status in the head:** the plan's boxes stay as they were while the build moves on.
- **Record in the chat:** departures and decisions were said in the conversation and are not in the plan.
- **Mute history:** commits say "wip", "fix" or "updates".
- **Unsaved state:** the session ends with work uncommitted and nothing saying what it is.
- **Lost reasons:** the code departs from the plan and nothing says why, so that the next reader "corrects" it.
- **No way in:** the user has the code and does not know how to start it or what to look at.
- **Competing truths:** the plan, the record and the conversation disagree about what was done.

### Overshoots

- **Build diary:** every attempt, command and dead end is written into the plan.
- **Unasked documents:** summary files, reports and notes are created in the repository that nobody asked for.
- **Commit essays:** a small change carries a message longer than its diff.
- **Status ritual:** the plan is rewritten after every edit.
- **Imagined readers:** documentation is prepared for a team, an auditor or a future that does not exist.
- **Plan as code tour:** the record explains the implementation at length, where the code says it.

### Counterfeits (looks met, is not)

- **Ticked, not done:** a step's box is checked, and its check has not passed.
- **Record from memory:** statuses and departures are filled in at the end, tidier than what happened.
- **Transcript as record:** the story of the session is saved in place of what is done, what differs and what is open.
- **Looks standalone:** the sentences are complete, and "the earlier fix" or "the second approach" resolves only with the session.
- **Filed and lost:** notes exist, and the user does not know where, or which are current.
- **Untried instructions:** the steps to run the work are written down and were never followed as written.
