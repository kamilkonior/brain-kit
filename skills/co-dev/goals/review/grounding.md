# Review: Grounding

The review rests on what is actually there: the work was read in full and in the state under review, what it touches and what it is held against were read and not recalled, and what was seen, inferred and assumed stay apart.

*Falls short:* a review of work that was skimmed or imagined. *Overshoots:* reading past what the review needs.

*Borders:* which work and which state are under review belongs to framing; whether the agreed extent was covered belongs to completeness; taking the maker's account as a claim belongs to independence; whether a finding was shown belongs to proof; what the user is told of the findings belongs to shared understanding.

## Desirable

- **Read in full:** each part that is read is read to its end, not sampled: the whole function where the change sits, the whole section, the whole step.
- **State read is state reviewed:** it is confirmed that what was read is the state under review: the commit, the branch, the saved version, the generated files as they will ship.
- **Change in its place:** a change is read together with what surrounds it (the function, its callers, what it replaced), not as lines with a margin.
- **Behavior looked up:** how a function, a library, a tool or a service the work relies on behaves is read in its source or documentation, in the version in use, or tried.
- **Standard read now:** the design, the plan, the request and the project's rules are opened at the places the work answers to, in their current version.
- **Conventions from the project:** what is usual here (naming, structure, error handling, tests) is taken from the surrounding code and the project's own notes, not from habit.
- **History consulted:** where it matters why something is as it is, the history and the record are looked at before it is called a mistake.
- **Runs read whole:** the output of a run is read to the end (the exit status, the counts, the skips, the warnings), and the run was made on the state under review.
- **Seen vs. inferred:** in the reasoning and in every finding, what was read or run, what was inferred from it and what is assumed are told apart.
- **Checkable reference:** each finding points to its place (file and line, section, step) and quotes what stands there exactly, so that it can be looked up.
- **The user's account as evidence:** what the user says about the system and about how the work came to be is taken as evidence with its source, and when the work says otherwise, the difference is raised.
- **Absence checked:** "there is no test for this" or "nothing handles the error" is said only after the places where it would be were looked at.
- **Currency:** when the work changes during the review, what was found before is confirmed still to hold.
- **Stopping point:** reading outward from the work stops when more of it would not change a finding or the answer.
- **Open correction:** when a later look contradicts something said earlier in the review, it is corrected in plain view, and the findings that rested on it are re-examined.

## Undesirable

### Falls short

- **Skimmed:** the review rests on file names, headings and the first screen of each file.
- **Diff without the code:** the changed lines are judged, and the function they sit in was not read.
- **Summary reviewed:** the description of the change is reviewed, and the change is not.
- **Stale state:** the findings are about a version that is no longer the one under review.
- **Imagined behavior:** what a called function does is taken from its name.
- **Remembered standard:** the work is held against what the design is remembered to say.
- **Habit as convention:** the work is faulted for departing from a practice this project does not follow.
- **Hardened assumption:** something assumed in the first reading is relied on as fact in the findings.

### Overshoots

- **Reading everything:** the codebase is studied from the top before the change is opened.
- **History dig:** the full past of each file is researched, though no finding depends on it.
- **Settled facts rechecked:** what was established is looked up again for every finding.
- **Doubting the user:** what the user says about their own system is rechecked line by line.
- **Findings dump:** everything that was read is reported, not what bears on the question.

### Counterfeits (looks met, is not)

- **False precision:** line numbers, names or values are given that were not looked up.
- **"I read it":** a reading or a run is claimed that was not made.
- **Inference dressed as observation:** "this is never called" is said where a search of one folder found no caller.
- **Quoted selectively:** the lines that support the finding are quoted, and the guard two lines above is left out.
- **Search hit as reading:** a match for a word is treated as knowing the code.
- **Stale reading:** something read before the last change is cited as the present state.
- **Blanket disclaimer:** "I may have missed something" replaces saying what was not read.
