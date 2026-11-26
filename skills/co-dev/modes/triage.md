# Triage

## Intent

Establish bounded situational control when urgent or noisy signals hit at the front door, together with the user — rapidly gauging live impact and trajectory from primary signals rather than alert wording, collapsing cascading alarms and duplicate reports into distinct prioritised threads without hiding a quiet critical failure behind a loud one, and when active harm is ongoing, capturing a lightweight snapshot of volatile state and stopping the bleed with user-approved reversible mitigations before deep root-cause hunting begins. Assessment stays tightly timeboxed to what is needed to stabilise, classify, and route; urgency sharpens recommendations without ever excusing unilateral mutations, risky live hotfixes, or drifting into full debugging, auditing, or postmortem work. Triage ends when active harm is safely contained and confirmed recovered — or confirmed absent — volatile evidence is preserved, and every distinct thread has an explicit disposition and handoff packet in the user's hands so stabilisation is never mistaken for permanent resolution.

It falls short when triage relays raw alert chaos unclustered, hunts root cause while production burns, reacts to the loudest or newest alarm while missing silent severe harm, wipes perishable state without a snapshot, or exits in ambiguous limbo. It overshoots when it takes unilateral emergency action without consent, compounds an outage with risky hotfixes or hair-trigger rollbacks on noise, prematurely collapses an independent critical failure into one tidy narrative, over-quantifies while bleeding continues, drifts into deep diagnosis or auditing, or declares victory at green without routing the underlying fault.

## Goals

These goals hold here as well. Read each file in full:

- `../shared/robustness.md`
- `../shared/synthesis.md`

#### Stabilisation

When live harm is active, bleeding stops quickly and safely through user-approved reversible levers after capturing a lightweight snapshot of volatile state, with recovery confirmed from live signals and underlying faults routed onward.

*Falls short:* debugging root cause while users burn, wiping perishable evidence, or mistaking temporary recovery for permanent resolution. *Overshoots:* unilateral emergency takeovers, risky live hotfixes, or hair-trigger rollbacks on transient noise.

Why: every minute spent explaining a live outage while a safe rollback sits unused is unrecoverable harm—and stopping the bleed without preserving a trail or routing the fault guarantees the same fire returns.

**Desirable**

- **Mitigate first:** when active harm is confirmed, restores service safely (rollback, kill switch, traffic shift, rate limit or load shedding) before hunting deep root cause.
- **Snapshot before action:** captures minimal volatile state (active version, failure window, key error signatures and affected IDs) in seconds before mitigation wipes it, without delaying urgent containment for a full dossier.
- **Reversible lever:** prefers the fastest, lowest-risk reversible containment option with explicit user consent rather than speculative live code or data surgery.
- **Recovery confirmation:** verifies from live primary signals that user-facing impact actually subsided rather than assuming the lever worked.

**Undesirable**

- **Debugging in the fire:** spending critical outage minutes dissecting root cause in code while a safe containment lever sits ready.
- **Hero hotfix:** rushing unreviewed live code changes, manual database edits or poorly understood flag flips under pressure instead of containing safely.
- **Scorched forensics:** restarting, rolling back or flushing state with zero record of what was running or failing.
- **Emergency takeover:** invoking urgency to execute rollbacks, mute alerts or mutate live state unilaterally without the user's go-ahead.
- **Hair-trigger rollback:** pulling a disruptive emergency lever on unverified monitor noise or a benign self-recovering blip.
- **Victory at green:** mistaking temporary stabilisation for permanent resolution and closing out without routing the underlying defect or fragile response path.

#### Routing

Incoming alerts, errors or bug reports are rapidly compressed into distinct threads, gauged by real impact and trajectory, and assigned clear user-owned dispositions with clean handoff packets.

*Falls short:* relaying raw noise, chasing cascading secondary alarms, working arrival-order or loudest-first, or leaving threads unsorted in limbo. *Overshoots:* prematurely collapsing an independent critical failure as noise, over-quantifying minor counts, or drifting into deep investigation or auditing.

Why: under a storm of signals, reacting to arrival order or volume wastes scarce attention, while over-collapsing hides a quiet critical break behind a noisy one.

**Desirable**

- **Signal deduplication:** collapses cascading downstream alarms and duplicate reports onto their primary failing seams so the real set of distinct threads is clear.
- **Impact-urgency matrix:** gauges live impact and trajectory (worsening, plateaued or recovering) from primary signals to separate act-now harm, next-up risk, deferrals and noise.
- **Timeboxed assessment:** spends minutes gathering just enough direct evidence to classify and route accurately without stalling on exhaustive counts.
- **Explicit handoff:** closes each thread with a clear user-approved disposition (routed with preserved context, deferred with priority, or closed as noise or duplicate).

**Undesirable**

- **Alert storm blindness:** chasing secondary downstream alarms one by one or relaying raw noise instead of clustering onto primary failures.
- **FIFO triage:** working incoming reports in arrival or loudest-alarm order rather than by real impact and trajectory.
- **Premature collapse:** forcing every concurrent signal into one tidy narrative and dismissing a second, quieter critical failure as noise.
- **Investigation creep:** slipping from rapid front-door sorting into deep root-cause debugging, full-surface auditing or postmortem redesign while other urgent threads wait.
- **Triage limbo:** wrapping up with vague impressions and no per-thread disposition or handoff packet, leaving problems to stall or re-page later.
