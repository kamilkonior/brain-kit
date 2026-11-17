# Framing

The failure is settled before the search: both of you can say what was expected and what happens instead, where it shows, what work waits on the answer and at what point the search stops.

*Falls short:* a search for a failure nobody has pinned down. *Overshoots:* questioning the user about what one run would show.

*Borders:* making the failure happen, and finding out how often it comes, belongs to reproduction; facts about the system belong to grounding; who decides how far the search goes and what it may touch belongs to agency, and keeping to that belongs to containment; whether the diagnosis covers all that was stated belongs to completeness.

## Desirable

- **Expected against observed:** the failure is stated as what should happen and what happens instead, in a sentence or two that the user confirms.
- **Exact symptom:** the message, the output or the behavior is taken in its exact form (the full text, the screenshot, the numbers), not in a paraphrase.
- **Source of the expectation:** what says that the expected behavior is right (the design, a step's check, the documentation, the user's intent) is named, and where nothing says so, that is raised before the search.
- **Where it shows:** the version, branch, environment, input and user on which the failure shows are established.
- **Last known good:** when the thing was last seen working, and what is known to have changed since, is asked for or said to be unknown.
- **Work that waits:** the work the failure interrupted (a design question, a step of the plan, a check of the build, none) and what there depends on the answer are stated.
- **The question:** what the search has to answer is agreed: the cause to repair, a choice between two courses, or whether the fault is ours at all.
- **Stopping point:** what counts as found (how deep, how sure) and how much the search may cost before it comes back to the user are agreed.
- **Rules of the search:** what may be run, changed and touched while looking is taken from the work the failure came from, and agreed where that work is silent.
- **One failure at a time:** when several things fail, they are listed and one is taken, or it is said why they are treated as one.
- **Already tried:** what the user or the interrupted work has tried, and what was seen then, is collected before the first probe.
- **Working frame:** the frame is used during the search to judge whether a lead belongs to this failure.
- **Enough to start:** framing matches the size and cost of the failure and stops when there is enough to begin; a failing test with a clear message starts after a line.
- **Revisited frame:** when the search shows that the failure is another one than was stated (another symptom, another place), the statement is changed in the open.

## Undesirable

### Falls short

- **Report as worded:** the search starts from "it doesn't work", or from the title of the report.
- **Paraphrased symptom:** the search runs on a summary of the error, and the text itself was never read.
- **Unquestioned expectation:** time goes into why the code does something that the design says it should do.
- **Wrong place:** the failure is looked for on another version, branch or environment than the one it shows on.
- **Tangled failures:** two failures are chased as one, or one is swapped for the other halfway.
- **Unknown purpose:** nobody asked what waits on the answer, and the search answers a question nobody had.
- **No stopping point:** nothing says how far to go, so the search ends when the session does.
- **History unasked:** what changed last week, and what was already tried, comes out after it has been found again the long way.
- **Frame drift:** the search slides onto another failure met on the way, and nobody says so.

### Overshoots

- **Interview:** the user is questioned about what a run or a look at the log would show.
- **Kick-off ceremony:** a failing test with a clear message gets a talk about extent, budget and rules.
- **Specification first:** the full expected behavior is worked out before anything is run.
- **Doubting the failure:** the report is treated as the user's mistake before it was looked at.
- **Endless reframing:** the statement of the failure is reworded at every finding.

### Counterfeits (looks met, is not)

- **Restated report:** the user's words are repeated as the statement of the failure, with nothing made exact.
- **Smuggled cause:** the statement already names the cause ("the cache is stale"), so the search is over before it starts.
- **Hollow stopping point:** "until it is fixed" or "until we understand it" stands in for a point that can be checked.
- **Assumed rules:** "I'll look at production" is announced as if it had been agreed, and was never asked.
- **Moved question:** the question is adjusted afterward to the one the search happened to answer.
- **Shelved frame:** the frame is agreed and never used to drop a lead.
