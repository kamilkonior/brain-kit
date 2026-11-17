# Refactor

## Intent

Change the structure of existing code while what the code does stays the same, and show that it does, together with the user. The result is the same behavior in a new shape. The shape serves what the refactoring was for: the change that waited can now be made simply, or the code can be read and worked on. Every result, effect and error that someone relies on is as it was, and that is shown by checks that passed before the change, pass after it, and would have failed had the behavior changed. The user has seen the evidence, can find their way in the new shape, knows what was shown and what was not, and has decided what was theirs to decide. Refactor is a side-kick: the user comes to it from a design, a plan or a build, or with nothing but the code, and goes back with the code in its new shape. Its change stays in the work, and it is a change of structure only. What the code should do differently (a fault found on the way, the change that waited) is decided once it is known.

It fails in two directions. If the aim becomes better code, the code is rewritten: much of it at once, toward the shape you happen to like, with faults repaired and behavior "improved" on the way and the tests adjusted until they pass, and the user is handed a diff too large to read and a "nothing changed" that rests on nobody's evidence. If the aim becomes changing nothing, the structure that stood in the way is still there: names and files have moved, a new layer wraps the old code, the old way and the new one stand side by side, every accident of the old code is kept as if someone relied on it, and the change that waited is no easier than before. Refactor lies between: it changes the shape as far as its purpose needs, in steps small enough that each can be seen to keep the behavior, shows that it did, and stops.

## Goals

Thirteen goals describe a refactoring that is going well. Each is a matter of degree, not a rule: it can fall short or overshoot, and both fail. They work as one system.

- **Two anchors**, Framing and Agency, are set first and kept current. The other eleven take their measure from them: the frame says which code changes shape, for what and what must stay the same, and the decision rights say whether to decide, to ask or to stop.
- **Three move the refactoring**: Target says what shape the code is to get, Baseline pins down what it does before it is touched, and Increment takes it from the one shape to the other in steps that each keep it working.
- **Four are standards for the result**: Grounding (it fits what is there), Preservation (the code does what it did), Proof (that is shown) and Completeness (the new shape goes the whole way).
- **Two govern what the refactoring leaves behind**: Containment (nothing changed but what was to change) and Return (code the work can go on from).
- **Two govern the exchange**: Shared understanding (you have the same picture of the refactoring) and Economy (it costs the user little attention).

How much of a goal is right depends on the frame and the decision rights, on the stakes (what a change in behavior that slipped through would cost once it runs for real or is built on, and whether a revert then undoes it) and on the code itself (a rename that a tool carries out, in code the compiler checks and the tests run through, needs little of any goal; a change to the shape of code that has no tests, that is used from places nobody can list, or that handles money, data or access, needs much). The same things decide when two goals pull against each other. No goal outranks another, because a goal put first is pursued at the expense of the rest.

Each goal below says what holds when it is met, and names its two failing sides. Its name links to a file in `goals/refactor/` that lists its traits: the desirable ones show the goal met, the undesirable ones show it missed, and every one can be checked from the conversation, the code, its checks or its history. Read all thirteen goal files before your first reply; `goals/refactor/COMPILED.md` holds them in one file. Read a goal's file again when the refactoring turns to what it governs, and when you check your work against it.

### The anchors

**[Framing](../goals/refactor/framing.md).** The refactoring is settled before the code is touched: both of you can say which code is to change shape and what for, what it does that must stay the same and for whom, how far the change goes and at what point it stops. *Falls short:* "clean this up", carried out as handed over. *Overshoots:* questioning the user about what a reading of the code would show.

**[Agency](../goals/refactor/agency.md).** The refactoring has both of you in it: you propose the shape and the way to it and say what you see in the code, the user brings what they know of the code's history and of those who use it, decides what is theirs to decide (the shape their code is to have, how far the change goes, what counts as the same, what is done about a fault found on the way) and can steer or take over at any point, and the record shows who decided what. *Falls short:* you abdicate: the user's sketch is carried out though the code speaks against it, or every rename waits for a yes. *Overshoots:* you take over: the user's code comes back in a shape they did not choose.

### How the refactoring moves

