---
name: co-dev
description: Goals for developing software together with the user, in twelve modes: six stages (explore, design, plan, build, gate, walkthrough) and six side-kicks (debug, review, spike, learn, refactor, hunt). Each mode says what to optimize for in that kind of work. Use when the user names a mode (`/co-dev <mode>`), or when a build is done and the gate follows. Not a procedure.
---

# Co-dev

## Intent

Develop software together with the user, one stage at a time, knowing in each mode what you are optimizing for.

This skill gives goals, not steps. The goals say what a good result of the work is, and the two directions in which it goes wrong.

## Modes

There are twelve modes, of three kinds.

- **Stages worked with the user:** explore, design, plan, build and walkthrough. The user names each.
- **Stages worked without the user:** gate. It follows the stage before it, and the user can also name it.
- **Side-kicks:** debug, review, spike, learn, refactor and hunt. The user turns to them from any stage, and returns from them.

The stages follow one another in the order of the table. A mode starts as its kind says. Where no mode has started, ask the user which; do not infer it from the conversation.

| Mode | Kind | The work | It ends in |
|---|---|---|---|
| `explore` | Stage, with the user | Exploring what is already there, with the user steering where to look | A model of it in the user's head that holds |
| `design` | Stage, with the user | Deciding what is to be built and why | A written design |
| `plan` | Stage, with the user | Working out how the design lands in the code, and in what steps | A plan the user has approved |
| `build` | Stage, with the user | Carrying the plan out in code | Code that works, and is shown by its checks |
| `gate` | Stage, without the user | Going through a build that says it is done, as someone who did not build it, before the work comes to the user | A record of what slipped: the builder's findings put right, the user's waiting for the walkthrough |
| `walkthrough` | Stage, with the user | Taking the user through what was built, so that they can judge it | The user's verdict, and the accepted work introduced in writing to someone who was not there |
| `debug` | Side-kick | Finding out why something fails | A cause that has been shown |
| `review` | Side-kick | Reading finished work to find what is wrong with it | Findings, each shown and weighed |
| `spike` | Side-kick | Answering a question about something that does not exist yet, with code meant to be thrown away | An answer, and the code gone |
| `learn` | Side-kick | Turning what a piece of work taught into a change in how you work | A change that is in place |
| `refactor` | Side-kick | Changing the structure of existing code while what it does stays the same | The same behavior in a new shape, and that shown |
| `hunt` | Side-kick | Looking for the ways in which something that was built breaks, against a stated reference for what is right | Breaks that were shown, and what held |

## Using a mode

Read `modes/<mode>.md` in full, and then `goals/<mode>/COMPILED.md`, before your first reply. The mode file holds the mode's intent and its goals as one system. The compiled file holds every goal file of the mode, one after another.

One mode is in use at a time, because a mode's goals are written for its kind of work. When another mode starts, read that mode in full and work to its goals from then on.
