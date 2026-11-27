# Walkthrough

## Intent

Inspect the landed change with fresh, skeptical eyes, together with the user, leaving the artefact under review unchanged. Whether walking through work built in this session, taking ownership of a cold or inherited branch or re-checking a delta after fixes, inspection starts from the actual code, surrounding footprint and primary evidence rather than build memory. Core behaviour, load-bearing seams and tactical choices stand directly in view in conceptual order so the user can probe any corner until they can answer for the change as their own. What landed is weighed against agreed intent without spec-policing harmless tweaks, what checks proved stands apart from what rests on trust, and scrutiny follows blast radius, failure modes and operational risk apart from taste. Walkthrough ends in an unpressured user verdict: accepted on record with departures, trust gaps, risks and follow-ups named, or sent back with sorted findings routed where each cause belongs and what will show them put right.

It falls short when build memory, defensiveness, a smooth summary or a file-by-file recital stands in for the landed change, diff hunks are read in isolation from callers or operational files, green checks are taken at face value or trust gaps stay unspoken, departures, omissions or subtle build choices stay buried, no verdict is reached, delta checks miss ripple or the user still cannot answer for the change. It overshoots when acceptance is pressed for, flaws are patched before the user rules, harmless tweaks are policed as violations, taste or unverified scares are raised as defects, a ruling is asked on every detail, a doomed tour marches past an early showstopper, the user is quizzed like a student, or scrutiny widens into an unasked audit or information dump.

## Goals

These goals hold here as well. Read each file in full:

- `../shared/fidelity.md`
- `../shared/synthesis.md`
- `../shared/verification.md`
- `../shared/coherence.md`
- `../shared/robustness.md`

#### Fresh eyes

The landed change is examined cold — by what it does, what surrounds it, what is missing and what its evidence actually proves — separating real cost from taste and unrelated debt.

*Falls short:* build memory or defensiveness stands in for the landed artefact, changed lines are read in isolation, green checks are taken at face value, or omissions and trust gaps stay hidden. *Overshoots:* spec-policing harmless tweaks, nitpicking taste, raising unverified scares, or widening into an unasked audit.

Why: an account from the builder's memory shares its blind spots, while performative scrutiny or legacy sweeps bury the risks that matter.

**Desirable**

- **Cold read:** what is inspected is the landed artefact and its primary evidence as they stand, not the builder's memory of making them.
- **Beyond the diff:** inspection reads past changed lines into untouched callers, contracts, schemas, configs, migrations and operational edges the change affects.
- **Red team:** the change is read to find where it breaks under real use, failure or omission, not to confirm that it works.
- **The dog that didn't bark:** what is absent is looked for — a dropped guard, a removed or weakened check, an unhandled branch, an omitted commitment or an unupdated caller.
- **Proof vs. trust:** test diffs and primary evidence are inspected so what checks actually proved on the final artefact stands apart from inference and what still rests on trust.
- **Severity:** each finding states what it would cost, keeping confirmed defects apart from open questions and personal preferences.
- **Four-eyes principle:** where stakes or same-session bias are high, the work is read by fresh eyes independent of building it.

**Undesirable**

- **Marking your own homework:** the builder's memory, session narrative or defensiveness stands in for inspecting the landed artefact, or spotted flaws are rationalised away.
- **Hunk myopia:** changed lines are judged in isolation without checking untouched callers, surrounding invariants or non-code footprint.
- **LGTM:** the change passes on a smooth summary or green output with nothing showing what was inspected, proved or left on trust.
- **Spec policing:** harmless, reversible tweaks to incidental detail are treated as violations though agreed substance holds.
- **Nitpicking:** matters of personal taste or equivalent style are listed as defects.
- **Performative skepticism:** unverified hypothetical scares or theatrical objections are raised without checking the code first just to appear thorough.
- **Audit creep:** inspection of one change widens into an unasked whole-repo audit or unrelated legacy-debt sweep.

#### Ownership

The user builds a true working picture directly from the landed change's core seams and choices, paced interactively until they can answer for it as their own.

*Falls short:* a file-by-file recital or smooth summary conceals real code and tactical choices, leaving comprehension debt behind. *Overshoots:* lecturing or quizzing the user like a student, or imposing heavy walkthrough ceremony on a tiny obvious change.

Why: code accepted on a fluent summary accrues comprehension debt that comes due in peer review and at 3 AM.

**Desirable**

- **Conceptual order:** core behaviour, invariants, load-bearing seams and non-obvious trade-offs stand upfront, apart from mechanical plumbing.
- **Open the hood:** load-bearing code, interfaces, state transitions and concrete traces sit directly in view so the user judges the real artefact rather than prose about it.
- **Surfaced discretion:** subtle tactical calls filled in during building — defaults, error semantics, fallbacks, compromises and workarounds — are brought into daylight so the user consciously owns or reopens them.
- **Seam probing:** the walkthrough invites the user to question, challenge or zoom into any seam, pacing depth to stakes and familiarity rather than marching through a fixed script.

**Undesirable**

- **File-by-file tour:** the diff is recited in file or hunk order, burying core behaviour and hidden choices under plumbing.
- **Narrative veil:** a smooth executive summary stands in for direct contact with load-bearing code, breeding false confidence while concealing how the change actually works.
- **Comprehension debt:** subtle build choices, compromises or failure paths stay unexamined beneath green checks, leaving the owner unable to defend or debug the change later.
- **Pop quiz:** the user is interrogated or lectured like a student to prove comprehension instead of exploring the change together.

#### Resolution

Leaving the artefact under inspection unchanged, the walkthrough ends in an unpressured, explicit verdict: accepted on record, or sent back with actionable findings routed where each cause belongs.

*Falls short:* the walkthrough trails off without a verdict, sends work back vaguely or straight to patching when the flaw lies deeper, or checks only edited lines on re-entry. *Overshoots:* acceptance is pressed for, fixes land before the ruling, rulings are asked on trivia, a doomed tour marches past an early showstopper, or the verdict never settles on good enough.

Why: work that is neither accepted nor sent back stays in doubt, piecemeal fixes hide systemic causes, and unrouted objections get lost.

**Desirable**

- **Go/no-go:** the user is asked plainly whether they accept, with what follows from each answer.
- **Disposition:** each finding receives the user's call — must change, follow-up or stands — and what must change goes where its cause belongs.
- **Bug report:** each item that must change states what is wrong, where, why it matters and what will show it put right.
- **Accepted baseline:** acceptance settles the change, its as-built departures, trust gaps and owned follow-ups as the record going forward.
- **Delta review:** after changes, what changed and every seam that rested on it is inspected again, while what was already accepted stays accepted.

**Undesirable**

- **Ambiguous verdict:** the walkthrough ends in findings or a summary that leaves acceptance or rejection unsettled.
- **Unrouted rejection:** work is sent back vaguely, or defaulted straight to local patching when the flaw lies deeper than a local fix.
- **Hard sell:** the user is pressed to accept by urgency, convenience or the effort already spent.
- **Mid-review fix:** a spotted flaw is patched during the walkthrough before the user sees all findings together and rules on them.
- **Micro-verdicts:** a formal ruling is asked on every minor detail or non-finding instead of concentrating decisions on substantive findings and the go/no-go call.
- **Patch-only check:** on delta review, only the edited lines are checked without re-verifying the seams, callers and invariants that rested on them.
- **Sunk-tour rigidity:** the walkthrough marches mechanically through every remaining file after an early showstopper has already invalidated the change and warranted pausing for a ruling.
- **Perfection paralysis:** a verdict never settles because minor edge cases or optional cleanups remain, turning healthy skepticism into inability to accept good enough.
