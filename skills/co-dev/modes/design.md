# Design

## Intent

Shape what ought to exist, together with the user, while it is still cheap to be wrong — iteratively expanding, testing, and narrowing candidate forms until one deliberate design holds: it serves the purpose under real limits, fits the people who will use and live with it, belongs in the system, tames complexity as simply as those forces allow, holds up against failure and change, and makes its trade-offs and defaults on purpose. Testing candidates sharpens the problem itself, surfacing assumptions and tensions that only appear in concrete form. Design ends when real contenders are weighed and resolved into one coherent shape, the user owns it along with what it trades away and leaves open to building, and the intent and decisions are written down as a shared reference.

It falls short when an accidental shape stands, key trade-offs or consequences go unexamined, choices stay open, or the design is not the user's. It overshoots when it decides on paper what only building and real use can show, or keeps weighing options after criteria have separated them.

## Goals

These goals hold here as well. Read each file in full:

- `../shared/coherence.md`
- `../shared/robustness.md`

#### Brainstorming

Before a direction is chosen, there is a range of ideas to choose from: different in kind, concrete enough to picture, and with the user's own among them.

*Falls short:* the first workable idea is taken. *Overshoots:* ideas pile up past the point of use, and nothing stands out.

Why: the first idea that works is rarely the best, and it costs the most to replace once the design rests on it.

**Desirable**

- **Diverge, then converge:** ideas are opened up before any is judged, and it is said when gathering ends and choosing begins.
- **Brainwriting:** the user's ideas are asked for before they have seen the agent's.
- **Yes, and:** an idea of the user's is built on, also a half-formed one, before it is questioned.
- **Lateral thinking:** the ideas differ in kind, such as who acts, when, where and what is left out, not only in settings.
- **Prior art:** how the same need was met elsewhere is among the ideas.
- **Thumbnail sketch:** each idea is short, concrete enough to picture, and at the same level as the others.
- **Affinity grouping:** the ideas are few enough to hold, or grouped, with the promising ones marked and why.
- **Parking lot:** an idea set aside is kept, with the reason.

**Undesirable**

- **Premature convergence:** the first workable idea is run with, or ideas are judged as they appear.
- **Yes, but:** the user's idea is met with objections first.
- **Variations on a theme:** one idea with different settings is presented as several.
- **The usual suspects:** only the approaches anyone would think of first.
- **Spray and pray:** ideas are produced in number, and nothing says which stand out.
- **Blue-sky thinking:** an idea breaks a limit that was stated or that the system sets, and nothing says so.

#### Convergence

The open choices close, each against criteria that were stated first, and what is left at the end is one design, not a list of options.

*Falls short:* the choices stay open, and the user is left with options. *Overshoots:* a choice is closed before its options were compared.

Why: a choice that nobody makes here still gets made, later and by accident, by whoever builds.

**Desirable**

- **Decision criteria:** what the options are judged by is stated before they are judged.
- **Crux:** the comparison turns on the point where the options really differ, not on everything that could be said of them.
- **Spike:** what argument cannot settle is settled by a cheap trial.
- **Desk check:** the chosen shape is taken through a concrete case of the need, step by step, and it can be said what happens at each point.
- **Back-of-the-envelope calculation:** where a limit is a number, such as load, size or cost, a rough figure shows whether the shape stays within it.
- **Last responsible moment:** a choice that can wait at no cost waits for what will inform it, and no longer.
- **Decision record:** each decision is written as a decision, with its reason and what was turned down.
- **Sign-off:** once each decision is settled, they are put together as one design, and the user confirms the whole.

**Undesirable**

- **Sitting on the fence:** "it depends", or a list of pros and cons, stands where a choice was due.
- **Analysis paralysis:** weighing goes on after the criteria have separated the options.
- **Texas sharpshooter:** the criteria are chosen after the fact, to fit the option already preferred.
- **Grading on a curve:** the shape is chosen because it beat the others, and was never tried against the need.
- **Design by committee:** a blend is made in order to close, and keeps no option's strengths.
- **Big design up front:** the design fixes on paper what only the building can show.
