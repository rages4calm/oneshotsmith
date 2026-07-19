import type {
  Difficulty,
  DungeonMap,
  Monster,
  NPCProfile,
  OneShotInput,
  OneShotPacket,
  PacingSegment,
  RerollSection,
  Scene,
  SceneType,
  SkillChallenge,
  TimeBox,
  Villain,
} from "../types";
import { hashString, pick, pickN, sectionRng, fill, resolveFlags, type Rng } from "../utils/random";
import { MONSTERS, crValue } from "../data/monsters";
import { buildEncounter, partyThreshold } from "../data/encounter-math";
import { npcName, randomAncestry, settlementName, tavernName, OCCUPATIONS, APPEARANCES, MANNERISMS, VOICES, npcGoalAndSecret } from "../data/names";
import { treasureParcels, signatureItem } from "../data/treasure";
import { generateDungeonMap } from "./dungeon-map";
import { composeTransition } from "./transitions";
import { THEME_PACKS } from "../data/themes";
import { DC_BY_TIER, type SceneTemplate, type ThemePack } from "../data/themes/schema";

// ---------------------------------------------------------------------------
// Structure per session length: how many middle scenes, and the minute budget.
// (Designed to leave ~15–25 min of slack — content for 3 hours in a 4-hour
// slot, per standard one-shot pacing advice.)
// ---------------------------------------------------------------------------

const STRUCTURE: Record<TimeBox, { middles: number; minutes: { arrival: number; middle: number; revelation: number; climax: number; wrap: number } }> = {
  "2h": { middles: 1, minutes: { arrival: 20, middle: 25, revelation: 20, climax: 40, wrap: 15 } },
  "3h": { middles: 2, minutes: { arrival: 20, middle: 30, revelation: 25, climax: 50, wrap: 25 } },
  "4h": { middles: 3, minutes: { arrival: 25, middle: 35, revelation: 30, climax: 55, wrap: 25 } },
};

function stepDown(d: Difficulty): Difficulty {
  return d === "Deadly" ? "Hard" : d === "Hard" ? "Medium" : "Easy";
}

const isCombatType = (t: SceneType) => t === "combat" || t === "setpiece" || t === "climax";

/** Choose middle scenes honoring the combat mix for the session length. */
function chooseMiddles(rng: Rng, pool: SceneTemplate[], count: number): SceneTemplate[] {
  const combats = pool.filter((s) => isCombatType(s.type));
  const others = pool.filter((s) => !isCombatType(s.type));
  const picked: SceneTemplate[] = [];

  if (count === 1) {
    picked.push(pick(rng, combats.length ? combats : pool));
  } else {
    const combatCount = count === 2 ? 1 : Math.min(2, combats.length);
    picked.push(...pickN(rng, combats, combatCount));
    picked.push(...pickN(rng, others, count - picked.length));
    while (picked.length < count && pool.length > picked.length) {
      const extra = pool.find((s) => !picked.includes(s));
      if (!extra) break;
      picked.push(extra);
    }
  }
  // Session order: put a non-combat between combats when possible.
  return picked.sort((a, b) => {
    const rank = (s: SceneTemplate) =>
      s.type === "social" ? 0 : s.type === "exploration" ? 1 : s.type === "skill" ? 2 : 3;
    return rank(a) - rank(b);
  });
}

function resolveSkillChallenge(template: NonNullable<SceneTemplate["skill"]>, level: number, vars: Record<string, string>): SkillChallenge {
  return {
    description: fill(template.description, vars),
    checks: template.checks.map((c) => ({
      skill: c.skill,
      dc: DC_BY_TIER[c.tier](level),
      use: fill(c.use, vars),
    })),
    success: fill(template.success, vars),
    failure: fill(template.failure, vars),
  };
}

