"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { Character, CharacterLevel, Role } from "@oneshotsmith/core";
import { generateCharacter, randomSeed } from "@oneshotsmith/core";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import {
  formatCharacterSummary,
  readLastLoadedCharacter,
  readStoredCharacters,
  rememberLastLoadedCharacter,
  writeStoredCharacters,
  type StoredCharacter,
} from "../../lib/local-storage";
import { pregeneratedCharacters, type PregenSummary } from "../../lib/pregenerated-characters";

const ROLES: Array<{ role: Role; pitch: string; playsLike: string }> = [
  { role: "Frontliner", pitch: "Stand in the doorway. Be the doorway.", playsLike: "Fighter — armor, sword, and the word 'no.'" },
  { role: "Skirmisher", pitch: "Be where they aren't looking.", playsLike: "Rogue — daggers, shadows, decisive moments." },
  { role: "Support", pitch: "Nobody dies today. You've decided.", playsLike: "Cleric — healing, blessings, divine backup." },
  { role: "Control", pitch: "Rewrite the battlefield's rules.", playsLike: "Wizard — fireballs, walls, better ideas." },
  { role: "Face", pitch: "Talk first. Talk during. Talk after.", playsLike: "Bard — charm, inspiration, one good song." },
];

const LEVELS: Array<{ level: CharacterLevel; label: string; note: string }> = [
  { level: 3, label: "Level 3", note: "The classic one-shot start — capable, not complicated" },
  { level: 5, label: "Level 5", note: "The power spike — extra attacks and fireballs" },
  { level: 8, label: "Level 8", note: "Seasoned heroes for a heavyweight session" },
];

const TABLE_TIPS: Record<Role, string[]> = {
  Frontliner: ["Position first, attack second — stand where enemies must pass you.", "Announce Second Wind out loud when you're hurt; it reminds the healer you exist.", "Action Surge is for the round that decides the fight, not the first one."],
  Skirmisher: ["Your bonus action is a whole second character — spend it every turn.", "You want advantage: flank, hide, or ask the Face to make a distraction.", "Uncanny Dodge is a reaction — save it for the biggest hit, not the first."],
  Support: ["Healing Word is a bonus action at range — you can still do a thing on your turn.", "A downed ally needs 1 hit point to stand up. Efficiency is mercy.", "Turn Undead doesn't ask permission. Use it the moment skeletons outnumber friends."],
  Control: ["One good concentration spell shapes the whole fight — protect it.", "Ask the DM what you can see before you commit the fireball.", "Your job isn't damage, it's making the enemy's plan impossible."],
  Face: ["Bardic Inspiration before the roll, not after — hand it out early and often.", "In social scenes, state what you want, then roll. Never roll first.", "Vicious Mockery is a debuff wearing a joke as a hat."],
};

function CreatorInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(1);
  const [level, setLevel] = useState<CharacterLevel>(3);
  const [role, setRole] = useState<Role | null>(null);
  const [character, setCharacter] = useState<Character | null>(null);
  const [selectedPregen, setSelectedPregen] = useState<PregenSummary | null>(null);
  const [activeCharacterId, setActiveCharacterId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [appliedLoadId, setAppliedLoadId] = useState<string | null>(null);
  const [appliedPregenSlug, setAppliedPregenSlug] = useState<string | null>(null);

  const flash = (message: string) => {
    setFeedback(message);
    setTimeout(() => setFeedback(null), 3000);
  };

  // Restore a saved character (?load=id, or the last one opened).
  useEffect(() => {
    const loadId = searchParams.get("load") ?? readLastLoadedCharacter();
    if (!loadId || appliedLoadId === loadId) return;
    const stored = readStoredCharacters().find((c) => c.id === loadId);
    if (!stored) return;
    // Strip the storage-only fields; what remains is the Character.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, pregenSlug, savedAt, label, source, ...rest } = stored;
    setCharacter(rest as Character);
    setLevel(stored.level as CharacterLevel);
    setRole(stored.role as Role);
    setActiveCharacterId(id ?? null);
    setSelectedPregen(pregenSlug ? pregeneratedCharacters.find((p) => p.slug === pregenSlug) ?? null : null);
    setAppliedLoadId(loadId);
    setStep(3);
  }, [searchParams, appliedLoadId]);

  // Start from a pregen concept (?pregen=slug).
  useEffect(() => {
    const slug = searchParams.get("pregen");
    if (!slug || appliedPregenSlug === slug || searchParams.get("load")) return;
    const pregen = pregeneratedCharacters.find((p) => p.slug === slug);
    if (!pregen) return;
    const fresh = generateCharacter({ level: pregen.level as CharacterLevel, role: pregen.role as Role, seed: randomSeed() });
    setCharacter(fresh);
    setLevel(pregen.level as CharacterLevel);
    setRole(pregen.role as Role);
    setSelectedPregen(pregen);
    setActiveCharacterId(null);
    setAppliedPregenSlug(slug);
    setStep(3);
  }, [searchParams, appliedPregenSlug]);

  const handleGenerate = (r: Role) => {
    setRole(r);
    const fresh = generateCharacter({ level, role: r, seed: randomSeed() });
    setCharacter(fresh);
    setSelectedPregen(null);
    setActiveCharacterId(null);
    setStep(3);
  };

  const rerollCharacter = () => {
    if (!role) return;
    const fresh = generateCharacter({ level, role, seed: randomSeed() });
    setCharacter(fresh);
    setActiveCharacterId(null);
  };

  const handleSave = () => {
    if (!character || !role) return;
    try {
      const id = activeCharacterId ?? crypto.randomUUID();
      const record: StoredCharacter = {
        ...character,
        id,
        savedAt: new Date().toISOString(),
        label: character.name || `${role} Level ${level}`,
        source: selectedPregen ? "pregen" : "generated",
        pregenSlug: selectedPregen?.slug,
      };
      const existing = readStoredCharacters().filter((c) => c.id !== id);
      writeStoredCharacters([record, ...existing].slice(0, 50));
      rememberLastLoadedCharacter(id);
      setActiveCharacterId(id);
      flash("Saved to your vault (stored in this browser).");
    } catch {
      flash("Save failed — browser storage may be disabled.");
    }
  };

  const handleCopy = async () => {
    if (!character) return;
    try {
      await navigator.clipboard.writeText(
        formatCharacterSummary(character, selectedPregen ? { concept: selectedPregen.concept, highlights: selectedPregen.highlights } : undefined)
      );
      flash("Character summary copied to clipboard.");
    } catch {
      flash("Couldn't reach the clipboard.");
    }
  };

  const handleReset = () => {
    setStep(1);
    setRole(null);
    setCharacter(null);
    setSelectedPregen(null);
    setActiveCharacterId(null);
    setAppliedLoadId(null);
    setAppliedPregenSlug(null);
    rememberLastLoadedCharacter(null);
    router.replace("/character-creator");
  };

  const mod = (score: number) => {
    const m = Math.floor((score - 10) / 2);
    return m >= 0 ? `+${m}` : `${m}`;
  };

  return (
    <div className="chrome flex min-h-screen flex-col bg-room">
      <SiteHeader current="/character-creator" />

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6">
        {/* Stepper */}
        <nav aria-label="Progress" className="no-print flex items-center justify-center gap-2">
          {["Level", "Role", "Sheet"].map((label, i) => {
            const n = i + 1;
            const active = step === n;
            const done = step > n;
            return (
              <div key={label} className="flex items-center gap-2">
                <span
                  className={`key-circle !h-8 !w-8 text-[0.85rem] ${
                    active ? "!border-brass !bg-brass !text-room" : done ? "!border-brass !text-brass" : "!border-room-edge !text-warm-soft"
                  }`}
                >
                  {n}
                </span>
                <span className={`display-caps text-[0.68rem] font-semibold ${active ? "text-warm" : "text-warm-soft"}`}>{label}</span>
                {n < 3 && <span className="mx-1 h-px w-8 bg-room-edge" aria-hidden="true" />}
              </div>
            );
          })}
        </nav>

        {/* Step 1: level */}
        {step === 1 && (
          <section className="mt-10">
            <h1 className="text-center font-serif text-[1.9rem] font-bold text-warm">How seasoned is your hero?</h1>
            <p className="mt-2 text-center text-warm-soft">Match the level your DM asked for. When in doubt: 3.</p>
            <div className="mx-auto mt-8 grid max-w-2xl gap-3">
              {LEVELS.map((l) => (
                <button
                  key={l.level}
                  type="button"
                  onClick={() => { setLevel(l.level); setStep(2); }}
                  className={`flex flex-col items-baseline justify-between gap-1 border-2 px-5 py-4 text-left transition-colors hover:border-brass sm:flex-row sm:gap-4 ${level === l.level ? "border-brass" : "border-room-edge"}`}
                >
                  <span className="display-caps text-[0.9rem] font-bold tracking-[0.1em] text-warm">{l.label}</span>
                  <span className="font-serif italic text-warm-soft">{l.note}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Step 2: role */}
        {step === 2 && (
          <section className="mt-10">
            <h1 className="text-center font-serif text-[1.9rem] font-bold text-warm">Pick what sounds fun</h1>
            <p className="mt-2 text-center text-warm-soft">
              Roles, not rulebooks — each one is a complete, legal level-{level} build.
            </p>
            <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
              {ROLES.map((r) => (
                <button
                  key={r.role}
                  type="button"
                  onClick={() => handleGenerate(r.role)}
                  className="border-2 border-room-edge px-5 py-4 text-left transition-colors hover:border-brass"
                >
                  <span className="display-caps block text-[0.8rem] font-bold tracking-[0.12em] text-brass">{r.role}</span>
                  <span className="mt-1 block font-serif text-[1.05rem] italic text-warm">{r.pitch}</span>
                  <span className="mt-1 block text-[0.85rem] text-warm-soft">{r.playsLike}</span>
                </button>
              ))}
            </div>
            <p className="mt-6 text-center">
              <button type="button" onClick={() => setStep(1)} className="display-caps text-[0.7rem] font-semibold text-warm-soft underline underline-offset-4 hover:text-brass">
                Back to level
              </button>
            </p>
          </section>
        )}

        {/* Step 3: the goldenrod sheet */}
        {step === 3 && character && (
          <section className="mt-8">
            <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => window.print()} className="btn-ember px-4 py-2 text-[0.7rem]">
                  Print sheet
                </button>
                <button type="button" onClick={handleSave} className="btn-lantern px-4 py-2 text-[0.7rem]">
                  Save to vault
                </button>
                <button type="button" onClick={handleCopy} className="btn-lantern px-4 py-2 text-[0.7rem]">
                  Copy summary
                </button>
                <button type="button" onClick={rerollCharacter} className="btn-lantern px-4 py-2 text-[0.7rem]">
                  Re-roll hero
                </button>
              </div>
              <button type="button" onClick={handleReset} className="display-caps text-[0.68rem] font-semibold text-warm-soft underline underline-offset-4 hover:text-brass">
                Start over
              </button>
            </div>

            <div aria-live="polite">
              {feedback && (
                <p className="no-print mb-3 border border-success bg-room-raised px-3 py-2 font-serif text-sm italic text-[color:var(--success-bright)]">{feedback}</p>
              )}
            </div>

            <div className="goldenrod-sheet module-sheet artifact p-5 sm:p-7">
              <div className="flex items-baseline justify-between">
                <p className="sheet-label">Character record sheet</p>
                <p className="sheet-label">OneShotsmith &middot; 5E</p>
              </div>

              <h1 className="mt-3 font-serif text-[2rem] font-bold leading-tight">{character.name}</h1>
              <p className="sheet-label mt-1">
                Level {character.level} {character.race} {character.class} &middot; {character.background} &middot; {character.role}
              </p>

              <div className="mt-5 grid grid-cols-3 gap-2 text-center sm:grid-cols-6">
                {(Object.entries(character.abilities) as Array<[string, number]>).map(([ab, score]) => (
                  <div key={ab} className="sheet-box px-1 py-2.5">
                    <p className="sheet-label">{ab}</p>
                    <p className="font-display text-[1.5rem] font-bold leading-none">{score}</p>
                    <p className="mt-0.5 font-display text-[0.85rem]">{mod(score)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-2.5 grid grid-cols-3 gap-2 text-center">
                {[["Armor Class", character.ac], ["Hit Points", character.hp], ["Proficiency", `+${character.proficiencyBonus}`]].map(([label, v]) => (
                  <div key={String(label)} className="sheet-box px-1 py-2.5">
                    <p className="sheet-label">{label}</p>
                    <p className="font-display text-[1.5rem] font-bold leading-none">{v}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div className="sheet-box p-3.5">
                  <p className="sheet-label">Skills</p>
                  <p className="mt-1.5 text-[0.95rem]">{character.skills.join(" · ")}</p>
                  <p className="sheet-label mt-4">Features</p>
                  <ul className="mt-1.5 list-disc pl-5 text-[0.95rem]">
                    {character.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                  <p className="sheet-label mt-4">Equipment</p>
                  <ul className="mt-1.5 list-disc pl-5 text-[0.95rem]">
                    {character.equipment.map((e) => <li key={e}>{e}</li>)}
                  </ul>
                  {character.spells && character.spells.length > 0 && (
                    <>
                      <p className="sheet-label mt-4">Spells</p>
                      <p className="mt-1.5 text-[0.95rem]">{character.spells.join(", ")}</p>
                    </>
                  )}
                </div>

                <div className="space-y-5">
                  <div className="sheet-box p-3.5">
                    <p className="sheet-label">On your turn (tactics)</p>
                    <ul className="mt-1.5 list-disc pl-5 text-[0.95rem]">
                      {character.tactics.map((t) => <li key={t}>{t}</li>)}
                    </ul>
                  </div>
                  <div className="sheet-box p-3.5">
                    <p className="sheet-label">Who you are</p>
                    {character.trait && <p className="mt-1.5 text-[0.95rem]"><strong>Trait.</strong> {character.trait}</p>}
                    {character.bond && <p className="mt-1.5 text-[0.95rem]"><strong>Bond.</strong> {character.bond}</p>}
                    {character.flaw && <p className="mt-1.5 text-[0.95rem]"><strong>Flaw.</strong> {character.flaw}</p>}
                    {character.trinket && <p className="mt-1.5 text-[0.95rem]"><strong>Trinket.</strong> You carry {character.trinket}.</p>}
                  </div>
                  {selectedPregen && (
                    <div className="sheet-box p-3.5">
                      <p className="sheet-label">Concept &middot; {selectedPregen.name}</p>
                      <p className="mt-1.5 text-[0.95rem] italic">{selectedPregen.concept}</p>
                      <ul className="mt-1.5 list-disc pl-5 text-[0.9rem]">
                        {selectedPregen.highlights.map((h) => <li key={h}>{h}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {role && (
              <div className="no-print mt-6 border border-room-edge bg-room-raised p-5">
                <p className="display-caps text-[0.75rem] font-bold tracking-[0.14em] text-brass">First time playing a {role}?</p>
                <ul className="mt-2.5 list-disc space-y-1.5 pl-5 text-[0.95rem]">
                  {TABLE_TIPS[role].map((tip) => <li key={tip}>{tip}</li>)}
                </ul>
                <p className="mt-3 text-[0.9rem] text-warm-soft">
                  Need an adventure to go with them?{" "}
                  <Link href="/one-shot-generator" prefetch={false} className="text-brass underline underline-offset-2">
                    Forge a one-shot
                  </Link>{" "}
                  at the same level.
                </p>
              </div>
            )}
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

export default function CharacterCreatorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper" />}>
      <CreatorInner />
    </Suspense>
  );
}
