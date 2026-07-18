# Product

## Register

product

(The landing page is treated in brand register per-task; the generator, creator, and vault surfaces are product register.)

## Users

Dungeon Masters and players of D&D 5e. Two contexts:

1. **The Thursday-night DM.** It's 6:40pm, the session is at 7:30, and they have nothing prepped. They need a complete, runnable adventure — scenes, encounters with correct math, NPCs, a map, treasure — and they need to either print it or run it off a laptop at the table.
2. **The new or busy player.** Invited to a one-shot, has never built a character or doesn't want to spend an hour on it. Needs a legal, playable, printable character sheet in minutes.

Both are at a kitchen table or desk under normal room light, often with a printer involved. The tool must read like paper and print like paper.

## Product Purpose

OneShotsmith generates complete, table-ready D&D 5e one-shot adventures and characters entirely in the browser — no accounts, no server, no AI API. Success = a DM runs a generated module tonight and a stranger stars the repo because the output looks like a real published module, not a form dump.

## Brand Personality

**Ready-to-run. Print-true. Old-school.** The voice of a 1981 TSR adventure module: confident imperative DM-to-DM prose ("Read this aloud:", "If the party fails…"), module codes, keyed entries. Never corporate SaaS voice, never "unleash your epic adventure" fantasy-kitsch.

## Anti-references

- The 2023 AI landing page: dark slate + purple/blue gradient text + glow blobs (this app's own previous design — the thing being replaced).
- Generic fantasy-kitsch: parchment textures, dragon clip-art, medieval display fonts, brown-leather UI.
- D&D Beyond's dark marketing chrome; Roll20's utilitarian gray.
- Form-dump generators (donjon): powerful but reads like a database record, not an adventure.

## Design Principles

1. **The output is the brand.** The generated module IS the marketing. The landing page shows a real generated artifact, not screenshots of claims.
2. **Print is a first-class surface.** Every artifact (module, character sheet) must look intentional on paper. White paper, black ink, one accent — like the source material.
3. **Module trade dress, not fantasy costume.** Identity comes from the specific graphic language of early-80s TSR print: the blue-and-white dungeon map, module codes, boxed read-aloud text, keyed entries, goldenrod character sheets — not from generic "medieval" styling.
4. **Real rules, real math.** Encounter XP budgets, CR, ability modifiers — correct per the SRD. Trust is the feature.
5. **Zero friction.** No accounts, no loading theater, no fake delays. Everything is deterministic from a shareable seed.

## Accessibility & Inclusion

WCAG 2.1 AA: body text ≥4.5:1 on paper-white; interactive states visible without color alone; full keyboard operability for the generator flow; `prefers-reduced-motion` honored (map stamp-in and dice roll become instant). Print stylesheets must not rely on background color for meaning.
