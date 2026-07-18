"use client";

import { useState } from "react";
import type {
  EncounterPlan,
  OneShotPacket,
  RerollSection,
  Scene,
} from "@oneshotsmith/core";
import { describeActualDifficulty, lazyBenchmark, open5eSlug } from "@oneshotsmith/core";
import { DungeonMapSVG } from "./dungeon-map-svg";

// Renders a generated packet as a classic adventure module: cover head, boxed
// read-alouds, keyed entries matching the map, stat tables, appendices.

interface Props {
  packet: OneShotPacket;
  onReroll?: (section: RerollSection) => void;
}

const SCENE_TYPE_LABEL: Record<Scene["type"], string> = {
  arrival: "Opening",
  social: "Roleplay",
  exploration: "Exploration",
  skill: "Challenge",
  combat: "Combat",
  setpiece: "Set piece",
  climax: "Finale",
};

function RerollButton({ section, onReroll, label }: { section: RerollSection; onReroll?: (s: RerollSection) => void; label?: string }) {
  if (!onReroll) return null;
  return (
    <button
      type="button"
      onClick={() => onReroll(section)}
      className="no-print display-caps ml-3 inline-flex items-center gap-1 border border-rule bg-paper px-2 py-0.5 text-[0.6rem] font-medium text-ink-soft transition-colors hover:border-map-deep hover:text-map-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-map-blue"
      aria-label={`Re-roll ${label ?? section}`}
    >
      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
        <path d="M12 2 L21 7.5 L21 16.5 L12 22 L3 16.5 L3 7.5 Z" />
        <path d="M12 2 L12 8.2 L3 7.5 M12 8.2 L21 7.5 M12 8.2 L7 15 L3 16.5 M7 15 L12 22 M7 15 L17 15 L12 8.2 M17 15 L21 16.5 M17 15 L12 22" strokeWidth="1" />
      </svg>
      Re-roll
    </button>
  );
}

function SectionHead({ children, section, onReroll, id }: { children: React.ReactNode; section?: RerollSection; onReroll?: (s: RerollSection) => void; id?: string }) {
  return (
    <div className="mt-10 first:mt-0" id={id}>
      <div className="flex items-baseline justify-between">
        <h2 className="display-caps text-[1.05rem] font-bold tracking-[0.14em] text-ink">{children}</h2>
        {section && <RerollButton section={section} onReroll={onReroll} />}
      </div>
      <hr className="module-rule mt-1.5" aria-hidden="true" />
    </div>
  );
}

