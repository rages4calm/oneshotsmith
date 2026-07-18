import type { DungeonMap, Scene, SceneType } from "../types";
import type { Rng } from "../utils/random";
import { pick } from "../utils/random";

// Connective tissue between scenes — the "how do we get from 2 to 3" a DM
// otherwise improvises. Built from the map's real geometry (direction,
// distance, doors) plus prose aware of what kind of scene just ended and
// what kind comes next. Deterministic, like everything else.

type Mood = "fight" | "talk" | "quiet";

const MOOD: Record<SceneType, Mood> = {
  arrival: "quiet",
  exploration: "quiet",
  skill: "quiet",
  social: "talk",
  combat: "fight",
  setpiece: "fight",
  climax: "fight",
};

const COMPASS: Array<[number, string]> = [
  [-157.5, "west"], [-112.5, "northwest"], [-67.5, "north"], [-22.5, "northeast"],
  [22.5, "east"], [67.5, "southeast"], [112.5, "south"], [157.5, "southwest"],
];

function direction(dx: number, dy: number): string {
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  for (const [max, name] of COMPASS) {
    if (angle < max) return name;
  }
  return "west";
}

function spatialLine(rng: Rng, map: DungeonMap, fromKey: number, toKey: number): string {
  const a = map.rooms.find((r) => r.key === fromKey);
  const b = map.rooms.find((r) => r.key === toKey);
  if (!a || !b) return "";
  const ax = a.x + a.w / 2;
  const ay = a.y + a.h / 2;
  const bx = b.x + b.w / 2;
  const by = b.y + b.h / 2;
  const dir = direction(bx - ax, by - ay);
  // One grid square = 10 feet (the map's scale bar), walked as corridors.
  const feet = Math.max(2, Math.abs(bx - ax) + Math.abs(by - ay)) * 10;
  const doorway = map.doors.some(
    (d) => d.x >= b.x - 1 && d.x <= b.x + b.w && d.y >= b.y - 1 && d.y <= b.y + b.h
  )
    ? "a door"
    : "open passage";

  return pick(rng, [
    `The way out of area ${fromKey} runs ${dir} — call it ${feet} feet of passage — to ${doorway} at area ${toKey}.`,
    `From area ${fromKey}, roughly ${feet} feet of corridor lead ${dir}, ending at ${doorway} into area ${toKey}.`,
    `Area ${toKey} lies ${dir} of here: ${feet} feet by the map, through ${doorway}.`,
  ]);
}

const PAIR_LINES: Record<`${Mood}->${Mood}`, string[]> = {
  "fight->fight": [
    "Give them one round of breathing room — a potion swigged, a blade wiped — and no more; the noise ahead has not stopped.",
    "There is no true quiet after the fight, only the next sound: let whoever has the best ears hear it first.",
    "Loot fast, bind wounds faster. Whatever made this place dangerous knows exactly how loud that was.",
  ],
  "fight->talk": [
    "Let the adrenaline drain on the walk — then a voice ahead, unhurried, already aware of them. Weapons drawn or sheathed is the first negotiation.",
    "The fight's echo fades into something stranger: conversation. Give the players a beat to decide who does the talking while their hands are still shaking.",
    "Blood cools on the way. What waits ahead prefers words — and has heard everything.",
  ],
  "fight->quiet": [
    "After the noise, the silence has texture. Describe small things — dust settling, a dropped coin still spinning — and let them catch their breath walking.",
    "The danger is behind them for now; curiosity gets to lead again. Slow your narration to match.",
    "Let them tally costs on the move — spells spent, wounds wrapped — as the way opens ahead.",
  ],
  "talk->fight": [
    "The conversation ends the way conversations here end. If the parley went badly, what's ahead already knows they're coming; if it went well, the party may know what's waiting.",
    "Words carried them this far. From here, the vocabulary changes — have them mark marching order before you describe the next chamber.",
    "Whatever was said, someone moved while they talked. The approach ahead is a held breath.",
  ],
  "talk->talk": [
    "One conversation hands them to the next like a letter passed along — and each speaker will assume they know what the last one said.",
    "Give them ten paces to compare notes on what they just heard before the next voice interrupts.",
    "What they learned is currency now. Spend it carefully in the next room.",
  ],
  "talk->quiet": [
    "The voices fall away behind them, and the site itself resumes speaking — describe what the walls, dust, and echoes have to say.",
    "Armed with what they heard, the party can read this next stretch differently. Reward whoever cross-references.",
    "The words follow them down the corridor longer than they should. Then: quiet, and the work of exploring.",
  ],
  "quiet->fight": [
    "The signs accumulate on the approach — describe two of them — so nobody at the table is surprised when it goes loud, only when it goes loud EARLY.",
    "Whatever they learned back there, the next room does not care. Marching order, light sources, weapons: ask now.",
    "The quiet has been spending down like a candle. It runs out at the threshold ahead.",
  ],
  "quiet->talk": [
    "Something ahead has been listening to them explore. It opens with a question — decide who it addresses first.",
    "The exploration turns up one last thing: company. Let the most curious character spot them first.",
    "Footsteps, then lamplight, then a voice. Not hostile — yet. The party's approach sets the opening tone.",
  ],
  "quiet->quiet": [
    "String the discoveries together: what they found back there should make what's ahead more legible — or more worrying.",
    "Keep the pace brisk here; two exploration beats in a row want momentum, not menace.",
    "Let a small detail from the last area recur here, changed. The site is one organism, and it noticed them.",
  ],
};

const CLIMAX_LINES = [
  "This is the last walk. Cut the lights lower, slow your delivery, and let the party state — out loud — what they're each carrying into the end.",
  "Everything funnels here: the clues, the grudges, the spent spell slots. Ask each player for one sentence of intent before you read the next scene aloud.",
  "No more side passages, and everyone can feel it. Give the table thirty seconds of plan-making, then open the door.",
];

export function composeTransition(rng: Rng, map: DungeonMap, from: Scene, to: Scene): string {
  const spatial = spatialLine(rng, map, from.key, to.key);
  const flavor =
    to.type === "climax"
      ? pick(rng, CLIMAX_LINES)
      : pick(rng, PAIR_LINES[`${MOOD[from.type]}->${MOOD[to.type]}`]);
  return spatial ? `${spatial} ${flavor}` : flavor;
}
