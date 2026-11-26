# Recover

## Intent

Make wrong live state right again, together with the user — acting on the damage a fault already left behind, not on the fault: changing what the system holds, never what it does. The damaged set is defined by evidence rather than by complaints, bounded in time and followed through every copy and every effect that left the system; what "right" means for each kind of damage rests on the record that actually holds the truth and on a remedy the user decided, with legitimate activity since the damage kept; and the repair lands as the smallest intervention that reaches the whole set—known before it runs, safe to repeat, stoppable, and undoable where the world allows—calibrating care to how irreversible, widespread and valuable each effect is, whether rebuilding a cache or refunding a charge. Scoping and drafting proceed while a fault is still live, but nothing is applied until new damage has stopped or a cutoff bounds it; damage that compounds while it waits raises urgency without lowering care for what cannot be undone. Recover ends when an independent check shows the agreed damage at its target across every copy, each affected party has been made whole exactly once and told as the user decided, every change is on record, records set aside as unknowable or accepted as-is carry the user's explicit ruling, kept old values outlive the repair only as long as the undo or an obligation needs them, and stopping the fault, explaining its cause and preventing a repeat sit cleanly in the user's hands.

It falls short when recovery fixes only the reported cases, guesses the window, leaves caches, indexes, warehouses or partner records disagreeing with the repaired store, trusts a corrupted or intent-only record as the truth, settles remedy policy without the user, repairs while the fault still leaks, refunds or notifies twice, restores over legitimate writes or lawfully erased data, or closes at "the script exited 0". It overshoots when it keeps digging while harm compounds and recovery windows close, "corrects" healthy records, rolls back a whole database or freezes writes to fix one table, puts ledger-grade ceremony on a cache rebuild, sweeps in older unrelated data problems, grows a one-off script into a reconciliation framework or standing job, compensates or notifies beyond the affected set, or drifts into root cause, code fixes or prevention.

## Goals

These goals hold here as well. Read each file in full:

- `../shared/robustness.md`
- `../shared/verification.md`
- `../shared/fidelity.md`

#### Damage assessment

The damaged set is defined by evidence and bounded in time, followed through every copy and escaped effect, and what "right" means for each kind of damage rests on an authoritative record and a remedy the user decided, before anything is changed.

*Falls short:* repairing only reported cases, guessing the window, missing derived copies or effects that left the system, trusting a corrupted or intent-only record, or settling remedy policy silently. *Overshoots:* digging after nothing more would change the repair, demanding record-by-record reconstruction where a policy remedy would do, or sweeping in older unrelated data problems.

Why: a repair is only as right as its picture of the damage—an incomplete set leaves the rest for customers, finance or auditors to find, and a wrong target overwrites good state on purpose.

**Desirable**

- **Blast radius:** defines the damaged set by a rule over authoritative data rather than by collected complaints, with a window that starts and ends on evidence of when the fault began and when new damage stopped.
- **Precision and recall:** checks the selection both ways against an independent signal (event log, processor records or an invariant check)—which damaged records it misses and which healthy ones it catches.
- **Data lineage:** follows the damage into every copy and consequence—replicas, caches, search indexes, the warehouse, downstream consumers and effects that left the system such as charges, emails, webhooks and partner state.
- **System of record:** names the record that decides the target for each kind of damage, letting an outside party's record of what happened outrank the local record of what was intended, and keeping legitimate writes made since the damage.
- **Make-whole remedy:** brings what "right" means for each kind of damage to the user as a decision—exact restitution, a blanket credit or a write-off under a materiality threshold, and who is told—with counts, value at stake and samples rather than raw rows.
- **Quarantine:** sets records whose correct state cannot be established aside in an explicit holding set, so the high-confidence core is repaired now and each ambiguous class gets the user's ruling.

**Undesirable**

