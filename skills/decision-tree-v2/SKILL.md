---
name: decision-tree-v2
description: Persistent memory for decisions. Records questions, options, selections, statements, reasons and follow-ups as a tree in an append-only log, and answers what is open next and what is already settled. Use it whenever decisions should outlive the conversation or be worked through in order, such as an interview, a design review, a planning session or a long list of open questions, even if the user only says "keep track of this" or "where were we?". Other skills can build on it.
---

# Decision tree

A memory for decisions. The CLI stores a tree, validates every write and reports what is open.

## Running it

```
node <this skill's directory>/scripts/decision-tree.js --log <path> --op <op> [flags] [--op <op> [flags]]…
node <this skill's directory>/scripts/decision-tree.js --log <path> --query <query> [flags]
```

Requires Node 20+. `--help` lists every operation and query with its flags. `DECISION_TREE_LOG` can stand in for `--log`, which wins if both are set. In zsh, a command kept in a variable isn't split into words, so `$CLI --op …` fails; a shell function works. The argument after a flag is its value, even if it starts with a dash, unless it is one of the CLI's own flags; a value that is exactly such a flag needs the `--flag=value` form.

A log is a `.jsonl` file holding one tree with any number of roots. The same path resumes it, several agents can share it, and the tree is rebuilt from it on every call. Change it only through the CLI: a log that was edited and no longer fits is refused, naming the line, as in `log line 4: option Q9a does not exist`.

Results are XML on stdout. A failed call prints one line on stderr, exits 1 and writes nothing. The item it names is the one to act on: `Q2 is off-path, hidden by Q1b` means select `Q1b` first. A refusal can name two things to act on: `Q2 is deferred, hidden by Q1b (off-path)` means restore `Q2` and select `Q1b`.

## The tree

| Item | Id | What it is |
|---|---|---|
| question | `Q1` | Something to decide. Settled once options are selected. |
| option | `Q1a` | A possible answer, up to 26 per question. |
| statement | `S1` | Something held to be true that was not chosen: a fact, a constraint, what follows from a choice. It is never open and never asked. |
| follow-up | `F1` | A topic that isn't a question yet. It holds no options; promoting it creates a question under it. |

Ids are never reused: an excluded or superseded option keeps its letter. `--target` names an existing item, and `--origin` says where a new one hangs.

### Origin

`--origin` sets when an item comes up and what it disappears with. The CLI accepts any valid origin and can't tell when one is wrong.

| Origin | The item |
|---|---|
| an option | is on the path only while that option is selected |
| a question | is on the path whatever the selection is |
| a statement | is on the path while the statement stands |
| a follow-up | is on the path once that follow-up is promoted |
| none | is a root |

### States

| State | Meaning | Comes back by |
|---|---|---|
| `open` | waiting to be handled | |
| `settled` | question answered, follow-up promoted, or a statement that stands | |
| `off-path` | under an unselected option or unpromoted follow-up | selecting or promoting it |
| `deferred` | excluded for later, or under something that was | `restore` on the excluded item |
| `not-applicable` | excluded as dropped, or under something that was | `restore` on the excluded item |
| `frozen` | a superseded question, option or statement, and everything under it | never |

What an item shows when it is out of the walk:

| The item | `state` shows | `<hidden-by>` names |
|---|---|---|
| was excluded itself | its own exclusion | the highest thing above it that hides it, if there is one |
| was not excluded, but something above hides it | how that thing hides it | the highest such thing |

`<hidden-by state="off-path"><id>Q1b</id></hidden-by>` says what hides the item and how. An item with `state="deferred"` and that `<hidden-by>` was excluded for later, in a branch that is not selected.

Only the highest thing is named: once it is lifted, the item shows what still hides it. An item that was excluded itself carries `<context by="exclude">`; one that is only under an excluded item does not.

A superseded item, and everything under it, always shows `frozen`.

### Walk order

`next` returns the first open item in this order:

1. Roots, in the order they were added.
2. After a question: under each selected option, in the question's order of options, that option's items and then its follow-ups; then the question's own items and its own follow-ups.
3. Root follow-ups last.

A statement is never returned; the items under it come up in its place. New work under an answer comes before later roots. While a focus is active, `next` stays inside it.

