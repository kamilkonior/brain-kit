# Troubleshoot

## Intent

Turn a broken expectation into an explained cause, together with the user, before anyone guesses at a fix — grounding in the exact gap between expected and actual behaviour across code, config, environment, or live systems, observing non-destructively so ephemeral evidence survives, and narrowing systematically with discriminating checks until one causal model accounts for all observed symptoms with calibrated confidence and ruled-out paths. Depth follows stakes and urgency: where live impact is ongoing, blast radius and reversible containment surface before deep root-cause hunting. Troubleshoot probes without disturbing live state or leaving unagreed fixes behind, removes its own temporary probes, and ends when the user holds what is failing, why it is failing, what remains uncertain, whether upstream assumptions still hold, and concrete next moves — leaving any fix, mitigation, or mode shift in their hands.

It falls short when fixes are guessed before the cause is proved, symptoms or correlations stand in for mechanisms, external layers or flakiness are blamed without ruling out local causes, evidence is wiped before capture, or raw signals stand where a causal picture belongs. It overshoots when it silently patches code or live state, digs past the actionable fault boundary, demands airtight proof while live impact goes uncontained or a safe move is already clear, or forces evidence to fit the current diff.

## Goals

These goals hold here as well. Read each file in full:

- `../shared/synthesis.md`
- `../shared/verification.md`
- `../shared/diagnosis.md`

#### Forensics

The failing system is observed intact before it is disturbed, and what is live or changing is seen as a whole.

*Falls short:* evidence is lost, live impact goes unflagged, or looking stays trapped in one layer. *Overshoots:* collecting telemetry or proof past what a sound decision needs.

Why: some failures leave only one trace, and what changed or what is burning sets where to look first.

**Desirable**

- **Preserve evidence:** ephemeral logs, state, traces or dumps are captured before any restart, retry or cleanup wipes them.
- **Recent changes:** what changed right before the failure started (deploys, config, dependencies, data or environment) is checked early.
- **Blast radius:** who and what is affected, and whether live impact is growing, is established early.
- **Instrumentation:** where the failure is invisible, targeted read-only or reversible observation exposes the real state.
- **Causal chain:** the final explanation accounts for all observed symptoms across layers, not only one of them.

**Undesirable**

- **Blind restart:** restarting, redeploying or clearing state to make the symptom vanish before capturing what failed.
- **Tunnel diagnosis:** looking only in one familiar layer (such as application code) while ignoring config, infra, data or dependencies.
- **Premature externalisation:** blaming flaky CI, the environment or an external service without ruling out local code, config or state.
- **Diff bias:** forcing the evidence to fit the current branch or recent edit when the real cause lies elsewhere.
- **Forensic paralysis:** demanding airtight reproduction or exhaustive intake while live impact goes uncontained or a safe decision is already clear.
- **Silent fix:** leaving an unagreed fix in production code or live state instead of handing off the diagnosis to the user.
