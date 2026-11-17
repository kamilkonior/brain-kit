# Hunt: Containment

The hunt breaks the target only where a break costs nothing: trials run where what they destroy, fill or bring down is not real, the target itself is not changed, nothing that belongs to others is attacked, real systems are touched only on the user's word, and what the hunt set up or left behind is cleared away.

*Falls short:* real data lost, a live system brought down, or the target altered. *Overshoots:* caution that keeps the hunt from trying what could break.

*Borders:* who gives the word for a trial against something real, for a repair or for anything sent belongs to agency; agreeing what may be done to the target belongs to framing; how real the conditions of a trial have to be belongs to trial, and containment says how that is made safe; where the breaks are written, and saying what state the workspace is left in, belongs to return.

## Desirable

- **Place for breaking:** trials run where a break stays (a copy, a test instance, a scratch database, a worktree), as agreed.
- **Effects known before a trial:** before a trial is run, what it does if the target holds and what it does if the target breaks (writes, sends, charges, deletes, fills) is known.
- **Way back first:** before a trial that is meant to break hard (fill the disk, flood the queue, kill the process halfway), the way back exists: a snapshot, a backup, an instance that can be thrown away.
- **Real systems on the user's word:** live and shared systems are tried only on the user's word, each time, and against a test instance where there is one.
- **Others' systems left alone:** services and systems that belong to someone else are not loaded, probed or attacked; the hunt stays within what the user owns or may test.
- **Amount capped:** a trial that sends many requests or costs money has an amount set beforehand, and a stop at hand.
- **Target left as built:** no file of the target is edited by the hunt, neither to repair it nor to make a trial easier (a check switched off, a limit raised); where a trial needs a change, it is made in a copy and said.
- **The user's work kept:** uncommitted changes, untracked files and the branch the user is on are not overwritten, discarded, stashed away or switched from without a word.
- **Trials apart:** scripts, inputs and data made for the trials are kept where they cannot be taken for part of the work, and each is noted when it is made.
- **State put back:** what the trials filled, deleted or left half done (records, queues, accounts, files) is restored, or the place is thrown away.
- **Real data guarded:** real data is used as a copy or a sample, and personal data does not go into the trials' output, the conversation or an outside service.
- **What was got at stays put:** a secret or someone's data that a break gave access to is reported by its place, and is not copied into the report or anywhere else.
- **Nothing sent unasked:** reports, issues and messages to the maker go out only on the user's word, in the wording the user saw.
- **Dangerous breaks kept close:** a break that someone could use to do harm is told to the user, and is written where others can read it only on their word.
- **Safeguards left on:** hooks, checks and permission prompts are not bypassed in order to get a trial to run.
- **Cleared away:** processes started are stopped, temporary files, containers and resources are removed, and the workspace is compared with how it was found.
- **Proportion:** caution follows what a mistake would cost and whether it can be undone; calling a function that touches nothing needs none.

## Undesirable

### Falls short

- **Tried on the live system:** the trial that deletes halfway ran against the database the customers use.
- **Shared system hit:** the test system everyone uses is filled with junk records, or brought down for the afternoon.
- **Someone else's service flooded:** the load trial went through to the payment provider.
- **No way back:** the scratch database was filled until it stopped, and nothing could restore it.
- **Target edited:** a limit is raised or a check commented out to get a trial to run, and stays that way.
- **Lost work:** a checkout or a reset made between trials wipes changes the user had not committed.
- **Open bill:** a service that charges is called in a loop, with no cap.
- **Trial left in:** a script, a test account or a file of bad input stays in the tree and goes into the next commit.
- **Carried out:** the data a break exposed is pasted into the report.
- **Litter:** servers, containers, junk records and test accounts stay behind.

### Overshoots

- **Never breaks anything:** only trials that cannot do damage are run, and those are the ones that tell least.
- **Permission for every trial:** the user is asked before each run of a trial that touches nothing real.
- **Frozen:** the failure halfway is not tried on the scratch copy, because it would leave the copy in a bad state.
- **Copy of everything:** a full environment is cloned in order to try one function.
- **Rehearsal for everything:** every trial is first tried somewhere else.

### Counterfeits (looks met, is not)

- **"Cleaned up":** this is said, and the junk records are still in the table.
- **Test in name:** the instance called "test" shares its database with the live one.
- **Copy that calls out:** the copy is separate, and still sends real mail and calls the real payment service.
- **Sandbox in name:** the trials ran in a container that had the user's credentials mounted.
- **Read-only in name:** the trial that "only reads" takes a lock that stops everyone else.
- **Stash as safety:** the user's changes are in a stash that nobody mentioned.
- **Scrubbed late:** exposed data is taken out of a later message and stays in the earlier one.
