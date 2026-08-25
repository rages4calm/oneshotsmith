import { describe, expect, it, beforeEach } from "vitest";
import { generateOneShot, type OneShotInput, type OneShotPacket } from "@oneshotsmith/core";
import {
  buildOneShotTools,
  type OneShotToolController,
  type ToolRerolls,
  type ToolSettings,
  type ToolState,
} from "./oneshot-tools";
import type { ModelContextTool } from "./webmcp";

// A stand-in for the page: real generation, real state transitions, no DOM.
class FakeController implements OneShotToolController {
  settings: ToolSettings = {
    theme: "Dungeon Crawl",
    level: 3,
    partySize: 4,
    difficulty: "Medium",
    timebox: "3h",
  };
  seed = "";
  rerolls: ToolRerolls = {};
  packet: OneShotPacket | null = null;
  announcements: string[] = [];
  printCalls = 0;
  private seedCounter = 0;

  getState(): ToolState {
    return {
      settings: this.settings,
      seed: this.seed,
      rerolls: this.rerolls,
      packet: this.packet,
    };
  }

  generate(patch: {
    settings?: Partial<ToolSettings>;
    seed?: string;
    rerolls?: ToolRerolls;
  }): OneShotPacket {
    if (patch.settings) this.settings = { ...this.settings, ...patch.settings };
    if (patch.seed !== undefined) this.seed = patch.seed;
    if (patch.rerolls) this.rerolls = patch.rerolls;
    const input: OneShotInput = {
      seed: this.seed,
      theme: this.settings.theme,
      level: this.settings.level,
      partySize: this.settings.partySize,
      difficulty: this.settings.difficulty,
      timebox: this.settings.timebox,
      rerolls: Object.keys(this.rerolls).length ? this.rerolls : undefined,
    };
    this.packet = generateOneShot(input);
    return this.packet;
  }

  print() {
    this.printCalls += 1;
  }

  announce(message: string) {
    this.announcements.push(message);
  }

  shareUrl(input: OneShotInput) {
    return `https://example.test/one-shot-generator/?s=${input.seed}&t=${input.theme}`;
  }

  newSeed() {
    this.seedCounter += 1;
    return `fake${this.seedCounter}`;
  }
}

// Tool returns are deliberately loose (any JSON-serializable value, per spec),
// so assertions index into a record rather than a typed shape.
type ToolResult = Record<string, never> & { [key: string]: unknown };

const call = (
  tools: ModelContextTool[],
  name: string,
  input: Record<string, unknown> = {}
): Promise<ToolResult> => {
  const tool = tools.find((t) => t.name === name);
  if (!tool) throw new Error(`no such tool: ${name}`);
  return tool.execute(input, {}) as Promise<ToolResult>;
};

