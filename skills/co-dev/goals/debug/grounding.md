# Debug: Grounding

The search works on what is actually there: the messages, the code that runs, the data and the environment were read or run, in full and now, and what was seen, inferred and assumed stay apart.

*Falls short:* a diagnosis of a system that was imagined. *Overshoots:* evidence gathered past what the search needs.

*Borders:* what the failure is stated to be belongs to framing; an explanation built on the facts belongs to hypothesis; whether the cause has been shown belongs to proof; what the user is told of the findings belongs to shared understanding; saving the evidence before it is disturbed belongs to containment.

## Desirable

- **Message read in full:** the error, the stack trace and the log around it are read to the end, including the causes nested beneath and the lines before the failure.
- **First error first:** where many errors follow one another, the earliest is found and started from.
- **Code that runs:** it is confirmed that the code being read is the code that ran: the version deployed, the build, the branch, the file loaded, the setting in effect.
- **Read, not recalled:** the code on the failing path is read now, including the library's code where the path goes through it.
- **Actual values:** what the variables, the request or the record held at the failure is looked at (printed, logged, inspected), not worked out from the code.
- **Environment looked up:** the versions, configuration, data and timing the failure may depend on are looked up where the failure shows, not taken to be the same as here.
- **Changes from the history:** what changed lately (commits, dependencies, settings, data, the platform) is taken from the history and the records, not from memory.
- **Real interfaces:** how a library, a tool or a service behaves is checked against its source or documentation in the version in use, or tried.
- **Order from the record:** the order of events is taken from timestamps and logs, not from how the story is usually told.
- **Seen vs. inferred:** in the reasoning and in every report, what was observed, what was inferred and what is assumed are told apart.
- **The user's account as evidence:** what the user reports is taken as evidence with its source (seen by them, passed on from someone else), made exact where it can be; when a run says otherwise, the difference is raised.
- **Checkable evidence:** what the diagnosis rests on is quoted exactly or pointed to (command and output, file and line), so that it can be checked again.
- **Absence checked:** "nothing in the logs" is said only where the logs would have held it.
- **Currency:** what was observed earlier in the search is confirmed still to hold after something was changed.
- **Stopping point:** gathering stops when more of it would not change the next probe.
- **Open correction:** when a finding contradicts something said earlier in the search, it is corrected in plain view and what rested on it is re-examined.

## Undesirable

### Falls short

- **Last line only:** the conclusion is drawn from the final line of the trace, and the cause named above it goes unread.
- **Imagined code:** what a function does is taken from its name, or from memory of it.
- **Wrong build:** an hour goes into code that is not the code that runs.
- **Deduced values:** "this must be three here" stands in for looking.
- **Assumed environment:** the failing machine is taken to have the same versions and settings as this one.
- **Hearsay as fact:** "it started after the release" is built on, and was never looked up.
- **Hardened assumption:** something assumed early in the search is relied on as fact later.
- **Unchecked deference:** the user's account of the cause is taken though the output at hand says otherwise.

### Overshoots

- **Log flood:** everything is logged and dumped, and the reading of it replaces the search.
- **Reading everything:** the codebase is studied from the top before the failure is run once.
- **Evidence paralysis:** observing goes on where one probe would decide.
- **Settled facts rechecked:** what was established is verified again at every step.
- **Doubting the user:** what they say they saw is rechecked line by line.
- **Findings dump:** everything that was read is reported, not what bears on the cause.

### Counterfeits (looks met, is not)

- **False precision:** line numbers, values or versions are given that were not looked up.
- **"I checked":** a look or a run is claimed that was not made.
- **Inference dressed as observation:** "the log shows the cache is stale" is said where the log shows a value, and the staleness is a conclusion.
- **Quoted selectively:** the part of the output that fits is quoted, and the part that does not is left out.
- **Skimmed as read:** a search hit or a file listing is treated as knowing the code.
- **Stale reading:** output from before a change is cited as the present state.
- **Blanket disclaimer:** "I may be missing something" replaces saying which statements were not checked.
