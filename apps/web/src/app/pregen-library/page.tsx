"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { pregeneratedCharacters } from "../../lib/pregenerated-characters";

export default function PregenLibraryPage() {
  const [feedback, setFeedback] = useState<string | null>(null);

  const copySummary = async (slug: string) => {
    const p = pregeneratedCharacters.find((x) => x.slug === slug);
    if (!p) return;
    const text = [
      `${p.name} — Level ${p.level} ${p.role}`,
      "",
      p.concept,
      "",
      ...p.highlights.map((h) => `- ${h}`),
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setFeedback(`${p.name} copied to clipboard.`);
    } catch {
      setFeedback("Couldn't reach the clipboard.");
    }
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <SiteHeader current="/pregen-library" />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
        <h1 className="font-serif text-[2rem] font-bold">The Pregen Library</h1>
        <p className="mt-1 max-w-[64ch] text-ink-soft">
          Ready-made heroes with a concept, a voice, and a job. Open one in the
          creator to roll their full sheet — then make them yours: players who rename
          a pregen fight harder for them. It&rsquo;s science.
        </p>

        <div aria-live="polite">
          {feedback && (
            <p className="mt-4 border-2 border-success bg-paper-shade px-3 py-2 font-serif text-sm italic text-success">{feedback}</p>
          )}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pregeneratedCharacters.map((p) => (
            <article key={p.slug} className="goldenrod-sheet flex flex-col p-4">
              <div className="flex items-baseline justify-between gap-2">
                <p className="sheet-label">Pregenerated hero</p>
                <p className="sheet-label">Lv {p.level}</p>
              </div>
              <h2 className="mt-1.5 font-serif text-[1.25rem] font-bold leading-tight">{p.name}</h2>
              <p className="sheet-label mt-1">{p.role}</p>
              <p className="mt-3 font-serif text-[0.95rem] italic leading-relaxed">{p.concept}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-[0.88rem] leading-snug">
                {p.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <div className="mt-auto flex gap-2 pt-4">
                <Link
                  href={`/character-creator?level=${p.level}&role=${encodeURIComponent(p.role)}&pregen=${p.slug}`}
                  prefetch={false}
                  className="display-caps border-2 border-gold-ink bg-gold-ink px-3 py-1.5 text-[0.62rem] font-bold tracking-[0.08em] text-goldenrod hover:opacity-85"
                >
                  Open in creator
                </Link>
                <button
                  type="button"
                  onClick={() => copySummary(p.slug)}
                  className="display-caps border-2 border-gold-ink px-3 py-1.5 text-[0.62rem] font-bold tracking-[0.08em] hover:bg-goldenrod-shade"
                >
                  Copy summary
                </button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center font-serif italic text-ink-soft">
          Want a table&rsquo;s worth in one go? Roll five in the{" "}
          <Link href="/character-creator" prefetch={false} className="text-map-deep underline underline-offset-2">
            creator
          </Link>{" "}
          — each takes about ten seconds.
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
