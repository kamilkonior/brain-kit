# Fidelity

The plan builds the design: all of it, nothing beside it and nothing against it, and what planning finds missing or wrong in the design is settled with the user and written into the design.

*Falls short:* a plan that drifts from the design. *Overshoots:* a design followed where it is wrong, or copied where it should be pointed to.

*Borders:* work the design does not mention (setup, migration, cleanup) belongs to completeness; whether the code is as the design assumes belongs to grounding; who settles a question about the design belongs to agency.

## Desirable

- **Read whole:** the design is read from its file, all of it, before anything is planned; where none is written, what is to be built is written down and confirmed first.
- **Fit to plan from:** the design is checked for what a plan needs (decisions made, success that can be checked, scope stated), and what is missing is raised before steps are built on it.
- **Inherited frame:** the design's purpose, success criteria, scope and constraints are taken over as they stand and used to judge the plan.
- **Every decision placed:** each decision and requirement of the design can be pointed to in the step or steps that carry it out.
- **Every step traced:** each step names the part of the design it serves; a step that serves none is removed or raised.
- **Decisions honored:** a settled decision is planned as decided, including one you would have made differently, and an option the design turned down does not come back as the way a step is done.
- **Firmness respected:** what the design marks firm is built on; what it marks provisional is planned so that changing it stays cheap.
- **Loose ends placed:** each open item and untested assumption of the design is closed before planning or tied to the step that settles it, ahead of the steps that need the answer.
- **Design questions raised:** a gap, a contradiction or something the code rules out is raised as a question about the design when it is found.
- **Settled at the source:** the answer is written into the design, so that design and plan keep saying the same thing.
- **Smallest reopening:** a question reopens only the decision it concerns, and you say what stands.
- **Pointers, not copies:** the plan refers to the design's decisions by their names or numbers and does not restate them.
- **Named departures:** where the plan builds less than the design (a first version, a deferred part), it says so, with who decided and where the rest goes.
- **Final trace:** before the plan is called ready, design and plan are compared in both directions, and you say what was compared.

## Undesirable

### Falls short

- **Dropped parts:** something the design calls for appears in no step.
- **Stowaway features:** a step builds something the design never asked for.
- **Quiet redesign:** a design decision is changed by a step that does it differently, and nobody is told.
- **Silent gap-filling:** a hole in the design is filled with your choice and planned as if it had been designed.
- **Design from memory:** the plan is made from the conversation, a summary or the design's headings, with the document unread.
- **Returning rejects:** an option the design turned down comes back as the way a step is done.
- **Lost constraints:** a constraint or success criterion of the design reaches no step and no check.
- **Parted documents:** a decision changed during planning is recorded in the plan only, and the design still says otherwise.

### Overshoots

- **Followed off a cliff:** a flaw noticed in the design is planned anyway, because the design is settled.
- **Planned around:** steps are bent to avoid a design problem that should have gone back to the user.
- **Letter over purpose:** the design's wording is followed where its stated purpose points elsewhere.
- **Copied design:** the plan restates the design at length, and the two begin to differ.
- **Reflexive reopening:** settled decisions are questioned again with nothing new, or the design is argued over again under the name of planning.
- **Back to design for everything:** every small ambiguity is sent back, where a stated assumption in the plan would do.

### Counterfeits (looks met, is not)

- **Label tracing:** each step cites a design section, and the step does not do what the section says.
- **Heading coverage:** every heading of the design has a step, and the decisions under the headings are in none.
- **"Per the design":** something is attributed to the design that it does not say.
- **Buried departure:** a difference from the design is disclosed where the user will not notice it.
- **Claimed trace:** "the plan covers the design" is said without the comparison having been made.
