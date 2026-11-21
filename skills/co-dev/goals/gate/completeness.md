# Gate: Completeness

The examination covers the whole work, as closely as the stakes require: every change in the examined state, every decision and step, and every claim of the build has been looked at or is named as not looked at, and the closest look goes where a slip would cost most or be hardest to see.

*Falls short:* a sample: some parts read with care, and the rest waved through. *Overshoots:* an audit of every line, whatever it matters.

*Borders:* what a comparison, a test of a claim or a trial must do belongs to fidelity, verification and trial; whether a single finding holds belongs to grounding; how closely the gate is to look at all is set in framing; when the gate ends, and in what, belongs to closure.

## Desirable

- **Every change placed:** each changed file in the examined state was read, was looked at as part of a named batch (generated files, lock files, renames), or is named as not looked at.
- **Lists gone through to the end:** the design's decisions, the plan's steps and the build's claims are each gone through to the last item, not until the first findings.
- **Three questions each:** each part was asked whether it is what was decided, whether what is said about it holds and whether it is well made, and a part asked only one of them is named.
- **Around the code:** migrations, configuration, dependencies, data, documentation and changes to building and releasing are examined like the code.
- **Removed and changed too:** what was deleted and what now behaves differently is examined like what was added.
- **Beyond the main path:** failure handling and edge cases are examined as far as the design names them and reality will bring them.
- **Risk first:** the examination starts where a slip would cost most (data, money, access, what cannot be taken back, where the build struggled), so that a gate cut short has covered that.
- **Same care to the end:** the last parts are examined as closely as their stakes require, not as closely as the remaining time allows.
- **Whole before the return:** the examination is finished before the findings go back, so that the build gets one list and not a first instalment.
- **Early return:** when the first look shows the work far from done (the closing checks fail, steps are open), the gate stops there, says so and returns it, and does not catalogue the defects of unfinished work.
- **Depth map:** the record says which parts were read closely, which were tried and which were passed with a look, and why.
- **Gap hunting:** before the gate closes, the list of changes is gone through against what was examined, for anything that was missed.
- **Named unexamined:** what was not examined, could not be, or was left out on the user's word is named in the record, each with what a slip there would cost.
- **Bounded by the work:** the examination keeps to the change and what the change reaches, and does not tour code that did not change.
- **Final check:** before the outcome is stated, the record says what was compared with what, what was run and what was not.

## Undesirable

### Falls short

- **Sampled:** a few files are read closely, and the gate speaks for the whole.
- **Stopped at the first findings:** three defects are found in the first part, and the work goes back with the rest unread.
- **Trailing off:** the first parts are examined with care, and the last ones in a hurry, or not at all.
- **Code only:** the migration, the configuration and the new dependency are not opened.
- **Additions only:** what was deleted or now behaves differently is passed over.
- **One question:** the work is compared with the plan, and neither the build's claims nor the builder's choices are examined.
- **Easy parts:** the readable parts are read, and the dense one is passed.
- **Silent omission:** a part was skipped, and the record does not say so.

### Overshoots

- **Line by line:** every line gets the closest reading, whatever a slip in it could cost.
- **Every file equal:** generated files and lock files are examined like the logic.
- **Beyond the change:** the gate audits the code around the work, or the whole repository.
- **Whole history:** every commit along the way is examined, including the attempts that were reverted.
- **Every conceivable case:** edges are examined that the design does not name and reality will not bring.
- **Never done:** the gate keeps finding one more thing to look at, and the work waits.

### Counterfeits (looks met, is not)

- **Count as coverage:** "all 42 files reviewed" is said where the reader needed to know how closely.
- **Mention as coverage:** "the configuration changes were also checked" stands for a look that was not made.
- **Batch as a bin:** "various small changes" holds a change in behavior.
- **Claimed check:** "nothing else of note" is said without the gap hunt having been made.
- **Unexamined buried:** what was not looked at is named at the bottom of a long record, or in one blanket sentence.
- **Generic checklist:** every item of a general review checklist is ticked, and the design's own decisions were not gone through.
