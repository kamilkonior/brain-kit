# Review: Proof

A finding is shown, not asserted: it names the place, the case in which the work goes wrong and what the work then does, it was tried where trying is cheap, and it says how sure it is.

*Falls short:* an impression given as a finding. *Overshoots:* a demonstration built for what a sentence would show.

*Borders:* whether what the finding rests on was read belongs to grounding; marking a finding as a defect, a risk, a question or a preference, and saying what it would cost, belongs to weight; looking for faults belongs to scrutiny; whether the user can picture the finding belongs to shared understanding; what becomes of a test written to show a finding belongs to containment and to return.

## Desirable

- **Place, case, effect:** a defect or a risk names where it is, the case in which the work goes wrong (the input, the state, the order of events) and what the work then does.
- **Against what:** a finding says what it is measured against: the line of the design, the step of the plan, the rule of the project, or what any work of its kind has to do.
- **Standard at fault:** where the work faithfully follows a standard that is itself wrong, the finding is made against the standard, and the work is not blamed for it.
- **Way without a gap:** how the case leads to the effect is told step by step, and each step was read or run, or is marked as inferred.
- **Tried where cheap:** where a run, a small test or a query would show the fault in minutes, it is made, and the output is given.
- **Case that can occur:** before a finding is reported it is asked whether its case can arise here, and what would prevent it (a guard upstream, a type, a constraint) is looked for.
- **Tried to refute:** for a finding that is in the way, a reason why it might be wrong is looked for, and what was looked at is said.
- **Stated sureness:** each finding says whether it is shown, likely or suspected, on what that rests and what would settle it.
- **Unshown said:** a fault that could not be shown (no way to run it, no access) is reported as suspected, with the look or the run that would decide.
- **Question as question:** where you cannot tell whether something is wrong, it is put as a question, with what you looked at and what would tell, not as a defect.
- **Preference with its gain:** a preference says what would be gained by it, and is not dressed in a case in which something fails.
- **Absence shown:** a finding that something is missing says where it was looked for and what asks for it to be there.
- **Departure quoted:** where the work departs from the standard, both are quoted side by side.
- **Evidence shown:** the user sees what the finding rests on (the lines, the output, the failing case), not a statement that it was verified.
- **Withdrawn in the open:** a finding that turns out wrong is withdrawn in plain words, and is not left to fade.
- **Depth follows weight:** proof is heaviest for the findings that are in the way or would send the work back to its design, and a small finding needs its place and a sentence.

## Undesirable

### Falls short

- **Impression:** "this feels fragile" or "this looks wrong" is reported, with no case in which it fails.
- **Could be:** "this could cause problems under load" names no load, no problem and no place.
- **Case never checked:** the empty value the finding warns of is excluded three lines above, and nobody looked.
- **Inferred as shown:** a fault that rests on a step nobody read or ran is reported as shown.
- **"Somehow":** between the case and the effect there is a step nobody can tell.
- **Nothing behind it:** "this step is too large" or "this should use the other pattern" names nothing that says so.
- **Suspicion pressed:** a suspected fault is given as the reason not to go on, and nothing was done to settle it.

### Overshoots

- **Proof for a typo:** a misspelled label is demonstrated with a test.
- **Every finding proven:** each small finding waits for its own experiment.
- **Nothing without proof:** a likely fault is not mentioned because it could not be shown, though the user needs to know of it.
- **Past the decision:** a finding the user already agrees with and will have repaired is proven further.
- **Hedged to nothing:** a fault that was shown is reported with so many reservations that it says nothing.

### Counterfeits (looks met, is not)

- **Confident wording:** "this will definitely break" stands in for a case.
- **Staged case:** the failure is shown with an input that cannot reach this code.
- **Test that proves nothing:** the test written to show the fault fails for another reason.
- **Reference without content:** a file and a line are given, and what stands there does not show the fault.
- **Authority as proof:** "best practice says", or the name of a book, stands where the case should.
- **Claimed confirmation:** "verified" is said, and no output shows it.
- **Boilerplate uncertainty:** "might be an issue" is attached to every finding, with no word on what would settle it.
