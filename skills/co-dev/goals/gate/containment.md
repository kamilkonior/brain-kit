# Gate: Containment

The gate changes nothing: the code, its history, the design, the plan and what the build recorded are after the gate as they were before it, what the gate runs harms nothing and leaves nothing behind, and the one thing it adds is its own record.

*Falls short:* a gate that leaves its hands on the work. *Overshoots:* a gate that runs nothing for fear of changing something.

*Borders:* who decides how a finding is put right belongs to agency; what the gate may run and where is established in framing; what a trial must show belongs to trial; where the gate's record is written, and what it holds, belongs to handover.

## Desirable

- **Work as found:** after the gate the branch, the working tree, the index and the history are as they were, and this is looked at before the gate ends (the status, the head, the comparison with the examined state).
- **No repair:** a defect is recorded, however small; not a typo is corrected.
- **Records untouched:** the design, the plan, its statuses and the build's entries are not edited, corrected or tidied; where one of them is wrong, that is a finding.
- **Only its record added:** the gate writes its own record, in the place established for it, as its own entry, and adds nothing else.
- **Experiments on a copy:** what can only be seen with the code changed (a check shown able to fail, a suspected cause tried) is done on a throwaway copy, such as a separate worktree, which is removed afterward.
- **Side effects known first:** before a check or a command is run, what it writes is known (a snapshot rewritten, a lock file updated, a migration applied), and one that writes to the work is run on a copy or not at all.
- **Development resources:** trials run against development and test resources; production data and live systems are not touched.
- **State put back:** what a trial created or changed (records, files, queues, caches) is removed or restored, or the trial ran where it does not matter, and that is said.
- **Left as found:** processes started are stopped, temporary files and resources are removed, and machine-wide settings and tools are not changed.
- **Hard-to-undo not run:** a step that a revert does not undo (a migration of shared data, a release, a message sent) is not run in order to try it; it is examined by reading or on a copy, and named as not tried.
- **Nothing outward:** the gate pushes nothing, opens nothing, posts nothing and notifies nobody.
- **The user's work kept:** uncommitted changes and untracked files found in the tree are left exactly as they are, and named.
- **Secrets stay where they are:** a secret found in the work is reported by its place, and is not copied into the record or a message.
- **Spending bounded:** what costs money or load is run within a stated limit and shut down afterward.
- **Proportion:** caution follows what a run could change; reading, building and running the tests in the workspace need none.

## Undesirable

### Falls short

- **Fix in passing:** a one-line defect is corrected by the gate, and the work that reaches the user is no longer the work that was built and examined.
- **Formatter run:** a tool that was run to check the work rewrites files, and the changes stay.
- **Snapshot updated:** the suite is run in a mode that rewrites expected values, and the rewritten files stay.
- **Status corrected:** a step wrongly marked done is unticked by the gate, where that should have been a finding.
- **Tests added:** the gate commits the tests it found missing.
- **Experiment left in:** the line that was broken to see a check fail is still broken.
- **Trial debris:** the accounts, uploads and rows the trials made stay in the development database.
- **Litter:** servers left running, scratch branches and temporary files stay behind.
- **Wrong target:** a trial runs against shared or live data.

### Overshoots

- **Nothing run:** the gate only reads, because running the work might change something.
- **Permission for everything:** the user is asked before each harmless read, build or test run.
- **Isolation ceremony:** containers and throwaway environments are built to run the tests of a two-file change.
- **Frozen by caution:** a trial the frame allows is not made because it writes a record to a test database.
- **No record:** the gate writes nothing down, because a record would be a change.
- **Direction withheld:** what the gate knows about the cause of a failure is kept back, as if saying it were interfering.

### Counterfeits (looks met, is not)

- **Clean in name:** "nothing was changed" is said, and the status was never looked at.
- **Undone from memory:** experiments were taken back by hand, and nobody compared the tree with the examined state.
- **Copy that is not one:** the "throwaway" worktree shares its database or its cache with the real one.
- **Suggestion applied:** a repair is offered as a change already made in the tree, "for convenience".
- **Cleanup claimed:** "cleaned up" is said, and the processes and the data are still there.
- **Entry that edits:** the gate's "own entry" in the plan rewrites the build's entries around it.
