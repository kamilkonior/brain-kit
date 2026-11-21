# Walkthrough

## Intent

Take the user through what was built, so that they can judge it. What judging takes is spread over the code, its history and the records of the design, the plan and the build; the walkthrough brings it together into one account and takes the user through it at the work itself. The result is that the user understands the work and how it fits together, knows what was decided without them and what they are taking on trust, and has accepted the work or said what must change. The accepted work is then introduced in writing to someone who was not there, such as a team member reading the pull request.

It fails in two directions. If the walkthrough is the build's report told again, the user hears what went well, in the builder's words, and accepts work they could not describe, with decisions in it that they never saw. If the walkthrough is the material laid out (every file, every commit, every record), nothing is brought together, and the judging becomes a review the user must do alone, knowing less than the builder does. Walkthrough lies between: it brings together what the judgment needs, shows it at the work itself, says where its own knowledge ends, and leaves the verdict to the user.

## Goals

Fourteen goals describe a walkthrough that is going well. Each is a matter of degree, not a rule: it can fall short or overshoot, and both fail. They work as one system.

- **Two anchors**, Framing and Agency, are set first and kept current. The other twelve take their measure from them: the frame says which work is judged, against what and for whom, and the decision rights say what is yours to settle in the telling and what is the user's to judge.
- **Four move the walkthrough**: Synthesis brings the material together into one account, Order takes the user through it, Verdict closes it in their judgment, and Introduction carries the accepted work to the reader who was not there.
- **Five are standards for the account**, as it is told to the user and as it is written for the reader: Grounding (it is true to what is there), Completeness (it covers the whole work), Disclosure (it says what was decided without the user), Verification (it says what was shown and what is taken on trust) and Candor (it gives the weak parts their weight).
- **Three govern the exchange**: Inquiry (the user examines the work, not only hears about it), Shared understanding (you have the same picture of the work) and Economy (it costs the user little attention).

How much of a goal is right depends on the frame and the decision rights, on the stakes (what an accepted mistake costs once the work is merged or released, and whether it can be taken back) and on how far the work is from what the user last saw (a part built as planned and shown at a stage needs a line; one that departs from the plan, or was built out of their sight, needs more). The same things decide when two goals pull against each other. No goal outranks another, because a goal put first is pursued at the expense of the rest.

Each goal below says what holds when it is met, and names its two failing sides. Its name links to a file in `goals/walkthrough/` that lists its traits: the desirable ones show the goal met, the undesirable ones show it missed, and every one can be checked from the conversation, the introduction, the records, the code or its history. Read all fourteen goal files before your first reply; `goals/walkthrough/COMPILED.md` holds them in one file. Read a goal's file again when the walkthrough turns to what it governs, and when you check your work against it.

### The anchors

**[Framing](../goals/walkthrough/framing.md).** The walkthrough task is settled before the walkthrough: both of you can say which work is being judged and in what state, what it is judged against, how closely the user wants to look and what their acceptance leads to, and who will read the introduction. *Falls short:* a tour of whatever the build left, measured against nothing. *Overshoots:* an interview before anything is shown.

**[Agency](../goals/walkthrough/agency.md).** The walkthrough has both of you in it: you choose what to show and say what you see in the work, including what speaks against it, the user decides what is theirs to decide (what they accept, what must change, what they take on trust, what goes out under their name) and can steer the walkthrough at any point, and the record shows who judged what. *Falls short:* you abdicate: the material is laid out and finding what matters is left to the user. *Overshoots:* you take over: the work is argued for, and the verdict arrives decided.

### How the walkthrough moves

**[Synthesis](../goals/walkthrough/synthesis.md).** What the judgment needs is brought together from where it lies: the code, its history, the design and the plan with its record are joined into one account of the work, which says what it does, what parts it is made of, how they connect to each other and to what was there, and why it is this way. *Falls short:* an inventory: files, commits and records gone through one by one. *Overshoots:* a picture so worked over that the code cannot be found in it.

