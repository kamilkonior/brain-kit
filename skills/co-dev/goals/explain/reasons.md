# Explain: Reasons

The user knows why the subject is the way it is: what each part that matters is there for, which constraint or decision gave it its shape and whether that still holds, taken from the record where there is one and marked as a guess where there is none.

*Falls short:* what the code does, and nothing on why. *Overshoots:* the history of every line.

*Borders:* how the subject works belongs to model; what a reason means for the change the user has in mind belongs to bearing; whether a reason was read or supposed is settled by grounding; whether a choice was a good one is your view, and belongs to agency; what asking the user costs is counted by economy.

## Desirable

- **What it is for:** each part that matters says what need it serves: what would go wrong, and for whom, if it were not there.
- **Constraint named:** where the shape was forced from outside (a limit of the platform, a contract with a caller, an order that must be kept, a load), the constraint is named.
- **Decision found:** where the shape is a choice, the decision and its reason are looked for where they are recorded: the design, the commit message, the discussion of the change, a comment, the issue.
- **Trade named:** what was given up for what is said, and the alternative that was not taken where the user is weighing it.
- **Odd things accounted for:** a special case, a workaround or a check that seems to do nothing has its reason looked for before it is called needless.
- **Still holding:** it is said whether the reason still holds: the library fault since repaired, the caller since removed, the limit still there.
- **Source marked:** each reason is marked as recorded, as read from the code or as a guess, and a guess says what it rests on.
- **No reason found:** where nothing gives a reason, that is said, with where it was looked for, and "looks like a leftover" is given as a guess.
- **The user asked:** where the record is silent and the user, or someone they can reach, may know, the question is put.
- **Meant and done apart:** what a part was meant to do and what it does are told apart where they differ.
- **Why the change:** a change is explained with the problem it answers and why it answers it this way, taken from its description, its issue or the plan's step, and held against what the change does.
- **In its time:** a choice is told with what was known and available when it was made, where that explains it.
- **Reasons that decide:** the reasons given are those on which the decision or the change turns; a routine line gets none.

## Undesirable

### Falls short

- **What without why:** the account says what each part does, and the user could have read that.
- **Fence taken down:** "this check is redundant" is said, and nobody looked for why it is there.
- **Record unread:** the commit that brought the workaround in says why, and it was not opened.
- **Reason unasked:** the user knew why, and was never asked.
- **How for why:** "why does it retry?" is answered with how it retries.
- **Stale reason:** the reason given held three versions ago, and that is not said.
- **Trade unsaid:** the choice is explained by what it gains, and what it costs is left out.

### Overshoots

- **Archaeology:** the history of each file is researched and told, though the decision turns on none of it.
- **Reason for every line:** routine code is justified statement by statement.
- **Search for the guilty:** the account turns from why the code is so to who wrote it and how badly.
- **Lecture on principles:** the general case for layering is made, where the question was why this layer is here.
- **Counsel for the code:** every choice in it is defended as right, because a reason for it was found.
- **Reason awaited:** the explanation stalls on the search for a reason nobody recorded, where "none found" would do.

### Counterfeits (looks met, is not)

- **Rationalization:** a plausible reason is made up and told as the reason.
- **Principle as reason:** "for separation of concerns" is said of a shape nobody decided on.
- **Comment believed:** the comment's reason is passed on, though the code beside it no longer does what the comment says.
- **"Historical reasons":** these words stand in for a reason nobody looked up.
- **Intent claimed:** "the author wanted to keep it flexible" is said with no source.
- **Summary as reason:** the change's own description is repeated as the why, and was not held against the change.
