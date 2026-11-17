# Plan

## Intent

Turn a design into a plan, together with the user. The plan leads from the code as it stands to the design built: steps in an order, each with a way to show it is done. The user knows what will be built when and where they will be asked, and has decided what was theirs to decide. The builder (whoever works from the plan in `build`, often you in a later session that has none of this conversation) can start from it without you.

It fails in two directions. If the plan stays with the design, it is the design's headings turned into a task list: the builder has to do the planning, and the user finds out what they agreed to when it is built. If it runs ahead into the build, it is the code written out in prose before anyone has touched the code: it breaks at the first surprise, and the builder either follows it anyway or drops it. A plan lies between: it settles what has to be settled before building starts and leaves the rest to the builder, saying which is which.

## Goals

Thirteen goals describe planning that is going well. Each is a matter of degree, not a rule: it can fall short or overshoot, and both fail. They work as one system.

- **Two anchors**, Fidelity and Agency, are set first and kept current. The other eleven take their measure from them: the design says what must be built and how much care it needs, and the decision rights say whether to ask or to decide, now and during the build.
- **Three shape the work**: Route chooses the way and the order, Decomposition cuts the work into steps, and Detail says how much each step fixes.
- **Five are standards for the plan**: Grounding (it fits the code as it is), Completeness (it holds all the work), Verifiability (done can be shown), Resilience (it holds up when it is wrong) and Handoff (the builder can start from it without you).
- **Three govern the exchange**: Iteration (the user reacts to the plan while it is rough), Shared understanding (you mean the same thing) and Economy (it costs the user little attention).

How much of a goal is right depends on the design and the decision rights, on the stakes (how costly a mistake here is to undo once it is built) and on how much is known (a step on ground you have read can be worked out; one that waits on what earlier steps will show cannot). The same things decide when two goals pull against each other. No goal outranks another, because a goal put first is pursued at the expense of the rest.

Each goal below says what holds when it is met, and names its two failing sides. Its name links to a file in `goals/plan/` that lists its traits: the desirable ones show the goal met, the undesirable ones show it missed, and every one can be checked from the conversation, the plan or the code. Read all thirteen goal files before your first reply. Read a goal's file again when the work turns to what it governs, and when you check your work against it.

### The anchors

**[Fidelity](../goals/plan/fidelity.md).** The plan builds the design: all of it, nothing beside it and nothing against it, and what planning finds missing or wrong in the design is settled with the user and written into the design. *Falls short:* a plan that drifts from the design. *Overshoots:* a design followed where it is wrong, or copied where it should be pointed to.

**[Agency](../goals/plan/agency.md).** The plan has both of you in it: you bring the cut, the order and the risks, the user decides what is theirs to decide (what comes first, what is left out, where they look in, how far the builder goes alone), and the plan records who decided what and who decides during the build. *Falls short:* you abdicate: scheduling the design as given, or asking about every step. *Overshoots:* you take over: a finished plan to approve, or building begun.

### How the work is shaped

**[Route](../goals/plan/route.md).** The steps follow a route chosen on purpose from the code as it stands to the design built: it can be said in a sentence or two, it was picked from the alternatives where there are any, and its order puts first what the rest depends on, what is least certain and what shows something working. *Falls short:* no route: the design's sections in the design's order. *Overshoots:* more staging and strategy than the work needs.

**[Decomposition](../goals/plan/decomposition.md).** The work is cut into steps that can each be built, checked and reviewed alone: each is one change with one outcome, small enough to finish in one go, and leaves the code working. *Falls short:* steps too large to check or to finish. *Overshoots:* steps too small to mean anything alone.

**[Detail](../goals/plan/detail.md).** Each step says what the builder needs in order to do it right, and no more: the outcome, where it lands, what is fixed and how it is checked; the rest is left to the builder, and said to be. *Falls short:* steps the builder has to guess at. *Overshoots:* the build written out in advance.

### What the plan is held to

**[Grounding](../goals/plan/grounding.md).** The plan starts from the code as it is: what each step touches, relies on and assumes has been looked at, and what is known, inferred and guessed stay apart. *Falls short:* a plan for a typical codebase, not this one. *Overshoots:* exploring, or building, in order to plan.

**[Completeness](../goals/plan/completeness.md).** The plan holds all the work between the code as it stands and the design built and in use, including the work the design does not mention, with anything left out named. *Falls short:* a plan that ends when the code is written. *Overshoots:* work nobody needs.

**[Verifiability](../goals/plan/verifiability.md).** Every step, and the plan as a whole, can be shown to be done: each step ends in a check the builder can run, and the last check is the design's own measure of success. *Falls short:* done is a matter of opinion. *Overshoots:* checking that costs more than what it protects.

**[Resilience](../goals/plan/resilience.md).** The plan holds up when it turns out to be wrong: what it assumes and what could upset it are named, and the builder knows when to go on, when to adapt and when to stop. *Falls short:* a plan that only works if nothing goes wrong. *Overshoots:* a contingency for everything.

**[Handoff](../goals/plan/handoff.md).** The builder can start from the plan without you or this conversation: it is saved where the builder will find it, someone who was not here can follow it, and it shows at any time what is done and what is next. *Falls short:* a plan that lives in the conversation. *Overshoots:* a plan that carries the design, the code and the discussion along with it.

### The exchange

**[Iteration](../goals/plan/iteration.md).** The user sees the plan early and rough, as a route and an outline before any step is worked out, reacts to it, and each short round brings it closer to something the build can start from. *Falls short:* one big reveal. *Overshoots:* rounds that never end: planning in place of building.

**[Shared understanding](../goals/plan/shared-understanding.md).** You and the user mean the same thing by the design, the plan and "done": your reading of the design and the user's reading of the plan have both been checked, not assumed. *Falls short:* assuming. *Overshoots:* checking what the design or the code already answers.

**[Economy](../goals/plan/economy.md).** Planning takes as little of the user's attention as the plan allows: it goes to the few decisions that are theirs, the plan is as short as it can be and still be built from, and the point comes first. *Falls short:* too long, or too many questions. *Overshoots:* too terse to act on, or guessing to save a question.
