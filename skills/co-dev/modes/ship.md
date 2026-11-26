# Ship

## Intent

Carry an accepted change across the last mile into its real destination, together with the user — matching release controls to blast radius and irreversibility, checking target-environment reality and upstream drift before crossing, shipping only the exact accepted change without silent behavioural edits during conflict resolution or packaging, exposing it progressively where stakes warrant with a tested way back, and proving extrinsic survival through live signals from the destination rather than stopping at a merge or green deploy. Trivial release mechanics stay inside ship while accepted behaviour is untouched, and read-only prep runs freely so user attention concentrates at genuinely external or irreversible gates; if reality exposes a behavioural defect or missing migration seam, contain exposure first and hand off diagnosis, fixes, or redesign, deferring systemic release friction for later. Ship ends cleanly in one of two states: verified healthy live with consumers and operators informed and long-horizon cleanups tracked, or safely aborted and stable with the next mode in the user's hands.

It falls short when shipping stops at a push or green deploy without live proof, crosses external or irreversible gates without explicit consent or a rollback path, silently alters accepted behaviour during conflict resolution or panic-patching, runs destructive migrations before stability is proven, or abandons a rollout half-shipped. It overshoots when it imposes release theater on low-risk reversible changes, derails a release into mid-flight platform engineering, prompts for approval on trivial read-only checks, sneaks in last-minute polish, or camps on dashboards indefinitely waiting for perfection.

## Goals

These goals hold here as well. Read each file in full:

- `../shared/fidelity.md`
- `../shared/verification.md`
- `../shared/robustness.md`

#### Rollout

The accepted change crosses into its real target state in controlled, reversible steps proportional to risk, reaching either full rollout or a clean abort.

*Falls short:* exposing risky changes all at once, missing target prerequisites, abandoning partial rollouts, or panic-patching live code. *Overshoots:* heavy release theater for trivial changes, or derailing a release into platform work.

Why: the real destination has live state, concurrent drift and real consumers that local checks never fully reproduce.

**Desirable**

- **Release readiness:** target-environment preconditions (upstream drift, config, secrets, dependencies, versions, packaging and CI) are verified before crossing the boundary.
- **Progressive rollout:** exposure expands in stages (staging, internal, small slice, full) proportional to risk rather than all at once.
- **Decouple deploy from release:** code can land inactive (behind a flag or dark launch) and be enabled or disabled independently of redeploying.
- **Backward compatibility:** old and new versions coexist cleanly across rolling deploys, schemas, APIs, running clients and rollbacks.
- **Kill switch:** a concrete, tested way to halt exposure or revert immediately when live signals cross abort thresholds.

**Undesirable**

- **Big-bang cutover:** exposing a risky change to all users or environments at once where staged rollout was possible.
- **Irreversible migration:** applying a destructive schema, data or contract change before the new version is proven stable and rollback is no longer needed.
- **Half-ship:** leaving a staged rollout stuck mid-ramp, an unverified async backfill, or temporary release scaffolding abandoned in limbo.
- **Panic patching:** editing product code in place inside ship when a live failure hits, instead of containing exposure and handing off diagnosis or a proper fix.
- **Release theater:** imposing multi-stage rollouts, flags or formal ceremony onto a small, low-risk, easily reverted change.
- **Mid-release platform engineering:** derailing a release to fix flaky CI, build new dashboards or rewrite deploy scripts instead of shipping safely and deferring tooling upgrades for later.

#### Live proof

Direct signals from the real destination confirm the change landed, is active and holds up without degrading its surroundings, and whoever relies on or operates it knows what changed.

*Falls short:* treating a push, merge or green deploy as shipped with no live verification, or leaving consumers and operators blind. *Overshoots:* camping on dashboards indefinitely, blocking closure on long-horizon cleanups, or running invasive live checks that disturb real users.

Why: a green deploy only proves the artefact arrived; live signals prove it survives where it counts.

**Desirable**

- **Golden signals:** live health is judged by real destination signals (target CI, clean install, error rates, latency, traffic, logs or downstream jobs), not merely exit status.
- **Synthetic check:** a non-invasive end-to-end check exercises the shipped artefact in its real destination right after release.
- **Soak period:** after exposure, enough real time or traffic settles to catch delayed failures (async jobs, caches, retries, leaks) proportional to risk.
- **Release notes:** whoever consumes or operates the change knows what shipped, what changed externally and any required action, in the format the project uses.

**Undesirable**

- **Deploy and pray:** pushing, merging or publishing and walking away without confirming the change landed and behaves as intended live.
- **Blind launch:** shipping with no logs, metrics, error tracking or live probe able to show whether the change is working or failing.
- **Silent breaking change:** altering external behaviour, APIs, defaults or operational expectations without warning consumers or operators.
- **Perpetual babysitting:** camping on dashboards indefinitely or blocking closure on long-horizon follow-ups after steady-state health is confirmed.
- **Alert fatigue:** shipping noisy warnings or uncalibrated alerts that train operators to ignore real failures.
