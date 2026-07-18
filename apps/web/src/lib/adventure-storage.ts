import type { OneShotPacket } from "@oneshotsmith/core";

// Saved adventures live alongside saved characters in localStorage. The key
// predates the v2 engine; v1 records (no `packet.version`) are ignored.

export const ADVENTURE_STORAGE_KEY = "oneshotsmith:saved-adventures";
const MAX_ADVENTURES = 30;

export interface StoredAdventure {
  id: string;
  savedAt: string;
  label: string;
  packet: OneShotPacket;
}

function isStoredAdventure(value: unknown): value is StoredAdventure {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.savedAt === "string" &&
    typeof v.label === "string" &&
    !!v.packet &&
    typeof v.packet === "object" &&
    (v.packet as { version?: number }).version === 2
  );
}

export function readSavedAdventures(): StoredAdventure[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ADVENTURE_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isStoredAdventure);
  } catch {
    return [];
  }
}

export function saveAdventure(packet: OneShotPacket): StoredAdventure {
  const record: StoredAdventure = {
    id: crypto.randomUUID(),
    savedAt: new Date().toISOString(),
    label: packet.title,
    packet,
  };
  const existing = readSavedAdventures().filter(
    // Re-saving the same seed+settings replaces the previous copy.
    (a) => JSON.stringify(a.packet.input) !== JSON.stringify(packet.input)
  );
  const updated = [record, ...existing].slice(0, MAX_ADVENTURES);
  window.localStorage.setItem(ADVENTURE_STORAGE_KEY, JSON.stringify(updated));
  return record;
}

export function deleteAdventure(id: string): StoredAdventure[] {
  const updated = readSavedAdventures().filter((a) => a.id !== id);
  window.localStorage.setItem(ADVENTURE_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}
