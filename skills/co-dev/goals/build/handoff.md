# Handoff

The build can be taken up at any point without you: the plan shows what is done and what was decided along the way, the history says what changed and why, and at the end code, plan and design agree.

*Falls short:* a build whose state lives in the conversation. *Overshoots:* more record than anyone will read.

*Borders:* whether the code itself can be read belongs to craft; whether the user's picture of the build is right belongs to shared understanding; what must be finished belongs to completeness.

## Desirable

- **State kept as it goes:** each step's state in the plan (not started, in progress, done, dropped) is updated when it changes, so that an interrupted session still shows where the build stands.
- **Builder's notes:** what you decided within your remit, what turned out different and why are written into the plan's notes when they happen, against the step they concern.
- **Commits that explain:** each commit says what changed and why, names its step, and follows this project's way of writing commits.
- **One current plan:** amendments are made in the plan file itself, with step numbers kept; there is no second list of steps in the conversation or in a file of your own.
- **Resumable:** someone with the plan, the design and the repository, and none of this conversation, could say what is done, what is in hand and what to do next.
- **Clean break:** a session ends, or pauses, with the work committed or its half-done state noted: what is in the working copy, what was being tried, what comes next.
- **Open items carried:** questions waiting for the user, follow-ups and things found nearby are in the plan, each with who closes it.
- **Standalone record:** notes and commit messages can be followed by someone who was not here: no "as discussed", and no label coined in the session left undefined.
- **Records agree at the end:** when the build ends, the plan shows every step's final state, and the design says what was built where that differs from what it said before.
- **Project's own records:** the documentation, the changelog and whatever else this project keeps beside its code are updated as the plan lists.
- **How to run it:** what someone needs in order to run, check and release what was built (commands, settings, what was added) is written where this project keeps such things.
- **Final report:** the build closes with a short account: what was built, the evidence, what differs from the plan, what is left and who takes it.
- **Ready for the next reader:** the work is left in the form its next reader needs (a branch, a pull request with a description, a request for review), as the finish line says.
- **Told to the user:** the user knows where the work is (branch, commits, files), what state it is in and how to go on from it.
- **Proportion:** the record matches the work: a short build leaves a few lines.

## Undesirable

### Falls short

- **State in the conversation:** what is done and what was decided can be learned only from the session.
- **Stale plan:** the plan's states lag behind the code, and it shows a build that is no longer there.
- **Empty notes:** decisions made while building, and the reasons for departures, are written nowhere.
- **Mute commits:** "update", "fix", "wip": messages that say nothing of what or why.
- **Dirty break:** a session ends with uncommitted, half-done work and no word on what it is.
- **Shadow plan:** the real list of what is left lives in a to-do list of your own, and the plan file is not kept.
- **Lost follow-ups:** things found along the way are mentioned once in the conversation and are not in the plan.
- **Unrecorded setup:** the build needed a setting, a tool or a manual step that is written nowhere.

### Overshoots

- **Build diary:** every command and thought is logged, and the decisions cannot be found among them.
- **Record bloat:** the plan fills with the history of each step, and the current state is hard to find.
- **Essay commits:** commit messages retell the session.
- **Unasked documents:** summaries, reports and change logs are written as new files that nobody asked for and the project does not keep.
- **Process weight:** keeping the record takes more than the building.
- **Imagined readers:** documentation is written for an audience that does not exist.

### Counterfeits (looks met, is not)

- **Status for show:** states are flipped to done in a batch at the end, whatever was checked.
- **Reconstructed notes:** reasons are written afterward that were not the ones in play.
- **Transcript as record:** the story of the session is saved in place of the state of the build.
- **Report from intent:** the final report describes what was meant to be built, not what is in the repository.
- **Resumable by assertion:** the build is called resumable, and nobody read the plan cold.
- **Filed and lost:** the work is pushed or saved, and the user does not know where.
