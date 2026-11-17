# Route

The steps follow a route chosen on purpose from the code as it stands to the design built: it can be said in a sentence or two, it was picked from the alternatives where there are any, and its order puts first what the rest depends on, what is least certain and what shows something working.

*Falls short:* no route: the design's sections in the design's order. *Overshoots:* more staging and strategy than the work needs.

*Borders:* how large a step is belongs to decomposition; which priorities the order serves is the user's call, under agency; what happens when a risk comes true belongs to resilience.

## Desirable

- **Stated route:** how the plan gets from here to there is said in a sentence or two, and the steps follow it.
- **Alternatives where they exist:** where more than one serious route exists (in place or alongside, a thin slice first or part by part, one switch or a gradual one), two or three are set out with what each costs, and one is chosen.
- **Fits how the code lives:** the route respects what must keep running, how and when the code is released, and who else is changing it.
- **Dependencies first:** a step comes after everything it needs, and each step names the steps it needs.
- **Uncertainty early:** what could upset the plan (an untried technology, an unclear interface, the assumption most steps rest on) is met before work is built on it, if need be by a trial: a small piece of throwaway work that answers one question.
- **End to end early:** a thin version that runs through every part comes before any part is finished, so that the parts meet early.
- **Value early:** where part of the work is useful by itself, it comes as early as its dependencies allow, in the order of the user's priorities.
- **Old beside new:** where something existing is replaced, the route says how old and new live side by side, when the switch happens and when the old goes.
- **Milestones:** the steps are grouped into a few stages, each ending in something that can be shown, and at which the work could stop and still be worth having.
- **Late where it pays:** a choice that later steps will inform, and that can wait at no cost, is placed late.
- **Marked independence:** steps that do not depend on each other are marked, so that they can be done in any order or side by side.
- **Reasoned order:** where the order is not obvious, or aims for it pull apart (risk first, value first, least rework), the plan says what decided it.
- **Proportion:** a small job gets a short list in the obvious order, with no stages.
- **Revised in the open:** when the code or the user's answer shows a better route, the route changes, and you say what moves with it.

## Undesirable

### Falls short

- **Design order:** the steps follow the sections of the design, or the order in which things came to mind.
- **Layer by layer:** each layer is finished in turn, and the layers first meet at the end.
- **Easy first:** comfortable steps fill the start while the uncertain one waits, and what was built before it has to change.
- **Out of sequence:** a step needs what a later step produces.
- **Big bang:** everything is switched over at once at the end, with no way back.
- **Nothing until the end:** no step before the last leaves anything that can be shown or used.
- **First route taken:** the first workable route is planned, with no look at another where the choice mattered.
- **Unexplained order:** the steps are numbered, and nobody can say why one comes before another.

### Overshoots

- **A campaign for a walk:** stages, milestones and a strategy for a change of a few steps.
- **Invented dependencies:** independent steps are chained, so that nothing can move or run side by side.
- **Needless scaffolding:** flags, parallel running and a gradual switch for a change that could be made at once and reverted.
- **Alternatives for the obvious:** routes are compared where one is plainly right.
- **Show first at any cost:** something showable is pushed forward onto a base that will have to be redone.
- **Frozen route:** the order is kept after the code has shown it wrong.

### Counterfeits (looks met, is not)

- **Fake sequence:** steps are numbered that have no real order, and the builder treats the numbers as one.
- **Slogan route:** "incrementally" or "iteratively" stands in for a route.
- **Thin slice in name:** the first end-to-end step leaves out the hard part, where the risk is.
- **Chapters as milestones:** the stages are named groups of tasks that end in nothing that can be shown.
- **Fitted comparison:** the alternatives are set up so that the preferred route wins.
- **Retrofitted route:** the summary of the route is written afterward, and the steps do not follow it.
