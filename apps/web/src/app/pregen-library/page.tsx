"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@oneshotsmith/ui";
import { Clipboard, FileDown, Sparkles } from "lucide-react";
import { pregeneratedCharacters } from "../../lib/pregenerated-characters";

export default function PregenLibraryPage() {
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleCopy = async (character: (typeof pregeneratedCharacters)[number]) => {
    try {
      const summary = [
        `${character.name} - Level ${character.level} ${character.role}`,
        character.concept,
        "",
        "Highlights:",
        ...character.highlights.map((item) => `- ${item}`),
      ].join("\n");

      await navigator.clipboard.writeText(summary);
      setFeedback(`Copied ${character.name} to clipboard.`);
      setTimeout(() => setFeedback(null), 4000);
    } catch (error) {
      console.error("Copy failed", error);
      setFeedback("Copy failed. Check browser permissions.");
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <header className="border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
          <Link href="/" prefetch={false} className="text-sm text-slate-400 hover:text-white transition self-start">
            {"<- Back to Dashboard"}
          </Link>
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-purple-300" aria-hidden="true" />
            <span className="text-3xl sm:text-4xl font-bold text-white">Pregen Library</span>
          </div>
          <p className="text-slate-300 text-lg max-w-3xl">
            Ready-to-run heroes to drop straight into your one-shot. Use them as NPCs, backup characters, or
            inspiration when players need a fast start.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {feedback && (
          <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-200 px-4 py-3 text-sm">
            {feedback}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pregeneratedCharacters.map((character) => (
            <Card key={character.name} className="border-slate-800 bg-slate-900/60 h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>{character.name}</span>
                  <span className="text-sm font-medium text-purple-300">
                    Level {character.level} | {character.role}
                  </span>
                </CardTitle>
                <CardDescription className="text-slate-300">{character.concept}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="space-y-2 text-sm text-slate-300">
                  <span className="uppercase tracking-wide text-xs text-slate-400">Highlights</span>
                  <ul className="list-disc list-inside space-y-1">
                    {character.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
                    onClick={() => handleCopy(character)}
                  >
                    Copy Summary
                    <Clipboard className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button variant="outline" className="w-full border-slate-700" asChild>
                    <Link
                      href={`/character-creator?level=${character.level}&role=${encodeURIComponent(character.role)}&pregen=${character.slug}`}
                      prefetch={false}
                    >
                      Open in Character Creator
                      <FileDown className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
