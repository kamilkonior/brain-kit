# Hunt: Grounding

The hunt rests on what is actually there: what ran was the target under hunt, in the state named, the reference was read at the place a verdict rests on and not recalled, results were read to the end, and what was seen, inferred and assumed stay apart.

*Falls short:* a hunt of another target than the one named, or against a reference that was remembered. *Overshoots:* the target studied past what the hunt needs.

*Borders:* which target, which state and which reference are under hunt belongs to framing; how a statement of the reference becomes a verdict belongs to fidelity; whether a break was shown belongs to proof; whether the conditions of a trial were those of real use belongs to trial; whether the agreed ground was covered belongs to coverage; what the user is told of the results belongs to shared understanding.

## Desirable

- **State run is state hunted:** it is confirmed that what ran is the state under hunt: the build made after the last change, the server that was restarted, the configuration named, no stale cache in between.
- **Reference read now:** the reference is opened at the statement a verdict rests on, in its current version, and quoted as it stands.
- **Use looked up:** how the target is meant to be called (its help, its documentation, its interface) is read, so that a trial uses it as its users would.
- **Surroundings recorded:** the versions, the settings and the data in place when a trial ran are recorded with its result.
- **Results read whole:** the output of a run is read to the end (the exit status, the body, the log, the warnings), not only its first or its last line.
- **Behavior looked up:** how something the target relies on behaves (a library, a service, the platform) is read in its documentation or tried, in the version in use, where a verdict depends on it.
- **Read as a lead:** what the code seems to do is taken as a lead for a trial, and neither a break nor a hold is stated from reading alone.
- **Seen vs. inferred:** in the reasoning and in every break and hold, what was run and seen, what was inferred from it and what is assumed are told apart.
- **Checkable reference:** each result points to the command or the input that gave it and quotes the output exactly, so that it can be looked up.
- **The user's account as evidence:** what the user says about the target and about how it is used is taken as evidence with its source, and when a run says otherwise, the difference is raised.
- **Absence checked:** "nothing limits the size" or "there is no check on the role" is said only after it was tried or the places where it would be were looked at.
- **Currency:** when the target changes during the hunt (a repair, a new build), earlier results are marked as belonging to the earlier state, and those that matter are run again.
- **Stopping point:** reading the target and what surrounds it stops when more of it would not change a trial or a verdict.
- **Open correction:** when a later run contradicts something said earlier in the hunt, it is corrected in plain view, and the results that rested on it are looked at again.

## Undesirable

### Falls short

- **Stale build:** the trials ran against a server that was started before the last change.
- **Wrong target:** the installed version ran, and not the one in the tree.
- **Remembered reference:** the target is held against what the design is remembered to say.
- **Output skimmed:** the last line was read, and the error in the middle was not.
- **Imagined behavior:** a hold or a break is stated from what the code looks like it does.
- **Imagined interface:** the target is called in a way its interface does not offer, and the failure is counted against it.
- **Surroundings unknown:** nobody can say under which configuration the break happened.
- **Hardened assumption:** something assumed in the first trials is relied on as fact in the report.

### Overshoots

- **Reading everything:** the code is studied from the top before the first trial is run.
- **History dig:** the past of every file is researched, though no trial depends on it.
- **Settled facts rechecked:** the identity of the build is checked before each trial, with nothing changed in between.
- **Doubting the user:** what the user says about their own users is rechecked line by line.
- **Everything recorded:** a full dump of the environment is attached to each result.

### Counterfeits (looks met, is not)

- **False precision:** values, counts or timings are given that were not read off a run.
- **"I ran it":** a run is claimed that was not made.
- **Inference dressed as observation:** "the endpoint has no rate limit" is said after three calls.
- **Quoted selectively:** the line of output that shows the break is quoted, and the line above it that shows the set-up error is left out.
- **Stale result:** a trial made before the last change is cited as the present state.
- **Blanket disclaimer:** "results may vary by environment" replaces saying which environment the trial ran in.
