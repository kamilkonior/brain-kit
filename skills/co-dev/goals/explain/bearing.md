# Explain: Bearing

The explanation reaches the decision or the change it is for: it says what depends on the subject, what a change would touch, what has to stay true, what can be changed freely and how a change would be checked, and what each option the user is weighing would cost.

*Falls short:* a description the user has to turn into consequences themselves. *Overshoots:* an impact study, or the change planned on the way.

*Borders:* how the subject works belongs to model, and why it is so to reasons; whether a stated consequence was looked up belongs to grounding; which consequences have to be in belongs to completeness; choosing among the options belongs to the user, and your view of them to agency; handing the decision back at the end belongs to return; the design and the plan of a change belong to the work returned to.

## Desirable

- **Tied to the question:** the account says in so many words what it means for the decision or the change that waits.
- **What depends on it:** the callers, the users, the stored data, the other services, the tests and the documents that rely on the subject are searched for and named.
- **What it depends on:** what the subject needs from outside (a service, a setting, an order of start-up, a format) is named where the decision turns on it.
- **What a change would touch:** for the change the user has in mind, the places that would have to change together are listed.
- **What has to stay true:** what others rely on (an order, a format, a uniqueness, a contract, a timing) is named as what a change must keep.
- **Free to change:** what is internal, and can change without anyone outside noticing, is said as well.
- **Seams:** where the subject is made to be extended (an interface, a registry, a setting), and where it is not, is pointed out.
- **Traps:** what would catch someone changing it (a hidden coupling, a thing held only by convention, shared state, a second copy of the logic) is named.
- **How a change would be checked:** which tests and checks cover the subject, how they are run and what they leave uncovered is said.
- **Options priced:** each option the user is weighing (keep, change, remove, replace) comes with what it would cost and risk, as far as the code shows it.
- **Hard to undo:** what could not easily be taken back (stored data in a new form, a public interface, a message sent) is marked.
- **The user's change followed:** the change the user proposes is followed through the model, and where it meets a dependent or a rule is shown.
- **Level named:** it is said where the decision belongs: within the code, in the plan, or in a decision of the design that would have to be reopened.
- **Change read for its effect:** a change is explained by what will be different for those who use the subject, not only by what is different in it.
- **Unknown said:** a consequence that could not be established is named as unknown, with what would tell.
- **Bounded by the decision:** consequences are followed as far as the decision needs, and for the options that are on the table.

## Undesirable

### Falls short

- **So what:** the account ends at how the subject works, and the user has to work out what that means for their question.
- **Dependents unlooked:** "you can change the format" is said, and nobody searched for who reads it.
- **Rule unsaid:** the order that three other parts rely on is never mentioned.
- **Smooth map:** the easy way through is shown, and the traps are left for the user to find.
- **Check unmentioned:** the user does not learn how they would know that their change worked.
- **General warning:** "changing this may affect other parts" names no part.
- **Level unnamed:** the user sets out to change in the code what the design decided, and nothing told them so.

### Overshoots

- **Impact study:** every change that could be made is followed through, though one is on the table.
- **Plan on the way:** the steps of the change are drawn up before anyone decided to make it.
- **Design on the way:** a better structure is proposed, where the question was what the present one implies.
- **Scare:** every trap is told at full weight, until nothing seems safe to touch.
- **Estimate unasked:** hours and days are attached to options nobody asked to have sized.

### Counterfeits (looks met, is not)

- **"Should be safe":** this is said, and nothing was looked at that could have said otherwise.
- **Mention as analysis:** "there may be other callers" is written, and none was looked for.
- **Consequence from the picture:** what a change would touch is derived from the tidy model, and not checked in the code.
- **Priced to suit:** the costs are told so that the option you favor comes out ahead.
- **Effort as fact:** "a two-hour change" is said of code whose callers were not counted.
