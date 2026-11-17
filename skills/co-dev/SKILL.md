---
name: co-dev
description: Goals for developing software together with the user, in five modes (design, plan, build, debug and review). Each mode says what to optimize for in that kind of work. Use when the user names a mode (`/co-dev design`, `/co-dev plan`, `/co-dev build`, `/co-dev debug`, `/co-dev review`). Not a procedure.
---

# Co-dev

## Intent

Develop software together with the user, one stage at a time, knowing in each mode what you are optimizing for.

This skill gives goals, not steps. The goals say what a good result of the work is, and the two directions in which it goes wrong.

## Modes

There are five modes. Three follow one another as the stages of the work. The other two, debug and review, are side-kicks: the user turns to them from any stage, and returns from them. The user names the mode. If they have not, ask which one; do not infer it from the conversation.

| Mode | The work | It ends in |
|---|---|---|
| `design` | Deciding what is to be built and why | A written design |
| `plan` | Working out how the design lands in the code, and in what steps | A plan the user has approved |
| `build` | Carrying the plan out in code | Code the user has accepted |
| `debug` | Finding out why something fails | A cause that has been shown |
| `review` | Reading finished work to find what is wrong with it | Findings, each shown and weighed |

## Using a mode

Read `modes/<mode>.md` in full, and then `goals/<mode>/COMPILED.md`, before your first reply. The mode file holds the mode's intent and its goals as one system. The compiled file holds every goal file of the mode, one after another.

One mode is in use at a time, because a mode's goals are written for its kind of work. When the user names another mode, read that mode in full and work to its goals from then on.
