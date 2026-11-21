# Walkthrough: Introduction

The accepted work is introduced in writing to someone who was not there: the text says what the work does and why, how it fits together, what was decided along the way, what was checked and what was not, and where a reader should look; it stands without the session, has the form of the place it goes to, and goes out in words the user stands behind.

*Falls short:* a title and a list of commits. *Overshoots:* the walkthrough written out in full.

*Borders:* what the user accepted belongs to verdict; who the reader is belongs to framing; which decisions there are to tell belongs to disclosure; the weight given to weak points, in speech and in writing, belongs to candor; whether a statement is true belongs to grounding; whether the text goes out, and under whose name, belongs to agency.

## Desirable

- **After the verdict:** the text describes the state the user accepted, with the follow-ups as they sorted them, and a draft begun earlier is brought into line with the verdict.
- **For the named reader:** it is written for the reader the frame names: it assumes what they know, explains what they do not, and is pitched at what is asked of them.
- **Opens with the point:** the first sentences say what the work does and why it was wanted, before anything about how.
- **What is asked:** the reader is told what is wanted from them (a review, an approval, a try, nothing), and which parts most need their eye.
- **How it fits:** the parts of the work and where they meet the existing system are given briefly, in the project's terms.
- **Way through the change:** the text says where to start reading, in what order, and what can be skimmed (generated files, mechanical renames).
- **Decisions with reasons:** the decisions a reader would otherwise question (a departure from the obvious or from the design, an alternative turned down) are stated with the reason and who decided.
- **What was checked:** it says what was run and seen, how the reader can run it themselves, with commands that were tried as written, and what was not checked.
- **Limits and what is left:** what the work does not do, what is known to be weak and what follows later are in the text, each follow-up with who or what picks it up.
- **Same account:** the reader is told of the same departures, weak points and things taken on trust that the user was told of.
- **Standalone wording:** the text has no "as discussed", no label coined in the session and no pointer to the conversation.
- **Points to, does not copy:** the design and the plan are linked where the reader can open them, and only what the reader needs here is restated.
- **Form of the place:** the text follows what its place asks for: the project's template, its conventions for titles and links, its usual length.
- **Reader's order:** the text is arranged for someone deciding how to read the change, not in the order the walkthrough took.
- **The user's text:** the draft is put to the user, they change what they want, and it goes out when they say so, under their name, in the voice they use with that reader.
- **Session things left out:** what was said for the user only (their doubts, remarks about people, secrets, the story of the session) is not in the text.
- **Cold read:** before it goes to the user, the text is read as someone who has only it and the change, and what they would have to ask is put in.
- **Proportion:** the text is as long as the change needs: a small change is introduced in a few lines, and where nobody will read an introduction, none is written.

## Undesirable

### Falls short

- **Commit list:** the description is the list of commits, or the name of the branch.
- **What without why:** the text says what changed, and not what it is for.
- **Context dependence:** the text leans on the session: "the agreed approach", "the earlier fix", step numbers from a plan the reader cannot see.
- **No way in:** the reader faces forty changed files with no word on where to start or how to run anything.
- **Bare decisions:** an unusual choice stands unexplained, and the reviewer spends the review arguing it again.
- **Limits left out:** the reader finds for themselves what the author already knew was missing.
- **Wrong reader:** the text is written for the user, who was there, or for nobody in particular.
- **Stale draft:** the text was written before the verdict and still describes what has since changed.

### Overshoots

- **Walkthrough written out:** everything the user was taken through is in the text, at the same length.
- **Design copied in:** the design and the plan are pasted into the description, where they can drift from their source.
- **Diff in prose:** each file's changes are retold line by line, next to a diff that shows them.
- **Unasked documents:** a report or a walkthrough file is added to the repository that nobody asked for.
- **Imagined readers:** the text is prepared for an auditor, a committee or a future that does not exist.
- **Template for its own sake:** every section of a heavy template is filled, most with "not applicable".

### Counterfeits (looks met, is not)

- **Looks standalone:** the sentences are complete, and the key terms resolve only with the session.
- **Sales copy:** "robust", "comprehensive" and "seamless" stand where the text should say what the work does.
- **Softer outside:** the weak points and departures the user heard are missing from the text the reader gets.
- **Claimed checks:** "fully tested" is written, with nothing a reader could run or look at.
- **Sent unread:** the text went out under the user's name, and they never read it.
- **Boilerplate sections:** "Testing: all tests pass" and "Risks: none" would fit any change.
- **Pointers to nowhere:** the text links to a design or a plan that the reader cannot open.
