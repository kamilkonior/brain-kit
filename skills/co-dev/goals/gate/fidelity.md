# Gate: Fidelity

The work is compared with what was decided, in both directions: the design decision by decision and the plan step by step against the code, and every change in the code against the steps, so that what was dropped, added, changed or built against a limit is found, whether the build's record names it or not.

*Falls short:* only the departures the build admits are found. *Overshoots:* the plan's wording enforced where it left room, or the design decided again.

*Borders:* whether what the build says about the work is true belongs to verification; how well the builder used the room they were given belongs to craft; what the work does when it is run belongs to trial; who answers a departure belongs to sorting; whether every decision and every change was gone through belongs to completeness.

## Desirable

- **Decision by decision:** each decision of the design is looked for in the code, and is found built, built differently or not built.
- **Step by step:** each step in the build's extent is compared with the code: the result it states, the places it names, and what it writes exactly (a signature, a format, a name).
- **From the code back:** every change in the examined state is traced to a step or a decision, and what serves none is found.
- **Change set from the history:** what changed is taken from the comparison between the starting state and the examined state, not from the list of steps or the commit messages.
- **Criteria traced:** each success criterion of the design is tied to the code that meets it, or named as met by nothing.
- **Limits checked:** the design's constraints and exclusions and the plan's limits (what must keep working, what must not be used or touched) are each looked for in the code, as kept or broken.
- **End state compared:** the end state the plan names (merged, migrated, documented, the old path removed) is compared with what is there, including the work around the code.
- **New commitments found:** a dependency, a cost, a permission, stored data or an interface others will rely on that the build added is found, and compared with what the plan named.
- **Stand-ins found:** stubs, fixed values, "not implemented" and open markers are searched for in what is called done.
- **Silence mapped:** where the design and the plan were silent and the code had to choose something the user will feel (a default, a limit, a message, what happens on failure), the choice is found and listed.
- **Recorded departures confirmed:** each departure in the plan's record is found in the code as recorded, with who decided it; one the user decided is not a finding.
- **Unrecorded departures found:** a difference between a decision and the code that the record does not name is found, and named as unrecorded.
- **Amendments read:** where the plan or the design was changed during the build, the history shows whether it was changed before the code and on whose word, or fitted to the code afterward.
- **Meaning, not label:** a step counts as built when the code does what the step says, not when a file, a function or a commit carries its name.
- **Room respected:** where the plan left a matter to the builder, a choice that reaches the step's result is not a departure.
- **Disagreements found:** where the design, the plan and the code say different things about the same subject, the difference is named, not averaged away.
- **Proportion:** a build of three steps is compared in three looks, and no matrix is drawn up for it.

## Undesirable

### Falls short

- **Record trusted:** only the departures the plan's record lists are looked at, and the code was never compared with the design.
- **Plan only:** the steps are compared with the code, and the design they came from is not opened.
- **One direction:** the decisions are found in the code, and nobody looks at what the code holds beyond them.
- **Label matching:** a step counts as built because a commit and a file carry its name.
- **Features only:** what the work should do is compared, and the limits, the exclusions and the decided behavior on failure are not.
- **Stowaway passed:** an option, an endpoint or a behavior nobody decided goes through unremarked.
- **Stub passed:** an interface with no body, or sample data standing in for real data, is counted as the step.
- **Drift passed:** the code builds something near the decision (a simpler variant, a familiar pattern), and near is taken for the same.

### Overshoots

- **Letter enforced:** a difference from a step's wording is reported as a departure where the plan left the matter to the builder.
- **Design decided again:** a decision of the design is reported as a flaw of the work, because the gate would have decided otherwise.
- **Rejected option revived:** something the design considered and turned down is reported as missing.
- **Settled departure reopened:** a departure the user decided during the build is reported as a finding once more.
- **Beyond the decision:** the work is held to requirements nobody decided ("it should also support").
- **Trace bureaucracy:** every helper is required to map to a numbered step, and those that do not are reported as unexplained.

### Counterfeits (looks met, is not)

- **Checklist ticked:** each decision is marked "implemented", and the mark rests on finding a name, not on reading what the code does.
- **Claimed comparison:** "the work matches the design" is said without the comparison having been made.
- **Fitted plan accepted:** the plan was edited after the code to say what the code does, and the gate compares the code with that.
- **Report compared:** the design is compared with the build's account of the code, not with the code.
- **Count for content:** "all twelve steps verified" is offered where the question was what differs.
- **Builder's word kept:** a dropped decision enters the gate's record as "simplified" or "deferred", as the build called it.