`<next></next>` means nothing is open. Deferred items remain in the tree, and nothing restores them automatically.

## Operations

`…` means repeatable. Every other flag can be given once.

| `--op` | Effect |
|---|---|
| `add-question --text T [--origin ID]` | Adds a question, with no options. |
| `add-option --origin QID --text T` | Adds an option to a question. |
| `add-statement --text T [--origin ID]` | Records a statement. |
| `add-follow-up --text T [--origin ID]` | Records a follow-up. |
| `select-option --target OID…` | Makes these options, all of one question, its whole selection, replacing any earlier one and its context. To add an option to a selection, pass them all again. |
| `clear-selection --target QID` | Withdraws a question's whole selection. The question is open again with every option that was on offer. What hung under the answer goes off the path, and returns if that option is selected again. Fails if nothing is selected. |
| `promote-follow-up --target FID [--text T]` | Creates a question under the follow-up, worded as `T` or as the follow-up, with the follow-up's tags and no options. The follow-up stays as history under its own id. |
| `supersede-question --target QID --text T` | Puts a new question in the old one's place, with its tags, the focus if it held it, and no options. The old question and everything under it are frozen; no answers or children carry over. |
| `supersede-option --target OID --text T` | Adds a new option to the same question, with the next free letter, and freezes the old option and everything under it. Nothing carries over. If the old option was selected, the question's whole selection is cleared and the question is open again. |
| `supersede-statement --target SID --text T` | Puts a new statement in the old one's place, with its tags. The old statement and everything under it are frozen. |
| `exclude --target ID --reason deferred\|not-applicable` | Takes an item and everything under it out of the walk. If the item is a selected option, the question's whole selection is cleared and the question is open again. |
| `restore --target ID` | Lifts the exclusion made on that item. It comes back with everything under it, unless something above still hides it. It never changes a selection: a restored option is on offer again, unselected. |
| `focus --target ID` | Puts a question, follow-up or statement that is open, or has something open under it, at the head of `next`. Only the latest focus counts. It ends when nothing is open inside it, or its item is excluded or goes off the path, and it never comes back. Superseding the focused question moves it to the replacement. |
| `tag` / `untag --target ID --tag T…` | Adds or removes tags on a question, follow-up or statement. |

An item that is off the path, or under an excluded item, accepts every operation except `select-option` and `focus`. An excluded item also refuses a second `exclude` and a supersede; restore it first. A frozen item accepts nothing, and nothing new can hang under it.

### Context

`--context C` says why an operation was done, or where a fact comes from. It is required on `select-option`, `clear-selection`, `exclude` and the three supersedes; optional on the four `add-…` operations and `promote-follow-up`; and refused on `restore`, `tag`, `untag` and `focus`.

Queries show each context beside its item, marked with the operation it came from: `<context by="select-option">Before the working day starts</context>`. The context of a selection lasts until the selection changes, and the context of an exclusion until the restore.

### Batches

A write is one or more operations in one call. Each flag belongs to the `--op` before it; only `--log` may stand anywhere. The operations run in order, each on the tree as the earlier ones left it. If any is refused, nothing is written, and the message names it: `operation 3 (select-option): target not found: Q9a`.

`--as NAME` names the item an operation creates, and `@NAME` stands for its id in the `--target` or `--origin` of a later operation in the same call.

```
--op add-question  --text "When is the digest sent?" --as q
--op add-option    --origin @q --text "08:00" --as morning
--op add-option    --origin @q --text "18:00"
--op select-option --target @morning --context "Before the working day starts"
```

### What a write prints

A write prints how the tree differs after the call: ids and states, never a text or a context. With one question under each option, selecting `Q1b` in place of `Q1a` prints:

```xml
<batch>
  <selection question="Q1">
    <before><id>Q1a</id></before>
    <after><id>Q1b</id></after>
  </selection>
  <displaced>
    <item state="off-path"><id>Q2</id><hidden-by state="off-path"><id>Q1a</id></hidden-by></item>
  </displaced>
  <placed>
    <item state="open"><id>Q3</id></item>
  </placed>
</batch>
```

