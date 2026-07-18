import type { Character, CharacterInput } from "../types";
import { mulberry32, hashString, pick, type Rng } from "../utils/random";
import { npcName } from "../data/names";

// Character generator (SRD 5.1 compliant). Role-based builds using the
// standard array, with seeded names and personality hooks.

const ROLE_RACE: Record<string, string> = {
  Frontliner: "human",
  Skirmisher: "lightfoot halfling",
  Support: "hill dwarf",
  Control: "high elf",
  Face: "half-elf",
};

const RACE_DISPLAY: Record<string, string> = {
  "human": "Human",
  "lightfoot halfling": "Lightfoot Halfling",
  "hill dwarf": "Hill Dwarf",
  "high elf": "High Elf",
  "half-elf": "Half-Elf",
};

const TRAITS = [
  "I face problems head-on. A simple, direct solution is the best path.",
  "I judge people by their actions, not their words.",
  "I have a joke for every occasion, especially occasions where a joke is a bad idea.",
  "I'm always polite and respectful — even to the people trying to kill us.",
  "Once I pick a goal, I become obsessed with it to the exclusion of meals and sleep.",
  "I keep meticulous notes about everything. Everything.",
  "I'm haunted by exactly one memory, and I sing to drown it out.",
  "Nothing can shake my optimistic attitude, which several people have described as 'alarming.'",
];

const BONDS = [
  "I owe my life to a stranger whose face I never saw. I pay the debt forward.",
  "My old company was wiped out. I carry the roster and visit the families.",
  "Someone back home believes I'm a hero. I intend to make that true.",
  "My mentor vanished mid-lesson. The lesson was 'how to disappear.'",
  "I still carry the key to a house that burned down.",
  "An oath binds me to protect someone who doesn't want protecting.",
];

const FLAWS = [
  "I can't resist a locked door, a sealed letter, or a 'do not touch' sign.",
  "I trust the plan long after the plan has stopped working.",
  "I'll bet on anything, and I am not good at betting.",
  "I'd rather take a hit than admit I need help.",
  "I lie when the truth would work better, just to stay in practice.",
  "Authority makes my skin itch, even when it's right.",
];

const TRINKETS = [
  "a brass compass that points at the nearest tavern",
  "a wooden soldier with a real, tiny steel sword",
  "one half of a friendship medallion, edge still sharp",
  "a preserved rose that smells of a place you've never been",
  "a deck of cards missing every queen",
  "a river stone with a perfect hole through it",
  "a tin whistle that dogs answer",
  "an old campaign medal from a war nobody remembers starting",
];

// Simplified character generator (SRD 5.1 compliant)
export function generateCharacter(input: CharacterInput): Character {
  const { level, role } = input;
  const rng: Rng = mulberry32(
    hashString(input.seed ?? `${Math.random()}`)
  );

  // Role-based ability score arrays (standard array: 15,14,13,12,10,8)
  const abilityArrays: Record<string, number[]> = {
    Frontliner: [15, 10, 14, 8, 12, 13], // STR, DEX, CON, INT, WIS, CHA
    Skirmisher: [8, 15, 12, 10, 13, 14], // DEX-focused
    Support: [8, 14, 12, 10, 15, 13],    // WIS-focused (Cleric)
    Control: [8, 14, 12, 15, 13, 10],    // INT-focused (Wizard)
    Face: [8, 12, 13, 10, 14, 15],       // CHA-focused (Bard)
  };

  const abilities = abilityArrays[role] || abilityArrays.Frontliner;

  // Simple proficiency bonus calculation
  const proficiencyBonus = level <= 4 ? 2 : level <= 8 ? 3 : 4;

  // Role-based class suggestions (SRD only)
  const classMap: Record<string, string> = {
    Frontliner: "Fighter",
    Skirmisher: "Rogue",
    Support: "Cleric",
    Control: "Wizard",
    Face: "Bard",
  };

  const racialBonuses: Record<string, number[]> = {
    Frontliner: [1, 1, 1, 1, 1, 1],
    Skirmisher: [0, 2, 0, 0, 0, 1],
    Support: [0, 0, 2, 0, 1, 0],
    Control: [0, 2, 0, 1, 0, 0],
    Face: [0, 1, 0, 0, 0, 2],
  };

  const selectedClass = input.class || classMap[role];
  const raceKey = ROLE_RACE[role] ?? "human";
  const selectedRace = input.race || RACE_DISPLAY[raceKey];
  const selectedBackground = input.background || pick(rng, ["Folk Hero", "Soldier", "Sage", "Acolyte", "Criminal", "Entertainer"]);

  // Apply racial bonuses
  const racialBonus = racialBonuses[role] || [0, 0, 0, 0, 0, 0];
  const finalAbilities = {
    STR: abilities[0] + racialBonus[0],
    DEX: abilities[1] + racialBonus[1],
    CON: abilities[2] + racialBonus[2],
    INT: abilities[3] + racialBonus[3],
    WIS: abilities[4] + racialBonus[4],
    CHA: abilities[5] + racialBonus[5],
  };

  // Calculate HP (simplified)
  const hitDice: Record<string, number> = {
    Fighter: 10,
    Rogue: 8,
    Cleric: 8,
    Wizard: 6,
    Bard: 8,
  };
  const hd = hitDice[selectedClass] || 8;
  const conMod = Math.floor((finalAbilities.CON - 10) / 2);
  const hp = hd + (level - 1) * (Math.floor(hd / 2) + 1) + conMod * level;

  // Calculate AC (simplified, assumes light armor for most)
  const dexMod = Math.floor((finalAbilities.DEX - 10) / 2);
  const ac = selectedClass === "Fighter" ? 16 : 12 + dexMod;

  const { name } = npcName(rng, raceKey);

  return {
    name,
    level,
    role,
    race: selectedRace,
    class: selectedClass,
    background: selectedBackground,
    abilities: finalAbilities,
    hp,
    ac,
    proficiencyBonus,
    skills: getRoleSkills(role),
    features: getClassFeatures(selectedClass, level),
    equipment: getStartingEquipment(selectedClass),
    spells: getSpells(selectedClass, level),
    tactics: getRoleTactics(role),
    trait: pick(rng, TRAITS),
    bond: pick(rng, BONDS),
    flaw: pick(rng, FLAWS),
    trinket: pick(rng, TRINKETS),
  };
}

