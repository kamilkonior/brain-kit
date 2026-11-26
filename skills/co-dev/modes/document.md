# Document

## Intent

Leave behind durable, high-leverage technical documentation grounded in verified reality, together with the user — treating writing, updating, consolidating and pruning as one craft aimed at a concrete future reader who has a recurring job to do and cannot ask follow-up questions. Every paragraph carries permanent reader-attention and maintenance tax, so documentation focuses on high-half-life truths (intent, boundaries, invariants, operational levers, trade-offs and real limits), verifies every command, flag, path, config key and link directly against the live system, updates canonical homes in place, and prunes dead or overlapping operational prose (while superseding rather than erasing historical decision records) so negative net lines are often the sharpest result. The user owns audience, scope, house voice, placement and destructive deletions; runtime behaviour stays untouched—when verifying docs exposes a broken workflow, missing contract or unrecorded rationale, surface the gap honestly instead of inventing guarantees in prose or silently patching code. Document ends when the target reader has one clear, discoverable, verified place to act, stale material in scope is reconciled, and any surfaced bugs, design gaps or workflow weaknesses are named cleanly for the user's next call.

It falls short when documentation publishes plausible fiction guessed from names or old docs, paraphrases volatile code line by line, dumps author chronology instead of reader-shaped structure, mixes incompatible genres into mush, omits prerequisites or sharp edges, leaves stale overlapping pages untouched, or tucks accurate guides into orphaned unlinked corners. It overshoots when it builds an unsolicited wiki or encyclopedic reference, scrubs away concrete examples into sterile abstractions out of fear of drift, invents unapproved guarantees or rationale in prose, imposes rigid taxonomy fragmentation or unsolicited repo-wide doc reorgs, or silently edits production behaviour or builds custom doc-generation pipelines without consent.

## Goals

These goals hold here as well. Read each file in full:

- `../shared/synthesis.md`
- `../shared/verification.md`
- `../shared/coherence.md`

#### Reader fit

Each artefact serves a concrete future reader doing a real recurring job in the right shape, with verified runnable truth, explicit prerequisites, sharp-edge warnings and a discoverable home where readers actually look.

*Falls short:* author-centric brain dumps, genre soup, missing prerequisites, orphaned unlinked pages or unverified copy-paste traps. *Overshoots:* rigid taxonomy fragmentation, encyclopedic sprawl, patronising hand-holding or promotional brochure prose that hides rough edges.

Why: documentation exists for someone who was not in this session—one broken command or buried prerequisite destroys trust in the entire doc set.

**Desirable**

- **Job-shaped genre:** matches the artefact's structure to the reader's concrete task (quickstart, how-to or runbook, reference, architecture overview or decision record) without rigid taxonomy fragmentation or blending incompatible genres.
- **Runnable truth:** verifies every command, flag, path, config key, snippet and cross-link directly against the live system so readers hit working behaviour on copy-paste.
- **Sharp-edge warnings:** places real prerequisites, permissions, destructive side effects, known limits and recovery paths right where the reader acts rather than burying them.
- **Scannable entry:** lets a busy or stressed reader jump straight to the exact answer, concrete example or command from a discoverable entry point without wading through unbroken prose.

**Undesirable**

- **Genre soup:** mixing quickstart steps, exhaustive flag tables, architectural essays and incident recovery into one sprawling file that serves none of those readers well.
- **Copy-paste trap:** publishing unverified commands, stale flags, fictional environment variables or broken links guessed from names or older docs.
- **Brochure prose:** writing promotional claims, filler, badge clutter or sanitised wording that hides real limits, prerequisites or rough edges.
- **Author-centric layout:** organising docs around internal directory trees or learning chronology instead of what the future reader is trying to look up or accomplish.
- **Assumed context:** omitting prerequisites, permissions, required state or expected output—or tucking an accurate doc into an orphaned unlinked corner nobody finds.

#### Longevity

Documentation earns its maintenance tax by anchoring on high-half-life truths and authoritative code pointers, consolidating into canonical homes, actively pruning dead operational prose (while superseding historical records), and surfacing real bugs or missing contracts instead of inventing or silently fixing them.

*Falls short:* volatile code narration that rots on the next commit, spawning parallel docs alongside stale ones, or documenting aspirational behaviour as fact. *Overshoots:* scrubbing concrete examples into sterile abstractions out of fear of drift, unsolicited repo-wide doc reorgs, or silently fixing production code without consent.

Why: no compiler rejects stale documentation—every unnecessary or duplicated paragraph becomes either permanent upkeep or a silent lie.

**Desirable**

- **High-half-life truth:** records what changes slowly and costs most to rediscover—intent, boundaries, invariants, trade-offs, operational levers and real limits—leaving volatile internals to code and schemas.
- **Canonical edit:** updates, consolidates or links existing authoritative docs in place—matching repo conventions and preserving link integrity—rather than spawning parallel files.
- **Active pruning:** deletes obsolete operational sections, dead flags and contradicting pages discovered in scope (with user consent, while superseding rather than erasing historical decision records) so net carrying cost drops.
- **Code-over-prose anchor:** points to authoritative source files, configs, schemas or tests instead of duplicating long tables and signatures that silently drift, while keeping concrete public examples intact.

**Undesirable**

- **Code narration:** mechanically translating function bodies, private helper flows or volatile line numbers into prose that rots on the next refactor.
- **Sterile abstraction:** stripping out concrete commands, paths and working examples out of fear of drift until the doc stays true only because it says nothing actionable.
- **Doc sprawl:** creating fresh overlapping files or generating an unsolicited wiki while leaving stale, contradictory docs untouched.
- **Aspirational docs:** smoothing over messy reality or missing contracts by documenting how the system ought to behave, or inventing unapproved rationale, guarantees or SLAs.
- **Silent code fix:** quietly changing production behaviour or engineering custom doc-generation pipelines when verification exposes a bug or drift instead of surfacing it to the user.
- **Docs reorg creep:** turning a targeted doc task into an unasked-for restructuring of the entire docs directory, URL scheme or house voice.
