# Sequencing

The steps come in an order that works: each rests only on what comes before it, what is risky or teaches most comes early, something that runs exists early and keeps running, and steps that do not depend on each other are marked.

*Falls short:* an order that forces rework, or leaves the hard part and the joining to the end. *Overshoots:* a sequence imposed where there is none.

*Borders:* how the work is cut belongs to decomposition; what happens when a step fails belongs to resilience; the user's say in what comes first belongs to agency; the order of the planning session itself belongs to iteration.

## Desirable

- **Stated route:** the overall route (a thin version end to end first, the old replaced part by part, one component at a time) is stated in a sentence or two with its reason.
- **Compared routes:** where more than one route was open, the plan says which others were considered and why this one was taken.
- **Dependencies first:** no step needs what a later step builds, and each step says which earlier results it relies on.
- **Runs early:** an early step yields something that runs end to end, however thin, and later steps widen it.
- **Working state:** after every step the code builds, the checks that passed still pass and what worked still works; where a step must break something for a while, the plan says so and names the step that restores it.
- **Risk early:** the step most likely to fail, or to change the plan, comes as early as its dependencies allow.
- **Learning early:** a step whose result decides the shape of later ones comes before them, and they say that they wait on it.
- **The user's priorities:** among the orders that work, the one that brings first what the user asked to have first is taken.
- **Joined as built:** parts are connected to each other and to the existing system as they are built, not all at the end.
- **Stages:** steps are grouped into a few stages, each ending in a state the user can look at.
- **Marked independence:** steps that could be done in any order, or at the same time by different builders, are marked, with what each must leave alone.
- **Irreversible late and alone:** a step that is hard to undo (a data migration, a deletion, a public interface) comes after whatever could still change it, and is a step of its own.
- **Named scaffolding:** temporary work (a stub, a flag, a compatibility layer) is named as temporary, with the step that removes it.
- **No silent rework:** no step redoes what an earlier one built, unless the plan calls the earlier one a first version and says why.

## Undesirable

### Falls short

- **Forward reference:** a step uses something that is built later.
- **Joined at the end:** the parts are built separately and first meet in the last steps.
- **Hard part last:** the easy and familiar steps come first while the one that could sink the plan waits.
- **Long dark stretch:** many steps pass before anything can be run or shown.
- **Broken in between:** a step leaves the code not building or the checks failing, and nothing says when that ends.
- **Rework built in:** a later step tears up an earlier one, and the plan does not say so.
- **Colliding parallels:** steps marked independent change the same files or assume different states.
- **Borrowed order:** steps follow the order of the design's sections or of the conversation, not the dependencies.

### Overshoots

- **Invented dependencies:** independent steps are chained, so that one blocked step stops the rest.
- **Scheduling machinery:** dependency graphs, critical paths and phases are drawn up for a plan of a handful of steps.
- **Risk-first dogma:** the hardest step is forced to the front before what it needs exists, built on stand-ins and redone later.
- **Skeleton for its own sake:** an end-to-end scaffold is built first for work that is one small change.
- **Stage inflation:** every second step ends a stage with something to show.
- **Over-split:** work is divided among parallel builders so finely that coordinating them costs more than it saves.

### Counterfeits (looks met, is not)

- **Fake sequence:** steps are numbered that have no real order, or a dependency is stated that is not one.
- **Route as slogan:** "incremental" or "MVP first" is written on a plan whose steps do not follow it.
- **Hollow stage:** a stage "works" only through stand-ins and fixed data, and shows nothing about the real path.
- **Risk dodged:** the risky step comes first in a form that leaves the risk out (the trial skips the hard case).
- **Template order:** the generic order (set-up, back end, front end, tests, documentation) is used whatever this design's dependencies are.
