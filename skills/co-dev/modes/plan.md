# Plan

## Intent

Simulate execution before paying its cost, together with the user — charting a safe trajectory from the current system to an agreed goal or shape until it holds against reality: it cuts work at natural seams into observable increments with clear intent and contracts, orders them to keep the system whole and reversible while front-loading risky assumptions and keeping independent work parallel, pre-commits each step to a check that could fail, names non-goals, cut lines, and tripwires to pause, adapt, or return to the user, and stays sharp up front while leaving later detail to earlier results. Mapping the path exposes hidden work, true cost, or unresolved design choices early enough to simplify, trim scope, redesign, or stop before coding. Plan ends when the user sees and commits to the scope, sequence, and risks, written down to survive interruptions and guide a builder who was not there.

It falls short when steps dodge the hard work or punt design choices to the builder, a happy-path order breaks the system or saves surprises for the end, checks or re-plan triggers are missing, or the commitment is not the user's. It overshoots when it builds on paper — dictating local code, fixing what only earlier steps can show, chaining independent work, or piling up fallbacks for cheap, unlikely problems.

## Goals

These goals hold here as well. Read each file in full:

- `../shared/fidelity.md`
- `../shared/verification.md`
- `../shared/coherence.md`
- `../shared/robustness.md`

#### Decomposition

The work is cut into steps that someone who was not there can take one at a time, each with one result that can be seen.

*Falls short:* steps so large or vague that the planning is still to do. *Overshoots:* steps so small or dictated that the plan is the code, written without running it.

Why: whatever a step leaves undecided, the builder decides alone, mid-task, with less to go on than the planner had.

**Desirable**

- **Vertical slice:** the work is cut into slices, each a piece of behaviour that can be seen to work.
- **Cut at the seams:** within a slice, the steps divide where the code and the design divide.
- **Commander's intent:** a step says what it is for, so that whoever builds it can adapt when the code differs from what was expected.
- **Exit criteria:** each step names the check that will show it done, one that would fail if it were not.
- **What, not how:** a step fixes what is costly to rediscover or dangerous to get wrong, and leaves the rest to whoever builds it.
- **Contract:** what one step builds and another uses is written exactly, and once.
- **Rolling wave:** steps that depend on what earlier ones reveal are coarser, and are detailed when they are reached.

**Undesirable**

- **Micromanagement:** names and structure inside a step are dictated, though nothing outside the step depends on them.
- **Salami slicing:** steps are cut so thin that none has a result of its own.
- **Passing the buck:** a choice that needed the user or the design is left to whoever builds the step.

#### Sequencing

The steps come in an order that works: each rests only on what comes before it, and the system keeps working between them.

*Falls short:* an order that forces rework, or leaves the joining to the end. *Overshoots:* a sequence imposed where there is none.

Why: the wrong order breaks the system between steps and leaves the surprises for the end, when changing course costs the most.

**Desirable**

- **Topological order:** no step needs what a later step builds.
- **Walking skeleton:** the first slice runs from end to end, however thin, and later slices widen it.
- **Keep the build green:** after every step the code builds, and what passed before still passes.
- **Expand and contract:** where something live changes, the new is added first, then use moves over, then the old is removed.
- **Long-lead items:** what waits on someone else is started early.

**Undesirable**

- **Painted into a corner:** an early step leaves a later one no way through without tearing it up.
- **False dependency:** independent steps are chained, so that one blocked step stops the rest.

#### Resilience

The plan holds when the build meets something unforeseen: it says where the work can pause, when it adapts and when it stops and comes back.

*Falls short:* a plan that works only if nothing surprises. *Overshoots:* a fallback for everything.

Why: most mistakes in building can be put right. The ones that cannot, and the surprise nobody stopped for, are what a plan has to see coming.

**Desirable**

- **Pre-mortem:** the few things most likely to go wrong are named beforehand, each with the sign that it is happening and what is done then.
- **Canary:** each assumption the plan rests on has a step that would show early if it is false.
- **Tripwire:** the findings that stop the work and send it back to the user are named in the plan.
- **Decision point:** where later steps hang on an earlier result, the fork is in the plan, with the result that picks each branch.
- **Timebox:** a step that may grow has a stated limit, and the plan says what happens when it is reached.
- **Cut line:** what is dropped first, if the work proves larger than thought, is agreed in advance.

**Undesirable**

- **Belt and braces:** fallbacks are planned for what is unlikely or cheap to put right.
