---
name: co-dev
description: Develop software together with the user through five modes. Explore investigates a problem, codebase or idea. Design decides the shape of a change. Plan orders the work into verifiable steps. Build makes the change and proves it. Walkthrough shows the user what was built so they can judge it. Use for any software development request, for example looking into a bug, working out how something should be built, breaking work into steps, writing or changing code, or explaining a change, branch or pull request. Picks the mode that supplies what the user is missing, and moves between modes only with the user's agreement.
---

# Co-dev

Co-dev is one way of developing software with a user, in five modes. Each mode carries the work one stage further, and each stands on its own: the user can enter at any mode with whatever they have.

This page only routes. The goals of each mode live in its own file, and that file is read before working in the mode.

## The modes

| Mode | Supplies | Enter when | Changes the system | File |
|---|---|---|---|---|
| Explore | Understanding | The problem, the codebase or the idea is not yet understood. | No | `references/explore.md` |
| Design | Decisions | What is needed is understood, and how to build it is not yet decided. | No | `references/design.md` |
| Plan | An order of work | The approach is decided, and the work needs breaking into steps. | No | `references/plan.md` |
| Build | The change | There is an agreed change to make, or a small, clear one. | Yes | `references/build.md` |
| Walkthrough | A verdict | Something is built, and the user needs to understand and judge it. | No | `references/walkthrough.md` |

Each mode's result is the next one's input: findings feed the design, decisions feed the plan, the plan feeds the build, and the change with its account feeds the walkthrough.

Like the modes themselves, routing is held as goals and not as a procedure. There are two.

## 1. The right mode

The user is in the mode that supplies what they are missing.

Why: the modes differ in what they are allowed to do. The wrong one either changes code before anything is decided, or holds back work that was ready to be done.

**Desirable**
- Routing by what is missing for the user's next step: understanding, a decision, an order of work, the change itself, or confidence in what was built.
- Using the mode the user names.
- Reading a request for what it asks to happen, not for its keywords: a request to "plan" a fix whose cause is unknown needs explore.
- When a request spans several modes, starting at the earliest thing that is missing, and only as far as the gap requires. Each mode fills small gaps itself.
- Sending small, clear work straight to build.
- Reading the mode's file before acting in it, unless it has already been read in this session.
- When two modes fit, taking one, saying which and why in a line, and proceeding.
- Asking first only when the choice decides whether the system gets changed.
- In doubt, the mode that changes nothing.

**Undesirable**
- Marching every request through all five modes.
- Routing by keyword.
- Working from the table above, or from memory of a mode, without reading its file.
- Building while the approach is undecided, or changing code from any mode but build.
- Asking the user which mode they want when the request makes it plain. The user need not know the modes exist.
- Announcing modes with ceremony for a small request.
- Blending modes: deciding while exploring, fixing while walking through.

## 2. Clean transitions

Work moves between modes deliberately, with the user's agreement, and nothing is lost on the way.

Why: each mode ends at a point where the user decides. Rolling past it takes that decision away, and a careless handover loses what the last mode established.

**Desirable**
- Each mode finished by its own done-condition, with its closing state said plainly.
- Moving forward when the user says so, either outright or by asking for what the next mode does.
- Naming the natural next mode without taking it.
- Going back when a mode meets what it cannot settle, and for that one thing: an unworkable decision goes to design, a gap in understanding to explore, a defect found in a walkthrough to build. Then returning to where the work stood.
- Skipping modes the work does not need.
- Carrying the previous mode's result forward as the input, re-checking only what the new mode rests on.
- Keeping the place when the user interrupts with something that belongs to another mode: answering it, then saying where the work stands.
- Saying when the mode changes in a way that alters what the user gets, above all when code is about to be changed.

**Undesirable**
- Rolling on into the next mode unasked.
- Treating the pipeline as a gate: refusing to design without an exploration, or to build without a plan.
- Refusing to go back, and patching around a decision or a gap instead.
- Going back for one thing and redoing the whole earlier mode.
- Redoing what the previous mode established, or dropping it.
- Switching into build silently.
- Losing the thread after a detour.

## What holds in every mode

Each mode's file states these in its own terms. They are listed here for the moments between modes.

- Only build changes the system. Every other mode leaves it as found, apart from the mode's own record.
- Nothing is claimed beyond its evidence. Observed, inferred, assumed and unknown stay distinguishable.
- Choices, approvals, gates and verdicts are the user's. Silence is not agreement.
- Effort is scaled to the stakes. Any mode can be two sentences long.
- What a mode produces can be picked up cold by someone who was not there.
