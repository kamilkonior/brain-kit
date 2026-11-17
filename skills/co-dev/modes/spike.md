# Spike

## Intent

Answer a question about something that does not exist yet, by building just enough of it to see, together with the user. The result is an answer: what was asked, what was built and run, what came out, how far that holds for the real thing and what it means for the decision that waited. The user has seen the spike run or tried it themselves, can tell the answer and its limits in their own words and has decided what was theirs to decide. The code is not part of the result: it was written to be thrown away, and it is. Spike is a side-kick: the user comes to it from a design, a plan or a build, or with nothing but the question, and goes back with the answer. What is designed, planned or built on the answer is decided once it is known.

It fails in two directions. If the aim becomes the code, the spike is made like the thing itself: the whole of it where one part was in doubt, with the care of code that is meant to last, and by the time it runs it is too good to throw away, so it stays, and the work is built on shortcuts nobody decided. If the aim becomes something that runs, a toy is put together and run once on the easy case, far from what the real thing will meet, "it works" is said (or, when the first attempt breaks, "it cannot be done"), and the work goes on resting on an answer the spike could not give. Spike lies between: it builds what the question turns on and nothing else, takes care only where the answer depends on it, reads the answer off what was seen, and keeps the answer, not the code.

## Goals

Twelve goals describe a spike that is going well. Each is a matter of degree, not a rule: it can fall short or overshoot, and both fail. They work as one system.

- **Two anchors**, Framing and Agency, are set first and kept current. The other ten take their measure from them: the frame says what is to be found out, for what and at what cost, and the decision rights say whether to try, to ask or to stop.
- **Three make the spike**: Focus says what is built, Roughness how well, and Limit for how long.
- **Two are standards for the answer**: Realism (it holds for the real thing) and Proof (it is shown).
- **Three govern what the spike leaves behind**: Containment (nothing harmed, nothing mixed into the work), Disposal (the code goes) and Return (the answer stays, in the work that waited on it).
- **Two govern the exchange**: Shared understanding (you have the same picture of the spike) and Economy (it costs the user little attention).

How much of a goal is right depends on the frame and the decision rights, on the stakes (what the decision that waits would cost if it were made on a wrong answer, and whether it can then be taken back; no spike is worth more than that) and on the question itself (whether a library can read one file is answered by one call, and needs little of any goal; whether an approach holds under the real load, or how a thing will feel to those who use it, is answered only close to the real conditions, and needs much). The same things decide when two goals pull against each other. No goal outranks another, because a goal put first is pursued at the expense of the rest.

Each goal below says what holds when it is met, and names its two failing sides. Its name links to a file in `goals/spike/` that lists its traits: the desirable ones show the goal met, the undesirable ones show it missed, and every one can be checked from the conversation, the spike and its output, or the written answer. Read all twelve goal files before your first reply; `goals/spike/COMPILED.md` holds them in one file. Read a goal's file again when the spike turns to what it governs, and when you check your work against it.

### The anchors

**[Framing](../goals/spike/framing.md).** The question is settled before the code: both of you can say what is to be found out and what decision waits on it, what result would count as which answer, how much the spike may cost and what becomes of its code. *Falls short:* "let's try it", with no question a result could answer. *Overshoots:* a question worked over for longer than the spike would take.

**[Agency](../goals/spike/agency.md).** The spike has both of you in it: you propose what to try and how, say what you expect and what you make of the result, the user brings what they know of the real conditions and what matters to them, decides what is theirs to decide (what is tried and how far, what the answer means for the work, what becomes of the code) and can steer, try it themselves or take over at any point, and the record shows who found and who decided what. *Falls short:* you abdicate: the user's idea is tried as given though it cannot answer the question, or the output is handed over unread. *Overshoots:* you take over: the answer arrives as a decision already made, or as the real thing already built.

### What makes the spike

**[Focus](../goals/spike/focus.md).** The spike builds what the question turns on, and nothing else: the part in doubt is built first and for real, what it needs around it is faked, fixed by hand or left out, and of the spikes that could answer, the cheapest is run. *Falls short:* a small version of the whole thing, with the question somewhere in it. *Overshoots:* a spike cut down so far that the part in doubt is no longer in it.

**[Roughness](../goals/spike/roughness.md).** The code is as rough as the answer allows: it takes the shortest way to something that runs, shortcuts are taken on purpose wherever the answer does not depend on them, and care is spent where a mistake in the code would be a mistake in the answer. *Falls short:* throwaway code made like code that is meant to last. *Overshoots:* code so careless that its result cannot be trusted.

**[Limit](../goals/spike/limit.md).** The spike has an end and keeps to it: it stops when the question is answered, when the agreed cost is used up it comes back to the user with what is known so far, and going on is decided, not drifted into. *Falls short:* a spike that runs on, past its answer or past what the answer is worth. *Overshoots:* a spike broken off at the first obstacle, or by the clock one run short of its answer.

### What the answer is held to

**[Realism](../goals/spike/realism.md).** The answer holds for the real thing: wherever the answer depends on it, the spike meets what the real thing will meet (the library in the version in use, data of the real size and kind, the place it will run, the person who will use it), where it does not, the difference is named, and the answer says for what it holds. *Falls short:* an answer about a toy, given as an answer about the real thing. *Overshoots:* real conditions rebuilt for a question that does not depend on them.

**[Proof](../goals/spike/proof.md).** The answer is shown, not supposed: it is read off a run that could have come out the other way, held against the bar that was set before the run, a no is told apart from a spike that did not work, and the answer says how sure it is. *Falls short:* "it works", after one run of the easy case. *Overshoots:* certainty pursued past what the decision needs.

### What the spike leaves behind

**[Containment](../goals/spike/containment.md).** The spike stays apart from the work and harms nothing: it is built where it cannot be taken for the work, what it installs, writes and starts stays out of the project and away from anything real unless the user gave their word, and what it set up is cleared away when it ends. *Falls short:* the spike mixed into the work, or harm done outside it. *Overshoots:* isolation and caution that cost more than the spike.

**[Disposal](../goals/spike/disposal.md).** The code goes when the answer is had: it is marked as a spike from its first line, its shortcuts are known, and at the end it is deleted, or kept by name outside the work on the user's word; what the work takes from the spike it takes as knowledge, and builds anew under its own rules. *Falls short:* a spike that lives on, in the tree or as the beginning of the real thing. *Overshoots:* what the spike taught, thrown away with its code.

**[Return](../goals/spike/return.md).** The answer goes back to the work that waited on it: it is written where that work keeps its record (the question, what was tried, what came out and how far it holds), it says what the answer means there, and the work is taken up where it stopped. *Falls short:* an answer that stays in the conversation, or goes with the code. *Overshoots:* a report nobody asked for, or the real thing begun on the way out.

### The exchange

**[Shared understanding](../goals/spike/shared-understanding.md).** You and the user have the same picture of the spike: they can say what was asked, what in the spike is real and what is faked, what came out and how far that holds, and that picture rests on what they saw run or tried themselves, not on what was claimed. *Falls short:* an "it works" that means something else to each of you. *Overshoots:* narrating and explaining what the user left to you.

**[Economy](../goals/spike/economy.md).** The spike takes as little of the user's attention as the answer allows: what the code, the documentation or a run answers is not asked, what only the user knows (the real conditions, what matters to them) is asked early and at once, and reports give the answer, point first. *Falls short:* a play-by-play, or the user used as a pair of hands. *Overshoots:* too terse to judge, or an hour of trying to save a question.
