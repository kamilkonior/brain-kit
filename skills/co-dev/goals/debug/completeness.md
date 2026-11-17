# Debug: Completeness

The diagnosis accounts for the whole failure: every symptom observed is explained or named as unexplained, it says how far the fault reaches (where else, since when, what it has already damaged), and what was found on the way is named.

*Falls short:* an explanation for the part that was looked at. *Overshoots:* every oddity met on the way hunted down.

*Borders:* which failure is to be explained belongs to framing; whether the cause was shown belongs to proof; how far down the cause is followed belongs to depth; where the diagnosis is written and what happens to the open items belongs to return.

## Desirable

- **Every symptom matched:** each observation in the frame (every message, every wrong value, the "only on Tuesdays") is held against the explanation, one by one.
- **Unexplained named:** what the explanation does not account for is listed as unexplained, not left out.
- **Odd fact kept:** an observation that does not fit stays in view until it is explained or named as open.
- **More than one cause:** where the symptoms do not all follow from one fault, a second is looked for, and it is said which symptom belongs to which.
- **Where else:** other places that hold the same fault (the same call, the same pattern, the same assumption) are searched for and listed.
- **Since when:** how long the fault has been there is established, where that decides what it touched.
- **Damage:** what the failure has already done (wrong records written, messages sent, results passed on) is established, or named as not established.
- **Who else:** the other users, environments and callers the fault affects are named.
- **Neighbors sorted:** failures reported alongside this one are each sorted: same cause, or not.
- **Other faults noted:** a fault found on the way that is not the cause is noted for the user in a line, and neither chased nor repaired.
- **Not looked at:** the diagnosis says what was not examined, where a reader would take it to have been.
- **Closed threads:** a question raised during the search is answered or put on the open list before the end.
- **Final check:** before the diagnosis is called done it is compared with the frame's statement of the failure and its question, and you say what was compared and what was not.
- **Bounded by need:** how far the reach is looked into follows what the decision about the repair needs.

## Undesirable

### Falls short

- **Partial fit:** the cause explains the crash and not the slow start that came with it, and that is not said.
- **Inconvenient fact dropped:** an observation that does not fit is left out of the diagnosis.
- **First fault wins:** a real fault is found and declared the cause, though it does not produce the reported symptom.
- **One of several:** the search ends at the first cause, and the failure is still there after the repair.
- **Reach unasked:** the same fault sits in three other handlers, and nobody looked.
- **Damage unasked:** the records written wrongly in the meantime are not mentioned.
- **Silent omission:** something was not looked at and is not mentioned.
- **Premature "found":** the diagnosis is declared because the session ran long.

### Overshoots

- **Every oddity:** each warning and curiosity met on the way gets an investigation of its own.
- **Audit:** the search for "where else" becomes a review of the codebase.
- **Nothing may stay open:** the diagnosis is held back for a leftover that changes no decision.
- **Forensics unasked:** a full account of the damage is drawn up where nothing was written.
- **Moving finish line:** the failure to be explained grows as the search goes on.

### Counterfeits (looks met, is not)

- **"Probably unrelated":** an observation is set aside with these words, and was not checked.
- **Stretched explanation:** the cause is said to explain the other symptoms too, and no way from it to them is told.
- **Mention as coverage:** "there may be other places" is written, and none was looked for.
- **Catch-all clause:** "and possibly other factors" stands in for a second cause nobody found.
- **Claimed check:** "this explains everything" is said without the comparison having been made.
