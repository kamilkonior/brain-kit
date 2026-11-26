# Audit

## Intent

Deliver decision-grade, calibrated assurance over a bounded surface against explicit standards, together with the user — agreeing on the charter, surface, and invariants up front, enumerating every in-scope path including shadow surfaces like workers, webhooks, admin routes, migrations, configs, and log sinks, stratifying depth by risk, and verifying real enforcement rather than trusting middleware names, comments, or raw scanner output. Both violations and holding controls are backed by concrete evidence and verification strength so absence of evidence is never confused with evidence of absence, while weighing actual threat model and compensating controls without excusing violations as local convention. Coverage stays disciplined across the full perimeter rather than stopping at the first bug or patching gaps mid-sweep. Audit ends with an actionable assurance picture: what held and how strongly it was verified, confirmed gaps grouped by systemic root class and ranked by real exposure, explicit blind spots and unverifiable boundaries, and clear options to remediate, investigate deeper, or accept residual risk in the user's hands.

It falls short when auditing relies on streetlight spot-checking that misses shadow surfaces, rubber-stamps middleware names or parrots raw scanner dumps, leaves uninspected areas silent as false assurance, excuses real gaps as local convention, or stops at the first juicy bug. It overshoots when it inflates minor hygiene into critical blockers, hides behind CYA disclaimers so nothing passes, drifts outside the charter into style or endless scope creep, vanishes down an exotic exploit rabbit hole while the perimeter stays dark, or silently patches code mid-audit.

## Goals

These goals hold here as well. Read each file in full:

- `../shared/robustness.md`
- `../shared/synthesis.md`

#### Coverage

The exact charter and full in-scope surface—including shadow paths—are enumerated up front, examined at risk-proportional depth, and accounted for honestly with both holding controls and blind spots stated.

*Falls short:* streetlight spot-checking, checkbox compliance, or silent omissions that create false assurance. *Overshoots:* uniform shallow box-ticking, unbounded scope creep, or vanishing down one corner while the perimeter stays dark.

Why: "no issues found" is meaningless unless you know which surfaces were checked, against what standard, how strongly, and what remained out of reach.

**Desirable**

- **Audit rubric:** the exact invariants or standards being judged (authz, tenant isolation, secrets, privacy, idempotency or dependency hygiene) are agreed before sweeping.
- **Surface inventory:** every in-scope entry point and shadow surface (HTTP routes, workers, webhooks, admin scripts, migrations, configs and log sinks) is enumerated so nothing slips past by omission.
- **Negative assurance:** what held is reported alongside gaps with its verification strength (static trace, config check, test or runtime observation), clearly separated from unverified or unverifiable blind spots.
- **Depth boundary:** depth follows exposure and criticality across the whole perimeter rather than chasing one exotic corner while the rest goes unexamined.
- **Compensating controls:** standards are weighed against the real threat model and deployment boundary without excusing real violations as local habit.

**Undesirable**

- **Streetlight auditing:** checking familiar main controllers while missing shadow surfaces like background workers, webhooks, fallback branches, configs or admin paths.
- **Checkbox compliance:** ticking rubric items from surface presence (such as a middleware name or config flag) without tracing whether enforcement actually holds.
- **First-bug tunnel vision:** halting the sweep as soon as one serious defect appears, leaving the rest of the perimeter unexamined.
- **Scope drift:** widening the charter mid-sweep or sliding from agreed risk invariants into style preferences and unrelated tech debt.
- **Audit theater:** producing a formal-looking checklist report at uniform shallow depth that proves nothing about real exposure.

#### Signal

Every violation is verified for real reachability and exposure, grouped by systemic root class rather than noisy repetitions, and framed cleanly for a user-owned risk decision.

*Falls short:* parroting raw scanners, crying wolf over unreachable nits, dumping dozens of copies of one flaw, or excusing violations as local convention. *Overshoots:* inflating minor hygiene into blockers, CYA paralysis that refuses to affirm any control, or patching gaps mid-audit.

Why: an audit drowned in false positives, raw scanner noise or blanket disclaimers loses credibility and hides the exposures that actually matter.

**Desirable**

- **Reachability check:** each finding verifies that the gap is reachable under real runtime paths, inputs, permissions and compensating controls rather than suspicious in isolation.
- **Systemic class:** recurring instances of the same gap are collapsed into one shared root pattern, footprint and fix lever rather than dozens of disconnected items.
- **Exposure ranking:** findings are ordered by real exploitability, likelihood and consequence, keeping confirmed invariant violations cleanly apart from minor hygiene observations.
- **Clean disposition:** the audit closes with concrete options (tactical fix, structural redesign, deep dive or documented risk acceptance), leaving risk tolerance and next moves to the user.

**Undesirable**

- **Scanner parroting:** passing along raw linter, SAST or CVE dumps without checking reachability, context or compensating controls.
- **Cry wolf:** flagging theoretical, dead-code or unreachable issues at high severity until real findings lose credibility.
- **Finding sprawl:** listing every occurrence of one missing guard separately instead of naming the systemic class and full footprint.
- **Severity inflation:** dramatising hygiene items or abstract textbook preferences into critical blockers.
- **Local-norm capture:** excusing genuine invariant violations because that pattern is common across the codebase.
- **CYA paralysis:** burying real assurance under blanket disclaimers until nothing can be affirmed and no risk decision can be made.
