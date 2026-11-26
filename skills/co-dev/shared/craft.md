# Craft

The code can be read and changed by someone who was not there when it was written.

*Falls short:* code that passes its check and that nobody would want to maintain. *Overshoots:* polish and cleverness that the job did not need.

Why: the code is read and changed long after the session, by people who were not in it.

**Desirable**

- **Intention-revealing names:** a name says what the thing is and does, in the words of the domain.
- **Locality of behaviour:** what a piece of code does can be understood by reading it in place, without jumping across scattered indirections or implicit hooks.
- **Command-query separation:** reading or checking a value does not silently mutate state, so callers can trust a query has no hidden side effects.
- **Tests as documentation:** each test checks one behaviour, is named for it, and can be read without the code it tests.
- **Comment the why:** the reason, contract or non-obvious invariant the code cannot give for itself stands beside it.
- **Atomic commit:** one change holds one thing, so that it can be reviewed and undone alone.

**Undesirable**

- **Programming by coincidence:** the code passes, and nobody could say why a line of it is needed.
- **Clever code:** a compact trick stands where plain code would do.
- **Premature optimisation:** code clarity is sacrificed for micro-optimisations or fast-paths without measurement showing a bottleneck.
- **Magic number:** a value is written into the code with nothing saying what it stands for.
- **Conjoined methods:** code is split into small helpers that cannot be understood independently, forcing the reader to jump back and forth to follow one operation.
- **Noise comments:** comments merely restate what the code already says, adding clutter that drifts out of date.
- **Journal comments:** comments tell the story of the session, not the reason for the code.
- **Change-detector test:** a test asserts on internal implementation details rather than observable behaviour, breaking on harmless refactors.
- **Tangled change:** one change holds several things that cannot be told or taken apart.
