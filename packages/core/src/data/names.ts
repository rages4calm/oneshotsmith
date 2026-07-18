import type { Rng } from "../utils/random";
import { pick, chance } from "../utils/random";

// Name banks for NPCs, places, and titles. Original content — evocative but
// generic fantasy, no Product Identity names.

export const ANCESTRIES = [
  "human", "hill dwarf", "mountain dwarf", "high elf", "wood elf",
  "lightfoot halfling", "stout halfling", "half-elf", "half-orc",
  "rock gnome", "dragonborn", "tiefling",
] as const;

type NameBank = { first: string[]; last: string[] };

const HUMAN: NameBank = {
  first: ["Aldric", "Bram", "Cassia", "Doran", "Edwina", "Fenwick", "Gilda", "Harlan", "Isolde", "Jorah", "Katrin", "Lucan", "Maren", "Nils", "Odette", "Perrin", "Rosamund", "Silas", "Tessaly", "Ulric", "Vera", "Wystan", "Ysolt", "Corvin", "Della", "Emeric", "Petra", "Quill", "Sabine", "Tobias"],
  last: ["Ashdown", "Blackbriar", "Coldwater", "Dunmore", "Eastgate", "Fairwyn", "Grimsby", "Hollowell", "Ironwood", "Kestrel", "Larkspur", "Marchmain", "Nettlebee", "Oakhurst", "Pryce", "Quennell", "Ravenshaw", "Stroud", "Thistlewood", "Underhill", "Vance", "Wrenfield"],
};

const DWARF: NameBank = {
  first: ["Adrik", "Baern", "Dagna", "Eberk", "Falka", "Gunnloda", "Harbek", "Kathra", "Morgran", "Nalla", "Orsik", "Riswynn", "Thoradin", "Vistra", "Bruenna", "Dain", "Helja", "Rurik", "Torbera", "Ulfgar"],
  last: ["Battlehammer", "Bronzebeard", "Coppervein", "Deepdelver", "Fireforge", "Granitefist", "Hillsafar", "Ironfoot", "Loderr", "Rumnaheim", "Stonehewer", "Strakeln", "Torunn", "Ungart"],
};

const ELF: NameBank = {
  first: ["Adran", "Berrian", "Caelynn", "Dayereth", "Enna", "Galinndan", "Hadarai", "Immeral", "Keyleth", "Lael", "Mindartis", "Naivara", "Quelenna", "Riardon", "Sariel", "Shanairra", "Theren", "Vadania", "Xanaphia", "Zaltarish"],
  last: ["Amakiir", "Galanodel", "Holimion", "Ilphelkiir", "Liadon", "Meliamne", "Nailo", "Siannodel", "Xiloscient", "Silverfrond", "Duskwalker", "Moonwhisper"],
};

const HALFLING: NameBank = {
  first: ["Alton", "Beau", "Cade", "Cora", "Eldon", "Finnan", "Jillian", "Lavinia", "Lyle", "Merla", "Milo", "Nedda", "Osborn", "Portia", "Roscoe", "Seraphina", "Trym", "Verna", "Wella", "Wendel"],
  last: ["Brushgather", "Goodbarrel", "Greenbottle", "Highhill", "Hilltopple", "Leagallow", "Tealeaf", "Thorngage", "Tosscobble", "Underbough", "Applethorn", "Copperkettle"],
};

const ORCISH: NameBank = {
  first: ["Dench", "Feng", "Gell", "Henk", "Holg", "Imsh", "Keth", "Krusk", "Mhurren", "Ront", "Shump", "Thokk", "Baggi", "Emen", "Engong", "Kansif", "Myev", "Neega", "Ovak", "Ownka", "Shautha", "Sutha", "Vola", "Volen", "Yevelda"],
  last: ["the Unbroken", "Fireband", "Skullcleaver", "Stonefist", "Wolfjaw", "Bonegrinder", "Grimtusk", "Ironhide"],
};

const GNOME: NameBank = {
  first: ["Alston", "Boddynock", "Dimble", "Eldon", "Fonkin", "Gimble", "Glim", "Jebeddo", "Namfoodle", "Roondar", "Seebo", "Zook", "Bimpnottin", "Caramip", "Donella", "Ellyjobell", "Loopmottin", "Mardnab", "Nissa", "Oda", "Orla", "Roywyn", "Shamil", "Waywocket"],
  last: ["Beren", "Daergel", "Folkor", "Garrick", "Nackle", "Murnig", "Ningel", "Raulnor", "Scheppen", "Timbers", "Turen", "Sparkspanner", "Cogwhistle"],
};

