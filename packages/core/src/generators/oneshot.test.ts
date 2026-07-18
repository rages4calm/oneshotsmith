import { describe, expect, it } from "vitest";
import { generateOneShot } from "./oneshot";
import { ALL_THEMES, THEME_PACKS } from "../data/themes";
import {
  encounterMultiplier,
  lazyBenchmark,
  partyThreshold,
} from "../data/encounter-math";
import type { OneShotInput } from "../types";

const baseInput: OneShotInput = {
  seed: "test01",
  theme: "Dungeon Crawl",
  level: 5,
  partySize: 4,
  difficulty: "Hard",
  timebox: "3h",
};

describe("generateOneShot", () => {
  it("is deterministic: same seed and settings produce the same packet", () => {
    const a = generateOneShot(baseInput);
    const b = generateOneShot({ ...baseInput });
    expect(a).toEqual(b);
  });

  it("different seeds produce different adventures", () => {
    const titles = new Set(
      ["a1", "b2", "c3", "d4", "e5", "f6", "g7", "h8"].map(
        (seed) => generateOneShot({ ...baseInput, seed }).title
      )
    );
    expect(titles.size).toBeGreaterThan(3);
  });

  it("re-rolling one section leaves the map and title untouched", () => {
    const a = generateOneShot(baseInput);
    const b = generateOneShot({ ...baseInput, rerolls: { villain: 1 } });
    expect(b.title).toEqual(a.title);
    expect(b.map).toEqual(a.map);
    expect(b.treasure).toEqual(a.treasure);
  });

  it("re-rolling the villain can change the villain", () => {
    const rolls = [0, 1, 2, 3, 4].map(
      (n) => generateOneShot({ ...baseInput, rerolls: { villain: n } }).villain.name
    );
    expect(new Set(rolls).size).toBeGreaterThan(1);
  });

  it("every theme generates a complete packet at every timebox", () => {
    for (const theme of ALL_THEMES) {
      for (const timebox of ["2h", "3h", "4h"] as const) {
        const packet = generateOneShot({ ...baseInput, theme, timebox, seed: `x-${theme}-${timebox}` });
        expect(packet.title.length).toBeGreaterThan(0);
        expect(packet.hook.readAloud.length).toBeGreaterThan(40);
        expect(packet.scenes.length).toBe(timebox === "2h" ? 4 : timebox === "3h" ? 5 : 6);
        expect(packet.scenes[packet.scenes.length - 1].type).toBe("climax");
        expect(packet.scenes[packet.scenes.length - 1].encounter).toBeDefined();
        expect(packet.clues.length).toBe(8);
        expect(packet.npcs.length).toBe(3);
        expect(packet.map.rooms.filter((r) => r.key > 0).length).toBe(packet.scenes.length);
        expect(packet.tables.length).toBe(2);
        // No unfilled template slots should leak into player-facing text.
        const text = JSON.stringify(packet);
        expect(text).not.toMatch(/\{(villain|epithet|site|place|patron|tavern|monster|item|adj|noun)\}/);
        // Article collisions from interpolated proper nouns ("at the The Anvil").
        expect(text).not.toMatch(/\b[Tt]he The\b/);
      }
    }
  });

  it("keeps encounters within the DMG budget band", () => {
    for (const seed of ["m1", "m2", "m3", "m4"]) {
      for (const level of [1, 3, 5, 8, 11]) {
        const packet = generateOneShot({ ...baseInput, seed, level });
        for (const scene of packet.scenes) {
          if (!scene.encounter) continue;
          const ratio = scene.encounter.adjustedXP / scene.encounter.budget;
          // The builder targets [0.55, 1.35]; anchored fallbacks may undershoot.
          expect(ratio).toBeLessThan(1.6);
          expect(scene.encounter.totalXP).toBeGreaterThan(0);
          expect(scene.encounter.groups.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("climax includes the villain's stat block", () => {
    const packet = generateOneShot(baseInput);
    const climax = packet.scenes[packet.scenes.length - 1];
    expect(
      climax.encounter!.groups.some((g) => g.monster.name === packet.villain.stats.name)
    ).toBe(true);
  });

  it("never emits a scene whose requirements weren't set up by earlier scenes", () => {
    // Templates may declare provides/requires; verify selected adventures
    // honor them, by matching generated scene titles back to their templates.
    const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const titleMatches = (template: string, actual: string) =>
      new RegExp(`^${escapeRe(template).replace(/\\\{\w+\\\}/g, ".+")}$`).test(actual);

    for (const theme of ALL_THEMES) {
      const pack = THEME_PACKS[theme];
      const allTemplates = [
        ...pack.scenes.arrival,
        ...pack.scenes.middle,
        ...pack.scenes.revelation,
        ...pack.scenes.climax,
      ];
      for (let i = 0; i < 25; i++) {
        const packet = generateOneShot({ ...baseInput, theme, seed: `dep-${theme}-${i}` });
        const provided = new Set<string>();
        for (const scene of packet.scenes) {
          const template = allTemplates.find((t) => titleMatches(t.title, scene.title));
          expect(template, `template for "${scene.title}"`).toBeDefined();
          for (const req of template!.requires ?? []) {
            expect(provided.has(req), `"${scene.title}" requires "${req}"`).toBe(true);
          }
          (template!.provides ?? []).forEach((p) => provided.add(p));
        }
      }
    }
  });

  it("regression: no unconditional confession references (Reddit report, seed n0qwq5)", () => {
    // https://www.reddit.com/r/dndnext/comments/1v056gf/ — a climax referenced
    // a confession that a different revelation scene never introduced.
    for (let i = 0; i < 40; i++) {
      const packet = generateOneShot({
        seed: i === 0 ? "n0qwq5" : `conf-${i}`,
        theme: "Dungeon Crawl",
        level: 3,
        partySize: 5,
        difficulty: "Medium",
        timebox: "3h",
      });
      const text = JSON.stringify(packet);
      expect(text).not.toContain("You've read the confession");
      expect(text).not.toContain("per the confession");
      expect(text).not.toContain("thanks to the confession");
    }
  });

  it("map rooms never overlap", () => {
    for (const seed of ["r1", "r2", "r3", "r4", "r5"]) {
      const { map } = generateOneShot({ ...baseInput, seed });
      for (let i = 0; i < map.rooms.length; i++) {
        for (let j = i + 1; j < map.rooms.length; j++) {
          const a = map.rooms[i];
          const b = map.rooms[j];
          const separate =
            a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y;
          expect(separate).toBe(true);
        }
      }
      expect(map.corridors.length).toBeGreaterThan(0);
      expect(map.doors.length).toBeGreaterThan(0);
    }
  });
});

describe("encounter math (2014 DMG)", () => {
  it("computes party thresholds from the XP table", () => {
    expect(partyThreshold(5, 4, "Medium")).toBe(2000); // 500 × 4
    expect(partyThreshold(3, 4, "Deadly")).toBe(1600); // 400 × 4
    expect(partyThreshold(1, 5, "Easy")).toBe(125); // 25 × 5
    expect(partyThreshold(20, 4, "Deadly")).toBe(50800); // 12700 × 4
  });

  it("applies the monster-count multiplier with party-size adjustment", () => {
    expect(encounterMultiplier(1, 4)).toBe(1);
    expect(encounterMultiplier(2, 4)).toBe(1.5);
    expect(encounterMultiplier(3, 4)).toBe(2);
    expect(encounterMultiplier(6, 4)).toBe(2);
    expect(encounterMultiplier(7, 4)).toBe(2.5);
    expect(encounterMultiplier(11, 4)).toBe(3);
    expect(encounterMultiplier(15, 4)).toBe(4);
    expect(encounterMultiplier(1, 2)).toBe(1.5); // small party: next step up
    expect(encounterMultiplier(1, 6)).toBe(0.5); // large party: next step down
  });

  it("flags deadly CR totals via the lazy benchmark", () => {
    const troll = { name: "Troll", cr: "5", xp: 1800, type: "giant", ac: 15, hp: 84, speed: "30 ft.", attack: "", tags: [] };
    // Two trolls (CR 10 total) vs four level-3 characters: cap is 3 (12/4) — deadly.
    expect(lazyBenchmark([{ monster: troll, count: 2 }], 3, 4).deadly).toBe(true);
    // One troll vs four level-10 characters: cap is 20 — fine.
    expect(lazyBenchmark([{ monster: troll, count: 1 }], 10, 4).deadly).toBe(false);
  });
});
