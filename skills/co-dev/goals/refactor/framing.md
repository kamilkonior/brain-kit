# Refactor: Framing

The refactoring is settled before the code is touched: both of you can say which code is to change shape and what for, what it does that must stay the same and for whom, how far the change goes and at what point it stops.

*Falls short:* "clean this up", carried out as handed over. *Overshoots:* questioning the user about what a reading of the code would show.

*Borders:* the shape to aim at belongs to target; facts about the code and who uses it belong to grounding; making checks for the behavior that must stay belongs to baseline, and keeping it to preservation; who decides how far the change goes belongs to agency, and keeping within that to containment; whether the change went the whole way within the extent belongs to completeness.

## Desirable

- **Purpose:** what the refactoring is for is stated as something that will be easier afterward (the step that waits, a kind of change that keeps coming, a part that keeps being misread), in a sentence the user confirms.
- **Work that waits:** the work the refactoring was called from (a step of the plan, a finding of a review, a question of the design, none) and what there depends on the new shape are stated.
- **Code named:** the code that is to change shape is named by its files, modules or functions, not by "the payment stuff".
- **Behavior that stays:** what counts here as "what the code does" is agreed: results, effects on the outside and errors, and which of the doubtful things (the wording of messages and logs, the order of effects, timing, speed and memory) someone relies on.
- **Who relies on it:** those who use the code and would notice a difference (callers in the project, other teams, stored data, scripts) are named, or said to be not yet known.
- **Fixed surface:** which interfaces must keep their form (what is published, stored or called from outside) and which may change together with their callers is agreed.
- **Extent:** how far the change may reach beyond the code named (its callers, its tests, the modules beside it) is agreed.
- **Stopping point:** what counts as done (the purpose reached, shown how) and how much the refactoring may cost before it comes back to the user are agreed.
- **Behavior change set apart:** where the request mixes structure with a change in behavior ("tidy it up and make it accept empty input"), the two are separated, and the change in behavior is given to the work it belongs to.
- **Not a refactoring said:** where what is asked is something else (a rewrite, one library replaced by another, a speed-up, a new architecture that has to be designed), that is said before anything is touched, with where it belongs.
- **State at the start:** the state of the code at the start (branch, uncommitted changes, checks passing or failing) is established, and a check that already fails is raised before anything rests on it.
- **Rules of the work:** where the change is made (branch, worktree), what may be run, and how and by whom changes are committed are taken from the work the user came from, and agreed where that work is silent.
- **Moment:** whether this is the time for it (a release near, others at work on the same code, the waiting step half done) is raised where it matters.
- **Working frame:** the frame is used during the refactoring to judge whether a further move belongs to it.
- **Enough to start:** framing matches the size and risk of the change and stops when there is enough to begin; pulling one function out of another starts after a line.
- **Revisited frame:** when the code shows that the purpose needs another extent, or that something else counts as behavior, the frame is changed in the open.

## Undesirable

### Falls short

- **Request as worded:** the work starts from "clean this up" or "this is ugly", with nothing made exact.
- **No purpose:** nobody asked what should be easier afterward, and the new shape serves nothing in particular.
- **Behavior undefined:** nobody said whether the log lines, the order of the calls or the speed count, and it comes out when one of them has changed.
- **Users unasked:** who uses the code from outside the project is never raised.
- **Mixed request:** a change in behavior asked for in the same breath is carried out inside the refactoring.
- **No stopping point:** nothing says where it ends, so one cleanup leads to the next until the session is over.
- **Assumed extent:** the whole module is reshaped when the user meant one function, or the reverse, and nobody asked.
- **Late limits:** a freeze, a published interface or a colleague's open branch surfaces after the code has moved.
- **Frame drift:** the extent grows move by move, and nobody says so.

### Overshoots

- **Interview:** the user is asked what calls the code, where a search would show it.
- **Kick-off ceremony:** a rename gets a talk about extent, behavior and rules.
- **Specification first:** the full behavior of the code is written out before anything is read or run.
- **Purpose on trial:** a small tidying the user plainly wants is held up until they have justified it.
- **Endless reframing:** the extent or the stopping point is renegotiated at every step.

### Counterfeits (looks met, is not)

- **Restated request:** the user's words are repeated as the frame, with nothing made exact.
- **Hollow purpose:** "more maintainable" or "cleaner" stands in for something that will be easier to do.
- **Shape as purpose:** "split it into three classes" is taken as the purpose, and what the split is to make easier was never said.
- **Hollow stopping point:** "until it is clean" stands in for a point that can be checked.
- **Assumed rules:** "I'll commit as I go" is announced as if it had been agreed, and was never asked.
- **Moved finish line:** the purpose is adjusted afterward to what the refactoring happened to reach.
- **Shelved frame:** the frame is agreed and never used to leave a move out.
