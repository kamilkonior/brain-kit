# Handoff

The builder can start from the plan without you or this conversation: it is saved where the builder will find it, someone who was not here can follow it, and it shows at any time what is done and what is next.

*Falls short:* a plan that lives in the conversation. *Overshoots:* a plan that carries the design, the code and the discussion along with it.

*Borders:* what a step says belongs to detail; who decided belongs to agency; the record of the design belongs to the design.

## Desirable

- **Findable file:** the plan is a file in a plain format, in a place the user chose or was told about, where the builder will look for it.
- **Written as it goes:** the plan file grows during the session, so that an interrupted session still leaves one.
- **One current version:** a single plan is current and dated; it changes when a decision changes, and superseded steps are removed or marked.
- **Standalone clarity:** someone who was not here can follow it: no "as discussed", and no label coined in the session left undefined.
- **Anchored:** the plan names the design it carries out and the state of the code it was made against (branch, commit, date).
- **Builder's reading order:** the plan opens with what the builder needs first: the route in a few lines, the terms of the build (remit, checkpoints, stop conditions), how to build and test, and then the steps.
- **Stable handles:** steps have numbers or names that do not change, so that commits, reports and later conversation can point at them.
- **Visible progress:** each step has a state (not started, in progress, done, dropped) that the builder keeps, so that the plan shows where the build stands.
- **Builder's notes:** the plan has a place where the builder records what it decided, what turned out different and why.
- **Startable and resumable:** the first step can be started, and an interrupted build taken up by someone else, from the plan, the design and the repository alone.
- **Reasons kept:** the reasons for the route, and for the choices of order and cut that are not obvious, are in the plan, briefly, with the routes turned down.
- **Open items carried:** open questions and deferred parts are in the plan, each with who closes it and before which step.
- **Cold read:** before it is handed over, the plan is read with only the design and the code at hand, by you or by a reader who was not here, and what that reader would have to ask is fixed.
- **Told to the user:** the user knows where the plan is, what state it is in and how the build starts from it.
- **Proportion:** the record matches the work: a short plan for short work, with no more apparatus than the build will use.

## Undesirable

### Falls short

- **Ephemeral plan:** the plan exists only in the conversation, or is written from memory at the end.
- **Context dependence:** the plan leans on the conversation: "as discussed", "the second option", shorthand coined in the session.
- **Unanchored:** the plan does not say which design, or which state of the code, it was made for.
- **Competing versions:** drafts contradict one another, with no sign of which is current.
- **No state:** nothing shows what is done, and the builder has to work it out from the code.
- **Lost reasons:** an order is given without its reason, and the builder reorders into the trap it avoided.
- **Loose ends:** open questions stay in the conversation and are not in the plan.
- **Renumbering:** step numbers change between versions, and earlier references point to the wrong step.

### Overshoots

- **Everything attached:** the plan carries the design, descriptions of the code and the discussion along with it.
- **Record bloat:** the history of every changed step is kept, and the current plan is hard to find in it.
- **Process weight:** status fields, logs and templates take more keeping than the work.
- **Tooling for a list:** a tracker, a board or a schema for a plan of five steps.
- **Imagined readers:** the plan is written for an audience that does not exist.
- **Hard to edit:** the format is so rigid that the user cannot change the plan by hand.

### Counterfeits (looks met, is not)

- **Transcript as plan:** the story of the planning is saved in place of the plan.
- **Standalone by assertion:** the plan is called self-contained and was never read cold.
- **Status for show:** state fields exist, and nothing says who updates them or when.
- **Pointer to nowhere:** the plan refers to design sections or files by names that do not match.
- **Reconstructed reasons:** reasons are written afterward that were not the ones in play.
- **Filed and lost:** the plan is saved, and the user does not know where.
