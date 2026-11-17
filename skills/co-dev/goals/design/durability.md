# Durability

The design keeps its value after the session: it is saved, someone who was not there can understand it, and the reasons for its choices are in it.

*Falls short:* a result that lives only in the conversation. *Overshoots:* a record or a design built for a future that won't arrive.

*Borders:* who decided belongs to agency; what the design must cover belongs to completeness; whether its facts were checked belongs to grounding.

## Desirable

- **Written as it goes:** each decision enters the record when it is made, so an interrupted session still leaves one.
- **Findable file:** the design lives outside the conversation, in a plain format, in a place the user chose or was told about.
- **One current version:** a single document is current and dated; it changes when a decision changes, and superseded content is marked or removed.
- **Standalone clarity:** someone who wasn't there can follow it: no "as discussed", no label coined in the session left undefined, and the problem and constraints of the time are in it.
- **Recorded rationale:** each decision carries the reason that actually drove it.
- **Recorded rejections:** what was considered and turned down is listed with why, so it is not proposed again.
- **Explicit assumptions:** the conditions the design depends on are stated, with what to revisit when one stops holding.
- **Marked firmness:** each decision shows whether it is firm or provisional, and whether it is cheap or costly to change.
- **Resumable state:** the work can be picked up from the record alone, with its open items, next steps and who takes them.
- **Stable handles:** decisions have names or numbers that later discussion can point at.
- **Root-cause solutions:** the underlying problem is fixed, not only its symptom.
- **Tested against change:** the main decisions are tried against likely variation (growth, a new requirement, a dependency changing).
- **Stable apart from volatile:** core decisions are separated from details expected to change, which are kept adjustable in one place and named as transient (versions, prices, people, dates).
- **Maintainable without you:** the user, or someone else, can update the design without you or this conversation.
- **Proportion:** effort on longevity matches the stated lifespan, which is asked for when not given.

## Undesirable

### Falls short

- **Ephemeral results:** conclusions exist only in the conversation, or are written from memory at the end.
- **Context dependence:** the record leans on the conversation: "the second approach", private shorthand, the answer without the question.
- **Lost rationale:** the decision survives without its reasons, and is re-argued or reversed by accident.
- **Competing versions:** drafts contradict one another with no sign of which is current, or the file no longer matches what was decided.
- **Hidden assumptions:** the design fails without warning when an unstated condition stops holding.
- **Fragility:** the design fits this week's exact circumstances, or patches a symptom until it returns.
- **Silent decay:** information goes stale with nothing to signal it, and nobody is responsible for keeping it current.

### Overshoots

- **Over-engineering:** the design carries flexibility for futures unlikely to arrive.
- **Premature permanence:** something still exploratory is locked in as settled, or what is written is treated as untouchable.
- **Record bloat:** so much is written down, or kept after it was superseded, that the decisions can't be found.
- **Process weight:** keeping the record takes more than designing does: a formal decision record for a trivial choice.
- **Imagined readers:** documentation is written for an audience that does not exist.

### Counterfeits (looks met, is not)

- **Transcript as record:** the conversation, or the story of the discussion, is saved in place of what was decided.
- **Reconstructed rationale:** reasons are written afterward that were not the ones in play.
- **Generic rationale:** "for scalability" or "for maintainability" explains nothing.
- **Dropped conditions:** a summary loses the caveats the decision depended on.
- **Filed and lost:** the record exists, and the user doesn't know where it is or what it says.
- **Untested flexibility:** the design is called adaptable without being tried against a likely change.
