"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  Difficulty,
  OneShotInput,
  OneShotPacket,
  OneShotTheme,
  RerollSection,
  TimeBox,
} from "@oneshotsmith/core";
import { ALL_THEMES, generateOneShot, randomSeed } from "@oneshotsmith/core";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { ModuleSheet } from "../../components/module-sheet";
import { inputToParams, paramsToInput, themeSlug } from "../../lib/share";
import { useWebMcp } from "../../hooks/use-webmcp";
import type { OneShotToolController } from "../../lib/oneshot-tools";
import { packetToMarkdown } from "../../lib/markdown-export";
import { readSavedAdventures, saveAdventure } from "../../lib/adventure-storage";

const THEME_BLURBS: Record<OneShotTheme, string> = {
  "Dungeon Crawl": "Sealed doors, old wards, deep trouble",
  "Heist": "Case the target, crack the vault, get out",
  "Rescue": "They're alive. The clock says hurry.",
  "Haunting": "The house has rules. Learn them.",
  "Wilderness": "The land itself does not want you",
  "Mystery": "Every clue is true. Someone is lying.",
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard", "Deadly"];
const TIMEBOXES: Array<{ value: TimeBox; label: string }> = [
  { value: "2h", label: "2 hours" },
  { value: "3h", label: "3 hours" },
  { value: "4h", label: "4 hours" },
];

interface Settings {
  theme: OneShotTheme;
  level: number;
  partySize: number;
  difficulty: Difficulty;
  timebox: TimeBox;
}

const DEFAULTS: Settings = {
  theme: "Dungeon Crawl",
  level: 3,
  partySize: 4,
  difficulty: "Medium",
  timebox: "3h",
};

export default function OneShotGeneratorPage() {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [seed, setSeed] = useState<string>("");
  const [rerolls, setRerolls] = useState<Partial<Record<RerollSection, number>>>({});
  const [packet, setPacket] = useState<OneShotPacket | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flash = useCallback((message: string) => {
    setFeedback(message);
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => setFeedback(null), 3000);
  }, []);

  const run = useCallback(
    (s: Settings, sd: string, rr: Partial<Record<RerollSection, number>>) => {
      const input: OneShotInput = {
        seed: sd,
        theme: s.theme,
        level: s.level,
        partySize: s.partySize,
        difficulty: s.difficulty,
        timebox: s.timebox,
        rerolls: Object.keys(rr).length ? rr : undefined,
      };
      const generated = generateOneShot(input);
      setPacket(generated);
      const params = inputToParams(input);
      window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
      return generated;
    },
    []
  );

  // --- WebMCP -------------------------------------------------------------
  // Agent tools mirror the controls on this page. The controller is rebuilt
  // each render and read through a ref, so tools always act on current state
  // while staying registered exactly once (see hooks/use-webmcp.ts).
  const controllerRef = useRef<OneShotToolController>(
    undefined as unknown as OneShotToolController
  );
  controllerRef.current = {
    getState: () => ({ settings, seed, rerolls, packet }),
    generate: ({ settings: settingsPatch, seed: seedPatch, rerolls: rerollsPatch }) => {
      const nextSettings = settingsPatch ? { ...settings, ...settingsPatch } : settings;
      const nextSeed = (seedPatch ?? seed) || randomSeed();
      const nextRerolls = rerollsPatch ?? rerolls;
      if (settingsPatch) setSettings(nextSettings);
      if (nextSeed !== seed) setSeed(nextSeed);
      if (rerollsPatch) setRerolls(nextRerolls);
      return run(nextSettings, nextSeed, nextRerolls);
    },
    print: () => window.print(),
    announce: (message) => flash(message),
    shareUrl: (input) =>
      `${window.location.origin}${window.location.pathname}?${inputToParams(input).toString()}`,
    newSeed: () => randomSeed(),
  };
  const webmcp = useWebMcp(controllerRef);

  // Restore from URL (?s=…) or from a vault save (?load=…) on first mount.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const loadId = params.get("load");
    if (loadId) {
      const saved = readSavedAdventures().find((a) => a.id === loadId);
      if (saved) {
        const { input } = saved.packet;
        setSettings({
          theme: input.theme,
          level: input.level,
          partySize: input.partySize,
          difficulty: input.difficulty,
          timebox: input.timebox,
        });
        setSeed(input.seed);
        setRerolls(input.rerolls ?? {});
        setPacket(saved.packet);
        window.history.replaceState(null, "", `${window.location.pathname}?${inputToParams(input).toString()}`);
        return;
      }
    }
    const fromUrl = paramsToInput(params);
    if (fromUrl) {
      setSettings({
        theme: fromUrl.theme,
        level: fromUrl.level,
        partySize: fromUrl.partySize,
        difficulty: fromUrl.difficulty,
        timebox: fromUrl.timebox,
      });
      setSeed(fromUrl.seed);
      setRerolls(fromUrl.rerolls ?? {});
      run(
        {
          theme: fromUrl.theme,
          level: fromUrl.level,
          partySize: fromUrl.partySize,
          difficulty: fromUrl.difficulty,
          timebox: fromUrl.timebox,
        },
        fromUrl.seed,
        fromUrl.rerolls ?? {}
      );
    }
  }, [run]);

  // Once an adventure exists, settings changes regenerate it live (same seed).
  const updateSettings = (patch: Partial<Settings>) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    if (packet && seed) run(next, seed, rerolls);
  };

  const generateNew = () => {
    const sd = randomSeed();
    setSeed(sd);
    setRerolls({});
    run(settings, sd, {});
  };

  const surpriseMe = () => {
    const theme = ALL_THEMES[Math.floor(Math.random() * ALL_THEMES.length)];
    const next = { ...settings, theme };
    const sd = randomSeed();
    setSettings(next);
    setSeed(sd);
    setRerolls({});
    run(next, sd, {});
  };

  const applySeed = (raw: string) => {
    const cleaned = raw.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 16);
    setSeed(cleaned);
    if (cleaned && packet) {
      setRerolls({});
      run(settings, cleaned, {});
    }
  };

  const handleReroll = (section: RerollSection) => {
    const next = { ...rerolls, [section]: (rerolls[section] ?? 0) + 1 };
    setRerolls(next);
    run(settings, seed, next);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      flash("Link copied — anyone who opens it gets this exact module.");
    } catch {
      flash("Couldn't reach the clipboard. Copy the address bar instead.");
    }
  };

  const copyMarkdown = async () => {
    if (!packet) return;
    try {
      await navigator.clipboard.writeText(packetToMarkdown(packet));
      flash("Markdown copied — paste into Obsidian, Notion, or any editor.");
    } catch {
      flash("Couldn't reach the clipboard.");
    }
  };

  const handleSave = () => {
    if (!packet) return;
    try {
      saveAdventure(packet);
      flash("Saved to your vault (stored in this browser).");
    } catch {
      flash("Save failed — browser storage may be full or disabled.");
    }
  };

  const segmented = (selected: boolean) =>
    `display-caps border-2 px-3 py-1.5 text-[0.7rem] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass ${
      selected
        ? "border-map-blue bg-map-deep text-map-line"
        : "border-room-edge bg-transparent text-warm-soft hover:border-brass hover:text-brass"
    }`;

  return (
    <div className="chrome flex min-h-screen flex-col bg-room">
      <SiteHeader current="/one-shot-generator" />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        {/* ------------------------------------------------ Commission slip */}
        <section aria-label="Adventure settings" className="no-print border border-room-edge bg-room-raised">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-room-edge bg-room-deep px-4 py-2.5 sm:px-5">
            <h1 className="display-caps text-[0.85rem] font-bold tracking-[0.16em] text-brass">
              Commission an Adventure
            </h1>
            {webmcp.available && (
              <span
                className="display-caps flex items-center gap-1.5 border border-brass-soft px-2 py-0.5 text-[0.58rem] font-semibold text-brass"
                title={`WebMCP tools registered on ${webmcp.surface}.modelContext — an AI agent in this browser can drive this page directly.`}
              >
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brass opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brass" />
                </span>
                {webmcp.toolCount} agent tools live
              </span>
            )}
          </div>

          <div className="grid gap-x-8 gap-y-6 px-4 py-5 sm:px-5 lg:grid-cols-[1fr_auto]">
            {/* Theme */}
            <fieldset>
              <legend className="imprint mb-2.5">Theme</legend>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {ALL_THEMES.map((t) => {
                  const selected = settings.theme === t;
                  const scrim = selected
                    ? "linear-gradient(rgba(29,78,121,0.45), rgba(13,10,7,0.72))"
                    : "linear-gradient(rgba(13,10,7,0.52), rgba(13,10,7,0.82))";
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => updateSettings({ theme: t })}
                      aria-pressed={selected}
                      className={`min-h-[4.6rem] border-2 px-3 py-2.5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass ${
                        selected ? "border-brass" : "border-room-edge hover:border-brass"
                      }`}
                      style={{
                        backgroundImage: `${scrim}, url('${basePath}/art/themes/${themeSlug(t)}.jpg')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <span className="display-caps block text-[0.72rem] font-bold tracking-[0.1em] text-warm [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]">{t}</span>
                      <span className="block font-serif text-[0.85rem] italic leading-snug text-warm/85 [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]">
                        {THEME_BLURBS[t]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Numbers */}
            <div className="flex flex-wrap gap-x-8 gap-y-5 lg:w-[300px] lg:flex-col lg:gap-y-6">
              <div>
                <label htmlFor="level" className="imprint block">Party level</label>
                <div className="mt-2 flex items-center gap-1">
                  <button
                    type="button"
                    aria-label="Lower level"
                    onClick={() => updateSettings({ level: Math.max(1, settings.level - 1) })}
                    className="h-9 w-9 border-2 border-room-edge font-display text-lg font-semibold text-warm hover:border-brass hover:text-brass"
                  >
                    &minus;
                  </button>
                  <input
                    id="level"
                    type="number"
                    min={1}
                    max={20}
                    value={settings.level}
                    onChange={(e) =>
                      updateSettings({ level: Math.min(20, Math.max(1, Number(e.target.value) || 1)) })
                    }
                    className="h-9 w-16 border-2 border-room-edge bg-room-deep text-center font-display text-lg font-semibold text-warm focus:border-brass focus:outline-none"
                  />
                  <button
                    type="button"
                    aria-label="Raise level"
                    onClick={() => updateSettings({ level: Math.min(20, settings.level + 1) })}
                    className="h-9 w-9 border-2 border-room-edge font-display text-lg font-semibold text-warm hover:border-brass hover:text-brass"
                  >
                    +
                  </button>
                  <span className="ml-2 font-serif text-sm italic text-warm-soft">of 20</span>
                </div>
              </div>

              <div>
                <label htmlFor="party" className="imprint block">Characters at the table</label>
                <div className="mt-2 flex items-center gap-1">
                  <button
                    type="button"
                    aria-label="Fewer characters"
                    onClick={() => updateSettings({ partySize: Math.max(2, settings.partySize - 1) })}
                    className="h-9 w-9 border-2 border-room-edge font-display text-lg font-semibold text-warm hover:border-brass hover:text-brass"
                  >
                    &minus;
                  </button>
                  <input
                    id="party"
                    type="number"
                    min={2}
                    max={7}
                    value={settings.partySize}
                    onChange={(e) =>
                      updateSettings({ partySize: Math.min(7, Math.max(2, Number(e.target.value) || 4)) })
                    }
                    className="h-9 w-16 border-2 border-room-edge bg-room-deep text-center font-display text-lg font-semibold text-warm focus:border-brass focus:outline-none"
                  />
                  <button
                    type="button"
                    aria-label="More characters"
                    onClick={() => updateSettings({ partySize: Math.min(7, settings.partySize + 1) })}
                    className="h-9 w-9 border-2 border-room-edge font-display text-lg font-semibold text-warm hover:border-brass hover:text-brass"
                  >
                    +
                  </button>
                  <span className="ml-2 font-serif text-sm italic text-warm-soft">players</span>
                </div>
              </div>

              <fieldset>
                <legend className="imprint mb-2">Difficulty (encounter math)</legend>
                <div className="flex flex-wrap gap-1.5" role="group">
                  {DIFFICULTIES.map((d) => (
                    <button
                      key={d}
                      type="button"
                      aria-pressed={settings.difficulty === d}
                      onClick={() => updateSettings({ difficulty: d })}
                      className={
                        d === "Deadly" && settings.difficulty === d
                          ? "display-caps border-2 border-stamp bg-stamp px-3 py-1.5 text-[0.7rem] font-semibold text-warm"
                          : segmented(settings.difficulty === d)
                      }
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="imprint mb-2">Session length</legend>
                <div className="flex gap-1.5" role="group">
                  {TIMEBOXES.map((tb) => (
                    <button
                      key={tb.value}
                      type="button"
                      aria-pressed={settings.timebox === tb.value}
                      onClick={() => updateSettings({ timebox: tb.value })}
                      className={segmented(settings.timebox === tb.value)}
                    >
                      {tb.label}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>

          {/* Seed row + generate */}
          <div className="flex flex-wrap items-end justify-between gap-4 border-t border-room-edge px-4 py-4 sm:px-5">
            <div>
              <label htmlFor="seed" className="imprint block">Seed (optional — same seed, same adventure)</label>
              <input
                id="seed"
                type="text"
                value={seed}
                onChange={(e) => applySeed(e.target.value)}
                placeholder="e.g. k3v9pq"
                spellCheck={false}
                className="mt-2 h-9 w-44 border-2 border-room-edge bg-room-deep px-2 font-display text-sm tracking-[0.08em] text-warm placeholder:text-warm-soft/50 focus:border-brass focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={surpriseMe}
                className="btn-lantern px-4 py-2.5 text-[0.75rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
              >
                Surprise me
              </button>
              <button
                type="button"
                onClick={generateNew}
                className="btn-ember px-6 py-2.5 text-[0.75rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
              >
                {packet ? "Roll a new adventure" : "Generate adventure"}
              </button>
            </div>
          </div>
        </section>

        {/* Always visible: the human sees every agent action land here. */}
        <div aria-live="polite" className="no-print">
          {feedback && (
            <p className="mt-3 border border-success bg-room-raised px-3 py-2 font-serif text-sm italic text-[color:var(--success-bright)]">
              {feedback}
            </p>
          )}
        </div>

        {/* ------------------------------------------------ Output */}
        {packet ? (
          <>
            <div className="no-print sticky top-0 z-20 -mx-4 mt-8 border-y border-room-edge bg-room/95 px-4 py-2 backdrop-blur-sm sm:-mx-6 sm:px-6">
              <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2">
                <span className="display-caps hidden text-[0.68rem] font-bold tracking-[0.14em] text-warm-soft sm:inline">
                  Module {packet.moduleCode} &middot; seed {packet.input.seed}
                </span>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => window.print()} className="btn-ember px-3.5 py-1.5 text-[0.68rem]">
                    Print / PDF
                  </button>
                  <button type="button" onClick={copyLink} className="btn-lantern px-3.5 py-1.5 text-[0.68rem]">
                    Copy link
                  </button>
                  <button type="button" onClick={copyMarkdown} className="btn-lantern px-3.5 py-1.5 text-[0.68rem]">
                    Copy Markdown
                  </button>
                  <button type="button" onClick={handleSave} className="btn-lantern px-3.5 py-1.5 text-[0.68rem]">
                    Save to vault
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <ModuleSheet packet={packet} onReroll={handleReroll} />
            </div>

            <p className="no-print mt-4 text-center font-serif text-sm italic text-warm-soft">
              Not quite right? Re-roll any section with the small dice buttons — everything else stays put.
            </p>
          </>
        ) : (
          <section aria-label="How it works" className="mx-auto mt-12 max-w-2xl text-center">
            <p className="font-serif text-[1.35rem] italic leading-relaxed text-warm">
              Pick a shape for tonight&rsquo;s trouble, and the smithy will forge the rest:
              a keyed map, correct encounter math, a villain with a plan, and a table
              of secrets — ready to print or run from the screen.
            </p>
            <p className="imprint mt-6">
              Every adventure has a seed &middot; share the link, share the module
            </p>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
