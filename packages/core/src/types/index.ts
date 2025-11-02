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
}

export interface CharacterInput {
  level: CharacterLevel;
  role: Role;
  race?: string;
  class?: string;
  background?: string;
}

export type OneShotTheme = "Heist" | "Rescue" | "Dungeon Sprint" | "Horror-Lite" | "Travel Gauntlet";
export type Difficulty = "Easy" | "Medium" | "Hard" | "Deadly";
export type TimeBox = "2h" | "3h" | "4h";

export interface OneShotInput {
  level: CharacterLevel;
  timebox: TimeBox;
  theme: OneShotTheme;
  difficulty: Difficulty;
}

export interface Encounter {
  name: string;
  description: string;
  monsters: string[];
  terrain: string;
  xp: number;
}

export interface NPC {
  name: string;
  description: string;
  goal: string;
  quirk: string;
}

export interface OneShotPacket {
  title: string;
  hook: string;
  actOne: string;
  actTwo: string;
  actThree: string;
  twist: string;
  finale: string;
  encounters: Encounter[];
  npcs: NPC[];
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
  content: any;
}
