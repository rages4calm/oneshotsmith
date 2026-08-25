"""Generate the voiceover, one file per narration segment, and measure it.

Engines:
  edge        -- Microsoft neural voices via edge-tts. Free, no key, instant.
                 Voice: en-IE-ConnorNeural (Irish male) -- deliberately not the
                 ubiquitous US voice every AI demo uses.
  chatterbox  -- Resemble AI Chatterbox (MIT, 0.5B, local GPU). Beat ElevenLabs
                 in blind preference tests; has an exaggeration/emotion control.
"""
import asyncio
import json
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).parent
OUT = HERE / "audio"
OUT.mkdir(exist_ok=True)

VOICE = "en-IE-ConnorNeural"
RATE = "-6%"      # a touch slower: storyteller, not announcer
PITCH = "-2Hz"

# Chatterbox reads at ~175 wpm regardless of cfg_weight, which is brisk for
# narration. atempo slows it without touching pitch; 0.92 lands near 160 wpm.
CHATTERBOX_TEMPO = 0.92

# Silence padding after each line so beats can breathe, and so the video has
# room to show what the tool call just did (seconds).
GAP_AFTER = {
    "01_cold_open": 1.2,
    "02_what_it_is": 1.0,
    "03_webmcp": 1.0,
    "04_generate": 2.2,
    "05_reroll": 2.6,
    "06_adjust": 2.0,
    "07_scene": 1.6,
    "08_print": 1.8,
    "09_permalink": 1.8,
    "10_close": 1.6,
}


def duration(path: Path) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=nw=1:nk=1", str(path)],
        capture_output=True, text=True, check=True,
    )
    return float(out.stdout.strip())


async def synth_edge(segments):
    import edge_tts
    for seg in segments:
        target = OUT / f"{seg['id']}.mp3"
        communicate = edge_tts.Communicate(seg["text"], VOICE, rate=RATE, pitch=PITCH)
        await communicate.save(str(target))
        print(f"  {seg['id']}: {duration(target):.2f}s")


def synth_chatterbox(segments):
    import torch
    import soundfile as sf
    from chatterbox.tts import ChatterboxTTS

    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"  loading Chatterbox on {device}...")
    model = ChatterboxTTS.from_pretrained(device=device)
    for seg in segments:
        target = OUT / f"{seg['id']}.wav"
        wav = model.generate(
            seg["text"],
            exaggeration=0.45,   # measured, not theatrical
            cfg_weight=0.4,      # slower, more deliberate delivery
            temperature=0.7,
        )
        # torchaudio.save now routes through TorchCodec; soundfile keeps this
        # independent of whichever audio backend torchaudio ships this month.
        raw = OUT / f"_raw_{seg['id']}.wav"
        sf.write(str(raw), wav.squeeze(0).detach().cpu().numpy(), model.sr)
        subprocess.run(
            ["ffmpeg", "-y", "-i", str(raw), "-af", f"atempo={CHATTERBOX_TEMPO}",
             "-ar", "48000", str(target)],
            check=True, capture_output=True,
        )
        raw.unlink()
        print(f"  {seg['id']}: {duration(target):.2f}s")


def main():
    engine = sys.argv[1] if len(sys.argv) > 1 else "edge"
    segments = json.loads((HERE / "narration.json").read_text(encoding="utf-8"))["segments"]

    print(f"synthesising {len(segments)} segments with '{engine}'")
    if engine == "chatterbox":
        synth_chatterbox(segments)
        ext = "wav"
    else:
        asyncio.run(synth_edge(segments))
        ext = "mp3"

    timings = []
    total = 0.0
    for seg in segments:
        path = OUT / f"{seg['id']}.{ext}"
        speech = duration(path)
        gap = GAP_AFTER.get(seg["id"], 0.7)
        timings.append({
            "id": seg["id"],
            "file": path.name,
            "speech": round(speech, 3),
            "gap": gap,
            "duration": round(speech + gap, 3),
        })
        total += speech + gap

    (HERE / "timings.json").write_text(json.dumps(timings, indent=2), encoding="utf-8")
    mins, secs = divmod(total, 60)
    print(f"\ntotal runtime: {int(mins)}m {secs:.1f}s  ({total:.1f}s)")
    if total > 175:
        print("!! over the 3-minute limit with no headroom -- trim the script")
    else:
        print(f"   {180 - total:.0f}s under the 3-minute cap")


if __name__ == "__main__":
    main()
