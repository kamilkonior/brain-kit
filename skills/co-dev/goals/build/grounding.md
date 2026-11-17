# Build: Grounding

The code is written against what is actually there: what a step changes, uses and affects was read or run first, and what was seen, inferred and assumed stay apart.

*Falls short:* code written for a codebase that was imagined. *Overshoots:* exploring past what the step needs.

*Borders:* whether the code follows the plan belongs to fidelity; showing that the finished step works belongs to verification; what is done when the code is not as the plan said belongs to adaptation; the quality of the new code itself belongs to craft.

## Desirable

- **Read before changed:** the code a step changes, and what uses that code, is read before it is edited, now and not from the plan's account of it.
- **Plan's account checked:** what the plan says about the code (files, names, commands, behavior) is confirmed still to hold when the step that relies on it is reached.
- **Baseline taken:** before the first change the project is built and its checks are run, so that what was already failing is known and recorded.
- **Real interfaces:** a call to a library, a service or another part of the project is written against its source or documentation in the version in use, or tried, not recalled.
- **Existing means used:** what the project already has (helpers, types, patterns, test set-up, scripts) is found and used, not built again.
- **Conventions followed:** new code follows how this project does things (structure, naming, error handling, tests, commits, its own instructions for contributors), as read from the project.
- **Tools as the project runs them:** building, testing and formatting use the project's own commands and settings.
- **Reach looked up:** before something others depend on is changed (a signature, a format, a setting), its users are found, and each of them is dealt with.
- **Whole of the pattern:** when one place is changed, the other places that hold the same thing are searched for, not assumed away.
- **Environment known:** the branch, versions, configuration and running services the work happens on are looked at where a step depends on them.
- **Seen vs. assumed:** what was read or run, what was inferred and what is assumed are told apart wherever the next move depends on the difference.
- **The user's knowledge counts:** what the code cannot show (why something is as it is, what is in flight, what broke before) is asked of the user and taken as evidence; when the code says otherwise, the difference is raised.
- **Stopping point:** reading stops when more of it would not change the code about to be written.
- **Open correction:** when a finding contradicts something already built or said, it is corrected in plain view and what rested on it is re-examined.

## Undesirable

### Falls short

- **Imagined interface:** a function, option or endpoint is called that does not exist in the version in use.
- **Blind edit:** a file is changed without having been read beyond the lines being replaced.
- **Plan as source:** the plan's description of the code is built on, though the code at hand says otherwise.
- **Recall over reading:** code is used from memory of an earlier reading, after it has changed.
- **Reinvention:** a helper is written that the project already has.
- **Against the grain:** new code breaks the project's conventions or ignores its own instructions.
- **Unseen dependents:** a signature or a format is changed and its other users were not looked for.
- **No baseline:** a failing check cannot be told from one that failed before the build began.
- **Hardened assumption:** something assumed at an early step is relied on as fact in later ones.

### Overshoots

- **Reading everything:** the codebase is surveyed again from the start, though the plan was grounded and the step touches a corner.
- **Evidence paralysis:** reading continues where writing the code and running its check would answer the question sooner.
- **Plan redone:** every statement of the plan is checked again before the first step, whatever its age or weight.
- **Doubting the user:** what they say about their own system is rechecked line by line.
- **Findings dump:** everything that was read is reported, not what bears on the step.
- **Anchored to what exists:** a poor pattern is copied because it is there, or a step is watered down because the current code does not make it easy.

### Counterfeits (looks met, is not)

- **False precision:** exact names, line numbers or signatures are given that were not looked up.
- **"I checked":** a reading or a run is claimed that was not made.
- **Skimmed as read:** a file listing or a search hit is treated as knowing the code.
- **One for all:** one call site was read, and the rest are taken to be the same.
- **Stale reading:** the code is cited as it was before this build changed it.
- **Blanket disclaimer:** "this may need adjusting" replaces saying which parts were not checked.
