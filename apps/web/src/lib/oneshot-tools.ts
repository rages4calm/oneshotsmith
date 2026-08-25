import type {
  Difficulty,
  EncounterPlan,
  OneShotInput,
  OneShotPacket,
  OneShotTheme,
  RerollSection,
  Scene,
  TimeBox,
} from "@oneshotsmith/core";
import { ALL_THEMES, describeActualDifficulty, lazyBenchmark } from "@oneshotsmith/core";
import type { ModelContextTool } from "./webmcp";

// The WebMCP tool surface for the one-shot generator.
//
// Design rules these follow:
//  • Every tool mirrors something a human can already do on this page. There is
//    no shadow API and no capability the UI lacks.
//  • Every mutating tool re-renders the page and rewrites the shareable URL, so
//    the human watches the module change as the agent works.
//  • Returns are compact summaries plus a permalink — never the whole packet.
//    The agent can pull detail deliberately with get_scene / get_current_module.
//  • The agent proposes; the page renders; the human decides. Nothing is saved,
//    sent, or printed without a tool call the human can see land on screen.

export interface ToolSettings {
  theme: OneShotTheme;
  level: number;
  partySize: number;
  difficulty: Difficulty;
  timebox: TimeBox;
}

export type ToolRerolls = Partial<Record<RerollSection, number>>;

export interface ToolState {
  settings: ToolSettings;
  seed: string;
  rerolls: ToolRerolls;
  packet: OneShotPacket | null;
}

export interface OneShotToolController {
  getState(): ToolState;
  /** Regenerate + re-render + sync the URL. Returns the fresh packet. */
  generate(patch: {
    settings?: Partial<ToolSettings>;
    seed?: string;
    rerolls?: ToolRerolls;
  }): OneShotPacket;
  /** Open the browser's print dialog on the module (the Print / PDF button). */
  print(): void;
  /** Flash a line on the page so the human sees what the agent just did. */
  announce(message: string): void;
  /** Absolute permalink for a given input. */
  shareUrl(input: OneShotInput): string;
  /** Fresh random seed (same source the "Roll a new adventure" button uses). */
  newSeed(): string;
}

const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard", "Deadly"];
const TIMEBOXES: TimeBox[] = ["2h", "3h", "4h"];

export const THEME_SUMMARIES: Record<OneShotTheme, string> = {
  "Dungeon Crawl":
    "Sealed doors, old wards, deep trouble. A buried site with a keyed map, guardians, and something the seals were built to hold.",
  Heist:
    "Case the target, crack the vault, get out. An urban job with security to beat, a social way in, and an escape that is its own scene.",
  Rescue:
    "They are alive and the clock is running. Track the captors, get inside, and bring people out — slow, scared people with opinions.",
  Haunting:
    "The house has rules; learn them. A gothic investigation where the tragedy is solvable and mercy is usually the better ending.",
  Wilderness:
    "The land itself does not want you. The route is the dungeon: weather, crossings, and a lair at the far end.",
  Mystery:
    "Every clue is true; someone is lying. A crime with a real timeline, suspects with motives, and evidence that carries mechanical weight.",
};

// --- helpers ---------------------------------------------------------------

const clamp = (n: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, Math.round(n)));

function matchTheme(value: unknown): OneShotTheme | null {
  if (typeof value !== "string") return null;
  const needle = value.trim().toLowerCase().replace(/[\s_-]+/g, " ");
  return (
    ALL_THEMES.find((t) => t.toLowerCase() === needle) ??
    ALL_THEMES.find((t) => t.toLowerCase().replace(/\s+/g, "") === needle.replace(/\s+/g, "")) ??
    null
  );
}

function matchEnum<T extends string>(value: unknown, options: T[]): T | null {
  if (typeof value !== "string") return null;
  const needle = value.trim().toLowerCase();
  return options.find((o) => o.toLowerCase() === needle) ?? null;
}

