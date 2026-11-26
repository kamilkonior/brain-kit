# brain-kit

Agent skills for working through design decisions.

```
npx skills add kamilkonior/brain-kit
```

| Skill | What it does |
|---|---|
| `co-design` | Designs something with you: an architecture, a feature, a process, a strategy, a document. Both of you contribute ideas, you decide what is yours to decide, and the result is a written design that can be built from without the agent. |
| `co-dev` | Develops software with you through six pipeline modes (explore, design, plan, build, walkthrough, ship) and fifteen side-kicks (triage, troubleshoot, refactor, retro, onboard, optimize, audit, hunt, spike, test, migrate, harden, document, review, decommission). Each mode sets what you are optimising for; the agent picks the one that supplies what you are missing, and moves between modes only with your agreement. |
| `grill-me` | Interviews you about a design, one question at a time, until it's settled. You decide; the agent looks things up, recommends and keeps the order. |
| `decision-tree` | A CLI memory for decisions: questions, options, selections and follow-ups in an append-only log. It answers what to decide next and what's already settled. |
| `decision-tree-v2` | The next version of `decision-tree`: it adds statements, a reason on every judgement, several operations in one call, and a write result that says what each change displaced or brought back. Its log format is not compatible with `decision-tree`'s. |

`grill-me` runs on `decision-tree`, so install those two together; that pair requires Node 20+. `decision-tree-v2` works on its own and also requires Node 20+. `co-design` and `co-dev` each work on their own.

## Usage

To design something together:

```
/co-design how we should store events
```

To develop software, say what you need, and the agent picks the mode. You can also name a mode or side-kick yourself:

```
/co-dev explore how events are stored today
/co-dev design how we should store events
/co-dev plan
/co-dev build
/co-dev walkthrough
/co-dev ship
```

Side-kicks can be entered cold or mid-work and return when done:

```
/co-dev triage checkout 500s paging after release
/co-dev troubleshoot why CI fails on event replay
/co-dev refactor split event storage from transport
/co-dev retro why that migration check was missed
/co-dev onboard onto the billing service
/co-dev optimize event replay latency under 100ms p99
/co-dev audit tenant isolation across billing endpoints
/co-dev hunt for races or state corruption in the payment retry loop
/co-dev spike whether NATS JetStream handles our replay volume and auth
/co-dev test add contract and failure-mode tests for webhook retries
/co-dev migrate billing IDs from int32 to UUIDv7 with zero downtime
/co-dev harden the payment webhook consumer before launch
/co-dev document the event replay runbook and recovery steps
/co-dev review PR #412 for billing webhook idempotency
/co-dev decommission the legacy v1 export worker and its flags, queues and alerts
```

To let the agent move across the six pipeline modes on its own while keeping decisions and go-aheads yours, ask for `/co-dev sdlc`.

To pressure-test a plan you already have:

```
/grill-me how we should store events
```

Each design you are grilled on gets its own log at `.brain-kit/grill-me/<topic>.jsonl`. To continue one later, ask the agent to pick that session back up.

To use `decision-tree` on its own, ask the agent to keep track of a set of decisions.

## License

[AGPL-3.0](LICENSE)
