# Design

The visual system is a replica of early-1980s TSR adventure-module print production: white interior paper, black ink, the cyan-blue dungeon map, and the goldenrod character sheet. It is deliberately NOT parchment-fantasy (the category reflex) and NOT dark-dungeon (the previous design).

## Theme

Light only. The artifact is paper; the physical scene (a DM prepping at a lit table, printing handouts) forces it. No dark mode, no toggle.

## Color

Strategy: **Committed** — TSR map blue carries the identity (hero cover panel, map surfaces, section bands, rules/borders in the module output). Paper stays achromatic so print stays true.

| Token | Value | Use |
|---|---|---|
| `--paper` | `oklch(0.985 0.003 90)` (≈ #FBFAF7) | body background — true off-white, near-zero chroma |
| `--ink` | `oklch(0.24 0.01 260)` (≈ #23262B) | body text, rules |
| `--ink-soft` | `oklch(0.42 0.015 260)` | secondary text (≥4.5:1 on paper) |
| `--map-blue` | `oklch(0.52 0.10 245)` (≈ #33689E) | THE identity color: map field, links, primary UI |
| `--map-blue-deep` | `oklch(0.38 0.09 250)` (≈ #1E4A78) | map shadows, hover, footer band |
| `--map-grid` | `oklch(0.62 0.08 245)` | grid lines on the blue field |
| `--map-line` | `oklch(0.97 0.01 245)` | white linework on the blue field |
| `--goldenrod` | `oklch(0.82 0.11 90)` (≈ #E3C078) | character-sheet artifact surfaces only |
| `--goldenrod-ink` | `oklch(0.35 0.06 70)` (≈ #5C4520) | ink on goldenrod |
| `--stamp-red` | `oklch(0.50 0.16 30)` (≈ #A93B2A) | sparing: module-code chip, destructive, "Deadly" |
| `--paper-shade` | `oklch(0.955 0.004 90)` | alternate section fill, table stripes |

Rules: red ≤5% of any screen. Goldenrod appears only on character-sheet artifacts. Success/error states use standard accessible green/red, muted to print-ink tones.

## Typography

- **Display / trade dress: Jost** (Google's Futura descendant — the literal genre of TSR module-cover lettering). Uppercase, tracked +0.06–0.12em, weights 500–700. Used for: module codes, cover titles, nav, buttons, table headers, keyed-entry labels.
- **Body / adventure text: Alegreya** (bookish oldstyle serif, superb italics). Used for: all prose, read-aloud boxes (italic), stat blocks, flavor. Body 17–18px/1.65, max 70ch.
- Pairing axis: geometric sans vs humanist serif — genuine contrast, both off the reflex-reject list.
- Small caps via Alegreya SC only inside module output (scene openers, stat block names).
- No mono anywhere (ledger: IBM Plex Mono exhausted; nothing here is code).

## Signature graphic language (all derived from the source material)

1. **The blue map.** Procedurally generated dungeon maps as SVG: `--map-blue` field, lighter grid, white room outlines, hatched door ticks, numbered key circles, compass rose, scale bar. Appears as the landing hero's cover art (regenerable) and in every generated module.
2. **Module trade dress.** Double-rule borders (3px + 1px), module code chips (e.g. `OS1`), "AN ADVENTURE FOR 4–6 CHARACTERS OF LEVEL 5" subtitle lines, ©-style footer lines.
3. **Boxed read-aloud text.** The classic bordered box: 2px ink border, `--paper-shade` fill, Alegreya italic, "Read aloud" label.
4. **Keyed entries.** Circled numbers (map key style) linking scenes ↔ map rooms. This is real product grammar — only used where a true key exists.
5. **Goldenrod sheet.** Character sheets render on `--goldenrod` with `--goldenrod-ink` ruled boxes, replicating the 1980 sheet.

## Layout

- Landing: centered module-cover replica hero (framed object), then alternating paper/blue-band sections. No copy-left/visual-right grid (ledger-banned), no card-grid-of-three-icons.
- Module output: single column on screen ≤768px, **two-column module layout** ≥1024px, print-perfect via `@media print` (Letter, 0.5in margins, blue map prints in color, everything else ink-on-white).
- Radius: 2px max on paper elements (print artifacts have square corners); UI controls 4px. No pills except key circles (true circles).
- Borders do the work shadows would: 1px ink-tinted rules; shadows only for genuine elevation (sticky bars, dialogs) and subtle.

## Motion

Restrained, product register: 150–250ms ease-out state changes. Two signature moments only:
1. Map regeneration: rooms stamp in sequentially (~40ms stagger, opacity+scale from 0.96), corridors appear between — discrete stamping, not line-drawing (ledger bans animated line-draw hero).
2. Generate button: d20 glyph settles on a face. Both become instant under `prefers-reduced-motion`.
No scroll-driven choreography, no fade-up-on-scroll sections (ledger-exhausted).
