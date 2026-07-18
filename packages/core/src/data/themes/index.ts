import type { OneShotTheme } from "../../types";
import type { ThemePack } from "./schema";
import { DUNGEON_CRAWL } from "./dungeon-crawl";
import { HEIST } from "./heist";
import { RESCUE } from "./rescue";
import { HAUNTING } from "./haunting";
import { WILDERNESS } from "./wilderness";
import { MYSTERY } from "./mystery";

export const THEME_PACKS: Record<OneShotTheme, ThemePack> = {
  "Dungeon Crawl": DUNGEON_CRAWL,
  "Heist": HEIST,
  "Rescue": RESCUE,
  "Haunting": HAUNTING,
  "Wilderness": WILDERNESS,
  "Mystery": MYSTERY,
};

export const ALL_THEMES = Object.keys(THEME_PACKS) as OneShotTheme[];

export type { ThemePack } from "./schema";
