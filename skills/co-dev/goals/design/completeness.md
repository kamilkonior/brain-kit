# Design: Completeness

The design covers everything the request needs and can be used as it stands, with anything left out named.

*Falls short:* gaps left for the user to find. *Overshoots:* work and detail nobody needs.

*Borders:* the reasons behind decisions are recorded under durability; the facts behind claims belong to grounding; tracking what is settled and open belongs to order.

## Desirable

- **Agreed finish line:** what the design must cover, and to what depth, is agreed early and fits what the design is for (a sketch to explore, a specification to build from).
- **Map of the territory:** the areas and questions the design must cover are listed, not left to come up by chance.
- **Requirement tracking:** every stated requirement, and those the task implies, can be pointed to in the design.
- **Beyond the happy path:** failures, edge cases and misuse that could realistically occur are covered, each with what happens next.
- **Whole lifecycle:** setup, the transition from the current state, operation, change and retirement are covered.
- **Everyone affected:** those who use, run, maintain or approve the design are each considered.
- **Qualities:** cost, performance, security, privacy, accessibility and upkeep are covered as far as each applies.
- **Connections:** how the parts hand over to each other, and to what surrounds them, is designed along with the parts.
- **Depth follows stakes:** detail goes where a mistake would cost most, and no part is thin because effort ran out.
- **Usable as it stands:** a reader could take the next step without coming back to ask: no placeholders, nothing that lives only in the conversation, a way to check that the design works, and a first step.
- **Named gaps:** omissions, open questions, deferred items, risks and known limits are written down, each with its reason and who or what closes it.
- **Gap hunting:** what is missing is looked for on purpose: a realistic case walked end to end, the question "what have we not talked about?", the design imagined as having failed.
- **Closed threads:** a question raised along the way, or by a decision, is answered or put on the open list before the end.
- **Bounded by need:** nothing is in the design that no stated need calls for.
- **Final check:** the result is compared with the original request before it is called done, and you say what was checked and what was not.

## Undesirable

### Falls short

- **Partial answers:** only the easy, first or interesting part is handled, and later parts trail off.
- **Silent omission:** something is skipped, or never raised, without mention.
- **Premature "done":** work is declared finished while pieces are missing, or because the conversation ran out of energy.
- **Hand-waving:** a hard part is covered by a sentence saying that it will be handled.
- **Deferred hard parts:** the difficult decisions are left for later, for the builder or for the design's users.
- **Requirement drift:** a constraint set at the start is forgotten by the end.
- **Only what was mentioned:** the design covers what the user brought up and nothing else.

### Overshoots

- **Exhaustiveness for its own sake:** every conceivable case is covered, burying the ones that matter.
- **Scope creep:** the work expands into things nobody asked for, or into needs nobody has.
- **Over-specification:** details are fixed that this stage doesn't need, or that are better left to whoever builds the design.
- **Nothing may stay open:** a decision is forced that cannot or need not be made yet.
- **Flat depth:** the trivial gets the same thoroughness as the critical.
- **Gold-plating:** polishing continues past fit for use, and the finish line keeps moving.
- **Checklist march:** a generic template is worked through whether or not its sections apply, and the user is worn out with coverage questions.

### Counterfeits (looks met, is not)

- **Empty sections:** every heading is present, and the content is thin or generic.
- **Mention as coverage:** a topic is named, or a risk listed with no response, and counted as handled.
- **Catch-all clauses:** "and other cases as needed" or "to be determined" stands in for content.
- **Padding:** length is taken for coverage.
- **"Out of scope" as a bin:** hard questions are moved out of scope to avoid them, or omissions are disclosed where nobody will read them.
- **Guessed answers:** you fill a gap with plausible content the user never chose.
- **Claimed check:** "this handles all cases" is said without the comparison having been made.
