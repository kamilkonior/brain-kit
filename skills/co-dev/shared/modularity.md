# Modularity

Complexity is absorbed behind clean boundaries rather than spread across the system: each part hides real work behind a small interface, and changes stay local.

*Falls short:* complexity leaks across boundaries: interfaces expose internals, small changes ripple widely, and callers carry knowledge or knobs they should not need. *Overshoots:* the system is broken into thin wrappers or speculative layers that add indirection without hiding real complexity.

Why: complexity compounds with every change, and every leak or hollow layer taxes everyone who works on the system afterwards.

**Desirable**

- **Deep module:** a module hides substantial functionality behind a small, clear interface.
- **Information hiding:** each module encapsulates a design decision so nothing outside depends on it, and nothing is exposed or configurable that callers do not need.
- **Pull complexity downwards:** implementation complexity is absorbed inside the module, with sensible defaults, rather than pushed onto callers as extra steps or configuration knobs.
- **High cohesion, low coupling:** what shares knowledge or changes for the same reason lives together; what changes independently sits behind a thin boundary.
- **Different layer, different abstraction:** each layer presents a distinct concept from the one below it rather than forwarding calls under another name.
- **Functional core, imperative shell:** decision logic is kept pure and self-contained, separated from I/O, state and side effects at the edges.
- **Occam's razor:** no more boundaries, layers or moving parts than the problem requires.

**Undesirable**

- **Shallow module:** an interface is nearly as complex as its implementation, adding indirection without hiding real work.
- **Pass-through:** a layer, wrapper or parameter exists only to forward calls or data onward without adding abstraction.
- **Over-engineering:** structure or generality is added that the job does not need.
- **Information leakage:** the same design decision or internal knowledge is reflected in multiple places, coupling them silently.
- **Temporal decomposition:** structure follows the order steps run in time rather than the knowledge each part owns, spreading the same internals across every step.
- **Change amplification:** a simple logical change forces edits across many unrelated places.
- **Leaky abstraction:** callers must know or work around how an abstraction is implemented in order to use it safely.
- **Complecting:** unrelated concerns are braided together so neither can be understood, tested or changed alone.