const DRAGONBORN: NameBank = {
  first: ["Arjhan", "Balasar", "Bharash", "Donaar", "Ghesh", "Heskan", "Kriv", "Medrash", "Nadarr", "Patrin", "Rhogar", "Shamash", "Akra", "Biri", "Daar", "Farideh", "Harann", "Kava", "Korinn", "Mishann", "Nala", "Perra", "Raiann", "Sora", "Thava"],
  last: ["Clethtinthiallor", "Daardendrian", "Delmirev", "Kepeshkmolik", "Kimbatuul", "Linxakasendalor", "Norixius", "Ophinshtalajiir", "Prexijandilin", "Yarjerit"],
};

const TIEFLING: NameBank = {
  first: ["Akmenos", "Amnon", "Barakas", "Damakos", "Ekemon", "Iados", "Kairon", "Leucis", "Melech", "Morthos", "Pelaios", "Skamos", "Akta", "Bryseis", "Criella", "Damaia", "Kallista", "Lerissa", "Makaria", "Nemeia", "Orianna", "Phelaia", "Rieta"],
  last: ["Carrion", "Creed", "Hearth", "Hope", "Music", "Nowhere", "Quiet", "Sorrow", "Temerity", "Torment", "Weary"],
};

const BANKS: Record<string, NameBank> = {
  "human": HUMAN,
  "hill dwarf": DWARF,
  "mountain dwarf": DWARF,
  "high elf": ELF,
  "wood elf": ELF,
  "lightfoot halfling": HALFLING,
  "stout halfling": HALFLING,
  "half-elf": { first: [...HUMAN.first, ...ELF.first], last: [...HUMAN.last, ...ELF.last] },
  "half-orc": { first: [...ORCISH.first, ...HUMAN.first.slice(0, 10)], last: [...ORCISH.last, ...HUMAN.last.slice(0, 8)] },
  "rock gnome": GNOME,
  "dragonborn": DRAGONBORN,
  "tiefling": TIEFLING,
};

export function npcName(rng: Rng, ancestry?: string): { name: string; ancestry: string } {
  const kind = ancestry ?? pick(rng, ANCESTRIES as readonly string[]);
  const bank = BANKS[kind] ?? HUMAN;
  return { name: `${pick(rng, bank.first)} ${pick(rng, bank.last)}`, ancestry: kind };
}

// --- Places ----------------------------------------------------------------

const SETTLEMENT_A = ["Amber", "Bleak", "Briar", "Candle", "Cinder", "Crow", "Dun", "Elm", "Fal", "Gild", "Grey", "Harrow", "Haven", "High", "Hollow", "Iron", "Lark", "Mill", "Moor", "Oster", "Raven", "Salt", "Shadow", "Silver", "Stone", "Thorn", "Vale", "West", "Winter", "Wolf"];
const SETTLEMENT_B = ["barrow", "bridge", "brook", "combe", "crag", "cross", "dale", "fell", "field", "ford", "gate", "glen", "hallow", "ham", "haven", "hollow", "march", "mere", "mill", "moor", "reach", "rest", "stead", "vale", "watch", "well", "wick"];

export function settlementName(rng: Rng): string {
  return `${pick(rng, SETTLEMENT_A)}${pick(rng, SETTLEMENT_B)}`;
}

const TAVERN_ADJ = ["Bent", "Blind", "Brazen", "Broken", "Crooked", "Dancing", "Drowned", "Gilded", "Grinning", "Hollow", "Laughing", "Leaning", "Limping", "Lucky", "Prancing", "Rusty", "Silver", "Sleeping", "Thirsty", "Wandering", "Weeping", "Whistling"];
const TAVERN_NOUN = ["Anvil", "Badger", "Basilisk", "Boar", "Candle", "Cauldron", "Crow", "Dragon", "Flagon", "Gargoyle", "Goat", "Goose", "Griffon", "Hart", "Hound", "Kettle", "Lantern", "Mermaid", "Mule", "Otter", "Owl", "Piper", "Raven", "Stag", "Toad", "Unicorn", "Wyvern"];

