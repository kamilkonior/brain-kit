# Gate: Trial

The work is tried, not only read: it is set up and used as the one it is for will use it, on the real path, along the design's main scenario, through the failures the design names and at the edges no check reaches, and what it does is compared with what it should do.

*Falls short:* a gate by reading. *Overshoots:* a test campaign larger than the work.

*Borders:* running the build's own checks again belongs to verification; that a trial harms nothing and leaves nothing behind belongs to containment; whether what a trial showed is a finding that holds belongs to grounding; where the trials go, and how many there are, is weighed with completeness.

## Desirable

- **Expected said first:** before a trial, what the design says should happen is written down, and is then compared with what happens.
- **Cold start:** the work is set up and started from the written instructions alone, as by someone who was not at the build.
- **Main scenario run:** the design's main scenario is run end to end on the real path (the request sent, the screen opened, the record read back).
- **As its user:** the work is used through what its user will use (the screen, the command, the call), not through its internals.
- **Named failures provoked:** the failures and limits the design names are provoked, including what must not happen.
- **Edges tried:** inputs the checks do not reach are tried where they will occur: empty, absent, too large, repeated, of the wrong kind, out of order.
- **Doubts from the reading tried:** a doubt that came up while reading the code is tried, so that it becomes a finding or is dropped.
- **Joints tried:** where the work meets what was there before, the old paths that pass through the changed code are used and seen to work.
- **What the user sees:** output, messages, screens and errors are looked at as they appear, for whether the one who gets them could act on them.
- **Before and after:** where the work changes existing behavior, the old and the new are compared on the same input, where that is cheap.
- **Real and stand-in told apart:** each trial says which parts were real and which were stand-ins or prepared data, and a criterion tried only against a stand-in is named as that.
- **Repeatable:** each trial is noted as what was done, on which state and what was seen, so that the build can do it again.
- **Could not be tried:** what cannot be tried here (live data, a credential, real load, a device) is named, with what trying it would take.
- **Stopped at the finding:** a trial that fails is taken as far as showing the failure reliably; finding its cause is left to the build.
- **Depth follows stakes:** trials go where a failure would cost most or be hardest to see; a change with no behavior of its own (a rename) gets the suite and no more.

## Undesirable

### Falls short

- **Read, not run:** the gate ends without the work having been started.
- **Suite as trial:** the builder's tests are run, and nothing is tried that they do not try.
- **Main path only:** the one scenario works, and no failure and no edge is tried.
- **Through the back door:** functions are called directly, and the path a user takes is never taken.
- **Builder's set-up:** the trial runs in the environment the build left (its data, its running services, its cache), and a start from the instructions is never tried.
- **Never looked:** the screen or the output a user will see is not opened.
- **Could not, unsaid:** what was not tried for want of access is not mentioned.

### Overshoots

- **Campaign:** load tests, fuzzing and a matrix of environments are set up for a change to one form.
- **Harness built:** tooling is written to try what a few commands would have tried.
- **Beyond the design:** the work is tried on cases the design excludes, and what it does there is reported as failure.
- **Tried to destruction:** trials are pushed against shared or live resources to see what breaks.
- **Debugging:** a failed trial turns into hours of hunting the cause, which is the build's to find.
- **Trying the old:** behavior the build did not touch is tried at length.

### Counterfeits (looks met, is not)

- **Demo repeated:** the build's own showing is run again, along the one path prepared for it.
- **Starts, therefore works:** the server comes up or the page loads, and that is recorded as the scenario tried.
- **Expected after the fact:** whatever the work did is recorded as expected, and nobody had said what was expected.
- **Trial on stand-ins:** the scenario passes against mocks and fixed data, and is recorded as tried.
- **Imagined run:** what the code "would do" is worked out by reading, and recorded as a trial.
- **Other state:** the trial ran on a state other than the examined one, and the record does not say so.
