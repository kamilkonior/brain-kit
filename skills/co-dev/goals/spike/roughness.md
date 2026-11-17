# Spike: Roughness

The code is as rough as the answer allows: it takes the shortest way to something that runs, shortcuts are taken on purpose wherever the answer does not depend on them, and care is spent where a mistake in the code would be a mistake in the answer.

*Falls short:* throwaway code made like code that is meant to last. *Overshoots:* code so careless that its result cannot be trusted.

*Borders:* what is built at all belongs to focus; how close to the real conditions the spike has to be belongs to realism; whether the result was shown belongs to proof; what rough code may touch belongs to containment; what becomes of the code belongs to disposal; how the thing itself is to be made belongs to the work returned to.

## Desirable

- **Runs soon:** something runs and prints within the first minutes, and the spike grows outward from there.
- **Shortcuts on purpose:** values are fixed in the code, input is pasted in, everything stands in one file, code is copied, errors are not handled and tests are not written, wherever the answer does not depend on it.
- **Care where the answer is:** the lines that produce the result (the call in doubt, the measurement, the comparison) are written and read with care.
- **Fails loudly:** the code stops at the first error, with its message; nothing is caught and no fallback fills in, so that a failure cannot pass for a result.
- **Checked at the hinge:** where a silent mistake would change the answer (the timer around the wrong call, the loop that never ran, the empty result set), a look or a one-line check shows that the code did what it was meant to do.
- **Result that reads:** the output says what it shows: each number or line carries a label, and the rest is not printed.
- **Quick loop:** a change can be tried within seconds, and where the loop is slow it is shortened before more is tried.
- **Tools at hand:** the language and the tools the user and the project already have are used, unless the tool is the question.
- **Just orderly enough:** where more rounds are to come, the code is kept in a state the next change can be made to, and no better.
- **Short enough to read:** where the user wants to read or run the spike, it is short and plain enough for that in one go.
- **Project's rules set aside:** the project's conventions, its linter and its rules for tests are not applied to the spike, and that is said, so that it is a choice and not an oversight.
- **Left as it is:** once the code has given its answer it is not tidied, renamed or made faster.
- **Care follows stakes:** the more hangs on the answer, the more of the spike counts as the place where the answer is made, and gets care.

## Undesirable

### Falls short

- **Built to last:** the spike has classes, interfaces and a configuration, for one run.
- **Tests for the throwaway:** tests are written for code that will be deleted tonight.
- **Handling for nothing:** errors are caught and input is validated for cases the spike will never meet.
- **Tidied first:** names and structure are reworked before the first result is there.
- **Tooling first:** a formatter, a linter and a build are set up before a line runs.
- **Generality:** parameters and options are added for variants nobody will run.
- **Documented:** the spike gets a README and a comment on every function.
- **Polished for the showing:** layout and wording are worked on, where the question was not how it looks.
- **Slow loop borne:** every try takes minutes, and nobody shortens it.

### Overshoots

- **Wrong by carelessness:** a slip in the spike gives the answer: the timer stops before the work is done.
- **Swallowed failure:** an error is caught and dropped, and the run "went through".
- **Cannot be changed:** the code is such a tangle that the second round means writing it again.
- **Runs once:** the spike leaves state behind that makes the second run differ, or needs steps that nobody wrote down.
- **Unlabeled output:** numbers scroll by, and nobody can say which belongs to what.
- **Shortcut in the question:** the corner that was cut is the one the answer depends on.

### Counterfeits (looks met, is not)

- **"Quick and dirty" as excuse:** the words are used to wave away a doubt about the result.
- **Rough look, long work:** the code looks thrown together and took a day, because it was written three times.
- **Neat, and wrong:** the code is well made, and measures something other than what was asked.
- **Speed claimed:** "this will only take a minute" is said, and the first run comes an hour later.
- **Care for show:** a check stands in the code where nothing could go wrong, and none where the answer is made.
