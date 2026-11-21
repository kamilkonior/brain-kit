# Gate: Grounding

Every finding rests on what was seen: it was read in the code of the examined state or seen in a run, it can be pointed to and shown again, the records were looked at for what would explain it, and what was seen, inferred and only suspected stay apart.

*Falls short:* suspicions recorded as findings. *Overshoots:* every finding hunted to its cause before it may be written down.

*Borders:* whether what the build says holds belongs to verification; from whose standpoint the work is seen belongs to independence; how much of the work was looked at belongs to completeness; what a finding weighs and whose it is belongs to sorting; how a finding is written down belongs to handover.

## Desirable

- **Read now:** a finding about the code rests on the lines as they stand in the examined state, read in their surroundings, not on a summary of the change or on memory.
- **Pointed to:** each finding names where it can be seen (file and line, the commit, the command and its output).
- **Shown again:** a failure is reproduced before it is recorded, and the record says how.
- **Case named:** a finding that the code does something wrong names the input or the state in which it does so.
- **Path followed:** before a defect is claimed from reading, the path is followed through callers and callees to see that the case can occur.
- **Explanation looked for:** before a difference is recorded as a departure or a defect, the record, the design and the code nearby are looked at for a decision or a reason that explains it.
- **Decision cited:** a finding that the work departs from what was decided cites the decision or the step it departs from.
- **Baseline checked:** before a failure is laid to the build, it is checked whether it was there in the starting state.
- **Own set-up ruled out:** a failure that may come from the gate's own environment (a missing tool, another version, data left by an earlier trial) is checked there first.
- **Seen, inferred, suspected:** each finding says which it is: seen in a run, read in the code, inferred, or suspected and not confirmed.
- **Suspicion kept as suspicion:** a doubt that could not be confirmed and would matter is recorded as a doubt, with its grounds and with what would settle it.
- **Whole of the pattern:** when a defect is found in one place, the like places are searched, and the finding says where else it holds and where it was looked for and not found.
- **Stopping point:** looking into a finding stops when it is shown to be there and can be shown again; its cause is the build's to find.
- **Open correction:** a finding that a later look refutes is withdrawn in the record, in plain view, and what rested on it is looked at again.

## Undesirable

### Falls short

- **Looks wrong:** a finding is recorded from the look of the code, and the case was never followed or run.
- **Lines out of context:** a defect is claimed from the changed lines, and the surrounding code that handles the case was not opened.
- **Not reproduced:** a failure seen once is recorded, and nobody knows how to see it again.
- **Laid to the build:** a test that failed before the build began is reported as broken by it.
- **Gate's own mess:** a failure caused by the gate's environment is reported as the work's.
- **Unread record:** a "departure" is reported that the record explains two entries further down.
- **Hardened suspicion:** something suspected early in the gate is written at the end as found.
- **Stale reading:** the finding describes the code as it was at an earlier commit.

### Overshoots

- **Cause hunt:** a failure that shows reliably is investigated for hours before it is recorded.
- **Proof or nothing:** a doubt with good grounds is left out of the record because it could not be proved.
- **Reference flood:** each finding carries ten file references and the full output, and its point cannot be found.
- **Proved thrice:** what a plain reading shows (a missing file, a step not built) is confirmed by elaborate runs.
- **Hedged findings:** findings that were plainly shown are qualified until they claim nothing.

### Counterfeits (looks met, is not)

- **False precision:** exact lines, names or figures are given that were not looked up.
- **"I checked":** a reading or a run is claimed that was not made.
- **Pointer that does not show it:** a file reference is attached to a finding that the place does not bear out.
- **One for all:** one call site was read, and the finding says "throughout".
- **Reasoned as observed:** "this fails when the list is empty" is written as seen, and was worked out by reading.
- **Blanket doubt:** "there may be more issues of this kind" replaces saying where it was looked for.
