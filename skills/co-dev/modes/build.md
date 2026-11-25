# Build

## Intent

Make the change that was agreed, together with the user, until it is done: it does what was agreed, holds up in real use, is shown to work by checks that could have failed, leaves the rest of the system sound, and can be lived with by whoever works on it next. Build ends when the user can rely on it without looking again, and knows what turned out differently from what was decided.

It falls short when the change is not done, or the user cannot tell that it is. It overshoots when it decides in code what was not the building's to decide.

## Goals

These goals hold here as well. Read each file in full:

- `../shared/fidelity.md`
- `../shared/verification.md`
- `../shared/coherence.md`
- `../shared/robustness.md`
- `../shared/craft.md`

#### Increment

The build advances one finished step at a time, and the system is whole after each.

*Falls short:* everything is open at once, and nothing works until all of it does. *Overshoots:* ceremony around every small change.

Why: builds get interrupted and steps turn out wrong. Both are cheap when the system is whole, and costly when it is not.

**Desirable**

- **WIP limit:** one step is in progress at a time, and nothing new rests on a step that was not seen to work.
- **Continuous integration:** each part is joined to the running system when it is built, not at the end.

**Undesirable**

- **Nuke and pave:** a failed step is undone by wiping more than that step changed.
- **Ceremony:** every small step gets the full round of checks, records and reports, whatever its risk.

#### Adaptation

What turns out differently than expected is understood before it is answered.

*Falls short:* the build presses on, patching as it goes. *Overshoots:* the build stops or replans at every bump.

Why: no plan survives the code unchanged. What decides the outcome is whether a surprise is understood or patched over.

**Desirable**

- **Root cause analysis:** a failure is traced to its cause before the code is changed, and the fix removes that cause.
- **Minimal reproduction:** the failure is made to happen on purpose, in the smallest case that shows it.
- **One change at a time:** one explanation is tried at a time, so that what helped is known.
- **Stop digging:** after two attempts that fail the same way, the approach is questioned, not tried a third time.

**Undesirable**

- **Band-aid:** the error is made to go away, and its cause stays.
- **Yak shaving:** each workaround needs the next, and the work moves further from what it was for.
- **Sunk-cost fallacy:** an approach is kept because of the effort already spent on it.
