# Plan

## Intent

Rehearse execution against the real codebase before paying its cost, together with the user. Whether working from an agreed design or a clear change that needs none, a grounded, verifiable trajectory holds from the checked baseline to the target shape: affected seams, prerequisites, technical unknowns and loose edges surface before steps lock, and work divides along natural seams into atomic, checkable vertical increments. Each step carries clear intent, exact cross-step contracts and stable anchors while leaving local code open and distant detail coarse until earlier results land, ordered to prove hard seams early, keep the build green, preserve live compatibility, keep independent tracks parallel and gate genuine points of no return. Plan ends when the user sees and commits to scope, cutlines, sequence, assumptions and any real gates, captured proportionally so a builder who was not there can pick it up cold.

It falls short when steps rest on an unchecked baseline, unverified technical bets or vague shorthand, work is cut by layer or bundled into oversized steps, consequential design gaps or hidden trade-offs are punted or quietly settled inside a task list, riskiest seams wait for the end, intermediate states break the system or live callers, checks or real gates are missing, or the commitment is not the user's. It overshoots when pre-flight checks sprawl into endless reading, the plan builds on paper with local code or brittle coordinates, distant steps are over-pinned ahead of what earlier steps reveal, independent work is chained, atomic changes are over-staged, or clear reversible plans carry defensive ceremony.

## Goals

These goals hold here as well. Read each file in full:

- `../shared/fidelity.md`
- `../shared/verification.md`
- `../shared/coherence.md`

#### Feasibility

The path from the real codebase to the target shape is verified against live reality before steps lock: seams, prerequisites, load-bearing unknowns and loose edges are surfaced and routed cleanly.

*Falls short:* planning onto broken ground, hidden coupling or unproven technical bets, or punting and quietly settling consequential design choices inside steps. *Overshoots:* open-ended codebase archaeology past what planning needs, speculative trials for cheap reversible choices, or bouncing local internals upstream.

Why: a plan built on broken ground, hidden coupling or unverified bets shatters in execution, while endless scouting stalls real work.

**Desirable**

- **Pre-flight check:** baseline health, affected seams, live state and tooling or environment prerequisites are verified before sequencing onto them, surfacing broken ground as a blocker.
- **Proof of concept:** a load-bearing technical unknown that reading cannot settle waits on a cheap, disposable trial or a front-loaded proving step rather than a guess.
- **Edge resolution:** loose edges exposed by real code are routed by stakes — local internals stay open to building, minor reversible defaults are stated plainly, consequential edges go to the user here, and structural contradictions or hidden architectural trade-offs return to design.

**Undesirable**

- **Building on sand:** sequencing steps onto an unchecked or broken baseline, or assuming missing environment, data or tooling prerequisites hold.
- **Leap of faith:** locking downstream steps onto an unverified technical assumption that only execution could prove.
- **Passing the buck:** leaving a consequential choice that needed the user or design for the builder to guess mid-step.
- **Design laundering:** quietly deciding a consequential design gap, altering the agreed shape or smuggling an unexamined architecture into a task list without surfacing the choice.
- **Codebase archaeology:** turning targeted pre-flight checks into exhaustive reading of unrelated code or history that cannot change the plan.

#### Decomposition

Work divides along real seams into right-sized, single-purpose vertical increments, each with one observable, falsifiable completion check.

*Falls short:* work is cut by technical layer, bundled into oversized steps where failures blur, or left without step-level checks. *Overshoots:* steps are sliced so thin that none proves anything on its own.

Why: layer-cut or oversized steps hide faults and delay proof until sunk cost is highest, while over-thin slices add churn without proving progress.

**Desirable**

- **Vertical slice:** work is cut into slices, each a piece of behaviour that can be seen to work.
- **Cut at the seams:** within a slice, steps divide along real codebase and design boundaries so each increment stays cohesive and independently reviewable.
- **Atomic step:** each step changes one coherent thing, keeping structural preparation apart from behavioural edits so failures localise and rollback stays contained.
- **Exit criteria:** each step names the falsifiable check that shows it done, one that would fail if it were not.

**Undesirable**

