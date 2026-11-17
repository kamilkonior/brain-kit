# Build: Craft

The code is well made: it is the simplest that does what the step needs, a reader of the project can follow it, it deals with the failures that will really occur, and it leaves nothing behind that the work did not need.

*Falls short:* code that passes its check and that nobody would want to maintain. *Overshoots:* polish, generality and safeguards nobody needs.

*Borders:* following the project's conventions and using what it already has belongs to grounding; whether a behavior was decided belongs to fidelity; whether the code works belongs to verification; removing the scaffolding and the obsolete code that the plan names belongs to completeness; secrets and what a command may harm belong to containment.

## Desirable

- **Simplest that does it:** the code is the plainest that produces the step's result and passes its check, with no layer, option or parameter that has only one use.
- **Says what it does:** names say what things are and do, in the design's and the project's terms, and a function does what its name says and no more.
- **Known word first:** a new thing is named with a word the reader already knows, from the codebase, the plan or plain language, and a word is coined only where none fits.
- **Followable cold:** someone who knows the project and was not in the session can follow the change without help.
- **Failures surfaced:** an error is handled where the design says it is handled, and otherwise passed on with enough to find its cause; none is swallowed, and no silent fallback hides one.
- **Real edges covered:** the inputs and states that will occur here (empty, absent, repeated, large, at the same time) are dealt with.
- **Boundaries guarded:** what comes from outside (a user, a file, the network) is checked where it enters, and trusted inside.
- **Duplication judged:** the same thing is written once; things that only look alike stay apart.
- **Small surface:** nothing is public, exported or configurable that nothing outside needs.
- **Comments say why:** a comment says what the code cannot (a reason, a constraint, a trap), and none tells the story of the session.
- **Nothing left behind:** debug output, commented-out code, unused imports and files, and notes to self are gone before the step is called done.
- **Old replaced, not shadowed:** where new code takes over from old within a step, the old path goes in that step; two ways of doing one thing do not stay side by side unless the plan says so.
- **Tests are code:** each test checks one behavior, is named for it, and can be read without the implementation open.
- **Clean by the project's tools:** the formatter, linter and type checker the project uses pass without new exceptions.
- **Care follows stakes:** the closest attention goes where a mistake would be costly or hard to see (data, money, access, concurrency), and routine code is not agonized over.
- **Own review:** the full change is read as a reviewer would read it before the step is called done, and what that reading finds is fixed.

## Undesirable

### Falls short

- **Works by accident:** the code passes, and its author could not say why a line is needed.
- **Swallowed error:** an exception is caught and dropped, or a default is returned where the caller needed to know.
- **Copy and adjust:** a block is pasted several times with small changes.
- **Names that hide:** `data2`, `handleStuff`, `tmp`, or a name left over from an earlier idea of the code.
- **Coined term:** a new thing is named with a word or a figure of speech made up in the session, where a word the reader already knows would do.
- **Leftovers:** print statements, dead branches, unused parameters and files from abandoned attempts stay in.
- **Hack with no end:** a "temporary" shortcut goes in with no step that removes it.
- **Warnings waved through:** new compiler, linter or deprecation warnings are left for someone else.
- **Sprawl:** one function or file takes on everything the step needed.

### Overshoots

- **Speculative generality:** an interface, a base class, a plug-in point or a setting is built for a second use that nobody asked for.
- **Defensive everything:** checks and fallbacks are written for states that cannot occur.
- **Refactoring the neighborhood:** nearby code is restructured or renamed because the builder was passing.
- **Premature optimization:** code is made faster and harder to read where the design asks for no speed.
- **Comment on every line:** comments repeat the code, and documentation is written for the obvious.
- **Cleverness:** a compact trick is used where three plain lines would do.
- **Polishing past fit:** names and structure are reworked again after the code is clear and its check passes.

### Counterfeits (looks met, is not)

- **Tidy surface:** the code is formatted, typed and documented, and its logic is wrong or tangled.
- **Silenced tool:** a lint rule is disabled, a type cast away or a warning suppressed, to come out clean.
- **Handling for show:** an error is caught, logged and ignored, and this counts as error handling.
- **Comment as fix:** "TODO: handle the empty case" stands where the handling should be.
- **Name that promises:** "validate", "safe" or "atomic" is in the name, and the code does not do it.
- **Session narration:** comments like "new improved version" or "fixed as requested" describe the conversation, not the code.
