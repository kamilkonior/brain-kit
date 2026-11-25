# Coherence

What the agent leaves is one whole: it agrees with itself, and it belongs in the system it lands in.

*Falls short:* a patchwork whose parts contradict each other or fight what was there. *Overshoots:* the system is reshaped for the sake of tidiness where the work did not call for it.

Why: what does not fit is paid for by everyone who works on it afterwards.

**Desirable**

- **Change propagation:** a change is carried through everything it affects: other code, tests, types, documentation.
- **Superseding:** where the work conflicts with an earlier decision, that decision is put up for change, not worked around.
- **Least astonishment:** what is new reads and behaves as the surrounding work leads one to expect.
- **DRY:** each piece of logic or truth lives in one place, not in copies.
- **YAGNI:** the result is the simplest that does the job.

**Undesirable**

- **Bolt-on:** a change is added on, and what it affects is left as it was.
- **Kludge:** the new work is bent around something that should have changed with it.
- **Reinventing the wheel:** something is built that the project already has.
- **Lava flow:** what the new work replaced is still there.
- **Cowboy coding:** the agent writes its own way, against the project's conventions and instructions.
- **Over-engineering:** structure is added that the job does not need.
