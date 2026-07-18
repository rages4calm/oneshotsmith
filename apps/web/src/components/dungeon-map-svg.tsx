"use client";

import type { DungeonMap, MapRoom } from "@oneshotsmith/core";

// The classic blue-and-white module map, rendered as pure SVG.
// Field: map blue. Grid: lighter blue. Linework: white. Keys: circled numbers.

const CELL = 24;

interface Props {
  map: DungeonMap;
  /** Hide key numbers and secret doors for a player-safe handout. */
  playerView?: boolean;
  /** Stamp rooms in sequentially on mount (reduced-motion safe via CSS). */
  animate?: boolean;
  className?: string;
}

function roomCells(room: MapRoom): Set<string> {
  const cells = new Set<string>();
  for (let x = room.x; x < room.x + room.w; x++) {
    for (let y = room.y; y < room.y + room.h; y++) {
      cells.add(`${x},${y}`);
    }
  }
  return cells;
}

export function DungeonMapSVG({ map, playerView = false, animate = false, className }: Props) {
  const W = map.gridW * CELL;
  const H = map.gridH * CELL;

  const openCells = new Set<string>();
  const roomInterior = new Set<string>();
  for (const room of map.rooms) {
    for (const c of roomCells(room)) {
      openCells.add(c);
      roomInterior.add(c);
    }
  }
  for (const c of map.corridors) {
    openCells.add(`${c.x},${c.y}`);
  }

  // Corridor boundary strokes: draw a white edge wherever a corridor cell
  // borders a closed cell.
  const corridorEdges: string[] = [];
  for (const c of map.corridors) {
    const x = c.x * CELL;
    const y = c.y * CELL;
    if (!openCells.has(`${c.x},${c.y - 1}`)) corridorEdges.push(`M ${x} ${y} h ${CELL}`);
    if (!openCells.has(`${c.x},${c.y + 1}`)) corridorEdges.push(`M ${x} ${y + CELL} h ${CELL}`);
    if (!openCells.has(`${c.x - 1},${c.y}`)) corridorEdges.push(`M ${x} ${y} v ${CELL}`);
    if (!openCells.has(`${c.x + 1},${c.y}`)) corridorEdges.push(`M ${x + CELL} ${y} v ${CELL}`);
  }

  const delayFor = (i: number) => (animate ? { animationDelay: `${i * 45}ms` } : undefined);
  const keyedCount = map.rooms.filter((r) => r.key > 0).length;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role="img"
      aria-label={`Dungeon map of ${map.title}: ${keyedCount} keyed areas`}
      style={{ display: "block", width: "100%", height: "auto" }}
    >
      <title>{map.title}</title>

      {/* Blue field */}
      <rect x="0" y="0" width={W} height={H} fill="var(--map-blue)" />

      {/* Grid */}
      <g stroke="var(--map-grid)" strokeWidth="0.75" opacity="0.55">
        {Array.from({ length: map.gridW + 1 }, (_, i) => (
          <line key={`v${i}`} x1={i * CELL} y1="0" x2={i * CELL} y2={H} />
        ))}
        {Array.from({ length: map.gridH + 1 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * CELL} x2={W} y2={i * CELL} />
        ))}
      </g>

      {/* Corridors */}
      <g className={animate ? "map-stamp" : undefined} style={delayFor(map.rooms.length + 1)}>
        {map.corridors.map((c, i) => (
          <rect
            key={i}
            x={c.x * CELL}
            y={c.y * CELL}
            width={CELL}
            height={CELL}
            fill="var(--map-line)"
            opacity="0.13"
          />
        ))}
        <path
          d={corridorEdges.join(" ")}
          stroke="var(--map-line)"
          strokeWidth="2"
          strokeLinecap="square"
          fill="none"
        />
      </g>

      {/* Rooms */}
      {map.rooms.map((room, i) => {
        const x = room.x * CELL;
        const y = room.y * CELL;
        const w = room.w * CELL;
        const h = room.h * CELL;
        const cx = x + w / 2;
        const cy = y + h / 2;
        return (
          <g key={i} className={animate ? "map-stamp" : undefined} style={delayFor(i)}>
            {room.shape === "round" ? (
              <ellipse
                cx={cx}
                cy={cy}
                rx={w / 2}
                ry={h / 2}
                fill="var(--map-line)"
                fillOpacity="0.14"
                stroke="var(--map-line)"
                strokeWidth="2.5"
              />
            ) : (
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                fill="var(--map-line)"
                fillOpacity="0.14"
                stroke="var(--map-line)"
                strokeWidth="2.5"
              />
            )}
            <RoomFeature room={room} />
            {!playerView && room.key > 0 && (
              <g>
                <circle cx={cx} cy={cy} r="10.5" fill="var(--map-line)" stroke="var(--map-blue-deep)" strokeWidth="1.5" />
                <text
                  x={cx}
                  y={cy + 4.5}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fontFamily="var(--font-jost), sans-serif"
                  fill="var(--map-blue-deep)"
                >
                  {room.key}
                </text>
              </g>
            )}
          </g>
        );
      })}

      {/* Doors */}
      <g className={animate ? "map-stamp" : undefined} style={delayFor(map.rooms.length + 2)}>
        {map.doors.map((door, i) => {
          if (door.secret && playerView) return null;
          const cx = door.x * CELL + CELL / 2;
          const cy = door.y * CELL + CELL / 2;
          const w = door.orientation === "v" ? 7 : 14;
          const h = door.orientation === "v" ? 14 : 7;
          return door.secret ? (
            <text
              key={i}
              x={cx}
              y={cy + 4}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fontFamily="var(--font-jost), sans-serif"
              fill="var(--map-line)"
            >
              S
            </text>
          ) : (
            <rect
              key={i}
              x={cx - w / 2}
              y={cy - h / 2}
              width={w}
              height={h}
              fill="var(--map-blue)"
              stroke="var(--map-line)"
              strokeWidth="1.8"
            />
          );
        })}
      </g>

      {/* Entrance arrow */}
      <g className={animate ? "map-stamp" : undefined} style={delayFor(map.rooms.length + 3)}>
        <EntranceArrow map={map} />
      </g>

      {/* Compass rose */}
      <g transform={`translate(${W - 34}, 34)`} stroke="var(--map-line)" fill="var(--map-line)">
        <circle r="14" fill="none" strokeWidth="1.5" opacity="0.9" />
        <path d="M 0 -11 L 3.5 3 L 0 0.5 L -3.5 3 Z" stroke="none" />
        <text
          y="-18"
          textAnchor="middle"
          fontSize="10"
          fontWeight="600"
          fontFamily="var(--font-jost), sans-serif"
          stroke="none"
        >
          N
        </text>
      </g>

      {/* Scale bar: one square = 10 feet */}
      <g transform={`translate(18, ${H - 18})`} stroke="var(--map-line)" fill="var(--map-line)">
        <line x1="0" y1="0" x2={CELL * 3} y2="0" strokeWidth="2" />
        <line x1="0" y1="-4" x2="0" y2="4" strokeWidth="2" />
        <line x1={CELL * 3} y1="-4" x2={CELL * 3} y2="4" strokeWidth="2" />
        <text
          x={CELL * 1.5}
          y="-7"
          textAnchor="middle"
          fontSize="10"
          fontWeight="600"
          fontFamily="var(--font-jost), sans-serif"
          stroke="none"
        >
          30 FT
        </text>
      </g>
    </svg>
  );
}

