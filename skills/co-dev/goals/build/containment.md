# Containment

The build changes only what it is meant to change, and what it changes can be taken back: the user's work, their data and the systems around the code are as safe after a step as before it, and nothing that cannot be undone is run before its way back exists.

*Falls short:* damage outside the step. *Overshoots:* caution that stops the work.

*Borders:* who gives the word for an action that is hard to undo belongs to agency; agreeing the workspace and what the build may touch belongs to framing; keeping each step a change that can be reverted belongs to increment; what is done once something has gone wrong belongs to adaptation.

## Desirable

- **The user's work kept:** uncommitted changes, untracked files and branches that were there before the build are not overwritten, discarded, stashed away or swept into a commit.
- **Inside the workspace:** changes are made on the branch, worktree and environment that were agreed, and nowhere else.
- **Inside the step:** files outside what the step names are left alone, or the reason for touching them is said.
- **Staged by name:** what goes into a commit is chosen file by file, and looked at before it is committed.
- **Look before removing:** before anything is deleted, overwritten or reset, what is there and whose it is has been looked at.
- **Hard-to-undo recognized:** an action that a revert does not undo (a migration, a deletion, a rewrite of history, a release, a message sent) is recognized as such before it is run.
- **Way back first:** before such an action, what the plan says is saved has been saved, and the return has been tried where trying is cheap.
- **Real data kept apart:** the build runs against development and test resources; production data and live systems are touched only where the plan says, at that step.
- **Secrets stay out:** keys, tokens and personal data do not go into code, commits, logs, messages or outside services.
- **Commands understood:** a command is run when its effect here is known; options that force, recurse or skip checks are used knowingly, each time.
- **Safeguards left on:** hooks, checks, reviews and permission prompts are not bypassed to get a step through.
- **Dependencies on purpose:** a package is added when the plan names it or the user has agreed, from its real source, at a stated version.
- **Left as found:** processes started are stopped, temporary files and resources are removed, and machine-wide settings and tools are not changed without a word.
- **Spending bounded:** what costs money or load (cloud resources, paid interfaces, long jobs) is started within a stated limit and shut down afterward.
- **Proportion:** caution follows what a mistake would cost and whether a revert undoes it; an edit to a tracked file needs none.

## Undesirable

### Falls short

- **Lost work:** a reset, a checkout or a clean wipes changes the user had not committed.
- **Swept commit:** everything in the working tree is added, and the user's unrelated edits or a local settings file go in with the step.
- **Wide blast:** a search-and-replace, a formatter or a code generator rewrites files the step had nothing to do with.
- **Wrong target:** a migration, a seed script or a deletion runs against a shared or live database.
- **Leaked secret:** a key is written into a file, a commit, a test fixture or a message.
- **Forced through:** a force option, a skipped hook or a disabled check is used to get past a refusal that had a reason.
- **Unknown command:** a command copied from a search result or an error message is run without knowing what it does.
- **Litter:** servers left running, temporary branches, scratch files and cloud resources stay behind.

### Overshoots

- **Permission for everything:** the user is asked before each harmless read, build or test run.
- **Backup of the trivial:** copies are made and procedures written for changes that a revert undoes.
- **Frozen by caution:** a step the plan calls for is not taken because it changes something.
- **Rehearsal for everything:** every command is first run dry, on a copy, in a sandbox.
- **Isolation ceremony:** containers, worktrees and throwaway environments are set up for a change to two files.

### Counterfeits (looks met, is not)

- **Untried way back:** a backup exists that was never restored, or a reverse migration that was never run.
- **"Should be safe":** a risky command is run on a belief about what it does.
- **Rehearsal that differs:** the dry run passes on a copy that lacks what makes the real run dangerous.
- **Branch in name:** the code is on its own branch, and the migration ran against the database everyone shares.
- **Cleanup claimed:** "cleaned up" is said, and the processes and files are still there.
- **Scrubbed late:** a secret is removed in a later commit and stays in the history.
