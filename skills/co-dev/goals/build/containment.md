# Containment

The build changes what it is meant to change and can be taken back: each step can be undone, the user's own work and whatever lies outside the working copy stay as they were, and what cannot be undone waits for the user.

*Falls short:* damage beyond the step. *Overshoots:* precautions that cost more than the damage they guard against.

*Borders:* who releases a gated action belongs to agency; building only what the plan asks belongs to fidelity; keeping a change small within the code belongs to craft.

## Desirable

- **Known ground:** before the first change, you know what is in the working copy that is not yours (uncommitted changes, untracked files, other branches, stashes), and leave it as it is or ask.
- **Own space:** the work is done where the plan says (a branch, a separate working copy), not on the shared or released line unless the user says so.
- **Way back at each step:** each step ends in a commit that can be reverted, so that a failure costs one step.
- **Look before destroying:** before anything is deleted, overwritten, reset or cleaned, what is there is looked at, and what is not yours or cannot be recovered is kept or asked about.
- **Narrowest tool:** the command with the smallest reach that does the job is used: one file, not the tree; one path, not a pattern; no force where none is needed.
- **Dry run first:** where a command can show what it would do, that is looked at before it is run for real.
- **Outside the working copy:** whatever reaches outside it (a database, a service, a shared environment, a remote, a message sent, a package published) is done only as the plan provides and the user has released.
- **Real data protected:** work is tried on a copy or on test data; real data is touched only by a gated step, with a stated way back.
- **Way back tried:** where the plan gives a way to undo a risky step, it is tried, as far as it can be, before the step is taken.
- **Secrets kept:** keys, tokens and personal data are not printed, logged, committed or sent anywhere, and one found in the code is reported, not copied.
- **History respected:** shared history is not rewritten, commits others may have are not amended, and hooks and checks are not bypassed.
- **Others' ground:** code and configuration that belong to other people or systems are changed only as the plan says, and a change needed there is raised.
- **Left as found:** what the build starts or changes around the code (processes, containers, temporary files, settings, installed tools) is stopped, removed or put back, or the user is told what remains.
- **Damage owned:** when something does go wrong, the work stops, what happened and what state things are in is said at once, and the repair starts from what the user decides.
- **Proportion:** the care matches the reach: an edit that a revert undoes carries none of this.

## Undesirable

### Falls short

- **Lost work:** the user's uncommitted changes or untracked files are overwritten, reset, stashed away or cleaned out.
- **Blind destruction:** a delete, a reset, a forced push or a dropped table is run without a look at what it removes.
- **Broad sweep:** a command is run over the whole tree, or with a pattern that matches more than was meant.
- **Live by accident:** a test, a script or a migration runs against real data or a real service.
- **Leaked secret:** a key or a token lands in a commit, a log or a message.
- **Rewritten history:** a shared branch is rebased or force-pushed, or checks are bypassed to get a commit through.
- **Collateral edits:** files outside the step are changed by a tool (a formatter, a generator, an upgrade) and go into the commit unlooked at.
- **Mess left behind:** processes keep running, ports stay taken, temporary files and changed settings remain.
- **No way back:** a long stretch of work exists only in the working copy, and one bad command would lose it.

### Overshoots

- **Permission for everything:** the user is asked before each edit or harmless command.
- **Backup of the backed-up:** copies and snapshots are made of what version control already holds.
- **Needless safety work:** flags, dry runs and rollbacks for a change that a revert undoes.
- **Frozen by risk:** a gated step that was released is still put off, or a needed change is avoided because the code is "fragile".
- **Sandbox for all:** everything is tried in a copy, where a branch of the working copy is copy enough.
- **Warnings on everything:** each routine command comes with a caution, and the one that matters is lost among them.

### Counterfeits (looks met, is not)

- **Untried way back:** a backup or a rollback exists that nobody saw restore anything.
- **"Should be safe":** a command is called harmless that was not read, or whose reach was not looked up.
- **Committed, so safe:** work is taken to be safe because it is committed, though the commit sits only in a copy that is about to be removed.
- **Asked, not informed:** permission is asked for a destructive action without saying what it destroys.
- **Hidden repair:** damage is repaired quietly and never mentioned.
- **Approval by fatigue:** the user has said yes to so many harmless prompts that the one real one passes unread.
