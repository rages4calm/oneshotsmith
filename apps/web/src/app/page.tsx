"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { OneShotInput, OneShotTheme } from "@oneshotsmith/core";
import { ALL_THEMES, generateOneShot, randomSeed, XP_THRESHOLDS } from "@oneshotsmith/core";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { DungeonMapSVG } from "../components/dungeon-map-svg";
import { MapLantern } from "../components/map-lantern";
import { inputToParams } from "../lib/share";

// The landing hero is a real generated module lying in lamplight — the output
// IS the pitch. A fixed default seed keeps server and client HTML identical.

const COVER_DEFAULT: OneShotInput = {
  seed: "welcome",
  theme: "Dungeon Crawl",
  level: 3,
  partySize: 5,
  difficulty: "Medium",
  timebox: "3h",
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

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
    <div className="chrome flex min-h-screen flex-col bg-room">
      <SiteHeader />

      <main className="flex-1">
        {/* ============================================ Hero: the lit table */}
        <section
          className="relative overflow-hidden px-4 pb-20 pt-12 sm:px-6 sm:pt-16"
          style={{
            backgroundColor: "var(--room-deep)",
            backgroundImage: `linear-gradient(rgba(13,10,7,0.45), rgba(13,10,7,0.68) 55%, rgba(20,16,12,1)), url('${basePath}/art/table-hero.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative mx-auto max-w-3xl">
            <p className="display-caps-wide text-center text-[0.72rem] font-semibold text-brass">
              Free &middot; no accounts &middot; runs entirely in your browser
            </p>
            <h1 className="mt-4 text-center font-serif text-[2.1rem] font-bold leading-[1.12] text-warm sm:text-[3rem]">
              It&rsquo;s game night.
              <br />
              The adventure isn&rsquo;t written.
            </h1>
            <p className="mx-auto mt-4 max-w-[54ch] text-center text-[1.1rem] leading-relaxed text-warm-soft">
              OneShotsmith forges complete D&amp;D one&#8209;shots from a seed — keyed
              blue map, correct encounter math, a villain with a plan, boxed text,
              secrets, treasure. This one came off the anvil just now:
            </p>

            {/* The module, in a pool of lamplight */}
            <div className="lamp-pool mt-10">
              <div className="artifact module-frame relative -rotate-[0.4deg] bg-paper p-5 sm:p-7">
                <div className="display-caps-wide flex items-baseline justify-between gap-3 text-[0.62rem] font-semibold sm:text-[0.7rem]">
                  <span>Adventure Module {packet.moduleCode}</span>
                  <span>OneShotsmith &middot; 5E</span>
                </div>
                <hr className="module-rule mt-2" aria-hidden="true" />

                <MapLantern>
                  <div key={coverInput.seed} className="map-print mt-5 border-2 border-ink">
                    <DungeonMapSVG map={packet.map} animate={stamped} />
                  </div>
                </MapLantern>

                <h2 className="mt-5 text-center font-serif text-[1.6rem] font-bold leading-tight sm:text-[2rem]">
                  {packet.title}
                </h2>
                <p className="display-caps mt-2 text-center text-[0.66rem] font-medium tracking-[0.16em] text-ink-soft sm:text-[0.72rem]">
                  An adventure for {coverInput.partySize} characters of level {coverInput.level} &middot; {coverInput.theme}
                </p>
                <p className="mx-auto mt-3 max-w-[48ch] text-center font-serif text-[1.02rem] italic leading-relaxed">
                  {packet.tagline}
                </p>
              </div>
            </div>

            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={openHref} prefetch={false} className="btn-ember px-7 py-3.5 text-center text-[0.78rem]">
                Run this adventure
              </Link>
              <button type="button" onClick={newCover} className="btn-lantern px-7 py-3.5 text-[0.78rem]">
                Forge another
              </button>
            </div>
            <p className="imprint mt-5 text-center">
              seed {coverInput.seed} &middot; same seed, same adventure, forever
            </p>
          </div>
        </section>

        {/* ============================================ The gap (blue band) */}
        <section className="border-y border-room-edge bg-map-deep px-4 py-16 text-map-line sm:px-6">
          <div className="mx-auto max-w-3xl">
            <p className="font-serif text-[1.35rem] italic leading-relaxed opacity-90 sm:text-[1.6rem]">
              Map generators have no story. Story generators have no maps. Encounter
              builders have no plot, and AI tools can&rsquo;t do the math.
            </p>
            <p className="mt-4 font-serif text-[1.35rem] font-bold leading-relaxed sm:text-[1.6rem]">
              OneShotsmith does all four at once — deterministically, from a seed you
              can share like a link to a song.
            </p>
            <div className="mt-9 grid gap-x-10 gap-y-5 text-[0.95rem] leading-relaxed sm:grid-cols-2">
              <p><strong className="display-caps text-[0.7rem] tracking-[0.12em] text-map-line">The map is the module.</strong><br /><span className="opacity-85">Every keyed room on the blue map is a scene in the text — not two tools taped together.</span></p>
              <p><strong className="display-caps text-[0.7rem] tracking-[0.12em] text-map-line">The math is real.</strong><br /><span className="opacity-85">2014 DMG XP thresholds and multipliers, the 2024 budgets, and Sly Flourish&rsquo;s Lazy Benchmark as a second opinion.</span></p>
              <p><strong className="display-caps text-[0.7rem] tracking-[0.12em] text-map-line">Re-roll surgically.</strong><br /><span className="opacity-85">New villain, same map. New twist, same everything else. Each section has its own dice.</span></p>
              <p><strong className="display-caps text-[0.7rem] tracking-[0.12em] text-map-line">Print like it&rsquo;s 1981.</strong><br /><span className="opacity-85">Boxed read-alouds, keyed entries, a player-safe map handout — a real module out of your printer.</span></p>
            </div>
          </div>
        </section>

        {/* ============================================ Real excerpts */}
        <section className="px-4 py-18 sm:px-6" style={{ paddingTop: "4.5rem", paddingBottom: "4.5rem" }}>
          <div className="mx-auto max-w-5xl">
            <h2 className="display-caps text-center text-[1rem] font-bold tracking-[0.16em] text-warm">
              What&rsquo;s inside every module
            </h2>
            <p className="mx-auto mt-2 max-w-[54ch] text-center text-warm-soft">
              These aren&rsquo;t mock-ups — they&rsquo;re pages from{" "}
              <em className="text-warm">{packet.title}</em>, generated above, laid out
              on the table.
            </p>

            <div className="mt-12 grid items-start gap-8 lg:grid-cols-5">
              <div className="artifact rotate-[0.35deg] bg-paper p-5 lg:col-span-3">
                <p className="imprint mb-3">Scene {sampleScene.key} &middot; {sampleScene.title}</p>
                <div className="read-aloud">{sampleScene.readAloud}</div>
                <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[0.95rem]">
                  {sampleScene.details.slice(0, 2).map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6 lg:col-span-2">
                {sampleEncounter && (
                  <div className="artifact -rotate-[0.4deg]">
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
                  </div>
                )}
                <div className="artifact rotate-[0.5deg] border border-rule bg-paper-shade p-3.5">
                  <p className="display-caps text-[0.65rem] font-semibold tracking-[0.12em] text-ink-soft">Secrets &amp; clues</p>
                  <ul className="mt-2 space-y-1.5">
                    {packet.clues.slice(0, 3).map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-[0.88rem] leading-snug text-ink">
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
        <section className="border-t border-room-edge px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="display-caps text-center text-[1rem] font-bold tracking-[0.16em] text-warm">
              Table-ready in three moves
            </h2>
            <ol className="mx-auto mt-10 grid max-w-3xl gap-8 sm:grid-cols-3">
              {[
                ["Choose the shape", "Theme, level 1–20, party size, difficulty, and how many hours you actually have."],
                ["Forge the module", "One click. Zero loading bars — it's pure math, and it happens on your machine."],
                ["Print or run live", "Print a real module (player map included), copy Markdown to your notes, or run it from the screen."],
              ].map(([title, body], i) => (
                <li key={title} className="text-center">
                  <span className="key-circle mx-auto !h-9 !w-9 !border-brass text-[1.1rem] !text-brass">{i + 1}</span>
                  <h3 className="mt-3 font-serif text-[1.15rem] font-bold text-warm">{title}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-warm-soft">{body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-10 text-center">
              <Link href="/one-shot-generator" prefetch={false} className="btn-ember inline-block px-8 py-3.5 text-[0.78rem]">
                Open the generator
              </Link>
            </p>
          </div>
        </section>

        {/* ============================================ The math, shown */}
        <section className="border-t border-room-edge bg-room-deep px-4 py-16 sm:px-6">
          <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="display-caps text-[1rem] font-bold tracking-[0.16em] text-warm">
                Encounter math you can defend
              </h2>
              <p className="mt-3 leading-relaxed text-warm-soft">
                Every fight is built against the actual 2014 <em>Dungeon Master&rsquo;s Guide</em> XP
                thresholds for your exact party — with the official multipliers for monster
                count and party size — then sanity-checked against Sly Flourish&rsquo;s Lazy
                Encounter Benchmark, which catches the solo-boss and horde edge cases the
                XP math famously misses. The revised 2024 budgets ship in the engine too.
              </p>
              <p className="mt-3 leading-relaxed text-warm-soft">
                The module shows its work on every encounter: raw XP, adjusted XP,
                budget, and multiplier. If a fight runs hot, it warns you before your
                players find out the hard way.
              </p>
            </div>
            <div className="artifact -rotate-[0.35deg]">
              <div className="stat-block bg-paper p-4">
                <p className="display-caps text-[0.65rem] font-semibold tracking-[0.12em] text-ink-soft">
                  XP thresholds per character (2014 DMG)
                </p>
                <table className="mt-2 w-full text-center font-display text-[0.9rem] text-ink">
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
          </div>
        </section>

        {/* ============================================ Characters */}
        <section className="border-t border-room-edge px-4 py-16 sm:px-6">
          <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">
            <div className="artifact goldenrod-sheet order-2 rotate-[0.4deg] p-5 lg:order-1">
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
              <h2 className="display-caps text-[1rem] font-bold tracking-[0.16em] text-warm">
                Players get the goldenrod sheet
              </h2>
              <p className="mt-3 leading-relaxed text-warm-soft">
                Never played? Pick a role — Frontliner, Skirmisher, Support, Control, or
                Face — and get a complete, legal character with tactics that tell you
                what to actually do on your turn. Save heroes to a local vault, rename
                them, and print sheets styled after the classic goldenrod record.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/character-creator" prefetch={false} className="btn-ember px-5 py-3 text-[0.72rem]">
                  Create a character
                </Link>
                <Link href="/pregen-library" prefetch={false} className="btn-lantern px-5 py-3 text-[0.72rem]">
                  Browse pregens
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ Final CTA */}
        <section className="relative border-t border-room-edge bg-room-deep px-4 py-20 text-center sm:px-6">
          <div className="lamp-pool mx-auto max-w-2xl">
            <h2 className="relative mx-auto max-w-[26ch] font-serif text-[1.9rem] font-bold leading-snug text-warm sm:text-[2.3rem]">
              It&rsquo;s 6:40. The session is at 7:30. You have nothing.
            </h2>
            <p className="relative mx-auto mt-3 max-w-[44ch] font-serif text-[1.15rem] italic text-brass">
              You are, in fact, fine.
            </p>
            <Link
              href="/one-shot-generator"
              prefetch={false}
              className="btn-ember relative mt-9 inline-block px-9 py-4 text-[0.8rem]"
            >
              Forge tonight&rsquo;s adventure
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
