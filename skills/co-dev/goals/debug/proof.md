# Debug: Proof

The cause is shown, not supposed: the failure stops when the cause alone is removed and returns when it is put back, the way from cause to symptom can be told without a gap, and the diagnosis says how sure it is.

*Falls short:* a plausible story taken as the cause. *Overshoots:* certainty pursued past what the decision needs.

*Borders:* excluding the other candidates belongs to narrowing; whether each fact used was observed belongs to grounding; whether the explanation covers every symptom belongs to completeness; how far down the cause is followed belongs to depth; whether a trial change stays in belongs to agency, and taking it out to containment.

## Desirable

- **On and off:** the failure is made to stop by removing the cause alone, and to return by putting it back.
- **Smallest change:** the change that removes the cause is the smallest that does, so that the effect cannot be due to something else in it.
- **Same reproduction:** the stopping and the returning are shown on the reproduction that showed the failure, on the path where the failure lives.
- **Way without a gap:** how the cause leads to the symptom is told link by link, and each link was observed or is marked as inferred.
- **Predicted, then seen:** the explanation predicted something that had not yet been looked at, and looking confirmed it.
- **Tried to break:** a result that would refute the explanation is looked for, and what was tried is said.
- **No rival standing:** no other candidate that fits the evidence is left untested, or the one that is left is named.
- **Why it worked before:** where the thing once worked, the explanation says what changed.
- **Enough runs:** for a failure that comes and goes, its absence is shown over enough runs to mean something at the known rate.
- **Stated sureness:** the diagnosis says whether the cause is shown, likely or a guess, on what that rests and what would change it.
- **Unproven said:** where proof is out of reach (the failure cannot be reproduced, the system cannot be touched), the cause is given as likely, with the observation that would settle it.
- **Evidence shown:** the user sees the output with the cause in and with the cause out, not a statement that it was confirmed.
- **Trial marked:** a change made in order to prove the cause is called a trial, and is not the repair until the user says so.
- **Depth follows stakes:** proof is heaviest where a wrong diagnosis would be costly (a migration, a release, a change to the design), and light where the repair is small and its own check would tell.

## Undesirable

### Falls short

- **Explained, not shown:** a cause is announced with confidence, and was never tested.
- **Went away:** the failure stops after a change, the change is called the cause, and it was never put back.
- **After, therefore because:** the failure began after the release, so the release is given as the cause.
- **"Somehow":** between the cause and the symptom there is a step nobody can tell.
- **Rival standing:** another explanation fits the evidence as well, and was not tested.
- **One good run:** a failure that comes one time in ten is called explained after one run without it.
- **Shown elsewhere:** the cause is shown in a stand-in, and the real path was not run.

### Overshoots

- **Certainty for the trivial:** a misspelled name is proven with rounds of removing and restoring.
- **Past the decision:** more is proven after the user could already act, and would act the same.
- **Every rival to the ground:** unlikely alternatives are each excluded by an experiment of their own.
- **No name without proof:** no likely cause is given because none is proven, though the user needs a working answer.
- **Hedged to nothing:** a cause that was shown is reported with so many reservations that it says nothing.

### Counterfeits (looks met, is not)

- **Broad change as proof:** a large change makes the failure stop, and is taken to show which of the things in it was the cause.
- **Masked:** the symptom is suppressed (a retry, a caught error, a longer wait), and its absence is offered as proof.
- **Passed by coincidence:** the failure stops because of something else that happened meanwhile (a restart, a cleared cache), and the change gets the credit.
- **Story that fits:** the explanation covers the facts because it was shaped to them, and it predicted nothing.
- **Confident wording:** "the root cause is" stands in for evidence.
- **Claimed confirmation:** "confirmed" is said, and no output shows the failure stopping and returning.
- **Boilerplate uncertainty:** "this is likely the cause" is attached to every finding, with no word on what would settle it.
