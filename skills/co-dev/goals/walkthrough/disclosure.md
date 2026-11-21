# Walkthrough: Disclosure

The user knows what was decided without them: the calls made on their behalf in the plan and the build, the departures from the design and the plan, and what was added, dropped or left open are in front of them, each with what it means for them, who decided and why, the weightiest first.

*Falls short:* decisions the user finds later, or never. *Overshoots:* every small call of the builder put up for judgment.

*Borders:* whether a call stands is the user's under agency, and its sorting belongs to verdict; what evidence stands behind the work belongs to verification; weak points that are nobody's decision belong to candor; whether a statement about the code is true belongs to grounding.

## Desirable

- **Collected from the records:** the calls and departures noted in the plan's record, the design's amendments and the history are gathered in one place.
- **Found by comparison:** the design is gone through decision by decision and the plan step by step against the code, and what differs without having been recorded is found.
- **Silence filled:** where the design and the plan were silent and the code had to choose something the user will feel (a default, a limit, what happens on failure, a wording), the choice is disclosed.
- **Added and dropped:** behavior in the code that nobody decided, and anything decided that is not in the code or is there only as a stand-in, is disclosed.
- **New commitments:** a new dependency, cost, permission, stored data or interface that others will rely on is disclosed, with what it binds the user to.
- **Earlier stages too:** calls the user delegated in the design and the plan, and will feel in the result, are disclosed along with the builder's.
- **In their terms:** each disclosure says what the user now gets and does not get, not only what the code does.
- **Who and why:** each comes with who decided, when, and the reason as recorded; where no reason was recorded, that is said.
- **Known apart from new:** what the user decided or was told during the build is kept apart from what they hear now for the first time; the first gets a line, the second the room.
- **Weightiest first:** disclosures are ordered by what they cost the user and how hard they are to undo, and the small calls of implementation are passed as a batch.
- **Still theirs to decide:** each disclosure says whether the call can still be changed and at what cost, and the user lets it stand or makes it a point.
- **Late disclosure owned:** a call that should have gone to the user when it was made is named as that.
- **Where it will be noticed:** a disclosure is made at the part it concerns and again in one gathered list, not in a clause.
- **Limits of the search:** where a comparison could not be made (no written design, a record with gaps), the user is told that undisclosed calls may remain, and where they would most likely be.
- **Recorded once sorted:** a departure found now is written into the plan or the design after the user has sorted it, as found at the walkthrough, with what they decided.

## Undesirable

### Falls short

- **Undisclosed call:** a choice the user will feel is in the code, and the walkthrough passes over it.
- **Record trusted:** only the departures the record lists are told, and the code was never compared with the design.
- **Found by using:** the user learns of a changed behavior when they first run into it.
- **Mechanism only:** "the cache was replaced with a queue" is said, and what that changes for the user is not.
- **Reason missing:** a departure is reported with no word on why, or on who made the call.
- **Stowaway unmentioned:** an option, an endpoint or a behavior nobody decided is shown as part of the work.
- **Stand-in unmentioned:** a stub or fixed data stands where the design asked for the real thing, and the walkthrough does not say so.
- **"Implementation detail":** a choice that changes what the user gets is passed with the internal ones.

### Overshoots

- **Everything a decision:** every name, helper and file layout is put before the user as a call to judge.
- **Settled reopened:** what the user decided themselves during the build is laid out again for judgment.
- **Confession flood:** so many small calls are disclosed that the three that matter cannot be found.
- **Defense attached:** each disclosure comes with a long case for why it was right.
- **Alarm:** a renamed file is disclosed with the weight of a dropped feature.

### Counterfeits (looks met, is not)

- **Buried disclosure:** the call is mentioned in a clause, mid-paragraph, in the longest portion.
- **Euphemism:** "streamlined" or "simplified" is said of a feature that was dropped.
- **Told as settled:** the call is disclosed with no word that the user can still decide otherwise.
- **"As agreed":** a call that was never put to the user is disclosed as theirs, or as "we decided".
- **Technically mentioned:** the call is named in terms the user cannot weigh.
- **Decoy disclosures:** small calls are disclosed with ceremony, and the large one is absent.
- **Record fitted:** the plan or the design is edited to match the code, and the departure disappears before the user has seen it.
