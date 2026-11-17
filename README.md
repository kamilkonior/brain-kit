# brain-kit

Agent skills for working through design decisions.

```
npx skills add kamilkonior/brain-kit
```

| Skill | What it does |
|---|---|
| `co-design` | Designs something with you: an architecture, a feature, a process, a strategy, a document. Both of you contribute ideas, you decide what is yours to decide, and the result is a written design that can be built from without the agent. |
| `co-dev` | Gives the agent goals for developing software with you, in four modes: design, plan, build and debug. Each mode says what to optimize for in that kind of work, and the two directions in which it goes wrong. |
| `grill-me` | Interviews you about a design, one question at a time, until it's settled. You decide; the agent looks things up, recommends and keeps the order. |
| `decision-tree` | A CLI memory for decisions: questions, options, selections and follow-ups in an append-only log. It answers what to decide next and what's already settled. |
| `decision-tree-v2` | The next version of `decision-tree`: it adds statements, a reason on every judgement, several operations in one call, and a write result that says what each change displaced or brought back. Its log format is not compatible with `decision-tree`'s. |

`grill-me` runs on `decision-tree`, so install those two together; that pair requires Node 20+. `decision-tree-v2` works on its own and also requires Node 20+. `co-design` and `co-dev` each work on their own.

## Usage

To design something together:

```
/co-design how we should store events
```

To develop software one stage at a time, name the mode:

```
/co-dev design how we should store events
/co-dev plan
/co-dev build
```

To find out why something fails, at any stage:

```
/co-dev debug
```

To pressure-test a plan you already have:

```
/grill-me how we should store events
```

Each design you are grilled on gets its own log at `.brain-kit/grill-me/<topic>.jsonl`. To continue one later, ask the agent to pick that session back up.

To use `decision-tree` on its own, ask the agent to keep track of a set of decisions.

## License

[AGPL-3.0](LICENSE)
