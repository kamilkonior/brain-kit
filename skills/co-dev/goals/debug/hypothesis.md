# Debug: Hypothesis

The search works from explanations that could be wrong: each candidate cause says how it would produce the failure and what else would then be seen, more than one is held while the evidence fits more than one, and the user's are among them.

*Falls short:* the first plausible cause, held to. *Overshoots:* a list of everything that could be wrong, or theory where a look would tell.

*Borders:* testing the candidates belongs to narrowing; whether the one that is left has been shown belongs to proof; the facts a candidate starts from belong to grounding; giving the user's suspicion its hearing belongs to agency.

## Desirable

- **Said before tested:** the explanation in play is stated in a sentence before any probe: what is wrong, where, and how that gives the symptom.
- **Could be wrong:** each candidate says what else would be seen if it were true, and what would be seen if it were not.
- **Mechanism:** a candidate says how the fault would produce the symptom, step by step, not only where the fault is.
- **From the evidence:** each candidate starts from something observed (the message, the difference from the working case, a recent change), and says from what.
- **More than one:** while the evidence fits several causes, several are held, and it is said which.
- **Different in kind:** the candidates differ in where they put the fault (the code, the data, the configuration, the environment, the test, the expectation), not only in which line.
- **Ranked:** the candidates are ordered by how likely each is and how cheap to test, and the order is said with its reason.
- **Plain causes included:** the dull causes have their place on the list: the wrong file, a build that is not fresh, another environment than thought, the test itself.
- **Own work suspected:** your own recent change is a candidate like any other, and the first when the timing fits.
- **The user's candidates:** what the user suspects is on the list, in their words.
- **Fitted to every symptom:** a candidate is held against everything that was observed before it is tested, and one that cannot explain a known fact is marked as such.
- **Kept current:** after each result the list is revised (struck, kept, added), and what was ruled out stays out, with what excluded it.
- **Assumptions questioned when stuck:** when every candidate is ruled out, what was taken as working (the code read is the code that runs, the failure is where it shows) becomes the next candidate.
- **Proportion:** where the message names the cause and a look confirms it, no list is drawn up.

## Undesirable

### Falls short

- **First story:** the first plausible explanation is taken as the cause, and the work goes on from it.
- **Tunnel:** results that speak against the favored cause are explained away.
- **Cannot be tested:** "something with timing" or "a problem in the cache layer" predicts nothing that could be looked for.
- **Usual suspect:** the cause is the one from last time, or the part trusted least, with nothing here that points to it.
- **Blamed outward:** the library, the compiler or the other team's service is suspected before your own code was looked at.
- **Same in kind:** all the candidates sit in one file, though nothing says the fault is there.
- **Untouchable assumption:** "that part works" is never made a candidate.
- **Returned from the dead:** a cause that was ruled out comes back with no new evidence.

### Overshoots

- **Laundry list:** a dozen possible causes are listed, none ranked and none tested.
- **Armchair:** explanations are argued at length where one run or one look would decide.
- **Exotic first:** a compiler fault or a rare race is pursued before the plain causes.
- **List for the obvious:** alternatives are produced where the stack trace names the empty value and the line.
- **Everything suspected:** nothing may be taken as working, so the search never narrows.
- **Still generating:** new candidates are raised after the cause has been shown.

### Counterfeits (looks met, is not)

- **Symptom restated:** "the cause is that the value is wrong" names the failure a second time.
- **Label as cause:** "a race condition", "a caching issue" or "flaky" is given as the explanation, with no mechanism.
- **Worded afterward:** the hypothesis is stated after the result, so that it was confirmed.
- **Elastic story:** the explanation is adjusted to each new result, and so is never wrong.
- **Straw rivals:** alternatives are listed to make the favorite look tested, and none was meant to be tried.