function getRoleSkills(role: string): string[] {
  const skillMap: Record<string, string[]> = {
    Frontliner: ["Athletics", "Intimidation", "Perception"],
    Skirmisher: ["Stealth", "Acrobatics", "Perception", "Sleight of Hand"],
    Support: ["Medicine", "Insight", "Persuasion", "Religion"],
    Control: ["Arcana", "History", "Investigation", "Perception"],
    Face: ["Persuasion", "Deception", "Performance", "Insight"],
  };
  return skillMap[role] || [];
}

function getClassFeatures(className: string, level: number): string[] {
  const features: Record<string, string[]> = {
    Fighter: level >= 5 ? ["Second Wind", "Action Surge", "Extra Attack"] : ["Second Wind", "Action Surge"],
    Rogue: level >= 5 ? ["Sneak Attack (3d6)", "Cunning Action", "Uncanny Dodge"] : ["Sneak Attack (2d6)", "Cunning Action"],
    Cleric: ["Divine Domain", "Channel Divinity", "Turn Undead"],
    Wizard: ["Spellcasting", "Arcane Recovery", "School of Evocation"],
    Bard: ["Bardic Inspiration", "Jack of All Trades", "Song of Rest"],
  };
  return features[className] || [];
}

function getStartingEquipment(className: string): string[] {
  const equipment: Record<string, string[]> = {
    Fighter: ["Longsword", "Shield", "Chain Mail", "Backpack"],
    Rogue: ["Rapier", "Shortbow + 20 arrows", "Leather Armor", "Thieves' Tools"],
    Cleric: ["Mace", "Scale Mail", "Shield", "Holy Symbol"],
    Wizard: ["Quarterstaff", "Spellbook", "Component Pouch", "Scholar's Pack"],
    Bard: ["Rapier", "Lute", "Leather Armor", "Backpack"],
  };
  return equipment[className] || [];
}

function getSpells(className: string, level: number): string[] | undefined {
  const spellLists: Record<string, string[]> = {
    Cleric: level >= 5
      ? ["Sacred Flame", "Guidance", "Healing Word", "Bless", "Spiritual Weapon", "Spirit Guardians", "Revivify"]
      : ["Sacred Flame", "Guidance", "Healing Word", "Bless", "Cure Wounds", "Shield of Faith"],
    Wizard: level >= 5
      ? ["Fire Bolt", "Mage Hand", "Shield", "Magic Missile", "Misty Step", "Web", "Fireball", "Counterspell"]
      : ["Fire Bolt", "Mage Hand", "Shield", "Magic Missile", "Sleep", "Mage Armor"],
    Bard: level >= 5
      ? ["Vicious Mockery", "Minor Illusion", "Healing Word", "Faerie Fire", "Invisibility", "Hypnotic Pattern"]
      : ["Vicious Mockery", "Minor Illusion", "Healing Word", "Faerie Fire", "Dissonant Whispers"],
  };
  return spellLists[className];
}

function getRoleTactics(role: string): string[] {
  const tactics: Record<string, string[]> = {
    Frontliner: ["Stay in front, protect allies", "Use Action Surge for burst damage", "Second Wind when below half HP"],
    Skirmisher: ["Bonus action Dash/Disengage/Hide", "Fish for advantage for Sneak Attack", "Uncanny Dodge on big hits"],
    Support: ["Healing Word as bonus action", "Channel Divinity: Turn Undead in emergencies", "Stay behind the frontline"],
    Control: ["Maintain concentration on key spells", "Use Evocation to avoid friendly fire", "Stay at range"],
    Face: ["Bardic Inspiration to allies before big rolls", "Healing Word if support is down", "Use Vicious Mockery to debuff enemies"],
  };
  return tactics[role] || [];
}
