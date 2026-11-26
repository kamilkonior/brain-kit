# Harden

## Intent

Bridge "works on the happy path" and "survives unattended contact with reality", together with the user — keeping core product capability fixed while replacing accidental failure behaviour (hangs, out-of-memory crashes, retry storms, silent partial writes, opaque errors and brittle restarts) with bounded, predictable, diagnosable survival across the user's agreed threat horizon. Effort concentrates where exposure and blast radius are real: capping timeouts, memory, payloads and concurrency, enforcing trust boundaries and deliberate fail-closed versus degrade-open postures per seam, preserving state integrity across retries and crashes, wiring secret-safe 3 AM diagnostics and clean startup/shutdown lifecycle, and proving every safeguard actually triggers under injected faults or abuse. Every defence must earn its operational weight; when tightening checks could break tolerant existing callers or local fortification hits a structural ceiling, surface that trade-off explicitly to the user rather than breaking callers silently or burying domain logic in wrappers. Harden ends when the agreed threat horizon is fortified and proven under triggered faults, operational signals are clear and safe, happy-path contracts hold intact, and accepted residual risks or structural limits are named cleanly in the user's hands.

It falls short when hardening relies on try/catch anesthesia that swallows faults, ships unproven timeouts or fallbacks, leaves unbounded calls, shared fate with non-critical peers, or missing trust checks exposed, forgets startup fail-fast, graceful shutdown or guard visibility, or patches only the exact trigger of yesterday's incident. It overshoots when it builds a Tier-0 fortress around low-stakes code, layers uncoordinated retries and circuit breakers that cause worse cascading outages, re-validates trusted invariants deep inside the core, floods telemetry or leaks secrets into logs, silently breaks tolerant callers or smuggles in new product features, or chases theoretical risks past the agreed threat horizon.

## Goals

These goals hold here as well. Read each file in full:

- `../shared/robustness.md`
- `../shared/verification.md`
- `../shared/craft.md`

#### Defences

Exposed boundaries, external calls, state mutations and resource allocations carry bounded, non-amplifying protections with deliberate fail-closed or degrade-open postures across the agreed threat horizon—proven by triggering failure paths without breaking happy-path contracts.

*Falls short:* unbounded waits or buffers, shared fate with flaky peers, naive retry storms, untested catch blocks or swallowed faults that corrupt state. *Overshoots:* resilience theater whose defences cause outages or bury domain logic, armouring low-stakes internals, silently breaking tolerant callers or smuggling in new product features.

Why: every prototype already has failure behaviour—it is just accidental; and every added safeguard is code that can amplify an outage if left uncoordinated or unproven.

**Desirable**

- **Bounded resources:** puts explicit caps on timeouts, deadlines, payload sizes, concurrency, queue depth, memory and retry budgets so slow peers or abusive callers cannot exhaust the host.
- **Backpressure and jitter:** pairs bounded, idempotent retries with exponential backoff, jitter, bulkheads and load shedding so transient dependency trouble recovers instead of cascading—and non-critical peers cannot sink the main path.
- **Deliberate failure posture:** enforces strict authz, input schemas and state invariants at trust edges while explicitly choosing—with the user—which boundaries fail closed and which degrade or fail open.
- **Proven failure paths:** triggers timeouts, dependency errors, duplicate deliveries, restarts and malformed inputs so every guard and recovery branch is seen to fire and behave as intended.
- **Risk-proportional hardening:** targets real exposure and blast radius across the agreed threat horizon—naming accepted residual risks explicitly and stopping once the horizon is covered rather than armouring low-stakes internals.

**Undesirable**

- **Unbounded trust:** leaving network calls without timeouts, queues or payloads without size caps, shared fate with non-critical dependencies, or trust boundaries relying on polite callers.
- **Retry storm:** adding naive, unjittered or unbounded retries—or retrying non-idempotent operations—that amplify outages and produce duplicate side effects.
- **Untested catch block:** shipping defensive error handlers, timeouts, rate limits or fallback branches by inspection without triggering the fault to prove they actually fire.
- **Swallowed fault:** adding broad `try/catch` fallbacks or empty defaults that turn hard failures into silent data corruption or impossible debugging.
- **Resilience theater:** layering uncoordinated circuit breakers, caches, retries, distributed locks or internal re-validation onto low-stakes code until the defences themselves cause outages or bury domain logic.
- **Happy-path breakage:** silently altering valid semantics, breaking tolerant existing callers while tightening checks, or smuggling new user features in instead of surfacing compatibility or structural trade-offs to the user.

#### Operability

When guards trip, load spikes or peers degrade, the system emits clear, structured, secret-safe signals and handles startup, health checks, shutdown and recovery cleanly so an unfamiliar operator at 3 AM can diagnose and act without noise or collateral damage.

*Falls short:* opaque crashes, silent fallbacks, secrets leaked in logs, always-200 health checks or abrupt shutdowns that leave partial state. *Overshoots:* inventing bespoke telemetry frameworks, logging verbose payloads inside outage loops, emitting high-cardinality noise or firing alerts on self-healing blips.

Why: a system that fails safely in silence—or floods logs with secrets and noise during an outage—turns a containable fault into a prolonged 3 AM mystery.

**Desirable**

- **Diagnosable failure:** surfaces actionable, structured context (correlation IDs, failing dependency, violated limit and retryability) with accurate severity and strict redaction of secrets and sensitive data.
- **Guard visibility:** emits metrics or structured events whenever protective levers activate (rate limits, circuit opens, fallbacks, dead-letter queues or shed load) so degradation never hides silently.
- **Graceful lifecycle:** handles startup fail-fast validation, truthful health and readiness semantics, clean shutdown draining and crash recovery so deploys and restarts do not corrupt in-flight state.
- **Safe defaults:** defaults limits, timeouts, operational knobs and missing configuration to bounded, fail-safe values rather than infinite or permissive ones.

**Undesirable**

- **Silent degradation:** falling back, dropping messages, shedding load, serving stale data or opening a circuit breaker with zero metric, log or operator-visible trace.
- **Secret-leaking logs:** dumping raw request bodies, auth headers, tokens, query parameters or internal stack traces into logs or client error responses while improving diagnostics.
- **Log-flood amplification:** logging verbose payloads inside retry storms or hot loops, or logging expected client 4xx rejections as server errors, exhausting telemetry quotas and burying real alarms.
- **Observability sprawl:** introducing bespoke telemetry SDKs, high-cardinality metrics or noisy alerts on transient self-healing blips instead of fitting cleanly into existing operational conventions.
- **Brittle shutdown:** shipping always-200 health endpoints, ignoring cancellation signals, leaking open handles or exiting abruptly mid-transaction so normal restarts leave partial state.
