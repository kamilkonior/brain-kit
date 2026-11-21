# Walkthrough: Completeness

The account covers the whole work as far as the judgment needs: every change in the judged state is accounted for, every decision of the design and every step of the plan has its place in the work or is named as not built, and what the walkthrough did not go through is said.

*Falls short:* a tour of the highlights. *Overshoots:* every line shown, whatever it matters.

*Borders:* which changes are calls made without the user belongs to disclosure; whether a part was shown to work belongs to verification; how much room a part gets belongs to candor and economy; whether each statement is true belongs to grounding.

## Desirable

- **Every change accounted for:** each changed file in the judged state belongs to something the account says, in depth, in a line or as part of a named batch, and none goes unmentioned.
- **Design covered:** each decision and each success criterion of the design is pointed to in the work, or named as not built.
- **Plan covered:** each step in the build's extent is accounted for as done, or as not done with the reason and what picks it up.
- **Unexplained change found:** a change that belongs to no step and no decision is found and brought up.
- **Removed and changed too:** what was deleted, what behaves differently than before and what stopped working are covered like what was added.
- **Around the code:** migrations, configuration, dependencies, data, documentation and changes to build and release are in the account as far as the work has them.
- **Beyond the main path:** how the work behaves in the failures and edge cases the design names is covered, not only the path a showing takes.
- **What acceptance sets off:** what happens once the work is accepted (a migration that runs, a switch, something others will notice) and what is left for the user or someone else to do is in the account.
- **Open items carried:** the omissions, follow-ups, known limits and unconfirmed assumptions in the plan's record all reach the user.
- **Covered at its depth:** being covered can mean a line; depth goes where the judgment needs it, and a batch says what is in it.
- **Named gaps:** what the walkthrough did not go through, could not find out or left out at the user's wish is named before the verdict.
- **Gap hunting:** before the verdict is asked, the list of changes is gone through against the account for anything that was not mentioned.
- **Bounded by need:** the account holds nothing that the judgment or the reader does not need: no tour of code that did not change, no history that explains nothing.
- **Final check:** before the walkthrough is called complete, you say what was compared with what, and what was not.

## Undesirable

### Falls short

- **Highlights tour:** the interesting parts are shown, and the rest of the change is never mentioned.
- **Main path only:** the case that is shown works, and nothing is said of the failures and edges.
- **Code-only account:** the migration, the configuration and the new dependency are not in the walkthrough.
- **Additions only:** what was removed or now behaves differently is passed over.
- **Unmentioned files:** changed files appear in the diff that the account never placed.
- **Trailing off:** the first parts are gone through with care, and the last ones in a hurry, or not at all.
- **Open items dropped:** what the record lists as open or deferred does not reach the user.
- **Silent omission:** a part was skipped and nobody said so.

### Overshoots

- **Line by line:** every line is shown, whatever it matters.
- **Every file equal:** generated files, lock files and renames are toured like the logic.
- **Whole history:** every commit is gone through, including the attempts that were reverted.
- **Beyond the change:** unchanged code around the work is explained at length.
- **Every conceivable case:** edges are discussed that the design does not name and reality will not bring.
- **Moving finish line:** the walkthrough keeps finding one more thing to show.

### Counterfeits (looks met, is not)

- **Mention as coverage:** "there are also some configuration changes" is counted as having covered them.
- **Batch as a bin:** "various small fixes" holds a change in behavior.
- **Count as coverage:** "all 42 files were reviewed" is said where the user needed to know what is in them.
- **Claimed check:** "that covers everything" is said without the comparison having been made.
- **Named where nobody reads:** what was left out is listed at the bottom of a long message, or only in the record.
- **Padding:** length is taken for coverage.
