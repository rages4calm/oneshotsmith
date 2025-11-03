"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@oneshotsmith/ui";
import {
  Clipboard,
  Download,
  FolderOpen,
  Pencil,
  Sparkles,
  Trash2,
} from "lucide-react";
import { formatCharacterSummary, readStoredCharacters, rememberLastLoadedCharacter, writeStoredCharacters, type StoredCharacter } from "../../lib/local-storage";
import { pregeneratedCharacters } from "../../lib/pregenerated-characters";
import { SiteFooter } from "../../components/site-footer";

interface EditingState {
  id: string;
  label: string;
}

export default function CharacterVaultPage() {
  const router = useRouter();
  const [characters, setCharacters] = useState<StoredCharacter[]>([]);
  const [editing, setEditing] = useState<EditingState | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    const load = () => setCharacters(readStoredCharacters());
    load();
    const handler = (event: StorageEvent) => {
      if (event.key === null || event.key === "oneshotsmith:saved-characters") {
        load();
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const totalByRole = useMemo(() => {
    return characters.reduce<Record<string, number>>((acc, entry) => {
      acc[entry.role] = (acc[entry.role] ?? 0) + 1;
      return acc;
    }, {});
  }, [characters]);

  const handleDelete = (id: string) => {
    const updated = characters.filter((entry) => entry.id !== id);
    writeStoredCharacters(updated);
    setCharacters(updated);
    if (updated.length === 0) {
      rememberLastLoadedCharacter(null);
    }
  };

  const handleRename = () => {
    if (!editing) return;
    const trimmed = editing.label.trim();
    if (trimmed.length === 0) {
      setFeedback({ type: "error", message: "Name cannot be empty." });
      return;
    }
    const updated = characters.map((entry) =>
      entry.id === editing.id ? { ...entry, label: trimmed } : entry
    );
    writeStoredCharacters(updated);
    setCharacters(updated);
    setEditing(null);
    setFeedback({ type: "success", message: "Name updated." });
    setTimeout(() => setFeedback(null), 2500);
  };

  const handleCopy = async (character: StoredCharacter) => {
    try {
      const pregen = character.pregenSlug
        ? pregeneratedCharacters.find((entry) => entry.slug === character.pregenSlug)
        : undefined;
      const summary = formatCharacterSummary(character, {
        concept: pregen?.concept,
        highlights: pregen?.highlights,
      });
      await navigator.clipboard.writeText(summary);
      setFeedback({ type: "success", message: "Summary copied to clipboard." });
      setTimeout(() => setFeedback(null), 3500);
    } catch (error) {
      console.error("Copy failed", error);
      setFeedback({ type: "error", message: "Copy failed. Check browser permissions." });
      setTimeout(() => setFeedback(null), 3500);
    }
  };

  const handleExport = (character: StoredCharacter) => {
    try {
      const blob = new Blob([JSON.stringify(character, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const filename = `${(character.label || character.name || "character").replace(/\s+/g, "_")}.json`;
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed", error);
      setFeedback({ type: "error", message: "Export failed. Try again." });
      setTimeout(() => setFeedback(null), 3500);
    }
  };

  const handleOpen = (id: string) => {
    rememberLastLoadedCharacter(id);
    router.push(`/character-creator?load=${encodeURIComponent(id)}`);
  };

  const handleClearAll = () => {
    writeStoredCharacters([]);
    setCharacters([]);
    rememberLastLoadedCharacter(null);
    setFeedback({ type: "success", message: "Vault cleared." });
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <header className="border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
          <Link href="/" prefetch={false} className="text-sm text-slate-400 hover:text-white transition self-start">
            ← Home
          </Link>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-purple-300" aria-hidden="true" />
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">Character Vault</h1>
                <p className="text-slate-300 text-sm mt-1">
                  Locally saved heroes ready for your next one-shot. Everything stays on this device.
                </p>
              </div>
            </div>
            {characters.length > 0 && (
              <Button
                variant="outline"
                onClick={handleClearAll}
                className="border-red-500/40 text-red-300 hover:border-red-400 hover:text-white"
              >
                <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" />
                Clear Vault
              </Button>
            )}
          </div>
          {characters.length > 0 && (
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wide text-slate-400">
              {Object.entries(totalByRole).map(([roleName, count]) => (
                <span key={roleName} className="rounded-full border border-slate-700 px-3 py-1">
                  {roleName}: {count}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        {feedback && (
          <div
            className={`rounded-lg border px-4 py-3 text-sm ${
              feedback.type === "success"
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
                : "border-red-500/40 bg-red-500/10 text-red-200"
            }`}
          >
            {feedback.message}
          </div>
        )}

        {characters.length === 0 ? (
          <Card className="border-slate-800 bg-slate-900/70 text-center py-16">
            <CardHeader>
              <CardTitle className="text-2xl text-white">No heroes yet</CardTitle>
              <CardDescription className="text-slate-300">
                Save a character from the creator or import one to see it here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                <Link href="/character-creator" prefetch={false}>
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500">
                    Create a Character
                  </Button>
                </Link>
                <Link href="/pregen-library" prefetch={false}>
                  <Button size="lg" variant="outline" className="border-slate-700 bg-slate-900/60 text-slate-200 hover:border-purple-500 hover:text-white">
                    Browse Pregens
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {characters.map((character) => {
              const pregen = character.pregenSlug
                ? pregeneratedCharacters.find((entry) => entry.slug === character.pregenSlug)
                : undefined;
              const isEditing = editing?.id === character.id;
              return (
                <Card key={character.id} className="border-slate-800 bg-slate-900/60 flex flex-col">
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        {isEditing ? (
                          <input
                            value={editing?.label ?? ""}
                            onChange={(event) => setEditing({ id: character.id, label: event.target.value })}
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                event.preventDefault();
                                handleRename();
                              }
                              if (event.key === "Escape") {
                                event.preventDefault();
                                setEditing(null);
                              }
                            }}
                            className="w-full rounded-lg bg-slate-900 border border-purple-400/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            autoFocus
                          />
                        ) : (
                          <CardTitle className="text-2xl text-white">{character.label || character.name}</CardTitle>
                        )}
                        <CardDescription className="text-slate-300">
                          Level {character.level} {character.race} {character.class}
                        </CardDescription>
                      </div>
                      <span className="rounded-full border border-purple-500/40 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-200">
                        {character.role}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Saved {new Date(character.savedAt).toLocaleString()}</span>
                      {character.source && (
                        <span className="uppercase tracking-wide text-slate-400">
                          {character.source === "pregen" ? "Pregen" : "Custom"}
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2 text-sm text-slate-300">
                      <p className="text-slate-200">
                        HP {character.hp} | AC {character.ac} | Proficiency +{character.proficiencyBonus}
                      </p>
                      <div className="flex flex-wrap gap-1.5 text-xs">
                        {Object.entries(character.abilities).map(([ability, score]) => (
                          <span
                            key={ability}
                            className="rounded-full border border-slate-700 bg-slate-900/60 px-2 py-1 text-slate-300"
                          >
                            {ability}: {score}
                          </span>
                        ))}
                      </div>
                      {pregen && (
                        <div className="rounded-lg border border-purple-500/30 bg-purple-900/10 p-3">
                          <p className="text-xs uppercase tracking-wide text-purple-300 mb-1">Pregen Concept</p>
                          <p className="text-xs text-slate-200">{pregen.concept}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
                        onClick={() => handleOpen(character.id)}
                      >
                        <FolderOpen className="mr-2 h-4 w-4" aria-hidden="true" />
                        Open in Creator
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() =>
                          isEditing ? handleRename() : setEditing({ id: character.id, label: character.label || character.name })
                        }
                        className="border-slate-700 bg-slate-900/70 text-slate-200 hover:border-purple-500 hover:text-white"
                      >
                        <Pencil className="mr-2 h-4 w-4" aria-hidden="true" />
                        {isEditing ? "Save" : "Rename"}
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => handleDelete(character.id)}
                        className="text-red-300 hover:text-white hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => handleCopy(character)}
                        className="bg-slate-900/60 border border-blue-500/40 text-blue-200 hover:border-blue-400 hover:text-white"
                      >
                        <Clipboard className="mr-2 h-4 w-4" aria-hidden="true" />
                        Copy
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleExport(character)}
                        className="bg-slate-900/60 border border-slate-700 text-slate-200 hover:border-purple-500 hover:text-white"
                      >
                        <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                        Export
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
