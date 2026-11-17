# Completeness

The build goes the whole way to the agreed end state: every step in the extent is done, including the work around the code, nothing called done is a placeholder, and what was not built is named.

*Falls short:* a build that is mostly done. *Overshoots:* work past the end state that nobody asked for.

*Borders:* whether what was built is what was decided, and whether features were added, belongs to fidelity; whether a step is shown to work belongs to verification; how well the code is made belongs to craft; where the state of the build is written down belongs to handover.

## Desirable

- **End to end:** the build ends at the frame's end state (merged, migrated, released, documented), not at "code written".
- **Every step accounted for:** each step in the extent is done, or is named as not done, with the reason and what picks it up.
- **Work the plan missed:** work that the end state needs and no step holds (a setting, a migration, a registration, a permission) is added to the plan as a step and done; it is neither left undone nor done unrecorded.
- **No placeholders:** what is called done holds no stub, no sample data standing in for real data, no "not implemented" and no unresolved marker.
- **Hard part built:** the difficult part of each step is built as fully as the easy part.
- **Beyond the main path:** the failures and edge cases the design specifies are built, not only the path a showing takes.
- **Scaffolding removed:** temporary work (stubs, flags, compatibility layers, test switches) is taken out at the step the plan names, or stays with a stated reason.
- **Obsolete removed:** what the new work replaces is removed as the plan says, with its settings, its tests and its documentation.
- **Around the code:** documentation, examples, change notes and configuration for other environments are done as far as the end state calls for them.
- **Outside hands served:** work only the user or someone else can do (an approval, a credential, a manual release) is handed over at its place in the plan, and the build does not count as finished while it is open.
- **Closed threads:** a question, a warning or a failing check that came up during the build is resolved or put on the open list before the end.
- **Named omissions:** what was cut, deferred or left open is written down, each with its reason and what picks it up.
- **Bounded by need:** the build stops at the end state; an improvement seen along the way is noted for the user, not built.
- **Final check:** before the build is called done, the result is compared with the frame's end state, and you say what was compared and what was not.

## Undesirable

### Falls short

- **Mostly done:** the build is reported finished with a step, or the last part of a step, still open.
- **Code-only build:** the code is written, and the migration, configuration, documentation and cleanup the plan lists are not done.
- **Trailing off:** the first stages are built with care and the last ones in a hurry, or not at all.
- **Main path only:** the case that is shown works, and the failures the design names were not built.
- **Stubs left in:** a stub or a fixed value from an early step is still there at the end.
- **Leftovers:** old code, dead settings and scaffolding stay behind because nobody took them out.
- **Silent omission:** something was not built and is not mentioned.
- **Premature "done":** the build is declared finished because the session ran long or the checks at hand passed.

### Overshoots

- **Past the finish:** work continues after the end state is reached: more tests, more refactoring, more options.
- **Pulled forward:** what the plan deferred to a later plan is built now, because it was close.
- **Every conceivable case:** failures and edges are built that the design does not ask for and reality will not bring.
- **Extras around the code:** documentation, scripts and tooling are produced that the end state does not call for.
- **Moving finish line:** the end state grows as the build goes on.

### Counterfeits (looks met, is not)

- **Placeholder as done:** a step is marked done with a "TODO", a hard-coded value or a "for now" inside it.
- **Follow-up as a bin:** unfinished work is moved to a list of "follow-ups" so that the build can be called complete, or omissions are named where nobody will read them.
- **Green as finished:** the checks pass, and the end state (merged, migrated, switched on) was never reached.
- **Mention as coverage:** a case is named in a comment or a report and counted as built.
- **Volume as progress:** the number of files, lines or commits is offered where the end state was asked for.
- **Claimed check:** "everything is implemented" is said without the comparison having been made.
