# Robustness

The result holds up in real use, not only in the use it was built for.

*Falls short:* it works as intended, and real use breaks it. *Overshoots:* it is protected against what cannot happen here.

Why: real use is never only the case the builder had in mind, and what breaks there is found by the people who rely on it.

**Desirable**

- **Edge cases:** the failures and unusual inputs that will occur are dealt with.
- **Trust boundary:** what comes from outside is checked where it enters.
- **Threat modeling:** where the result is exposed, who could misuse it and how was thought through.
- **Idempotency:** what may run twice gives the same result when it does.
- **Fail-safe:** when a part fails, the whole ends in a state that does no harm.
- **Graceful degradation:** when something it depends on fails, what does not need it keeps working.
- **Fail loudly:** an error shows where it happens.

**Undesirable**

- **Happy path:** only the main case is handled, and the rest is taken to work.
- **Race condition:** the result depends on which of two things happens first.
- **Fail open:** when a check cannot be made, the thing it guards is let through.
- **Silent failure:** an error is caught and dropped, or hidden behind a default.
- **Security theater:** a protection is added that looks safe and stops nothing.
