"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import {
  CHARACTER_STORAGE_KEY,
  formatCharacterSummary,
  readStoredCharacters,
  rememberLastLoadedCharacter,
  writeStoredCharacters,
  type StoredCharacter,
} from "../../lib/local-storage";
import { pregeneratedCharacters } from "../../lib/pregenerated-characters";
import {
  deleteAdventure,
  readSavedAdventures,
  type StoredAdventure,
} from "../../lib/adventure-storage";

// The vault: everything saved in this browser — heroes and adventures.

export default function CharacterVaultPage() {
  const router = useRouter();
  const [characters, setCharacters] = useState<StoredCharacter[]>([]);
  const [adventures, setAdventures] = useState<StoredAdventure[]>([]);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const flash = (message: string) => {
    setFeedback(message);
    setTimeout(() => setFeedback(null), 3000);
  };

  useEffect(() => {
    setCharacters(readStoredCharacters());
    setAdventures(readSavedAdventures());
    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key === CHARACTER_STORAGE_KEY) {
        setCharacters(readStoredCharacters());
      }
      if (e.key === null || e.key === "oneshotsmith:saved-adventures") {
        setAdventures(readSavedAdventures());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const openCharacter = (c: StoredCharacter) => {
    if (!c.id) return;
    rememberLastLoadedCharacter(c.id);
    router.push(`/character-creator?load=${c.id}`);
  };

  const startRename = (c: StoredCharacter) => {
    setRenamingId(c.id ?? null);
    setRenameValue(c.label ?? c.name);
  };

  const commitRename = () => {
    const value = renameValue.trim();
    if (!renamingId || !value) {
      setRenamingId(null);
      return;
    }
    const updated = characters.map((c) => (c.id === renamingId ? { ...c, label: value } : c));
    writeStoredCharacters(updated);
    setCharacters(updated);
    setRenamingId(null);
    flash("Renamed.");
  };

  const deleteCharacter = (id?: string) => {
    if (!id) return;
    const updated = characters.filter((c) => c.id !== id);
    writeStoredCharacters(updated);
    setCharacters(updated);
    flash("Removed from the vault.");
  };

  const copyCharacter = async (c: StoredCharacter) => {
    const pregen = c.pregenSlug ? pregeneratedCharacters.find((p) => p.slug === c.pregenSlug) : undefined;
    try {
      await navigator.clipboard.writeText(
        formatCharacterSummary(c, pregen ? { concept: pregen.concept, highlights: pregen.highlights } : undefined)
      );
      flash("Summary copied to clipboard.");
    } catch {
      flash("Couldn't reach the clipboard.");
    }
  };

  const exportCharacter = (c: StoredCharacter) => {
    const blob = new Blob([JSON.stringify(c, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(c.label ?? c.name).replace(/\s+/g, "_")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const removeAdventure = (id: string) => {
    setAdventures(deleteAdventure(id));
    flash("Adventure removed.");
  };

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <SiteHeader current="/character-vault" />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
        <h1 className="font-serif text-[2rem] font-bold">The Vault</h1>
        <p className="mt-1 max-w-[64ch] text-ink-soft">
          Heroes and adventures saved in this browser — no account, no cloud. Export
          anything you can&rsquo;t bear to lose.
        </p>

        <div aria-live="polite">
          {feedback && (
            <p className="mt-4 border-2 border-success bg-paper-shade px-3 py-2 font-serif text-sm italic text-success">{feedback}</p>
          )}
        </div>

        {/* ------------------------------------------------ Adventures */}
        <section aria-label="Saved adventures" className="mt-10">
          <div className="flex items-baseline justify-between">
            <h2 className="display-caps text-[0.95rem] font-bold tracking-[0.14em]">Saved adventures</h2>
            <Link href="/one-shot-generator" prefetch={false} className="display-caps text-[0.68rem] font-semibold text-map-deep underline underline-offset-4">
              Forge a new one
            </Link>
          </div>
          <hr className="module-rule mt-1.5" aria-hidden="true" />

          {adventures.length === 0 ? (
            <p className="mt-5 border border-rule bg-paper-shade px-4 py-5 text-center font-serif italic text-ink-soft">
              No adventures saved yet. Generate one and hit &ldquo;Save to vault&rdquo; — it will
              keep its exact seed, map, and math forever.
            </p>
          ) : (
            <ul className="mt-5 space-y-3">
              {adventures.map((a) => (
                <li key={a.id} className="flex flex-col justify-between gap-3 border-2 border-rule bg-paper px-4 py-3.5 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-serif text-[1.15rem] font-bold leading-tight">
                      {a.label}
                      <span className="display-caps ml-2 align-middle text-[0.6rem] font-semibold text-ink-soft">
                        Module {a.packet.moduleCode}
                      </span>
                    </p>
                    <p className="imprint mt-1">
                      {a.packet.input.theme} &middot; level {a.packet.input.level} &middot; {a.packet.input.partySize} players &middot; {a.packet.input.difficulty} &middot; seed {a.packet.input.seed}
                    </p>
                  </div>
                  <div className="flex flex-none gap-2">
                    <Link
                      href={`/one-shot-generator?load=${a.id}`}
                      prefetch={false}
                      className="display-caps border-2 border-map-deep bg-map-deep px-3.5 py-1.5 text-[0.65rem] font-bold tracking-[0.1em] text-map-line hover:border-map-blue hover:bg-map-blue"
                    >
                      Open
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeAdventure(a.id)}
                      className="display-caps border-2 border-rule bg-paper px-3.5 py-1.5 text-[0.65rem] font-bold tracking-[0.1em] text-ink-soft hover:border-stamp hover:text-stamp"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* ------------------------------------------------ Characters */}
        <section aria-label="Saved characters" className="mt-12">
          <div className="flex items-baseline justify-between">
            <h2 className="display-caps text-[0.95rem] font-bold tracking-[0.14em]">Saved heroes</h2>
            <Link href="/character-creator" prefetch={false} className="display-caps text-[0.68rem] font-semibold text-map-deep underline underline-offset-4">
              Create a hero
            </Link>
          </div>
          <hr className="module-rule mt-1.5" aria-hidden="true" />

          {characters.length === 0 ? (
            <p className="mt-5 border border-rule bg-paper-shade px-4 py-5 text-center font-serif italic text-ink-soft">
              The vault stands empty. Roll a hero in the{" "}
              <Link href="/character-creator" prefetch={false} className="text-map-deep underline underline-offset-2">creator</Link>{" "}
              or start from a{" "}
              <Link href="/pregen-library" prefetch={false} className="text-map-deep underline underline-offset-2">pregen</Link>.
            </p>
          ) : (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {characters.map((c) => (
                <article key={c.id} className="goldenrod-sheet flex flex-col p-4">
                  {renamingId === c.id ? (
                    <input
                      autoFocus
                      value={renameValue}
                      onChange={(e) => setRenameValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") commitRename();
                        if (e.key === "Escape") setRenamingId(null);
                      }}
                      onBlur={commitRename}
                      aria-label="New name"
                      className="border-2 border-gold-ink bg-goldenrod px-2 py-1 font-serif text-[1.15rem] font-bold text-gold-ink focus:outline-none"
                    />
                  ) : (
                    <h3 className="font-serif text-[1.2rem] font-bold leading-tight">{c.label ?? c.name}</h3>
                  )}
                  <p className="sheet-label mt-1">
                    Level {c.level} {c.race} {c.class} &middot; {c.role}
                    {c.source === "pregen" ? " · pregen" : ""}
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-1.5 text-center">
                    {[["AC", c.ac], ["HP", c.hp], ["Prof", `+${c.proficiencyBonus}`]].map(([label, v]) => (
                      <div key={String(label)} className="sheet-box px-1 py-1.5">
                        <p className="sheet-label">{label}</p>
                        <p className="font-display text-[1.1rem] font-bold leading-none">{v}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                    <button type="button" onClick={() => openCharacter(c)} className="display-caps border-2 border-gold-ink bg-gold-ink px-2.5 py-1 text-[0.6rem] font-bold tracking-[0.08em] text-goldenrod hover:opacity-85">
                      Open
                    </button>
                    <button type="button" onClick={() => startRename(c)} className="display-caps border-2 border-gold-ink px-2.5 py-1 text-[0.6rem] font-bold tracking-[0.08em] hover:bg-goldenrod-shade">
                      Rename
                    </button>
                    <button type="button" onClick={() => copyCharacter(c)} className="display-caps border-2 border-gold-ink px-2.5 py-1 text-[0.6rem] font-bold tracking-[0.08em] hover:bg-goldenrod-shade">
                      Copy
                    </button>
                    <button type="button" onClick={() => exportCharacter(c)} className="display-caps border-2 border-gold-ink px-2.5 py-1 text-[0.6rem] font-bold tracking-[0.08em] hover:bg-goldenrod-shade">
                      Export
                    </button>
                    <button type="button" onClick={() => deleteCharacter(c.id)} className="display-caps border-2 border-gold-ink px-2.5 py-1 text-[0.6rem] font-bold tracking-[0.08em] hover:border-stamp hover:text-stamp">
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
