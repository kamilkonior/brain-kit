# Debug: Reproduction

The failure happens on demand: there is a way to trigger it and to see it, written down, quick and sure enough to try an explanation against, and the same way will show when the failure is gone.

*Falls short:* a failure that was described and never seen. *Overshoots:* a test rig built, or a case trimmed, past what the search needs.

*Borders:* what the failure is, and what was expected, belongs to framing; which probe is run against the reproduction belongs to narrowing; showing that the failure comes and goes with the cause belongs to proof; side effects of running the failure belong to containment; handing the reproduction over as the check for the repair belongs to return.

## Desirable

- **Seen first-hand:** the failure is made to happen and watched before anything is concluded about it.
- **The user's way first:** the steps the user gave are tried as given before another way to the failure is invented.
- **As reported:** the reproduction shows the symptom that was reported (the same message, the same wrong value), not a failure near it.
- **Written recipe:** the steps, the input, the state and the environment that trigger the failure are written exactly enough that someone else gets the same result.
- **Known rate:** how often the recipe fails (every time, one run in ten) is known from repeated runs, and a failure that does not always come is run often enough to tell.
- **Clear signal:** failing and passing can be told apart at a glance: an exit status, one line of output, a number.
- **Quick loop:** the reproduction is made short enough to run after every probe, by cutting the way to the failure down to what triggers it.
- **Trimmed as far as it helps:** input, steps and settings that do not affect the failure are taken out, as far as that speeds the search or points at the cause.
- **Working case beside it:** a case close to the failing one that works (the last good version, another input, another machine) is found, so that the two can be compared.
- **Real path:** the reproduction runs on the path where the failure lives; where it runs in a stand-in (a unit test, a copy of the data), what differs is said.
- **Conditions captured:** what the failure depends on (data, configuration, versions, time, order) is recorded with the recipe.
- **Still failing:** after the code or the environment has changed during the search, the reproduction is run again before anything is concluded from a later result.
- **Unreproducible said:** when the failure cannot be made to happen, that is said, with what was tried, and the search goes on from what the failure left behind (logs, a dump, the data).
- **Trap set:** for a failure that cannot be forced, logging or a check is put in place, on the user's word, that will capture it when it next comes.
- **Kept:** the reproduction is kept in a form that can be run again when a repair is made (a test, a script, the written recipe).
- **Proportion:** a failure that shows on every run of one command needs no more reproduction than that command.

## Undesirable

### Falls short

- **Never seen:** the search runs on the description of the failure, and nobody has watched it happen.
- **Another failure:** the reproduction fails with a different error than the one reported, and is taken for it.
- **Once is enough:** a failure that comes and goes is called reproduced after one failing run, or gone after one passing run.
- **Slow loop:** every try takes a full build and ten clicks, and nobody shortens it.
- **Unwritten recipe:** the failure comes "when you click around for a while".
- **Nothing to compare:** no working case is looked for, though one was at hand.
- **Works here:** the failure does not come on your machine, and that closes the matter.
- **Lost reproduction:** the steps are not kept, and when the repair comes nobody can show the failure it removes.

### Overshoots

- **Rig for a glance:** a harness is built for a failure whose message names its line.
- **Trimming for its own sake:** the case is cut down further after the cause is in view.
- **Reproduce or nothing:** the search stalls on forcing a rare failure, though the logs it left would tell.
- **Environment rebuilt:** a copy of production is set up where a unit test would trigger the failure.
- **Watched again:** the failure is run many more times with nothing new asked of it.

### Counterfeits (looks met, is not)

- **Staged failure:** the failure is produced by a set-up that cannot occur in real use, and called the reproduction.
- **Trimmed away:** the small case fails for another reason than the original did.
- **Stand-in only:** the failure shows against a mock or sample data, and the real path was never run.
- **"Cannot reproduce":** this is concluded after one try in one environment.
- **Claimed run:** "I reproduced it" is said, and no output shows it.
