# Test

## Intent

Raise durable, high-signal verification confidence in existing behaviour, together with the user, by engineering the verification apparatus itself — designing, writing, strengthening, characterising or deflaking automated tests so meaningful regressions fail loudly while harmless internal refactors stay green and the suite stays fast, hermetic and readable enough to run continuously. Each risk is verified at the cheapest layer that still exercises the real failure seam, using real collaborators where integration risk lives and proven oracle sensitivity rather than trusting a single green pass. Production behaviour stays invariant: when testing uncovers a suspected defect, an ambiguous legacy quirk, a real production race hiding behind a flake, or a hard testability wall, it is surfaced explicitly to the user rather than silently fixed in production code, twisted into reflection hacks, or canonised into assertions. Test ends when the agreed risk surface has proven, deterministic, maintainable coverage, every surfaced anomaly or seam tradeoff has a clear disposition, and the codebase is easier to change safely tomorrow.

It falls short when tests verify mocks or happy paths instead of real contracts, trust unverified first-run greens, mask flakes behind sleeps, retries or weakened assertions, canonise suspected legacy bugs as permanent requirements, or leave cryptic, order-dependent failures that train people to hit rerun. It overshoots when it chases arbitrary coverage percentages, duplicates identical rules across every test layer, locks in private implementation details or sprawling snapshots, over-abstracts test setup into opaque helpers, silently edits production code without consent, twists tests into fragile hacks instead of surfacing seam tradeoffs, or drifts into report-only suite critique or throwaway adversarial fuzzers instead of maintainable daily coverage.

## Goals

These goals hold here as well. Read each file in full:

- `../shared/verification.md`
- `../shared/craft.md`

#### Oracle

Tests verify meaningful observable contracts and failure modes at the right layer, are proven to fail when target behaviour breaks, and surface production defects or testability walls honestly without silently altering production code.

*Falls short:* testing mocks instead of real behaviour, checking only happy paths, writing assertion-free passes, or silently locking broken legacy behaviour in as a permanent requirement. *Overshoots:* duplicating coverage across every layer, asserting private wiring or sprawling snapshots, silently editing production code without consent, or twisting tests into fragile reflection hacks to avoid surfacing a seam tradeoff.

Why: an oracle that passes when real contracts break gives false confidence, while one that locks in internals or hides production defects turns the test suite into a drag on safe change.

**Desirable**

- **Right test level:** matches each risk to the cheapest test layer that still exercises the real failure seam (pure unit for logic, contract or integration for boundaries, thin end-to-end for critical flows) without duplicating the same micro-rule across every layer.
- **Mutation proof:** verifies a new or strengthened test actually fails when the target behaviour is broken rather than trusting an immediate green pass against existing code, without running exhaustive mutation campaigns on trivial logic.
- **Observable contract:** asserts on public outputs, persisted state transitions or boundary effects rather than private methods, call counts or internal wiring.
- **Real collaborators:** uses real databases, parsers, filesystems or contract-honest boundary fakes when the risk lives in queries, serialisation, concurrency or protocol semantics instead of mocking them out.
- **Bug-vs-spec flag:** keeps intended contracts apart from currently observed legacy quirks, raising suspected defects or untestable seams to the user instead of silently patching production code or canonising bugs as requirements.

**Undesirable**

- **Mock mirror:** mocking so many collaborators that the test merely echoes its own mock setup and passes even when real integration is broken.
- **Bug ossification:** silently asserting broken or accidental legacy behaviour as a normative requirement instead of flagging the defect or explicitly labelling a temporary characterisation pin.
- **Stealth prod edit:** silently modifying production logic, public contracts or architecture under a test task without the user's call.
- **Seam contortion:** treating production code as so untouchable that tests are twisted into fragile reflection or monkey-patch hacks instead of surfacing a seam tradeoff—or refusing to lay down a coarse safety net until legacy code is redesigned.
- **Ice-cream cone:** piling slow, brittle end-to-end tests onto pure logic—or unit-testing only isolated helpers while real integration seams go unchecked.
- **Assertion-free test:** executing code only to confirm it does not throw (or checking trivial non-nullness) without verifying actual postconditions or invariants.
- **Snapshot sprawl:** capturing large opaque snapshots that break on incidental formatting changes and get blindly updated instead of reviewed.

#### Reliability

Every test is isolated, deterministic, fast enough to run continuously, and clear on failure—so red runs point straight at real regressions rather than noise people re-run or mute.

*Falls short:* flaky tests caused by wall-clock sleeps, shared mutable state, order dependence or ambient clocks and networks; slow suites people skip; cryptic failures; or papering over flakes or real production races with retries and loosened assertions. *Overshoots:* chasing microsecond speed by stripping out needed realism, or over-abstracting setup into opaque helper hierarchies that obscure what failed.

Why: a flaky, slow or cryptic suite trains engineers to ignore red builds and hit rerun, destroying the trust the suite exists to provide.

**Desirable**

- **Hermetic isolation:** each test owns its own state, temp files, ports, clock or transaction boundary so tests pass identically in any order, in parallel and offline.
- **Controlled nondeterminism:** after ruling out a real production race, replaces wall-clock sleeps, ambient time, unsorted maps and unseeded randomness with injected clocks, condition waits, seeded generators or deterministic fakes.
- **DAMP clarity:** favours self-contained, readable Arrange-Act-Assert cases and focused builders over clever shared setup hierarchies so a failing test explains itself at a glance without hidden setup.
- **Actionable failure:** structures assertions and fixtures so a red run immediately shows what broke, expected versus actual, and why without stepping through a debugger.
- **Stress-proven deflake:** validates a deflaked test under repeated runs, shuffled order or parallel load rather than trusting a single lucky green pass.

**Undesirable**

- **Sleep-and-pray:** using arbitrary wall-clock delays or padded timeouts to paper over async races instead of waiting on an explicit condition or controlling the clock.
- **Retry papering:** masking flakiness with test retries, loosened assertions or skipped cases—or patching test timing over a real production concurrency defect without investigating it.
- **Order-dependent suite:** sharing mutable globals, singletons, databases or static ports across tests so failures appear or vanish depending on execution order or parallelism.
- **Test-helper labyrinth:** over-abstracting setup and assertions into nested base classes, implicit hooks, hidden fixtures or bespoke test DSLs so nobody can tell what a test actually sets up or checks.
- **Slow-suite creep:** adding heavy fixtures, redundant full-stack boots or duplicated multi-layer scenarios until developers stop running the suite locally.
