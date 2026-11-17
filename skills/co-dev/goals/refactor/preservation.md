# Refactor: Preservation

The code does what it did: for everyone who relies on it, results, effects and errors are the same after the change as before, the interfaces they use keep their form unless a change was agreed, and what ought to be different (a fault, a rough edge, a missing case) is reported and left.

*Falls short:* behavior that drifts under the name of cleanup. *Overshoots:* every accident of the old code kept, so that its shape cannot change.

*Borders:* what counts as behavior, and who relies on it, is agreed in framing; showing that it is the same belongs to proof, and the checks for it to baseline; finding the users and the hidden ties belongs to grounding; who decides about a fault found belongs to agency, and handing it over to return; what lies outside the agreed code belongs to containment.

## Desirable

- **Same results:** for the same input and state the code returns and produces what it did, also at the edges (empty, absent, very large, malformed).
- **Same effects:** what the code writes, sends and calls, and what it logs as far as the frame counts that, happens as before: the same things, as often, and in the same order where the order is relied on.
- **Same failures:** errors come on the same occasions, are of the same kind and carry what callers read from them; what was caught before is caught, and what was passed on is passed on.
- **Surface kept:** names, signatures, defaults, formats and codes that others use are unchanged, or changed only as agreed, with every user brought along.
- **Stored and sent forms kept:** what goes to disk, a database, a queue or another service (field names, formats, keys, names of types written into data) keeps its form.
- **Faults kept:** behavior that looks wrong is kept as it is, told to the user at once with the case that shows it, and changed only as a change of its own, on their word.
- **No improvement in passing:** no validation is added, no message reworded, no default changed and no error newly handled because it seemed better.
- **Nothing dropped:** no branch, parameter, option or fallback is removed as unneeded unless it was shown unused and the user agreed.
- **When, not only what:** where callers depend on when something happens (lazily or at once, inside one transaction, before or after a check), that stays.
- **Cost within bounds:** speed, memory and the number of calls outward stay within what the frame agreed, and a restructuring that changes them noticeably (a query that now runs inside a loop) is said.
- **Unavoidable difference named:** where the new shape cannot keep something exactly (a stack trace, the place a log line names, a private name that shows in an error), the difference is named and the user decides.
- **Dependencies unchanged:** no library is added, upgraded or exchanged as part of the restructuring.
- **Only what is relied on:** what nobody relies on (private names, the layout inside a module, the order of internal calls that have no effect) is free to change, and is changed where the target needs it.
- **Care follows stakes:** the closest attention goes where a silent difference would be costly or hard to see (money, data, access, things that run at the same time).

## Undesirable

### Falls short

- **Repair in passing:** an off-by-one is corrected while the loop is pulled out, and nobody is told.
- **Quiet improvement:** input is now validated, an absent value now handled, an error message made friendlier.
- **Changed failure:** an error of another kind is raised, or one that used to reach the caller is now caught.
- **Reordered effects:** the record is now written before the check that used to come first.
- **Surface changed:** a public parameter is renamed or reordered, or a default changed, because the new shape looked better with it.
- **Dropped branch:** a special case disappears in the move because it looked unneeded.
- **Format drift:** a field in stored or sent data gets a new name along with the variable that held it.
- **Slower by structure:** the tidy version fetches each record with a query of its own, and nobody mentions it.
- **Upgrade on the way:** a dependency is raised to a new version in the same change.

### Overshoots

- **Accidents kept:** private names, the internal order of calls and parameters nothing passes are kept as if someone relied on them.
- **Old shape under glass:** every old function is kept as a wrapper around the new one, though all its callers are in the project and were brought over.
- **Stopped by a fault:** the refactoring is broken off, or bent around the place, because of a fault that could be reported and kept.
- **Kept against the user's word:** a difference the user accepted is avoided all the same, at a high cost in structure.
- **Invisible raised:** differences that nobody can observe (how long an internal variable lives) are brought to the user as changes in behavior.

### Counterfeits (looks met, is not)

- **"Purely structural":** this is said of a change that holds a difference in behavior.
- **Same on the main path:** the code returns the same for ordinary input, and differs for the empty, the absent and the failing case.
- **Harmless by assertion:** a difference is called harmless ("nobody depends on that message"), and nobody looked who reads it.
- **Behavior redefined:** what changed is declared afterward not to have been behavior.
- **Same name, other meaning:** the old signature is still there, and now does something slightly different.
