# Debug: Containment

The search harms nothing and leaves things as it found them: what shows the failure is saved before it is disturbed, probes run where a mistake costs little, and what was added or changed in order to look is taken out again.

*Falls short:* evidence destroyed, damage done or probes left in. *Overshoots:* caution that keeps the search from looking.

*Borders:* who gives the word for touching a real system belongs to agency; agreeing what the search may touch belongs to framing; taking a probe's change back so that the next result is clean belongs to narrowing; saying what state the workspace is left in belongs to return.

## Desirable

- **Evidence saved first:** before a restart, a redeploy, a cleanup or a retry, what shows the failure (the logs, the state, the data, a dump) is copied or noted.
- **Failing state kept:** a state that fails and may not come back is kept as it is, and the search works on a copy.
- **Look before touch:** the first probes read; a probe that changes something comes when reading has told what it can.
- **The user's work kept:** uncommitted changes, untracked files and the interrupted work's half-done step are not overwritten, discarded, stashed away or mixed with probes.
- **Apart from the work:** probes and trial changes are made where they cannot be taken for the work (a scratch branch, a worktree, a marked change), as agreed.
- **Probes listed:** each thing added or changed in order to look (a log line, a flag, a disabled check, a raised timeout) is noted when it is made.
- **Taken out:** before the return every probe is removed, and the workspace is compared with how it was found.
- **Real systems on the user's word:** live and shared systems are read where that was agreed, and changed, restarted or put under load only on the user's word, each time.
- **Read before write on real data:** real data is queried, not updated, and the query's cost to the system is known.
- **Side effects known:** a reproduction that sends mail, charges money or writes records is run against stand-ins, or its effects are known and bounded before it runs.
- **Secrets stay out:** logs, dumps and records carried into the conversation, into files or to outside services are free of keys, tokens and personal data.
- **Commands understood:** a command is run when its effect here is known; options that force, recurse or skip checks are used knowingly, each time.
- **Safeguards restored:** a check, a hook or a limit switched off as a probe is switched on again, and none is bypassed to make the failure go away.
- **Left as found:** processes started are stopped, and temporary files, containers and resources are removed.
- **Proportion:** caution follows what a mistake would cost and whether it can be undone; reading a log needs none.

## Undesirable

### Falls short

- **Restart first:** the service is restarted or the cache cleared, and the state that showed the failure is gone.
- **Probes left in:** debug output, a commented-out check or a fixed value stays in the code, or goes into a commit.
- **Probe in the work:** a trial change is left in the interrupted work's tree and is committed with its next step.
- **Lost work:** a reset, a checkout or a stash made for the search wipes changes the user had not committed.
- **Live experiment:** an explanation is tested by changing the system that people are using.
- **Reproduction with effects:** the failing run is repeated twenty times, and twenty real messages go out.
- **Leaked data:** customer records or a token are pasted into the conversation or into a search.
- **Safeguard left off:** the disabled test or the raised limit is still that way after the search.
- **Litter:** servers, containers, dumps and scratch files stay behind.

### Overshoots

- **Permission for every look:** the user is asked before each log is read.
- **Frozen:** no probe is run because it would change something, though the change is one line in a scratch tree.
- **Copy of everything:** a full environment is cloned in order to read one file.
- **Backup of the trivial:** copies are made of what a revert restores.
- **Rehearsal for everything:** every probe is first tried somewhere else.

### Counterfeits (looks met, is not)

- **"Cleaned up":** this is said, and the diff still shows the probes.
- **Read-only in name:** the query that "only reads" locks a table, or the debugger attached "to look" halts the service.
- **Copy that differs:** the search runs on a copy that lacks what makes the original fail.
- **Saved in the scrollback:** the evidence called saved exists only in the terminal or the conversation.
- **Stash as safety:** the user's changes are in a stash that nobody mentioned.
- **Scrubbed late:** a secret is taken out of a later message and stays in the earlier one, or in the history.
