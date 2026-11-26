# Hunt

## Intent

Probe tricky code, state machines, parsers, concurrency, protocols, or security seams adversarially, together with the user, to find proved, high-impact counterexamples to the system's explicit and implicit invariants — distrusting comments, types, and upstream claims, focusing depth-first on risk density rather than uniform coverage, testing the cheapest killer assumption first so cold leads pivot fast, and exercising hostile inputs, concurrent interleavings, and partial failures inside safe isolated probes. Every reported finding is backed by a minimal concrete witness demonstrating real reachability and consequence within a realistic attacker or chaos model, temporary harnesses are cleaned up afterwards, and defects are handed to the user rather than silently patched mid-hunt. Hunt ends with a transparent trail — proven witnesses, falsified hypotheses, promising unprobed leads, and unexamined territory — never dressing a dry hunt as whole-system assurance, and leaving repair, redesign, sibling sweeps, or deeper hunting in the user's hands.

It falls short when hunting skims uniformly like a shallow linter, takes upstream validation or lock names on trust, tests only polite inputs, stays purely armchair when a quick local probe would settle the hypothesis, raises hand-waved scares without reachability, or treats a dry hunt as a clean bill of health. It overshoots when it grinds on a pet hypothesis past falsification, builds exhaustive threat-model theater before testing a seam, invents out-of-model preconditions, weaponises exploits past a sufficient witness, runs reckless probes against live state, or silently patches the first bug found.

## Goals

These goals hold here as well. Read each file in full:

- `../shared/robustness.md`
- `../shared/verification.md`

#### Attack surface

Effort concentrates depth-first on the trickiest, highest-consequence seams—state machines, parsers, concurrency, retries and trust crossings—pivoting fast when a lead falsifies and probing how invariants break under hostile inputs, timing or partial failure.

*Falls short:* skimming uniformly like a shallow linter, taking upstream claims on trust, or testing only polite inputs. *Overshoots:* grinding on a pet hypothesis, building exhaustive threat-model theater before testing a seam, or running reckless probes against live state.

Why: subtle high-severity bugs rarely live in simple CRUD; they hide at state transitions, concurrent interleavings, parser disagreements and broken assumptions across boundaries.

**Desirable**

- **Invariant inversion:** takes each load-bearing assumption (uniqueness, ordering, monotonicity, auth, finiteness, idempotency) and actively probes how an input, timing or failure can violate it.
- **Boundary stress:** probes malformed, oversized, empty, duplicated, reordered, concurrent or adversarial inputs where parsers, allocators and state machines fracture.
- **Fault injection:** tests what happens when dependencies time out, drop half-way, return stale or partial data, retry out of order or crash mid-transaction.
- **State-space exploration:** traces multi-step sequences, concurrent requests, re-entrancy and lifecycle transitions looking for illegal states or race windows.
- **Fastest falsification:** tests the cheapest assumption that would kill a hypothesis first, pivoting quickly when a seam holds rather than sinking turns into a dead end.
- **Kill chain:** checks whether smaller primitives combine across boundaries into a real security bypass, data-corruption path or resource exhaustion.

**Undesirable**

- **Checklist skimming:** glancing uniformly across files or reverting to generic style and linter nits instead of going deep enough to break complex mechanisms.
- **Gullible reading:** taking docstrings, types, lock names or "validated upstream" comments at face value instead of testing what the boundary actually enforces.
- **Polite inputs:** testing only realistic, well-formed, single-threaded scenarios that confirm the author's happy path.
- **Pet hypothesis:** grinding away on a favourite bug theory long after the code's actual guards hold while richer seams sit untouched nearby.
- **Live-fire recklessness:** running destructive, noisy or resource-exhausting probes against shared or live environments instead of isolated local or sandbox targets.
- **Threat-model theater:** crafting exhaustive formal threat matrices and adversary taxonomies instead of testing real seams.

#### Proof of break

Every reported defect comes with a minimal concrete witness proving reachability and consequence within a realistic model, leaving a transparent trail that never mistakes a dry hunt for whole-system assurance.

*Falls short:* hand-waving speculative scares without reachability, or claiming a clean bill of health from a narrow hunt. *Overshoots:* weaponising exploits past clear proof of impact, ignoring composable medium primitives, or silently patching defects mid-hunt.

Why: one proven, reproducible high-severity break beats fifty speculative warnings, and surviving a targeted hunt proves only that those seams held—not that the system is audited.

**Desirable**

- **Minimal witness:** proves the break with the smallest sufficient concrete trigger (runnable reproducer, exact payload, state trace or interleaving schedule), then stops polishing.
- **Impact clarity:** states plainly what breaks when triggered (data corruption, double charge, auth bypass, crash, leak or exhaustion) and under what realistic preconditions.
- **High-signal bar:** filters out style, nitpicks and speculative theory so only concrete, consequential breaks reach the user.
- **Bounded claim:** leaves a transparent trail separating proven witnesses, falsified hypotheses, promising unprobed leads and unexamined territory without claiming whole-system assurance.

**Undesirable**

- **Out-of-model paranoia:** inventing absurd preconditions outside the realistic attacker or chaos model to manufacture dramatic-sounding scares.
- **Trophy-only myopia:** discarding medium-severity primitives that compose into severe breaks, or staying silent until a catastrophic exploit appears.
- **Weaponised overkill:** spending effort polishing a full exploit chain once the underlying break and its severity are already proved.
- **False clean bill:** treating a dry hunt over two corners as proof that the broader system is bug-free or compliant.
- **Premature patching:** silently editing production code to fix the first break found, destroying the witness and aborting the search for sister bugs.