function pickVillainStats(rng: Rng, pack: ThemePack, bossTags: string[] | undefined, level: number, partySize: number, difficulty: Difficulty): Monster {
  const budget = partyThreshold(level, partySize, difficulty);
  const inWindow = (m: Monster) => m.xp <= budget * 1.05 && m.xp >= budget * 0.28;
  const venue = new Set(
    MONSTERS.filter((m) => pack.monsterTags.some((t) => m.tags.includes(t))).map((m) => m.name)
  );

  // Progressively widen until something fits the budget window: preferred boss
  // tags in-venue → boss tags anywhere → leaders/casters → any monster. Low-
  // level parties can't afford a "boss"-tagged monster, and that's fine — a
  // bandit captain is a perfectly good villain for a level-1 table.
  const tags = bossTags ?? pack.bossTags;
  const tiers: Monster[][] = [
    MONSTERS.filter((m) => tags.some((t) => m.tags.includes(t)) && venue.has(m.name)),
    MONSTERS.filter((m) => tags.some((t) => m.tags.includes(t))),
    MONSTERS.filter((m) => ["leader", "caster"].some((t) => m.tags.includes(t)) && venue.has(m.name)),
    MONSTERS.filter((m) => venue.has(m.name)),
    MONSTERS,
  ];

  for (const tier of tiers) {
    const pool = tier.filter(inWindow);
    if (pool.length > 0) {
      const scored = [...pool].sort(
        (a, b) => Math.abs(a.xp - budget * 0.62) - Math.abs(b.xp - budget * 0.62)
      );
      return pick(rng, scored.slice(0, Math.min(3, scored.length)));
    }
  }

  // Nothing in window anywhere (extreme budgets): largest affordable, else smallest.
  const under = MONSTERS.filter((m) => m.xp <= budget * 1.05).sort((a, b) => b.xp - a.xp);
  return under[0] ?? [...MONSTERS].sort((a, b) => a.xp - b.xp)[0];
}

function makeNPC(rng: Rng, occupation?: string): NPCProfile {
  const ancestry = randomAncestry(rng);
  const { name } = npcName(rng, ancestry);
  const { goal, secret } = npcGoalAndSecret(rng);
  return {
    name,
    ancestry,
    occupation: occupation ?? pick(rng, OCCUPATIONS),
    appearance: pick(rng, APPEARANCES),
    mannerism: pick(rng, MANNERISMS),
    voice: pick(rng, VOICES),
    goal,
    secret,
  };
}

