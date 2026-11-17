# Refactor: Target

The refactoring knows where it is going: what in the present structure stands in the way of the purpose is pointed to in the code, the shape aimed at is named before the code is touched, it is the smallest change of structure that serves the purpose, and at the end the thing it was for is easier.

*Falls short:* code moved about, and nothing easier for it. *Overshoots:* a structure built for needs nobody has.

*Borders:* what the refactoring is for belongs to framing; who chooses among shapes belongs to agency; whether the shape follows the project's own ways and uses what it already has belongs to grounding; the order and the size of the moves belong to increment; whether the shape was carried through everywhere belongs to completeness.

## Desirable

- **Obstacle pointed to:** what makes the purpose hard now is shown in the code (the two functions that must always change together, the condition repeated in six places, the module that knows the database), not named as a general fault.
- **Shape named first:** the structure aimed at is said in a few sentences or a small sketch before the first move: what will exist, what will be gone, and what will know of what.
- **Named by what it gives:** the target is tied to the purpose in a statement that can be checked: "after this, a new provider is one new file".
- **Smallest that serves:** of the shapes that would serve the purpose, the one that moves least is chosen, and leaving the code as it is is weighed where the gain is small.
- **More than one shape:** where the choice is not plain, two or three shapes are compared by what each makes easier and harder, the user's among them.
- **Along the lines of change:** the cut follows what changes together and what changes apart in this code, as its history and the waiting work show, not a pattern from a book.
- **Known moves:** the change is described in moves a reader knows (extract a function, move it, inline it, rename it, split a module), and a word is coined only where none fits.
- **What it costs:** what the new shape makes harder or longer (an indirection, more files, a longer way to follow a call) is said along with what it gives.
- **Names that say:** new and changed names say what the thing is or does, in the project's words and the user's.
- **No part without use:** every new part (a function, a class, a layer, a parameter) has a use now, in the code or in the work that waits.
- **Tried on the purpose:** before the target is settled, the waiting change is walked through against it: where it would go, and what it would touch.
- **Changed in the open:** when the code shows that the target does not hold (the parts do not come apart where expected), the target is changed with the user, and what was already moved is looked at again.
- **Reached, and seen:** at the end the purpose is held against the code: the waiting change is walked through, and it touches what the target said it would.
- **No gain said:** when the new shape turns out no better than the old, that is said, and taking it back is offered.
- **Stops when reached:** once the purpose is served the restructuring stops; further ideas are noted for the user, not carried out.
- **Proportion:** the target of one extraction is one line.

## Undesirable

### Falls short

- **Tidying by feel:** code is moved, split and renamed as it catches the eye, toward no stated shape.
- **Fault unnamed:** "this is messy" is the whole diagnosis, and nobody can point to what stands in the way.
- **Shuffle:** files and names have changed, and the waiting change touches as many places as before.
- **Different, not better:** one style is exchanged for another (loops for chained calls, classes for functions), and nothing is easier.
- **First shape taken:** the first structure that comes to mind is carried out, though a smaller move would have served.
- **Cut by length:** a long function is cut into pieces by size, and the pieces make sense only when read together.
- **Wrapped, not changed:** a new layer is put around the old structure, which stays as it was.
- **Shape by accident:** the final structure is whatever the moves happened to leave.
- **Purpose not tried:** nobody looks whether the waiting change became easier.

### Overshoots

- **Speculative generality:** an interface, a base class, a plug-in point or a setting is brought in for a second use that nobody has asked for.
- **Pattern for its own sake:** a named design pattern is applied where a function would do.
- **Redesign:** the refactoring turns into a new architecture for the module, where the purpose needed one extraction.
- **Shredded:** the code is cut into so many small parts that following one call means opening ten files.
- **Merged by force:** things that only look alike are made one, and the next change has to pull them apart again.
- **Drawn to the last name:** the target is worked out in every detail before the first move has shown whether the parts come apart.
- **Polishing past fit:** names and structure are reworked again after the purpose is served.

### Counterfeits (looks met, is not)

- **Hollow target:** "more modular" or "better separation of concerns" stands in for a shape that can be pointed to.
- **Target fitted afterward:** the shape that came out is described as the one that was aimed at.
- **Size as gain:** fewer lines or shorter functions are offered as the improvement, and the waiting change is no easier.
- **Indirection as separation:** two parts now meet through an interface, and still have to change together.
- **Renamed tangle:** the tangled function has a new name and a file of its own, and is as tangled as before.
- **Claimed ease:** "this will make the next step much easier" is said, and the step was never walked through.
