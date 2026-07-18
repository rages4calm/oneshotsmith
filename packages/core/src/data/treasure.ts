import type { MagicItem } from "../types";
import type { Rng } from "../utils/random";
import { pick, pickN, rollInt } from "../utils/random";

// Treasure tuned to the DMG's individual/hoard expectations by tier, kept as
// readable parcels rather than raw coin math.

const ART_OBJECTS = [
  "a silver ewer chased with dancing herons",
  "a carved bone game set missing one piece",
  "an embroidered silk banner of a forgotten company",
  "a gold locket holding a stranger's portrait",
  "a cloisonné box that smells faintly of myrrh",
  "a bronze crown sized for a child",
  "an obsidian figurine of a sleeping cat",
  "a jeweled scabbard with no sword",
  "a moonstone circlet cool to the touch",
  "a tapestry fragment showing this very place, centuries younger",
  "a set of six matched agate buttons",
  "a war-horn banded in electrum",
];

const GEMS = ["banded agate", "bloodstone", "carnelian", "moss agate", "jasper", "moonstone", "onyx", "citrine", "jade", "pearl", "amber", "garnet", "amethyst", "topaz", "black pearl", "sapphire", "emerald", "ruby", "diamond"];

export function treasureParcels(rng: Rng, level: number): string[] {
  const tier = level <= 4 ? 1 : level <= 10 ? 2 : level <= 16 ? 3 : 4;
  const coin = [
    () => `${rollInt(rng, 8, 20) * 10} gp in mixed coin, mostly silver`,
    () => `${rollInt(rng, 15, 40) * 10} gp in coin and trade bars`,
    () => `${rollInt(rng, 60, 140) * 10} gp in coin, plus a strongbox of platinum`,
    () => `${rollInt(rng, 200, 500) * 10} gp in coin, gems, and letters of credit`,
  ][tier - 1]();

  const gemCount = tier + rollInt(rng, 0, 2);
  const gemValue = [10, 50, 100, 500][tier - 1] * (rollInt(rng, 1, 3));
  const gems = `${gemCount} gems (${pickN(rng, GEMS, Math.min(gemCount, 3)).join(", ")}) worth ~${gemValue} gp each`;

  const potions = tier >= 2
    ? `${rollInt(rng, 2, 3)} potions of healing${tier >= 3 ? " (one greater)" : ""}`
    : `${rollInt(rng, 1, 2)} potions of healing`;

  return [coin, gems, potions, pick(rng, ART_OBJECTS)];
}

// Signature items: flavorful uncommon/rare items built from SRD-legal
// mechanics with original names and histories.

interface ItemTemplate {
  name: string;
  rarity: MagicItem["rarity"];
  attunement: boolean;
  description: string;
  minLevel: number;
}

const SIGNATURE_ITEMS: ItemTemplate[] = [
  { name: "Lantern of the Patient Watch", rarity: "uncommon", attunement: false, minLevel: 1, description: "This hooded lantern burns without oil. As a bonus action, its bearer can command the flame to burn blue when any invisible or ethereal creature is within 30 feet." },
  { name: "Threadbare Cloak of the Church Mouse", rarity: "uncommon", attunement: true, minLevel: 1, description: "While motionless and in shadow, the wearer is invisible to creatures more than 10 feet away. The effect ends if the wearer moves, attacks, or sneezes — and the cloak makes its wearer want to sneeze." },
  { name: "The Cartographer's Thumb", rarity: "uncommon", attunement: false, minLevel: 1, description: "A severed brass thumb on a chain. Pressed to any surface, it inks an accurate map of every space within 300 feet that its former owner ever walked. He walked a great many places he should not have." },
  { name: "Oathkeeper's Hammer", rarity: "uncommon", attunement: true, minLevel: 3, description: "A +1 warhammer that grows warm when a promise is broken within 60 feet. Once per day, the wielder can reroll one failed attack made in defense of another creature." },
  { name: "Boots of the Unseen Road", rarity: "uncommon", attunement: true, minLevel: 3, description: "These travel-worn boots leave no tracks and muffle their wearer's steps (advantage on Stealth checks to move silently). At a crossroads, they tug — gently — toward trouble." },
  { name: "The Last Candle", rarity: "rare", attunement: false, minLevel: 5, description: "A candle stub that cannot be lit by any mundane flame. When lit by magical fire, it burns for one hour, during which no creature within 30 feet can be frightened, and the dead may not rise." },
  { name: "Signal-Whistle of the Ninth Company", rarity: "rare", attunement: false, minLevel: 5, description: "Blown once per dawn, the whistle summons three spectral soldiers (use veteran stat blocks) who fight for one minute or until destroyed, then salute someone who isn't there and fade." },
  { name: "Ring of the Held Breath", rarity: "rare", attunement: true, minLevel: 5, description: "The wearer does not need to breathe, and once per day may cast water breathing. Engraved inside: a name, and the words 'come home'." },
  { name: "Blade of Borrowed Time", rarity: "rare", attunement: true, minLevel: 8, description: "A +2 shortsword. When its wielder would drop to 0 hit points, they instead drop to 1 — and age one year. It has been handed down through eleven owners, each of whom looked older than they were." },
  { name: "The Weeping Key", rarity: "rare", attunement: false, minLevel: 5, description: "Opens any nonmagical lock. Each use, it sheds a single tear of quicksilver worth 10 gp, and somewhere, its maker feels a door open." },
  { name: "Mantle of the Storm's Eye", rarity: "very rare", attunement: true, minLevel: 11, description: "The wearer has resistance to lightning and thunder damage, and once per day may cast lightning bolt (8d6). In rain, the mantle stays perfectly dry, which unsettles horses." },
  { name: "Crown of the Hollow King", rarity: "very rare", attunement: true, minLevel: 11, description: "The wearer can cast command (3rd level) at will, but each dawn must succeed on a DC 12 Wisdom save or hear the previous owner's advice, which is always confident and occasionally correct." },
];

export function signatureItem(rng: Rng, level: number): MagicItem {
  const eligible = SIGNATURE_ITEMS.filter((i) => i.minLevel <= level);
  const scaled = eligible.filter((i) =>
    level >= 11 ? i.rarity !== "uncommon" : level >= 5 ? true : i.rarity === "uncommon"
  );
  const t = pick(rng, scaled.length ? scaled : eligible);
  return { name: t.name, rarity: t.rarity, attunement: t.attunement, description: t.description };
}
