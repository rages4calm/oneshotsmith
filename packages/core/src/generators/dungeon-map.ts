import type { DungeonMap, MapDoor, MapRoom } from "../types";
import type { Rng } from "../utils/random";
import { pick, rollInt, shuffle } from "../utils/random";

// Procedural site maps in the spirit of classic module cartography: rooms and
// corridors on a square grid, meant to be drawn white-on-blue. Pure data —
// rendering happens in the web app as SVG.

interface PlacedRoom {
  x: number;
  y: number;
  w: number;
  h: number;
  cx: number;
  cy: number;
  shape: "rect" | "round";
}

const GRID_W = 30;
const GRID_H = 20;

function overlaps(a: PlacedRoom, b: PlacedRoom, gap = 2): boolean {
  return (
    a.x - gap < b.x + b.w &&
    a.x + a.w + gap > b.x &&
    a.y - gap < b.y + b.h &&
    a.y + a.h + gap > b.y
  );
}

function placeRooms(rng: Rng, count: number): PlacedRoom[] {
  const rooms: PlacedRoom[] = [];
  let attempts = 0;
  while (rooms.length < count && attempts < 600) {
    attempts++;
    const w = rollInt(rng, 3, 6);
    const h = rollInt(rng, 3, 5);
    const x = rollInt(rng, 1, GRID_W - w - 1);
    const y = rollInt(rng, 1, GRID_H - h - 1);
    const room: PlacedRoom = {
      x, y, w, h,
      cx: Math.floor(x + w / 2),
      cy: Math.floor(y + h / 2),
      shape: rng() < 0.14 && w >= 4 && h >= 4 ? "round" : "rect",
    };
    if (!rooms.some((r) => overlaps(r, room))) rooms.push(room);
  }
  return rooms;
}

/** Prim's MST over room centers (Manhattan distance) plus 0–2 loop edges. */
function connectRooms(rng: Rng, rooms: PlacedRoom[]): Array<[number, number]> {
  if (rooms.length <= 1) return [];
  const inTree = new Set<number>([0]);
  const edges: Array<[number, number]> = [];
  while (inTree.size < rooms.length) {
    let best: [number, number] | null = null;
    let bestDist = Infinity;
    for (const i of inTree) {
      for (let j = 0; j < rooms.length; j++) {
        if (inTree.has(j)) continue;
        const d =
          Math.abs(rooms[i].cx - rooms[j].cx) + Math.abs(rooms[i].cy - rooms[j].cy);
        if (d < bestDist) {
          bestDist = d;
          best = [i, j];
        }
      }
    }
    if (!best) break;
    edges.push(best);
    inTree.add(best[1]);
  }
  // A loop or two makes the map feel explorable rather than a straight line.
  const extraLoops = rooms.length >= 5 ? rollInt(rng, 1, 2) : 0;
  for (let n = 0; n < extraLoops; n++) {
    const candidates: Array<[number, number, number]> = [];
    for (let i = 0; i < rooms.length; i++) {
      for (let j = i + 1; j < rooms.length; j++) {
        if (edges.some(([a, b]) => (a === i && b === j) || (a === j && b === i))) continue;
        const d =
          Math.abs(rooms[i].cx - rooms[j].cx) + Math.abs(rooms[i].cy - rooms[j].cy);
        candidates.push([i, j, d]);
      }
    }
    candidates.sort((a, b) => a[2] - b[2]);
    const cand = candidates[rollInt(rng, 0, Math.min(2, candidates.length - 1))];
    if (cand) edges.push([cand[0], cand[1]]);
  }
  return edges;
}

function inRoom(rooms: PlacedRoom[], x: number, y: number): number {
  for (let i = 0; i < rooms.length; i++) {
    const r = rooms[i];
    if (x >= r.x && x < r.x + r.w && y >= r.y && y < r.y + r.h) return i;
  }
  return -1;
}

