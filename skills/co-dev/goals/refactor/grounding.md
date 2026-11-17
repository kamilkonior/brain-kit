# Refactor: Grounding

The refactoring works on the code that is actually there: the code to be changed, everything that uses it and the reasons for its present shape were read or searched out, now, and what was seen, inferred and assumed stay apart.

*Falls short:* a refactoring of code that was imagined, or whose users nobody looked for. *Overshoots:* the codebase studied past what the change touches.

*Borders:* what the refactoring is for and what counts as behavior belong to framing; which shape to aim at belongs to target; checks for the behavior belong to baseline; whether the sameness was shown belongs to proof; bringing every user over belongs to completeness; what the user is told of the findings belongs to shared understanding.

## Desirable

- **Read before moved:** the code to be changed is read in full, now, including the parts that look dull (the error handling, the special case, the fallback).
- **All users found:** every use of what is to be moved, renamed or changed is searched for across the project: calls, imports, subclasses and overrides, tests, scripts, build files and documentation.
- **Uses no search shows:** uses that a search for the name does not find are looked for on purpose: names put together from strings, reflection, configuration, templates, stored data, generated code, other repositories.
- **Reason for the present shape:** before something odd is straightened (a check that looks redundant, a copy that looks needless, an order that looks arbitrary), its reason is looked for in the history, the comments and the tests, and asked of the user where none is found.
- **Unused shown unused:** code is called unused when its uses were searched for, also in the ways no search for the name shows, and the user is told what that rests on.
- **Hidden ties looked for:** what the parts share without saying so (state, the order in which things are set up, a cache, a transaction, the clock) is looked for before they are pulled apart.
- **The language's rules checked:** where a move could change meaning by the rules of the language (the order of evaluation, scope, what a name is bound to, which overload is picked, an error crossing a new boundary), that is looked up or tried, not assumed.
- **The project's ways:** the new shape follows how the project already lays out, names and connects things, and uses what it already has, as found by reading the code beside it.
- **Tool result read:** what a rename tool, a script or a search-and-replace changed is read, including what it changed in strings and comments and what it left.
- **Seen vs. inferred:** in the reasoning and in every report, what was read or run, what was inferred and what is assumed are told apart.
- **The user's account as evidence:** "nothing else uses this" is taken as evidence with its source, and checked by a search where a search is cheap; when the code says otherwise, the difference is raised.
- **Checkable evidence:** what is said about the code is quoted exactly or pointed to (file and line, command and output), so that it can be checked again.
- **Currency:** what was read before a move is read again where the move changed it, and the search for users is repeated before the old form is removed.
- **Stopping point:** reading stops when more of it would not change the next move.
- **Open correction:** when a finding contradicts something said earlier, it is corrected in plain view and what rested on it is looked at again.

## Undesirable

### Falls short

- **Imagined code:** what a function does is taken from its name, and it is moved on that.
- **Users by one search:** one search for the name is taken as the list of users, and the call put together from a string is missed.
- **Fence removed:** a check or a special case that "does nothing" is dropped, and nobody looked why it was there.
- **Unused by guess:** code is deleted because no call to it was seen in the files that were open.
- **Tie missed:** two parts are separated that shared a variable, a transaction or an order of calls.
- **Convention ignored:** the new structure is laid out as nothing else in the project is, or builds again a helper the project already has.
- **Tool trusted blind:** a replace across the project is run and not read, and it renamed a word in a message the user's customers see.
- **Hardened assumption:** something assumed early ("this is only called from here") is relied on as fact later.
- **Unchecked deference:** the user's "nobody uses this" is taken though a search shows a use.

### Overshoots

- **Reading everything:** the codebase is studied from the top before one function is pulled out.
- **Archaeology:** the history of every line is traced, where the purpose needed the reason for one.
- **Every name suspected:** nothing is renamed because something somewhere might build the name from a string, though nothing in the project does.
- **Settled facts rechecked:** what was established is verified again at every step.
- **Doubting the user:** what they say about their own code is rechecked line by line.
- **Findings dump:** everything that was read is reported, not what bears on the change.

### Counterfeits (looks met, is not)

- **"No other callers":** this is said without a search, or after a search of one directory.
- **False precision:** numbers of call sites, files or lines are given that were not counted.
- **Skimmed as read:** a search hit or an outline of the file is treated as knowing the code.
- **Inference dressed as observation:** "this branch is never reached" is said where it was concluded from reading, and never seen.
- **Stale reading:** search results from before the moves are cited as the present state.
- **Blanket disclaimer:** "there may be usages I missed" replaces saying where was searched and where not.
