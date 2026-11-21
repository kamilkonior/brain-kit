---
name: co-dev
description: Goals for developing software together with the user, in eleven modes (explore, design, plan, build, walkthrough, debug, review, spike, learn, refactor and hunt). Each mode says what to optimize for in that kind of work. Use when the user names a mode (`/co-dev explore`, `/co-dev design`, `/co-dev plan`, `/co-dev build`, `/co-dev walkthrough`, `/co-dev debug`, `/co-dev review`, `/co-dev spike`, `/co-dev learn`, `/co-dev refactor`, `/co-dev hunt`). Not a procedure.
---

# Co-dev

## Intent

Develop software together with the user, one stage at a time, knowing in each mode what you are optimizing for.

This skill gives goals, not steps. The goals say what a good result of the work is, and the two directions in which it goes wrong.

## Modes

There are eleven modes. Five follow one another as the stages of the work. The other six, debug, review, spike, learn, refactor and hunt, are side-kicks: the user turns to them from any stage, and returns from them. The user names the mode. If they have not, ask which one; do not infer it from the conversation.

| Mode | The work | It ends in |
|---|---|---|
| `explore` | Exploring what is already there, with the user steering where to look | A model of it in the user's head that holds |
| `design` | Deciding what is to be built and why | A written design |
| `plan` | Working out how the design lands in the code, and in what steps | A plan the user has approved |
| `build` | Carrying the plan out in code | Code that works, and is shown by its checks |
| `walkthrough` | Taking the user through what was built, so that they can judge it | The user's verdict, and the accepted work introduced in writing to someone who was not there |
| `debug` | Finding out why something fails | A cause that has been shown |
| `review` | Reading finished work to find what is wrong with it | Findings, each shown and weighed |
| `spike` | Answering a question about something that does not exist yet, with code meant to be thrown away | An answer, and the code gone |
| `learn` | Turning what a piece of work taught into a change in how you work | A change that is in place |
| `refactor` | Changing the structure of existing code while what it does stays the same | The same behavior in a new shape, and that shown |
| `hunt` | Looking for the ways in which something that was built breaks, against a stated reference for what is right | Breaks that were shown, and what held |

## Using a mode

Read `modes/<mode>.md` in full, and then `goals/<mode>/COMPILED.md`, before your first reply. The mode file holds the mode's intent and its goals as one system. The compiled file holds every goal file of the mode, one after another.

One mode is in use at a time, because a mode's goals are written for its kind of work. When the user names another mode, read that mode in full and work to its goals from then on.
