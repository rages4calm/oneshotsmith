import type { Difficulty, OneShotInput, OneShotTheme, RerollSection, TimeBox } from "@oneshotsmith/core";
import { ALL_THEMES } from "@oneshotsmith/core";

// Adventure inputs round-trip through the URL so every generated module has a
// permanent, shareable address. Example:
//   /one-shot-generator?s=k3v9pq&t=heist&l=5&p=4&d=hard&tb=3h&r=villain:1,twist:2

const THEME_SLUGS: Record<string, OneShotTheme> = Object.fromEntries(
  ALL_THEMES.map((t) => [t.toLowerCase().replace(/\s+/g, "-"), t])
);

export function themeSlug(theme: OneShotTheme): string {
  return theme.toLowerCase().replace(/\s+/g, "-");
}

const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard", "Deadly"];
const TIMEBOXES: TimeBox[] = ["2h", "3h", "4h"];
const REROLL_SECTIONS: RerollSection[] = [
  "title", "hook", "villain", "npcs", "scenes", "twist", "treasure", "map", "tables",
];

export function inputToParams(input: OneShotInput): URLSearchParams {
  const params = new URLSearchParams();
  params.set("s", input.seed);
  params.set("t", themeSlug(input.theme));
  params.set("l", String(input.level));
  params.set("p", String(input.partySize));
  params.set("d", input.difficulty.toLowerCase());
  params.set("tb", input.timebox);
  const rerolls = Object.entries(input.rerolls ?? {}).filter(([, n]) => (n ?? 0) > 0);
  if (rerolls.length) {
    params.set("r", rerolls.map(([k, n]) => `${k}:${n}`).join(","));
  }
  return params;
}

export function paramsToInput(params: URLSearchParams): OneShotInput | null {
  const seed = params.get("s");
  if (!seed || !/^[a-z0-9]{1,16}$/i.test(seed)) return null;

  const theme = THEME_SLUGS[params.get("t") ?? ""] ?? "Dungeon Crawl";
  const level = Math.min(20, Math.max(1, Number(params.get("l")) || 3));
  const partySize = Math.min(7, Math.max(2, Number(params.get("p")) || 4));
  const dRaw = (params.get("d") ?? "medium").toLowerCase();
  const difficulty = DIFFICULTIES.find((x) => x.toLowerCase() === dRaw) ?? "Medium";
  const tbRaw = params.get("tb") ?? "3h";
  const timebox = TIMEBOXES.find((x) => x === tbRaw) ?? "3h";

  const rerolls: Partial<Record<RerollSection, number>> = {};
  const rRaw = params.get("r");
  if (rRaw) {
    for (const part of rRaw.split(",")) {
      const [k, n] = part.split(":");
      const section = REROLL_SECTIONS.find((x) => x === k);
      const count = Number(n);
      if (section && Number.isFinite(count) && count > 0 && count < 1000) {
        rerolls[section] = Math.floor(count);
      }
    }
  }

  return {
    seed: seed.toLowerCase(),
    theme,
    level,
    partySize,
    difficulty,
    timebox,
    rerolls: Object.keys(rerolls).length ? rerolls : undefined,
  };
}
