# Decommission

## Intent

Execute safe, complete, verifiable subtraction when nothing is replacing what is removed, together with the user — calibrating evidentiary rigour and reversible staging proportionally to blast radius and irreversibility, whether retiring a 20-line stale feature flag or shutting down a production service and its database. Obsolescence or the exact bounded set of remaining callers is established from multi-signal evidence beyond static grep; intentional loss of capability, notice windows, and the end-state of persisted data, credentials and external namespaces (purge, time-bounded archive, required audit retention, revocation or intentional tombstone) are owned explicitly by the user; severance proceeds in dependency-safe order—draining in-flight work and cutting inbound callers and public pointers before destroying underlying resources—with temporary safety scaffolds carrying clear dismantling triggers; and teardown sweeps every operational layer owned by the target while making a minimal clean cut at healthy seams. Decommission ends when absence and surviving health are verified in real environments across all regions and providers, unintentional residue is gone (leaving only deliberate bounded tombstones or archives), and any adjacent cleanup or discovered live-consumer migration sits cleanly in the user's hands.

It falls short when decommissioning relies on grep-only confidence that misses periodic jobs, dynamic dispatch or external callers, deletes live targets cold-turkey or in takeover-prone order, destroys required audit data or leaves orphaned PII behind, removes only visible code while leaving zombie tables, stale IAM keys, dead alerts and idle spend, or closes at "PR merged" without checking live runtime reality. It overshoots when it chases mathematical certainty of zero usage forever, turns reversible kill-switches and warm standbys into permanent limbo that adds complexity, imposes multi-week brownout ceremony on trivial private dead code, or pulls the sweater thread into refactoring healthy neighbouring code in the same deletion pass.

## Goals

These goals hold here as well. Read each file in full:

- `../shared/coherence.md`
- `../shared/verification.md`
- `../shared/robustness.md`

#### Retirement

Disuse or exact remaining callers are established proportionally to blast radius, intentional loss and data or namespace fate are owned by the user, and severance steps reversibly in dependency-safe order before crossing any irreversible destruction gate.

*Falls short:* grep-only confidence, cold-turkey deletion in unsafe order, unverified data incineration, dangling takeover exposure or silent consumer breakage. *Overshoots:* paralysis by proof, permanent just-in-case limbo that adds complexity, or multi-week scream-test ceremony for trivial dead code.

Why: proving a negative in a live system is asymmetric—skipping evidence breaks hidden callers or creates takeover holes, while demanding certainty forever ensures nothing ever dies.

**Desirable**

- **Runtime usage proof:** checks live telemetry, logs, metrics, queues, query history, data lineage and periodic batch schedules—not just static grep—proportionally to the cost of being wrong.
- **Scream test:** disables, dark-drains, brownouts or tombstones a live surface reversibly when usage evidence is uncertain, generating real-world proof while restoration is still instant—with an explicit dismantling trigger so it never becomes permanent.
- **State and namespace fate:** resolves persisted data (hard PII purge, time-bounded cold archive or required audit retention), credential revocation and external namespaces (DNS, buckets, endpoints, `410 Gone` tombstones) deliberately before destruction.
- **Sunset window:** secures user ownership of intentional capability loss, communicates realistic cutoff dates to affected stakeholders and pauses to reconsider if an active dependency cannot be dropped.
- **Reversible-first staging:** drains in-flight work and severs inbound callers, routing and public pointers before destroying underlying targets, pausing for explicit user consent at irreversible gates.

**Undesirable**

- **Grep-only confidence:** assuming zero static references in one repository means zero runtime callers, missing reflection, config strings, webhooks, quarterly batch jobs, pinned clients or analytics queries.
- **Cold-turkey deletion:** hard-deleting a live endpoint, queue, table, credential or flag—or tearing down in the wrong order—without reversible isolation or telemetry proof when blast radius is uncertain.
- **Data incineration:** dropping tables, buckets or audit trails without checking legal, compliance or snapshot obligations—or leaving regulated PII orphaned in forgotten backups.
- **Dangling takeover:** destroying backing cloud resources, buckets or services while public DNS records, OAuth URIs or external pointers still target them, exposing subdomain or resource hijacking.
- **Just-in-case hoarding:** chasing 100% proof forever, resetting sunset dates endlessly, or leaving "just-in-case" kill switches, warm standbys and forever-archives alive with no expiry until subtraction adds complexity.
- **Scream-test theater:** imposing multi-week brownouts, stakeholder RFCs or archival ceremonies on compiler-checked private dead code or unused local fixtures.

#### Teardown

Once retirement clears, every unintentional footprint owned by the target is removed cleanly together while healthy neighbours stay untouched, and real environments confirm both verified absence and surviving system health.

*Falls short:* deleting only visible code while leaving ghost residue and dead alerts behind, or stopping at a merged PR without verifying real environments. *Overshoots:* amputating shared dependencies still used by live siblings, or pulling the sweater thread into unrelated cleanups across living systems.

Why: half-deleted systems keep accruing cloud spend, waking on-call with dead alarms and misleading engineers long after everyone thought they were gone.

**Desirable**

- **Full-stack sweep:** removes every unintentional footprint owned by the target—code, feature flags, schemas, queues, cron jobs, config, secrets, IAM, IaC, dashboards, alerts, CI jobs, dependencies and docs—while keeping intentional bounded tombstones minimal.
- **Shared-seam check:** distinguishes artefacts exclusive to the retired target from shared utilities, tables, IAM roles or queues still relied on by live siblings, making a minimal clean cut at the seam.
- **Flag-branch collapse:** when retiring a feature flag or experiment, cleanly collapses the dead branch and removes conditional scaffolding rather than leaving a hardcoded toggle behind.
- **Verified absence:** confirms in real environments (across regions, schedules, external flag providers, IaC state and billing) that the target actually stopped and surviving paths show no elevated errors, dead-letter spikes or regressions.

**Undesirable**

- **Ghost residue:** deleting the entry point while leaving orphaned feature flags, zombie tables, idle cloud spend, stale IAM keys, dead alerts, forgotten cron jobs or obsolete runbooks behind.
- **Collateral amputation:** deleting a shared utility, column, IAM policy, secret or queue still required by a live sibling path.
- **Commented-out corpse:** commenting out dead code or leaving a permanently disabled branch in place instead of deleting cleanly and trusting version control.
- **Paper decommission:** treating a merged PR as finished without checking whether live pods scaled to zero, external flag rules cleared, or another region or cron runner still fires.
- **Spring-cleaning sprawl:** pulling the sweater thread from a dead target into refactoring healthy neighbours or rewriting unrelated legacy debt in the same deletion pass.
