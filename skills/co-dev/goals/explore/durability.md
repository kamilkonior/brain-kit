# Explore: Durability

The understanding keeps its value after the session: the user can find again what they were shown, and where a design is to follow or the user wants it, a short note holds the model, the places it hangs on, what it rests on and what stayed open, so that what comes next can start from it without exploring again.

*Falls short:* an understanding that fades with the conversation. *Overshoots:* documentation nobody asked for.

*Borders:* whether a note is kept, and where, is the user's call under agency; what the model is belongs to synthesis; whether its statements were looked at belongs to grounding; whether the user holds the model belongs to shared understanding; what was left unlooked belongs to saturation, and is carried here.

## Desirable

- **Closing word:** at the end the user is told in a few lines where the model stands, what stayed open, and where the note is or that none was written.
- **Asked once:** toward the end the user is asked whether they want a note and where; with a design to follow, a short note is the stated default.
- **Model first:** the note opens with the model as the user last confirmed it: what the thing is, how it works and why it is so, in a paragraph.
- **Places kept:** the few places the model hangs on are listed with file and line, each with what is to be seen there.
- **State and date:** the note names what was explored (the repository, the branch or commit, the environment) and when, so that a later reader can tell whether it still holds.
- **Standing carried:** what was seen, what was inferred and what was not looked at are as far apart in the note as they were in the conversation.
- **Reasons with their sources:** the reasons that were found are in the note with where each comes from, and the ones not found are named as not found.
- **What a change would meet:** what someone changing this would have to know (what depends on it, what must stay true, where it behaves otherwise) is listed as findings, not as advice.
- **Corrections kept:** where the exploration corrected the user's earlier picture or the documentation, the note says so, so that the old picture does not come back.
- **Open questions:** the questions left open are listed, each with who or what could answer it.
- **Ideas apart:** ideas for a change that came up are listed apart from the findings, as ideas.
- **The user's words:** the note uses the terms the user used and confirmed.
- **Standalone wording:** the note has no "as we saw" and no label coined in the session left undefined.
- **Findable:** the note is in a plain format in the place the user named, outside the explored code unless they want it there, and they are told where.
- **Grows with a long exploration:** where the exploration runs long, the note is begun early and added to as rounds end, so that an interrupted session leaves one.
- **Wrong documentation reported:** a document or comment that the exploration found to be false is reported to the user and listed, not corrected unasked.
- **Proportion:** an understanding that fits in a paragraph is kept as a paragraph in the closing word, and where understanding was all the user came for and they want no note, none is written.

## Undesirable

### Falls short

- **Only in the chat:** the model and its places are spread over a long conversation, and nothing gathers them.
- **Places lost:** the user remembers that there is a place where the limit is set, and not where.
- **Explored again:** the design begins by finding the same places a second time.
- **Stateless note:** nothing says which branch or version was explored, or when.
- **Standing lost:** the note gives what was inferred in the same voice as what was seen.
- **Open questions dropped:** what stayed open is written nowhere.
- **Context dependence:** the note leans on the session: "the second handler", "the path from before".
- **No closing word:** the exploration ends with the last answer, and nobody has said where things stand.

### Overshoots

- **Unasked documents:** an architecture document, a diagram or a README is written into the repository that nobody asked for.
- **Documentation project:** the note sets out to document the system, beyond what the concern reached.
- **Transcript kept:** every round, command and dead end is written down.
- **Code copied in:** long excerpts are pasted into the note, where they will drift from the code.
- **Imagined readers:** the note is prepared for a team, an onboarding or an audit that nobody mentioned.
- **Note ritual:** the note of a short exploration is rewritten after every round.

### Counterfeits (looks met, is not)

- **Tidier than it was:** the model in the note is smoother and surer than the one the exploration ended with.
- **Yours, not theirs:** the note holds the model as you would tell it, not as the user confirmed it.
- **Design smuggled in:** recommendations and a proposed solution stand in the note among the findings.
- **Looks standalone:** the sentences are complete, and the key terms resolve only with the session.
- **Dangling places:** the note points to files and lines that were not checked when it was written.
- **Filed and lost:** the note exists, and the user does not know where it is.
