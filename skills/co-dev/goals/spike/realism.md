# Spike: Realism

The answer holds for the real thing: wherever the answer depends on it, the spike meets what the real thing will meet (the library in the version in use, data of the real size and kind, the place it will run, the person who will use it), where it does not, the difference is named, and the answer says for what it holds.

*Falls short:* an answer about a toy, given as an answer about the real thing. *Overshoots:* real conditions rebuilt for a question that does not depend on them.

*Borders:* which part is built and which is faked belongs to focus; whether the result was seen, and could have come out the other way, belongs to proof; using real systems and real data without harm belongs to containment; the bar the result is held against belongs to framing; whether the user has heard the limits belongs to shared understanding.

## Desirable

- **Conditions that count:** before the spike is built it is said which conditions the answer depends on (the size and kind of the data, the versions, the platform, the load, who uses the real thing) and which it does not.
- **Looked up, not assumed:** those conditions are taken from where they stand (the project's dependency file, the size of the real table, the numbers in the design) or asked of the user.
- **Real version:** the library, the service and the runtime are used in the version the work will use, not in the newest or the one remembered.
- **Real call:** the spike uses the part in doubt the way the work will have to use it, not by a simpler way that the work cannot take.
- **Real data:** where the answer depends on the data, a sample of the real data is used, or data made to its size and kind, with what is wrong in it.
- **Real size:** a question of speed, memory or limits is tried at the size the real thing will meet, and at a second size where it matters how the result grows.
- **Real place:** where the answer depends on where the real thing runs (the browser, the phone, the server, the user's machine), the spike runs there.
- **Real user:** a question of use is tried by the person who will use the real thing, or someone like them, and not judged by whoever made the spike.
- **Cases that will come:** the inputs the real thing is certain to meet (empty, very large, malformed, two at once) are among the cases, where the answer depends on them.
- **Stand-in by choice:** where the answer does not depend on a condition, the cheap stand-in is used.
- **Differences listed:** the ways in which the spike differs from the real thing are listed with the answer, each with whether it could change the answer, and in which direction.
- **Answer bounded:** the answer says for what it holds: "at two million rows, on this machine, one user at a time".
- **Carried over marked:** what is concluded for the real thing beyond what the spike met (a larger size, another platform) is marked as inferred, with the reason.
- **The rest named:** what the spike left out and the real thing will need (errors, access, the other formats) is named with a yes, where it bears on the decision, so that "it can be done" is not heard as "it is nearly done".
- **Realism follows stakes:** the more costly the decision, and the harder to take back, the closer the spike is brought to the real conditions.

## Undesirable

### Falls short

- **Toy data:** ten clean rows stand in for a table of millions, in a question about speed.
- **Wrong version:** the spike runs on the newest release, and the project is two major versions behind.
- **Happy path:** only well-formed input was tried, and the real input is not well-formed.
- **Own machine:** a question about the network is answered on one machine.
- **Warm and alone:** one user, a warm cache and an empty database give the number.
- **Easier call:** the spike uses a call the work cannot use, and the one it must use was not tried.
- **Maker as user:** you find that the interface feels fine, and nobody who will use it tried it.
- **Difference unsaid:** the answer is given with no word on how the spike differs from the real thing.
- **Heard as nearly done:** the yes comes with no word on what was left out, and the user plans a day for what will take a month.

### Overshoots

- **Production rebuilt:** a full environment is set up for a question about one function.
- **All the data:** the whole dump is loaded where a sample of the real kind would tell.
- **Every edge:** cases are covered that do not bear on the answer.
- **Real everything:** a real login, a real deployment and real styling surround a question about one call.
- **Disclaimed to nothing:** so many differences are listed, all with the same weight, that the answer says nothing.

### Counterfeits (looks met, is not)

- **Real size, wrong kind:** generated data has the right number of rows and none of the skew, the duplicates or the dirt.
- **Sample that flatters:** the sample of the real data is its clean part.
- **"Same as production":** this is said, and was not looked up.
- **Measured beside it:** the benchmark exercises the library's fast path, not the call the work will make.
- **Blanket caveat:** "results may differ in production" stands in for naming what differs.
- **Unmarked leap:** "so it will scale" is said of a result at one size.
