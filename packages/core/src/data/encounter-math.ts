import type { Difficulty, EncounterPlan, Monster, MonsterGroup } from "../types";
import { crValue } from "./monsters";
import type { Rng } from "../utils/random";
import { pick, shuffle } from "../utils/random";

// D&D 5e (2014 DMG) XP thresholds per character level: [easy, medium, hard, deadly]
export const XP_THRESHOLDS: Record<number, [number, number, number, number]> = {
  1: [25, 50, 75, 100],
  2: [50, 100, 150, 200],
  3: [75, 150, 225, 400],
  4: [125, 250, 375, 500],
  5: [250, 500, 750, 1100],
  6: [300, 600, 900, 1400],
  7: [350, 750, 1100, 1700],
  8: [450, 900, 1400, 2100],
  9: [550, 1100, 1600, 2400],
  10: [600, 1200, 1900, 2800],
  11: [800, 1600, 2400, 3600],
  12: [1000, 2000, 3000, 4500],
  13: [1100, 2200, 3400, 5100],
  14: [1250, 2500, 3800, 5700],
  15: [1400, 2800, 4300, 6400],
  16: [1600, 3200, 4800, 7200],
  17: [2000, 3900, 5900, 8800],
  18: [2100, 4200, 6300, 9500],
  19: [2400, 4900, 7300, 10900],
  20: [2800, 5700, 8500, 12700],
};

// 2024 DMG XP budget per character: [low, moderate, high]
// (Included so the UI can show the revised numbers alongside the 2014 math.)
export const XP_BUDGET_2024: Record<number, [number, number, number]> = {
  1: [50, 75, 100],
  2: [100, 150, 200],
  3: [150, 225, 400],
  4: [250, 375, 500],
  5: [500, 750, 1100],
  6: [600, 1000, 1400],
  7: [750, 1300, 1700],
  8: [1000, 1700, 2100],
  9: [1300, 2000, 2600],
  10: [1600, 2300, 3100],
  11: [1900, 2900, 4100],
  12: [2200, 3700, 4700],
  13: [2600, 4200, 5400],
  14: [2900, 4900, 6200],
  15: [3300, 5400, 7800],
  16: [3800, 6100, 9800],
  17: [4500, 7200, 11700],
  18: [5000, 8700, 14200],
  19: [5500, 10700, 17200],
  20: [6400, 13200, 22000],
};

// 2014 DMG adventuring-day XP per character.
export const DAILY_XP: Record<number, number> = {
  1: 300, 2: 600, 3: 1200, 4: 1700, 5: 3500, 6: 4000, 7: 5000, 8: 6000,
  9: 7500, 10: 9000, 11: 10500, 12: 11500, 13: 13500, 14: 15000, 15: 18000,
  16: 20000, 17: 25000, 18: 27000, 19: 30000, 20: 40000,
};

const DIFFICULTY_INDEX: Record<Difficulty, number> = {
  Easy: 0,
  Medium: 1,
  Hard: 2,
  Deadly: 3,
};

export function partyThreshold(level: number, partySize: number, difficulty: Difficulty): number {
  const lvl = Math.min(20, Math.max(1, Math.round(level)));
  return XP_THRESHOLDS[lvl][DIFFICULTY_INDEX[difficulty]] * partySize;
}

export function partyBudget2024(level: number, partySize: number, difficulty: Difficulty): number {
  const lvl = Math.min(20, Math.max(1, Math.round(level)));
  // Map 2014 labels onto the 2024 tiers: Easy/Medium→Low, Hard→Moderate, Deadly→High.
  const idx = difficulty === "Deadly" ? 2 : difficulty === "Hard" ? 1 : 0;
  return XP_BUDGET_2024[lvl][idx] * partySize;
}

/**
 * 2014 DMG encounter multiplier. Steps: 1 → ×1, 2 → ×1.5, 3–6 → ×2,
 * 7–10 → ×2.5, 11–14 → ×3, 15+ → ×4. Parties smaller than 3 shift one step
 * up; parties of 6+ shift one step down.
 */
export function encounterMultiplier(monsterCount: number, partySize: number): number {
  const steps = [0.5, 1, 1.5, 2, 2.5, 3, 4, 5];
  let idx: number;
  if (monsterCount <= 1) idx = 1;
  else if (monsterCount === 2) idx = 2;
  else if (monsterCount <= 6) idx = 3;
  else if (monsterCount <= 10) idx = 4;
  else if (monsterCount <= 14) idx = 5;
  else idx = 6;
  if (partySize < 3) idx += 1;
  else if (partySize >= 6) idx -= 1;
  return steps[Math.min(steps.length - 1, Math.max(0, idx))];
}

export function adjustedXP(groups: MonsterGroup[], partySize: number): number {
  const count = groups.reduce((n, g) => n + g.count, 0);
  const raw = groups.reduce((n, g) => n + g.monster.xp * g.count, 0);
  return Math.round(raw * encounterMultiplier(count, partySize));
}

/**
 * Sly Flourish's Lazy Encounter Benchmark — a second opinion the XP math
 * famously gets wrong at the edges: an encounter may be deadly if the sum of
 * monster CRs exceeds 1/4 of the sum of character levels (1/2 at level 5+).
 */