**[Order](../goals/walkthrough/order.md).** The walkthrough follows an order in which each thing can be understood and judged when it is reached: the whole before its parts, what the work does before how it does it, what most needs the user's judgment while their attention is fresh, and it is always clear where the walkthrough stands. *Falls short:* a tour in the order of the files, the commits or the build. *Overshoots:* an agenda held to whatever the user asks.

**[Verdict](../goals/walkthrough/verdict.md).** The walkthrough ends in the user's judgment, in a form that can be acted on: what was raised along the way is gathered and sorted (must change before the work is accepted, may follow later, stands as it is), the user accepts the work or says what must change, and the verdict is written down with the state it covers. *Falls short:* a walkthrough that trails off, or a "looks good" taken as acceptance. *Overshoots:* a verdict pressed for before the user is ready.

**[Introduction](../goals/walkthrough/introduction.md).** The accepted work is introduced in writing to someone who was not there: the text says what the work does and why, how it fits together, what was decided along the way, what was checked and what was not, and where a reader should look; it stands without the session, has the form of the place it goes to, and goes out in words the user stands behind. *Falls short:* a title and a list of commits. *Overshoots:* the walkthrough written out in full.

### What the account is held to

**[Grounding](../goals/walkthrough/grounding.md).** The account is true to what is there: what it says about the work was read in the code as it now stands or seen in a run, what the records say was checked against the code, and what was seen, inferred and taken from the records stay apart. *Falls short:* an account of the work as it was reported, meant or remembered. *Overshoots:* an audit of every line before a word is said.

**[Completeness](../goals/walkthrough/completeness.md).** The account covers the whole work as far as the judgment needs: every change in the judged state is accounted for, every decision of the design and every step of the plan has its place in the work or is named as not built, and what the walkthrough did not go through is said. *Falls short:* a tour of the highlights. *Overshoots:* every line shown, whatever it matters.

**[Disclosure](../goals/walkthrough/disclosure.md).** The user knows what was decided without them: the calls made on their behalf in the plan and the build, the departures from the design and the plan, and what was added, dropped or left open are in front of them, each with what it means for them, who decided and why, the weightiest first. *Falls short:* decisions the user finds later, or never. *Overshoots:* every small call of the builder put up for judgment.

**[Verification](../goals/walkthrough/verification.md).** The user knows what stands behind the claim that the work works: what matters most they see run now, on the judged state; for the rest they are told which check showed it, who ran it and when; and what nothing shows is named as taken on trust. *Falls short:* "it works" passed on as it was reported. *Overshoots:* everything proved again in front of the user.

**[Candor](../goals/walkthrough/candor.md).** The account gives the work its true weight: where it is weak, unfinished, unusual or likely to give trouble is said plainly and without being asked, with the room it deserves, and what went well is not made more of than it is. *Falls short:* a success story. *Overshoots:* doubts and apologies piled up until the real weak points are lost.

### The exchange

**[Inquiry](../goals/walkthrough/inquiry.md).** The user examines the work, not only hears about it: the walkthrough comes in portions they can stop at, their questions are answered from the code and the records, they can open, run and try any part themselves, and what they ask steers what comes next. *Falls short:* a lecture. *Overshoots:* a question session in which the user must know what to ask.

**[Shared understanding](../goals/walkthrough/shared-understanding.md).** You and the user have the same picture of the work: they can say in their own words what it does, how it fits together, where it departs from what was decided and what they are taking on trust, and that has been checked, not assumed. *Falls short:* an acceptance of work the user could not describe. *Overshoots:* teaching and testing what the user left to you.

**[Economy](../goals/walkthrough/economy.md).** The walkthrough takes as little of the user's attention as the judgment allows: what the code, its history or the records answer is not asked, the user's time goes to what needs their judgment, and each portion gives its point first. *Falls short:* a tour at full length, or a decision asked on everything. *Overshoots:* too terse to judge, or a disclosure cut to save time.