describe("WebMCP tool surface", () => {
  let controller: FakeController;
  let tools: ModelContextTool[];

  beforeEach(() => {
    controller = new FakeController();
    tools = buildOneShotTools(controller);
  });

  it("registers the eight documented tools with spec-legal names and descriptions", () => {
    expect(tools.map((t) => t.name).sort()).toEqual(
      [
        "adjust_party",
        "export_module",
        "generate_oneshot",
        "get_current_module",
        "get_scene",
        "list_themes",
        "reroll_section",
        "share_link",
      ].sort()
    );
    for (const tool of tools) {
      // Spec: 1-128 chars, alphanumeric plus _ - .
      expect(tool.name).toMatch(/^[A-Za-z0-9_.-]{1,128}$/);
      expect(tool.description.length).toBeGreaterThan(40);
      expect(tool.title).toBeTruthy();
    }
  });

  it("marks read-only tools so agents know what is safe to call", () => {
    const readOnly = tools
      .filter((t) => t.annotations?.readOnlyHint)
      .map((t) => t.name)
      .sort();
    expect(readOnly).toEqual(["get_current_module", "get_scene", "list_themes", "share_link"]);
  });

  it("generate_oneshot renders a module and returns a compact summary", async () => {
    const result = await call(tools, "generate_oneshot", {
      theme: "Haunting",
      level: 5,
      partySize: 4,
      difficulty: "Hard",
      timebox: "3h",
    });

    expect(result.ok).toBe(true);
    expect(result.renderedOnPage).toBe(true);
    expect(controller.packet).not.toBeNull();
    expect(controller.packet!.input.theme).toBe("Haunting");
    expect(result.sceneCount).toBe(5);
    expect(result.shareUrl).toContain(result.seed);
    // Compact: a summary, not the whole packet.
    expect(JSON.stringify(result).length).toBeLessThan(
      JSON.stringify(controller.packet).length / 2
    );
    // The human sees it happen.
    expect(controller.announcements).toHaveLength(1);
  });

  it("generate_oneshot tolerates loose agent input", async () => {
    const result = await call(tools, "generate_oneshot", {
      theme: "dungeon crawl",
      level: 99,
      partySize: 1,
      difficulty: "deadly",
      seed: "A-b!C9",
    });
    expect(result.ok).toBe(true);
    expect(controller.settings.level).toBe(20);
    expect(controller.settings.partySize).toBe(2);
    expect(controller.settings.difficulty).toBe("Deadly");
    expect(controller.seed).toBe("abc9");
  });

  it("reroll_section changes one part and provably keeps the map", async () => {
    await call(tools, "generate_oneshot", { theme: "Dungeon Crawl", seed: "keepmap" });
    const before = controller.packet!;

    const result = await call(tools, "reroll_section", { section: "villain" });

    expect(result.ok).toBe(true);
    expect(result.section).toBe("villain");
    expect(result.keptIdentical.map).toBe(true);
    expect(result.keptIdentical.scenes).toBe(true);
    expect(result.keptIdentical.title).toBe(true);
    expect(controller.packet!.map).toEqual(before.map);
    expect(controller.packet!.title).toEqual(before.title);
  });

  it("adjust_party re-budgets encounters without touching the story", async () => {
    await call(tools, "generate_oneshot", { theme: "Rescue", level: 3, partySize: 4, seed: "party" });
    const before = controller.packet!;

    const result = await call(tools, "adjust_party", { level: 8, partySize: 6, difficulty: "Deadly" });

    expect(result.ok).toBe(true);
    expect(result.storyUnchanged).toBe(true);
    expect(controller.packet!.title).toBe(before.title);
    expect(controller.packet!.villain.name).toBe(before.villain.name);
    expect(result.combatXP.after).toBeGreaterThan(result.combatXP.before);
    for (const encounter of result.encounters) {
      expect(encounter.budget).toBeGreaterThan(0);
      expect(encounter.creatures.length).toBeGreaterThan(0);
    }
  });

  it("guards every stateful tool before a module exists", async () => {
    for (const name of ["reroll_section", "adjust_party", "get_current_module", "get_scene", "share_link", "export_module"]) {
      const result = await call(tools, name, { section: "villain", number: 1, level: 5 });
      expect(result.ok, name).toBe(false);
      expect(result.error, name).toBe("no_module_yet");
    }
    expect(controller.printCalls).toBe(0);
  });

  it("get_scene returns full detail and reports valid numbers on a miss", async () => {
    await call(tools, "generate_oneshot", { theme: "Mystery", seed: "scenes" });

    const scene = await call(tools, "get_scene", { number: 1 });
    expect(scene.ok).toBe(true);
    expect(scene.number).toBe(1);
    expect(scene.readAloud).toBeTruthy();
    expect(Array.isArray(scene.dmNotes)).toBe(true);

    const miss = await call(tools, "get_scene", { number: 99 });
    expect(miss.ok).toBe(false);
    expect(miss.available.length).toBe(controller.packet!.scenes.length);
  });

  it("list_themes describes all six themes without needing a module", async () => {
    const result = await call(tools, "list_themes");
    expect(result.themes).toHaveLength(6);
    for (const entry of result.themes) {
      expect(entry.description.length).toBeGreaterThan(30);
    }
  });

  it("share_link returns a permalink that regenerates the same module", async () => {
    await call(tools, "generate_oneshot", { theme: "Wilderness", seed: "shared" });
    const result = await call(tools, "share_link");
    expect(result.ok).toBe(true);
    expect(result.seed).toBe("shared");
    expect(result.shareUrl).toContain("shared");
  });

  it("export_module opens the print dialog only when there is something to print", async () => {
    await call(tools, "generate_oneshot", { theme: "Heist", seed: "printme" });
    const result = await call(tools, "export_module");
    expect(result.ok).toBe(true);
    expect(controller.printCalls).toBe(1);
  });

  it("every tool returns JSON-serializable output, as the spec requires", async () => {
    await call(tools, "generate_oneshot", { theme: "Dungeon Crawl", seed: "serial" });
    for (const tool of tools) {
      const result = await tool.execute({ section: "twist", number: 1 }, {});
      expect(() => JSON.stringify(result)).not.toThrow();
      expect(JSON.stringify(result)).not.toContain("undefined");
    }
  });
});
