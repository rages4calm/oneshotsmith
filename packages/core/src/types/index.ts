// Core type definitions

export type Role = "Frontliner" | "Skirmisher" | "Support" | "Control" | "Face";

export type CharacterLevel = 3 | 5 | 8;

export interface Ability {
  STR: number;
  DEX: number;
  CON: number;
  INT: number;
  WIS: number;
  CHA: number;
}

export interface Character {
  id?: string;
  name: string;
  level: CharacterLevel;
  role: Role;
  race: string;
  class: string;
  background: string;
  abilities: Ability;
  hp: number;
  ac: number;
  proficiencyBonus: number;
  skills: string[];
  features: string[];
  equipment: string[];
  spells?: string[];
  tactics: string[];
  /** Personality hooks so a pregen feels like a person, not a stat line. */
  trait?: string;
  bond?: string;
  flaw?: string;
  trinket?: string;
}

export interface CharacterInput {
  level: CharacterLevel;
  role: Role;
  race?: string;
  class?: string;
  background?: string;
  seed?: string;
}

// ---------------------------------------------------------------------------
// One-shot adventure generation
// ---------------------------------------------------------------------------

export type OneShotTheme =
  | "Dungeon Crawl"
  | "Heist"
  | "Rescue"
  | "Haunting"
  | "Wilderness"
  | "Mystery";

export type Difficulty = "Easy" | "Medium" | "Hard" | "Deadly";
export type TimeBox = "2h" | "3h" | "4h";

/** Sections that can be re-rolled independently without disturbing the rest. */
export type RerollSection =
  | "title"
  | "hook"
  | "villain"
  | "npcs"
  | "scenes"
  | "twist"
  | "treasure"
  | "map"
  | "tables";

export interface OneShotInput {
  /** Base36 seed — same seed + settings always produces the same adventure. */
  seed: string;
  theme: OneShotTheme;
  /** Party level, 1–20. */
  level: number;
  /** Number of player characters, 2–7. */
  partySize: number;
  difficulty: Difficulty;
  timebox: TimeBox;
  /** Per-section re-roll counters (absent = 0). */
  rerolls?: Partial<Record<RerollSection, number>>;
}

/** A monster entry from the SRD 5.1 bestiary data. */
export interface Monster {
  name: string;
  /** Challenge rating as printed: "1/4", "3", … */
  cr: string;
  xp: number;
  type: string;
  ac: number;
  hp: number;
  speed: string;
  /** One-line signature attack, e.g. "Scimitar +4 (1d6+2 slashing)". */
  attack: string;
  /** One-line trait or tactic worth remembering at the table. */
  note?: string;
  /** Palette tags: "undead", "guard", "beast", "boss", "caster", "minion"… */
  tags: string[];
}

export interface MonsterGroup {
  monster: Monster;
  count: number;
}

export interface EncounterPlan {
  groups: MonsterGroup[];
  /** Sum of monster XP, unadjusted. */
  totalXP: number;
  /** XP after the DMG encounter multiplier for monster count & party size. */
  adjustedXP: number;
  /** The party's XP threshold this encounter was built against. */
  budget: number;
  multiplier: number;
  targetDifficulty: Difficulty;
  tactics: string;
  terrain: string;
}

export interface SkillCheck {
  skill: string;
  dc: number;
  use: string;
}

export interface SkillChallenge {
  description: string;
  checks: SkillCheck[];
  success: string;
  failure: string;
}

export type SceneType =
  | "arrival"
  | "social"
  | "exploration"
  | "skill"
  | "combat"
  | "setpiece"
  | "climax";

export interface Scene {
  id: string;
  /** Map key number (1-based). 0 = not tied to a room. */
  key: number;
  title: string;
  type: SceneType;
  /** Boxed text to read to the players when the scene opens. */
  readAloud?: string;
  /** One-paragraph DM overview of the scene. */
  summary: string;
  /** Bulleted DM notes: what's here, what happens, what can go wrong. */
  details: string[];
  encounter?: EncounterPlan;
  skillChallenge?: SkillChallenge;
  /** A clue planted in this scene that foreshadows the twist or villain. */
  clue?: string;
  /** Suggested minutes at the table. */
  minutes: number;
  /** True if this scene can be skipped when running behind schedule. */
  cuttable?: boolean;
  /**
   * Connective tissue read before this scene opens: how the party gets here
   * from the previous scene, built from the map's real geometry. Absent on
   * the first scene (the hook delivers the party there).
   */
  transition?: string;
}

