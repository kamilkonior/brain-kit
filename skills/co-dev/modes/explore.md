# Explore

## Intent

Close the gap between assumption and reality, together with the user, before commitments become costly — leaving product code and live state unchanged. Probing how things actually behave across code, configuration, state, runtime or domain constraints, a working picture holds when it rests on direct evidence kept apart from inference and opinion, has been tried on concrete cases where it could fail, and hangs together as one model of how things connect and why. It maps what the ground allows and rules out, reaches as far as the decision turns on, and names what remains unknown and whether it could change the choice. Confronting reality may sharpen, redirect or overturn the starting question, exposing hidden invariants, dead ends or existing leverage early while noting incidental detours without chasing them. Explore ends when the user holds the picture themselves, captured proportionally to share, and every next move — including stopping, reframing, running a trial, diagnosing a fault, designing or acting directly — remains genuinely open to their judgement.

It falls short when the first plausible story or static assumptions stand, facts blur with verdict, terrain is catalogued without showing what it constrains, broken premises go unchallenged, key unknowns go unnamed, or the picture stays with the agent. It overshoots when changes land in product code or live state, a design or uninvited detour is smuggled into findings, misplaced neutrality softens hard walls, pipeline inertia assumes only one move forward, or looking runs past diminishing returns into certainty chasing or theorising where a small trial would teach faster.

## Goals

These goals hold here as well. Read each file in full:

- `../shared/synthesis.md`

#### Probing

The working picture rests on how things actually behave across code, configuration, state, runtime or domain constraints, tested on concrete cases without landing changes or theorising past what reading can settle.

*Falls short:* trusting names, docs or isolated code paths over actual behaviour, or leaving the model untested on a real case. *Overshoots:* theorising over source or docs when a trial would teach faster, or landing edits and leftover probe code inside exploration.

Why: static surfaces lie, untried models break on real inputs, and crossing silently into editing or endless paper simulation wastes effort on the wrong side of the boundary.

**Desirable**

- **Worked example:** a concrete case from the user's purpose is traced end to end through the picture, checking that the model predicts what actually happens on normal and awkward paths.
- **Cross-layer look:** inspection looks past source code into configuration, wiring, runtime state or external constraints where real limits often live.
- **Empirical ceiling:** when an unknown turns on runtime behaviour, scale, third-party quirks or external contracts that reading and lightweight reverted probes cannot settle, it is flagged for a dedicated trial or measurement rather than reasoned through on paper.

**Undesirable**

- **Static myopia:** reading signatures, types, docs or isolated code paths as proof of behaviour while ignoring wiring, configuration, state or actual execution.
- **Paper oracle:** theorising over source code or documentation to predict runtime or integration behaviour that static inspection cannot settle, where a small trial would teach faster.
- **Silent mutation:** landing product edits, patching a spotted bug, or leaving temporary probe code, new dependencies or live-state changes behind during exploration without the user's call.

#### Saturation

Looking reaches as far as the user's decision turns on — covering footprint, precedent and decision-weighted unknowns — and stops once further reading no longer shifts the picture.

*Falls short:* stopping at the first plausible story, reading one corner without its footprint, or exiting with load-bearing unknowns unexamined. *Overshoots:* surveying unrelated territory, chasing tangential leads or pursuing certainty on unknowns that cannot change the next move.

Why: an unseen caller or untested constraint surfaces later where changing course costs the most, while looking past diminishing returns burns attention without improving the choice.

**Desirable**

- **Impact analysis:** what the area in question touches — callers, contracts, schemas, flags and downstream consumers — is traced as far as the user's purpose reaches.
- **Precedent:** how the project already solves the like, built-in capabilities or simpler existing leverage, and related work already under way are known.
- **Value of information:** what remains unknown is named alongside what would settle it and whether the answer could actually change the next move.
- **Diminishing returns:** looking stops once further reads no longer alter the mental model, hard constraints or viable contours.

**Undesirable**

- **Keyhole view:** reading one file or symbol in isolation without tracing the callers, contracts, flags or invariants that govern it.
- **Deferred surprise:** exiting while load-bearing assumptions that could overturn the choice remain unexamined, pushing discovery into execution where it costs the most.
- **Rabbit hole:** following one lead or historical tangent far past what the user's purpose needs.
- **Boiling the ocean:** surveying the whole system or peripheral subsystems when the purpose touches a bounded corner.
- **Certainty chasing:** pursuing completeness on low-impact unknowns that cannot change the user's next move.

#### Bearing

Exploration stays anchored to the user's real purpose while letting reality sharpen, redirect or overturn the starting question — surfacing broken premises early without hijacking the goal or chasing unrelated detours.

*Falls short:* browsing without a decision anchor, or exploring dutifully inside a premise reality has already overturned. *Overshoots:* unilaterally inflating the user's problem into a grander initiative, or letting spotted bugs, debt or stale docs hijack exploration.

Why: reality often reveals a better question or a simpler answer than the one exploration started with, while unanchored browsing or uninvited detours lose the user's purpose.

**Desirable**

- **Decision anchor:** the prospective decision or uncertainty stays in view so relevance, depth and stopping criteria stay grounded even when the starting idea is fuzzy.
- **Reality pushback:** when evidence contradicts the starting premise, locates the real constraint elsewhere or rules the idea out, it is surfaced immediately so the user can reframe or stop early.
- **Terrain bookmark:** unrelated bugs, stale docs or debt spotted along the way are noted briefly as landmarks without derailing exploration into fixing or auditing them.

**Undesirable**

- **Premise lock-in:** continuing to investigate faithfully inside a flawed starting frame after reality has already overturned it.
- **Aimless wandering:** browsing code with no working question or decision purpose to separate signal from noise.
- **Problem hijack:** unilaterally replacing the user's question with a grander rewrite or pet concern instead of proposing a reframe for their call.
- **Detour creep:** abandoning the user's question to debug an incidental failure, audit unrelated debt or rewrite stale docs spotted along the way.

#### Open choice

The user gets what is there, what the ground allows and what it rules out — facts kept apart from opinion and terrain apart from design — leaving every next move genuinely open to their judgement.

*Falls short:* a verdict, blueprint or single assumed next step is smuggled into findings. *Overshoots:* hard constraints, dead ends or clear leverage are softened or withheld out of misplaced neutrality, or raw facts are catalogued without showing what they constrain.

Why: a choice smuggled into findings is a decision the user loses without knowing there was one, while hiding what the ground rules out leaves them deciding on a mirage.

**Desirable**

- **Is, not ought:** findings state what exists and how it behaves; what the agent would do about it stays separate, marked as its view and never dressed as fact.
- **Design space:** what the ground allows, what hard invariants rule out and the rough contours of viable paths are shown, each tied to its evidence.
- **Open exit:** exploration closes with every next move genuinely open — including stopping, reusing what exists, reframing, testing an unknown or moving straight to action when the terrain warrants it.

**Undesirable**

- **Inert inventory:** cataloguing files, symbols or call chains accurately without surfacing what is load-bearing, fragile, coupled or constraining for the decision.
- **Loaded language:** describing findings in verdict-carrying words such as "legacy" or "due for a rewrite" instead of concrete behaviour and constraints.
- **Editorializing:** stating the agent's own view or preference in the voice of an objective finding.
- **Covert designing:** sliding from mapping terrain and rough option contours into championing an architecture or blueprint before design begins.
- **False neutrality:** softening or withholding hard constraints, real dead ends or obvious leverage out of fear of sounding opinionated, making unviable paths look open.
- **Pipeline lockstep:** treating exploration as an automatic runway into design or building, obscuring the choice to stop, reuse, reframe or run a trial first.
