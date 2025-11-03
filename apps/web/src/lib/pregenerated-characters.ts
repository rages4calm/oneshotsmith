import type { CharacterLevel, Role } from "@oneshotsmith/core";

export interface PregenSummary {
  slug: string;
  name: string;
  role: Role;
  level: CharacterLevel;
  concept: string;
  highlights: string[];
}

export const pregeneratedCharacters: PregenSummary[] = [
  {
    slug: "ser-caldor-brightshield",
    name: "Ser Caldor Brightshield",
    role: "Frontliner",
    level: 5,
    concept: "Lawful good human paladin who swore an oath to protect frontier villages from marauding cultists.",
    highlights: [
      "Sacred Weapon smites and Aura of Protection for team saves",
      "Heavy armor with Sentinel feat keeps foes locked in melee",
      "Lay on Hands burst heals and condition removal",
    ],
  },
  {
    slug: "mistress-nyla-quickstep",
    name: "Mistress Nyla Quickstep",
    role: "Skirmisher",
    level: 3,
    concept: "Halfling rogue who moonlights as a circus acrobat and infiltrator-for-hire.",
    highlights: [
      "Reliable bonus action Cunning Action for mobility",
      "Shortbow sneak attacks and darting melee flanks",
      "Thieves' tools expertise for every dungeon crawl",
    ],
  },
  {
    slug: "professor-elowen-thaum",
    name: "Professor Elowen Thaum",
    role: "Control",
    level: 8,
    concept: "Half-elf wizard who catalogs planar anomalies and manipulates enemy positioning.",
    highlights: [
      "Wall spells, Slow, and Hypnotic Pattern prepared",
      "Arcane Ward temp HP absorbs early hits",
      "Teleportation circle notes for fast scene transitions",
    ],
  },
];