function encounterLine(e: EncounterPlan, level: number, partySize: number) {
  return {
    creatures: e.groups
      .map((g) => (g.count > 1 ? `${g.count} × ${g.monster.name}` : g.monster.name))
      .join(", "),
    adjustedXP: e.adjustedXP,
    budget: e.budget,
    multiplier: e.multiplier,
    readsAs: describeActualDifficulty(e.adjustedXP, level, partySize),
    lazyBenchmarkFlagsDeadly: lazyBenchmark(e.groups, level, partySize).deadly,
  };
}

function sceneDigest(scene: Scene, level: number, partySize: number) {
  return {
    number: scene.key,
    title: scene.title,
    type: scene.type,
    minutes: scene.minutes,
    cuttable: Boolean(scene.cuttable),
    encounter: scene.encounter ? encounterLine(scene.encounter, level, partySize) : undefined,
  };
}

function inputFrom(state: ToolState): OneShotInput {
  return {
    seed: state.seed,
    theme: state.settings.theme,
    level: state.settings.level,
    partySize: state.settings.partySize,
    difficulty: state.settings.difficulty,
    timebox: state.settings.timebox,
    rerolls: Object.keys(state.rerolls).length ? state.rerolls : undefined,
  };
}

function moduleSummary(
  packet: OneShotPacket,
  controller: OneShotToolController,
  extra: Record<string, unknown> = {}
) {
  const { level, partySize } = packet.input;
  return {
    moduleCode: packet.moduleCode,
    title: packet.title,
    tagline: packet.tagline,
    theme: packet.input.theme,
    seed: packet.input.seed,
    forParty: `${partySize} characters of level ${level}`,
    session: packet.input.timebox,
    difficulty: packet.input.difficulty,
    site: packet.location.name,
    villain: `${packet.villain.name} — ${packet.villain.epithet}`,
    sceneCount: packet.scenes.length,
    totalCombatXP: packet.xpSummary.total,
    xpPerCharacter: packet.xpSummary.perCharacter,
    shareUrl: controller.shareUrl(packet.input),
    renderedOnPage: true,
    ...extra,
  };
}

const NO_MODULE = {
  ok: false as const,
  error: "no_module_yet",
  message:
    "Nothing is on the page yet. Call generate_oneshot first (or ask the human to press Roll a new adventure).",
};

// --- the tools -------------------------------------------------------------

