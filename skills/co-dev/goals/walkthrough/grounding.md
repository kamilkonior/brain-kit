# Walkthrough: Grounding

The account is true to what is there: what it says about the work was read in the code as it now stands or seen in a run, what the records say was checked against the code, and what was seen, inferred and taken from the records stay apart.

*Falls short:* an account of the work as it was reported, meant or remembered. *Overshoots:* an audit of every line before a word is said.

*Borders:* what stands behind the claim that the work works belongs to verification; finding what departs from the design and the plan belongs to disclosure; whether everything is covered belongs to completeness; joining the sources into one picture belongs to synthesis.

## Desirable

- **Read now:** the code the account describes is read as it stands in the judged state, not recalled from having built it and not taken from the plan.
- **Change set from the history:** what changed is taken from the comparison between the starting state and the judged state, not from the list of steps.
- **Commits read, not their messages:** where the account relies on what a commit did, the change itself was looked at.
- **Records checked against the code:** a step marked done, a departure recorded or a check said to pass is compared with the code and its history before the account passes it on, or is passed on as what the record says.
- **Record for what only it can show:** who decided, why, and what was tried is taken from the record and the history, and named as coming from there.
- **Pointed to:** a statement about the code comes with where it can be seen (file and line, commit), so that the user can check it.
- **Seen, inferred, recorded:** what was read or run now, what is inferred and what is taken from the records stay apart wherever the user's judgment depends on the difference.
- **Reasons from their source:** why something is as it is is taken from where it was written down; where nothing was, the account says that the reason is inferred or not known.
- **Reach looked up:** what the account says about the effect on the rest of the system (what uses the changed code, what behaves differently) was looked up, not assumed.
- **Answers looked up:** a question whose answer is not known is answered by looking, or is said to be unknown, with how it could be found out.
- **The user's knowledge counts:** what the user says they saw or decided during the build is taken as evidence; when the record or the code says otherwise, the difference is raised.
- **Currency:** when the work, or what it was built on, has moved since the build ended, the account is of the judged state, and what moved is said.
- **Stopping point:** reading stops when more of it would not change what the user is told or how sure it is, and what was not read is said.
- **Open correction:** when a look contradicts something already told, it is corrected in plain view, and the points and the verdict that rested on it are looked at again.

## Undesirable

### Falls short

- **Report retold:** the build's closing report is the account, in other words.
- **Recall over reading:** the work is described from the memory of building it, after it has changed.
- **Record as source:** the plan's statuses and the commit messages are taken for what the code does.
- **Intended, not actual:** the account describes what a step was meant to do, not what the code does.
- **Message for the change:** a commit is described by its message, and the change was not opened.
- **Improvised answer:** a question is answered at once with what is plausible, and nothing was looked up.
- **Invented reason:** a reason is given for a choice, and no source holds it.
- **Hardened inference:** something inferred early in the walkthrough is relied on as seen later in it.

### Overshoots

- **Full audit:** every line is read again and every check run again before the walkthrough starts, whatever the stakes.
- **Distrust of the record:** with no sign of trouble, each status and each entry is proved again.
- **Reference flood:** every sentence carries five file references, and the account cannot be read for them.
- **Over-hedging:** well-supported statements are qualified until they say nothing.
- **Doubting the user:** what they say they saw or decided is rechecked line by line.
- **Findings dump:** everything that was read is reported, not what bears on the judgment.

### Counterfeits (looks met, is not)

- **False precision:** exact names, line numbers or figures are given that were not looked up.
- **"I checked":** a reading or a run is claimed that was not made.
- **Skimmed as read:** a file listing or a diff summary is treated as knowing the change.
- **One for all:** one call site was read, and the rest are described as the same.
- **Pointer that does not show it:** a file reference is attached to a statement that the place does not bear out.
- **Blanket disclaimer:** "details may differ" replaces saying which statements were not checked.
