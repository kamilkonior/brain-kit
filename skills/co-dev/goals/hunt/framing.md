# Hunt: Framing

The hunt is settled before the first trial: both of you can say what was built and in what state it is hunted, which reference says what is right, what waits on the result, how far the hunt goes and what may be done to the target on the way.

*Falls short:* "try to break it", taken as handed over, with nothing that says what is right. *Overshoots:* a test plan drawn up where a first trial would show where to go.

*Borders:* running the target and reading the reference belong to grounding; how the reference is used in a verdict belongs to fidelity; who decides what may be attacked and what is right where the reference is silent belongs to agency; whether the agreed ground was covered, and when the hunt ends, belongs to coverage; how much a break matters for what waits belongs to weight; keeping to what may be done to the target belongs to containment.

## Desirable

- **Target in hand:** what is hunted is something both of you can point to and run (the command, the endpoint, the screen, the branch and commit), not "the feature" or "the new code".
- **State established:** which state is hunted (the build, the version, the configuration, the data it starts with) is established from the target itself, and said.
- **Finished as claimed:** how much of the target its maker calls finished is established, and what is known to be unfinished is left out of the hunt, with that said.
- **Reference named:** what says what is right is named and at hand: the design, the plan's checks, an interface contract, the documentation, an earlier version whose behavior must be kept, a rule the user states ("no order is charged twice").
- **Missing reference stated:** where nothing says what is right, that is raised before the first trial, and a reference is stated with the user in a few lines and written down; where a few lines will not do, the hunt waits for a design.
- **General promises agreed:** what the target must do whatever it is given, and the reference does not say (fail with a message, lose no data, show nothing to one who may not see it), is agreed in a line and counts as part of the reference from then on.
- **Order among references:** where more than one reference is named, it is said which rules when they disagree.
- **Extent agreed:** which promises of the reference and which ways into the target are hunted is agreed, and is told apart from what is only used to get there.
- **Conditions of use:** who will use the target, with what data, how much of it and where, and whether someone who means harm can reach it, is established or asked.
- **What waits:** what the target goes on to (a merge, a release, the next stage built on it, a decision to rely on it) and what there depends on the result are stated.
- **The question:** what the hunt has to answer is agreed: how the target breaks at all, whether it holds under one concern the user names, or whether a repair holds beyond the case it was made for.
- **Cost agreed:** how much the hunt may cost before it comes back to the user is agreed, and follows what a break would cost once the target is relied on.
- **Rules of the hunt:** where the target may be run, what may be filled, deleted, loaded or brought down, and what may not be touched, is taken from the work the target came from, and agreed where that is silent.
- **Already known:** known breaks, stated limits, listed omissions and what the target's own checks already try are collected before the first trial.
- **Maker established:** who made the target (you, the user, someone else) is established and said.
- **Working frame:** the frame is used during the hunt to judge whether a result belongs to this hunt.
- **Enough to start:** framing matches the size and risk of the target and stops when there is enough to begin; one function with a plain contract starts after a line.
- **Revisited frame:** when the hunt shows that the extent, the reference or the question was off, it is changed in the open.

## Undesirable

### Falls short

- **As handed over:** the hunt starts from "see if you can break it", and nobody said against what.
- **No reference:** the target is hunted against the hunter's sense of how it ought to behave, because what it was to do was never established.
- **Wrong state:** another build is hunted than the one that will go on: the server started before the last change, the branch before its last commits.
- **Unfinished hunted:** a target still in motion is hunted as done, and the breaks are what its maker had on their list.
- **Unknown purpose:** nobody asked what waits on the result, and a target about to be released is hunted like a sketch.
- **Use unasked:** the target is tried for one user and a hundred rows, and nobody asked that it will meet thousands of both.
- **Known breaks found again:** time goes into breaks that stand in the work's own list of open items.
- **Unknown rules:** the shared test system is filled and brought down by habit, because nobody established what was agreed.
- **No end agreed:** nothing says how far to go, so the hunt ends when the session does.
- **Frame drift:** the hunt slides from the feature to the system around it, and nobody says so.

### Overshoots

- **Interview:** the user is questioned about what the target, its reference or one run would show.
- **Test plan first:** a full list of cases is written and agreed before anything was run, and the first trial would have redirected half of it.
- **Reference written first:** a whole specification is drawn up for a target whose reference lacked two lines.
- **Kick-off ceremony:** one small function gets a talk about extent, cost and rules.
- **Endless reframing:** the question is put again after every break.

### Counterfeits (looks met, is not)

- **Restated request:** "I'll try to break the importer" is given back as the frame, with nothing made exact.
- **Reference in name:** "expected behavior", "should work correctly" or "common sense" stands in for a reference that can be pointed to.
- **Target as its own reference:** what the target does now, or what its own tests assert, is named as the reference, and nobody decided that it is right.
- **Smuggled answer:** the request already holds the answer ("just confirm that it is solid"), and is taken over as the frame.
- **Hollow end:** "until we are confident" stands in for a cost or a ground that can be checked.
- **Assumed rules:** "I'll run it against staging" is announced as if it had been agreed, and was never asked.
- **Moved question:** the question is adjusted afterward to the one the hunt happened to answer.
- **Shelved frame:** the frame is agreed and never used to leave a result out.
