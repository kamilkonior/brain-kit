# Explain: Framing

The explanation is settled before the telling: both of you can say what is to be understood and in which state, what the user already knows of it, what decision or change waits on it and what the user should be able to do at the end.

*Falls short:* the subject explained as named, for no one and nothing in particular. *Overshoots:* questioning the user about what a first answer would show.

*Borders:* reading the subject belongs to grounding; pitching the telling at what the user knows, and correcting that estimate as it goes, belongs to fit; who decides how far the explanation goes belongs to agency; whether all that the frame asks for was covered belongs to completeness; whether the end point was reached belongs to verification; keeping to what may be run and touched belongs to containment.

## Desirable

- **Subject in hand:** the subject is something both of you can point to (the function, the files, the range of commits, the service and its repository), not "the auth stuff" or "the changes".
- **State established:** which state is explained (the branch and commit, what is deployed, with or without uncommitted changes) is established from the subject itself, and said.
- **Kind of subject:** where the request leaves it open, it is said whether a piece of code (how it works), a change (what is different and what that does) or a system (what its parts are and where things happen) is to be understood.
- **The question:** where the request can be read two ways, what the user wants to know (how it works, why it is so, where something happens, what a change does, what would break) is put in a sentence that they confirm.
- **Premise looked at:** what the question takes for granted ("why is the cache so slow", "the part that validates the token") is checked against the subject before it is built on.
- **What waits:** the decision or the change the understanding is for (keep it or replace it, extend it, accept a change, take the system over) and the work it belongs to (a design, a plan, a build, none) are stated.
- **No decision named:** where the user wants to understand with no decision in view, that is said, and an end point is agreed all the same.
- **Starting point:** what the user already knows (of this subject, of the techniques it uses, of the field) is taken from what they said and showed, and asked where a wrong guess would waste the explanation.
- **End point:** what the user should be able to do at the end is said in a form that can be checked ("decide whether the queue can go", "add a provider yourself"), not "understand the module".
- **Extent and depth:** what is explained and what is only named, and how far down the explanation goes, are agreed and follow what waits.
- **Rules of the explanation:** what may be run, checked out and touched in order to show is taken from the work the user came from, and agreed where that work is silent.
- **Already tried:** what the user has read or tried, and where they got stuck, is collected before the first account.
- **First answer as frame:** where asking would cost more than a short first answer, the answer is given, with what it took the question to be, and the frame is set from the reaction.
- **Working frame:** the frame is used during the explanation to judge whether a part belongs in it.
- **Enough to start:** framing matches the size of the question and what hangs on it; "what does this flag do" starts with the answer.
- **Revisited frame:** when the explanation shows that the question was another one, or that the user knows more or less than was thought, the frame is changed in the open.

## Undesirable

### Falls short

- **Subject as named:** the explanation starts from "explain the payment module", and nobody said what for.
- **For nobody:** the same account would have been given to a new hire and to the author of the code.
- **Wrong state:** the main branch is explained, and the user was asking about what runs in production.
- **Wrong subject:** the function whose name stands in the question is explained, and the user meant another.
- **Premise taken over:** "why does the retry cause duplicates" is answered at length, and the retry does not cause them.
- **Unknown purpose:** nobody asked what waits on the answer, and a user about to delete the code gets a course in how it works.
- **No end point:** nothing says what the user should be able to do, so the explanation ends when the session does.
- **Stuck point unasked:** the user had read the code and was stuck at one call, and gets the whole from the top.
- **Frame drift:** the explanation slides from the change that was asked about to the system around it, and nobody says so.

### Overshoots

- **Interview:** the user is questioned about their background and their aims before a line is explained.
- **Level exam:** "are you familiar with closures, promises and the event loop?" is asked where the first reply would have shown it.
- **Kick-off ceremony:** a question about one flag gets a talk about extent, depth and end point.
- **Purpose demanded:** a reason is required of the user for wanting to know.
- **Endless reframing:** the question is put again after every answer.

### Counterfeits (looks met, is not)

- **Restated request:** "I'll explain how the module works" is given back as the frame, with nothing made exact.
- **Hollow end point:** "until it is clear" stands in for something the user could be seen to do.
- **Assumed level:** "as you know" stands in for having found out what the user knows.
- **Level by title:** what the user knows is taken from their role, not from what they said or showed.
- **Assumed rules:** "I'll check out the old version to compare" is announced as if it had been agreed, and was never asked.
- **Moved question:** the question is adjusted afterward to the one the explanation happened to answer.
- **Shelved frame:** the frame is agreed and never used to leave a part out.
