import { describe, it, expect } from "vitest";
import { generateCharacter } from "./character";

describe("generateCharacter", () => {
  it("should generate a valid Frontliner character at level 3", () => {
    const character = generateCharacter({
      level: 3,
      role: "Frontliner",
    });

    expect(character).toBeDefined();
    expect(character.level).toBe(3);
    expect(character.role).toBe("Frontliner");
    expect(character.class).toBe("Fighter");
    expect(character.hp).toBeGreaterThan(0);
    expect(character.ac).toBeGreaterThan(0);
    expect(character.proficiencyBonus).toBe(2);
  });

  it("should generate a valid Skirmisher character at level 5", () => {
    const character = generateCharacter({
      level: 5,
      role: "Skirmisher",
    });

    expect(character).toBeDefined();
    expect(character.level).toBe(5);
    expect(character.role).toBe("Skirmisher");
    expect(character.class).toBe("Rogue");
    expect(character.proficiencyBonus).toBe(3);
    expect(character.features).toContain("Sneak Attack (3d6)");
  });

  it("should generate a character with valid ability scores", () => {
    const character = generateCharacter({
      level: 3,
      role: "Support",
    });

    expect(character.abilities.STR).toBeGreaterThanOrEqual(8);
    expect(character.abilities.DEX).toBeGreaterThanOrEqual(8);
    expect(character.abilities.CON).toBeGreaterThanOrEqual(8);
    expect(character.abilities.INT).toBeGreaterThanOrEqual(8);
    expect(character.abilities.WIS).toBeGreaterThanOrEqual(8);
    expect(character.abilities.CHA).toBeGreaterThanOrEqual(8);
  });

  it("should assign appropriate skills for role", () => {
    const character = generateCharacter({
      level: 3,
      role: "Face",
    });

    expect(character.skills).toContain("Persuasion");
    expect(character.skills.length).toBeGreaterThan(0);
  });

  it("should assign appropriate equipment", () => {
    const character = generateCharacter({
      level: 3,
      role: "Control",
    });

    expect(character.equipment.length).toBeGreaterThan(0);
    expect(character.class).toBe("Wizard");
    expect(character.equipment).toContain("Spellbook");
  });
});
