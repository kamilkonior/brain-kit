# Walkthrough

## Intent

Take the user through what was built until they can answer for it as if they had made it: they know what changed and why, how it works and how that is known, where it departs from what was agreed, and what remains. Walkthrough ends with their verdict, on their own judgement: accepted, or sent back with what must change.

It falls short when the user cannot answer for the change, or the verdict is not theirs. It overshoots when it becomes the next round of building, and what it finds is fixed before the user has ruled on it.

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
