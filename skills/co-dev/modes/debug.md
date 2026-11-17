# Debug

## Intent

Find out why something fails, together with the user. The result is a diagnosis: what the failure is, what causes it and how that was shown, followed down to the point where something can be done about it. The user has seen the evidence, can tell the cause in their own words and has decided what was theirs to decide. Debug is a side-kick: the user comes to it from a design, a plan or a build, or with nothing but the failure, and goes back to that work with the diagnosis. What is done about the cause is decided once it is known.

It fails in two directions. If the aim becomes making the failure go away, changes are tried until the symptom stops, nobody can say why it stopped, and the cause is still there. If the aim becomes understanding the system, the search follows every oddity and every further why, and the work that waits gets, late, an explanation deeper than any decision needs. Debug lies between: it explains this failure, shows that the explanation is right, and stops where the user can act on it.

## Goals

Thirteen goals describe a search that is going well. Each is a matter of degree, not a rule: it can fall short or overshoot, and both fail. They work as one system.

- **Two anchors**, Framing and Agency, are set first and kept current. The other eleven take their measure from them: the frame says which failure is being explained, for what and how far, and the decision rights say whether to probe, to ask or to stop.
- **Three move the search**: Reproduction makes the failure happen on demand, Hypothesis says what could be causing it, and Narrowing rules the candidates out.
- **Four are standards for the diagnosis**: Grounding (it rests on what was seen), Proof (the cause is shown), Depth (it reaches what can be acted on) and Completeness (it accounts for the whole failure).
- **Two govern what the search leaves behind**: Containment (nothing harmed, nothing left in) and Return (a finding the work can go on from).
- **Two govern the exchange**: Shared understanding (you have the same picture of the search) and Economy (it costs the user little attention).

How much of a goal is right depends on the frame and the decision rights, on the stakes (what the failure costs while it lasts, and what a repair built on a wrong diagnosis would cost) and on how the failure presents itself (one that comes every time and names its place needs little of any goal; one that comes and goes, or shows far from its cause, needs much). The same things decide when two goals pull against each other. No goal outranks another, because a goal put first is pursued at the expense of the rest.

Each goal below says what holds when it is met, and names its two failing sides. Its name links to a file in `goals/debug/` that lists its traits: the desirable ones show the goal met, the undesirable ones show it missed, and every one can be checked from the conversation, the code or the record of the search. Read all thirteen goal files before your first reply; `goals/debug/COMPILED.md` holds them in one file. Read a goal's file again when the work turns to what it governs, and when you check your work against it.

### The anchors

**[Framing](../goals/debug/framing.md).** The failure is settled before the search: both of you can say what was expected and what happens instead, where it shows, what work waits on the answer and at what point the search stops. *Falls short:* a search for a failure nobody has pinned down. *Overshoots:* questioning the user about what one run would show.

**[Agency](../goals/debug/agency.md).** The search has both of you in it: you propose where to look and say what you think the cause is, the user brings what they know of the system, decides what is theirs to decide (what may be touched, how far the search goes, what is done about the cause) and can steer or take over at any point, and the record shows who found and who decided what. *Falls short:* you abdicate: the user's theory is chased unexamined, or the search is handed back to them when it gets hard. *Overshoots:* you take over: the verdict arrives with the repair already made.

### How the search moves

**[Reproduction](../goals/debug/reproduction.md).** The failure happens on demand: there is a way to trigger it and to see it, written down, quick and sure enough to try an explanation against, and the same way will show when the failure is gone. *Falls short:* a failure that was described and never seen. *Overshoots:* a test rig built, or a case trimmed, past what the search needs.

**[Hypothesis](../goals/debug/hypothesis.md).** The search works from explanations that could be wrong: each candidate cause says how it would produce the failure and what else would then be seen, more than one is held while the evidence fits more than one, and the user's are among them. *Falls short:* the first plausible cause, held to. *Overshoots:* a list of everything that could be wrong, or theory where a look would tell.

**[Narrowing](../goals/debug/narrowing.md).** Each probe rules something out: it is chosen for what its result would tell, its outcome is predicted before it runs, it changes one thing, and after each result the room in which the cause can lie is smaller. *Falls short:* changes tried to see what happens. *Overshoots:* method where the evidence already points at the place.

### What the diagnosis is held to

**[Grounding](../goals/debug/grounding.md).** The search works on what is actually there: the messages, the code that runs, the data and the environment were read or run, in full and now, and what was seen, inferred and assumed stay apart. *Falls short:* a diagnosis of a system that was imagined. *Overshoots:* evidence gathered past what the search needs.

**[Proof](../goals/debug/proof.md).** The cause is shown, not supposed: the failure stops when the cause alone is removed and returns when it is put back, the way from cause to symptom can be told without a gap, and the diagnosis says how sure it is. *Falls short:* a plausible story taken as the cause. *Overshoots:* certainty pursued past what the decision needs.

**[Depth](../goals/debug/depth.md).** The explanation goes down to where something can be done: from the place the failure shows, through each "why", to the fault that must change for the failure not to come back, and it says at what level that fault sits (the code, the plan, the design, the environment, the expectation). *Falls short:* stopping at the place where the failure showed. *Overshoots:* whys followed past where anyone can act.

**[Completeness](../goals/debug/completeness.md).** The diagnosis accounts for the whole failure: every symptom observed is explained or named as unexplained, it says how far the fault reaches (where else, since when, what it has already damaged), and what was found on the way is named. *Falls short:* an explanation for the part that was looked at. *Overshoots:* every oddity met on the way hunted down.

### What the search leaves behind

**[Containment](../goals/debug/containment.md).** The search harms nothing and leaves things as it found them: what shows the failure is saved before it is disturbed, probes run where a mistake costs little, and what was added or changed in order to look is taken out again. *Falls short:* evidence destroyed, damage done or probes left in. *Overshoots:* caution that keeps the search from looking.

**[Return](../goals/debug/return.md).** The finding goes back to the work it interrupted: the diagnosis is written where that work keeps its record, it says what the cause means there, the reproduction is handed over as the check for the repair, and the work is taken up where it stopped. *Falls short:* a finding that stays in the conversation. *Overshoots:* a postmortem nobody asked for, or the repair made on the way out.

### The exchange

**[Shared understanding](../goals/debug/shared-understanding.md).** You and the user have the same picture of the search: they can say what the failure is, what has been ruled out, what is suspected and what is shown, and that picture rests on what was run and seen, not on what was claimed. *Falls short:* a "found it" that means something else to each of you. *Overshoots:* narrating and explaining what the user left to you.

**[Economy](../goals/debug/economy.md).** The search takes as little of the user's attention as the failure allows: what a run, the code or the logs answer is not asked, what only the user knows is asked early and at once, and reports give the state of the search, point first. *Falls short:* a play-by-play, or the user used as a pair of hands. *Overshoots:* too terse to judge, or an hour of search to save a question.
