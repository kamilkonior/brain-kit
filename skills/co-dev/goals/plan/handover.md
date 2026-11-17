# Plan: Handover

The plan can be built from without this session: it is saved, a builder who was not here can follow it, and it shows at any moment what is done and what comes next.

*Falls short:* a plan that needs the conversation to be read. *Overshoots:* a plan so full of the design and the code that the steps are buried.

*Borders:* what a single step must say belongs to decomposition; whether all the work is in the plan belongs to completeness; whether the user understands the plan belongs to shared understanding; what the builder may decide is agreed under agency, and when the work stops is set under resilience.

## Desirable

- **Written as it goes:** the plan is in a file from the first outline and changes there as it is worked out, so an interrupted session still leaves one.
- **Findable file:** the plan lives outside the conversation, in a plain format, in a place the user chose or was told about, next to the design or linked from it.
- **One current version:** a single plan is current and dated; when it changes, superseded content is removed or marked.
- **Orientation at the top:** the plan opens with what a builder needs before the first step: the frame, the route in a few sentences, where the design is, how to set up and how to run the checks.
- **Standalone wording:** the plan has no "as discussed", no label coined in the session left undefined and no pointer to a message.
- **Points to the design:** the plan refers to the design by decision and does not copy it, and it tells the builder to read the design and where it is.
- **Uniform steps:** every step has the same parts in the same place (result, where, what it relies on, check) and a name or number that later talk and commits can point at.
- **Visible state:** each step carries a status that the builder updates, so that what is done, what is in progress and what comes next can be read from the plan at any time.
- **Resumable:** a build interrupted at any point can be picked up, by someone else, from the plan and the code alone.
- **Rules of the build:** how the plan is to be worked from (one step at a time or several, what to record, what the builder may decide, when to stop) is written in the plan, where a builder meets it before the first step.
- **Reasons for the plan's choices:** why the route and the less obvious cuts are as they are is stated briefly, so that a builder does not undo them.
- **Room for the record:** the plan has a place where the builder notes what turned out differently and what was decided along the way.
- **Agreed form:** the plan's form fits how the builder will take it in (a file an agent reads, issues in a tracker), as agreed with the user.
- **Cold read:** the finished plan is read as someone who has only the plan, the design and the code, and what they would have to ask is put in.
- **Closing hand-off:** at the end the user is told where the plan is, what state it is in and how the build starts.

## Undesirable

### Falls short

- **Plan in the chat:** the plan exists only in the conversation, or is written to a file from memory at the end.
- **Context dependence:** steps lean on the session: "the approach we chose", private shorthand, "the file from before".
- **Missing orientation:** the builder has to discover how to set up, where the design is and how the checks are run.
- **No state:** nothing in the plan shows what has been done, so progress lives in the builder's memory.
- **Lost reasons:** a deliberate order or cut looks arbitrary, and the builder "improves" it.
- **Competing versions:** an outline, a revised plan and the conversation disagree, with no sign of which is current.
- **Unwritten rules:** what the builder may decide and when to stop was agreed in the conversation and is not in the plan.

### Overshoots

- **Design copied in:** the design's text is repeated in the plan, where the two can drift apart.
- **Code tour:** the plan explains the codebase at length, beyond what the steps need.
- **Record bloat:** the history of the planning, the discarded routes and the discussion fill the plan.
- **Heavy format:** every step carries fields, tables and metadata, in a plan of five steps.
- **Imagined readers:** the plan is prepared for readers who will never exist: a team, an auditor.
- **Tool ceremony:** tickets, boards and labels are created for a build that one builder does in one sitting.

### Counterfeits (looks met, is not)

- **Transcript as plan:** the story of the planning conversation is saved in place of the steps.
- **Looks standalone:** the sentences are complete, and the key terms and pointers resolve only with the session.
- **Empty checkboxes:** status boxes exist, and nothing says what makes a step "done".
- **Dangling pointers:** the plan refers to decisions, sections or files by names that are not there.
- **Filed and lost:** the plan is saved, and the user does not know where, or which file is current.
- **Claimed cold read:** "a new builder can follow this" is said without anyone having read it cold.
