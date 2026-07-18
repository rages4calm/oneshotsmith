"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { OneShotInput, OneShotTheme } from "@oneshotsmith/core";
import { ALL_THEMES, generateOneShot, randomSeed, XP_THRESHOLDS } from "@oneshotsmith/core";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { DungeonMapSVG } from "../components/dungeon-map-svg";
import { inputToParams } from "../lib/share";

// The landing hero is a real generated module cover — the output IS the pitch.
// A fixed default seed keeps server and client HTML identical on first paint.

const COVER_DEFAULT: OneShotInput = {
  seed: "welcome",
  theme: "Dungeon Crawl",
  level: 3,
  partySize: 5,
  difficulty: "Medium",
  timebox: "3h",
};

export default function HomePage() {
  const [coverInput, setCoverInput] = useState<OneShotInput>(COVER_DEFAULT);
  const [stamped, setStamped] = useState(false);
  const packet = useMemo(() => generateOneShot(coverInput), [coverInput]);

  const newCover = () => {
    const theme = ALL_THEMES[Math.floor(Math.random() * ALL_THEMES.length)] as OneShotTheme;
    setCoverInput({ ...coverInput, seed: randomSeed(), theme });
    setStamped(true);
  };

  const openHref = `/one-shot-generator?${inputToParams(coverInput).toString()}`;
  const sampleScene = packet.scenes.find((s) => s.readAloud) ?? packet.scenes[0];
  const sampleEncounter = packet.scenes.find((s) => s.encounter)?.encounter;

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <SiteHeader />

      <main className="flex-1">
        {/* ============================================ Hero: the cover */}
        <section className="px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
          <div className="mx-auto max-w-3xl">
            <p className="display-caps-wide text-center text-[0.72rem] font-semibold text-ink-soft">
              Free &middot; no accounts &middot; runs entirely in your browser
            </p>
            <h1 className="mt-3 text-center font-serif text-[2rem] font-bold leading-[1.15] sm:text-[2.6rem]">
              Complete D&amp;D one&#8209;shots, forged from a seed.
            </h1>
            <p className="mx-auto mt-3 max-w-[52ch] text-center text-[1.08rem] leading-relaxed text-ink-soft">
              Keyed map, correct encounter math, villain with a plan, boxed text,
              secrets, treasure — a printable adventure module in one click. This one
              was generated live, just now:
            </p>

            {/* The module cover */}
            <div className="module-frame mt-8 bg-paper p-5 sm:p-7">
              <div className="display-caps-wide flex items-baseline justify-between gap-3 text-[0.62rem] font-semibold sm:text-[0.7rem]">
                <span>Adventure Module {packet.moduleCode}</span>
                <span>OneShotsmith &middot; 5E</span>
              </div>
              <hr className="module-rule mt-2" aria-hidden="true" />

              <div key={coverInput.seed} className="map-print mt-5 border-2 border-ink">
                <DungeonMapSVG map={packet.map} animate={stamped} />
              </div>

              <h2 className="mt-5 text-center font-serif text-[1.6rem] font-bold leading-tight sm:text-[2rem]">
                {packet.title}
              </h2>
              <p className="display-caps mt-2 text-center text-[0.66rem] font-medium tracking-[0.16em] text-ink-soft sm:text-[0.72rem]">
                An adventure for {coverInput.partySize} characters of level {coverInput.level} &middot; {coverInput.theme}
              </p>
              <p className="mx-auto mt-3 max-w-[48ch] text-center font-serif text-[1.02rem] italic leading-relaxed">
                {packet.tagline}
              </p>

              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href={openHref}
                  prefetch={false}
                  className="display-caps border-2 border-map-deep bg-map-deep px-6 py-3 text-center text-[0.75rem] font-bold tracking-[0.12em] text-map-line transition-colors hover:border-map-blue hover:bg-map-blue"
                >
                  Run this adventure
                </Link>
                <button
                  type="button"
                  onClick={newCover}
                  className="display-caps border-2 border-ink bg-paper px-6 py-3 text-[0.75rem] font-bold tracking-[0.12em] transition-colors hover:bg-paper-shade"
                >
                  Forge another
                </button>
              </div>
              <p className="imprint mt-4 text-center">
                seed {coverInput.seed} &middot; same seed, same adventure, forever
              </p>
            </div>
          </div>
        </section>

        {/* ============================================ The gap (blue band) */}
        <section className="border-y-2 border-ink bg-map-deep px-4 py-14 text-map-line sm:px-6">
          <div className="mx-auto max-w-3xl">
            <p className="font-serif text-[1.35rem] italic leading-relaxed sm:text-[1.6rem]">
              Map generators have no story. Story generators have no maps. Encounter
              builders have no plot, and AI tools can&rsquo;t do the math.
            </p>
            <p className="mt-4 font-serif text-[1.35rem] font-bold leading-relaxed sm:text-[1.6rem]">
              OneShotsmith does all four at once — deterministically, from a seed you
              can share like a link to a song.
            </p>
            <div className="mt-8 grid gap-x-10 gap-y-4 text-[0.95rem] leading-relaxed opacity-90 sm:grid-cols-2">
              <p><strong className="display-caps text-[0.7rem] tracking-[0.12em]">The map is the module.</strong><br />Every keyed room on the blue map is a scene in the text — not two tools taped together.</p>
              <p><strong className="display-caps text-[0.7rem] tracking-[0.12em]">The math is real.</strong><br />2014 DMG XP thresholds and multipliers, the 2024 budgets, and Sly Flourish&rsquo;s Lazy Benchmark as a second opinion.</p>
              <p><strong className="display-caps text-[0.7rem] tracking-[0.12em]">Re-roll surgically.</strong><br />New villain, same map. New twist, same everything else. Each section has its own dice.</p>
              <p><strong className="display-caps text-[0.7rem] tracking-[0.12em]">Print like it&rsquo;s 1981.</strong><br />Boxed read-alouds, keyed entries, a player-safe map handout — a real module out of your printer.</p>
            </div>
          </div>
        </section>

        {/* ============================================ Real excerpts */}
        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="display-caps text-center text-[1rem] font-bold tracking-[0.16em]">
              What&rsquo;s inside every module
            </h2>
            <p className="mx-auto mt-2 max-w-[54ch] text-center text-ink-soft">
              These aren&rsquo;t mock-ups — they&rsquo;re live excerpts from{" "}
              <em>{packet.title}</em> above.
            </p>

            <div className="mt-10 grid items-start gap-8 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <p className="imprint mb-2">Scene {sampleScene.key} &middot; {sampleScene.title}</p>
                <div className="read-aloud">{sampleScene.readAloud}</div>
                <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[0.95rem]">
                  {sampleScene.details.slice(0, 2).map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-2">
                {sampleEncounter && (
                  <div className="stat-block p-3.5">
                    <div className="flex items-baseline justify-between">
                      <span className="display-caps text-[0.65rem] font-bold tracking-[0.12em] text-stamp">Encounter</span>
                      <span className="display-caps text-[0.6rem] text-ink-soft">
                        {sampleEncounter.adjustedXP.toLocaleString()} XP vs. {sampleEncounter.budget.toLocaleString()} budget
                      </span>
                    </div>
                    <table className="mt-2 w-full text-[0.9rem]">
                      <tbody>
                        {sampleEncounter.groups.map((g) => (
                          <tr key={g.monster.name} className="border-b border-rule last:border-b-0">
                            <td className="stat-block-name py-1.5 pr-2">{g.count > 1 ? `${g.count} × ` : ""}{g.monster.name}</td>
                            <td className="py-1.5 text-right text-ink-soft">AC {g.monster.ac} &middot; {g.monster.hp} hp</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <div className="mt-5 border border-rule bg-paper-shade p-3.5">
                  <p className="display-caps text-[0.65rem] font-semibold tracking-[0.12em] text-ink-soft">Secrets &amp; clues</p>
                  <ul className="mt-2 space-y-1.5">
                    {packet.clues.slice(0, 3).map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-[0.88rem] leading-snug">
                        <span aria-hidden="true" className="mt-1 inline-block h-2.5 w-2.5 flex-none border border-ink" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ How it works */}
        <section className="border-t-2 border-ink px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="display-caps text-center text-[1rem] font-bold tracking-[0.16em]">
              Table-ready in three moves
            </h2>
            <ol className="mx-auto mt-10 grid max-w-3xl gap-8 sm:grid-cols-3">
              {[
                ["Choose the shape", "Theme, level 1–20, party size, difficulty, and how many hours you actually have."],
                ["Forge the module", "One click. Zero loading bars — it's pure math, and it happens on your machine."],
                ["Print or run live", "Print a real module (player map included), copy Markdown to your notes, or run it from the screen."],
              ].map(([title, body], i) => (
                <li key={title} className="text-center">
                  <span className="key-circle mx-auto !h-9 !w-9 text-[1.1rem]">{i + 1}</span>
                  <h3 className="mt-3 font-serif text-[1.15rem] font-bold">{title}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-soft">{body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-10 text-center">
              <Link
                href="/one-shot-generator"
                prefetch={false}
                className="display-caps inline-block border-2 border-map-deep bg-map-deep px-8 py-3 text-[0.78rem] font-bold tracking-[0.12em] text-map-line transition-colors hover:border-map-blue hover:bg-map-blue"
              >
                Open the generator
              </Link>
            </p>
          </div>
        </section>

        {/* ============================================ The math, shown */}
        <section className="border-t-2 border-ink bg-paper-shade px-4 py-16 sm:px-6">
          <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="display-caps text-[1rem] font-bold tracking-[0.16em]">
                Encounter math you can defend
              </h2>
              <p className="mt-3 leading-relaxed">
                Every fight is built against the actual 2014 <em>Dungeon Master&rsquo;s Guide</em> XP
                thresholds for your exact party — with the official multipliers for monster
                count and party size — then sanity-checked against Sly Flourish&rsquo;s Lazy
                Encounter Benchmark, which catches the solo-boss and horde edge cases the
                XP math famously misses. The revised 2024 budgets ship in the engine too.
              </p>
              <p className="mt-3 leading-relaxed text-ink-soft">
                The module shows its work on every encounter: raw XP, adjusted XP,
                budget, and multiplier. If a fight runs hot, it warns you before your
                players find out the hard way.
              </p>
            </div>
            <div className="stat-block bg-paper p-4">
              <p className="display-caps text-[0.65rem] font-semibold tracking-[0.12em] text-ink-soft">
                XP thresholds per character (2014 DMG)
              </p>
              <table className="mt-2 w-full text-center font-display text-[0.9rem]">
                <thead>
                  <tr className="display-caps border-b-2 border-ink text-[0.6rem] tracking-[0.1em]">
                    <th className="py-1.5 text-left">Level</th>
                    <th>Easy</th><th>Medium</th><th>Hard</th>
                    <th className="text-stamp">Deadly</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 3, 5, 8, 11, 17, 20].map((lvl) => (
                    <tr key={lvl} className="border-b border-rule last:border-b-0">
                      <td className="py-1.5 text-left font-bold">{lvl}</td>
                      {XP_THRESHOLDS[lvl].map((xp, i) => (
                        <td key={i} className={i === 3 ? "text-stamp" : undefined}>{xp.toLocaleString()}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ============================================ Characters */}
        <section className="border-t-2 border-ink px-4 py-16 sm:px-6">
          <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">
            <div className="goldenrod-sheet order-2 p-5 lg:order-1">
              <div className="flex items-baseline justify-between">
                <p className="sheet-label">Character record</p>
                <p className="sheet-label">OneShotsmith</p>
              </div>
              <p className="mt-2 font-serif text-[1.5rem] font-bold">Kara Ravenshaw</p>
              <p className="sheet-label mt-0.5">Level 3 Human Fighter &middot; Folk Hero</p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center sm:grid-cols-6">
                {[["STR", 16], ["DEX", 11], ["CON", 15], ["INT", 9], ["WIS", 13], ["CHA", 14]].map(([label, score]) => (
                  <div key={label} className="sheet-box px-1 py-2">
                    <p className="sheet-label">{label}</p>
                    <p className="font-display text-[1.3rem] font-bold leading-none">{score}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                {[["Armor Class", 16], ["Hit Points", 31], ["Prof.", "+2"]].map(([label, v]) => (
                  <div key={String(label)} className="sheet-box px-1 py-2">
                    <p className="sheet-label">{label}</p>
                    <p className="font-display text-[1.3rem] font-bold leading-none">{v}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[0.9rem] italic">
                &ldquo;I face problems head-on. A simple, direct solution is the best path.&rdquo;
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="display-caps text-[1rem] font-bold tracking-[0.16em]">
                Players get the goldenrod sheet
              </h2>
              <p className="mt-3 leading-relaxed">
                Never played? Pick a role — Frontliner, Skirmisher, Support, Control, or
                Face — and get a complete, legal character with tactics that tell you
                what to actually do on your turn. Save heroes to a local vault, rename
                them, and print sheets styled after the classic goldenrod record.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/character-creator"
                  prefetch={false}
                  className="display-caps border-2 border-map-deep bg-map-deep px-5 py-2.5 text-[0.72rem] font-bold tracking-[0.12em] text-map-line transition-colors hover:border-map-blue hover:bg-map-blue"
                >
                  Create a character
                </Link>
                <Link
                  href="/pregen-library"
                  prefetch={false}
                  className="display-caps border-2 border-ink bg-paper px-5 py-2.5 text-[0.72rem] font-bold tracking-[0.12em] transition-colors hover:bg-paper-shade"
                >
                  Browse pregens
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ Final CTA */}
        <section className="border-t-2 border-ink bg-map-deep px-4 py-16 text-center text-map-line sm:px-6">
          <h2 className="mx-auto max-w-[26ch] font-serif text-[1.8rem] font-bold leading-snug sm:text-[2.2rem]">
            It&rsquo;s 6:40. The session is at 7:30. You have nothing.
          </h2>
          <p className="mx-auto mt-3 max-w-[44ch] font-serif text-[1.1rem] italic opacity-90">
            You are, in fact, fine.
          </p>
          <Link
            href="/one-shot-generator"
            prefetch={false}
            className="display-caps mt-8 inline-block border-2 border-map-line bg-map-line px-8 py-3 text-[0.78rem] font-bold tracking-[0.12em] text-map-deep transition-colors hover:bg-paper"
          >
            Forge tonight&rsquo;s adventure
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
