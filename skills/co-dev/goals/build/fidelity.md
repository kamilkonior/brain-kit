# Fidelity

The build carries out the plan, and through it the design: each step is built as it says, nothing is built beside it or against it, and what building finds missing or wrong in the plan or the design is settled and written into them.

*Falls short:* a build that drifts from the plan. *Overshoots:* a plan followed where it is wrong, or to the letter against its purpose.

*Borders:* how a surprise is sized and answered belongs to adaptation; who settles a change belongs to agency; whether the plan's picture of the code still holds belongs to grounding; whether a step is shown done belongs to verification.

## Desirable

- **Read whole:** the plan is read from its file, all of it, and the design it names, before anything is built; where no plan is written, the steps, their checks and the terms of the build are written down in brief and confirmed first.
- **Fit to build from:** the plan is checked for what a build needs (accepted by the user, steps with outcomes and checks, a remit, a finish line), and what is missing is raised before code is built on it.
- **Inherited terms:** the plan's route, fixed points, bounds and finish line, and the design's purpose, decisions and success criteria, are taken over as they stand and used to judge the work.
- **Step read before built:** each step is read again in full when its turn comes (outcome, purpose, fixed points, bounds, needs, traps), not built from its title.
- **Outcome built:** what is built makes the step's outcome true, in the way its stated purpose intends.
- **Fixed points kept:** what the plan marks as fixed is built as stated, and exactly where other steps or systems depend on it (a name, a schema, a message format).
- **Bounds kept:** a step does what it says and stops where it says; what belongs to a later step is left for it.
- **Decisions honored:** a design decision is built as decided, including one you would have made differently, and an option the design turned down does not come back as the way the code is written.
- **Latitude used as meant:** what the plan leaves open is decided by the intent it gives, and its pointers (where a step lands, a pattern to follow) are taken as the starting points they are marked as.
- **Every change traced:** each change in the diff serves the step in hand; one that serves none is taken out or raised.
- **Questions raised when found:** a gap, a contradiction or something the code rules out is raised as a question about the plan or the design when it is found, not built around.
- **Settled at the source:** the answer is written into the plan, and into the design where it changes a design decision, so that code, plan and design keep saying the same thing.
- **Named departures:** where what is built differs from the plan (a step done another way, dropped, added or deferred), the plan says so, with the reason and who decided.
- **Loose ends closed in time:** an open item the plan or the design carries is closed before the step that needs the answer is built.
- **Final trace:** before the build is called done, the code is compared with the plan and the design in both directions (every step and decision in the code, every change in a step), and you say what was compared.

## Undesirable

### Falls short

- **Dropped parts:** something a step calls for is not in the code, and the step is marked done.
- **Stowaway features:** something is built that no step asked for.
- **Quiet redesign:** a design decision or a fixed point is built differently, and nobody is told.
- **Silent gap-filling:** a hole in the plan is filled with your choice and built as if it had been planned.
- **Plan from memory:** the build works from the conversation, a summary or the step titles, with the plan file unread or read once at the start.
- **Returning rejects:** an option the design turned down comes back as the way the code is written.
- **Step creep:** a step grows into its neighbors, and later steps find their work half done in another shape.
- **Parted records:** the code changes course, and the plan and the design still say what they said.

### Overshoots

- **Followed off a cliff:** a flaw noticed in the plan is built anyway, because the plan was accepted.
- **Letter over purpose:** a step is built as worded where its stated purpose points elsewhere.
- **Pointer as order:** a file or a pattern the plan named as a starting point is used though the code shows a better place.
- **Built around:** the code is bent to avoid a problem in the plan or the design that should have gone back to the user.
- **Reflexive reopening:** settled decisions of the plan or the design are questioned again with nothing new from the code.
- **Back to the plan for everything:** every small ambiguity stops the work, where a noted assumption would do.

### Counterfeits (looks met, is not)

- **Label tracing:** commits and notes cite a step, and the change does not do what the step says.
- **Outcome in name:** the function, the flag or the screen the step names exists, and does not do what the outcome says.
- **"Per the plan":** something is attributed to the plan or the design that it does not say.
- **Buried departure:** a difference from the plan is disclosed where the user will not notice it.
- **Plan fitted to the code:** the plan is rewritten afterward to match what was built, and the change is not shown as one.
- **Claimed trace:** "everything in the plan is built" is said without the comparison having been made.