export function buildOneShotTools(controller: OneShotToolController): ModelContextTool[] {
  return [
    {
      name: "generate_oneshot",
      title: "Generate a one-shot adventure",
      description:
        "Forge a complete, table-ready D&D 5e one-shot and render it on the page: keyed dungeon map, scenes with read-aloud text, encounters built against the real Dungeon Master's Guide XP budget, a villain with a plan, secrets, and treasure. Choose a theme and the table's shape (level 1-20, 2-7 players, difficulty, session length). Omit the seed to roll a fresh adventure; pass a seed to reproduce a specific one exactly. Generation is deterministic and happens in the browser — the same seed and settings always produce the same module.",
      inputSchema: {
        type: "object",
        properties: {
          theme: {
            type: "string",
            enum: [...ALL_THEMES],
            description: "The shape of the trouble. Call list_themes for descriptions.",
          },
          level: {
            type: "integer",
            minimum: 1,
            maximum: 20,
            description: "Party level, 1-20. Level 3 is the classic one-shot default.",
          },
          partySize: {
            type: "integer",
            minimum: 2,
            maximum: 7,
            description: "How many player characters are at the table (2-7).",
          },
          difficulty: {
            type: "string",
            enum: DIFFICULTIES,
            description:
              "Encounter difficulty target from the 2014 DMG thresholds. One-shot parties can spend everything, so Hard reads as a good default.",
          },
          timebox: {
            type: "string",
            enum: TIMEBOXES,
            description:
              "Real hours at the table. This changes the actual structure: 2h yields 4 scenes, 3h yields 5, 4h yields 6.",
          },
          seed: {
            type: "string",
            pattern: "^[a-zA-Z0-9]{1,16}$",
            description:
              "Optional. Reuse a seed to regenerate a previous adventure identically.",
          },
        },
        required: ["theme"],
      },
      execute: async (input) => {
        const current = controller.getState();
        const theme = matchTheme(input.theme) ?? current.settings.theme;
        const settings: ToolSettings = {
          theme,
          level:
            typeof input.level === "number" ? clamp(input.level, 1, 20) : current.settings.level,
          partySize:
            typeof input.partySize === "number"
              ? clamp(input.partySize, 2, 7)
              : current.settings.partySize,
          difficulty: matchEnum(input.difficulty, DIFFICULTIES) ?? current.settings.difficulty,
          timebox: matchEnum(input.timebox, TIMEBOXES) ?? current.settings.timebox,
        };
        const rawSeed = typeof input.seed === "string" ? input.seed : "";
        const seed = rawSeed.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 16) || controller.newSeed();

        // Fresh seed means a fresh adventure: drop any inherited re-rolls.
        const packet = controller.generate({ settings, seed, rerolls: {} });
        controller.announce(`Agent forged “${packet.title}” (${settings.theme}, seed ${seed}).`);

        return {
          ok: true,
          ...moduleSummary(packet, controller, {
            scenes: packet.scenes.map((s) => sceneDigest(s, settings.level, settings.partySize)),
            nextSteps:
              "Use reroll_section to change one part while keeping the rest, get_scene for full scene detail, or adjust_party to re-budget the fights.",
          }),
        };
      },
    },

    {
      name: "reroll_section",
      title: "Re-roll one part of the adventure",
      description:
        "Change exactly one part of the module on screen and keep everything else identical — new villain with the same map, a different twist with the same cast, another treasure hoard with the same scenes. This is surgical: each section has its own dice, so re-rolling one never disturbs the others, and the result stays reproducible from the URL. Use it when the human likes the adventure but wants one element different.",
      inputSchema: {
        type: "object",
        properties: {
          section: {
            type: "string",
            enum: ["title", "hook", "villain", "npcs", "scenes", "twist", "treasure", "map", "tables"],
            description:
              "Which part to re-roll. title = name and tagline; hook = the opening and its alternates; villain = the antagonist, their plan and stat block; npcs = the supporting cast; scenes = the run of play; twist = the reveal and the secrets list; treasure = parcels and the signature magic item; map = the dungeon layout; tables = the random tables.",
          },
        },
        required: ["section"],
      },
      execute: async (input) => {
        const state = controller.getState();
        if (!state.packet) return NO_MODULE;

        const section = input.section as RerollSection;
        const before = state.packet;
        const rerolls: ToolRerolls = {
          ...state.rerolls,
          [section]: (state.rerolls[section] ?? 0) + 1,
        };
        const packet = controller.generate({ rerolls });

        const changed: Record<string, { from: string; to: string }> = {};
        if (before.title !== packet.title) changed.title = { from: before.title, to: packet.title };
        if (before.villain.name !== packet.villain.name) {
          changed.villain = {
            from: `${before.villain.name} — ${before.villain.epithet}`,
            to: `${packet.villain.name} — ${packet.villain.epithet}`,
          };
        }
        if (before.twist !== packet.twist) changed.twist = { from: before.twist, to: packet.twist };
        if (before.treasure.signatureItem.name !== packet.treasure.signatureItem.name) {
          changed.signatureItem = {
            from: before.treasure.signatureItem.name,
            to: packet.treasure.signatureItem.name,
          };
        }
        const beforeScenes = before.scenes.map((s) => s.title).join(" | ");
        const afterScenes = packet.scenes.map((s) => s.title).join(" | ");
        if (beforeScenes !== afterScenes) changed.scenes = { from: beforeScenes, to: afterScenes };

        controller.announce(`Agent re-rolled the ${section}.`);

        return {
          ok: true,
          section,
          rerollCount: rerolls[section],
          changed,
          keptIdentical: {
            map: JSON.stringify(before.map) === JSON.stringify(packet.map),
            villain: before.villain.name === packet.villain.name,
            scenes: beforeScenes === afterScenes,
            title: before.title === packet.title,
          },
          ...moduleSummary(packet, controller),
        };
      },
    },

    {
      name: "get_current_module",
      title: "Read the module on screen",
      description:
        "Return a compact but complete picture of the adventure currently displayed: title, premise, villain and their plan, the site, the scene run-down with encounter math, the secrets-and-clues list, and the twist. Call this before advising on the adventure, rewriting any of its prose, or deciding which section is worth re-rolling.",
      annotations: { readOnlyHint: true },
      inputSchema: { type: "object", properties: {} },
      execute: async () => {
        const state = controller.getState();
        const packet = state.packet;
        if (!packet) return NO_MODULE;
        const { level, partySize } = packet.input;

        return {
          ok: true,
          ...moduleSummary(packet, controller),
          synopsis: packet.synopsis,
          hook: packet.hook.summary,
          site: { name: packet.location.name, description: packet.location.description },
          town: packet.world?.settlement,
          villainDetail: {
            name: packet.villain.name,
            epithet: packet.villain.epithet,
            motivation: packet.villain.motivation,
            plan: packet.villain.plan,
            secret: packet.villain.secret,
            statBlock: `${packet.villain.stats.name} (CR ${packet.villain.stats.cr}, AC ${packet.villain.stats.ac}, ${packet.villain.stats.hp} hp)`,
          },
          cast: packet.npcs.map((n) => `${n.name} — ${n.ancestry} ${n.occupation}; wants: ${n.goal}`),
          scenes: packet.scenes.map((s) => sceneDigest(s, level, partySize)),
          spareScene: packet.spareScene?.title,
          cluesAndSecrets: packet.clues,
          twist: packet.twist,
          signatureItem: packet.treasure.signatureItem.name,
        };
      },
    },

    {
      name: "adjust_party",
      title: "Re-budget for a different table",
      description:
        "Keep the same story, map, villain and scenes, but rebuild the encounter math for a different table — a different party level, a different number of players, a harder or gentler target, or a longer or shorter session. Every fight is re-costed against the exact DMG XP thresholds for the new party. Use this when the human says someone dropped out, an extra player showed up, the table wants more danger, or they only have two hours. Note that changing the session length changes how many scenes the adventure has.",
      inputSchema: {
        type: "object",
        properties: {
          level: { type: "integer", minimum: 1, maximum: 20, description: "New party level." },
          partySize: {
            type: "integer",
            minimum: 2,
            maximum: 7,
            description: "New number of player characters.",
          },
          difficulty: {
            type: "string",
            enum: DIFFICULTIES,
            description: "New encounter difficulty target.",
          },
          timebox: {
            type: "string",
            enum: TIMEBOXES,
            description: "New session length — this adds or removes scenes.",
          },
        },
      },
      execute: async (input) => {
        const state = controller.getState();
        if (!state.packet) return NO_MODULE;

        const patch: Partial<ToolSettings> = {};
        if (typeof input.level === "number") patch.level = clamp(input.level, 1, 20);
        if (typeof input.partySize === "number") patch.partySize = clamp(input.partySize, 2, 7);
        const difficulty = matchEnum(input.difficulty, DIFFICULTIES);
        if (difficulty) patch.difficulty = difficulty;
        const timebox = matchEnum(input.timebox, TIMEBOXES);
        if (timebox) patch.timebox = timebox;

        if (Object.keys(patch).length === 0) {
          return {
            ok: false,
            error: "nothing_to_change",
            message: "Pass at least one of level, partySize, difficulty, or timebox.",
          };
        }

        const before = state.packet;
        const packet = controller.generate({ settings: patch });
        const { level, partySize } = packet.input;

        controller.announce(
          `Agent re-budgeted the module for ${packet.input.partySize} players of level ${packet.input.level} (${packet.input.difficulty}).`
        );

        return {
          ok: true,
          nowFor: `${partySize} characters of level ${level}, ${packet.input.difficulty}, ${packet.input.timebox}`,
          storyUnchanged: before.title === packet.title && before.villain.name === packet.villain.name,
          combatXP: { before: before.xpSummary.total, after: packet.xpSummary.total },
          encounters: packet.scenes
            .filter((s) => s.encounter)
            .map((s) => ({ scene: s.title, ...encounterLine(s.encounter!, level, partySize) })),
          ...moduleSummary(packet, controller),
        };
      },
    },

    {
      name: "get_scene",
      title: "Read one scene in full",
      description:
        "Return everything for a single numbered scene: the boxed read-aloud text, the DM notes, how the party gets there from the previous scene, the full encounter with creature stat lines and XP math, any skill challenge with its DCs, and the clue planted there. Scene numbers match the circled numbers on the dungeon map. Use this when the human asks about one part of the session, or when you are about to rewrite or voice that scene's text.",
      annotations: { readOnlyHint: true },
      inputSchema: {
        type: "object",
        properties: {
          number: {
            type: "integer",
            minimum: 1,
            description: "Scene number, matching the circled number on the map (1 is the opening).",
          },
        },
        required: ["number"],
      },
      execute: async (input) => {
        const state = controller.getState();
        const packet = state.packet;
        if (!packet) return NO_MODULE;

        const index = typeof input.number === "number" ? Math.round(input.number) : 0;
        const scene = packet.scenes.find((s) => s.key === index);
        if (!scene) {
          return {
            ok: false,
            error: "no_such_scene",
            message: `This module has scenes 1-${packet.scenes.length}.`,
            available: packet.scenes.map((s) => ({ number: s.key, title: s.title })),
          };
        }

        const { level, partySize } = packet.input;
        return {
          ok: true,
          number: scene.key,
          title: scene.title,
          type: scene.type,
          minutes: scene.minutes,
          cuttable: Boolean(scene.cuttable),
          gettingThere: scene.transition,
          readAloud: scene.readAloud,
          summary: scene.summary,
          dmNotes: scene.details,
          cluePlantedHere: scene.clue,
          skillChallenge: scene.skillChallenge,
          encounter: scene.encounter
            ? {
                ...encounterLine(scene.encounter, level, partySize),
                terrain: scene.encounter.terrain,
                tactics: scene.encounter.tactics,
                creatures: scene.encounter.groups.map((g) => ({
                  name: g.monster.name,
                  count: g.count,
                  cr: g.monster.cr,
                  ac: g.monster.ac,
                  hp: g.monster.hp,
                  attack: g.monster.attack,
                  note: g.monster.note,
                })),
              }
            : undefined,
        };
      },
    },

    {
      name: "list_themes",
      title: "List the adventure themes",
      description:
        "List the six adventure themes with a one-line description of the kind of session each produces. Use this to pick a theme that matches what the human described, or to offer them a choice in their own terms.",
      annotations: { readOnlyHint: true },
      inputSchema: { type: "object", properties: {} },
      execute: async () => ({
        ok: true,
        themes: ALL_THEMES.map((theme) => ({ theme, description: THEME_SUMMARIES[theme] })),
      }),
    },

    {
      name: "share_link",
      title: "Get the shareable permalink",
      description:
        "Return the permanent link to the module currently on screen. Because generation is deterministic, anyone who opens this URL gets this exact adventure — same map, same villain, same encounter math — with no account and no server. Give this to the human when they want to keep, bookmark, or send the adventure to their table.",
      annotations: { readOnlyHint: true },
      inputSchema: { type: "object", properties: {} },
      execute: async () => {
        const state = controller.getState();
        if (!state.packet) return NO_MODULE;
        return {
          ok: true,
          title: state.packet.title,
          seed: state.packet.input.seed,
          shareUrl: controller.shareUrl(inputFrom(state)),
          note: "Same seed and settings always regenerate this exact module.",
        };
      },
    },

    {
      name: "export_module",
      title: "Print or save as PDF",
      description:
        "Open the browser's print dialog on the module, laid out as a proper adventure module: boxed read-aloud text, keyed entries, stat tables, and the player-safe version of the map on its own page as a handout. The human completes or cancels the dialog themselves — this only opens it. Use it when they say they want to print, save a PDF, or bring the adventure to the table on paper.",
      inputSchema: { type: "object", properties: {} },
      execute: async () => {
        const state = controller.getState();
        if (!state.packet) return NO_MODULE;
        controller.announce("Agent opened the print dialog — the module prints as a paper module.");
        controller.print();
        return {
          ok: true,
          message:
            "Print dialog opened. The human chooses the printer or Save as PDF; nothing leaves the browser.",
          title: state.packet.title,
          pages: "About 12 pages, including the player map handout.",
        };
      },
    },
  ];
}
