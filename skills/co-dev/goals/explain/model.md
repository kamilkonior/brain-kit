# Explain: Model

The user has a whole to hang the details on: what the subject is for, the few parts it is made of, how they work together and the idea that runs through them, told before the details and at the level at which the decision is made.

*Falls short:* a walk through the files, with parts and no whole. *Overshoots:* a picture so tidy or so abstract that it no longer says what this code does.

*Borders:* why the parts are as they are belongs to reasons; what the model means for a change belongs to bearing; pointing to the parts in the code and following a case through them belongs to demonstration; whether the model is true of the code belongs to grounding; whether the exceptions that matter are in belongs to completeness; the words used and what the user is taken to know belong to fit.

## Desirable

- **Purpose first:** what the subject is for, and for whom, is said in a sentence before how it does it.
- **Whole before parts:** the first account covers the whole subject in a few sentences, and detail comes after.
- **Few parts:** the subject is told as a handful of parts, each with a name and the one thing it is responsible for.
- **Working together:** how the parts work together is said: who calls whom, what passes between them, in what order.
- **Central idea:** the idea from which most of the rest follows ("every change is an event appended to a log") is named, where the subject has one.
- **Level of the decision:** the model is drawn at the level at which the user will decide or change: components for a choice between two structures, the steps and the state of one function for a change inside it.
- **Shape of the kind:** code is told as input, steps, state and output; a change as what was, what is and what that does to what surrounds it; a system as its parts, its flows, its boundaries and where things live.
- **State located:** where the subject keeps what it remembers (tables, caches, files, fields), and who writes it, is part of the model.
- **Edges named:** where the subject ends and what it touches outside (its callers, the services it calls, what it stores) is said.
- **Hard part pointed to:** the model says where the difficulty of the subject sits, and what is plumbing around it.
- **Names from the code:** the parts carry the names they have in the code, so that the user can find them.
- **Layers that hang:** each deeper account is placed in the one above it, and the user can say to which part a detail belongs.
- **Picture where it helps:** a sketch or a table is used where relations are easier seen than read, and each of its boxes and arrows means one thing.
- **Analogy with its limit:** a comparison is used where it carries the structure, and where it stops holding is said with it.
- **True to the mess:** where the code departs from its own structure (a shortcut past a layer, two ways of doing one thing), the model says so.
- **One model kept:** the same picture is used through the session, and when a closer look shows it wrong it is changed in the open.
- **Proportion:** a question about one condition gets no architecture.

## Undesirable

### Falls short

- **File tour:** the files are gone through in the order of the listing, each with a sentence.
- **Paraphrase:** the code is retold in English line by line, and nothing is said that the code does not say.
- **Parts list:** the components are named, and how they work together is not.
- **Detail first:** the account opens with the parsing of a header, and what the service is for comes on the third screen, or never.
- **No center:** twenty facts are given at equal weight.
- **Wrong level:** the user who has to choose between two structures gets the loop variables.
- **Diff read out:** a change is told as its changed lines in their order, and what it does as a whole is not said.
- **Shifting picture:** each answer cuts the subject up another way, and no two can be laid on each other.

### Overshoots

- **Floating abstraction:** "a layered design with a service and a repository" would be true of a thousand codebases.
- **Tidier than the code:** the model shows clean layers, and the handler that writes straight to the database is not in it.
- **Stretched analogy:** the comparison is carried on past the point where the subject behaves like it.
- **Architecture for a line:** a question about one flag gets the structure of the system first.
- **Diagram for everything:** each answer comes with a drawing, where a sentence would do.
- **Framework of your own:** the subject is recast in terms you coined, which appear nowhere in the code.

### Counterfeits (looks met, is not)

- **Label as model:** "it's the observer pattern" stands in for saying what observes what here.
- **Boxes and arrows:** a diagram is drawn in which an arrow means now a call, now a flow of data, now "is related to".
- **Design told as code:** the model is the one in the documentation, and the code no longer has that shape.
- **Headings as structure:** "Overview" and "Architecture" stand over what is still a file tour.
- **Analogy that misleads:** the comparison makes the user expect something the subject does not do.
- **Whole in name:** "at a high level" introduces a list of details.
