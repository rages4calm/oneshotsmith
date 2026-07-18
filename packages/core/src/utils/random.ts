// Deterministic seeded randomness. Every generated artifact is fully
// reproducible from a seed string, which makes adventures shareable as URLs.

export type Rng = () => number;

/** FNV-1a 32-bit hash of a string — stable across platforms. */
export function hashString(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** mulberry32 PRNG — small, fast, good distribution for content generation. */
export function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Independent RNG stream for one section of a generated packet.
 * Re-rolling section "villain" (nonce++) never disturbs any other section.
 */
export function sectionRng(seed: string, section: string, nonce = 0): Rng {
  return mulberry32(hashString(`${seed}::${section}::${nonce}`));
}

/** Random 6-char base36 seed (not seeded — used to mint new adventures). */
export function randomSeed(): string {
  let s = "";
  for (let i = 0; i < 6; i++) {
    s += "0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 36)];
  }
  return s;
}

export function rollInt(rng: Rng, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1));
}

export function pick<T>(rng: Rng, list: readonly T[]): T {
  return list[Math.floor(rng() * list.length)];
}

/** Pick n distinct items (n clamped to list length), order randomized. */
export function pickN<T>(rng: Rng, list: readonly T[], n: number): T[] {
  const copy = [...list];
  const out: T[] = [];
  const count = Math.min(n, copy.length);
  for (let i = 0; i < count; i++) {
    out.push(copy.splice(Math.floor(rng() * copy.length), 1)[0]);
  }
  return out;
}

export function shuffle<T>(rng: Rng, list: readonly T[]): T[] {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function chance(rng: Rng, probability: number): boolean {
  return rng() < probability;
}

/** Fill "{key}" slots in a template from vars. Unknown keys are left intact. */
export function fill(template: string, vars: Record<string, string>): string {
  return (
    template
      .replace(/\{(\w+)\}/g, (match, key: string) =>
        Object.prototype.hasOwnProperty.call(vars, key) ? vars[key] : match
      )
      // Interpolated names often carry their own article ("The Drowned Anvil"),
      // so "at the {tavern}" would render "at the The Drowned Anvil".
      .replace(/\b([Tt]he) The\b/g, "$1")
  );
}