function RoomFeature({ room }: { room: MapRoom }) {
  const x = room.x * CELL;
  const y = room.y * CELL;
  const w = room.w * CELL;
  const h = room.h * CELL;
  const cx = x + w / 2;
  const cy = y + h / 2;
  const stroke = "var(--map-line)";

  switch (room.feature) {
    case "columns": {
      const inset = CELL * 0.75;
      const points = [
        [x + inset, y + inset],
        [x + w - inset, y + inset],
        [x + inset, y + h - inset],
        [x + w - inset, y + h - inset],
      ];
      return (
        <g fill={stroke} opacity="0.85">
          {points.map(([px, py], i) => (
            <circle key={i} cx={px} cy={py} r="3" />
          ))}
        </g>
      );
    }
    case "water": {
      const lines = [0.3, 0.5, 0.7].map((f) => {
        const ly = y + h * f;
        const x0 = x + w * 0.18;
        const x1 = x + w * 0.82;
        const mid = (x0 + x1) / 2;
        return `M ${x0} ${ly} Q ${(x0 + mid) / 2} ${ly - 4} ${mid} ${ly} Q ${(mid + x1) / 2} ${ly + 4} ${x1} ${ly}`;
      });
      return (
        <g stroke={stroke} strokeWidth="1.5" fill="none" opacity="0.8">
          {lines.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      );
    }
    case "dais":
      return (
        <rect
          x={cx - w * 0.22}
          y={cy - h * 0.22}
          width={w * 0.44}
          height={h * 0.44}
          fill="none"
          stroke={stroke}
          strokeWidth="1.5"
          opacity="0.85"
        />
      );
    case "rubble": {
      const seedPts = [
        [0.3, 0.35], [0.55, 0.6], [0.72, 0.3], [0.4, 0.72], [0.62, 0.45],
      ];
      return (
        <g fill={stroke} opacity="0.7">
          {seedPts.map(([fx, fy], i) => (
            <circle key={i} cx={x + w * fx} cy={y + h * fy} r={i % 2 ? 2 : 2.8} />
          ))}
        </g>
      );
    }
    case "stairs": {
      const count = 4;
      return (
        <g stroke={stroke} strokeWidth="1.5" opacity="0.85">
          {Array.from({ length: count }, (_, i) => {
            const f = 0.3 + (i / (count - 1)) * 0.4;
            const half = (w * 0.14) + i * 2.5;
            return <line key={i} x1={cx - half} y1={y + h * f} x2={cx + half} y2={y + h * f} />;
          })}
        </g>
      );
    }
    default:
      return null;
  }
}

function EntranceArrow({ map }: { map: DungeonMap }) {
  const { entrance } = map;
  const ex = entrance.x * CELL + CELL / 2;
  const ey = entrance.y * CELL + CELL / 2;
  // Point toward the nearest room edge (east if the entrance sits west of center).
  const pointRight = entrance.x < map.gridW / 2;
  const dir = pointRight ? 1 : -1;
  return (
    <g fill="var(--map-line)" stroke="var(--map-line)">
      <line
        x1={ex - dir * CELL * 0.8}
        y1={ey}
        x2={ex + dir * CELL * 0.2}
        y2={ey}
        strokeWidth="2.5"
      />
      <path
        d={`M ${ex + dir * CELL * 0.45} ${ey} L ${ex + dir * CELL * 0.05} ${ey - 6.5} L ${ex + dir * CELL * 0.05} ${ey + 6.5} Z`}
        stroke="none"
      />
    </g>
  );
}
