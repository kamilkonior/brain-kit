# Walkthrough: Synthesis

What the judgment needs is brought together from where it lies: the code, its history, the design and the plan with its record are joined into one account of the work, which says what it does, what parts it is made of, how they connect to each other and to what was there, and why it is this way.

*Falls short:* an inventory: files, commits and records gone through one by one. *Overshoots:* a picture so worked over that the code cannot be found in it.

*Borders:* whether each statement is true to the code belongs to grounding; whether every change is in the account belongs to completeness; the order in which the account is told belongs to order; whether the picture has reached the user belongs to shared understanding.

## Desirable

- **Central idea:** a sentence or two says what the work does and by what means, and the rest of the account hangs from it.
- **Before and after:** the account says what was there before and what is there now, for the one who uses the system and for the one who maintains it.
- **Parts named:** the parts of the work, new and changed, are named by what each is responsible for, in the design's terms, with where each lives in the code.
- **Joints shown:** where two parts meet (a call, an interface, a data format), the account says what passes between them and which side relies on what.
- **Fit with what was there:** where the work meets the existing system is shown: what it uses, what it changes and what now depends on it.
- **Traced path:** the design's main scenario is followed through the code from entry to result, so that the parts are seen working together.
- **Behavior tied to place:** each thing the work does is tied to the place that does it, and each changed place to what it is for.
- **Joined by subject:** what the design decided, what the plan made of it, what the record says happened and what the code does are put together subject by subject, not source by source.
- **Reasons attached:** why a part is the way it is comes with the part, taken from the reasons that the design, the plan and the record state.
- **Disagreements found:** where two sources say different things about the same subject (the plan and the code, the record and the history), the difference is found and said, not averaged away.
- **History for what the code cannot show:** the history and the record are used for what the code does not say (what was tried and given up, what changed after a check failed), where that bears on the judgment.
- **As it stands:** the account describes the work as it now is; how it came to be is told only where it explains something that is there.
- **Names kept:** the account calls things what the design and the code call them, so that the picture can be found again in both.
- **Put together first:** the account is assembled, at least in outline, before the walkthrough begins, not improvised file by file.
- **Proportion:** the picture is as large as the work: a change in two files is told in a few sentences, with no parts and joints invented for it.

## Undesirable

### Falls short

- **Inventory:** the account is a list of changed files, each with a line about what was done to it.
- **Tour by source:** the diff is gone through, then the commit log, then the plan's record, and joining them is left to the user.
- **Story of the build:** the account tells what was done ("first I added, then I fixed"), and never says what is there now.
- **Parts without joints:** each part is described alone, and nothing says how one reaches the other.
- **Island:** the work is described with no word on how it meets the system it was built into.
- **What without why:** the account says what each part does, and the reasons that the records hold stay in the records.
- **Both passed on:** the plan says one thing and the code another, and the user is told both at different moments, with no word that they differ.
- **Log as account:** commit messages or the record's entries are pasted together and called the walkthrough.

### Overshoots

- **Architecture lecture:** layers, patterns and diagrams are drawn up for a change that is three functions.
- **Forced unity:** changes that have nothing to do with each other are presented as one design.
- **Lost in the model:** the account is so abstract that the user cannot find the file in which any of it happens.
- **Everything linked:** every decision, step, commit and file is cross-referenced in a matrix, for a build of five steps.
- **Reasons for everything:** each routine line gets a rationale, and the reasons that matter are lost among them.

### Counterfeits (looks met, is not)

- **Design retold:** the design's description of the system is given as the account of the code, which was not compared with it.
- **Tidy picture:** the account is smoother than the work: the special case, the workaround and the leftover are not in it.
- **Reconstructed reasons:** reasons are written now that were not the ones in play, and given as the record's.
- **Diagram for show:** boxes and arrows are drawn that match no file and no call.
- **Sorted, not joined:** the material is put under thematic headings, source by source as before.
- **Name as explanation:** a part is "explained" by the name of its pattern ("a standard repository layer"), and what it does here is not said.
