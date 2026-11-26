# Migrate

## Intent

Guide live data, schemas, APIs, runtimes, frameworks or external consumers safely across an incompatible boundary, together with the user — optimising for the trajectory itself so every intermediate world between old and new stays viable at the continuity bar the user chose (zero-downtime, bounded maintenance window or clean versioned break). Every producer, consumer, queue, cache, batch job and persisted artefact touching the seam is accounted for before moving; historical state or bulk transforms move in rehearsed, idempotent, throttled batches with malformed edge cases isolated; semantic and data equivalence is proven empirically to agreed tolerances before authority transfers; retreat remains genuine and write-safe up to an explicit user-owned point of no return (with forward-fix contingencies ready before crossing it); and temporary bridges stay alive only long enough to prove stability before being contracted away. Migrate ends cleanly when authority rests on the new target, zero legacy usage is verified, temporary shims and old paths are retired—or when long soak or deprecation windows outlast the session, with a durable, owned contraction record and explicit straggler policy in the user's hands.

It falls short when a migration attempts a flag-day switch where rolling skew or live state required phasing, misses unindexed consumers or dirty historical rows, saturates live systems with unthrottled or unrehearsed backfills, shifts authority without parity checks, mistakes a code revert for state rollback after writes diverge, drops legacy paths before soak clears, or abandons dual-writes and compatibility shims in permanent hybrid purgatory. It overshoots when it builds zero-downtime choreography where a bounded maintenance window was cheaper and safer, bundles opportunistic redesigns or new features into the crossing, stalls cutover chasing trivial parity noise or inactive stragglers, over-fragments phases into months of hybrid decay, or keeps fragile bi-directional rollback machinery alive past the point where forward-fix is strictly simpler and safer.

## Goals

These goals hold here as well. Read each file in full:

- `../shared/robustness.md`
- `../shared/verification.md`
- `../shared/coherence.md`

#### Coexistence

Every producer, consumer and persisted artefact on the seam is accounted for, intermediate states stay viable at the user-chosen continuity bar, historical state moves via rehearsed throttled work, and semantic and data equivalence is proven to agreed tolerances before shifting authority.

*Falls short:* flag-day coupling across incompatible versions, missing hidden consumers or dirty rows, unthrottled or unrehearsed backfills, or shifting authority without parity checks. *Overshoots:* building zero-downtime machinery when a maintenance window or versioned break is safer, or chasing trivial parity noise past agreed tolerances.

Why: an incompatible crossing lives in a hybrid world before it reaches its destination; if intermediate states corrupt data or overload live systems, the target state is worthless.

**Desirable**

- **Intermediate safety:** every deployable phase is live-safe under rolling deploys, mixed versions, retries and concurrent writes at the continuity bar the user chose (zero-downtime, bounded maintenance window or versioned break).
- **Resumable backfill:** moves historical data, indexes or bulk code transforms in idempotent, checkpointed, rate-limited batches—rehearsed via dry run on realistic volume and dirty edge cases—without locking or overloading live systems.
- **Parity reconciliation:** proves semantic and data equivalence empirically (shadow reads, diff audits, checksum invariants or dual-run comparisons) against explicit, bounded tolerances before transferring authority.
- **Poison-pill isolation:** quarantines malformed, orphaned or anomalous legacy records with visibility so they neither halt the crossing blindly nor get dropped silently.
- **Proportional bridge:** introduces compatibility shims, dual-writes or adapters only where the chosen continuity bar genuinely requires them, keeping transition machinery as small as the risk allows.

**Undesirable**

- **Flag-day cutover:** attempting a simultaneous switch of schema, code, data or consumers where rolling version skew or live state required a phased crossing.
- **Seam blindness:** missing unindexed producers, consumers, caches, queues, ETL jobs, older clients or dirty historical rows until cutover breaks them.
- **Lock-storm migration:** running unthrottled table rewrites, blocking DDL locks, unbounded batch updates or unrehearsed scripts against live production systems.
- **Write-skew drift:** running dual-writes, backfills, codemods or runtime upgrades without parity checks, allowing silent data loss or semantic drift (ordering, timezones, error shapes) before cutover.
- **Zero-downtime dogmatism:** engineering multi-phase dual-write and shadow-read infrastructure when a short maintenance window or clean versioned break is cheaper and less corruption-prone.
- **Parity perfectionism:** blocking cutover indefinitely over explainable in-flight lag, dead historical rows or harmless formatting deltas past agreed equivalence tolerances.

#### Cutover

Authority transfers on agreed readiness criteria with write-safe rollback up to an explicit one-way gate (and forward-fix readiness beyond it), consumers have clear timelines, and temporary bridges are contracted once soak clears so the system never petrifies in hybrid limbo.

*Falls short:* assuming code rollback reverts diverged state, dropping old paths before zero usage is proven, sneaking unrelated features into the crossing, or abandoning compat bridges permanently. *Overshoots:* keeping fragile reverse-sync machinery alive past the point where forward-fix is safer, over-fragmenting phases into months of hybrid decay, or letting negligible stragglers veto retirement forever.

Why: migrations rarely fail on day one—they fail when rollback turns out to be illusory after live writes, or when nobody finishes removing the temporary bridge.

**Desirable**

- **Write-safe rollback:** preserves genuine, non-destructive retreat (reverse sync or reversible transform) across the soak window up to the point of no return, and readies forward-fix contingencies before crossing it.
- **Zero-traffic proof:** confirms via live telemetry, query logs or consumer checks that old paths, schemas, queues or versions carry zero remaining usage (including batch jobs and cold caches) before retiring them.
- **One-way gate:** pauses explicitly for user go-ahead before crossing any irreversible boundary—flipping authority without reverse-sync, destructive drops, data deletion or retiring external contracts.
- **Finished contraction:** removes temporary dual-writes, compatibility shims, feature flags, deprecated schemas and old dependencies once soak clears—or leaves a durable, owned contraction record when soak outlasts the session.
- **Consumer notice:** aligns external callers, downstream teams and operators early with clear deprecation windows, upgrade paths and an explicit straggler policy.

**Undesirable**

- **One-way rollback trap:** assuming a code revert rolls back a migration after live writes have diverged or destructive mutations have run.
- **Rollback tax:** maintaining fragile bi-directional sync or instant-flipback machinery long past the natural point of no return where forward-fix is strictly simpler and safer.
- **Permanent bridge:** declaring victory once the new path serves traffic and leaving dual-writes, compat shims, v1+v2 code paths or old schemas calcified in hybrid purgatory indefinitely.
- **Premature drop:** deleting legacy tables, columns, endpoints, fallbacks or compat layers before soak windows, batch jobs, cold caches or deprecation timelines clear.
- **Straggler paralysis:** over-fragmenting phases needlessly or letting a tiny, unmaintained long-tail of legacy callers or records block retirement forever instead of agreeing a sunset cutoff or fallback.
- **Feature-hitchhiking:** bundling opportunistic redesigns, new product features or unrelated cleanups into a live migration, destroying equivalence checks and inflating blast radius.
