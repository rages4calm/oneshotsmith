# OneShotsmith

**Complete D&D 5e one-shot adventures, forged from a seed — map, math, and story in one click.**

OneShotsmith generates a full, runnable adventure module in your browser: a keyed
dungeon map in the classic blue style, encounters built on the real DMG XP math, a
villain with a plan, boxed read-aloud text, NPCs with voices, a secrets checklist,
treasure, pacing — formatted like a proper early-80s adventure module and
print-perfect out of the box. The whole app is set at the game table after dark:
lamplit paper artifacts in a warm black room, with the blue map glowing at the
center of it. No accounts. No server. No AI API. Free forever.

**Every adventure is deterministic.** The seed lives in the URL, so a module can be
shared, bookmarked, or posted like a link to a song — same seed, same adventure,
forever.

![OneShotsmith landing page — a live generated module lying in lamplight](docs/screenshots/landing.png)

---

## Why this exists

The tools DMs actually use each solve a quarter of the problem: map generators have
no story, story generators have no maps, encounter builders have no plot, and AI
tools can't do the math. OneShotsmith does all four at once, coherently — the
numbered rooms on the map *are* the scenes in the text, and the fights in those
scenes are budgeted for your exact party.

## What a generated module contains

Every module ships the full anatomy of a professionally written one-shot:

- **A synopsis for the GM** — what's really going on, twist included
- **A strong-start hook** with boxed read-aloud text, plus fallbacks for reluctant parties
- **A keyed site map** — procedurally generated, drawn white-on-blue like the classic
  modules, with a player-safe version that prints as a separate handout
- **4–6 scenes** matched to your session length, each with read-aloud text, DM notes,
  and a decision or lever — never just description
- **Encounters with honest math** — 2014 DMG XP thresholds and multipliers for your
  exact party size and level, monster stat lines inline (SRD 5.1), and Sly Flourish's
  Lazy Encounter Benchmark as a second opinion that flags the edge cases XP math misses
- **A villain with a motivation, plan, secret, and mannerism** — and a stat block
- **Three cast NPCs** with appearance, mannerism, voice cue, want, and secret
- **Eight secrets & clues** to reveal wherever the players look (Lazy DM style)
- **A twist**, treasure parcels, and a signature magic item with a history
- **Scaling advice** for weaker/stronger tables, a session clock, a cut list for
  running behind, and theme-specific random tables

![A generated Haunting module — The Nursery Remembers](docs/screenshots/module.png)

## Features

| | |
|---|---|
| **Six themes** | Dungeon Crawl, Heist, Rescue, Haunting, Wilderness, Mystery — each a deep, hand-written content system, not a mad-lib |
| **Real knobs** | Level 1–20, party size 2–7, four difficulties, 2/3/4-hour session length (the structure actually changes) |
| **Surgical re-rolls** | New villain, same map. New twist, same everything else. Every section has its own dice, and re-rolls stay in the shareable URL |
| **Shareable seeds** | The whole adventure derives from the URL — share it, bookmark it, post it |
| **Print-perfect** | Print/PDF produces a real module: boxed text, keyed entries, stat tables, and the player-map handout on its own page |
| **Markdown export** | One click copies the entire module as clean Markdown for Obsidian, Notion, or your prep doc |
| **Local vault** | Save adventures and characters in your browser — rename, reopen, export JSON |
| **Character creator** | Pick a role and level, get a complete legal 5e character on a goldenrod-style record sheet with tactics that tell you what to do on your turn |
| **Pregen library** | Ready-made heroes with concepts, voices, and jobs |

![The goldenrod character record sheet](docs/screenshots/character-sheet.png)

## Quick start

```bash
git clone https://github.com/rages4calm/oneshotsmith.git
cd oneshotsmith
pnpm install
pnpm dev            # web app on http://localhost:3000
```

Build a static export (deploys anywhere — it's just files):

```bash
pnpm build          # output in apps/web/out
```

Run the test suite (determinism, DMG math, map integrity):

```bash
pnpm test
```

## How the generation works

Everything derives from a seed string through independent, per-section RNG streams
(`hash(seed + section + nonce)`), which is what makes surgical re-rolls possible:
bumping the villain's nonce regenerates the villain — and every sentence that
mentions them — without touching the map, the title, or the treasure.

- `packages/core/src/data/themes/` — six theme packs: sites, hooks, villains,
  twists, clue pools, scene templates, complications (~3,000 lines of original,
  playable content)
- `packages/core/src/data/monsters.ts` — 80+ SRD 5.1 monsters with CR, XP, and
  stat lines, tagged for theme palettes
- `packages/core/src/data/encounter-math.ts` — the 2014 DMG thresholds and
  multipliers, the 2024 revised budgets, adventuring-day XP, and the Lazy Benchmark
- `packages/core/src/generators/oneshot.ts` — assembles the module: scene
  structure by session length, encounter building against the party budget, clue
  distribution, pacing
- `packages/core/src/generators/dungeon-map.ts` — procedural site maps (room
  placement, corridor MST with loops, doors, features), rendered as SVG in the
  classic blue style

## Project structure

```
apps/
  web/                  Next.js 15 app (static export — no server required)
packages/
  core/                 The engine: generators, theme packs, SRD data, math
  ui/                   Shared UI primitives
  adapters/, db/        Scaffolding for future VTT export / sync (unused at runtime)
```

## Legal

- **Code:** MIT License
- **Game content:** This work includes material from the System Reference Document
  5.1 ("SRD 5.1") by Wizards of the Coast LLC, available at
  https://www.dndbeyond.com/srd. The SRD 5.1 is licensed under the Creative Commons
  Attribution 4.0 International License. OneShotsmith is an independent product and
  is not affiliated with Wizards of the Coast.
- All adventure prose, names, and theme content are original.

## Roadmap

- Universal VTT export (`.uvtt` walls/doors/lighting for Foundry, Roll20, Arkenforge)
- A "run mode" initiative tracker preloaded with the module's monsters
- Pregen party pack matched to the generated adventure's hooks
- 2024 rules toggle surfaced in the UI (the math already ships in the engine)

---

Built by [Carl Prewitt Jr](https://github.com/rages4calm). If OneShotsmith saved
your game night, a star helps other DMs find it.
