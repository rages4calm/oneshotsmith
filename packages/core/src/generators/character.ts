import type { Character, CharacterInput } from "../types";

// Simplified character generator (SRD 5.1 compliant)
export function generateCharacter(input: CharacterInput): Character {
  const { level, role } = input;

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

  const raceMap: Record<string, { race: string; abilityBonus: number[] }> = {
    Frontliner: { race: "Human", abilityBonus: [1, 1, 1, 1, 1, 1] },
    Skirmisher: { race: "Lightfoot Halfling", abilityBonus: [0, 2, 0, 0, 0, 1] },
    Support: { race: "Hill Dwarf", abilityBonus: [0, 0, 2, 0, 1, 0] },
    Control: { race: "High Elf", abilityBonus: [0, 2, 0, 1, 0, 0] },
    Face: { race: "Half-Elf", abilityBonus: [0, 1, 0, 0, 0, 2] },
  };

  const selectedClass = input.class || classMap[role];
  const selectedRace = input.race || raceMap[role].race;
  const selectedBackground = input.background || "Folk Hero";

  // Apply racial bonuses
  const racialBonus = raceMap[role]?.abilityBonus || [0, 0, 0, 0, 0, 0];
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

  // Generate a random name
  const firstNames = ["Kara", "Theron", "Lira", "Aldric", "Mira", "Bram"];
  const lastNames = ["Quickstep", "Ironheart", "Brightwind", "Stoneforge", "Shadowmoon", "Wildfire"];
  const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;

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
    tactics: getRoleTactics(role),
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