| Element | Meaning |
|---|---|
| `<created>` | An id the CLI assigned, with its name if it was given one. A question, statement or follow-up carries its state; an option carries one only when something hides it. A new item that something above it hides also carries `<hidden-by>`, as in `items`. |
| `<selection question="…">` | A question whose selection changed, before and after. An empty `<after>` means the question is open again. |
| `<displaced>` | Items that were active before the call and that something above them now hides. |
| `<placed>` | Items that something above them hid and that are active after the call. |

Only the top item of each branch is listed in `<displaced>` and `<placed>`. The item the call itself excluded, superseded or restored is not listed; the top items under it that were active, or are active after, are. `<batch></batch>` means nothing of this changed.

## Superseding

Superseding replaces a question, an option or a statement whose premise no longer holds. That unsettles whatever depended on the premise. The tree cannot tell which items those are, so it freezes the superseded item and everything under it. Frozen items are history: they stay readable, accept no changes, and nothing new can hang under them.

For the same reason, nothing under the superseded item moves to the replacement. `<displaced>` names the top items that were active; `--query tree --target ID --state all` on the old item shows everything it froze. What still holds reaches the replacement only by being rebuilt there.

## Queries

Every query prints the contexts of the items it returns.

| `--query` | Returns |
|---|---|
| `next [--trail]` | the first open item, with the path to it if `--trail` is given. It is the only query a focus affects, and it names an active focus: `<next focus="Q2">`. |
| `status [--target ID]` | open, settled and deferred items in one compact hierarchy; off-path, not-applicable and frozen items are left out. A statement that stands is left out too, and the items under it are shown in its place. An item inside a decided option goes if that answer changes, and one beside `<decided>` stays. `--target` limits it to that item and what's under it, and prints an empty `<status></status>` for an item it leaves out. |
| `tree [--state S]… [--target ID]` | the nested structure, with every option. It keeps the ancestors of a match. `--target` limits it to that item and what's under it. |
| `items [--tag T] [--target ID [--trail]] [--state S]… [--limit N]` | a flat list: active items in walk order, then the hidden ones. `--target` finds one item in any state unless `--state` is given. `--limit` doesn't say whether more exist. |

`S` is `open`, `settled`, `off-path`, `deferred`, `not-applicable`, `frozen` or `all`. It never filters options. Without `--state`, only open items are shown, so `tree --target ID` prints `<tree></tree>` for a decision with nothing open under it; read a decision with `--state all`. A statement is never open, so `items --tag T` finds none without a `--state`.

`--state S` also finds an item whose `<hidden-by>` has the state `S`. So `--state off-path` returns the items excluded inside an unselected branch too.

`items` and `tree` look at the whole tree; `status` shows only the current path. An item excluded inside an unselected branch is in `items --state deferred` and not in `status`.

## Judgement calls

| Situation | Consider |
|---|---|
| One decision depends on another | `--origin` on what it depends on, when adding it. Where an item hangs is the only dependence the tree knows. |
| A decision rests on a fact or a constraint | `add-statement` for it, with where it comes from as `--context`, and the decision under it. |
| Not ready to decide | `exclude --reason deferred` with the blocker as `--context` frees the walk, and `restore` brings it back once the blocker clears. Items waiting on the same person can share a tag, so `--query items --tag T --state deferred` lists them together. |
| A premise changed, and several items rest on it | Supersede the highest item that no longer holds, and nothing above it; see Superseding. |
| A question's premise changed | `supersede-question`, asking it on the premise that holds now; see Superseding. `--query tree --target QID --state all` shows what it would freeze. |
| An option's meaning changed | `supersede-option`, stating what it means now; see Superseding. `exclude` would leave what was decided under the old meaning restorable. |
| A fact turned out wrong | `supersede-statement`, stating what holds now; see Superseding. |
| Stopping before everything is decided | A pause needs nothing. To close the tree, `exclude --reason deferred` each open item, with the reason as `--context`, top-level items first. |
| An option is ruled out | `exclude` on the option, with `--reason not-applicable`. If it was selected, the selection is cleared; to keep the other selected options, select them again in the same call. |
| A question's answer is in doubt | `clear-selection`. `exclude` on the chosen option also reopens the question, but takes that option off the offer. |
