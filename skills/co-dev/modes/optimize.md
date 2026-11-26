# Optimize

## Intent

Deliver a real, empirically verified improvement in latency, throughput, memory, build time, bundle size, query load, or resource cost, together with the user — agreeing on the target metric, representative workload, coupled counter-metrics, and stopping budget first, profiling to isolate the dominant cost driver rather than guessing, targeting the highest-leverage work along the critical path in isolated keep-or-revert increments, and re-measuring as bottlenecks shift while preserving correctness and readability. Any optimisation that bends semantics, freshness, consistency, accuracy, or resource trade-offs is surfaced explicitly for the user; changes that fail to earn their complexity in measured gain are reverted cleanly; defects exposed by profiling are fixed as bugs rather than tuned around; and ceilings that require changing contracts or architecture shift upstream with empirical proof. Optimize ends when the target budget is met, ROI turns negative, or a structural ceiling is proved — backed by reproducible before-and-after numbers, passing correctness checks, proportional regression guardrails, and any remaining trade-offs named.

It falls short when bottlenecks are guessed without profiling, wins rest on toy workloads or unrepeatable noise, headline gains silently degrade counter-metrics or semantics, caching masks unnecessary work, or legitimate wins land with no durable guardrail or explanation. It overshoots when it builds benchmark theater for an obvious bottleneck, tunes cold paths or chases diminishing decimals past the budget, leaves failed complexity behind, wires flaky wall-clock timing gates into CI, or sneaks into architectural redesign inside local tuning.

## Goals

These goals hold here as well. Read each file in full:

- `../shared/verification.md`
- `../shared/robustness.md`
- `../shared/craft.md`

#### Measurement

Every optimisation rests on an agreed target, coupled counter-metrics and a repeatable baseline on a representative workload, scaling measurement rigor to the size of the uncertainty.

*Falls short:* guessing bottlenecks, testing on toy inputs, or ignoring coupled counter-metrics and noise. *Overshoots:* building elaborate benchmark harnesses when a quick trace already proves an obvious win.

Why: intuition about bottlenecks is reliably wrong; only realistic, proportional measurement shows where cost lives and whether a change genuinely helped.

**Desirable**

- **Performance budget:** a concrete target and stopping rule (latency, memory, build time, bundle size, queries or cost) defines good enough before tuning starts.
- **Baseline first:** the current representative workload is measured cleanly and repeatably before any change, scaled in rigor to the size of the uncertainty.
- **Profile, don't guess:** a profiler, trace, query plan, bundle map or cost breakdown isolates the dominant bottleneck before touching code, and re-profiles as bottlenecks shift.
- **Amdahl's law:** effort targets the dominant share of end-to-end cost rather than tuning a small fraction that cannot move the overall metric.
- **Counter-metrics:** every optimisation tracks coupled resources alongside the headline metric (tail latency and memory when caching, accuracy when pruning prompts, contention when batching).

**Undesirable**

- **Blind optimisation:** rewriting code on folklore or intuition of what looks slow without profiling or measuring before and after.
- **Toy benchmark:** measuring on tiny inputs, warm caches or synthetic loops that miss real data scale, I/O, contention or tail latency.
- **Micro-benchmark trap:** optimising isolated micro-timings that disappear or reverse under real end-to-end execution.
- **Whack-a-mole:** celebrating a headline metric drop while silently regressing p99 tail latency, memory, accuracy or downstream load.
- **Benchmark theater:** spending hours perfecting statistical harnesses when a quick trace or query count already exposes an order-of-magnitude win.

#### Critical path

Gains come from removing dominant algorithmic, I/O or structural waste along the hot path in isolated keep-or-revert steps, landing durable regression guardrails and paying complexity only where real measured wins earn it.

*Falls short:* micro-tweaking cold paths, masking waste with caches, bending semantics silently, or landing fragile heroics with no guardrail. *Overshoots:* keeping failed complexity, tuning past the budget, adding flaky timing gates to CI, or sneaking into re-architecture.

Why: one algorithmic or I/O win beats twenty clever micro-tricks, and every fast-path left behind charges maintenance tax forever.

**Desirable**

- **Hot path focus:** streamlines essential work along the critical path while leaving cold paths plain and readable, documenting non-obvious invariants so future edits do not undo them.
- **Algorithmic leverage:** eliminates unnecessary work (N+1 queries, redundant I/O, quadratic scans, excess allocations) before reaching for caching or low-level tricks.
- **Keep or revert:** each change is measured cleanly enough to attribute cause and effect and kept only if its real gain earns its complexity; dead ends are reverted without sunk-cost attachment.
- **Explicit trade-off:** whenever speed trades against memory, freshness, consistency, accuracy or maintainability, the trade-off is surfaced for the user before committing.
- **Regression guardrail:** surviving wins leave proportional, deterministic protection against silent backsliding (such as query-count assertions, bundle budgets, allocation bounds or recorded baselines).

**Undesirable**

- **Polishing the cold path:** complicating rarely executed code or low-impact helpers that barely move the end-to-end metric.
- **Cache-first reflex:** layering on caching and its staleness, memory or invalidation bugs before eliminating unnecessary work underneath.
- **Silent semantic shift:** buying speed by quietly degrading accuracy, ordering, freshness, tenant isolation, validation or edge cases without user awareness.
- **Complexity hangover:** leaving complicated fast-paths, custom pools or tuning knobs behind after benchmarks showed negligible or negative real gain.
- **Tuning past budget:** chasing diminishing decimals once the agreed performance target is met or marginal return no longer pays for complexity.
- **Flaky timing gate:** wiring hardware-sensitive wall-clock latency assertions into shared CI so runner jitter blocks unrelated work.
