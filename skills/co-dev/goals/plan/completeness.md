# Completeness

The plan holds all the work between the code as it stands and the design built and in use, including the work the design does not mention, with anything left out named.

*Falls short:* a plan that ends when the code is written. *Overshoots:* work nobody needs.

*Borders:* whether each design decision has a step belongs to fidelity; how a step is shown done belongs to verifiability; what could go wrong belongs to resilience.

## Desirable

- **Agreed finish line:** where the plan ends is agreed early: merged, released, in use, the old code gone.
- **Map of the work:** the kinds of work this change needs are listed on purpose (code, tests, data, configuration, documentation, release, removal), including those the design does not mention, and each is planned or said not to apply.
- **Before the first step:** what must be in place to start (access, an environment, a branch, an answer) is listed, with who provides it.
- **Connections planned:** the work of joining the parts to each other and to what surrounds them is in steps, not assumed to fall out of the parts.
- **Tests as work:** writing and changing tests is planned inside the steps they belong to.
- **Beyond the happy path:** the failures, edge cases and limits the design covers have steps of their own or a named place in one.
- **Transition:** how existing data, users and callers get from the old to the new is planned: migration, compatibility, the switch.
- **Removal:** what the work makes obsolete (old code, flags, scaffolding, stubs) has a step that removes it.
- **Around the code:** the documentation, configuration, monitoring and whatever else this project keeps beside its code are updated in a step.
- **Release:** how the work reaches its users (review, merge, deployment, switching on) is planned as far as the finish line reaches.
- **Other people's part:** work that someone other than the builder must do (an approval, a credential, a review) is named, with who does it and by which step it is needed.
- **Named gaps:** what the plan leaves out, defers or cannot yet plan is written down, each with its reason and who or what closes it.
- **Gap hunting:** what is missing is looked for on purpose: the plan walked step by step as the builder, and the day after the last step imagined ("what does someone still have to do?").
- **Bounded by need:** nothing is in the plan that neither the design nor the building of it calls for.
- **Final check:** the plan is compared with the finish line before it is called ready, and you say what was checked and what was not.

## Undesirable

### Falls short

- **Code-only plan:** the steps cover writing the code, and stop there.
- **Missing glue:** the parts are planned, and the work of connecting them is not.
- **Forgotten transition:** nothing says how existing data, users or callers get from the old to the new.
- **Leftovers:** scaffolding, flags, stubs and old paths have no step that removes them.
- **Trailing off:** the early steps are worked out and the later ones thin to a line each, because effort ran out.
- **Silent omission:** a kind of work is skipped, or never raised, without mention.
- **Hard part deferred:** the difficult step is "to be detailed later", with no reason and no date.
- **Unasked helpers:** the plan needs something from someone who has not been asked.

### Overshoots

- **Scope creep:** "while we are here" refactoring, upgrades and tidying nobody asked for.
- **Gold-plating:** tests, documentation or tooling beyond what the project keeps or the design needs.
- **Checklist march:** a generic list of work (security review, load test, translation) is planned whether or not it applies.
- **Nothing may wait:** work that a later version could carry at no cost is forced into this plan.
- **Past the finish line:** the plan runs on into what comes after the agreed end.

### Counterfeits (looks met, is not)

- **Mention as coverage:** a heading ("Rollout") with one generic line, or a step that reads "migration: to be decided".
- **Catch-all step:** "final cleanup and polish" stands in for the work it should list.
- **"Out of scope" as a bin:** hard work is declared out of scope to avoid planning it.
- **Padding:** the number of steps is taken for coverage.
- **Guessed finish:** the finish line was assumed ("merged") where the user needed something else ("in use").
- **Claimed check:** "the plan covers everything" is said without the comparison having been made.
