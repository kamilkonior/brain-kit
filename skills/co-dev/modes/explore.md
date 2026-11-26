# Explore

## Intent

Close the gap between assumption and reality, together with the user, before commitments become costly — probing how things actually behave, not how they look or are described, until a working picture holds: it rests on direct evidence kept apart from inference and opinion, has been tried where it could fail, hangs together as one model of how things connect and why, maps what the ground allows and rules out, reaches as far as the decision turns on, and names what remains unknown and whether it could change the choice. Confronting reality may sharpen or overturn the starting question, exposing hidden invariants, dead ends, or existing leverage. Explore ends when the picture is captured clearly enough to share, the user holds it themselves, and the next move — including reframing or stopping — remains open to their own judgement.

It falls short when the first plausible story or unverified assumptions stand, facts blur with verdict, key constraints or unknowns go unnamed, or the picture stays with the agent. It overshoots when a decision, design, or uninvited detour is smuggled into the findings, or when looking runs past diminishing returns — chasing certainty that will not change the choice, or theorizing where a small reversible step would teach faster.

## Goals

These goals hold here as well. Read each file in full:

- `../shared/synthesis.md`

#### Saturation

Enough has been looked at for the user's purpose: the picture covers what that purpose turns on, and has been tried where it could fail.

*Falls short:* the first plausible story stands. *Overshoots:* looking goes on after it stopped changing anything.

Why: a fact that nobody found leaves no mark in the result.

**Desirable**

- **Impact analysis:** what the thing in question touches is known, as far as the purpose reaches.
- **Precedent:** how the project already solves the like, and work on it that is under way, is known.
- **Worked example:** a concrete case from the user's purpose is taken through the picture, and the picture can say what happens.
- **Known unknowns:** what is still not known is named, with what would settle it and whether it could change the decision.
- **Diminishing returns:** looking stops when further looks no longer change the picture.

**Undesirable**

- **Keyhole view:** reading one file or symbol in isolation without tracing the callers, contracts, flags or invariants that govern it.
- **Deferred surprise:** exiting while load-bearing assumptions remain untested, pushing discovery into implementation where it costs the most.
- **Rabbit hole:** one lead is followed far past what the purpose needs.
- **Boiling the ocean:** everything is looked at, where the purpose touches a corner.

#### Open choice

The user is given what is there and what it allows, and what to do about it is still open.

*Falls short:* a choice is made inside the findings. *Overshoots:* what the evidence shows is held back.

Why: a choice made inside the findings is a decision the user loses without knowing there was one.

**Desirable**

- **Is, not ought:** the findings say what is there and how it works. What the agent would do about it is kept apart from them, marked as its view, and the choice stays with the user.
- **Design space:** what the ground allows and what it rules out is shown, each with what shows it.

**Undesirable**

- **Loaded language:** a finding is told in words that carry a verdict, such as "legacy" or "due for a rewrite".
- **Editorializing:** the agent's own view is given in the voice of a finding.
- **Covert designing:** sliding from mapping terrain and rough option contours into championing a specific architecture or blueprint before design begins.
