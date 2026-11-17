# Depth

The explanation goes down to where something can be done: from the place the failure shows, through each "why", to the fault that must change for the failure not to come back, and it says at what level that fault sits (the code, the plan, the design, the environment, the expectation).

*Falls short:* stopping at the place where the failure showed. *Overshoots:* whys followed past where anyone can act.

*Borders:* whether a link of the chain was shown belongs to proof; where else the same fault sits belongs to completeness; how far the search was to go at all belongs to framing; what the level means for the interrupted work, and the options for repair, belong to return.

## Desirable

- **Three things apart:** where the failure shows, what is at fault and how the fault came to be there are kept as three things.
- **Why asked again:** at each cause it is asked why that is so, until the answer is something that can be changed and whose change would prevent the failure.
- **First wrong thing:** the chain is followed back to the earliest point where something is not as it should be: the source of the bad value, not its user.
- **Trigger apart from fault:** what set the failure off (an input, a load, a date) is told apart from the fault that let it happen.
- **Conditions named:** where several things must come together for the failure (this input, this setting, this timing), each is named.
- **Level named:** the diagnosis says where the fault belongs: in the code, in a step of the plan, in a decision of the design, in the environment or the data, or in the expectation itself.
- **Level by evidence:** the level is settled by comparing what the code does with what the plan and the design say it should do.
- **How it got in:** where the thing once worked, the change or the assumption that brought the fault in is named.
- **Why it was not caught:** where a check should have caught the failure, the missing or mistaken check is named.
- **End that can be acted on:** the chain ends at something the user or the work can change, report or decide to live with.
- **Outside named:** when the chain leaves what the user controls (a library, a service, a platform), it is followed far enough to say what to report or to avoid, and no further.
- **Stops at the frame:** the chain stops where the frame's question is answered, and what lies deeper is named as not followed.
- **Depth follows stakes:** the chain goes further for a failure that would return or that cost much; a slip in a throwaway script gets a line.

## Undesirable

### Falls short

- **Crash site as cause:** "an empty value at line forty" is given as the cause.
- **Nearest cause only:** "the field was not set" is reported, and nobody asked why it was not.
- **Trigger blamed:** the cause is given as the customer's unusual input.
- **Guard as diagnosis:** the finding is where a check could be added, not why the bad state arose.
- **Level unnamed:** a fault is reported as a fault of the code, though the code does what the plan or the design said.
- **Returns next week:** the instance is explained, and the assumption that will produce the next one was never named.

### Overshoots

- **Whys without end:** the chain is followed into the history of the project, the habits of the team and the choice of language.
- **Hunt for the guilty:** the search turns from what is at fault to who.
- **Everything is the design:** each fault is traced up to "the architecture", and a redesign is called for.
- **Archaeology:** how the fault got in is researched through years of history, though nothing depends on it.
- **Deeper than can be acted on:** the inside of a library is studied after "use the other call" already answered the question.
- **Process for a typo:** causes in review and testing practice are drawn out for a misspelled name.

### Counterfeits (looks met, is not)

- **Deep-sounding label:** "technical debt", "missing validation" or "tight coupling" is given as the root cause.
- **Root cause by heading:** the section is called root cause, and what stands under it is the symptom.
- **Whys by rote:** five whys are asked because five is the number, and the later answers are guesses.
- **Unobserved depth:** the lower links of the chain were supplied by reasoning and are told as found.
- **Level picked to suit:** the fault is filed at the level that is cheapest to change, or furthest from your own work.
