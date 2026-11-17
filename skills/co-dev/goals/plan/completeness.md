# Completeness

The plan covers the whole way from what exists to the agreed end state, including the work the design does not mention, and names what it leaves out.

*Falls short:* gaps the builder finds mid-build. *Overshoots:* work planned in that nobody needs.

*Borders:* whether each decision of the design is carried, and whether the plan builds more than was decided, belongs to fidelity; how finely the work is cut belongs to decomposition; what the plan does about what is not yet known belongs to resilience; whether the document can be followed without the session belongs to handover.

## Desirable

- **End to end:** the last step reaches the end state of the frame, not "code written".
- **Unmentioned work:** the work a design does not talk about is planned: set-up, configuration, dependencies, permissions, changes to build and release.
- **Transition:** how the system gets from the old state to the new (data moved, old and new living side by side, the switch) is in the steps.
- **Removal:** what the new work makes obsolete (old code, old data, dead configuration, outdated documentation) has a step that removes it, or a stated reason to stay.
- **Around the code:** documentation, examples, change notes and the people or systems that must be told are covered as far as the end state calls for them.
- **Beyond the main path:** the failures and edge cases the design specifies have steps of their own or a named place in one.
- **Qualities have work:** where the design asks for a quality (speed, security, accessibility), a step produces it and a check shows it.
- **Preconditions:** what must be true or at hand before the build starts (access, accounts, secrets, decisions by others) is listed with who provides it.
- **Outside hands:** work that only the user or someone else can do (an approval, a credential, a manual release) is in the plan at its place, with who does it.
- **Named omissions:** what the plan leaves out, defers or leaves to a later plan is written down, each with its reason and what picks it up.
- **Gap hunting:** the plan is walked from the first step as the builder would, asking at each step what it needs that nothing earlier provides, and the design's main scenario is traced through the finished state.
- **Closed threads:** a question raised during planning is answered, turned into a step or put on the open list before the end.
- **Bounded by need:** no work is planned that the end state does not call for.
- **Final check:** before the plan is called done it is compared with the frame, and you say what was compared and what was not.

## Undesirable

### Falls short

- **Code-only plan:** the steps end when the code is written; migration, configuration, release and cleanup are missing.
- **Main path plan:** only the main path has steps.
- **Trailing off:** the first stages are worked out and the later ones get a line each, with no word that this is deliberate.
- **Silent omission:** something is left out and not mentioned.
- **Hand-waving:** a hard part is covered by a step saying that it will be handled ("integrate with billing").
- **Missing precondition:** the build stops at the first step for want of access, a key or someone's decision.
- **Leftovers:** old code, old data and dead configuration stay behind because no step removes them.
- **Premature "done":** the plan is declared ready while stages are missing, or because the session ran long.

### Overshoots

- **Scope creep:** steps are added for neighboring improvements (refactorings, upgrades, tooling) that the end state does not need.
- **Every conceivable case:** steps cover failures and edges the design does not ask for and reality will not bring.
- **Checklist march:** a generic list (security, performance, monitoring, translation) is worked through whether or not it applies here.
- **Everything now:** nothing may wait for a later plan, though the frame set a smaller extent.
- **Moving finish line:** the end state grows as planning goes on.

### Counterfeits (looks met, is not)

- **Mention as coverage:** a topic named in a step title, or a risk listed with no response, is counted as planned.
- **Catch-all step:** "handle remaining edge cases" or "final polish" stands in for work nobody identified.
- **To be determined:** a step's content is "work out how to", where working it out was the plan's job.
- **"Out of scope" as a bin:** hard work is moved out of the plan to avoid planning it, or omissions are listed where nobody will read them.
- **Padding:** length is taken for coverage.
- **Claimed check:** "the plan covers everything" is said without the walk-through having been made.
