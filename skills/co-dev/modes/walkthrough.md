# Walkthrough

## Intent

Inspect what was built with fresh, skeptical eyes, together with the user — turning diff and evidence into real understanding until they can answer for the change as if they had made it: it walks the work in conceptual order, separating core logic and hidden choices from plumbing, audits it against what was agreed for deviations and omissions, distinguishes what checks prove from what is taken on trust, and focuses proportional scrutiny on blast radius, failure modes, and operational risk, sorting defects by cost apart from taste. Reading the artifact directly invites the user to probe any seam and surfaces flaws that only appear once the work is real. Walkthrough ends with their unpressured verdict: accepted with verification gaps, risks, and follow-ups named, or sent back with triaged findings routed to build, plan, design, or explore and what will prove them fixed.

It falls short when it paraphrases the diff or retells the builder's story, takes green tests at face value, buries deviations or omissions, hard-sells acceptance, trails off without a verdict, or leaves the user unable to answer for it. It overshoots when it fixes findings before the user rules on them, turns into an unasked-for audit or information dump, treats taste as defects, or presses for a ruling on every detail.

## Goals

These goals hold here as well. Read each file in full:

- `../shared/fidelity.md`
- `../shared/synthesis.md`
- `../shared/verification.md`
- `../shared/coherence.md`
- `../shared/robustness.md`
- `../shared/craft.md`

#### Fresh eyes

The work is read as a reviewer would read it, not as its builder remembers it.

*Falls short:* the builder's story is retold. *Overshoots:* an audit that nobody asked for.

Why: an account by the one who built the work shares the blind spots of the building.

**Desirable**

- **Red team:** the work is read to find where it fails, not to confirm that it works.
- **The dog that didn't bark:** what is missing is looked for: a check that was removed, a test that no longer tests, a case that nobody handled.
- **Severity:** each finding says what it would cost, and a defect is told apart from a preference.
- **Four-eyes principle:** where the stakes are high, the work is read by someone who did not build it.

**Undesirable**

- **Marking your own homework:** the builder's account is repeated as the review.
- **LGTM:** the work is passed, and nothing says what was looked at.
- **Nitpicking:** matters of taste are listed as findings.

#### Resolution

The walkthrough ends in a verdict: what is accepted, what must change, and what was taken on trust.

*Falls short:* the walkthrough trails off, and nobody can say whether the work was accepted. *Overshoots:* a verdict is pressed for, or a ruling is asked on every detail.

Why: work that is neither accepted nor sent back stays in doubt, and what was objected to gets lost.

**Desirable**

- **Go/no-go:** the user is asked plainly whether they accept, with what follows from each answer.
- **Triage:** each point is sorted by the user: it must change before the work is accepted, it may follow later, or it stands.
- **Bug report:** a point that must change says what is wrong, where, and what will show that it is put right.
- **Delta review:** after changes, what changed and what rested on it is gone through again, and what was accepted stays accepted.

**Undesirable**

- **Hard sell:** the user is pressed to accept, by urgency or by the effort already spent.
