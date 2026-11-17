# Increment

The work advances one step at a time: each step is built, checked and recorded before the next begins, and the code works in between.

*Falls short:* many steps under way and none of them done. *Overshoots:* more ceremony per change than the change is worth.

*Borders:* what the check is and whether it passed belongs to verification; what is done when a step does not go as planned belongs to adaptation; when the user looks in belongs to iteration.

## Desirable

- **Ready before started:** what the plan lists as needed before the first step (access, an environment, a branch) is in place, and each step is started when what it needs is there.
- **Plan's order:** steps are taken in the plan's order; steps marked independent may be taken in another, and you say when you do.
- **One step in hand:** one step is in progress at a time, and it is finished or put back on purpose before the next is started.
- **Small moves:** within a step the change is made in small pieces, each run or checked soon after it is written, so that a failure points at the last few lines.
- **Thin first:** within a step, the simplest version that meets the outcome runs before it is filled in.
- **Working in between:** after each step the code builds and what passed before still passes.
- **Closed in one go:** a step is closed by its check, its commit and its state and notes in the plan, all before the next step starts.
- **One step, one commit:** each step is a commit, or a short run of commits, of its own, which names the step and could be reverted alone.
- **One kind of change:** restructuring that changes no behavior is committed apart from the change in behavior it prepares.
- **Faults fixed where made:** a failure caused by this step is fixed in this step, before anything is built on it.
- **Work around a block:** when a step waits (on an answer, on someone else), work moves to a step that does not depend on it, as the plan provides, and the block is noted.
- **Side by side with care:** steps the plan marks independent are built in parallel only where they touch separate ground, and each result is checked and joined one at a time.
- **Rhythm follows risk:** moves are smaller and checks closer together where the work is uncertain or hard to undo, and larger where it is routine.
- **Visible place:** at any moment it can be said which step is in hand, what is done and what is next.

## Undesirable

### Falls short

- **Big bang:** several steps are written in one stretch and checked together at the end.
- **Many open:** steps are started and left half done, and none can be checked.
- **Long dark stretch:** hundreds of lines are written before anything is run.
- **Broken in between:** a step is closed with the build or the checks failing, for a later step to repair.
- **Building on red:** the next step starts on top of a failure of the last.
- **Lumped commit:** several steps, or a step and unrelated edits, share one commit, and none can be reverted alone.
- **Jumping ahead:** a later step's work is done early because the file was open, or a step is started on a guess at what an earlier one will produce.
- **Easy first:** comfortable steps are taken ahead while the hard one the plan put first waits.
- **Bookkeeping in arrears:** states, notes and commits are caught up at the end, from memory.

### Overshoots

- **Ceremony per edit:** every small change gets its own full check run, commit and report.
- **Crumb commits:** commits the size of a line, none of which means anything alone.
- **Rigid sequence:** independent steps wait in line, or one blocked step holds up everything.
- **Halting gait:** the work pauses after each step for a word from the user that nobody asked for.
- **Forced halves:** work that is one change by nature is split to keep the moves small, and extra code is written only to make the halves work.

### Counterfeits (looks met, is not)

- **Cut up afterward:** the work was done in one lump and divided into step-shaped commits afterward, none of which was ever checked alone.
- **Working by switching off:** the code works after the step only because the new part is stubbed or never reached, and nothing says when that ends.
- **Marked done early:** the step's state says done, and its check has not run or its commit is not made.
- **One at a time in name:** steps are reported one by one, and the code for all of them was written together.
- **Parallel in name:** work handed out side by side changes the same files, and joining it is a step nobody planned.
