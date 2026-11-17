# Plan: Grounding

The plan starts from what is actually there: the code, tools and conditions it relies on were looked at, and what was seen, inferred and assumed stay apart.

*Falls short:* a plan for a codebase that was imagined. *Overshoots:* exploring past what the plan needs.

*Borders:* whether the plan follows the design belongs to fidelity; what the plan does about what could not be found out belongs to resilience; which checks the plan chooses belongs to verification; what the user is told of the findings belongs to shared understanding.

## Desirable

- **First-hand look:** the code a step touches, and what uses that code, is read before the step is written.
- **Starting point:** the plan says where the build starts from: what exists, in what state (branch, version, failing checks), and what the design assumes that is not there.
- **Real names:** files, functions, commands and settings in the plan are the ones that were found, spelled as found.
- **Existing means used:** what the project already has (helpers, patterns, test set-up, build and release scripts) is found and used by the plan, not built again.
- **Conventions followed:** steps follow how this project does things (structure, naming, testing, commits, its own instructions for contributors), as read from the project.
- **Design checked against the code:** what the design assumes about the existing system is compared with the code, and a difference is raised.
- **Tools tried:** that the project builds, its checks run and the commands in the plan work is tried now where that is cheap, not assumed.
- **Seen vs. assumed:** the plan marks what was read or run, what was inferred and what is assumed, wherever a step depends on the difference.
- **Reach of a change:** what else depends on the code a step changes (callers, data, other services, work in progress) is looked up, and the step says what it affects.
- **The user's knowledge counts:** what the code cannot show (how releases happen, who reviews, what is in flight, what broke before) is asked of the user and taken as evidence; when the code says otherwise, the difference is raised.
- **Outside facts checked:** what the plan relies on from outside (a library's interface, a service's limits) is checked against its documentation or by trying it, in the version in use.
- **Currency:** what was read earlier, or held when the design was written, is confirmed still to hold before the plan leans on it.
- **Size from evidence:** what the plan says about the size of a step rests on what was seen (the number of call sites, the files involved), and says so.
- **Stopping point:** exploring stops when more reading would not change a step, and what was not looked at is said.
- **Open correction:** when a finding contradicts a step already written, the plan is corrected in plain view and what rested on the error is re-examined.

## Undesirable

### Falls short

- **Imagined codebase:** steps assume a structure, a framework or a helper that nobody looked for.
- **Typical project:** the plan is what one would write for any project of this kind.
- **Recall over reading:** the code is described from memory, from the design's account of it or from file names.
- **Reinvention:** a step builds what the project already has.
- **Against the grain:** steps break the project's conventions or ignore its own instructions.
- **Unseen dependents:** a step changes something and nobody looked at what uses it.
- **Untried command:** a build, test or migration command is written into the plan and was never run, though running it was cheap.
- **Hardened assumption:** something marked as assumed in an early step is relied on as fact in later ones.
- **Unchecked deference:** the user's or the design's description of the code is taken though the code at hand says otherwise.

### Overshoots

- **Reading everything:** the whole codebase is surveyed before a first outline, though the design touches a corner of it.
- **Evidence paralysis:** investigation continues where a marked assumption and an early step would do.
- **Building to find out:** a look at the code turns into building the step, before there is a plan or the user's word.
- **Findings dump:** the plan or the conversation carries everything that was found, not what bears on a step.
- **Doubting the user:** what they say about their own system is rechecked line by line.
- **Anchored to what exists:** a step the design calls for is watered down because the current code does not make it easy.

### Counterfeits (looks met, is not)

- **False precision:** exact file names, line numbers or signatures are given that were not looked up.
- **"I checked":** a look or a run is claimed that was not made.
- **Skimmed as read:** a file listing or a search hit is treated as knowing the code.
- **Invented estimate:** hours or sizes are given with nothing behind them.
- **Stale reading:** the plan cites the code as it was before it changed.
- **Blanket disclaimer:** "file names may differ" replaces saying which ones were not checked.
