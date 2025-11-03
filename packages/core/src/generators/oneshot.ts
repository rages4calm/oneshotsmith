import type { OneShotInput, OneShotPacket } from "../types";

interface OneShotTemplate {
  title: string;
  hook: string;
  actOne: string;
  actTwo: string;
  actThree: string;
  twist: string;
  finale: string;
}

// Simplified one-shot generator
export function generateOneShot(input: OneShotInput): OneShotPacket {
  const { theme, level, timebox, difficulty } = input;

  // Theme-based templates
  const templates: Record<OneShotInput["theme"], OneShotTemplate> = {
    Heist: {
      title: "The Midnight Vault",
      hook: "A noble's priceless artifact was stolen; recover it before the thieves flee the city.",
      actOne: "Gather intel from informants; track the thieves to their hideout.",
      actTwo: "Infiltrate the warehouse; avoid or fight guards; find the vault.",
      actThree: "Crack the vault; escape with the artifact; face the mastermind.",
      twist: "The noble is actually the real thief; the 'thieves' were hired to expose corruption.",
      finale: "A timed chase as city guards close in.",
    },
    Rescue: {
      title: "The Captured Caravan",
      hook: "A merchant caravan was ambushed; rescue the survivors from bandits.",
      actOne: "Track the bandits to their camp; scout defenses.",
      actTwo: "Free the prisoners; deal with guards quietly or loudly.",
      actThree: "Confront the bandit leader; escape before reinforcements arrive.",
      twist: "One prisoner is a spy working for the bandits.",
      finale: "Running battle as you escort the caravan to safety.",
    },
    "Dungeon Sprint": {
      title: "The Forgotten Crypt",
      hook: "A sealed crypt has been breached; stop whatever was unleashed.",
      actOne: "Enter the crypt; navigate traps and undead guardians.",
      actTwo: "Find the ritual chamber; disrupt the necromancer's work.",
      actThree: "Defeat the necromancer or his summoned undead guardian.",
      twist: "The necromancer is trying to stop a greater evil from awakening.",
      finale: "Collapsing dungeon; escape before it's sealed forever.",
    },
    "Horror-Lite": {
      title: "The Whispering Manor",
      hook: "Strange disappearances near an old manor; investigate the hauntings.",
      actOne: "Explore the manor; encounter ghostly phenomena and clues.",
      actTwo: "Uncover the tragic backstory; find the source of the haunting.",
      actThree: "Lay the spirit to rest or banish it; escape the collapsing manor.",
      twist: "One party member is possessed and doesn't know it yet.",
      finale: "A final confrontation with the vengeful spirit.",
    },
    "Travel Gauntlet": {
      title: "The Perilous Pass",
      hook: "Escort a VIP through dangerous mountain passes before winter storms hit.",
      actOne: "Deal with bandits or wild creatures on the trail.",
      actTwo: "Navigate treacherous terrain; cross a collapsing bridge.",
      actThree: "Reach the mountain temple; defend against a final ambush.",
      twist: "The VIP is an imposter; the real VIP was kidnapped.",
      finale: "Racing against a blizzard to reach safety.",
    },
  };

  const template = templates[theme] || templates["Dungeon Sprint"];

  // Generate encounters based on level and difficulty
  const encounterXP: Record<OneShotInput["difficulty"], number> = {
    Easy: level * 50,
    Medium: level * 100,
    Hard: level * 150,
    Deadly: level * 200,
  };

  const encounters = [
    {
      name: "Initial Encounter",
      description: "Guards or minor obstacles",
      monsters: level <= 3 ? ["Bandit (x4)"] : level <= 5 ? ["Thug (x3)", "Bandit Captain"] : ["Veteran (x2)", "Mage"],
      terrain: "Narrow corridor with cover",
      xp: encounterXP[difficulty],
    },
    {
      name: "Mid-Adventure Challenge",
      description: "Tougher foes or environmental hazard",
      monsters: level <= 3 ? ["Ogre"] : level <= 5 ? ["Troll", "Goblin Boss (x2)"] : ["Young Dragon", "Cultist (x4)"],
      terrain: "Open area with hazards (fire, pit traps)",
      xp: encounterXP[difficulty] * 1.5,
    },
  ];

  if (timebox !== "2h") {
    encounters.push({
      name: "Boss Encounter",
      description: "Final confrontation",
      monsters: level <= 3 ? ["Bugbear Chief", "Wolf (x2)"] : level <= 5 ? ["Medusa", "Stone Golem"] : ["Vampire Spawn (x2)", "Necromancer"],
      terrain: "Dynamic battlefield with cover and objectives",
      xp: encounterXP[difficulty] * 2,
    });
  }

  const npcs = [
    {
      name: "Quinn Silvertongue",
      description: "Charismatic informant with silver hair",
      goal: "Sell information to the highest bidder",
      quirk: "Always eating an apple",
    },
    {
      name: "Gruff Ironbelly",
      description: "Grumpy dwarf guard",
      goal: "Protect the location at all costs",
      quirk: "Speaks in riddles when nervous",
    },
  ];

  const treasureParcels = [
    `${level * 50} gold pieces`,
    level >= 5 ? "Potion of Greater Healing (x2)" : "Potion of Healing (x3)",
    level >= 8 ? "+1 Weapon of choice" : "Bag of Holding",
  ];

  return {
    title: template.title,
    hook: template.hook,
    actOne: template.actOne,
    actTwo: template.actTwo,
    actThree: template.actThree,
    twist: template.twist,
    finale: template.finale,
    encounters,
    npcs,
    keyItem: "Ancient medallion with cryptic inscription",
    treasureParcels,
  };
}
