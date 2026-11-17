# Spike: Focus

The spike builds what the question turns on, and nothing else: the part in doubt is built first and for real, what it needs around it is faked, fixed by hand or left out, and of the spikes that could answer, the cheapest is run.

*Falls short:* a small version of the whole thing, with the question somewhere in it. *Overshoots:* a spike cut down so far that the part in doubt is no longer in it.

*Borders:* what the question is belongs to framing; how well the code is made belongs to roughness; how close to the real conditions the part that is built has to be belongs to realism; when the spike ends belongs to limit; telling the user what was faked belongs to shared understanding.

## Desirable

- **Part in doubt named:** before the code it is said which part of the real thing the answer depends on, and which parts are known to work and need no spike.
- **Doubt first:** the part in doubt is the first thing built, before the set-up, the shell and the parts around it.
- **Cheapest that could answer:** of the spikes that could answer the question, the cheapest is run: a line at the prompt before a script, a script before a service, a static page before a working screen.
- **Rest faked:** what the part needs around it (input, storage, a login, another service) is pasted in, fixed by hand or replaced by a stand-in.
- **Stand-ins noted:** each stand-in is noted when it is made, so that it can be named with the answer.
- **Stands alone:** the spike is joined to the project's code only where the joining is the question; otherwise it stands by itself.
- **Thin thread:** where the doubt is whether the parts work together, one case is taken through all of them, each as thin as it can be.
- **Rivals alike:** where the question is which of several ways is better, each is built to the same thinness and for the same case.
- **What exists is used:** the library's own example, a playground or a function of the project is started from, where that reaches the part in doubt sooner than writing it.
- **By hand once:** a step that a person can do by hand for the one run is not automated.
- **Nothing for later:** nothing is built on the ground that the real thing will need it.
- **Side question parked:** something that would be good to know and is not the question is noted in a line, not built.
- **Cut again:** after each result it is decided anew what the next run must contain, and what has already answered is not built further.
- **Proportion:** a question that one call answers gets one call.

## Undesirable

### Falls short

- **Small product:** a question about the parser gets an upload form, storage and a results page.
- **Easy parts first:** the shell and the parts that were never in doubt are built, and the part in doubt comes last, or not at all.
- **Scaffolding first:** a project is set up, with folders, configuration and a build, before a line touches the question.
- **Built for later:** "we will need it anyway" puts a part into the spike that the answer does not depend on.
- **Crept features:** options, a second input format and a nicer output are added on the way.
- **Automated once:** a script is written for a step that was needed for a single run.
- **Side question built:** the interesting thing beside the question gets a spike of its own, unasked.

### Overshoots

- **Doubt cut out:** the stand-in sits where the question is: the spike of the import fakes the file it was to read.
- **Thinner than the question:** the spike answers a smaller question ("it can draw a table") than the one that was asked ("it can draw our report").
- **Join faked:** the parts are each shown to work, and the doubt was whether they work together.
- **Thought in place of a run:** the spike is cut down to an argument, where the question was what happens when it runs.
- **One of the rivals:** only one of the ways in question is built, and it is judged against the other from memory.

### Counterfeits (looks met, is not)

- **Runs, and asks nothing:** the spike exercises what was never in doubt, and its running is taken as the answer.
- **Example as spike:** the library's own example is run on the library's own data, and that is reported as the user's case.
- **Stand-in that answers:** the result comes from the stand-in: the fixed value is the one the part in doubt was to produce.
- **"Minimal":** the spike is called minimal, and has a configuration file and three modules.
- **Easier question answered:** what was built is the spike that was easy to build, not the one the question needed.
