# Coherence

The decisions make one design: a central idea and a few principles run through it, and no two parts contradict each other.

*Falls short:* a patchwork. *Overshoots:* one pattern forced on every part.

*Borders:* the words used belong to shared understanding; the arrangement of the write-up belongs to order; what the frame says belongs to framing.

## Desirable

- **Summarizable whole:** a sentence or two states the central idea, and every part follows from it.
- **Stated principles:** a few principles are named, each specific enough to settle a real choice, and it is known which wins when two pull apart.
- **Contradiction checks:** each new decision is checked against the settled ones before it is recorded, and a conflict is raised.
- **Resolved conflicts:** where requirements or goals conflict, the design says which wins and why, and the user has seen the resolution.
- **Ripple tracking:** which decisions rest on which is known; when one changes, what depended on it is revisited, and what existed only to serve it is removed.
- **Consistency across parts:** similar problems are solved in similar ways and rest on the same assumptions about users, scale and conditions.
- **Justified exceptions:** a departure from a principle is deliberate and explained; when exceptions pile up, the principle is reconsidered.
- **Fitting interfaces:** where parts meet, both sides agree, and each responsibility belongs to exactly one part.
- **Every part earns its place:** each part serves a stated goal and connects to another.
- **Integrated contributions:** new parts, and ideas from both of you, are worked into one structure, not laid side by side.
- **Single statement:** each decision is written in one place, and the summary, the detail and the rationale say the same thing.
- **Whole-design review:** at natural points the assembled design is reviewed end to end, with a concrete case traced through every part.
- **Fit with surroundings:** the design agrees with its frame, and with the systems and conventions it has to live among.

## Undesirable

### Falls short

- **Patchwork:** parts designed separately follow different styles, assumptions or rules.
- **Local optimization:** each part is strong alone while the whole works poorly.
- **Bolt-ons:** additions sit on top of the design, or two ideas are both kept though they conflict.
- **Stale dependents:** a part still reflects a decision since changed, or only makes sense under an option that was rejected.
- **Unresolved tension:** conflicting requirements are both kept, for whoever builds the design to sort out.
- **Drift by increments:** in small unchecked steps the design moves away from its frame, or contradicts an early decision that dropped out of view.
- **Mismatched rationale:** the reasons given argue for something other than what was chosen.

### Overshoots

- **Forced uniformity:** one pattern is applied to a part whose requirements differ, or parts are added only for symmetry.
- **Principle worship:** a principle or the central idea is kept where it works against the success criteria, or a good idea is rejected for not fitting it.
- **False unification:** things that only look alike are merged under one invented concept.
- **Elegance over need:** the problem is reshaped, or the inconvenient part deleted, so that the design looks cleaner.
- **Over-coupling:** parts are tied together in the name of unity, so that none can change alone.
- **Constant audit:** the whole design is rechecked every turn, or work stops on a minor mismatch.

### Counterfeits (looks met, is not)

- **Empty principles:** a slogan or principle so general that no decision could violate it.
- **Retrofitted principles:** principles are written afterward to describe whatever was decided.
- **Cosmetic consistency:** uniform format and labels cover parts that work on different logic.
- **Blurred contradiction:** vague wording lets conflicting parts both seem satisfied.
- **Silent resolution:** you pick a side in a conflict without telling the user.
- **Aspirational summary:** a tidy overview describes a design that the parts don't follow.
