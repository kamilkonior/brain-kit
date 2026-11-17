# Spike: Containment

The spike stays apart from the work and harms nothing: it is built where it cannot be taken for the work, what it installs, writes and starts stays out of the project and away from anything real unless the user gave their word, and what it set up is cleared away when it ends.

*Falls short:* the spike mixed into the work, or harm done outside it. *Overshoots:* isolation and caution that cost more than the spike.

*Borders:* who gives the word for touching anything real or spending money belongs to agency; agreeing what the spike may touch belongs to framing; how real the conditions have to be belongs to realism, and containment says how that is made safe; what becomes of the spike's own code belongs to disposal; saying what state the workspace is left in belongs to return.

## Desirable

- **Place of its own:** the spike is written where it cannot be taken for the work and will not be committed with it (a scratch directory outside the tree, a worktree, a branch of its own), as agreed.
- **The user's work kept:** uncommitted changes, untracked files and the branch the user is on are not overwritten, discarded, stashed away or switched from.
- **Project files left alone:** the project's dependency file and lock file, its configuration and its schema are not changed for the spike; what the spike needs is installed in the spike's own place.
- **Work read, not edited:** where the spike needs the project's code it calls it or copies it; where the question is a change to that code, the change is made in a worktree or a copy.
- **Out of the project's checks:** the spike is not picked up by the project's build, its tests or its linter.
- **Effects known before a run:** before the spike is run, what running it does (writes, sends, charges, installs, deletes) is known.
- **Real systems on the user's word:** live and shared systems, real accounts and services that charge are used only on the user's word, each time, and against a test instance where there is one.
- **Spending capped:** where a run costs money, the amount is estimated beforehand and a cap is set.
- **Real data guarded:** real data is read, not written, a copy or a sample is taken where that tells the same, and personal data does not go into the spike's output, the conversation or an outside service.
- **Secrets stay out:** keys and tokens are passed in from the environment, and are not written into the spike's files or the conversation.
- **Package looked at:** before a package is installed for the spike, its name, its source and what it is are checked.
- **Listed as made:** what the spike creates outside its own place (an account, a cloud resource, a table, a global install) is noted when it is made.
- **Cleared away:** when the spike ends, processes are stopped, resources and containers are removed, installs outside the spike's place are undone, and the workspace is compared with how it was found.
- **Commands understood:** a command is run when its effect here is known; options that force, recurse or skip checks are used knowingly, each time.
- **Proportion:** caution follows what a mistake would cost and whether it can be undone; a script that reads one file needs none.

## Undesirable

### Falls short

- **In the tree:** the spike's files lie among the sources, show in the status and go into the next commit.
- **Dependency slipped in:** a package is added to the project's dependency file "to try it", and stays.
- **Lost work:** a checkout or a stash made for the spike wipes changes the user had not committed.
- **Tried on the live system:** the spike runs against the production database, or the account that customers use.
- **Open bill:** a service that charges is called in a loop, with no cap.
- **Schema changed:** the shared development database is migrated for the spike, and not put back.
- **Leaked secret:** a key is written into the scratch file, and the file is pasted or committed.
- **Unknown package:** a package with a name close to the one meant is installed unread.
- **Litter:** servers, containers, cloud resources and global installs stay behind.

### Overshoots

- **Isolation ceremony:** a container, a worktree and a fresh environment are set up for ten lines that import nothing.
- **Permission for every run:** the user is asked before each run of a script that touches nothing.
- **Frozen:** the spike is not run against the service's test instance, though the question is about that service.
- **Copy of everything:** the repository and the database are cloned in order to try one function.
- **Rehearsal for everything:** each run is first tried somewhere else.

### Counterfeits (looks met, is not)

- **"Cleaned up":** this is said, and the status of the tree still shows the spike's files.
- **Scratch in the tree:** the scratch directory lies inside the repository, and nothing keeps it out of a commit.
- **Hidden, not apart:** the spike is kept out of sight by an ignore rule added to the project, which is itself a change to the project.
- **Test in name:** the key called "test" points at the live account.
- **Branch as wall:** the spike is on a branch of its own, and its migration ran on the database all branches share.
- **Stash as safety:** the user's changes are in a stash that nobody mentioned.
- **Scrubbed late:** a secret is taken out of a later message and stays in the earlier one, or in the history.
