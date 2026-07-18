import type { Monster } from "../types";

// SRD 5.1 bestiary (CC-BY-4.0). Names, CRs, XP, and stat lines are from the
// System Reference Document 5.1 — no Product Identity creatures.
//
// Tags drive theme palettes:
//   role:   minion | soldier | brute | leader | caster | skirmisher | boss
//   family: humanoid | undead | beast | giant | dragon | construct | monstrosity | ooze | fiendlike | elemental | fey
//   venue:  dungeon | crypt | wilds | urban | manor | anywhere

export const MONSTERS: Monster[] = [
  { name: "Commoner", cr: "0", xp: 10, type: "humanoid", ac: 10, hp: 4, speed: "30 ft.", attack: "Club +2 (1d4 bludgeoning)", tags: ["minion", "humanoid", "urban", "anywhere"] },
  { name: "Giant Rat", cr: "1/8", xp: 25, type: "beast", ac: 12, hp: 7, speed: "30 ft.", attack: "Bite +4 (1d4+2 piercing)", note: "Pack Tactics: advantage when an ally is adjacent.", tags: ["minion", "beast", "dungeon", "urban", "crypt"] },
  { name: "Kobold", cr: "1/8", xp: 25, type: "humanoid", ac: 12, hp: 5, speed: "30 ft.", attack: "Dagger +4 (1d4+2 piercing) or sling +4", note: "Pack Tactics; Sunlight Sensitivity.", tags: ["minion", "humanoid", "dungeon", "wilds"] },
  { name: "Bandit", cr: "1/8", xp: 25, type: "humanoid", ac: 12, hp: 11, speed: "30 ft.", attack: "Scimitar +3 (1d6+1 slashing) or light crossbow +3", tags: ["minion", "humanoid", "urban", "wilds", "anywhere"] },
  { name: "Cultist", cr: "1/8", xp: 25, type: "humanoid", ac: 12, hp: 9, speed: "30 ft.", attack: "Scimitar +3 (1d6+1 slashing)", note: "Dark Devotion: advantage vs. charm and fear.", tags: ["minion", "humanoid", "dungeon", "manor", "urban", "anywhere"] },
  { name: "Stirge", cr: "1/8", xp: 25, type: "beast", ac: 14, hp: 2, speed: "10 ft., fly 40 ft.", attack: "Blood Drain +5 (1d4+3, attaches)", tags: ["minion", "beast", "wilds", "dungeon", "crypt"] },
  { name: "Goblin", cr: "1/4", xp: 50, type: "humanoid", ac: 15, hp: 7, speed: "30 ft.", attack: "Scimitar +4 (1d6+2 slashing) or shortbow +4", note: "Nimble Escape: Disengage or Hide as a bonus action.", tags: ["minion", "humanoid", "dungeon", "wilds"] },
  { name: "Skeleton", cr: "1/4", xp: 50, type: "undead", ac: 13, hp: 13, speed: "30 ft.", attack: "Shortsword +4 (1d6+2 piercing) or shortbow +4", note: "Vulnerable to bludgeoning damage.", tags: ["minion", "undead", "crypt", "dungeon", "manor"] },
  { name: "Zombie", cr: "1/4", xp: 50, type: "undead", ac: 8, hp: 22, speed: "20 ft.", attack: "Slam +3 (1d6+1 bludgeoning)", note: "Undead Fortitude: drops to 1 HP instead of 0 on a failed save.", tags: ["minion", "undead", "crypt", "manor", "dungeon"] },
  { name: "Wolf", cr: "1/4", xp: 50, type: "beast", ac: 13, hp: 11, speed: "40 ft.", attack: "Bite +4 (2d4+2 piercing, DC 11 STR or prone)", note: "Pack Tactics.", tags: ["minion", "beast", "wilds"] },
  { name: "Acolyte", cr: "1/4", xp: 50, type: "humanoid", ac: 10, hp: 9, speed: "30 ft.", attack: "Club +2 (1d4 bludgeoning); casts bless, cure wounds", tags: ["minion", "caster", "humanoid", "urban", "manor"] },
  { name: "Giant Spider", cr: "1", xp: 200, type: "beast", ac: 14, hp: 26, speed: "30 ft., climb 30 ft.", attack: "Bite +5 (1d8+3 + 2d8 poison, DC 11)", note: "Web (recharge 5–6): restrains at range.", tags: ["soldier", "beast", "dungeon", "wilds", "crypt"] },
  { name: "Orc", cr: "1/2", xp: 100, type: "humanoid", ac: 13, hp: 15, speed: "30 ft.", attack: "Greataxe +5 (1d12+3 slashing)", note: "Aggressive: bonus-action move toward a hostile.", tags: ["soldier", "humanoid", "dungeon", "wilds"] },
  { name: "Hobgoblin", cr: "1/2", xp: 100, type: "humanoid", ac: 18, hp: 11, speed: "30 ft.", attack: "Longsword +3 (1d8+1 slashing)", note: "Martial Advantage: +2d6 when an ally is adjacent to the target.", tags: ["soldier", "humanoid", "dungeon"] },
  { name: "Shadow", cr: "1/2", xp: 100, type: "undead", ac: 12, hp: 16, speed: "40 ft.", attack: "Strength Drain +4 (2d6+2 necrotic + 1d4 STR loss)", note: "Amorphous; weak in sunlight. Reduce a victim's STR to 0 and it dies.", tags: ["skirmisher", "undead", "crypt", "manor", "dungeon"] },
  { name: "Worg", cr: "1/2", xp: 100, type: "monstrosity", ac: 13, hp: 26, speed: "50 ft.", attack: "Bite +5 (2d6+3 piercing, DC 13 STR or prone)", tags: ["soldier", "beast", "wilds"] },
  { name: "Guard", cr: "1/8", xp: 25, type: "humanoid", ac: 16, hp: 11, speed: "30 ft.", attack: "Spear +3 (1d6+1 piercing)", tags: ["minion", "humanoid", "urban", "manor"] },
  { name: "Thug", cr: "1/2", xp: 100, type: "humanoid", ac: 11, hp: 32, speed: "30 ft.", attack: "Mace +4 (1d6+2 bludgeoning), multiattack ×2", note: "Pack Tactics.", tags: ["soldier", "humanoid", "urban", "manor"] },
  { name: "Scout", cr: "1/2", xp: 100, type: "humanoid", ac: 13, hp: 16, speed: "30 ft.", attack: "Longbow +4 (1d8+2 piercing), multiattack ×2", note: "Keen Hearing and Sight.", tags: ["skirmisher", "humanoid", "wilds", "urban"] },
  { name: "Bugbear", cr: "1", xp: 200, type: "humanoid", ac: 16, hp: 27, speed: "30 ft.", attack: "Morningstar +4 (2d8+2 piercing)", note: "Surprise Attack: +2d6 on surprised targets.", tags: ["soldier", "humanoid", "dungeon", "wilds"] },
  { name: "Dire Wolf", cr: "1", xp: 200, type: "beast", ac: 14, hp: 37, speed: "50 ft.", attack: "Bite +5 (2d6+3 piercing, DC 13 STR or prone)", note: "Pack Tactics.", tags: ["soldier", "beast", "wilds"] },
  { name: "Ghoul", cr: "1", xp: 200, type: "undead", ac: 12, hp: 22, speed: "30 ft.", attack: "Claws +4 (2d4+2 slashing, DC 10 CON or paralyzed 1 min)", tags: ["soldier", "undead", "crypt", "dungeon", "manor"] },
  { name: "Specter", cr: "1", xp: 200, type: "undead", ac: 12, hp: 22, speed: "fly 50 ft. (hover)", attack: "Life Drain +4 (3d6 necrotic, DC 10 CON or max HP reduced)", note: "Incorporeal Movement: passes through walls.", tags: ["skirmisher", "undead", "crypt", "manor"] },
  { name: "Spy", cr: "1", xp: 200, type: "humanoid", ac: 12, hp: 27, speed: "30 ft.", attack: "Shortsword +4 (1d6+2 piercing), multiattack ×2", note: "Sneak Attack +2d6; Cunning Action.", tags: ["skirmisher", "humanoid", "urban", "manor"] },
  { name: "Animated Armor", cr: "1", xp: 200, type: "construct", ac: 18, hp: 33, speed: "25 ft.", attack: "Slam +4 (1d6+2 bludgeoning), multiattack ×2", note: "Looks like a decorative suit of armor until it moves.", tags: ["soldier", "construct", "manor", "dungeon"] },
  { name: "Ogre", cr: "2", xp: 450, type: "giant", ac: 11, hp: 59, speed: "40 ft.", attack: "Greatclub +6 (2d8+4 bludgeoning)", tags: ["brute", "giant", "wilds", "dungeon"] },
  { name: "Mimic", cr: "2", xp: 450, type: "monstrosity", ac: 12, hp: 58, speed: "15 ft.", attack: "Pseudopod +5 (1d8+3 + adhesive grapple)", note: "Disguised as a chest, door, or furnishing.", tags: ["brute", "monstrosity", "dungeon", "manor", "crypt"] },
  { name: "Gelatinous Cube", cr: "2", xp: 450, type: "ooze", ac: 6, hp: 84, speed: "15 ft.", attack: "Pseudopod +4 (3d6 acid); Engulf (DC 12 DEX)", note: "Transparent: DC 15 Perception to spot before walking into it.", tags: ["brute", "ooze", "dungeon"] },
  { name: "Bandit Captain", cr: "2", xp: 450, type: "humanoid", ac: 15, hp: 65, speed: "30 ft.", attack: "Scimitar +5 (1d6+3 slashing), multiattack ×3", note: "Parry reaction: +2 AC vs. one melee attack.", tags: ["leader", "humanoid", "urban", "wilds", "anywhere"] },
  { name: "Cult Fanatic", cr: "2", xp: 450, type: "humanoid", ac: 13, hp: 33, speed: "30 ft.", attack: "Dagger +4 (1d4+2), multiattack ×2; casts hold person, inflict wounds", tags: ["leader", "caster", "humanoid", "dungeon", "manor", "anywhere"] },
  { name: "Ghast", cr: "2", xp: 450, type: "undead", ac: 13, hp: 36, speed: "30 ft.", attack: "Claws +5 (2d6+3 slashing, DC 10 CON or paralyzed)", note: "Stench: DC 10 CON within 5 ft. or poisoned.", tags: ["leader", "undead", "crypt", "dungeon"] },
  { name: "Priest", cr: "2", xp: 450, type: "humanoid", ac: 13, hp: 27, speed: "25 ft.", attack: "Mace +2 (1d6); casts spirit guardians, cure wounds", tags: ["caster", "leader", "humanoid", "urban", "manor"] },
  { name: "Will-o'-Wisp", cr: "2", xp: 450, type: "undead", ac: 19, hp: 22, speed: "fly 50 ft. (hover)", attack: "Shock +4 (2d8 lightning)", note: "Invisibility; lures travelers into hazards.", tags: ["skirmisher", "undead", "wilds", "crypt"] },
  { name: "Wight", cr: "3", xp: 700, type: "undead", ac: 14, hp: 45, speed: "30 ft.", attack: "Longsword +4 (1d8+2), ×2; Life Drain +4 (1d6+2 necrotic, DC 13)", note: "Slain humanoids rise as zombies under its command.", tags: ["leader", "undead", "crypt", "dungeon"] },
  { name: "Werewolf", cr: "3", xp: 700, type: "humanoid", ac: 12, hp: 58, speed: "30 ft. (40 ft. wolf)", attack: "Claws +4 (2d4+2) + Bite (DC 12 CON or cursed)", note: "Immune to nonmagical, nonsilvered weapons.", tags: ["brute", "monstrosity", "wilds", "manor", "urban"] },
  { name: "Minotaur", cr: "3", xp: 700, type: "monstrosity", ac: 14, hp: 76, speed: "40 ft.", attack: "Greataxe +6 (2d12+4 slashing); Charge +6 (2d8+4 + push)", note: "Labyrinthine Recall: never lost.", tags: ["brute", "monstrosity", "dungeon"] },
  { name: "Owlbear", cr: "3", xp: 700, type: "monstrosity", ac: 13, hp: 59, speed: "40 ft.", attack: "Beak +7 (1d10+5) and Claws +7 (2d8+5)", tags: ["brute", "beast", "wilds"] },
  { name: "Mummy", cr: "3", xp: 700, type: "undead", ac: 11, hp: 58, speed: "20 ft.", attack: "Rotting Fist +5 (2d6+3 + 3d6 necrotic + curse DC 12)", note: "Dreadful Glare frightens (DC 11 WIS).", tags: ["leader", "undead", "crypt"] },
  { name: "Veteran", cr: "3", xp: 700, type: "humanoid", ac: 17, hp: 58, speed: "30 ft.", attack: "Longsword +5 (1d8+3), multiattack ×2 + shortsword", tags: ["soldier", "leader", "humanoid", "urban", "manor", "anywhere"] },
  { name: "Green Hag", cr: "3", xp: 700, type: "fey", ac: 17, hp: 82, speed: "30 ft.", attack: "Claws +6 (2d8+4 slashing)", note: "Illusory Appearance; Invisible Passage; Mimicry.", tags: ["leader", "caster", "fey", "wilds", "manor"] },
  { name: "Knight", cr: "3", xp: 700, type: "humanoid", ac: 18, hp: 52, speed: "30 ft.", attack: "Greatsword +5 (2d6+3), multiattack ×2", note: "Leadership: allies add 1d4 to attacks and saves.", tags: ["leader", "soldier", "humanoid", "urban", "manor"] },
  { name: "Banshee", cr: "4", xp: 1100, type: "undead", ac: 12, hp: 58, speed: "fly 40 ft. (hover)", attack: "Corrupting Touch +4 (3d6+2 necrotic); Wail (DC 13 CON or drop to 0 HP)", note: "Detects life within 5 miles.", tags: ["boss", "undead", "crypt", "manor"] },
  { name: "Ettin", cr: "4", xp: 1100, type: "giant", ac: 12, hp: 85, speed: "40 ft.", attack: "Battleaxe +7 (2d8+5) and Morningstar +7 (2d8+5)", note: "Two Heads: advantage vs. blinded, charmed, frightened, stunned.", tags: ["brute", "giant", "wilds", "dungeon"] },
  { name: "Ghost", cr: "4", xp: 1100, type: "undead", ac: 11, hp: 45, speed: "fly 40 ft. (hover)", attack: "Withering Touch +5 (4d6+3 necrotic)", note: "Horrifying Visage ages victims; Possession (DC 13 CHA).", tags: ["boss", "undead", "manor", "crypt"] },
  { name: "Couatl", cr: "4", xp: 1100, type: "celestial", ac: 19, hp: 97, speed: "30 ft., fly 90 ft.", attack: "Bite +8 (1d6+5 + sleep poison DC 13); Constrict +6", note: "Shapechanger; detects thoughts. A holy guardian, not a villain.", tags: ["caster", "fey", "wilds", "crypt"] },
  { name: "Troll", cr: "5", xp: 1800, type: "giant", ac: 15, hp: 84, speed: "30 ft.", attack: "Bite +7 (1d6+4) and Claws +7 (2d6+4) ×2", note: "Regeneration 10 unless burned by acid or fire.", tags: ["brute", "giant", "wilds", "dungeon"] },
  { name: "Hill Giant", cr: "5", xp: 1800, type: "giant", ac: 13, hp: 105, speed: "40 ft.", attack: "Greatclub +8 (3d8+5), multiattack ×2; Rock +8 (3d10+5)", tags: ["brute", "giant", "wilds"] },
  { name: "Wraith", cr: "5", xp: 1800, type: "undead", ac: 13, hp: 67, speed: "fly 60 ft. (hover)", attack: "Life Drain +6 (4d8+3 necrotic, DC 14 CON or max HP reduced)", note: "Create Specter from slain humanoids.", tags: ["boss", "undead", "crypt", "manor", "dungeon"] },
  { name: "Vampire Spawn", cr: "5", xp: 1800, type: "undead", ac: 15, hp: 82, speed: "30 ft.", attack: "Claws +6 (2d4+3 + grapple); Bite +6 (1d6+3 + 2d6 necrotic drain)", note: "Regeneration 10; Spider Climb; sunlight hypersensitivity.", tags: ["boss", "leader", "undead", "manor", "crypt", "urban"] },
  { name: "Fire Elemental", cr: "5", xp: 1800, type: "elemental", ac: 13, hp: 102, speed: "50 ft.", attack: "Touch +6 (2d6+3 fire, ignites)", note: "Fire Form: creatures touching it take 1d10 fire.", tags: ["brute", "elemental", "dungeon", "manor"] },
  { name: "Air Elemental", cr: "5", xp: 1800, type: "elemental", ac: 15, hp: 90, speed: "fly 90 ft. (hover)", attack: "Slam +8 (2d8+5), multiattack ×2; Whirlwind (DC 13 STR)", tags: ["skirmisher", "elemental", "wilds", "dungeon"] },
  { name: "Gladiator", cr: "5", xp: 1800, type: "humanoid", ac: 16, hp: 112, speed: "30 ft.", attack: "Spear +7 (2d6+4), multiattack ×3", note: "Brute: extra damage die on melee hits; Parry.", tags: ["leader", "soldier", "humanoid", "urban", "anywhere"] },
  { name: "Medusa", cr: "6", xp: 2300, type: "monstrosity", ac: 15, hp: 127, speed: "30 ft.", attack: "Snake Hair +5 (1d4+2 + 4d6 poison); Petrifying Gaze (DC 14 CON)", tags: ["boss", "monstrosity", "dungeon", "manor", "crypt"] },
  { name: "Wyvern", cr: "6", xp: 2300, type: "dragon", ac: 13, hp: 110, speed: "20 ft., fly 80 ft.", attack: "Stinger +7 (2d6+4 + 7d6 poison DC 15); Bite +7 (2d6+4)", tags: ["brute", "dragon", "wilds"] },
  { name: "Mage", cr: "6", xp: 2300, type: "humanoid", ac: 12, hp: 40, speed: "30 ft.", attack: "Casts fireball (8d6 DC 14), counterspell, misty step", tags: ["caster", "leader", "humanoid", "urban", "manor", "anywhere"] },
  { name: "Young White Dragon", cr: "6", xp: 2300, type: "dragon", ac: 17, hp: 133, speed: "40 ft., fly 80 ft.", attack: "Cold Breath (DC 15 CON, 10d8 cold); Bite +7 (2d10+4 + 1d8 cold)", tags: ["boss", "dragon", "wilds", "dungeon"] },
  { name: "Stone Giant", cr: "7", xp: 2900, type: "giant", ac: 17, hp: 126, speed: "40 ft.", attack: "Greatclub +9 (3d8+6), multiattack ×2; Rock +9 (4d10+6)", tags: ["brute", "giant", "wilds", "dungeon"] },
  { name: "Young Black Dragon", cr: "7", xp: 2900, type: "dragon", ac: 18, hp: 127, speed: "40 ft., fly 80 ft., swim 40 ft.", attack: "Acid Breath (DC 14 DEX, 11d8 acid); Bite +7 (2d10+4 + 1d8 acid)", tags: ["boss", "dragon", "wilds", "crypt"] },
  { name: "Oni", cr: "7", xp: 2900, type: "giant", ac: 16, hp: 110, speed: "30 ft., fly 30 ft.", attack: "Glaive +7 (2d10+4), multiattack ×2", note: "Shapechanger; casts invisibility, darkness, sleep.", tags: ["boss", "leader", "giant", "manor", "urban"] },
  { name: "Frost Giant", cr: "8", xp: 3900, type: "giant", ac: 15, hp: 138, speed: "40 ft.", attack: "Greataxe +9 (3d12+6), multiattack ×2; Rock +9 (4d10+6)", tags: ["brute", "giant", "wilds"] },
  { name: "Assassin", cr: "8", xp: 3900, type: "humanoid", ac: 15, hp: 78, speed: "30 ft.", attack: "Shortsword +6 (1d6+3 + 7d6 poison DC 15), multiattack ×2", note: "Assassinate: advantage and auto-crit on surprised targets; Sneak Attack +4d6.", tags: ["boss", "skirmisher", "humanoid", "urban", "manor", "anywhere"] },
  { name: "Chain Devil", cr: "8", xp: 3900, type: "fiend", ac: 16, hp: 85, speed: "30 ft.", attack: "Chain +8 (2d6+4 + grapple), multiattack ×2", note: "Animate Chains; Unnerving Mask reaction.", tags: ["boss", "fiendlike", "dungeon", "crypt"] },
  { name: "Fire Giant", cr: "9", xp: 5000, type: "giant", ac: 18, hp: 162, speed: "30 ft.", attack: "Greatsword +11 (6d6+7), multiattack ×2; Rock +11 (4d10+7)", tags: ["boss", "brute", "giant", "dungeon", "wilds"] },
  { name: "Young Blue Dragon", cr: "9", xp: 5000, type: "dragon", ac: 18, hp: 152, speed: "40 ft., fly 80 ft.", attack: "Lightning Breath (DC 16 DEX, 10d10); Bite +9 (2d10+5 + 1d10 lightning)", tags: ["boss", "dragon", "wilds", "dungeon"] },
  { name: "Young Red Dragon", cr: "10", xp: 5900, type: "dragon", ac: 18, hp: 178, speed: "40 ft., fly 80 ft.", attack: "Fire Breath (DC 17 DEX, 16d6 fire); Bite +10 (2d10+6 + 1d6 fire)", tags: ["boss", "dragon", "dungeon", "wilds"] },
  { name: "Stone Golem", cr: "10", xp: 5900, type: "construct", ac: 17, hp: 178, speed: "30 ft.", attack: "Slam +10 (3d8+6), multiattack ×2; Slow (DC 17 WIS)", note: "Immune to nonmagical weapons and most spells.", tags: ["boss", "brute", "construct", "dungeon", "crypt", "manor"] },
  { name: "Aboleth", cr: "10", xp: 5900, type: "aberration", ac: 17, hp: 135, speed: "10 ft., swim 40 ft.", attack: "Tentacle +9 (2d6+5 + disease), multiattack ×3; Enslave (DC 14 WIS)", note: "Legendary actions; ancient and telepathic.", tags: ["boss", "monstrosity", "dungeon"] },
  { name: "Behir", cr: "11", xp: 7200, type: "monstrosity", ac: 17, hp: 168, speed: "50 ft., climb 40 ft.", attack: "Lightning Breath (DC 16 DEX, 12d10); Bite +10 (3d10+6); Swallow", tags: ["boss", "monstrosity", "dungeon", "wilds"] },
  { name: "Archmage", cr: "12", xp: 8400, type: "humanoid", ac: 12, hp: 99, speed: "30 ft.", attack: "Casts cone of cold (8d8 DC 17), time stop, globe of invulnerability", note: "Magic Resistance; mind blank pre-cast.", tags: ["boss", "caster", "humanoid", "manor", "urban", "dungeon", "anywhere"] },
  { name: "Vampire", cr: "13", xp: 10000, type: "undead", ac: 16, hp: 144, speed: "30 ft.", attack: "Unarmed +9 (1d8+4 + grapple); Bite +9 (1d6+4 + 3d6 necrotic drain)", note: "Legendary actions; Charm; Children of the Night; Regeneration 20.", tags: ["boss", "undead", "manor", "crypt", "urban"] },
  { name: "Adult White Dragon", cr: "13", xp: 10000, type: "dragon", ac: 18, hp: 200, speed: "40 ft., fly 80 ft.", attack: "Cold Breath (DC 19 CON, 12d8 cold); Bite +11 (2d10+6 + 1d8 cold)", note: "Legendary actions; Frightful Presence.", tags: ["boss", "dragon", "wilds"] },
  { name: "Storm Giant", cr: "13", xp: 10000, type: "giant", ac: 16, hp: 230, speed: "50 ft., swim 50 ft.", attack: "Greatsword +14 (6d6+9), multiattack ×2; Lightning Strike (DC 17, 12d8)", tags: ["boss", "giant", "wilds"] },
  { name: "Adult Black Dragon", cr: "14", xp: 11500, type: "dragon", ac: 19, hp: 195, speed: "40 ft., fly 80 ft., swim 40 ft.", attack: "Acid Breath (DC 18 DEX, 12d8 acid); Bite +11 (2d10+6 + 1d8 acid)", note: "Legendary actions; Frightful Presence.", tags: ["boss", "dragon", "wilds", "crypt"] },
  { name: "Adult Green Dragon", cr: "15", xp: 13000, type: "dragon", ac: 19, hp: 207, speed: "40 ft., fly 80 ft.", attack: "Poison Breath (DC 18 CON, 16d6 poison); Bite +11 (2d10+6 + 2d6 poison)", note: "Legendary actions; a master manipulator.", tags: ["boss", "dragon", "wilds", "manor"] },
  { name: "Purple Worm", cr: "15", xp: 13000, type: "monstrosity", ac: 18, hp: 247, speed: "50 ft., burrow 30 ft.", attack: "Bite +14 (3d8+9, swallow); Stinger +14 (3d6+9 + 12d6 poison DC 19)", tags: ["boss", "brute", "monstrosity", "dungeon", "wilds"] },
  { name: "Iron Golem", cr: "16", xp: 15000, type: "construct", ac: 20, hp: 210, speed: "30 ft.", attack: "Slam +13 (3d8+7), multiattack ×2; Poison Breath (DC 19 CON, 10d8)", note: "Immune to nonmagical weapons; fire heals it.", tags: ["boss", "construct", "dungeon", "manor"] },
  { name: "Adult Blue Dragon", cr: "16", xp: 15000, type: "dragon", ac: 19, hp: 225, speed: "40 ft., fly 80 ft., burrow 30 ft.", attack: "Lightning Breath (DC 19 DEX, 12d10); Bite +12 (2d10+7 + 1d10 lightning)", note: "Legendary actions; Frightful Presence.", tags: ["boss", "dragon", "wilds", "dungeon"] },
  { name: "Adult Red Dragon", cr: "17", xp: 18000, type: "dragon", ac: 19, hp: 256, speed: "40 ft., fly 80 ft.", attack: "Fire Breath (DC 21 DEX, 18d6 fire); Bite +14 (2d10+8 + 2d6 fire)", note: "Legendary actions; Frightful Presence (DC 19).", tags: ["boss", "dragon", "dungeon", "wilds"] },
  { name: "Ancient Red Dragon", cr: "24", xp: 62000, type: "dragon", ac: 22, hp: 546, speed: "40 ft., fly 80 ft.", attack: "Fire Breath (DC 24 DEX, 26d6 fire); Bite +17 (2d10+10 + 4d6 fire)", note: "Legendary actions; the apex of dragonkind.", tags: ["boss", "dragon", "wilds", "dungeon"] },
  { name: "Lich", cr: "21", xp: 33000, type: "undead", ac: 17, hp: 135, speed: "30 ft.", attack: "Paralyzing Touch +12 (3d6 cold + paralysis DC 18); casts power word kill", note: "Legendary actions; rejuvenates via phylactery.", tags: ["boss", "caster", "undead", "crypt", "dungeon"] },
];

export const MONSTERS_BY_NAME: Record<string, Monster> = Object.fromEntries(
  MONSTERS.map((m) => [m.name, m])
);

/** Numeric CR for sorting/filtering ("1/4" → 0.25). */
export function crValue(cr: string): number {
  if (cr.includes("/")) {
    const [a, b] = cr.split("/").map(Number);
    return a / b;
  }
  return Number(cr);
}

export function monstersTagged(tag: string): Monster[] {
  return MONSTERS.filter((m) => m.tags.includes(tag));
}

/** Open5e slug for "full stat block" links (SRD 5.1 content). */
export function open5eSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
