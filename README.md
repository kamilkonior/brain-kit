# co-kit

**Co**llaborative **Kit**, a.k.a. human in the loop.

The agent does the legwork. You make the calls.

A small set of agent skills for working *with* an agent instead of handing work over to it. The agent reads the code, lays out the options, recommends one and does the work. Whatever shapes the result waits for you.

The split is deliberate. An agent is fast, doesn't tire, and can keep a whole codebase in view. You know what the thing is for, and you are the one who has to live with it. These skills try to put each of you where you are strongest.

```
npx skills add kamilkonior/co-kit
```

## The skills

| Skill | What it does |
|---|---|
| `co-design` | Designs something with you: an architecture, a feature, a process, a strategy, a document. Both of you bring ideas, you decide what is yours to decide, and the result is a written design that can be built from without the agent. |
| `co-dev` | Develops software with you, one mode at a time. Six pipeline modes carry a change from first look to live, and sixteen side-kicks cover the work around it. Each mode sets what you are optimising for, and the agent changes mode only with your agreement. |
| `grill-me` | Interviews you about a design, one question at a time, until it's settled. You decide; the agent looks things up, recommends and keeps the order. |
| `decision-tree` | A CLI memory for decisions: questions, options, selections and follow-ups in an append-only log. It answers what to decide next and what's already settled. |
| `decision-tree-v2` | The next version of `decision-tree`: it adds statements, a reason on every judgement, several operations in one call, and a write result that says what each change displaced or brought back. Its log format is not compatible with `decision-tree`'s. |

`grill-me` runs on `decision-tree`, so install those two together; that pair requires Node 20+. `decision-tree-v2` works on its own and also requires Node 20+. `co-design` and `co-dev` each work on their own.

## What to expect

The agent carries the work as far as it can on its own, and comes to you for what is yours: decisions that shape the result, and anything hard to undo.

## Usage

### Design something together

```
/co-design how we should store events
```

### Develop software

Say what you need and the agent picks the mode, or name one yourself: `/co-dev <mode> <what you need>`.

**Pipeline.** Carries a change from first look to live: `explore` → `design` → `plan` → `build` → `walkthrough` → `ship`

| Mode | Use it when | Example |
|---|---|---|
| `explore` | you need to understand the problem, the code or the idea | `/co-dev explore how events are stored today` |
| `design` | you need a shape for the change | `/co-dev design how we should store events` |
| `plan` | you need the steps that will get there | `/co-dev plan` |
| `build` | you want the change made | `/co-dev build` |
| `walkthrough` | you want to understand what was built, and judge it | `/co-dev walkthrough` |
| `ship` | you want it released, live and confirmed healthy | `/co-dev ship` |

To let the agent move through the six on its own, while decisions and go-aheads stay yours, ask for `/co-dev sdlc`.

**Side-kicks.** These sit outside the pipeline. Enter one cold or mid-work, and return when it's done:

| Side-kick | Use it when | Example |
|---|---|---|
| **Find out** | | |
| `onboard` | you are new to a repo, service or subsystem | `/co-dev onboard onto the billing service` |
| `spike` | a risky unknown needs a quick, throwaway experiment | `/co-dev spike whether NATS JetStream handles our replay volume and auth` |
| **Change what exists** | | |
| `refactor` | the structure needs cleaning and behaviour must not change | `/co-dev refactor split event storage from transport` |
| `optimize` | something is too slow or costly and you want a measured gain | `/co-dev optimize event replay latency under 100ms p99` |
| `migrate` | live data, schemas or APIs must cross a breaking change | `/co-dev migrate billing IDs from int32 to UUIDv7 with zero downtime` |
| `harden` | it must survive faults, abuse and load spikes | `/co-dev harden the payment webhook consumer before launch` |
| `decommission` | dead code, flags or services should go completely | `/co-dev decommission the legacy v1 export worker and its flags, queues and alerts` |
| **Check it** | | |
| `test` | tests need writing, strengthening or deflaking | `/co-dev test add contract and failure-mode tests for webhook retries` |
| `review` | someone else's PR, patch or RFC needs a verdict | `/co-dev review PR #412 for billing webhook idempotency` |
| `audit` | you need assurance against security, reliability or quality standards | `/co-dev audit tenant isolation across billing endpoints` |
| `hunt` | tricky code may hide races or bugs worth proving | `/co-dev hunt for races or state corruption in the payment retry loop` |
| **Something is wrong** | | |
| `troubleshoot` | something is broken and you need to know why | `/co-dev troubleshoot why CI fails on event replay` |
| `triage` | a live outage or alert storm needs containing | `/co-dev triage checkout 500s paging after release` |
| `recover` | live data went wrong and needs putting right | `/co-dev recover the 1,400 duplicated invoices created during yesterday's retry bug` |
| **Capture what was learned** | | |
| `document` | docs need writing or updating for a future reader | `/co-dev document the event replay runbook and recovery steps` |
| `retro` | the way you work with the agent should improve after friction | `/co-dev retro why that migration check was missed` |

### Pressure-test a plan

```
/grill-me how we should store events
```

Each design you are grilled on gets its own log at `.co-kit/grill-me/<topic>.jsonl`. To continue one later, ask the agent to pick that session back up.

### Keep track of decisions

To use `decision-tree` on its own, ask the agent to keep track of a set of decisions.

## License

[AGPL-3.0](LICENSE)
