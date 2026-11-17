# Explain: Completeness

The understanding covers what the decision or the change needs: every part of the question is answered, the exceptions and the paths beside the main one that bear on it are in, and what was left out, made simpler or not found out is named.

*Falls short:* the main path explained, and the part that would bite left out. *Overshoots:* everything that is true of the subject.

*Borders:* what the question and the extent are belongs to framing; what follows for the decision belongs to bearing; whether what is said of a part rests on a reading of it belongs to grounding; how much reaches the user at once belongs to economy; whether the user took it in belongs to verification; where what stays open is written belongs to return.

## Desirable

- **Needs listed:** what the decision or the change needs the user to know is drawn from the frame at the start, so that no part can drop out unnoticed.
- **Every part answered:** each part of the user's question, and each question raised on the way, is answered or named as open.
- **Exceptions that bite:** the special cases, the failure paths and the variants by setting that bear on the decision are in the account.
- **Other ways in:** the second caller, the batch job, the migration and the script that reach the same code or data are looked for and named.
- **More than the code:** the data, the configuration, the deployment and the scheduled jobs are in the account where the subject cannot be understood without them.
- **Hard part included:** the part that is hard to read gets explained, and is not passed with "then some processing happens".
- **Whole change:** a change is accounted for in all its parts (the migration, the configuration, the tests, what was deleted), each explained or named.
- **Made simpler, and said:** where the account is simpler than the subject, that is said, with what was left out and when it would matter.
- **Left out named:** what belongs to the subject and was not explained is named in a line, so that the user knows it is there.
- **Not found out named:** what could not be established is told as plainly as what was.
- **Where the pattern breaks:** when the user will act on a pattern (this is how a provider is added), the places that depart from it are named.
- **Found on the way:** a fault, a wrong document or a departure from the design met while reading is noted for the user in a line, and neither chased nor left unsaid.
- **Final check:** before the explanation is called done it is compared with the frame (the question, the extent, the end point), and you say what was compared and what was not.
- **Bounded by need:** what goes in follows what the decision needs; what is true of the subject and bears on nothing stays out.

## Undesirable

### Falls short

- **Main path only:** the usual case is explained, and the path taken on failure, where the user's change will sit, is not.
- **The part that bites:** the one exception that decides the matter is missing from the account.
- **Half the question:** "how does it work, and can I remove it?" gets an answer to its first half.
- **Hard part skipped:** the plain parts are told in detail, and the tangled one in a clause.
- **Code only:** the function is explained, and the setting that switches it off in production is not mentioned.
- **Silent simplification:** the account is simpler than the code, and nothing says so.
- **Silent omission:** a part was not read and is not mentioned.
- **Dropped thread:** a question the user asked in the middle is never come back to.
- **Premature "that's it":** the explanation is declared done because the session ran long.

### Overshoots

- **Everything true:** all that can be said of the subject is said, and what the decision turns on is somewhere in it.
- **Every branch:** each special case is explained, though the user's change passes none of them.
- **Tangent:** an interesting corner of the code gets an account of its own.
- **Spreading:** the explanation of a function becomes one of the module, and then of the system.
- **Nothing may stay open:** the explanation is held back for a detail that changes no decision.
- **Qualified to death:** every sentence carries its exceptions, and the main line can no longer be seen.

### Counterfeits (looks met, is not)

- **"And so on":** "it handles validation, logging, etc." stands in for parts nobody looked at.
- **Mention as coverage:** "there are some edge cases" is written, and none is named.
- **"Roughly":** this word is all that marks a simplification, with nothing on what it leaves out.
- **Coverage by length:** a long account is taken for a whole one.
- **Catch-all warning:** "be careful when changing this" stands in for the rule nobody found.
- **Claimed check:** "that covers everything you need" is said without the comparison with the frame having been made.
