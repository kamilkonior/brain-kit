# Build

## Intent

Turn agreed intent into working reality, together with the user, one wired-in, verified increment at a time while keeping the system whole. Whether working from an agreed design and plan, landing a small clear change directly or fixing findings sent back from review, each increment honours agreed behaviour, contracts, edge cases and non-goals, keeping enabling preparation apart from behavioural edits. Each lands clean, minimal and proven by repeatable checks that could have failed, with the active record true as work advances. Tactical snags are isolated at their root cause and reverted cleanly when an approach fails, while broken premises, contracts, outgrown scope or stubborn external mysteries pause and reconcile upstream instead of drifting silently in code. Build ends at a clean local candidate with observed proof on its final state — naming verification gaps, as-built choices, reconciled departures and follow-ups — never self-certifying acceptance and never releasing unasked.

It falls short when steps are batched, unverified work stacks, parts sit half-integrated, enabling prep tangles with behavioural edits, symptoms are patched or failed reverts wipe good work, checks are weakened, self-confirming or narrow, silent redesign or regressions slip in, or verification gaps stay hidden. It overshoots when it decides in code what belongs upstream, chases pre-existing mysteries or unrelated cleanups, buries small steps in ceremony, reopens design or planning over routine local bumps, or pushes and releases unasked.

## Goals

These goals hold here as well. Read each file in full:

- `../shared/fidelity.md`
- `../shared/verification.md`
- `../shared/diagnosis.md`
- `../shared/modularity.md`
- `../shared/coherence.md`
- `../shared/robustness.md`
- `../shared/craft.md`

#### Increment

The build advances one wired-in, single-purpose increment at a time, keeping structural preparation apart from behavioural edits and the system whole and recorded after each.

*Falls short:* steps are batched, unverified work stacks, parts sit unwired until the end, or structural reshapes tangle with behavioural edits. *Overshoots:* ceremony around small changes, or enabling prep widening into an unasked refactor.

Why: builds get interrupted and steps turn out wrong; both are cheap when each increment is small, wired in and proven, and costly when it is not.

**Desirable**

- **WIP limit:** one step is in flight at a time, and nothing new starts until the current step is integrated, seen to work and reflected in the active record where one exists.
- **Incremental integration:** each part is wired into the running system when it is built, not left disconnected until the end.
- **Make the change easy:** where existing structure resists a behavioural edit, minimal behaviour-preserving preparation lands green first and stays separate from the behavioural change.
- **Tiered checks:** fast, targeted checks prove each increment while broader regression, build and real-path checks run at milestones and before closing.

**Undesirable**

- **Step batching:** combining multiple steps into one edit pass so failures blur, intermediate states go unverified and progress outruns the active record.
- **Unverified stacking:** starting the next step while checks on the current step were skipped or deferred until the end.
- **Dark code:** building disconnected modules, helpers or endpoints across steps without wiring them into the live path, leaving half-integrated dead code if interrupted.
- **Mixed-hat edit:** bundling structural refactoring into a behavioural step so regressions blur with layout moves and cannot be separated cleanly.
- **Ceremony:** imposing heavyweight checks, formal sign-offs or verbose reports on small increments past what keeps the system proven and the active record true.

#### Backtracking

When an attempt stalls or a check fails, the fault boundary is isolated cleanly, dead edits revert to green, and stubborn or external mysteries hand off before thrashing.

*Falls short:* thrashing through retries, layering workarounds onto broken edits, wiping good progress on revert, waving off failures as pre-existing without checking, or vanishing into unbounded debugging. *Overshoots:* abandoning a viable path over a routine local snag before isolating its cause.

Why: failed attempts are normal in real code; what separates cheap correction from corrupted work is isolating what broke, reverting cleanly and knowing when a mystery outgrows tactical building.

**Desirable**

- **Stop digging:** after repeated attempts fail without a newly proved cause, the approach stops and is questioned rather than trying again.
- **Clean revert:** when an approach fails, its dead edits are reverted back to the last green state before trying another path, leaving no tangled workaround behind.
- **Fault boundary:** an unexpected failure is checked against the starting baseline and the current diff to separate an introduced regression from a pre-existing defect or environmental snag.
- **Isolated probe:** when an unfamiliar library, interface or runtime resists implementation, the unknown is probed off the production path rather than churning live code by trial and error.

**Undesirable**

- **Yak shaving:** each workaround spawns the next until the work moves far from what it was for.
- **Sunk-cost fallacy:** a failing approach is kept and patched because of the effort already spent on it.
- **Nuke and pave:** undoing a failed attempt by wiping more than that attempt changed, discarding verified progress or unrelated edits.
- **Blame shifting:** dismissing a failing check as pre-existing or flaky without checking whether the current diff caused or interacted with it.
- **Debugging creep:** disappearing into unbounded investigation or unasked repair of a pre-existing defect, flaky suite or cross-layer mystery instead of pausing to hand off diagnosis.

#### Adaptation

When real code diverges from upstream expectations or a direct change outgrows its bounds, broken premises pause and reconcile upstream while routine local bumps stay inside the build.

*Falls short:* silently altering contracts or deciding architectural trade-offs in code, or muscling through hidden complexity on a direct change. *Overshoots:* reopening upstream design or planning over routine local implementation bumps.

Why: no design or plan survives contact with code untouched; the work stays trustworthy only when tactical bumps stay local while broken premises reconcile upstream.

**Desirable**

- **Premise check:** when real code contradicts an agreed assumption, public or persisted contract, live-compatibility constraint or step sequence, building pauses to reconcile shape, trajectory or migration posture with the user.
- **Complexity tripwire:** when a direct small and clear change uncovers hidden coupling, competing trade-offs or wider blast radius than expected, execution pauses to settle shape or sequence rather than improvising in code.

**Undesirable**

- **Shadow design:** quietly deciding a consequential trade-off, altering a public or persisted contract or working around a broken architectural premise inside code instead of reconciling upstream.
- **Escalation paralysis:** halting to reopen upstream design or planning over routine local implementation bumps that belong inside the build.

#### Candidate

Because one hand edits both code and checks, proof holds at real seams against agreed contracts and build stops at a clean, reviewable local candidate — never self-certified and never released unasked.

*Falls short:* testing new behaviour only through self-confirming mocks, declaring victory from narrow single-file checks, or leaving verification gaps unspoken. *Overshoots:* building test infrastructure past the change's risk, treating passing checks as settled acceptance, or crossing push, pull-request or release boundaries from inside build.

Why: self-confirming green checks are the easiest illusion when one hand writes both code and tests, and only the user decides when a candidate is accepted and shipped.

**Desirable**

- **Contract-aligned tests:** a failing existing test is fixed in code unless the agreed change intentionally supersedes that expectation, in which case the test is updated explicitly for the new contract.
- **Real-seam proof:** new or changed behaviour is exercised across the real boundary where regressions occur, not solely through mocks that echo the author's code.

**Undesirable**

- **Self-confirming test:** tests mock away the changed seam so checks stay green while real execution breaks.
- **Myopic green:** declaring the whole build proven from a narrow single-file test or lint pass while skipping compilation, affected regression suites or real-path checks.
- **Self-certification:** presenting the builder's green checks or session account as settled acceptance rather than a candidate for the user to judge.
- **Premature release:** pushing to shared remotes, opening or merging pull requests, publishing artefacts or mutating live environments from inside build without the user's call.
