# Spike

## Intent

Resolve a high-risk technical unknown or compare candidate approaches as cheaply and honestly as possible, together with the user, by making real execution the oracle — writing the smallest disposable code that exercises the exact seam where the risk lives (real library, API, protocol, data shape, auth or runtime constraint) while ruthlessly stubbing everything off that axis. Code written in a spike is laboratory apparatus, not product inventory: friction, brittle workarounds and unexpected limits are first-class evidence rather than obstacles to engineer past, and throwaway code stays quarantined from production paths yet representative enough of the real toolchain that findings transfer back. Spike ends when a decisive signal is acquired, reality invalidates the starting premise, the effort budget is spent, or the work wants to become architecture, production implementation or controlled tuning — leaving the user with an evidence-backed verdict, concrete gotchas, an explicit boundary of what was tested versus bypassed, clean teardown of throwaway artefacts and the next move squarely in their hands.

It falls short when a spike tinkers without a falsifiable question, mocks away the risky seam so a happy-path toy gives false confidence, quits at trivial setup noise before reaching the real boundary, leaves throwaway code or trial dependencies tangled in the repo, or deletes the apparatus without recording what was learned. It overshoots when it dresses throwaway code in production abstractions or exhaustive edge-case proof, piles on fragile hacks to coerce a green demo instead of reporting structural resistance, isolates a sandbox so far from the real toolchain that results do not transfer, drifts past the timebox into an open-ended mini-project, or lets prototype code quietly harden into production without the user's call to rebuild it properly.

## Goals

These goals hold here as well. Read each file in full:

- `../shared/verification.md`

#### Experiment

A sharp, falsifiable technical question (or fair comparison between candidates) is settled by running real code at the exact seam where the risk lives, treating friction as evidence and stopping once a directional verdict holds.

*Falls short:* open-ended tinkering with no sharp question, mocking away the risky seam, or quitting at a trivial setup snag before reaching the real boundary. *Overshoots:* polishing throwaway code like production software, hacking past structural resistance to force a green demo, or chasing exhaustive proof after a directional answer is already clear.

Why: a mock that hides the risk produces false confidence that detonates during implementation, while forcing a broken approach to limp across the line hides the exact friction the spike was meant to uncover.

**Desirable**

- **Falsifiable question:** names the load-bearing unknown and what empirical outcome would confirm, reject or qualify the approach, while staying alert when reality invalidates the premise.
- **Selective fidelity:** runs against the real library, API, protocol, data shape or runtime constraint where uncertainty lives, while ruthlessly stubbing everything off that risk axis.
- **Hard-edge probe:** exercises the awkward constraint most likely to break the approach (auth, pagination, rate limits, streaming, concurrency, scale or error semantics) rather than only a hello-world call.
- **Friction as data:** treats unexpected resistance, brittle workarounds or undocumented quirks as first-class evidence about the approach rather than obstacles to bury behind hacks.
- **Apples-to-apples bake-off:** when comparing candidate approaches, tests each against the same realistic workload and decision criteria so trade-offs stand on equal footing.

**Undesirable**

- **Potemkin prototype:** mocks, hardcodes or simplifies away the exact integration, scale or constraint where the real risk sits, producing false confidence.
- **Happy-path mirage:** declaring feasibility proven from a trivial example without testing the awkward constraints that actually made the bet risky.
- **Aimless tinkering:** writing exploratory code around a tool or library with no crisp question or decision threshold, mistaking motion for learning.
- **Premature surrender:** abandoning a viable approach at the first mundane setup, version or configuration snag before distinguishing incidental noise from a real capability limit.
- **Sunk-cost hacking:** piling fragile workarounds onto an ill-fitting approach to coerce a green demo when the need for those hacks was already a decisive signal against it.
- **Production dress-up:** spending spike time on clean abstractions, unit-test polish, error handling or exhaustive edge-case proof for disposable lab code.

#### Disposability

Spike code stays tightly timeboxed, isolated from production yet representative of the real toolchain, and exits with a crisp, evidence-backed verdict and clean teardown so throwaway code never quietly ships.

*Falls short:* spike code quietly hardens into production, trial dependencies pollute the workspace, or findings stay trapped in scratch scripts without a verdict. *Overshoots:* isolating the sandbox so far from the real toolchain or runtime that results do not transfer back, or discarding the apparatus before capturing the gotchas and bypassed assumptions.

Why: the deliverable of a spike is durable decision-grade learning, not prototype code—and a prototype that leaks into production or evaporates without notes wastes the entire experiment.

**Desirable**

- **Learning over code:** treats the decision-grade verdict, discovered gotchas, measured bounds and reproducible evidence—not the prototype itself—as the deliverable.
- **Strict quarantine:** keeps spike files, fixtures and trial dependencies isolated (scratch directory, branch or disposable harness) while matching the real runtime and toolchain closely enough that findings transfer.
- **Bounded verdict:** closes when signal is acquired, the premise breaks or the effort budget is spent, with a clear go / no-go / conditional-go answer and explicit boundaries of what was tested versus bypassed.
- **Clean teardown:** deletes throwaway code and reverts trial dependencies once findings are captured, leaving a clearly isolated reference only if the user explicitly asks to keep it.

**Undesirable**

- **Accidental production:** letting working throwaway spike code quietly bleed into production branches without rebuilding it to production standards on the user's call.
- **Timebox creep:** letting a quick feasibility check silently expand into an open-ended mini-project past the point where remaining uncertainty is itself the answer.
- **Dependency hangover:** leaving trial packages, lockfile churn, config edits or external test data behind in the workspace or shared environments after the spike ends.
- **Detached sandbox:** building a standalone trial so removed from the real project's runtime, bundler, type system or toolchain that its green result fails to transfer back.
- **Amnesiac throwaway:** discarding or abandoning the spike without recording concrete gotchas, version quirks, bypassed assumptions and how to reproduce the result, or handing back a raw script with no verdict.