export interface Villain {
  name: string;
  epithet: string;
  motivation: string;
  plan: string;
  secret: string;
  mannerism: string;
  /** Stat block used when the villain is fought. */
  stats: Monster;
}

export interface NPCProfile {
  name: string;
  ancestry: string;
  occupation: string;
  appearance: string;
  mannerism: string;
  /** How to voice them at the table. */
  voice: string;
  goal: string;
  secret: string;
}

export interface MagicItem {
  name: string;
  rarity: "common" | "uncommon" | "rare" | "very rare";
  attunement: boolean;
  description: string;
}

export interface RandomTable {
  title: string;
  die: string;
  entries: string[];
}

// --- Dungeon map -----------------------------------------------------------

export interface MapRoom {
  /** Grid cell coordinates (top-left) and size in cells. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Key number shown in the circled label; matches Scene.key. */
  key: number;
  /** Short label for the map legend, e.g. "Guard post". */
  label: string;
  shape: "rect" | "round";
  /** Decorative feature drawn inside the room. */
  feature?: "columns" | "water" | "dais" | "rubble" | "stairs";
}

export interface MapDoor {
  x: number;
  y: number;
  orientation: "h" | "v";
  secret?: boolean;
}

export interface DungeonMap {
  gridW: number;
  gridH: number;
  rooms: MapRoom[];
  /** Corridor cells (1 cell wide). */
  corridors: Array<{ x: number; y: number }>;
  doors: MapDoor[];
  /** Cell just outside the entrance room where the party enters. */
  entrance: { x: number; y: number };
  title: string;
}

// --- The generated packet --------------------------------------------------

export interface PacingSegment {
  label: string;
  minutes: number;
  note: string;
}

export interface OneShotPacket {
  version: 2;
  input: OneShotInput;
  /** Classic module code, e.g. "H7". */
  moduleCode: string;
  title: string;
  tagline: string;
  /** DM-facing overview of the whole adventure. */
  synopsis: string;
  hook: {
    /** Boxed text that opens the session. */
    readAloud: string;
    summary: string;
    /** Two alternate ways to hook a reluctant party. */
    alternates: string[];
  };
  location: {
    name: string;
    description: string;
  };
  /** World dressing referenced across the text (optional in pre-existing saves). */
  world?: {
    settlement: string;
    tavern: string;
  };
  villain: Villain;
  npcs: NPCProfile[];
  scenes: Scene[];
  /** Secrets & clues the party can discover in any order (Lazy DM style). */
  clues: string[];
  twist: string;
  map: DungeonMap;
  treasure: {
    parcels: string[];
    signatureItem: MagicItem;
  };
  scaling: {
    weaker: string;
    stronger: string;
  };
  /** What to cut when running behind. */
  cutList: string[];
  /**
   * A ready-to-drop extra scene from the unused pool, for tables running
   * ahead of schedule. Not keyed to the map (key 0). Optional in old saves.
   */
  spareScene?: Scene;
  tables: RandomTable[];
  pacing: PacingSegment[];
  /** Total XP across all encounters, and per-character share. */
  xpSummary: { total: number; perCharacter: number };
}

// ---------------------------------------------------------------------------
// Legacy v1 packet shape (kept for old saved adventures in localStorage)
// ---------------------------------------------------------------------------

export interface LegacyEncounter {
  name: string;
  description: string;
  monsters: string[];
  terrain: string;
  xp: number;
}

export interface LegacyNPC {
  name: string;
  description: string;
  goal: string;
  quirk: string;
}

export interface LegacyOneShotPacket {
  title: string;
  hook: string;
  actOne: string;
  actTwo: string;
  actThree: string;
  twist: string;
  finale: string;
  encounters: LegacyEncounter[];
  npcs: LegacyNPC[];
  keyItem: string;
  treasureParcels: string[];
}

export interface RulesetPlugin {
  id: string;
  name: string;
  version: string;
  generateCharacter(input: CharacterInput): Promise<Character>;
  generateOneShot(input: OneShotInput): Promise<OneShotPacket>;
  srdProvider?: () => AsyncIterable<SRDDocument>;
}

export interface SRDDocument {
  id: string;
  type: "race" | "class" | "feature" | "spell" | "monster" | "item";
  slug: string;
  title: string;
  content: unknown;
}
