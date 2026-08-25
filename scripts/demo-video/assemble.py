"""Assemble the final demo video.

  narration segments + gaps  ->  voice track
  + original ambient bed (synthesised here; no third-party audio, per the
    contest rule against copyrighted music)
  + the Playwright screen recording
  -> H.264 MP4, loudness-normalised to -14 LUFS (YouTube's target)

Usage:  python assemble.py [--no-ambience]
"""
import json
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).parent
AUDIO = HERE / "audio"
WORK = HERE / "work"
WORK.mkdir(exist_ok=True)
OUT = HERE / "oneshotsmith-webmcp-demo.mp4"

TITLE_CARD_S = 3.5      # must match TITLE_MS in record.mjs
AMBIENCE = "--no-ambience" not in sys.argv


def run(args):
    subprocess.run(args, check=True, capture_output=True)


def probe(path):
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=nw=1:nk=1", str(path)],
        capture_output=True, text=True, check=True,
    )
    return float(out.stdout.strip())


def main():
    timings = json.loads((HERE / "timings.json").read_text(encoding="utf-8"))
    video_in = next((HERE / "raw-video").glob("*.webm"))
    video_len = probe(video_in)
    print(f"video: {video_len:.2f}s")

    # ---- 1. voice track: lead-in silence, then each line padded by its gap
    parts = []
    lead = WORK / "lead.wav"
    run(["ffmpeg", "-y", "-f", "lavfi", "-i",
         f"anullsrc=r=48000:cl=stereo:d={TITLE_CARD_S}", str(lead)])
    parts.append(lead)

    for seg in timings:
        src = AUDIO / seg["file"]
        padded = WORK / f"p_{seg['id']}.wav"
        run(["ffmpeg", "-y", "-i", str(src),
             "-af", f"apad=pad_dur={seg['gap']},aresample=48000",
             "-ac", "2", "-ar", "48000", str(padded)])
        parts.append(padded)

    listfile = WORK / "concat.txt"
    listfile.write_text(
        "\n".join(f"file '{p.as_posix()}'" for p in parts), encoding="utf-8"
    )
    voice = WORK / "voice.wav"
    run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(listfile),
         "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "2", str(voice)])
    voice_len = probe(voice)
    print(f"voice: {voice_len:.2f}s (narration ends {voice_len:.1f}s in)")

    # ---- 2. original ambient bed: filtered brown noise + a faint low sine.
    # Synthesised from scratch here, so there is no third-party audio anywhere
    # in the submission.
    if AMBIENCE:
        bed = WORK / "bed.wav"
        run(["ffmpeg", "-y",
             "-f", "lavfi", "-i", f"anoisesrc=d={video_len}:c=brown:r=48000:a=0.30",
             "-f", "lavfi", "-i", f"sine=frequency=110:duration={video_len}:r=48000",
             "-filter_complex",
             "[0:a]lowpass=f=340,highpass=f=45[n];"
             "[1:a]volume=0.05[s];"
             "[n][s]amix=inputs=2:duration=first,"
             "afade=t=in:st=0:d=2.5,"
             f"afade=t=out:st={max(0, video_len - 3.5):.2f}:d=3.5,"
             "volume=0.055,aformat=channel_layouts=stereo",
             "-ar", "48000", str(bed)])
        mixed = WORK / "mixed.wav"
        # The bed is already exactly video_len, which is longer than the voice
        # track, so duration=longest lands on the video length. Do NOT apad the
        # voice here: apad without an explicit duration pads forever, and with
        # duration=longest that writes until the disk fills.
        run(["ffmpeg", "-y", "-i", str(voice), "-i", str(bed),
             "-filter_complex",
             "[0:a][1:a]amix=inputs=2:duration=longest:normalize=0[a]",
             "-map", "[a]", "-t", f"{video_len:.3f}",
             "-ar", "48000", "-ac", "2", str(mixed)])
        track = mixed
    else:
        track = voice

    track_len = probe(track)
    print(f"track: {track_len:.2f}s")
    if track_len > video_len + 1:
        raise SystemExit(f"audio ({track_len:.1f}s) longer than video ({video_len:.1f}s) — aborting")

    # ---- 3. normalise to YouTube's -14 LUFS target
    final_audio = WORK / "final.wav"
    run(["ffmpeg", "-y", "-i", str(track),
         "-af", "loudnorm=I=-14:TP=-1.5:LRA=11",
         "-ar", "48000", "-ac", "2", str(final_audio)])

    # ---- 4. mux and encode
    run(["ffmpeg", "-y", "-i", str(video_in), "-i", str(final_audio),
         "-map", "0:v:0", "-map", "1:a:0",
         "-c:v", "libx264", "-preset", "slow", "-crf", "18",
         "-pix_fmt", "yuv420p", "-r", "30",
         "-c:a", "aac", "-b:a", "192k",
         "-shortest", "-movflags", "+faststart", str(OUT)])

    out_len = probe(OUT)
    size_mb = OUT.stat().st_size / 1e6
    mins, secs = divmod(out_len, 60)
    print(f"\n{OUT.name}: {int(mins)}m {secs:.1f}s, {size_mb:.1f} MB")
    if out_len >= 180:
        print("!! OVER the 3-minute limit")
    else:
        print(f"   {180 - out_len:.0f}s under the 3-minute limit")


if __name__ == "__main__":
    main()
