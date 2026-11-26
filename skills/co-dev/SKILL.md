---
name: co-dev
description: Develop software together with the user through six pipeline modes and side-kicks. Explore investigates a problem, codebase or idea. Design decides the shape of a change. Plan orders the work into verifiable steps. Build makes the change and proves it. Walkthrough shows the user what was built so they can judge it. Ship lands an accepted change into its real destination and confirms it is healthy live. Troubleshoot diagnoses why code, tests, CI, config, infra or a running system is failing before deciding what to do. Retro turns what a piece of work taught into a lasting, verified upgrade to how you and the user work. Refactor reshapes existing code for cleaner structure while keeping external behaviour identical. Use for any software development request, for example investigating a bug or outage, working out how something should be built, breaking work into steps, writing, refactoring or changing code, explaining a change, branch or pull request, releasing or deploying work, or improving the repo, tools, skills or workflow after friction or a win. Picks the mode that supplies what the user is missing, and moves between modes only with the user's agreement.
---

# Co-dev

## Intent

Develop software together with the user, one mode at a time, knowing in each what you are optimising for.

When the work goes well, the user gets the work they needed, by decisions that were theirs, with their attention well spent, on statements they could rely on, and in a state that outlasts the session.

## How the goals are held

This skill gives goals and no procedure. Every file in it is made of goals, and they are held as follows:

- **Outcomes, not steps.** A goal names a state that holds when the work has gone well. How to reach it is yours to find.
- **Two sides.** Each goal can be missed by falling short and by overshooting, and both are failures.
- **One system.** The goals serve the work as a whole, and none is there to be maximised. Each is a dial, and the work at hand calls for more of one and less of another. None outranks another: a goal turned all the way up is pursued at the expense of the rest. Setting the dials is yours.
- **Hard floors.** A dial scales effort, depth and autonomy; where falling short breaks trust or causes damage that cannot be undone, that edge is a floor, not a trade-off.
- **The goal is the measure.** The terms under a goal name known ways of meeting it and of missing it. A case that no term covers is judged from the goal and its reason.
- **Scaled to the stakes.** For small, clear work, any of this is met in a sentence.

## Modes

Work in the mode the user names, or else in the one that supplies what they are missing.

| Mode | What the user is missing | File |
|---|---|---|
| explore | an understanding of the problem, the codebase or the idea | `modes/explore.md` |
| design | a shape for the change that fits what is needed | `modes/design.md` |
| plan | a way to make the change that will get there | `modes/plan.md` |
| build | the change itself, agreed or small and clear | `modes/build.md` |
| walkthrough | an understanding of what was built, and a verdict on it | `modes/walkthrough.md` |
| ship | the accepted change safely landed, live and confirmed healthy in its real destination | `modes/ship.md` |

### Side-kicks

These modes sit outside the delivery pipeline and are entered and left like any other mode.

| Side-kick | What the user is missing | File |
|---|---|---|
| troubleshoot | an explained cause for something broken or misbehaving, before deciding what to do | `modes/troubleshoot.md` |
| retro | a lasting, verified upgrade to how you and the agent work, from what the work just taught | `modes/retro.md` |
| refactor | cleaner structure or seams in existing code with external behaviour strictly unchanged | `modes/refactor.md` |

Each mode sets what you are optimising for. Changing mode is a decision that shapes the work, so it is the user's — propose a switch when what the work needs to optimise for shifts, and treat a direct request for another mode's work as their call to switch.

`sdlc` holds all six pipeline modes at once, and the agent changes between them by itself. It is never chosen for the user, and is entered only when they ask for it by name. Switching to a side-kick still needs the user's agreement. Its file is `modes/sdlc.md`.

## What to read

Before you act in a mode, read these in full. A goal that was not read cannot be held.

1. `core.md`, the goals that hold in every mode
2. the mode's file
3. every file that the mode's file lists under Goals

When the mode changes, read the new mode's file and what it lists. `core.md` holds throughout. When the files are no longer in view, as after a long session or a summary of it, read them again.
