# Demo video pipeline

Rebuilds the WebMCP Challenge demo video end to end. The footage is a real
recording of the **live site** being driven by the **real WebMCP tools** — not a
slideshow, and not a mock-up of an agent UI. The tool-call panel on screen shows
the actual call and its actual return value.

```bash
python tts.py edge      # 1. voiceover + timings.json
node record.mjs         # 2. record the take against the live site
python assemble.py      # 3. mux, normalise, encode -> oneshotsmith-webmcp-demo.mp4
```

Requires `ffmpeg`, Python with `edge-tts`, and the repo's Playwright install.

## How it stays in sync

The voiceover is generated *first* and measured, then `record.mjs` reads
`timings.json` and paces every beat to its narration segment. Video and audio
line up by construction rather than by hand-editing.

## Choices worth knowing

- **Voice:** `en-IE-ConnorNeural` via `edge-tts` — free, no API key, and
  deliberately not the ubiquitous US voice in every AI demo. Swap it in
  `tts.py`. A `chatterbox` engine path is also wired up for local GPU
  synthesis (Resemble AI's MIT-licensed model, which has an emotion control)
  if you want a still more distinctive read.
- **Audio:** loudness-normalised to **−14 LUFS**, YouTube's target, peaking at
  −1.5 dB. The ambient bed is synthesised from scratch in `assemble.py`
  (filtered noise plus a faint low sine), so there is **no third-party audio**
  anywhere in the video — the challenge rules forbid copyrighted music.
  Run `python assemble.py --no-ambience` for voice only.
- **Length:** the script prints the runtime and warns if it approaches the
  three-minute limit. Current cut: **2m 13s**.
- **Attribution:** the end card carries the SRD 5.1 CC BY 4.0 notice and the
  non-affiliation disclaimer.

## Gotcha, recorded so it isn't repeated

`apad` with no duration pads **forever**. Combined with `amix=duration=longest`
it will happily write until the disk is full (it reached 363 GB here before it
was caught). The ambient bed is already exactly the video length, so no padding
is needed, and `assemble.py` now also asserts the audio is not longer than the
video before encoding.