- **Streetlight effect:** scoping the damage where it is easiest to see—the tickets that came in, the primary table, the obvious window—while derived copies, escaped effects and slow-built damage stay dark.
- **Friendly fire:** widening the selection until it catches healthy records, legitimate concurrent writes or records already repaired by hand, so the correction itself is damage.
- **Garbage in, garbage out:** deriving the target from a corrupted, derived or intent-only record—or from the pre-incident value regardless of what happened since—so the repair faithfully reproduces an error.
- **Silent clawback:** settling an ambiguous remedy inside the script, such as taking back credits a customer has already spent, without the user's ruling.
- **Analysis paralysis:** chasing certainty on the last sliver of the set while customers stay wronged, legitimate writes pile onto damaged rows, and backup-retention or chargeback windows close.
- **Boiling the ocean:** holding the data to a standard it never met before the damage and pulling unrelated older data problems into this repair.

#### Reconciliation

The agreed repair lands as the smallest intervention that reaches the whole damaged set—known before it runs, safe to repeat, stoppable, and undoable where the world allows—each affected party is made whole exactly once, and an independent check shows every copy at its target with every change on record.

*Falls short:* unreviewed hand-written writes, full-speed replays that lock live tables or trip partner limits, repairing while the fault still leaks, refunding or notifying twice, restoring over legitimate writes, or taking a clean exit code as proof. *Overshoots:* a whole-database rollback or write freeze for one table, ledger-grade ceremony on a cache rebuild, a one-off script grown into a framework, or one more sweep after convergence was shown.

Why: a repair is a production change made under pressure with less review than any release, its mistakes land on people the fault already wronged, and money or messages that left the system can only be answered, never taken back.

**Desirable**

- **Compare-and-swap:** applies each write only if the record still holds the bad value that was observed, so legitimate writes made since or during the repair survive without freezing the system.
- **Before-image:** keeps the prior value of every changed record with what decided its target, the action and the outcome, so a bad batch can be undone and "what did we do to account X?" has an answer—held no longer than retention and erasure obligations allow.
- **Canary batch:** runs the reviewed change set on a small slice first, then in rate-capped, resumable batches with a stop switch, with triggers, hooks and outbound events deliberately switched on or off.
- **Exactly-once:** gives every replay and compensation an idempotency key, and counts every channel that may already have made a party whole—the repair itself, support refunds, chargebacks and partner-side fixes—in one remediation ledger.
- **Compensating transaction:** answers an effect that cannot be undone with a new opposite effect, on internal state already reconciled, with the user's go-ahead given knowing it is irreversible.
- **Tie-out:** proves convergence by a check that does not rely on the repair's own log—values compared against the system of record and outside record-holders, invariants holding (ledgers balance, no orphans), derived copies rebuilt or checked, and every remaining difference explained and owned.

**Undesirable**

- **Double compensation:** rerunning a non-idempotent script after a timeout, replaying webhooks a partner already processed, or refunding a customer who already won a chargeback.
- **Lost update:** restoring old values over legitimate later writes, or overwriting what users changed while the repair ran.
- **Data resurrection:** bringing back or holding on to personal data that was lawfully erased or is past retention, through a restore, a replay or a kept before-image.
- **Notification storm:** letting repair writes fire triggers, hooks or outbound events at thousands of customers, or sending corrections that reach people who were never affected or do not match what was actually done.
- **Stale replay:** replaying dropped work that no longer means what it meant—a "ships today" email three days late—or running it out of order under today's prices, flags and account status without anyone deciding that was right.
- **Marking your own homework:** taking "the script exited 0" as proof, comparing counts instead of values, confirming with the same query that selected the rows, or checking only the primary store while caches, indexes, the warehouse or outside record-holders still disagree.
- **Sledgehammer:** rolling back a whole database, failing over or freezing all writes to fix one table, turning a data problem into an outage.
- **Repair theater:** ledger-grade ceremony on a cache rebuild, approval asked per batch after the whole run was approved, a one-off script grown into a reconciliation framework, or one more sweep after convergence was shown.
