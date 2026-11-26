# Refactor

## Intent

Reshape existing code for structural fitness while keeping external behaviour strictly invariant, together with the user — whether paying down structural drag or carving a clean seam ahead of upcoming work, pinning observable behaviour proportionally to risk before moving code, advancing in reversible green-to-green steps, and separating structural edits from bug fixes or features. Latent defects or contract ambiguities are surfaced rather than fixed in place, white-box test edits move transparently to the behavioural boundary without weakening assertions, and deeper uncertainty, competing designs, or multi-stage migrations shift into the main pipeline. Refactor ends when the structural payoff is earned and legible, equivalence is verified, no half-migrated idiom remains, and the codebase returns firmer for review or the calling work.

It falls short when refactoring silently alters edge cases, error semantics, or side effects, reshapes weakly tested code on visual optimism, weakens failing tests without proving equivalence, breaks the build across wide edits, or leaves two competing idioms behind. It overshoots when it creates cosmetic churn, builds speculative abstractions or heavy harnesses for compiler-checked moves, cascades into boy-scout sprawl or a big-bang rewrite, treats accidental internals as sacred, or prompts for approval on mechanical steps.

## Goals

These goals hold here as well. Read each file in full:

- `../shared/modularity.md`
- `../shared/coherence.md`
- `../shared/craft.md`
- `../shared/verification.md`

#### Preservation

Externally observable behaviour—outputs, side effects, error semantics, edge cases and timing contracts—remains identical before and after, backed by proportional proof across reversible green-to-green steps.

*Falls short:* silent behavioural drift, refactoring untested code on visual optimism, weakening tests or breaking the build across wide edits. *Overshoots:* treating accidental internals as sacred contract, or building heavy harnesses and artificial shims for simple compiler-checked moves.

Why: the moment behaviour shifts inside a refactor, neither tests nor reviewers can separate structural movement from behavioural change.

**Desirable**

- **Two hats:** structural refactoring and behavioural changes (bug fixes, feature edits or semantic optimisations) never happen in the same step or commit.
- **Safety net:** before reshaping weakly tested or semantically subtle code, observable behaviour and contracts are pinned proportionally to the risk.
- **Green-to-green:** code moves from old shape to new shape through small, compiling, always-passing steps so regressions localise immediately and work can pause or revert cleanly.
- **Branch by abstraction:** larger internal replacements introduce the new seam beside the old and migrate callers incrementally while staying green rather than tearing everything up at once.

**Undesirable**

- **Stealth behaviour change:** silently fixing a bug, altering an edge case, changing error shapes, evaluation order or defaults inside a refactor without surfacing it as a behavioural change.
- **Blind refactoring:** trusting visual equivalence across dynamic code, aliasing, exception paths or concurrency without verifying real behavioural contracts.
- **Broken-world refactoring:** tearing up working code across many files so nothing compiles or passes until the entire restructure finishes.
- **Test-suite sabotage:** weakening, deleting or rewriting a failing behavioural assertion assuming it was only testing old internals, without proving equivalence.
- **Harness paralysis:** building heavy characterisation suites or artificial compatibility shims for low-risk, compiler-checked local moves.

#### Payoff

The reshape delivers a concrete, legible reduction in coupling, complexity or friction for a real flaw or upcoming change, stays tightly bounded, and leaves no half-finished transition behind.

*Falls short:* shuffling code sideways without reducing complexity, or abandoning a partial migration across two idioms. *Overshoots:* cosmetic churn, speculative cleanup, boy-scout sprawl or rewriting working code from scratch.

Why: every structural edit carries review and regression cost; reshaping without clear payoff trades real risk for taste.

**Desirable**

- **Targeted smell:** the refactor answers a concrete structural problem or an upcoming change that fights the grain of the code, not vague dissatisfaction.
- **Seam:** establishes or uses clean boundaries where behaviour can be isolated, tested or changed locally without pulling on the whole graph.
- **Bankable increment:** each completed stage leaves the codebase strictly cleaner and consistent on its own, so stopping early still yields shippable value.
- **Structural exit:** refactoring stops once the target boundary is clean or the upcoming change is easy, recording adjacent mess as follow-ups rather than absorbing it.

**Undesirable**

- **Cosmetic churn:** renaming, reordering or splitting code to personal taste without reducing coupling or cognitive load.
- **Two-worlds codebase:** migrating one call site or introducing a new helper while leaving sibling code on the old idiom so readers must carry both.
- **Boy-scout sprawl:** cascading "while I'm here" cleanups, reformatting and unrelated renames that explode diff size and bury the real purpose.
- **Big-bang rewrite:** discarding messy but battle-tested code to rewrite from scratch instead of transforming incrementally, silently dropping encoded edge cases.
- **Speculative refactoring:** reshaping stable code nobody is changing for hypothetical future flexibility that has not arrived.
