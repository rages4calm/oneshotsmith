import type { Character } from "@oneshotsmith/core";

export interface StoredCharacter extends Character {
  id: string;
  savedAt: string;
  label?: string;
  source?: "generated" | "pregen" | "imported";
  pregenSlug?: string;
}

export const CHARACTER_STORAGE_KEY = "oneshotsmith:saved-characters";
export const LAST_LOADED_CHARACTER_KEY = "oneshotsmith:last-loaded-character";

const FALLBACK_ARRAY: StoredCharacter[] = [];

export function readStoredCharacters(): StoredCharacter[] {
  if (typeof window === "undefined") return FALLBACK_ARRAY;
  try {
    const raw = window.localStorage.getItem(CHARACTER_STORAGE_KEY);
    if (!raw) return FALLBACK_ARRAY;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return FALLBACK_ARRAY;
    return parsed.filter(isStoredCharacter);
  } catch {
    return FALLBACK_ARRAY;
  }
}

export function writeStoredCharacters(characters: StoredCharacter[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CHARACTER_STORAGE_KEY, JSON.stringify(characters));
  } catch {
    // ignore quota errors
  }
}

export function rememberLastLoadedCharacter(id: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (id) {
      window.localStorage.setItem(LAST_LOADED_CHARACTER_KEY, id);
    } else {
      window.localStorage.removeItem(LAST_LOADED_CHARACTER_KEY);
    }
  } catch {
    // ignore
  }
}

export function readLastLoadedCharacter(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(LAST_LOADED_CHARACTER_KEY);
  } catch {
    return null;
  }
}

function isStoredCharacter(candidate: unknown): candidate is StoredCharacter {
  if (!candidate || typeof candidate !== "object") return false;
  const obj = candidate as Record<string, unknown>;
  return (
    typeof obj.id === "string" &&
    typeof obj.savedAt === "string" &&
    typeof obj.name === "string" &&
    typeof obj.level === "number" &&
    typeof obj.role === "string"
  );
}

export function formatCharacterSummary(
  character: Character,
  options?: { concept?: string; highlights?: string[] }
): string {
  const {
    name,
    role,
    level,
    race,
    class: characterClass,
    background,
    hp,
    ac,
    proficiencyBonus,
    abilities,
    features,
    equipment,
    spells,
    tactics,
  } = character;

  const summaryLines: string[] = [
    "OneShotsmith Character Summary",
    `Name: ${name || `${role} ${characterClass}`}`,
    `Role: ${role} • Level ${level}`,
    `Race / Class: ${race} ${characterClass}`,
    `Background: ${background}`,
    `HP ${hp} • AC ${ac} • Proficiency +${proficiencyBonus}`,
  ];

  if (options?.concept) {
    summaryLines.push("", "Concept:", `- ${options.concept}`);
  }

  if (options?.highlights && options.highlights.length > 0) {
    summaryLines.push(
      "",
      "Signature Highlights:",
      ...options.highlights.map((highlight) => `- ${highlight}`)
    );
  }

  summaryLines.push(
    "",
    "Ability Scores:",
    ...Object.entries(abilities).map(([ability, score]) => `- ${ability}: ${score}`),
    "",
    "Features:",
    ...features.map((feature) => `- ${feature}`),
    "",
    "Equipment:",
    ...equipment.map((item) => `- ${item}`)
  );

  if (spells && spells.length > 0) {
    summaryLines.push("", "Spells Prepared:", ...spells.map((spell) => `- ${spell}`));
  }

  summaryLines.push("", "Tactics:", ...tactics.map((tactic) => `- ${tactic}`));

  return summaryLines.join("\n");
}
