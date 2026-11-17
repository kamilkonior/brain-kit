# Craft

The code is written for whoever reads and changes it next: it follows the ways of this codebase, is as simple as its outcome allows, and deals with what can really go wrong.

*Falls short:* code that passes its check and that nobody would want to keep. *Overshoots:* polish, abstraction and tidying that no step asked for.

*Borders:* whether the code does what the step says belongs to fidelity; whether it is shown to work belongs to verification; finding what the codebase already has belongs to grounding.

## Desirable

- **Local conventions:** naming, structure, error handling, tests and formatting follow what this codebase does, including where you would do it differently, so that the new code reads like the code around it.
- **Fits the structure:** new code goes where this codebase puts such things, and responsibilities stay where they were.
- **Simplest that serves:** the code is the simplest that makes the outcome true: no layer, option or generality the step does not need.
- **Reuse over rewrite:** what the codebase and its libraries already provide is used; a new dependency is added only where the plan says so or the user agrees.
- **Says what it does:** names say what things are and do, and the code can be followed without its author.
- **Known word first:** a new thing is named with a word the reader already knows, from the codebase, the plan or plain language, and a word is coined only where none fits.
- **Comments that earn their place:** a comment says why (a constraint, a trap, a reason the code is not the obvious one), in the measure this codebase comments; it does not narrate the code or the build.
- **Small diff:** the change touches what the step needs and leaves the rest as it was: no reformatting, renaming or reordering in passing.
- **Real failures handled:** the errors, empty cases and limits that can really occur at this point are handled the way this codebase handles such things, and a failure is loud enough to be found.
- **One place:** each piece of knowledge (a rule, a constant, a format) is written once.
- **Tests as code:** tests are written with the same care: readable, named for what they show, independent of one another.
- **Tools obeyed:** the project's formatter, linter and type checker are run, and their findings are fixed in the code, not silenced.
- **Safe by default:** input from outside is treated as such, and secrets and personal data stay out of the code and its logs.
- **Cost in view:** where the code will run often or on much data, plain waste is avoided; elsewhere clarity wins.
- **Read before commit:** the diff is read as a reviewer would read it before each commit, and what they would stumble on is fixed.

## Undesirable

### Falls short

- **Against the grain:** the new code brings its own style, structure or tooling into a codebase that has another.
- **Copy and adjust:** a block is duplicated with small changes where the existing one could have been used or extended.
- **Happy path only:** the code works for the case that was tried, and an empty input, a failure or a second call breaks it.
- **Swallowed errors:** a failure is caught and dropped, or replaced by a default, so that nothing shows it happened.
- **Clever code:** a dense or surprising construction where a plain one would do.
- **Misleading names:** names are left over from an earlier attempt, or say something other than what the code does.
- **Coined term:** a new thing is named with a word or a figure of speech made up in the session, where a word the reader already knows would do.
- **Silenced tools:** warnings are switched off, types cast away or rules disabled in order to get through.
- **Hard-wired values:** paths, addresses or sizes that belong in configuration are written into the code.
- **Sprawl:** the change is spread over more files and lines than the outcome needs.

### Overshoots

- **Speculative generality:** options, parameters, interfaces and layers for needs nobody has.
- **Defensive clutter:** checks and fallbacks for cases that cannot occur here.
- **Tidying in passing:** neighboring code is reformatted, renamed or restructured because it was open.
- **Rewrite for taste:** working code within reach is rewritten because you would have written it differently.
- **Gold-plating:** polishing goes on after the step's outcome is met and the code reads well enough.
- **Comment clutter:** comments restate the code, tell the story of the change or speak to the user.
- **Premature tuning:** code is made faster and harder to read where nothing showed it was slow.

### Counterfeits (looks met, is not)

- **Convention on the surface:** the formatting matches, and the structure, error handling or tests work differently from the code around them.
- **Simple by omission:** the code is short because the hard case is not handled.
- **Abstraction as quality:** layers and patterns give a small change the look of design.
- **Comment over fix:** a comment or a TODO explains a problem that should have been solved.
- **Handled in name:** an error is "handled" by logging it and going on as if nothing had happened.
- **Clean by the tools:** the formatter and the linter pass, and that is taken for readable.