- **Horizontal slice:** work is cut by technical layer so nothing runs or proves itself until the end.
- **Monolithic step:** unrelated changes, structural preparation and risky seams are bundled into one oversized step whose failures blur and cannot be reverted cleanly.
- **Deferred verification:** steps carry no falsifiable check of their own, leaving proof until the whole plan finishes.
- **Salami slicing:** steps are cut so thin that none proves a meaningful result on its own.

#### Specification

Each step sits at the right altitude for a cold builder: intent, cross-step contracts, invariants and stable landmarks are exact, local code stays open, and distant steps stay coarse until earlier results land.

*Falls short:* shared interfaces stay implicit, or steps read as vague shorthand that forces a cold builder to guess. *Overshoots:* the plan builds on paper, anchors to brittle coordinates, or locks distant detail before earlier steps reveal it.

Why: whatever is under-specified forces a cold builder to guess with less context, while whatever is over-specified rots on contact with real code and chokes adaptation.

**Desirable**

- **Commander's intent:** a step states what it is for and what must hold when it lands, so the builder can adapt cleanly when real code differs from expectation.
- **What, not how:** a step fixes what is binding, cross-step or costly to rediscover while leaving local code, naming and private structure to the builder.
- **Semantic anchor:** steps point to stable codebase landmarks such as modules, symbols, schemas and seams rather than volatile line numbers or verbatim snippets.
- **Contract:** what one step produces and another consumes is stated exactly, and once, kept distinct from non-binding tactical notes.
- **Rolling wave:** near steps are sharp enough to build cold, while later steps whose shape depends on earlier results stay coarser until those results land.

**Undesirable**

- **Implicit contract:** steps rely on a shared interface, data shape or error semantic that is never pinned once, letting them diverge in execution.
- **Micromanagement:** local names, private structure or pseudocode on paper are dictated though nothing outside the step depends on them.
- **Brittle coordinates:** steps anchor to volatile line numbers, exact diff hunks or verbatim code excerpts that rot as earlier steps land.
- **Waterfall planning:** distant steps are locked to fine detail before earlier steps have revealed what they rest on, treating a revisable trajectory as a rigid contract.

#### Sequencing

Steps form a safe, realistic trajectory from the checked baseline to the target shape: dependencies are true, hard seams prove early, the system stays green and compatible between steps, independent tracks stay parallel, and explicit gates stand only at genuine points of no return.

*Falls short:* safe boilerplate precedes the riskiest seams, intermediate states break the build, callers or live data, early steps trap later ones, or irreversible boundaries go ungated. *Overshoots:* independent tracks are chained, atomic changes get multi-phase bridges, or clear reversible plans carry defensive ceremony.

Why: the wrong order breaks the system mid-flight and saves surprises for when sunk cost is highest, while unneeded dependencies, staging or ceremony waste attention and slow the build.

**Desirable**

- **Topological order:** each step rests only on what genuinely precedes it, exposing the critical path while leaving independent tracks free to reorder or run in parallel.
- **Walking skeleton:** the first slice proves the hardest seam or runs end to end early, however thin, and later slices widen it.
- **Keep the build green:** after every step the code builds and what passed before still passes.
- **Characterisation test:** where planned edits touch opaque or untested seams, behaviour-pinning checks land ahead of behavioural changes.
- **Preparatory refactoring:** where existing structure resists the change, a strictly behaviour-preserving refactor lands first so new behaviour lands cleanly.
- **Expand and contract:** only where live state, callers or rolling deploys cannot survive an atomic switch, the new is added first, use moves over, then the old is removed, escalating multi-phase live crossings when needed.

**Undesirable**

- **Back-loaded risk:** safe boilerplate and easy parts come first while the riskiest seam, integration or assumption waits until sunk cost is highest.
- **Destination-only thinking:** planning only the final diff while ignoring how live state, existing callers or mixed-version deploys survive intermediate states.
- **Painted into a corner:** an early step commits to a shape or order that leaves a later step no way through without tearing it up.
- **False dependency:** independent steps are chained so one blocked track stalls work that did not need it.
- **Over-staging:** forcing multi-phase bridges or redundant scaffolding onto a small, atomic, reversible change.
- **Plan theater:** padding a clear, reversible plan with boilerplate stop lists, fallback branches or defensive ceremony for ordinary build friction.
