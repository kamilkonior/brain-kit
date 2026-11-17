# Resilience

The plan holds when the build meets something unforeseen: what it assumes and where it is unsure are marked, the steps hard to undo are known, and it says when the builder adapts and when the work stops and comes back.

*Falls short:* a plan that works only if nothing surprises. *Overshoots:* a fallback for everything, or a plan so open that it commits to nothing.

*Borders:* placing risky steps early belongs to sequencing; finding out now what can be found out now belongs to grounding; who the work comes back to, and what they decide, belongs to agency; a check that shows a failure belongs to verification.

## Desirable

- **Assumptions listed:** what the plan takes for granted (about the code, the design, outside systems) is listed, each with the step that will confirm or refute it and what changes if it fails.
- **Design's marks carried:** each assumption and provisional decision the design marks is either confirmed by an early step or built so that changing it stays cheap.
- **Named risks:** the few things most likely to go wrong in this plan are named, each with the sign that it is happening and what is done then.
- **Firm and provisional:** the plan marks which steps are firm and which depend on earlier results, and says when the provisional ones are fixed.
- **Decision points:** where the route forks on a result, the fork is in the plan, with the result that picks each branch.
- **Stop conditions:** the plan names the findings that stop the work: a failed assumption, a step that outgrows its bounds, a check that cannot be made to pass, a conflict with the design.
- **Way back:** for each step that is hard to undo, the plan says what is saved first and how to return, and the point after which there is no return is marked.
- **Bounded exploration:** a step that may grow has a stated limit (time, attempts, size), and the plan says what happens when the limit is reached.
- **Usable before the end:** if the build is cut short at the end of a stage, what exists is usable as it stands.
- **Cut order:** what would be dropped or deferred first, if the work proves larger than thought, is agreed in advance.
- **Change kept local:** what is likely to change (a provisional decision, an outside interface) is kept to one step or one place, so that a change does not spread.
- **Deviation recorded:** the plan says that a departure from it is written into it, with the reason, before the build goes on.
- **Proportion:** the attention given to what might go wrong matches the stakes and how much is unknown; a short plan on known code says so in a line.

## Undesirable

### Falls short

- **Straight line:** the plan assumes that every step succeeds as written.
- **Hidden assumptions:** the plan breaks without warning when something it never stated turns out false.
- **All firm:** every step is written with the same certainty, though some rest on guesses.
- **No way back:** a migration or a deletion is planned with nothing saved and no return.
- **Pressing on:** nothing says when to stop, so the build continues past a failed assumption, patching as it goes.
- **Silent abandonment:** nothing says how the plan changes, so after the first surprise the build and the plan part ways.
- **All or nothing:** the plan pays off only if its last step is reached.
- **Unbounded step:** a step of unknown size has no limit.

### Overshoots

- **Contingency for everything:** fallbacks are planned for what is unlikely, or cheap to fix when it happens.
- **Risk register:** a long list of risks with ratings is kept for a plan that has two real ones.
- **Stop at everything:** every small surprise sends the work back to the user.
- **Commitment to nothing:** so much is marked provisional, or "to be decided during the build", that the plan no longer says what will happen.
- **Flexibility built in:** abstraction layers, flags and options are planned in case the design changes.
- **Way back for the trivial:** backups and reversal procedures are written for steps that a revert undoes.

### Counterfeits (looks met, is not)

- **Generic risks:** the risks listed would fit any plan ("requirements may change"), with no sign and no response.
- **Mitigation by adverb:** "carefully" or "with caution" stands in for what to do.
- **Boilerplate uncertainty:** "this may change" is attached to every step, with no word on what would change it.
- **Untried way back:** a return is described that would not work: the backup cannot be restored, the reverse migration does not exist.
- **Unwatched assumption:** assumptions are listed, and no step would notice if one failed.
- **Escape hatch:** "adjust as needed" lets the builder do anything and call it the plan.
