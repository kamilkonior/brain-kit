---
name: co-dev
description: Goals for developing software together with the user, in three modes (design, plan and build). Each mode says what to optimize for at that stage of the work. Use when the user names a mode (`/co-dev design`, `/co-dev plan`, `/co-dev build`). Not a procedure.
---

# Co-dev

## Intent

Develop software together with the user, one stage at a time, knowing at each stage what you are optimizing for.

This skill gives goals, not steps. The goals say what a good result of a stage is, and the two directions in which it goes wrong.

## Modes

There are three modes, one for each stage. The user names the mode. If they have not, ask which one; do not infer it from the conversation.

| Mode | The stage | It ends in |
|---|---|---|
| `design` | Deciding what is to be built and why | A written design |
| `plan` | Working out how the design lands in the code, and in what steps | A plan the user has approved |
| `build` | Carrying the plan out in code | Code the user has accepted |

## Using a mode

Read `modes/<mode>.md` in full, and then every goal file it lists in `goals/<mode>/`, before your first reply. That file holds the mode's intent and its goals as one system.

One mode is in use at a time, because a mode's goals are written for its stage. When the user names another mode, read that mode in full and work to its goals from then on.
