# Decomposition

The work is cut into steps the builder can take one at a time: each has one result that can be seen, says what changes and where, and leaves to the builder what is better decided with the code open.

*Falls short:* steps so large or vague that the planning is still to do. *Overshoots:* steps so small or so dictated that the plan is the code, written without running it.

*Borders:* the order of the steps belongs to sequencing; how a step is shown to be done belongs to verification; whether the steps together cover the work belongs to completeness; the common format of the steps belongs to handover.

## Desirable

- **One result per step:** each step produces one thing that can be named and seen (a behavior, an interface, a migration), and its title names it.
- **Outcome stated:** a step says what is true when it is finished, not only what to do.
- **Located change:** a step says where the work happens (files, modules, interfaces, data), as far as the code was read.
- **Unit of work:** a step is sized so that it can be built, checked, reviewed and undone as one piece.
- **Cut at the seams:** steps are divided where the code and the design are divided (an interface, a responsibility, a behavior), so that two steps do not change the same thing for different reasons.
- **Thin slices:** where the design allows, a step delivers a narrow piece of behavior through every layer it needs, rather than one layer for all behaviors.
- **Decided in the plan:** a choice that several steps share, or that the builder could not make without this conversation, is made here and written into the step.
- **Room left:** what the builder can decide better with the code open (internal names, the shape of a function) is left to them.
- **Exact where steps meet:** what one step builds and another uses (a signature, a data format, a file) is written exactly, once, and both steps point to it.
- **Depth follows risk:** a step carries exact detail where a mistake would be costly or hard to see (a destructive command, a public interface, a data format); elsewhere it stays at intent.
- **Matched to the builder:** step size and detail fit the builder named in the frame: more for one who starts cold, less for one who knows the code.
- **Hard part cut too:** the difficult part of the work is broken down at least as far as the easy part.
- **Coarser with distance:** steps that depend on what earlier ones reveal are left coarser, and marked to be detailed when they are reached.
- **Unknowns as steps:** work whose size or shape cannot be known yet becomes a step of its own: what to find out, which decision it serves, and within what limit.

## Undesirable

### Falls short

- **Headings as steps:** the design's sections are turned into steps ("implement the API", "build the UI").
- **Wish steps:** a step names a quality ("make it robust", "handle errors") instead of a result.
- **Bundles:** one step holds several independent results, so it can only be done, checked or undone whole.
- **Hidden planning:** a step cannot be started until the builder has worked out its parts, their order and what they touch.
- **Nowhere steps:** a step does not say where in the code it happens, though that could have been found.
- **Passed down:** a choice that needed the user or the design (a format, a behavior on failure) is left to whoever builds the step.
- **Uneven grain:** the easy part is cut fine and the hard part is one line.
- **Layer slabs:** the work is cut by layer (all the storage, then all the logic, then all the interface), so that no step yields behavior.

### Overshoots

- **Code in the plan:** steps contain the implementation, line by line, for code that was never run.
- **Dictated internals:** names, signatures and structure inside a step are fixed though nothing outside the step depends on them.
- **Crumbs:** steps so small ("create the file", "add the import") that none has a result of its own.
- **Lost route:** there are so many steps that the route cannot be seen in them.
- **Flat depth:** every step is specified to the same depth, the trivial like the critical.
- **Detail far out:** late steps are fixed as exactly as the first, though they rest on results not yet known.

### Counterfeits (looks met, is not)

- **Generic steps:** a tidy numbered list that would fit any project: set up, implement, test, release.
- **Restated design:** steps repeat the design's decisions with "implement" in front.
- **Split by count:** steps are divided or merged to reach a number or an even length, not at seams.
- **Sub-step disguise:** one step's sub-items are separate results, and the step still counts as one.
- **Title only:** a step has a precise-sounding title and nothing under it that a builder could act on.
