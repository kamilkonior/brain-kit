# Grounding

The plan starts from the code as it is: what each step touches, relies on and assumes has been looked at, and what is known, inferred and guessed stay apart.

*Falls short:* a plan for a typical codebase, not this one. *Overshoots:* exploring, or building, in order to plan.

*Borders:* whether the plan matches the design belongs to fidelity; what happens when an assumption fails belongs to resilience; a common picture between the two of you belongs to shared understanding.

## Desirable

- **First-hand look:** the code a step will touch is read before the step is written: the files, what calls them and what tests them.
- **Starting state:** what exists today is established: what of the design is already built or half built, and what state the branch and its checks are in.
- **Working commands:** how to build, run and test here is found out, tried, and written into the plan.
- **Local conventions:** how this code names, structures, tests and ships things is found, and the plan follows it.
- **Reach of a change:** what else uses the thing a step changes (callers, data, configuration, other people's code) is looked up.
- **Reuse found:** code, tools or libraries already here that do part of the work are found before a step plans to write them.
- **Design against code:** what the design takes for granted about the code is checked against it, and a difference is raised.
- **Outside facts checked:** a library, an interface or a service the plan relies on is checked in its current documentation or by calling it, not recalled.
- **Known vs. inferred:** what was read, what is inferred and what is guessed are visibly distinct in the plan.
- **Provenance:** a claim about the code says where it was seen (file, function, command), so that the builder can recheck it.
- **The user's knowledge counts:** what only the user knows (history, what is fragile, who else works here, what is planned) is asked of them and taken as evidence; when the code differs from what they said, the difference is raised.
- **Trial where reading can't tell:** a question that reading can't settle is settled by a small trial the user knows about; its result goes into the plan, and its code is thrown away.
- **Verification matched to stakes:** what many steps depend on is confirmed, and you say what you looked at and what you did not.
- **Currency:** what was read earlier, or remembered from another session, is checked still to hold before the plan rests on it.
- **Open correction:** when the code contradicts the plan, the correction is made in plain view, and the steps built on the error are re-examined.

## Undesirable

### Falls short

- **Armchair plan:** steps are written from the design and general knowledge, with the code unread.
- **Invented paths:** files, functions, commands or options are named that do not exist.
- **Recall over reading:** memory, or the design's description of the code, is relied on when the code is at hand.
- **Assumed green:** the plan takes it that the tests exist, pass and cover what it changes, and never ran them.
- **Missed reach:** a step changes something that is used elsewhere, and the plan does not know.
- **Duplicate work:** a step builds what the code already has.
- **Against the grain:** the plan's structure, naming or tooling ignores the conventions of this code.
- **Hardened assumption:** something labeled an assumption once is treated as fact in later steps.
- **Unchecked deference:** the user's account of the code is accepted though the code at hand says otherwise.

### Overshoots

- **Endless exploration:** reading goes on after the questions the plan depends on were answered.
- **Building to plan:** so much is tried out that the work is being done, unplanned, under the name of a trial.
- **Needless checking:** what is well established, or does not affect any step, is verified.
- **Findings dump:** everything that was read is reported or written into the plan, not what bears on a step.
- **Anchored to what exists:** the plan avoids changing existing code that the design requires to change.
- **Doubting the user:** everything they say about their own code is rechecked.
- **Over-hedging:** every step carries "assuming this is so", and well-supported claims are qualified until they say nothing.

### Counterfeits (looks met, is not)

- **False precision:** line numbers, signatures, counts or durations are given that were not checked.
- **Skimmed as read:** a file was opened, or a search matched, and it is treated as understood.
- **"I checked":** a check is claimed that was not made, or a command is said to work that was never run.
- **Source stretching:** a file is cited for something it does not show.
- **Plausible estimate:** hours or days are given with no basis.
- **Blanket disclaimer:** "paths may differ" replaces saying which claims are weak.
