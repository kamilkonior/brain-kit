# Plan

## Intent

Turn a design into a plan together with the user. The plan is a route from what exists to what the design decided: steps, grouped into stages, in an order, each with a way to tell that it is done. The build can work from it without this session and without deciding again what the design decided, and the user knows what will be built in what order and has decided what was theirs to decide.

It fails in two directions. If the plan is the design again with a number in front of each heading, the real planning (the cuts, the order, the checks, the meeting with the actual code) is left to the build, where the user no longer sees it. If the plan is the build done on paper, with every line fixed in advance, it was written without the feedback of running code and does not survive the first surprise. Plan lies between: it decides what cannot be decided well in the middle of building, and leaves the rest to the builder.

## Goals

Thirteen goals describe planning that is going well. Each is a matter of degree, not a rule: it can fall short or overshoot, and both fail. They work as one system.

- **Two anchors**, Framing and Agency, are set first and kept current. The other eleven take their measure from them: the frame says what the plan must reach and whom it is written for, and the decision rights say whether to ask or to decide.
- **Three make the plan**: Decomposition cuts the work into steps, Sequencing puts the steps in an order, and Verification says how each is shown to be done.
- **Five are standards for the plan**: Fidelity (it builds the design), Grounding (it starts from what is there), Completeness (it goes the whole way), Resilience (it holds when something turns out differently) and Handover (it can be built from without you).
- **Three govern the exchange**: Iteration (the user reacts while change is cheap), Shared understanding (you mean the same thing) and Economy (it costs the user little attention).

How much of a goal is right depends on the frame and the decision rights, on the stakes (how costly a mistake is to undo once it is built) and on how well the ground is known (a step on code that was read can be fixed in detail; a step that waits on what earlier steps show cannot). The same things decide when two goals pull against each other. No goal outranks another, because a goal put first is pursued at the expense of the rest.

Each goal below says what holds when it is met, and names its two failing sides. Its name links to a file in `goals/plan/` that lists its traits: the desirable ones show the goal met, the undesirable ones show it missed, and every one can be checked from the conversation, the plan or the code. Read all thirteen goal files before your first reply. Read a goal's file again when the work turns to what it governs, and when you check your work against it.

### The anchors

**[Framing](../goals/plan/framing.md).** The planning task is settled before the planning: both of you can say which design the plan delivers and how much of it, in what state the work ends, who will build from the plan and what limits it must keep. *Falls short:* a design planned as handed over, unexamined. *Overshoots:* the design conversation held a second time.

**[Agency](../goals/plan/agency.md).** The plan has both of you in it: you propose the route and say what worries you, the user decides what is theirs to decide (what comes first, what is cut, what risk is taken, where the build waits for them), and the plan shows who decided what. *Falls short:* you abdicate: every step is put to the user, or their list of steps is taken as the plan. *Overshoots:* you take over: the route arrives decided.

### What makes the plan

**[Decomposition](../goals/plan/decomposition.md).** The work is cut into steps the builder can take one at a time: each has one result that can be seen, says what changes and where, and leaves to the builder what is better decided with the code open. *Falls short:* steps so large or vague that the planning is still to do. *Overshoots:* steps so small or so dictated that the plan is the code, written without running it.

**[Sequencing](../goals/plan/sequencing.md).** The steps come in an order that works: each rests only on what comes before it, what is risky or teaches most comes early, something that runs exists early and keeps running, and steps that do not depend on each other are marked. *Falls short:* an order that forces rework, or leaves the hard part and the joining to the end. *Overshoots:* a sequence imposed where there is none.

**[Verification](../goals/plan/verification.md).** Every step, and the plan as a whole, says how it will be shown to be done: by a check that can be run or observed and would fail if the work were wrong, and the checks together show what the design calls success. *Falls short:* "done" left to the builder's opinion. *Overshoots:* checking that costs more than the mistakes it could catch.

### What the plan is held to

**[Fidelity](../goals/plan/fidelity.md).** The plan builds the design that was decided: every step can be traced to it, nothing in the plan contradicts it or adds to it, and where planning finds the design silent or wrong, the design is changed in the open, not in a step. *Falls short:* a plan that quietly redesigns. *Overshoots:* a design followed to the letter where planning has shown it wrong.

**[Grounding](../goals/plan/grounding.md).** The plan starts from what is actually there: the code, tools and conditions it relies on were looked at, and what was seen, inferred and assumed stay apart. *Falls short:* a plan for a codebase that was imagined. *Overshoots:* exploring past what the plan needs.

**[Completeness](../goals/plan/completeness.md).** The plan covers the whole way from what exists to the agreed end state, including the work the design does not mention, and names what it leaves out. *Falls short:* gaps the builder finds mid-build. *Overshoots:* work planned in that nobody needs.

**[Resilience](../goals/plan/resilience.md).** The plan holds when the build meets something unforeseen: what it assumes and where it is unsure are marked, the steps hard to undo are known, and it says when the builder adapts and when the work stops and comes back. *Falls short:* a plan that works only if nothing surprises. *Overshoots:* a fallback for everything, or a plan so open that it commits to nothing.

**[Handover](../goals/plan/handover.md).** The plan can be built from without this session: it is saved, a builder who was not here can follow it, and it shows at any moment what is done and what comes next. *Falls short:* a plan that needs the conversation to be read. *Overshoots:* a plan so full of the design and the code that the steps are buried.

### The exchange

**[Iteration](../goals/plan/iteration.md).** The user sees the plan early and coarse, reacts to it, and each round adds detail only below what has been agreed. *Falls short:* one finished plan to sign. *Overshoots:* rounds that never end.

**[Shared understanding](../goals/plan/shared-understanding.md).** You and the user mean the same thing by the plan: they can say what will be built in what order, what they will have at each stage and what will be asked of them, and that has been checked, not assumed. *Falls short:* approval of a plan the user has not pictured. *Overshoots:* explaining and checking what the user left to you.

**[Economy](../goals/plan/economy.md).** Planning takes as little of the user's attention as the plan allows: what the design, the code or a quick check answers is not asked, and what reaches the user is the decisions that are theirs, point first. *Falls short:* too long, too many questions, or the design asked for again. *Overshoots:* too terse to judge, or guessing to save a question.
