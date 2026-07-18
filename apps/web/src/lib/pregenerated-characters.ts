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
  {
    slug: "brother-tobin-of-the-lantern",
    name: "Brother Tobin of the Lantern",
    role: "Support",
    level: 3,
    concept: "Hill dwarf cleric of a wayfarers' order who believes no one should die in the dark — and carries enough lamp oil to enforce it.",
    highlights: [
      "Healing Word at range keeps the line standing",
      "Bless before the door opens, Spirit Guardians after",
      "Turn Undead makes crypt work almost relaxing",
    ],
  },
  {
    slug: "vessa-marchmain",
    name: "Vessa Marchmain",
    role: "Face",
    level: 5,
    concept: "Half-elf bard and disgraced court herald who knows exactly which secrets are worth a song — and which are worth more unsung.",
    highlights: [
      "Bardic Inspiration fuels the whole party's big rolls",
      "Hypnotic Pattern turns brawls into conversations",
      "Court etiquette, forgery, and three kinds of laugh",
    ],
  },
  {
    slug: "korga-emberfist",
    name: "Korga Emberfist",
    role: "Frontliner",
    level: 3,
    concept: "Half-orc soldier turned caravan guard who has personally carried every one of her charges home — some of them twice.",
    highlights: [
      "Second Wind and stubborn CON keep her standing",
      "Intimidation as a first language, Athletics as a second",
      "Action Surge saved for the round that matters",
    ],
  },
];
