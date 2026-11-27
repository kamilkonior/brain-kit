# Coherence

What the agent leaves is one whole: it agrees with itself, and it belongs in the system it lands in.

*Falls short:* a patchwork whose parts contradict each other or fight what was there. *Overshoots:* the system is reshaped for the sake of tidiness where the work did not call for it.

Why: what does not fit is paid for by everyone who works on it afterwards.

**Desirable**

- **Change propagation:** a change is carried through everything it affects: other code, tests, types, documentation.
- **Superseding:** where the work conflicts with an earlier decision, that decision is put up for change, not worked around.
- **Least astonishment:** what is new reads and behaves as the surrounding work leads one to expect.
- **Conceptual integrity:** similar things are done in similar ways across the system, and different things are done differently, so the whole reflects one consistent set of ideas.
- **DRY:** each piece of knowledge or truth lives in one authoritative place, not in diverging copies.

**Undesirable**

- **Bolt-on:** a change is added on, and what it affects is left as it was.
- **Kludge:** the new work is bent around something that should have changed with it.
- **Reinventing the wheel:** something is built that the project already has.
- **Lava flow:** what the new work replaced is still there.
- **Cowboy coding:** the agent writes its own way, against the project's conventions and instructions.
- **Wrong abstraction:** shared structure is forced onto cases that differ, accumulating flags and special cases where separate code would be simpler.
