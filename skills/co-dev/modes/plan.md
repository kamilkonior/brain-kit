# Plan

## Intent

Simulate execution against the real codebase before paying its cost, together with the user — charting a safe, verifiable trajectory from the checked current baseline to an agreed goal or shape: it cuts work at natural seams into cold-start increments with clear intent, stable semantic anchors, exact cross-step contracts and falsifiable exit checks, leaves local implementation open to the builder, orders steps to prove hard seams early while keeping the build green and independent work parallel, and stays sharp up front while leaving later detail to earlier results. Mapping the path onto real code exposes broken baselines, hidden coupling, unverified technical unknowns or loose design edges early enough to diagnose, run a quick trial, settle with the user or return to design before coding — placing explicit hold points or retreat paths only where genuine irreversibility or residual uncertainty warrants them. Plan ends when the user sees and commits to the scope, sequence and any real gates, captured proportionally to survive interruptions and guide a builder who was not there.

It falls short when steps are vague shorthand or cut by layer, design gaps are punted to the builder or resolved silently, an unchecked baseline or happy-path order breaks the system or saves hard seams for the end, checks or genuine irreversible gates are missing, or the commitment is not the user's. It overshoots when it builds on paper — dictating local code, anchoring to brittle line numbers, fixing what only earlier steps can show, chaining independent work, over-staging atomic changes, or padding clear reversible plans with defensive ceremony for cheap, unlikely problems.

## Goals

These goals hold here as well. Read each file in full:

- `../shared/fidelity.md`
- `../shared/verification.md`
- `../shared/coherence.md`

#### Decomposition

The agreed shape is grounded in the real codebase and cut into self-contained increments that someone who was not there can take one at a time, each with one observable, checkable result — pinning boundaries, contracts and consequential choices while leaving local implementation open.

*Falls short:* steps are vague shorthand, cut by layer, or punt or quietly decide open design choices. *Overshoots:* the plan builds on paper — dictating local code, anchoring to brittle line numbers, or slicing so thin that no step proves anything on its own.

Why: whatever a step leaves genuinely under-specified, a cold builder must guess mid-task with less context; whatever it over-specifies rots on contact with real code and chokes the builder's discretion.

**Desirable**

- **Vertical slice:** the work is cut into slices, each a piece of behaviour that can be seen to work.
- **Cut at the seams:** within a slice, steps divide along real codebase and design boundaries, carrying through every caller, type, test and doc affected.
- **Commander's intent:** a step says what it is for, so that whoever builds it can adapt when the code differs from what was expected.
- **Exit criteria:** each step names the check that will show it done, one that would fail if it were not.
- **What, not how:** a step fixes what is binding, cross-step or costly to rediscover (contracts, invariants, edge cases, non-obvious gotchas) and leaves local code, naming and private structure to the builder.
- **Semantic anchor:** steps point to stable codebase landmarks (files, modules, symbols, types, seams) rather than volatile line numbers or verbatim code excerpts.
- **Contract:** what one step builds and another uses is written exactly, and once, kept distinct from non-binding tactical notes.
- **Gap triage:** when mapping onto code exposes a loose edge left by design, local internals stay open to build, minor reversible defaults are stated plainly, consequential edges are settled with the user here, and structural contradictions return to design.
- **Rolling wave:** steps whose exact shape depends on what earlier ones reveal stay coarser until those earlier steps land.

**Undesirable**

- **Horizontal slice:** work is cut by technical layer (schema, then backend, then UI, then tests) so nothing runs or proves itself until the end.
- **Micromanagement:** local names, private structure or code on paper are dictated though nothing outside the step depends on them.
- **Brittle coordinates:** steps are anchored to volatile line numbers, exact diff hunks or verbatim snippets that rot as earlier steps edit the file.
- **Salami slicing:** steps are cut so thin that none has a result of its own.
- **Passing the buck:** a consequential choice that needed the user or the design is left to whoever builds the step.
- **Silent redesign:** a consequential design gap is quietly decided, or the agreed shape is altered, inside a plan step without surfacing the choice to the user.

#### Sequencing

The steps form a realistic, safe trajectory from the verified current codebase to the target shape: each rests only on what comes before it, the system keeps working between them, hard seams are proven early, independent work stays parallel, and explicit gates appear only at real cliffs.

*Falls short:* an order built on an unchecked baseline that breaks the system between steps, leaves hard seams for the end, or steps blindly into an irreversible boundary or unverified unknown. *Overshoots:* artificial ordering, unnecessary multi-phase staging, or defensive ceremony on clear, reversible work.

Why: the wrong order breaks the system mid-flight and saves surprises for when sunk cost is highest — while unneeded staging or defensive ceremony wastes attention and slows the build.

**Desirable**

- **Known baseline:** the real starting state of the repo and its checks is verified before sequencing onto it — surfacing broken baselines first and placing characterisation checks ahead of untested seams.
- **Topological order:** no step needs what a later step builds.
- **Walking skeleton:** the first slice proves the hardest seam or runs from end to end early, however thin, and later slices widen it.
- **Keep the build green:** after every step the code builds, and what passed before still passes.
- **Preparatory refactoring:** where existing structure resists the change, a behaviour-preserving refactor comes first so the new behaviour lands cleanly.
- **Expand and contract:** only where existing callers or live state cannot survive an atomic switch, the new is added first, use moves over, then the old is removed — escalating multi-phase live data or consumer crossings when needed.
- **Guarded cliff:** where a step crosses an irreversible, external or costly-to-unwind boundary, the hold point and retreat path are named.

**Undesirable**

- **Comfort-first sequencing:** safe boilerplate and easy parts come first while the riskiest assumption, migration or integration waits until sunk cost is highest.
- **Destination-only thinking:** planning only the final diff while ignoring how live data, existing callers or mixed-version deploys survive intermediate states.
- **Painted into a corner:** an early step leaves a later one no way through without tearing it up.
- **Unmarked cliff:** stepping across an irreversible, external or costly-to-unwind boundary without an explicit hold point and retreat path.
- **False dependency:** independent steps are chained, so that one blocked step stops the rest.
- **Over-staging:** forcing multi-phase expand-and-contract bridges or redundant scaffolding onto a small, atomic, reversible change.
- **Plan theater:** padding a clear, reversible plan with boilerplate stop lists, fallback branches or defensive ceremony for ordinary build friction.
