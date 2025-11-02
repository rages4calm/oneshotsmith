import type { Character } from "@oneshotsmith/core";

// VTT export adapters
export function exportToFoundry(character: Character): object {
  return {
    name: character.name,
    type: "character",
    system: {
      abilities: character.abilities,
      attributes: {
        hp: { value: character.hp, max: character.hp },
        ac: { value: character.ac },
      },
      details: {
        level: character.level,
        race: character.race,
        class: character.class,
        background: character.background,
      },
      skills: character.skills,
      traits: character.features,
    },
  };
}

export function exportToRoll20(character: Character): object {
  return {
    schema_version: 3,
    type: "character",
    character: {
      name: character.name,
      bio: `${character.race} ${character.class}`,
      attributes: [
        { name: "strength", current: character.abilities.STR },
        { name: "dexterity", current: character.abilities.DEX },
        { name: "constitution", current: character.abilities.CON },
        { name: "intelligence", current: character.abilities.INT },
        { name: "wisdom", current: character.abilities.WIS },
        { name: "charisma", current: character.abilities.CHA },
        { name: "hp", current: character.hp, max: character.hp },
        { name: "ac", current: character.ac },
      ],
    },
  };
}
