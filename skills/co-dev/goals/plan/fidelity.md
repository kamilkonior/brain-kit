# Fidelity

The plan builds the design that was decided: every step can be traced to it, nothing in the plan contradicts it or adds to it, and where planning finds the design silent or wrong, the design is changed in the open, not in a step.

*Falls short:* a plan that quietly redesigns. *Overshoots:* a design followed to the letter where planning has shown it wrong.

*Borders:* whether the design was ready to plan from belongs to framing; whether all the work is in the plan belongs to completeness; who decides a change to the design belongs to agency; what the code shows belongs to grounding.

## Desirable

- **Decisions carried:** each decision of the design can be pointed to in the step or steps that build it, by its name or number where the design gives one.
- **Steps traced:** each step points to the decision it serves, or says that it is work the route needs (set-up, a migration, a test harness).
- **Reasons used:** where the letter of the design leaves a step open, the design's stated reasons and success criteria settle it, and the step says so.
- **Sorted silence:** where the design is silent, a matter of implementation is settled in the plan, and a matter that changes what the user gets goes to the user as a design question.
- **Limits kept:** the design's constraints and its exclusions (what it deliberately does not do) hold in every step.
- **Settled stays settled:** a decision of the design is built as made, and an option it turned down is not brought back; either is questioned only on a fact the design did not have, which is named.
- **Raised at once:** a gap, a contradiction or a decision that cannot be built as written is raised when it is found, with what was found and what the options are.
- **Amended at the source:** a change agreed during planning is written into the design, with its reason and who decided, and the plan follows the amended text.
- **Settled on the spot:** a gap in the design is settled with the user when it is found, and the steps that depend on it wait until it is.
- **Nothing added:** the plan builds no feature or behavior that the design did not decide; a worthwhile extra is offered to the user, not planned in.
- **Two-way check:** before the plan is called done, the design is gone through decision by decision and the plan step by step, and what has no match on the other side is resolved or named.
- **One truth:** at the end the design and the plan say the same thing, and no decision lives only in the plan.

## Undesirable

### Falls short

- **Drift:** steps build something near the design: a simpler variant, a familiar pattern, what the existing code makes easy.
- **Silent gap-filling:** where the design is silent on something that matters, the plan picks an answer and does not say so.
- **Redesign in passing:** a decision of the design is replaced, in a step, by one you prefer.
- **Relitigating:** a settled decision is put back on the table with no new fact, because you would have chosen otherwise.
- **Revived option:** an alternative the design rejected returns as "the practical way".
- **Dropped decision:** a decision of the design appears in no step.
- **Broken limit:** a step does what the design excluded, or ignores a constraint it set.
- **Stowaway features:** behavior nobody decided is planned in.
- **Fork:** the plan and the design now say different things, and the design was not updated.

### Overshoots

- **Letter over reason:** the wording of the design is followed where that defeats the design's own goal.
- **Into the wall:** a decision that the code shows cannot work as written is planned anyway, because it is in the design.
- **Design frozen:** a gap found while planning is worked around in the steps, so as not to touch the design.
- **Everything escalated:** every implementation choice goes back to the user as a design question.
- **Trace bureaucracy:** every line of the plan carries references, or a matrix is kept for a plan of five steps.

### Counterfeits (looks met, is not)

- **Label matching:** steps carry the design's headings and decision numbers and build something else.
- **Cited, not consulted:** the design is linked at the top and not read for the steps.
- **"Implementation detail":** a choice that changes what the user gets is filed as implementation to avoid asking.
- **Reinterpreted decision:** the design's words are kept and their meaning quietly bent toward the easier build.
- **Amendment in a footnote:** a change to the design is recorded only in the plan, or where nobody will read it, and called agreed.
- **Claimed trace:** "covers every decision" is said without the comparison having been made.
