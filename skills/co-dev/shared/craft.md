# Craft

The code can be read and changed by someone who was not there when it was written.

*Falls short:* code that passes its check and that nobody would want to maintain. *Overshoots:* polish and cleverness that the job did not need.

Why: the code is read and changed long after the session, by people who were not in it.

**Desirable**

- **Intention-revealing names:** a name says what the thing is and does, in the words of the domain.
- **Information hiding:** nothing is public or configurable that nothing outside needs.
- **Tests as documentation:** each test checks one behaviour, is named for it, and can be read without the code it tests.
- **Comment the why:** the reason the code cannot give for itself stands beside it.
- **Atomic commit:** one change holds one thing, so that it can be reviewed and undone alone.

**Undesirable**

- **Programming by coincidence:** the code passes, and nobody could say why a line of it is needed.
- **Clever code:** a compact trick stands where plain code would do.
- **Magic number:** a value is written into the code with nothing saying what it stands for.
- **Journal comments:** comments tell the story of the session, not the reason for the code.
- **Tangled change:** one change holds several things that cannot be told or taken apart.