export function generateOneShot(input: OneShotInput): OneShotPacket {
  const { seed, theme, level, partySize, difficulty, timebox } = input;
  const nonce = (s: RerollSection) => input.rerolls?.[s] ?? 0;
  const rngFor = (section: string, n = 0) => sectionRng(seed, section, n);

  const pack = THEME_PACKS[theme];
  const structure = STRUCTURE[timebox];

  // --- Stable world dressing (not individually re-rollable) ---------------
  const worldRng = rngFor("world");
  const place = settlementName(worldRng);
  const tavern = tavernName(worldRng);

  const siteRng = rngFor("site");
  const site = pick(siteRng, pack.sites);
  const siteName = fill(pick(siteRng, site.names), { place });

  // --- Villain -------------------------------------------------------------
  const villainRng = rngFor("villain", nonce("villain"));
  const villainTemplate = pick(villainRng, pack.villains);
  const villainAncestry = randomAncestry(villainRng);
  const { name: villainName } = npcName(villainRng, villainAncestry);
  const epithet = pick(villainRng, villainTemplate.epithets);
  const villainStats = pickVillainStats(villainRng, pack, villainTemplate.bossTags, level, partySize, difficulty);

  // --- NPCs ----------------------------------------------------------------
  const npcRng = rngFor("npcs", nonce("npcs"));
  const patron = makeNPC(npcRng);
  const npcs = [patron, makeNPC(npcRng), makeNPC(npcRng)];

  // --- Treasure ------------------------------------------------------------
  const treasureRng = rngFor("treasure", nonce("treasure"));
  const item = signatureItem(treasureRng, level);
  const parcels = treasureParcels(treasureRng, level);

  // --- Shared template variables ------------------------------------------
  const paletteAll = MONSTERS.filter((m) => pack.monsterTags.some((t) => m.tags.includes(t)));
  const midPalette = paletteAll.filter((m) => crValue(m.cr) <= Math.max(1, level * 0.75));
  const flavorMonster = midPalette.length ? pick(rngFor("world"), midPalette) : paletteAll[0];
  const vars: Record<string, string> = {
    villain: villainName,
    epithet,
    site: siteName,
    place,
    patron: patron.name,
    tavern,
    monster: flavorMonster ? flavorMonster.name.toLowerCase() : "creature",
    item: item.name,
  };

  const villain: Villain = {
    name: villainName,
    epithet,
    motivation: fill(villainTemplate.motivation, vars),
    plan: fill(villainTemplate.plan, vars),
    secret: fill(villainTemplate.secret, vars),
    mannerism: fill(villainTemplate.mannerism, vars),
    stats: villainStats,
  };

  // --- Title & tagline -----------------------------------------------------
  const titleRng = rngFor("title", nonce("title"));
  const title = fill(pick(titleRng, pack.titlePatterns), {
    adj: pick(titleRng, pack.titleAdjectives),
    noun: pick(titleRng, pack.titleNouns),
    place,
  });
  const tagline = fill(pick(titleRng, pack.taglines), vars);
  const moduleCode = `${pack.moduleLetter}${1 + (hashString(seed + theme) % 9)}`;

  // --- Hook ----------------------------------------------------------------
  const hookRng = rngFor("hook", nonce("hook"));
  const hookTemplate = pick(hookRng, pack.hooks);
  const hook = {
    readAloud: fill(hookTemplate.readAloud, vars),
    summary: fill(hookTemplate.summary, vars),
    alternates: pickN(hookRng, pack.hookAlternates, 2).map((h) => fill(h, vars)),
  };

  // --- Twist & clues -------------------------------------------------------
  const twistRng = rngFor("twist", nonce("twist"));
  const twist = fill(pick(twistRng, pack.twists), vars);
  const clues = pickN(twistRng, pack.cluePool, 8).map((c) => fill(c, vars));

  // --- Scenes --------------------------------------------------------------
  // Scenes are chosen in session order, tracking the story artifacts each one
  // introduces (`provides`); a template whose `requires` aren't met by
  // earlier-selected scenes is ineligible. This keeps cross-scene references
  // (a confession, a ledger) from appearing in adventures that never set them
  // up. If filtering would empty a pool, fall back to the full pool.
  const sceneRng = rngFor("scenes", nonce("scenes"));
  const provided = new Set<string>();
  const addProvides = (t: SceneTemplate) => (t.provides ?? []).forEach((p) => provided.add(p));
  const eligible = (list: SceneTemplate[]) => {
    const ok = list.filter((t) => (t.requires ?? []).every((r) => provided.has(r)));
    return ok.length ? ok : list;
  };

  const arrivalT = pick(sceneRng, eligible(pack.scenes.arrival));
  addProvides(arrivalT);
  const middlesT = chooseMiddles(sceneRng, eligible(pack.scenes.middle), structure.middles);
  middlesT.forEach(addProvides);
  const revelationT = pick(sceneRng, eligible(pack.scenes.revelation));
  addProvides(revelationT);
  const climaxT = pick(sceneRng, eligible(pack.scenes.climax));

  const templates: Array<{ t: SceneTemplate; minutes: number }> = [
    { t: arrivalT, minutes: structure.minutes.arrival },
    ...middlesT.map((t) => ({ t, minutes: structure.minutes.middle })),
    { t: revelationT, minutes: structure.minutes.revelation },
    { t: climaxT, minutes: structure.minutes.climax },
  ];

  const middleDifficulty = stepDown(difficulty);

  // Story flags for conditional text spans ({?flag:…|…}) — the union of the
  // definite session scenes' provides tags. The spare scene consumes flags
  // but never sets them: it may not be run at all. Re-rolling any section
  // simply re-gathers these on the next full regeneration.
  const sessionFlags = new Set<string>(
    [arrivalT, ...middlesT, revelationT, climaxT].flatMap((t) => t.provides ?? [])
  );
  const ff = (s: string) => resolveFlags(fill(s, vars), sessionFlags);

  let clueIdx = 0;
  const makeScene = (t: SceneTemplate, id: string, key: number, minutes: number, cuttable: boolean): Scene => {
    const scene: Scene = {
      id,
      key,
      title: ff(t.title),
      type: t.type,
      readAloud: t.readAloud ? ff(t.readAloud) : undefined,
      summary: ff(t.summary),
      details: t.details.map((d) => ff(d)).filter(Boolean),
      minutes,
      cuttable,
    };
    if (isCombatType(t.type) && t.combat) {
      const isClimax = t.type === "climax";
      scene.encounter = buildEncounter({
        palette: isClimax
          ? paletteAll.filter((m) => m.xp <= villainStats.xp)
          : midPalette.length ? midPalette : paletteAll,
        level,
        partySize,
        difficulty: isClimax ? difficulty : middleDifficulty,
        rng: sceneRng,
        anchor: isClimax ? villainStats : undefined,
        tactics: ff(t.combat.tactics),
        terrain: ff(t.combat.terrain),
      });
    }
    if (t.skill) {
      const sc = resolveSkillChallenge(t.skill, level, vars);
      scene.skillChallenge = {
        description: resolveFlags(sc.description, sessionFlags),
        checks: sc.checks.map((c) => ({ ...c, use: resolveFlags(c.use, sessionFlags) })),
        success: resolveFlags(sc.success, sessionFlags),
        failure: resolveFlags(sc.failure, sessionFlags),
      };
    }
    if (t.type !== "climax" && clueIdx < clues.length) {
      scene.clue = clues[clueIdx++];
    }
    return scene;
  };

  const scenes: Scene[] = templates.map(({ t, minutes }, i) =>
    makeScene(t, `scene-${i + 1}`, i + 1, minutes, i > 0 && i < templates.length - 2 && !isCombatType(t.type))
  );

  // A ready-to-drop extra scene from the unused middle pool, for tables that
  // run fast. Not keyed to the map; the DM places it wherever it fits.
  const spareTemplate = eligible(pack.scenes.middle).find((t) => !middlesT.includes(t));
  const spareScene = spareTemplate
    ? makeScene(spareTemplate, "scene-spare", 0, structure.minutes.middle, true)
    : undefined;

  // --- Map -----------------------------------------------------------------
  const mapRng = rngFor("map", nonce("map"));
  const map: DungeonMap = generateDungeonMap({
    rng: mapRng,
    keyedLabels: scenes.map((s) => s.title),
    extraLabels: pickN(mapRng, site.roomLabels, 3),
    title: siteName,
  });

  // --- Transitions ---------------------------------------------------------
  // Composed after the map exists so distances and directions are real.
  const transitionRng = rngFor("transitions", nonce("scenes"));
  for (let i = 1; i < scenes.length; i++) {
    scenes[i].transition = composeTransition(transitionRng, map, scenes[i - 1], scenes[i]);
  }

  // --- Tables --------------------------------------------------------------
  const tableRng = rngFor("tables", nonce("tables"));
  const tables = [
    {
      title: "Complications",
      die: `d${pack.complications.length}`,
      entries: pickN(tableRng, pack.complications, pack.complications.length).map((e) => fill(e, vars)),
    },
    {
      title: "Sensory Details",
      die: `d${pack.sensory.length}`,
      entries: pickN(tableRng, pack.sensory, pack.sensory.length).map((e) => fill(e, vars)),
    },
  ];

  // --- Pacing --------------------------------------------------------------
  const pacingNotes: Record<SceneType, string> = {
    arrival: "Set the scene fast; first die roll inside ten minutes.",
    social: "Let every PC speak once before the scene can end.",
    exploration: "Reward curiosity with clues, not delays.",
    skill: "Describe consequences vividly; keep the dice moving.",
    combat: "Run brisk turns — call players on deck.",
    setpiece: "Let the terrain do half the storytelling.",
    climax: "All spotlights up. Spend everything here.",
  };
  const pacing: PacingSegment[] = [
    ...scenes.map((s) => ({
      label: `${s.key}. ${s.title}`,
      minutes: s.minutes,
      note: pacingNotes[s.type],
    })),
    {
      label: "Wrap-up & epilogue",
      minutes: structure.minutes.wrap,
      note: "Resolve promises, award treasure, invite one-line epilogues.",
    },
  ];

  // --- Scaling & synopsis --------------------------------------------------
  const climaxEncounter = scenes[scenes.length - 1].encounter;
  const minionGroup = climaxEncounter?.groups.find((g) => g.monster.name !== villainStats.name);
  const scaling = {
    weaker: `For a struggling or smaller table: remove ${minionGroup ? `two of the ${minionGroup.monster.name.toLowerCase()}s from the finale` : "one foe from each fight"}, give ${villainName} three-quarters of full hit points, and let the first failed death save become a dramatic rescue instead.`,
    stronger: `For a confident or larger table: add two more of the weakest foes to each fight, give ${villainName} an extra action on initiative count 20 (move or one attack — no spells), and raise every listed DC by 2.`,
  };

  const totalXP = scenes.reduce((n, s) => n + (s.encounter?.totalXP ?? 0), 0);

  const nearClause = siteName.toLowerCase().includes(place.toLowerCase())
    ? ""
    : `, near the town of ${place},`;
  const synopsis =
    `${siteName}${nearClause} is now the work of ${villainName} — ${epithet} — ` +
    `who ${lowerFirst(villain.motivation)} The plan in motion: ${lowerFirst(villain.plan)} ` +
    `Drawn in by ${patron.name}, the party has until the end of the session to stop it. ` +
    `The deeper truth: ${lowerFirst(twist)}`;

  return {
    version: 2,
    input,
    moduleCode,
    title,
    tagline,
    synopsis,
    hook,
    location: { name: siteName, description: fill(site.description, vars) },
    world: { settlement: place, tavern },
    villain,
    npcs,
    scenes,
    clues,
    twist,
    map,
    treasure: { parcels, signatureItem: item },
    scaling,
    cutList: pack.cutAdvice.map((c) => fill(c, vars)),
    spareScene,
    tables,
    pacing,
    xpSummary: {
      total: totalXP,
      perCharacter: partySize > 0 ? Math.floor(totalXP / partySize) : totalXP,
    },
  };
}

function lowerFirst(s: string): string {
  return s.length ? s[0].toLowerCase() + s.slice(1) : s;
}
