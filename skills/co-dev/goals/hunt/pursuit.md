# Hunt: Pursuit

What shows is followed up: an odd result is looked into until it is a break, a hold or a question, a break is brought down to the smallest case that makes it happen and to the conditions on which it depends, its neighbors are tried, and the pursuit stops at the way the target breaks, short of the cause.

*Falls short:* an oddity passed over, or a break left as it was stumbled on. *Overshoots:* one break run down to its cause, or through every variation, while the rest of the ground waits.

*Borders:* the ideas that led to the trial belong to suspicion; whether the break can be shown again by written steps belongs to proof; whether it is a break by the reference belongs to fidelity; what it would cost belongs to weight; whether the rest of the ground still gets its trials belongs to coverage; why the target breaks belongs to a search for the cause, outside the hunt.

## Desirable

- **Oddities noted:** anything unexpected (a warning, a pause, a value that looks off) is noted when it is seen, also when the trial was about something else.
- **Oddity settled:** each oddity noted is followed until it is a break, a hold or a question for the user, or is put on the list as open.
- **Made to happen again:** before anything is built on a break, it is made to happen a second time.
- **Smallest case:** steps, input and state that do not matter are taken away, as far as that makes plain what the break needs.
- **Condition found:** what the break depends on is found by changing one thing at a time: "any name longer than 255 bytes", not "this file".
- **Edge found:** where the break begins and where it ends is found: the smallest size, the first step, the one setting.
- **Named as a way:** the break is stated as a way of breaking (the condition in general, and what the target then does), with the case that was run as its example.
- **Neighbors tried:** the same condition is tried on what is made alike: the other endpoints, the other formats, the sibling command.
- **Yielding ground gets more:** a part that gave one break gets further trials, since breaks keep company.
- **What follows tried:** what the target does after the break (recovers, stays down, keeps a wrong record) is tried and said.
- **One way, one break:** cases that break in the same way under the same condition are one break with its cases listed.
- **Shared cause as a guess:** that two breaks probably have one cause is said as a guess, since the cause was not looked for.
- **Hidden ground named:** where a break keeps what lies behind it from being tried, that is said, and what could not be reached is named.
- **Short of the cause:** why the target breaks is not searched for; where the output names it plainly, it is given in a line, as what the output says.
- **Bounded:** a pursuit has a limit that follows the weight of what it may find; at the limit the break is reported as far as it is known.
- **Proportion:** a break that shows on every run of one command needs no trimming.

## Undesirable

### Falls short

- **Passed over:** a warning or a wrong-looking value shows during a trial about something else, and is never looked at.
- **Explained away:** an oddity is called "probably the environment" or "a fluke", and nobody looked.
- **As stumbled on:** the break is reported as the twelve steps in which it was met, and nobody knows which of them matter.
- **Case as break:** "fails for report.csv" is reported, and nobody found that it is any file whose last line is empty.
- **Edge unknown:** "fails for large inputs" is reported, and nobody found how large.
- **Neighbors untried:** the break is found at one endpoint, and the four made the same way are not tried.
- **Moved on at once:** the break is noted and the hunt moves on, and the part that gave it gets no further trial.
- **Twelve for one:** the same way of breaking is reported once per case, and looks like twelve breaks.

### Overshoots

- **Cause hunted:** the break is traced into the code to its root, and the hunt waits.
- **Every variation:** the break is shown with thirty more inputs after its condition was plain.
- **Trimming for its own sake:** the case is cut down further though it already fits in a line.
- **Side track:** an oddity that bears on no promise is followed for an hour.
- **Stuck on one part:** the part that yields takes all that is left of the cost, the rest goes untried, and nobody decided that.
- **Repair worked out:** the pursuit goes on into how the break should be fixed.

### Counterfeits (looks met, is not)

- **Trimmed away:** the small case breaks for another reason than the one first seen.
- **Guessed condition:** "it fails on non-ASCII names" is said after one failing name, and no other was tried.
- **Cause as way:** "a race" is given in place of the condition under which the target breaks and what it then does.
- **One cause claimed:** three breaks are reported as one, "surely the same bug", and the cause was never looked at.
- **"Could not make it happen again":** this is concluded after one try.
