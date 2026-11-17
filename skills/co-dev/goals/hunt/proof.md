# Hunt: Proof

A break is shown, not asserted: it happens on demand by steps that are written down and that someone else can run, what the target did stands beside what the reference says it should do, the trial itself was ruled out as the fault, and the break says how sure it is.

*Falls short:* a break that was seen once, or reasoned from the code. *Overshoots:* a demonstration built for what one command would show.

*Borders:* whether what the target did is wrong belongs to fidelity; whether the trial could have come out either way, and whether its conditions can arise, belongs to trial; cutting the case down and finding its condition belongs to pursuit; whether what ran was the target under hunt belongs to grounding; what the break would cost belongs to weight; handing the steps over as the check for a repair belongs to return.

## Desirable

- **Happens on demand:** before a break is reported as shown, it has been made to happen again from a known start.
- **Written recipe:** the steps, the input, the state and the surroundings that make it happen are written exactly enough that someone else gets the same result.
- **Expected beside observed:** the statement of the reference and what the target actually did (the output, the record, the screen) stand side by side.
- **Clear signal:** a break and a hold can be told apart at a glance: an exit status, one line of output, a number.
- **Trial suspected first:** before a break is reported, the hunt's own part is suspected (a wrong call, a build that is not fresh, leftovers of an earlier trial, a stand-in), and ruled out.
- **Known rate:** for a break that does not always come, how often it comes is known from repeated runs, and said.
- **Seen once said:** a break that could not be made to happen again is reported as seen once, with what was captured and what was tried.
- **Suspected said:** a break that follows from reading and could not be run is reported as suspected, with the trial that would decide.
- **Can be reached:** the recipe uses only what real use, or within the frame someone who means harm, can do, and says how the case is reached.
- **Tried to refute:** for a break that is in the way, a reason why it might not be one is looked for (a guard elsewhere, a setting, a statement of the reference), and what was looked at is said.
- **Stated sureness:** each break says whether it is shown, seen once or suspected, on what that rests and what would settle it.
- **Hold as strong as its trials:** a hold names the trials it rests on, and is not given as "cannot break".
- **Evidence shown:** the user sees the command and what came out, or runs it themselves, not a statement that it was verified.
- **Withdrawn in the open:** a break that turns out to be none is withdrawn in plain words, and is not left to fade.
- **Depth follows weight:** proof is heaviest for the breaks that are in the way, and a small one needs its command and a line of output.

## Undesirable

### Falls short

- **Seen once:** the break came once, was not tried again, and is reported as shown.
- **Reasoned:** "this will fail when two requests arrive together" is reported, and was never run.
- **Unwritten recipe:** the break comes "after using it for a while".
- **Trial at fault:** what was reported as a break was the hunt's own wrong call, or the remains of an earlier trial.
- **No expected:** the output is shown, and nothing says what it should have been.
- **One lucky hold:** a case that depends on timing passed once, and is reported as held.
- **Suspicion pressed:** a suspected break is given as the reason not to go on, and nothing was done to settle it.

### Overshoots

- **Rig for a command:** a harness is built to show what one command shows.
- **Shown again and again:** a break the user has seen and accepted is run a tenth time.
- **Every break proven alike:** each small break gets repeated runs and a rate.
- **Nothing without proof:** a likely break is not mentioned because it could not be made to happen, though the user needs to know of it.
- **Hedged to nothing:** a break that was shown is reported with so many reservations that it says nothing.

### Counterfeits (looks met, is not)

- **Staged break:** the break is shown with a case that cannot reach the target in real use.
- **Another failure:** the recipe fails with a different error than the break it is said to show.
- **Recipe that needs the session:** the steps work only on the state the hunt left behind, and nobody else can get there.
- **Confident wording:** "this definitely corrupts the data" stands in for a run.
- **Claimed run:** "reproduced" is said, and no output shows it.
- **Boilerplate uncertainty:** "may be an issue" is attached to every break, with no word on what would settle it.
