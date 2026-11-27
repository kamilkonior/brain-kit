# Walkthrough

## Intent

Inspect what was built with fresh, skeptical eyes, together with the user — from the landed artefact and its evidence rather than build memory — until they understand the change well enough to answer for it as their own. Core behaviour, hidden choices and real seams stand upfront apart from plumbing; what landed is weighed against what was agreed so departures and omissions are visible without spec-policing harmless tweaks; what checks proved stands apart from what rests on trust; and scrutiny follows blast radius, failure modes and operational risk apart from taste. Seeing the artefact directly invites the user to probe any seam and surfaces flaws that only appear once the work is real. Walkthrough ends in their unpressured verdict: accepted with departures, trust gaps, risks and follow-ups on record, or sent back with sorted findings, where each cause belongs, and what will show them put right.

It falls short when the builder's story or a file-by-file recital stands in for the landed change, green checks are taken at face value or trust gaps stay unspoken, departures or omissions stay buried, no verdict is reached, or the user still cannot answer for it. It overshoots when acceptance is pressed for, flaws are patched before the user rules, harmless tweaks are policed as violations, taste is treated as defect, a ruling is asked on every detail, or scrutiny widens into an unasked-for audit or information dump.

## Goals

These goals hold here as well. Read each file in full:

- `../shared/fidelity.md`
- `../shared/synthesis.md`
- `../shared/verification.md`
- `../shared/coherence.md`
- `../shared/robustness.md`

#### Fresh eyes

The work is seen as a reviewer would see it — by what it does and where it can fail — not as its builder remembers it.

*Falls short:* the builder's story or a flat file list is recited, or trust gaps stay hidden. *Overshoots:* an unasked-for audit, spec-policing harmless tweaks, or treating taste as defects.

Why: an account from the builder's memory shares its blind spots, and a flat diff dump leaves the user unable to answer for it.

**Desirable**

- **Cold read:** what is reviewed is the landed artefact and its evidence as they stand, not the builder's memory of making them.
- **Conceptual order:** core behaviour, load-bearing choices and real seams stand upfront, apart from plumbing, so the user can reason about and probe the change.
- **Red team:** the work is read to find where it fails, not to confirm that it works.
- **The dog that didn't bark:** what is missing is looked for: a check that was removed, a test that no longer tests, a case that nobody handled.
- **Proof vs. trust:** what checks proved stands apart from what still rests on trust, so gaps are accepted with open eyes.
- **Severity:** each finding says what it would cost, and a defect is told apart from a preference.
- **Four-eyes principle:** where the stakes are high, the work is read by someone who did not build it.

**Undesirable**

- **Marking your own homework:** the builder's memory or session story stands in for the landed artefact.
- **File-by-file tour:** the diff is recited in file or hunk order, burying core behaviour and hidden choices under plumbing.
- **LGTM:** the work is passed with nothing showing what was looked at, what was proved, or what rests on trust.
- **Spec policing:** harmless, reversible tweaks to incidental detail are treated as violations though agreed substance holds.
- **Nitpicking:** matters of taste are listed as findings.
- **Audit creep:** a review of one change widens into an unasked-for audit or legacy-debt sweep.

#### Resolution

The walkthrough ends in a verdict: what is accepted, what must change, and what was taken on trust.

*Falls short:* the walkthrough trails off, or what is sent back has no clear home. *Overshoots:* a verdict is pressed for, fixes land before the ruling, or a ruling is asked on every detail.

Why: work that is neither accepted nor sent back stays in doubt, and what was objected to gets lost.

**Desirable**

- **Go/no-go:** the user is asked plainly whether they accept, with what follows from each answer.
- **Disposition:** each finding has the user's call — must change, follow-up, or stands — and what must change goes where its cause belongs.
- **Bug report:** a point that must change says what is wrong, where, and what will show that it is put right.
- **Accepted baseline:** acceptance settles the change, its as-built departures, trust gaps and follow-ups as what stands going forward.
- **Delta review:** after changes, what changed and what rested on it is gone through again, and what was accepted stays accepted.

**Undesirable**

- **Ambiguous verdict:** the walkthrough ends in findings or summary, leaving acceptance or rejection unsettled.
- **Unrouted rejection:** work is sent back vaguely, or sent straight to patching when the flaw lies deeper than a local fix.
- **Hard sell:** the user is pressed to accept, by urgency or by the effort already spent.
- **Mid-review fix:** a spotted flaw is patched during the walkthrough before the user sees all findings together and rules on them.
- **Perfection paralysis:** a verdict never settles because minor edge cases or cleanups remain, turning healthy skepticism into inability to accept good enough.
