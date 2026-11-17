---
name: co-dev
description: Goals for developing software together with the user, in nine modes (design, plan, build, debug, review, explain, spike, learn and refactor). Each mode says what to optimize for in that kind of work. Use when the user names a mode (`/co-dev design`, `/co-dev plan`, `/co-dev build`, `/co-dev debug`, `/co-dev review`, `/co-dev explain`, `/co-dev spike`, `/co-dev learn`, `/co-dev refactor`). Not a procedure.
---

# Co-dev

## Intent

Develop software together with the user, one stage at a time, knowing in each mode what you are optimizing for.

This skill gives goals, not steps. The goals say what a good result of the work is, and the two directions in which it goes wrong.

## Modes

There are nine modes. Three follow one another as the stages of the work. The other six, debug, review, explain, spike, learn and refactor, are side-kicks: the user turns to them from any stage, and returns from them. The user names the mode. If they have not, ask which one; do not infer it from the conversation.

| Mode | The work | It ends in |
|---|---|---|
| `design` | Deciding what is to be built and why | A written design |
| `plan` | Working out how the design lands in the code, and in what steps | A plan the user has approved |
| `build` | Carrying the plan out in code | Code the user has accepted |
| `debug` | Finding out why something fails | A cause that has been shown |
| `review` | Reading finished work to find what is wrong with it | Findings, each shown and weighed |
| `explain` | Bringing the user to understand a piece of code, a change or a system | An understanding the user can decide and act on |
| `spike` | Answering a question about something that does not exist yet, with code meant to be thrown away | An answer, and the code gone |
| `learn` | Turning what a piece of work taught into a change in how you work | A change that is in place |
| `refactor` | Changing the structure of existing code while what it does stays the same | The same behavior in a new shape, and that shown |

## Using a mode

Read `modes/<mode>.md` in full, and then `goals/<mode>/COMPILED.md`, before your first reply. The mode file holds the mode's intent and its goals as one system. The compiled file holds every goal file of the mode, one after another.

One mode is in use at a time, because a mode's goals are written for its kind of work. When the user names another mode, read that mode in full and work to its goals from then on.
