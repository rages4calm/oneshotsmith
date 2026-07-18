import type { OneShotTheme, SceneType } from "../../types";

// A ThemePack is the complete content library for one adventure theme. The
// generator mixes and matches its parts under a seeded RNG, so every entry
// must stand alone and combine cleanly with any other entry.
//
// Template strings may use these slots, filled at generation time:
//   {villain}   villain's full name          {epithet}  villain's epithet
//   {site}      adventure site name          {place}    nearby settlement name
//   {patron}    quest-giver NPC name         {tavern}   tavern name in {place}
//   {monster}   a signature monster name     {item}     signature magic item name
//
// Writing bar (matches published one-shot conventions):
//  - Read-aloud text: 2–4 sensory sentences. Never dictates what PCs do or feel.
//  - DM details: concrete and playable ("The ledger is fake — DC 13 Investigation
//    spots the fresh ink"), not vague vibes.
//  - Nothing referencing Product Identity (no beholders, mind flayers, named
//    settings). SRD-only monsters.

export interface SkillCheckTemplate {
  skill: string;
  tier: "easy" | "medium" | "hard";
  use: string;
}

export interface SkillChallengeTemplate {
  description: string;
  checks: SkillCheckTemplate[];
  success: string;
  failure: string;
}

export interface SceneTemplate {
  type: SceneType;
  title: string;
  readAloud: string;
  summary: string;
  details: string[];
  /** Required when type is combat/setpiece/climax. */
  combat?: { tactics: string; terrain: string };
  skill?: SkillChallengeTemplate;
}

export interface SiteTemplate {
  /** Site name patterns, e.g. "The Undervaults of {place}". */
  names: string[];
  description: string;
  /** Short labels for map rooms beyond the keyed scenes ("Flooded cell"). */
  roomLabels: string[];
  /** Combat terrain features used when building encounters here. */
  terrain: string[];
}

export interface HookTemplate {
  readAloud: string;
  summary: string;
}

export interface VillainTemplate {
  epithets: string[];
  motivation: string;
  plan: string;
  secret: string;
  mannerism: string;
  /** Override the theme's default boss tags for stat selection. */
  bossTags?: string[];
}

export interface ThemePack {
  theme: OneShotTheme;
  /** Classic module-code letter, e.g. "B" for dungeon modules. */
  moduleLetter: string;
  titlePatterns: string[];
  titleAdjectives: string[];
  titleNouns: string[];
  taglines: string[];
  sites: SiteTemplate[];
  hooks: HookTemplate[];
  /** One-line fallback hooks for reluctant parties. */
  hookAlternates: string[];
  villains: VillainTemplate[];
  twists: string[];
  /** Secrets & clues pool — one-liners the DM reveals anywhere. */
  cluePool: string[];
  /** Monster tag filters for regular encounters. */
  monsterTags: string[];
  /** Monster tag filters for the climax anchor. */
  bossTags: string[];
  scenes: {
    arrival: SceneTemplate[];
    middle: SceneTemplate[];
    revelation: SceneTemplate[];
    climax: SceneTemplate[];
  };
  /** d8 mid-session complications. */
  complications: string[];
  /** d10 sensory details for improvised description. */
  sensory: string[];
  /** What to cut when the session runs long. */
  cutAdvice: string[];
}

export const DC_BY_TIER: Record<"easy" | "medium" | "hard", (level: number) => number> = {
  easy: (level) => (level <= 4 ? 10 : level <= 10 ? 12 : 13),
  medium: (level) => (level <= 4 ? 13 : level <= 10 ? 14 : 15),
  hard: (level) => (level <= 4 ? 15 : level <= 10 ? 17 : 19),
};
