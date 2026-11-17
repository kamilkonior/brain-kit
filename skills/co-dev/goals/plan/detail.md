# Detail

Each step says what the builder needs in order to do it right, and no more: the outcome, where it lands, what is fixed and how it is checked; the rest is left to the builder, and said to be.

*Falls short:* steps the builder has to guess at. *Overshoots:* the build written out in advance.

*Borders:* who may decide what is left open belongs to agency; whether the files and functions named exist belongs to grounding; the check itself belongs to verifiability.

## Desirable

- **Outcome over method:** a step states what must be true at its end; the way there is given only where the way matters.
- **Where it lands:** the files, modules or interfaces the step is expected to touch are named, as a starting point and marked as one.
- **Fixed points:** what the builder must not decide differently is stated with its reason: a design decision, an interface other steps rely on, a convention of this code.
- **Left open by name:** what the builder is to decide is said to be theirs, with the intent that should guide it.
- **Purpose in a line:** each step says what it is for, so that the builder can judge a case the plan did not foresee.
- **Bounds:** where a step could be read as larger than it is, it says what it does not do.
- **Needs listed:** what the step needs before it starts (an earlier step's result, an access, an answer from the user) is listed.
- **Detail follows cost:** more is said where a mistake is costly or hard to see (data, security, an interface others rely on), less where the work is routine.
- **Detail follows knowledge:** steps on ground that has been read are worked out; steps that wait on what earlier ones will show stay in outline, with the point at which they are worked out.
- **Pattern to follow:** where the code already does something similar, the step points to it instead of describing how.
- **Traps passed on:** what you found that the builder would trip over (a hidden caller, a required order, a misleading name) is written into the step that will meet it.
- **Exact where others depend on it:** a name, a schema, a message format or a command that other steps or systems rely on is given exactly.
- **Same shape:** every step has the same few fields in the same order, and a field that does not apply is left out.
- **Written for the builder:** the level assumes a capable builder who has the design and the code and none of this conversation.
- **Read as the builder:** each step is read as by someone who was not here: could they start, and would they know when to stop?

## Undesirable

### Falls short

- **Title-only steps:** "add caching", with nothing on where, to what end or what counts as done.
- **Method without outcome:** the step lists actions and never says what must be true afterward.
- **Decisions passed down:** a choice that shapes other steps, or that was the user's, is left for the builder to make alone in the middle of the work.
- **Unmarked openness:** the builder cannot tell whether silence means "your call" or "forgotten".
- **Private context:** a step leans on the session: "the approach we discussed", a label that is defined nowhere.
- **Withheld trap:** something you learned from the code, which the builder will run into, is not in the plan.
- **No bounds:** nothing says where the step stops, and it grows into its neighbors.

### Overshoots

- **Code in prose:** the step dictates the implementation line by line, or contains code that was never run.
- **Frozen guesses:** things that only show while building (a helper's name, the exact place of a change) are fixed in advance, and the builder must follow a wrong guess or break with the plan.
- **Everything fixed:** so much is marked as not to be changed that the builder cannot adapt to what the code shows.
- **Flat detail:** routine steps are spelled out as fully as the dangerous ones.
- **Far steps in full:** steps that rest on unknowns are worked out as if known, and have to be rewritten.
- **Restated code:** the plan describes at length what the existing code does, where a pointer would do.
- **Tutorial:** the step explains what a capable builder already knows.

### Counterfeits (looks met, is not)

- **Detail by volume:** long step descriptions hold nothing a builder could act on.
- **Template fill:** every field is present and filled with generic text ("follow existing patterns", "handle errors").
- **"As appropriate":** "update the tests as needed" looks like latitude and is a gap.
- **Snippet as specification:** a code sample stands in for saying what is required, and nobody knows which part of it is essential.
- **Fixed without reason:** something is marked fixed with no reason, so that the builder cannot tell when it stops applying.
