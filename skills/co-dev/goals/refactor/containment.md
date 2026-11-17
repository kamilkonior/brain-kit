# Refactor: Containment

The refactoring changes only what it was to change, and can be taken back: the user's work in progress and the work of others on the same code are kept, what lies outside the agreed extent is left as it was, nothing that was put in only to look or to compare stays behind, and each step can be reverted.

*Falls short:* a change that spills past its extent, or runs over work in progress. *Overshoots:* caution that keeps the shape from changing.

*Borders:* agreeing the extent and the workspace belongs to framing; who gives the word for going beyond them belongs to agency; keeping the behavior belongs to preservation; keeping each step a change that can be reverted on its own belongs to increment; removing the old structure and the bridges to it belongs to completeness; saying what state the workspace is left in belongs to return.

## Desirable

- **The user's work kept:** uncommitted changes, untracked files and branches that were there before are not overwritten, discarded, stashed away or swept into a commit.
- **Work in flight looked for:** before a wide move or rename, open branches and pending changes on the same code (the user's, the waiting step's, other people's) are looked for, and where they would collide the user decides whether and when.
- **Apart from the waiting work:** where the user came from a step half done, its changes and those of the refactoring are kept apart (in commits or on a branch of their own), as agreed.
- **Inside the extent:** files outside the agreed extent are left alone, or the reason for touching them is said first.
- **Not ours left alone:** generated code, code copied in from elsewhere, migrations that have already run and files that belong to others are not restructured; where the change needs them different, their source is changed or the user is asked.
- **Tool kept in bounds:** a formatter, a replace across files or a rewriting script is pointed at the files in the extent, and what it changed is looked at before it is kept.
- **No noise:** lines the refactoring did not need to touch are not reformatted, reordered or rewrapped.
- **Staged by name:** what goes into a commit is chosen file by file, and looked at before it is committed.
- **Way back known:** the state before the first move is a point the user can return to, and they are told which.
- **Hard-to-undo recognized:** a step that a revert does not undo (a column renamed in a database, a package published, history rewritten and pushed) is recognized as such, and not taken without the user's word.
- **Checks that harm nothing:** tests and comparisons run against test resources; where exercising the code has real effects (mail, payments, writes), stand-ins are used or the effects are known and bounded.
- **Recorded data clean:** real inputs and outputs recorded for comparison are free of keys, tokens and personal data, and stay out of the repository unless the user says otherwise.
- **Safeguards left on:** hooks, checks and lint rules are not skipped or switched off to get a move through.
- **Left as found:** what was put in only to look or to compare (print lines, recording code, scratch scripts, copies of files) is taken out, and processes that were started are stopped.
- **Proportion:** caution follows what a mistake would cost and whether a revert undoes it; a move inside one tracked file needs none.

## Undesirable

### Falls short

- **Lost work:** a reset or a checkout made to take a step back wipes changes the user had not committed.
- **Swept commit:** the user's unrelated edits go into the commit of a move.
- **Wide blast:** a replace across the project, or a formatter, rewrites files the refactoring had nothing to do with.
- **Spilled over:** the rename reaches into the module next door or into a published package, and nobody agreed to that.
- **Collision:** a file is moved that a colleague's open branch edits, and they find out when they merge.
- **Tangled with the step:** the half-done change of the waiting work and the refactoring end up in one commit.
- **Generated code edited:** generated files are restructured by hand, and the next generation undoes it.
- **Forced through:** a hook is skipped or a lint rule switched off because the move would not pass.
- **Litter:** recording scripts, recorded outputs and copies like `service_old.py` stay behind.
- **Leaked data:** real customer records are recorded and committed as test data.

### Overshoots

- **Permission for everything:** the user is asked before each harmless read, build or test run.
- **Stopped by callers:** a function is left untouched because it has callers, though all of them are in the project and in the extent.
- **Backup of the trivial:** copies of files are made though version control would restore them.
- **Isolation ceremony:** worktrees and branches are set up for a rename inside one file.
- **Rehearsal for everything:** every move is first tried on a copy.

### Counterfeits (looks met, is not)

- **"Only touched the parser":** this is said, and the diff shows other files.
- **Stash as safety:** the user's changes are in a stash that nobody mentioned.
- **Revert that does not undo:** "it can all be reverted" is said of a step that also renamed a column in the shared database.
- **Cleanup claimed:** "cleaned up" is said, and the scratch files and print lines are still there.
- **Scrubbed late:** a secret in recorded data is removed in a later commit and stays in the history.
