# Build: Fidelity

The code builds what the plan and the design decided: every change can be traced to a step, nothing decided is dropped and nothing undecided is added, and where the build must depart, the plan or the design is changed first, in the open.

*Falls short:* a build that quietly replans or redesigns. *Overshoots:* a step followed to the letter where the code has shown it wrong.

*Borders:* whether the plan was ready to build from belongs to framing; seeing that the build must depart, and at what level, belongs to adaptation; who decides the departure belongs to agency; whether all the work was done belongs to completeness; what the code shows belongs to grounding.

## Desirable

- **Step read at the step:** each step is built from its text (result, place, what it relies on, check) and from the decisions of the design it points to, read when the step starts and not recalled.
- **Result as stated:** what is true when a step is finished is what the step says is true.
- **Exact where steps meet:** what the plan writes exactly (a signature, a data format, a file) is built exactly, and a needed difference is raised, not absorbed.
- **Room used:** what the plan left to the builder is decided by the builder, toward the step's result.
- **Reasons used:** where a step leaves something open, the plan's and the design's stated reasons settle it.
- **Sorted silence:** where plan and design are silent, a matter of implementation is settled in the code and noted, and a matter that changes what the user gets goes to the user.
- **Limits kept:** the design's constraints and exclusions, and the plan's limits (what must keep working, tools that must or must not be used), hold in the code.
- **Settled stays settled:** a decision of the design or the plan is built as made, and an option that was turned down is not brought back; either is questioned only on a fact that was not known then, which is named.
- **Nothing added:** the code holds no feature, option or behavior that nobody decided; a worthwhile extra is offered to the user, not built in.
- **Nothing dropped:** a part of a step that cannot be built as decided is raised, not simplified, stubbed or postponed in passing.
- **Changed first:** a departure is written into the plan, and into the design where it changes a decision, with its reason and who decided, before code is built on it.
- **Traceable change:** each commit or change names the step it serves, and no change serves none.
- **Two-way check:** before the build is called done, the plan is gone through step by step and the design decision by decision against the code, and what has no match is resolved or named.
- **One truth:** at the end the design, the plan and the code say the same thing.

## Undesirable

### Falls short

- **Drift:** the code builds something near the step: a simpler variant, a familiar pattern, what the existing code makes easy.
- **Built from memory:** a step is built from its title, or from what is remembered of it.
- **Redesign in code:** a decision of the design is replaced, in the implementation, by one you prefer.
- **Silent substitution:** a library, a format or an interface other than the one decided is used, and nobody is told.
- **Stowaway features:** options, endpoints, flags or behavior nobody decided are built in.
- **Dropped decision:** a decision of the design, or a part of a step, appears nowhere in the code.
- **Broken limit:** the code does what the design excluded, or ignores a constraint it set.
- **Fork:** the code and the plan now say different things, and the plan was not updated.

### Overshoots

- **Letter over reason:** the wording of a step is followed where that defeats the step's own result.
- **Into the wall:** a step is typed in as written though the code it was written for is no longer there.
- **Plan frozen:** something the build has shown wrong is worked around in the code, so as not to touch the plan.
- **Everything escalated:** every choice the plan left open goes back to the user as a question about the plan.
- **Trace bureaucracy:** every function carries step and decision numbers, in comments nobody will keep up.

### Counterfeits (looks met, is not)

- **Label matching:** commits and files carry the step's name, and the code does something else.
- **Stub as step:** the step's interface is there and its body is not, and the step is counted as built.
- **"Implementation detail":** a choice that changes what the user gets is filed as implementation to avoid asking.
- **Reinterpreted step:** the step's words are kept and their meaning quietly bent toward the easier build.
- **Plan fitted to the code:** the plan is edited afterward to say what the code happens to do, and this is called an amendment.
- **Claimed trace:** "everything in the plan is built" is said without the comparison having been made.