export function tavernName(rng: Rng): string {
  return `The ${pick(rng, TAVERN_ADJ)} ${pick(rng, TAVERN_NOUN)}`;
}

// --- NPC texture -----------------------------------------------------------

export const OCCUPATIONS = ["innkeeper", "blacksmith", "hedge-wizard", "constable", "merchant", "gravedigger", "herbalist", "ferryman", "scribe", "poacher", "midwife", "stonemason", "beekeeper", "rat-catcher", "chandler", "tinker", "fortune-teller", "stablehand", "fishmonger", "retired soldier", "tax collector", "wandering priest", "mapmaker", "miller", "falconer"];

export const APPEARANCES = [
  "a burn scar shaped like a comet across one cheek",
  "ink-stained fingers and a squint from years of small print",
  "a magnificent waxed mustache gone gray on one side",
  "one milky eye that always seems to look past you",
  "a patchwork coat with a button from every town they've visited",
  "hands too big for their frame, knuckles like walnuts",
  "hair braided with tiny copper bells that chime when they lie",
  "a missing ring finger and a fine glove worn to hide it",
  "sunburnt, wind-chapped, and grinning anyway",
  "immaculate dress entirely wrong for this weather",
  "an old wound that stiffens their left leg before rain",
  "spectacles with one cracked lens they refuse to replace",
  "a live mouse riding in their breast pocket",
  "smells of cedar smoke and church incense",
  "tattooed knuckles spelling a word in a language no one reads",
  "a laugh that arrives a beat too late",
];

export const MANNERISMS = [
  "answers questions with questions",
  "whittles the same stick smaller and smaller while talking",
  "quotes their dead spouse as the final authority on everything",
  "counts coins, beads, anything, when nervous",
  "never sits with their back to a door",
  "hums old marching songs under their breath",
  "keeps offering everyone food they clearly can't spare",
  "addresses everyone by profession, never by name",
  "taps the table twice before delivering bad news",
  "laughs at danger and flinches at kindness",
  "constantly relights a pipe that never stays lit",
  "corrects everyone's grammar, even mid-crisis",
  "makes small bets with themself out loud",
  "apologizes to furniture they bump into",
  "repeats the last three words of anything said to them, thoughtfully",
];

export const VOICES = [
  "gravel-low, words doled out like they cost money",
  "bright and rapid, sentences tumbling over each other",
  "a stage whisper that carries across the room",
  "sing-song, rising at the end of every phrase",
  "flat and unhurried, with long unnerving pauses",
  "warm and booming, every greeting a proclamation",
  "thin and reedy, always slightly out of breath",
  "clipped military cadence, no wasted syllables",
  "honey-smooth and rehearsed, like a merchant mid-pitch",
  "creaky as a door hinge, sighs between clauses",
  "accented from somewhere far upriver, consonants softened",
  "barely above a murmur, forcing everyone to lean in",
];

export function npcGoalAndSecret(rng: Rng): { goal: string; secret: string } {
  const goals = [
    "wants the trouble gone before the harvest fair",
    "wants to be named in the ballad that will surely be written about this",
    "wants their debt to the villain quietly erased",
    "wants proof their missing sibling is still alive",
    "wants the adventurers to succeed — but slowly, for reasons of their own",
    "wants to sell supplies, information, and anything not nailed down",
    "wants someone, anyone, to finally believe them",
    "wants the old days back, before the trouble started",
    "wants to leave town forever and needs one last score",
    "wants the party to take a letter to someone they wronged",
  ];
  const secrets = [
    "once worked for the villain and still knows the old passwords",
    "has been skimming from the town coffers for years",
    "saw everything the night it happened and told no one",
    "is not who they claim — the real one died on the road",
    "keeps a forbidden holy symbol wrapped in oilcloth under the floor",
    "is in love with someone on the wrong side of this",
    "sold the villain the very thing the party now needs",
    "is a deserter with a bounty still on their head",
    "has the second half of the map and doesn't know it",
    "made a bargain years ago that is now coming due",
  ];
  return { goal: pick(rng, goals), secret: pick(rng, secrets) };
}

/** Some ancestry variety without a full demographic model. */
export function randomAncestry(rng: Rng): string {
  // Humans are common; everything else split evenly.
  return chance(rng, 0.4) ? "human" : pick(rng, ANCESTRIES.filter((a) => a !== "human") as unknown as readonly string[]);
}