function EncounterBlock({ encounter, level, partySize }: { encounter: EncounterPlan; level: number; partySize: number }) {
  const actual = describeActualDifficulty(encounter.adjustedXP, level, partySize);
  const lazy = lazyBenchmark(encounter.groups, level, partySize);
  return (
    <div className="stat-block mt-3 p-3.5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="display-caps text-[0.68rem] font-bold tracking-[0.14em] text-stamp">Encounter</span>
        <span className="display-caps text-[0.62rem] text-ink-soft">
          {actual} &middot; adjusted {encounter.adjustedXP.toLocaleString()} XP vs. budget {encounter.budget.toLocaleString()} (&times;{encounter.multiplier})
        </span>
      </div>
      <table className="mt-2 w-full border-collapse text-[0.95rem]">
        <thead>
          <tr className="display-caps border-b-2 border-ink text-left text-[0.6rem] tracking-[0.12em]">
            <th className="py-1 pr-2 font-semibold">Creature</th>
            <th className="px-2 py-1 text-center font-semibold">AC</th>
            <th className="px-2 py-1 text-center font-semibold">HP</th>
            <th className="hidden px-2 py-1 font-semibold sm:table-cell">Attack</th>
            <th className="py-1 pl-2 text-right font-semibold">XP</th>
          </tr>
        </thead>
        <tbody>
          {encounter.groups.map((g) => (
            <tr key={g.monster.name} className="border-b border-rule align-top last:border-b-0">
              <td className="py-1.5 pr-2">
                <span className="stat-block-name">{g.count > 1 ? `${g.count} × ` : ""}{g.monster.name}</span>
                <span className="ml-1.5 text-[0.78rem] text-ink-soft">CR {g.monster.cr}</span>
                {g.monster.note && <div className="text-[0.82rem] italic text-ink-soft">{g.monster.note}</div>}
                <a
                  className="no-print text-[0.75rem] text-map-deep underline decoration-rule underline-offset-2 hover:decoration-map-deep"
                  href={`https://open5e.com/monsters/${open5eSlug(g.monster.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  full stat block
                </a>
              </td>
              <td className="px-2 py-1.5 text-center font-medium">{g.monster.ac}</td>
              <td className="px-2 py-1.5 text-center font-medium">{g.monster.hp}</td>
              <td className="hidden px-2 py-1.5 text-[0.86rem] sm:table-cell">{g.monster.attack}</td>
              <td className="py-1.5 pl-2 text-right">{(g.monster.xp * g.count).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-[0.9rem]"><strong className="font-sc">Terrain.</strong> {encounter.terrain}</p>
      <p className="mt-1 text-[0.9rem]"><strong className="font-sc">Tactics.</strong> {encounter.tactics}</p>
      {lazy.deadly && (
        <p className="mt-2 border-t border-rule pt-2 text-[0.82rem] text-stamp">
          Lazy Benchmark check: total CR runs hot for this party — expect real danger. Telegraph lethal moves a round early.
        </p>
      )}
    </div>
  );
}

function SceneEntry({ scene, level, partySize }: { scene: Scene; level: number; partySize: number }) {
  return (
    <section className="avoid-break mt-8 first:mt-5" aria-label={`Scene ${scene.key}: ${scene.title}`}>
      <div className="flex items-center gap-3">
        <span className="key-circle" aria-hidden="true">{scene.key}</span>
        <h3 className="font-serif text-[1.3rem] font-bold leading-snug">{scene.title}</h3>
      </div>
      <p className="imprint mt-1 pl-10">
        {SCENE_TYPE_LABEL[scene.type]} &middot; ~{scene.minutes} min{scene.cuttable ? " · cuttable" : ""}
      </p>
      <div className="mt-3 space-y-3 sm:pl-10">
        {scene.readAloud && <div className="read-aloud">{scene.readAloud}</div>}
        <p>{scene.summary}</p>
        <ul className="list-disc space-y-1.5 pl-5 text-[0.98rem]">
          {scene.details.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
        {scene.skillChallenge && (
          <div className="stat-block mt-3 p-3.5">
            <span className="display-caps text-[0.68rem] font-bold tracking-[0.14em] text-map-deep">Skill Challenge</span>
            <p className="mt-1.5 text-[0.95rem]">{scene.skillChallenge.description}</p>
            <ul className="mt-2 space-y-1 text-[0.92rem]">
              {scene.skillChallenge.checks.map((c, i) => (
                <li key={i} className="flex gap-2">
                  <span className="stat-block-name whitespace-nowrap">DC {c.dc} {c.skill}</span>
                  <span className="text-ink-soft">— {c.use}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[0.92rem]"><strong className="font-sc">Success.</strong> {scene.skillChallenge.success}</p>
            <p className="mt-1 text-[0.92rem]"><strong className="font-sc">Failure.</strong> {scene.skillChallenge.failure}</p>
          </div>
        )}
        {scene.encounter && <EncounterBlock encounter={scene.encounter} level={level} partySize={partySize} />}
        {scene.clue && (
          <p className="border border-rule bg-paper-shade px-3 py-2 text-[0.92rem]">
            <strong className="font-sc">Clue planted here.</strong> {scene.clue}
          </p>
        )}
      </div>
    </section>
  );
}

export function ModuleSheet({ packet, onReroll }: Props) {
  const [playerView, setPlayerView] = useState(false);
  const { input } = packet;

  return (
    <article className="module-sheet module-frame bg-paper px-5 py-8 sm:px-10 sm:py-10" aria-label={`Adventure module: ${packet.title}`}>
      {/* ------------------------------------------------ Cover head */}
      <header>
        <div className="display-caps-wide flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[0.7rem] font-semibold text-ink">
          <span>Adventure Module {packet.moduleCode}</span>
          <span className="flex items-baseline gap-3">
            <span>5E &middot; SRD 5.1</span>
            <RerollButton section="title" onReroll={onReroll} label="title" />
          </span>
        </div>
        <hr className="module-rule mt-2" aria-hidden="true" />
        <h1 className="mt-6 font-serif text-[2.1rem] font-bold leading-[1.12] sm:text-[2.75rem]">
          {packet.title}
        </h1>
        <p className="display-caps mt-3 text-[0.78rem] font-medium tracking-[0.16em] text-ink-soft">
          An adventure for {input.partySize} characters of level {input.level} &middot; {input.timebox === "2h" ? "two" : input.timebox === "3h" ? "three" : "four"}-hour session &middot; {input.difficulty} &middot; {input.theme}
        </p>
        <p className="mt-4 max-w-[62ch] font-serif text-[1.12rem] italic leading-relaxed text-ink">
          {packet.tagline}
        </p>
      </header>

      {/* ------------------------------------------------ Synopsis */}
      <SectionHead>For the Game Master</SectionHead>
      <p className="mt-4 max-w-[70ch]">{packet.synopsis}</p>
      <p className="mt-3 text-[0.9rem] text-ink-soft">
        Total combat XP {packet.xpSummary.total.toLocaleString()} ({packet.xpSummary.perCharacter.toLocaleString()} per character) — a full session&rsquo;s reward at this level.
      </p>

      {/* ------------------------------------------------ Hook */}
      <SectionHead section="hook" onReroll={onReroll}>Part One &middot; The Hook</SectionHead>
      <div className="mt-5 space-y-4">
        <div className="read-aloud text-[1.05rem]">{packet.hook.readAloud}</div>
        <p className="max-w-[70ch]">{packet.hook.summary}</p>
        <div className="border border-rule bg-paper-shade px-4 py-3">
          <p className="display-caps text-[0.65rem] font-semibold tracking-[0.14em] text-ink-soft">If the party balks</p>
          <ul className="mt-1.5 list-disc space-y-1 pl-5 text-[0.95rem]">
            {packet.hook.alternates.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ------------------------------------------------ Site & map */}
      <SectionHead section="map" onReroll={onReroll}>Part Two &middot; {packet.location.name}</SectionHead>
      <p className="mt-4 max-w-[70ch]">{packet.location.description}</p>

      <figure className="avoid-break mt-5">
        <div className="map-print border-2 border-ink">
          <DungeonMapSVG map={packet.map} playerView={playerView} />
        </div>
        <figcaption className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
          <span className="imprint">Map: {packet.map.title} — one square = 10 feet</span>
          <label className="no-print imprint flex cursor-pointer select-none items-center gap-2">
            <input
              type="checkbox"
              checked={playerView}
              onChange={(e) => setPlayerView(e.target.checked)}
              className="h-3.5 w-3.5 accent-[var(--map-blue-deep)]"
            />
            Player-safe view (no keys, no secret doors)
          </label>
        </figcaption>
      </figure>

      <div className="mt-4 columns-1 gap-8 sm:columns-2">
        {packet.map.rooms.filter((r) => r.key > 0).map((r) => (
          <p key={r.key} className="flex items-baseline gap-2 text-[0.95rem]">
            <span className="font-display font-bold text-map-deep">{r.key}.</span> {r.label}
          </p>
        ))}
        {packet.map.rooms.filter((r) => r.key === 0).map((r, i) => (
          <p key={`m${i}`} className="flex items-baseline gap-2 text-[0.95rem] text-ink-soft">
            <span className="font-display font-bold">&mdash;</span> {r.label} (unkeyed)
          </p>
        ))}
      </div>

      {/* ------------------------------------------------ Villain */}
      <SectionHead section="villain" onReroll={onReroll}>The Villain</SectionHead>
      <div className="mt-5">
        <h3 className="font-serif text-[1.45rem] font-bold">
          {packet.villain.name}
          <span className="ml-2 font-normal italic text-ink-soft">— {packet.villain.epithet}</span>
        </h3>
        <dl className="mt-3 max-w-[72ch] space-y-2.5">
          {[
            ["Motivation", packet.villain.motivation],
            ["The plan", packet.villain.plan],
            ["Their secret", packet.villain.secret],
            ["At the table", packet.villain.mannerism],
          ].map(([term, def]) => (
            <div key={term} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
              <dt className="font-sc w-28 flex-none font-bold">{term}</dt>
              <dd>{def}</dd>
            </div>
          ))}
        </dl>
        <div className="stat-block mt-4 max-w-md p-3.5">
          <p className="stat-block-name text-[1.05rem]">{packet.villain.stats.name}</p>
          <p className="text-[0.85rem] italic text-ink-soft">CR {packet.villain.stats.cr} {packet.villain.stats.type} &middot; {packet.villain.stats.xp.toLocaleString()} XP</p>
          <hr className="my-2 border-rule" />
          <p className="text-[0.92rem]">
            <strong>AC</strong> {packet.villain.stats.ac} &middot; <strong>HP</strong> {packet.villain.stats.hp} &middot; <strong>Speed</strong> {packet.villain.stats.speed}
          </p>
          <p className="mt-1 text-[0.92rem]">{packet.villain.stats.attack}</p>
          {packet.villain.stats.note && <p className="mt-1 text-[0.88rem] italic">{packet.villain.stats.note}</p>}
        </div>
      </div>

      {/* ------------------------------------------------ NPCs */}
      <SectionHead section="npcs" onReroll={onReroll}>The Cast</SectionHead>
      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        {packet.npcs.map((npc, i) => (
          <div key={npc.name} className="avoid-break border-t-2 border-ink pt-3">
            <p className="font-serif text-[1.1rem] font-bold leading-tight">{npc.name}</p>
            <p className="imprint mt-0.5">{npc.ancestry} {npc.occupation}{i === 0 ? " · patron" : ""}</p>
            <ul className="mt-2 space-y-1.5 text-[0.9rem] leading-snug">
              <li><strong className="font-sc">Looks:</strong> {npc.appearance}</li>
              <li><strong className="font-sc">Manner:</strong> {npc.mannerism}</li>
              <li><strong className="font-sc">Voice:</strong> {npc.voice}</li>
              <li><strong className="font-sc">Wants:</strong> {npc.goal}</li>
              <li><strong className="font-sc">Secret:</strong> {npc.secret}</li>
            </ul>
          </div>
        ))}
      </div>

      {/* ------------------------------------------------ Scenes */}
      <SectionHead section="scenes" onReroll={onReroll} id="scenes">Part Three &middot; The Scenes</SectionHead>
      {packet.scenes.map((scene) => (
        <SceneEntry key={scene.id} scene={scene} level={input.level} partySize={input.partySize} />
      ))}

      {/* ------------------------------------------------ Secrets & twist */}
      <SectionHead section="twist" onReroll={onReroll}>Secrets &amp; Clues</SectionHead>
      <p className="mt-4 max-w-[70ch] text-[0.95rem] text-ink-soft">
        Reveal these anywhere the players look — attach each to whichever scene, NPC, or search they invest in. Check them off as they land.
      </p>
      <ul className="mt-3 columns-1 gap-8 sm:columns-2">
        {packet.clues.map((clue, i) => (
          <li key={i} className="mb-2 flex items-start gap-2.5 break-inside-avoid text-[0.95rem]">
            <span aria-hidden="true" className="mt-1.5 inline-block h-3 w-3 flex-none border-[1.5px] border-ink" />
            {clue}
          </li>
        ))}
      </ul>
      <div className="avoid-break mt-6 border-2 border-stamp bg-paper-shade px-4 py-3.5">
        <p className="display-caps text-[0.68rem] font-bold tracking-[0.14em] text-stamp">The Twist</p>
        <p className="mt-1.5">{packet.twist}</p>
      </div>

      {/* ------------------------------------------------ Treasure */}
      <SectionHead section="treasure" onReroll={onReroll}>Treasure</SectionHead>
      <div className="mt-5 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="display-caps text-[0.68rem] font-semibold tracking-[0.14em] text-ink-soft">Parcels</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[0.98rem]">
            {packet.treasure.parcels.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
        <div className="stat-block p-3.5">
          <p className="stat-block-name text-[1.05rem]">{packet.treasure.signatureItem.name}</p>
          <p className="text-[0.85rem] italic text-ink-soft">
            {packet.treasure.signatureItem.rarity}
            {packet.treasure.signatureItem.attunement ? " (requires attunement)" : ""}
          </p>
          <hr className="my-2 border-rule" />
          <p className="text-[0.95rem]">{packet.treasure.signatureItem.description}</p>
        </div>
      </div>

      {/* ------------------------------------------------ Running the table */}
      <SectionHead>Running the Table</SectionHead>
      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div className="avoid-break">
          <p className="display-caps text-[0.68rem] font-semibold tracking-[0.14em] text-ink-soft">Session clock</p>
          <table className="mt-2 w-full border-collapse text-[0.95rem]">
            <tbody>
              {packet.pacing.map((p) => (
                <tr key={p.label} className="border-b border-rule align-baseline last:border-b-0">
                  <td className="w-14 py-1.5 pr-2 font-display font-semibold text-map-deep">{p.minutes}&prime;</td>
                  <td className="py-1.5 pr-3 font-medium">{p.label}</td>
                  <td className="hidden py-1.5 text-[0.85rem] text-ink-soft sm:table-cell">{p.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="space-y-5">
          <div className="avoid-break">
            <p className="display-caps text-[0.68rem] font-semibold tracking-[0.14em] text-ink-soft">Scaling</p>
            <p className="mt-2 text-[0.95rem]"><strong className="font-sc">Weaker table.</strong> {packet.scaling.weaker}</p>
            <p className="mt-2 text-[0.95rem]"><strong className="font-sc">Stronger table.</strong> {packet.scaling.stronger}</p>
          </div>
          <div className="avoid-break">
            <p className="display-caps text-[0.68rem] font-semibold tracking-[0.14em] text-ink-soft">Running behind?</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[0.95rem]">
              {packet.cutList.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------ Random tables */}
      <SectionHead section="tables" onReroll={onReroll}>Random Tables</SectionHead>
      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        {packet.tables.map((table) => (
          <div key={table.title} className="avoid-break">
            <p className="display-caps text-[0.68rem] font-semibold tracking-[0.14em] text-ink-soft">
              {table.title} ({table.die})
            </p>
            <table className="mt-2 w-full border-collapse text-[0.92rem]">
              <tbody>
                {table.entries.map((e, i) => (
                  <tr key={i} className="border-b border-rule align-baseline last:border-b-0">
                    <td className="w-8 py-1.5 pr-2 text-right font-display font-semibold text-map-deep">{i + 1}</td>
                    <td className="py-1.5">{e}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Player map on its own printed page */}
      <div className="print-only print-break-before map-print">
        <p className="display-caps mb-3 text-[0.8rem] font-bold tracking-[0.16em]">Player handout &middot; {packet.map.title}</p>
        <div className="border-2 border-ink">
          <DungeonMapSVG map={packet.map} playerView />
        </div>
      </div>

      {/* ------------------------------------------------ Imprint */}
      <hr className="module-rule mt-12" aria-hidden="true" />
      <p className="imprint mt-3 leading-relaxed">
        Generated by OneShotsmith &middot; seed {input.seed} &middot; module {packet.moduleCode} &middot; includes material from the SRD 5.1 by Wizards of the Coast LLC, CC-BY-4.0
      </p>
    </article>
  );
}
