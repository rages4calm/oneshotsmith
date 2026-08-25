# WebMCP in OneShotsmith

OneShotsmith registers eight [WebMCP](https://webmachinelearning.github.io/webmcp/)
tools so an AI agent running in the browser can drive the one-shot generator
directly — with typed parameters and structured returns — instead of guessing at
the DOM.

**The split that makes this work:** the agent brings language and taste. The page
brings correct 5e encounter math, a dungeon map whose numbered rooms *are* the
scenes, and exact reproducibility from a seed. Neither side can do the other's
job, and an agent cannot fake the page's half by scraping it.

---

## Prior work vs. work done for the WebMCP Challenge

OneShotsmith existed before the challenge. Everything below is the honest line
between what was already built and what was added with WebMCP during the
submission period (which opened **25 Aug 2026, 11:00 AM PT**).

**Added during the submission period — the WebMCP extension.**
Commit [`7ac9ec0`](https://github.com/rages4calm/oneshotsmith/commit/7ac9ec0),
authored **25 Aug 2026, 1:56 PM PT** (`2026-08-25T15:56:19-05:00`), +1,158 lines:

| File | New | Purpose |
|---|---|---|
| `apps/web/src/lib/webmcp.ts` | ✓ | Dual-surface detection and registration |
| `apps/web/src/lib/oneshot-tools.ts` | ✓ | The eight tool definitions |
| `apps/web/src/lib/oneshot-tools.test.ts` | ✓ | 12 tests for the tool surface |
| `apps/web/src/hooks/use-webmcp.ts` | ✓ | Registration lifecycle |
| `WEBMCP.md` | ✓ | This document |
| `apps/web/src/app/one-shot-generator/page.tsx` | modified | Controller + "agent tools live" indicator |
| `README.md`, `vitest.config.ts` | modified | Docs and test scope |

Later commits in the period add the deploy script and this demo-video pipeline.

**Prior work — everything before the period.** The generator engine, the six
theme packs, the SRD monster data and DMG encounter math, the procedural map
generator, the character creator, the vault, and the module/print design all
predate the challenge. The last pre-period commit is
[`a2047ce`](https://github.com/rages4calm/oneshotsmith/commit/a2047ce),
**18 Jul 2026** — over a month before the submission window opened. `git log`
shows the full history, and the gap between 18 Jul and 25 Aug is the boundary.

That prior work is exactly why the WebMCP layer is worth judging: the tools
expose a deterministic, rules-correct engine that an agent genuinely cannot
reproduce by scraping a page.

---

## The tools

Every tool mirrors a control the human can already reach. There is no shadow API
and no capability the UI lacks.

| Tool | Read-only | What it does |
|---|---|---|
| `generate_oneshot` | | Forges a complete module (theme, level 1–20, party 2–7, difficulty, session length, optional seed) and renders it on the page. |
| `reroll_section` | | Re-rolls exactly one part — villain, map, twist, treasure, scenes, hook, title, npcs, tables — and provably keeps the rest identical. |
| `adjust_party` | | Re-budgets every encounter for a different table without changing the story. |
| `get_current_module` | ✓ | Compact picture of what's on screen: villain and plan, scenes with encounter math, clues, twist. |
| `get_scene` | ✓ | Full detail for one numbered scene, matching the circled numbers on the map. |
| `list_themes` | ✓ | The six themes with one-line descriptions. |
| `share_link` | ✓ | The deterministic permalink for the current module. |
| `export_module` | | Opens the print dialog (module layout + player-map handout). The human completes it. |

### Design rules

1. **Tools mirror the UI.** Anything an agent can do, a human can do with a button.
2. **The page visibly updates.** Every mutating tool re-renders the module, rewrites
   the shareable URL, and flashes a line on screen saying what the agent just did.
3. **Returns are compact.** A summary plus a permalink — never the whole packet.
   Detail is pulled deliberately via `get_scene` / `get_current_module`.
4. **The human stays in control.** The agent proposes; the page renders; the human
   decides. Nothing is saved, sent, or printed without a visible tool call.
5. **Descriptions are the interface.** Each tool's description is written to teach an
   agent what the button does, in a DM's vocabulary.

---

## Implementation

| File | Role |
|---|---|
| `apps/web/src/lib/webmcp.ts` | Feature detection across both API surfaces, batch registration, error tolerance. |
| `apps/web/src/lib/oneshot-tools.ts` | The eight tool definitions. Pure — takes a controller, returns tool objects. Fully unit-tested. |
| `apps/web/src/hooks/use-webmcp.ts` | Registers once on mount, unregisters via `AbortController` on unmount. |
| `apps/web/src/app/one-shot-generator/page.tsx` | Supplies the live controller and renders the "agent tools live" indicator. |

### Two API surfaces

The spec puts the entry point on `document.modelContext` — the getter moved from
`Navigator` to `Document` in [webmcp#184](https://github.com/webmachinelearning/webmcp/pull/184),
on the reasoning that tools belong to a page rather than to the browser. Chrome's
origin trial currently ships `navigator.modelContext` (deprecated in Chrome 150),
and the official polyfill installs both.

So we feature-detect `document.modelContext` first and fall back to
`navigator.modelContext`. The same build works on the spec surface, the current
origin trial, and the polyfill.

### Staying registered exactly once

Registering a name that already exists rejects with `InvalidStateError`, and React
StrictMode double-invokes effects in development. Rather than re-register when
state changes, tools read page state through a ref that every render refreshes —
so they always act on current state while registration happens once. Cleanup
aborts the `AbortSignal`, which is the spec's mechanism for unregistering.

---

## Testing locally

### With a real WebMCP agent

1. Chrome 149+ with WebMCP enabled: `chrome://flags` → **Prompt API / WebMCP** →
   Enabled, then restart. (Or join the origin trial.)
2. Open `https://carl-prewitt.com/oneshot/one-shot-generator/`.
3. The commission panel shows **"8 agent tools live"** when a surface is detected.
4. Ask the agent: *"Make me a 3-hour haunting one-shot for four level-5 players,
   then keep the map but give me a different villain."*

ChatGPT's in-app browser and WebMCP-aware extensions expose the same tools.

### Without WebMCP (any browser)

The page exposes the exact same tool objects it registers as
`window.__oneshotsmithAgentTools` for local testing. It is the same array — not a
second API, and it grants nothing the buttons don't.

```js
const tools = window.__oneshotsmithAgentTools;
const call = (name, input = {}) =>
  tools.find((t) => t.name === name).execute(input, {});

await call("generate_oneshot", { theme: "Haunting", level: 5, partySize: 4, difficulty: "Hard" });
await call("reroll_section", { section: "villain" });   // watch the page: villain changes, map doesn't
await call("share_link");
```

### Automated

`pnpm test` covers the tool layer against the real generator with a fake
controller: registration shape, read-only annotations, input coercion, the
keeps-the-map guarantee, party re-budgeting, empty-state guards, and
JSON-serializability of every return.
