# Explore: Showing

The user sees what is found where it is: what the model rests on is put in front of them at its place (the lines, the run, the record), so that they can check it, find it again and look further themselves.

*Falls short:* told, not shown: an account to take on trust. *Overshoots:* the material laid out for the user to read through themselves.

*Borders:* whether a statement was looked at belongs to grounding; what is said about the thing shown belongs to explanation; who chooses what to look at belongs to agency; how much reading a showing costs is weighed with economy; keeping the places for after the session belongs to durability.

## Desirable

- **At its place:** a finding comes with where it can be seen: the file and line, the command and its output, the commit, the record.
- **Openable:** the place is given in a form the user can open from where they are (a path with its line, a command to paste), and was tried as given.
- **Where the user works:** when the user works in an editor or a browser that the session can reach, the place is opened there.
- **The lines that carry it:** where the user needs to see the code itself, they get the few lines that carry the point, with where the lines are from.
- **What to notice:** an excerpt or an output comes with what to look at in it.
- **Along the thing:** when a path is traced, each step is shown at its place, in order, so that the user could walk the same path alone.
- **Seen running:** behavior the model rests on is shown in a run where one is cheap and harmless (a test, a request, a query), with what was done and what came back.
- **Their hands:** the user can open, run and try for themselves, and gets what that takes: the command, the place, what to expect.
- **Reasons at their source:** a reason is shown where it is recorded: the commit, the comment, the issue.
- **Absence shown:** "nothing calls this" is shown as the search and its result.
- **Landmarks:** the few places the model hangs on (where it starts, where the decision is made, where the data is kept) are singled out, and called the same each time.
- **Picture tied to places:** a sketch of the parts says for each of them where it is in the code.
- **State said:** a showing says what it is of: the branch, the environment, real data or test data.
- **Harmless showings:** runs go against development resources, start nothing that is hard to undo, and leave things as they were found.
- **Weight decides:** what the model rests on, or what surprises, is shown; what only fills in gets a pointer.

## Undesirable

### Falls short

- **Told, not shown:** the user is told how the thing works, and sees none of it.
- **Bare assertion:** "that is handled in the middleware" comes with no place.
- **Vague place:** "somewhere in the auth module", a directory, or a file of a thousand lines with no line.
- **Unopenable pointer:** the path does not resolve from where the user is, or the line has moved.
- **Paraphrase for the thing:** where the user needed to see the code itself, they get a description of it.
- **Described run:** what a command "would show" is told, and the command was not run.
- **No hands:** the user is never given the means to open or run anything themselves.

### Overshoots

- **File dump:** whole files or long outputs are pasted, and the point is somewhere in them.
- **Reading list:** the showing is a list of twelve files, and what each of them shows is left to the user to find.
- **Show without tell:** an excerpt arrives with no word on what it shows.
- **Reference flood:** every sentence carries five file references, and the places that matter cannot be told from the rest.
- **Everything demonstrated:** a run is staged for what a sentence and a pointer would settle.
- **Screen taken over:** files are opened in the user's editor one after another, faster than they can follow.

### Counterfeits (looks met, is not)

- **Pointer that does not show it:** a file reference is attached to a statement that the place does not bear out.
- **Excerpt cut to fit:** the lines shown stop before the branch that speaks against the point.
- **Rebuilt code:** code is quoted from memory, tidied or shortened, and presented as what is in the file.
- **Demo on rails:** the run that is shown follows the one case that fits the explanation, and does not say so.
- **Old picture:** output from another branch or an earlier state is shown as the state now.
- **Link as showing:** a link to the documentation is given where the question was what the code does.
