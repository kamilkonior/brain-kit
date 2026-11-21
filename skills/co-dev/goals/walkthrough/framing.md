# Walkthrough: Framing

The walkthrough task is settled before the walkthrough: both of you can say which work is being judged and in what state, what it is judged against, how closely the user wants to look and what their acceptance leads to, and who will read the introduction.

*Falls short:* a tour of whatever the build left, measured against nothing. *Overshoots:* an interview before anything is shown.

*Borders:* facts about the code, and whether the records match it, belong to grounding; who decides what, once the frame is known, belongs to agency; whether the whole work is covered belongs to completeness; writing for the named reader belongs to introduction.

## Desirable

- **Work in hand:** the work being judged is something both of you can point to: the branch and the commits it consists of, and the design and the plan it was built from, in their current versions.
- **Records read first:** the design, the plan with its statuses and record, and the history of the work are read before anything is asked or shown.
- **Readiness check:** whether the build is at its end state (every step done or named as not done, the closing checks passing, the record current) is established from the code and its history, and what is missing is said before the walkthrough starts.
- **Unfinished named:** work that is not at its end state is named as unfinished, and is walked through as such on the user's word, with what is open said first.
- **Fixed state:** the state being judged is named (a commit), and when the work changes during the walkthrough, the new state is named and what was said about the old one is checked again.
- **Stated measure:** what the work is judged against (the design's success criteria, the plan's end state, the limits both set) is taken from the records and confirmed still to be what the user wants.
- **Measure without records:** where the work has no written design or plan, what it was meant to do is put in a few lines and confirmed, and the user is told that the comparison is thinner for it.
- **What the user saw:** which parts the user watched, tried or decided during the build is taken from the record, so that the walkthrough knows what is new to them.
- **The user's questions first:** what the user most wants to know, or doubts, is asked at the start.
- **Chosen depth:** how closely the user wants to look (behavior, structure, code) and how much time they have is agreed, and may differ from part to part.
- **What acceptance leads to:** what happens when the work is accepted (merged, released, sent to review, the next plan started) is said, with what of it cannot be undone.
- **Named reader:** who will read the introduction, what they know, what is asked of them and where the text goes (a pull request, a note in the repository, a message) is established, and asked when not known.
- **Rules said:** what the walkthrough may run and where, and that it leaves the work unchanged, is said before the first showing.
- **Working frame:** the frame is used during the walkthrough to judge what belongs in it and how much room a part gets.
- **Enough to start:** framing matches the size and risk of the work and stops when there is enough to begin; a small change on known code starts after a line.
- **Revisited frame:** when the walkthrough shows that the measure, the depth or the reader was off, it is changed in the open.

## Undesirable

### Falls short

- **Unknown subject:** the walkthrough covers whatever is in the working tree, with committed and uncommitted work, or this build and another, mixed.
- **Unfinished as finished:** the build's "done" is taken on its word, and a step still open or a failing check surfaces mid-walkthrough, or after acceptance.
- **No measure:** nothing says what the work is judged against, so it is judged against the account of it.
- **Unread records:** the walkthrough starts from the diff or from memory, and the design and the plan's record are not opened.
- **Assumed depth:** the user gets the code tour, or the summary, without anyone having asked which they wanted.
- **Unknown reader:** the introduction is written with no idea who reads it or where it goes.
- **Moving subject:** the work is changed during the walkthrough, and nobody says which state the user is judging.
- **Open end:** nobody has said what accepting sets in motion, and a "looks good" starts a merge or a release.
- **Frame drift:** the walkthrough widens to other work, or narrows to one part, and nobody says so.

### Overshoots

- **Kick-off interview:** a change of three files gets questions about measures, depths and readers before anything is shown.
- **Readiness perfectionism:** the walkthrough is refused over one open item that could have been named and walked around.
- **Build reopened:** the end state or the plan's cuts are put up for discussion before the work has been seen.
- **Design held again:** the design's settled decisions are questioned as part of setting the measure.
- **Endless framing:** depth and extent are renegotiated at every portion.

### Counterfeits (looks met, is not)

- **Build summary as frame:** the build's closing report is restated, and the state, the measure and the reader were never established.
- **Hollow measure:** "works as designed" or "meets the requirements" stands in for criteria that can be checked.
- **Assumed reader:** a reader is described ("a reviewer") whom nobody asked about.
- **Claimed readiness:** "the build is complete" is said without the check having been made.
- **Moved measure:** what the work is judged against is adjusted to what was built.
- **Shelved frame:** the depth and the measure are agreed, and never used to leave something out or to give something more room.