/** Carve an L-shaped corridor between two room centers. */
function carveCorridor(
  rng: Rng,
  rooms: PlacedRoom[],
  a: PlacedRoom,
  b: PlacedRoom,
  corridorCells: Set<string>,
  doors: MapDoor[]
): void {
  const horizontalFirst = rng() < 0.5;
  const points: Array<{ x: number; y: number }> = [];
  let x = a.cx;
  let y = a.cy;
  const stepX = () => {
    while (x !== b.cx) {
      x += Math.sign(b.cx - x);
      points.push({ x, y });
    }
  };
  const stepY = () => {
    while (y !== b.cy) {
      y += Math.sign(b.cy - y);
      points.push({ x, y });
    }
  };
  if (horizontalFirst) {
    stepX();
    stepY();
  } else {
    stepY();
    stepX();
  }

  let prevInside = true; // starts at a's center
  let prev = { x: a.cx, y: a.cy };
  for (const p of points) {
    const roomIdx = inRoom(rooms, p.x, p.y);
    const inside = roomIdx >= 0;
    if (!inside) corridorCells.add(`${p.x},${p.y}`);
    // A door goes at the cell where we cross a room boundary.
    if (inside !== prevInside) {
      const doorCell = inside ? p : prev;
      const orientation = p.x !== prev.x ? "v" : "h"; // wall crossed is vertical if moving horizontally
      if (!doors.some((d) => d.x === doorCell.x && d.y === doorCell.y)) {
        doors.push({ x: doorCell.x, y: doorCell.y, orientation });
      }
    }
    prevInside = inside;
    prev = p;
  }
}

export interface DungeonMapInput {
  rng: Rng;
  /** Labels for keyed rooms, in progression order (scene order). */
  keyedLabels: string[];
  /** Extra unkeyed room labels for texture. */
  extraLabels: string[];
  title: string;
}

export function generateDungeonMap(input: DungeonMapInput): DungeonMap {
  const { rng, keyedLabels, extraLabels, title } = input;
  const keyed = keyedLabels.length;
  const total = keyed + Math.min(extraLabels.length, keyed >= 6 ? 2 : 3);

  let placed = placeRooms(rng, total);
  // Guarantee at least the keyed rooms exist even on pathological seeds.
  while (placed.length < keyed) {
    placed = placeRooms(rng, total);
  }

  // Entrance room: the one nearest the west/south edge, keys ascend along a
  // breadth-first walk of the connection graph so numbers follow progression.
  const edges = connectRooms(rng, placed);
  const adj = new Map<number, number[]>();
  placed.forEach((_, i) => adj.set(i, []));
  for (const [i, j] of edges) {
    adj.get(i)!.push(j);
    adj.get(j)!.push(i);
  }

  let entranceIdx = 0;
  let bestScore = Infinity;
  placed.forEach((r, i) => {
    const score = Math.min(r.x, GRID_W - (r.x + r.w)) + r.y * 0.35;
    if (score < bestScore) {
      bestScore = score;
      entranceIdx = i;
    }
  });

  const order: number[] = [];
  const seen = new Set<number>([entranceIdx]);
  const queue = [entranceIdx];
  while (queue.length) {
    const i = queue.shift()!;
    order.push(i);
    const neighbors = shuffle(rng, adj.get(i)!.filter((n) => !seen.has(n)));
    for (const n of neighbors) {
      seen.add(n);
      queue.push(n);
    }
  }
  // Isolated rooms (shouldn't happen, but belt and braces).
  placed.forEach((_, i) => {
    if (!seen.has(i)) order.push(i);
  });

  const corridorCells = new Set<string>();
  const doors: MapDoor[] = [];
  for (const [i, j] of edges) {
    carveCorridor(rng, placed, placed[i], placed[j], corridorCells, doors);
  }

  const features: MapRoom["feature"][] = ["columns", "water", "dais", "rubble", "stairs"];
  const rooms: MapRoom[] = order.map((placedIdx, orderIdx) => {
    const r = placed[placedIdx];
    const isKeyed = orderIdx < keyed;
    return {
      x: r.x,
      y: r.y,
      w: r.w,
      h: r.h,
      key: isKeyed ? orderIdx + 1 : 0,
      label: isKeyed
        ? keyedLabels[orderIdx]
        : extraLabels[orderIdx - keyed] ?? "Side chamber",
      shape: r.shape,
      feature: rng() < 0.55 ? pick(rng, features) : undefined,
    };
  });

  // Entrance marker just outside the entrance room on its nearest edge.
  const er = placed[entranceIdx];
  const entrance =
    er.x <= GRID_W - (er.x + er.w)
      ? { x: er.x - 1, y: er.cy }
      : { x: er.x + er.w, y: er.cy };

  // One secret door for flavor on bigger maps.
  if (doors.length > 3 && rng() < 0.6) {
    doors[rollInt(rng, 1, doors.length - 1)].secret = true;
  }

  return {
    gridW: GRID_W,
    gridH: GRID_H,
    rooms,
    corridors: [...corridorCells].map((s) => {
      const [x, y] = s.split(",").map(Number);
      return { x, y };
    }),
    doors,
    entrance,
    title,
  };
}