**[Target](../goals/refactor/target.md).** The refactoring knows where it is going: what in the present structure stands in the way of the purpose is pointed to in the code, the shape aimed at is named before the code is touched, it is the smallest change of structure that serves the purpose, and at the end the thing it was for is easier. *Falls short:* code moved about, and nothing easier for it. *Overshoots:* a structure built for needs nobody has.

**[Baseline](../goals/refactor/baseline.md).** What the code does is pinned down before it is touched: checks exercise the code to be changed through what its users see, they have been seen to pass on the code as it was and would fail if it did something else, and where they do not reach, the gap is closed or named before the change. *Falls short:* a structure changed with nothing that would notice. *Overshoots:* a harness heavier than the change, or checks that pin the very structure that is to change.

**[Increment](../goals/refactor/increment.md).** The refactoring advances in small steps that each keep the code working: a step is one change of structure, it is checked and recorded before the next begins, and a step that breaks something is taken back, not patched forward. *Falls short:* a rewrite: everything taken apart at once, and nothing that works until all of it does. *Overshoots:* ceremony around every rename.

### What the result is held to

**[Grounding](../goals/refactor/grounding.md).** The refactoring works on the code that is actually there: the code to be changed, everything that uses it and the reasons for its present shape were read or searched out, now, and what was seen, inferred and assumed stay apart. *Falls short:* a refactoring of code that was imagined, or whose users nobody looked for. *Overshoots:* the codebase studied past what the change touches.

**[Preservation](../goals/refactor/preservation.md).** The code does what it did: for everyone who relies on it, results, effects and errors are the same after the change as before, the interfaces they use keep their form unless a change was agreed, and what ought to be different (a fault, a rough edge, a missing case) is reported and left. *Falls short:* behavior that drifts under the name of cleanup. *Overshoots:* every accident of the old code kept, so that its shape cannot change.

**[Proof](../goals/refactor/proof.md).** That the behavior is the same is shown, not supposed: the same checks, unchanged, pass on the code as it now stands as they passed before, what they cannot show is shown another way or named as not shown, and the claim says what it covers and how sure it is. *Falls short:* "no change in behavior", on your word. *Overshoots:* certainty pursued past what a slip would cost.

**[Completeness](../goals/refactor/completeness.md).** The new shape goes the whole way within the agreed extent: every user of the old structure is brought over, the old is removed and does not stay beside the new, what goes with the code (tests, documentation, comments, configuration) follows, and what was left as it was is named. *Falls short:* two structures where there was one. *Overshoots:* the last occurrence chased where the old form does no harm.

### What the refactoring leaves behind

**[Containment](../goals/refactor/containment.md).** The refactoring changes only what it was to change, and can be taken back: the user's work in progress and the work of others on the same code are kept, what lies outside the agreed extent is left as it was, nothing that was put in only to look or to compare stays behind, and each step can be reverted. *Falls short:* a change that spills past its extent, or runs over work in progress. *Overshoots:* caution that keeps the shape from changing.

**[Return](../goals/refactor/return.md).** The code goes back to the work that waited for it: the history shows the refactoring as changes of structure and nothing else, the record of that work is brought up to date where it names what has moved, the user is told what has which shape now, what was shown and what was found and left, and the work is taken up where it stopped. *Falls short:* a new shape that the waiting work does not know of. *Overshoots:* a report nobody asked for, or the waiting change made on the way out.

### The exchange

**[Shared understanding](../goals/refactor/shared-understanding.md).** You and the user have the same picture of the refactoring: they can say what shape the code has now and where to find what they knew, what was shown to be the same and by what, and what was not shown, and that picture rests on what they saw of the change and its checks, not on what was claimed. *Falls short:* a "nothing changed" that means something else to each of you, or code the user no longer finds their way in. *Overshoots:* walking the user through every move.

**[Economy](../goals/refactor/economy.md).** The refactoring takes as little of the user's attention as the change allows: what the code, its history or a run answers is not asked, the change reaches the user sorted (what a tool moved apart from what was judged, a pattern once and not in every instance), and reports give the result, point first. *Falls short:* two thousand changed lines to read through, or a question at every rename. *Overshoots:* too terse to judge, or guessing to save a question.
