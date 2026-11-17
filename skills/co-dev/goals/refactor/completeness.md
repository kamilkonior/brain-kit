# Refactor: Completeness

The new shape goes the whole way within the agreed extent: every user of the old structure is brought over, the old is removed and does not stay beside the new, what goes with the code (tests, documentation, comments, configuration) follows, and what was left as it was is named.

*Falls short:* two structures where there was one. *Overshoots:* the last occurrence chased where the old form does no harm.

*Borders:* how far the extent goes belongs to framing; finding the users belongs to grounding; whether the purpose was reached belongs to target; staying out of what lies beyond the extent belongs to containment, as does taking out what was put in only to look or to compare; telling the waiting work what is left belongs to return.

## Desirable

- **Every user brought over:** each use that was found (calls, imports, subclasses, tests, scripts, configuration) is changed to the new structure, and the list is gone through, not sampled.
- **Old removed:** the old function, file, class or path is deleted once nothing uses it, and does not stay beside the new one.
- **Bridges removed:** forwarding functions, second names, re-exports and switches that were put in to move step by step are taken out at the end, and each one that stays has a stated reason and an end.
- **One way within the extent:** within the extent there is one way of doing the thing that was restructured; where a part was left in the old form, that is said, with the reason.
- **Pattern everywhere, or said:** where the same move applied to many places, all those in the extent received it, and those left are listed.
- **Tests follow:** the tests sit with the code they test in the new layout, and are named for it.
- **Words follow:** comments, documentation and examples that name what has moved are brought up to date.
- **Around the code:** build files, configuration, generated code and the settings of the project's tools that name the old paths are brought up to date.
- **Nothing orphaned:** imports, helpers, files, test data and parameters that the change left without a use are removed.
- **Hard part done:** the instances that resist (the caller with the odd arguments, the test that knows the internals) are brought over like the easy ones, or named as left.
- **Closed threads:** a "later" noted during the work is done or handed over before the end.
- **Left out named:** what was meant to be done and was not, and what lies outside the extent and still has the old form, is named with its place.
- **Final check:** before the refactoring is called done, the code is searched once more for the old names and compared with the target, and you say what was compared and what was not.
- **Bounded by purpose:** how far the last instances are followed depends on what the purpose needs and the extent that was agreed.

## Undesirable

### Falls short

- **Half brought over:** four of ten callers use the new function and the rest the old one, and nothing says so.
- **Old left beside new:** the old code is kept "to be safe", and from now on both have to be maintained.
- **Bridge forever:** a forwarding function put in "for now" stays.
- **Stale words:** comments and documentation describe a structure that is no longer there.
- **Tests left behind:** the tests still sit under the old file's name, or reach the code only through the old path.
- **Orphans:** imports, helpers and files that nothing uses any more stay in.
- **Broken around the code:** a build file or a setting still names the old path, and it shows at the next release.
- **Silent omission:** the hard third is left as it was, and that is not mentioned.
- **Premature "done":** the refactoring is declared finished because the session ran long.

### Overshoots

- **Chasing the last one:** the pattern is applied to every instance in the codebase, far outside the extent.
- **While here:** the code next door is reshaped to match, because it now looks inconsistent.
- **Documentation campaign:** documentation is rewritten beyond the lines that named what moved.
- **Nothing may stay:** a bridge that users outside the project still need is removed for the sake of a clean end.
- **Moving finish line:** the extent grows with every instance that turns up.

### Counterfeits (looks met, is not)

- **Marked, not removed:** the old form is marked as deprecated, and that counts as dealt with.
- **Commented out:** the old code is turned into a comment, not removed.
- **Old under a new name:** the old code is moved to a folder called `legacy`, and is still in use.
- **Mention as coverage:** "there may be other usages" is written, and none was looked for.
- **Claimed check:** "all usages are updated" is said without the search having been made.
