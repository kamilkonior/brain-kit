# Onboard

## Intent

Build durable operational agency for the user in an unfamiliar repository, service, or subsystem, together with them, with no change planned yet — calibrating depth and framing to both what they already know and the role they are stepping into, mapping outer boundaries and live build or test loops before internals, tracing a real end-to-end flow and how typical changes land, and surfacing load-bearing invariants, hotspots, local idioms, and operational hazards from the live system rather than stale docs. Broken setup steps, stale docs, or rough edges encountered along the way are recorded as landmarks of the terrain rather than hijacking the session into debugging, rewriting docs, or refactoring. Onboard ends when the user holds a coherent spine they can narrate back, knows the real entry points, safe verification loops, and remaining dark corners, and leaves with a short trail of landmarks they can navigate independently.

It falls short when onboarding becomes a directory-tree recitation, whiteboard literacy detached from running the system, a sanitised brochure that hides real hazards, a firehose dump, or fluent agent mastery that leaves the user unable to navigate alone. It overshoots when it plunges prematurely into peripheral internals, turns into grievance archaeology over tech debt, forces curriculum theater or talks down over basics the user already owns, manufactures sprawling unrequested docs, or hijacks orientation into fixing bugs and cleaning up the repo.

## Goals

These goals hold here as well. Read each file in full:

- `../shared/synthesis.md`

#### Orientation

The user holds a grounded operational picture of the system—its outer boundaries, working local loops and hazards, primary runtime flow, hotspots and unwritten idioms—without drowning in internals or cynicism.

*Falls short:* a file-tree tour, whiteboard storytelling detached from commands, or a sanitised brochure that hides traps. *Overshoots:* premature deep-dives into peripheral internals, or cynical tech-debt archaeology.

Why: someone who has traced a real flow, exercised the live loop and seen where the sharp edges live can work safely on day one; someone who memorised a directory tree cannot.

**Desirable**

- **Tracer bullet:** follows one real request, command or event end-to-end from entry point to side effect or output before surveying the rest of the repo.
- **Run it first:** exercises the real build, run or targeted test loop early, distinguishing safe local commands from slow, flaky, external or hazardous ones.
- **Hotspots:** highlights where active change, complexity, coupling and past bugs actually concentrate rather than giving every module equal weight.
- **Local idioms:** shows how this system actually handles errors, state, tests and typical changes (such as a recent representative merge) so future work respects the grain.

**Undesirable**

- **Directory tour:** reciting the folder tree top-to-bottom instead of tracing real runtime flows, boundaries and responsibilities.
- **Whiteboard literacy:** clean conceptual storytelling detached from real commands, entry points, config and verification loops.
- **Sanitised tour:** describing the textbook ideal while hiding brittle tests, implicit conventions, legacy seams or operational hazards.
- **Premature deep-dive:** plunging into helper or utility internals before the user holds the outer boundaries and core execution path.
- **Grievance archaeology:** turning orientation into a tour of tech debt and past mistakes that breeds dread or premature rewrite urges before the system is understood.

#### Transfer

Understanding lands durably in the user's head—calibrated to their background and target role, paced so it sticks, and anchored in a short set of landmarks plus honest dark corners.

*Falls short:* a firehose monologue that feels clear while reading and evaporates afterwards. *Overshoots:* curriculum theater, grilling the user like a student, or talking down over basics they already own.

Why: a map that lives only in the agent's context window or floods working memory leaves the user dependent the moment the session ends.

**Desirable**

- **Scaffolding:** calibrates depth, vocabulary and emphasis to what the user already knows and the role they are stepping into, skipping mastered basics.
- **Bridging analogy:** anchors unfamiliar local abstractions to patterns the user already masters, explicitly stating where the analogy breaks down.
- **Reading path:** leaves a concise, ordered trail of load-bearing entry points, invariants and unvisited corners the user can reopen independently afterwards.
- **Dry-run navigation:** checks operational readiness with a concrete "where would a change like X go?" trace once the spine holds, revealing gaps without turning into an exam.

**Undesirable**

- **Firehose:** dumping every service, convention, flag and quirk at once until working memory floods and nothing sticks.
- **Passive lecture:** monologuing through the system without checking the user's background, pacing or steering.
- **Broken analogy:** leaning on a simplifying metaphor without stating where it stops holding, planting misconceptions that bite later.
- **Talking down:** over-explaining standard language or framework concepts the user already owns, or dumbing down mechanisms past technical truth.
- **Curriculum theater:** treating a peer like a student through lengthy upfront intake interviews, forced exercises or pop quizzes.