export function lazyBenchmark(
  groups: MonsterGroup[],
  level: number,
  partySize: number
): { deadly: boolean; ratio: number } {
  const totalCR = groups.reduce((n, g) => n + crValue(g.monster.cr) * g.count, 0);
  const totalLevels = level * partySize;
  const cap = level >= 5 ? totalLevels / 2 : totalLevels / 4;
  return { deadly: totalCR > cap, ratio: cap > 0 ? totalCR / cap : 0 };
}

export function describeActualDifficulty(
  adjusted: number,
  level: number,
  partySize: number
): Difficulty | "Beyond Deadly" {
  const lvl = Math.min(20, Math.max(1, Math.round(level)));
  const [easy, medium, hard, deadly] = XP_THRESHOLDS[lvl].map((t) => t * partySize);
  if (adjusted < easy) return "Easy";
  if (adjusted < medium) return "Easy";
  if (adjusted < hard) return "Medium";
  if (adjusted < deadly) return "Hard";
  if (adjusted < deadly * 1.5) return "Deadly";
  return "Beyond Deadly";
}

interface BuildOptions {
  /** Candidate monsters, already filtered to the theme's palette. */
  palette: Monster[];
  level: number;
  partySize: number;
  difficulty: Difficulty;
  rng: Rng;
  /** Force this monster to appear (e.g. the villain in the climax). */
  anchor?: Monster;
  tactics: string;
  terrain: string;
}

/**
 * Build an encounter whose ADJUSTED XP lands within ~[0.72, 1.15] of the
 * party threshold. Tries several composition shapes (solo, pair, leader +
 * minions, horde) and keeps the best fit, so encounters vary in texture
 * rather than always being "N of the same thing".
 */
export function buildEncounter(opts: BuildOptions): EncounterPlan {
  const { palette, level, partySize, difficulty, rng, anchor } = opts;
  const budget = partyThreshold(level, partySize, difficulty);

  const fits = (m: Monster) => m.xp <= budget * 1.2 && m.xp >= 8;
  const usable = palette.filter(fits);
  const pool = usable.length > 0 ? usable : [...palette].sort((a, b) => a.xp - b.xp).slice(0, 3);

  const candidates: MonsterGroup[][] = [];

  // Shape 1: solo — the single monster closest to budget at ×1.
  if (!anchor) {
    const solo = [...pool].sort(
      (a, b) => Math.abs(a.xp - budget) - Math.abs(b.xp - budget)
    )[0];
    if (solo) candidates.push([{ monster: solo, count: 1 }]);
  }

  // Shape 2: anchor (or a leader) plus minions filling the remainder.
  const leader =
    anchor ??
    pick(rng, pool.filter((m) => m.tags.includes("leader") || m.tags.includes("boss")).slice(0, 8)
      .concat(pool.slice(-3)) // fall back to the strongest few
    );
  if (leader) {
    const minions = shuffle(rng, pool.filter((m) => m.xp <= leader.xp / 2 && m.name !== leader.name));
    for (const minion of minions.slice(0, 4)) {
      for (let count = 1; count <= 8; count++) {
        const groups: MonsterGroup[] = [
          { monster: leader, count: 1 },
          { monster: minion, count },
        ];
        candidates.push(groups);
      }
    }
    candidates.push([{ monster: leader, count: 1 }]);
    // Shape 2b: a pair of the leader.
    if (!anchor) candidates.push([{ monster: leader, count: 2 }]);
  }

  // Shape 3: homogeneous group of 2–8.
  for (const m of shuffle(rng, pool).slice(0, 5)) {
    for (let count = 2; count <= 8; count++) {
      candidates.push([{ monster: m, count }]);
    }
  }

  // Score: adjusted XP proximity to budget, must include anchor if given.
  let best: MonsterGroup[] | null = null;
  let bestScore = Infinity;
  for (const groups of candidates) {
    if (anchor && !groups.some((g) => g.monster.name === anchor.name)) continue;
    const adj = adjustedXP(groups, partySize);
    const ratio = adj / budget;
    if (ratio < 0.55 || ratio > 1.35) continue;
    // Prefer ratios near 0.95 and mildly prefer mixed composition.
    const mixBonus = groups.length > 1 ? -0.02 : 0;
    const score = Math.abs(ratio - 0.95) + mixBonus;
    if (score < bestScore) {
      bestScore = score;
      best = groups;
    }
  }

  // Fallback: anchor alone, or the closest solo even if out of band.
  if (!best) {
    best = anchor
      ? [{ monster: anchor, count: 1 }]
      : [{ monster: [...pool].sort((a, b) => Math.abs(a.xp - budget) - Math.abs(b.xp - budget))[0], count: 1 }];
  }

  const totalXP = best.reduce((n, g) => n + g.monster.xp * g.count, 0);
  const adj = adjustedXP(best, partySize);
  const count = best.reduce((n, g) => n + g.count, 0);

  return {
    groups: best,
    totalXP,
    adjustedXP: adj,
    budget,
    multiplier: encounterMultiplier(count, partySize),
    targetDifficulty: difficulty,
    tactics: opts.tactics,
    terrain: opts.terrain,
  };
}
