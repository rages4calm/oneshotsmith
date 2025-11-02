import type { Character } from "@oneshotsmith/core";

// PDF export placeholder
export async function generateCharacterPDF(character: Character): Promise<Buffer> {
  // This would use @react-pdf/renderer to generate a beautiful character sheet
  // For now, return a placeholder
  return Buffer.from(`Character Sheet: ${character.name}`);
}

export async function generateOneShotPDF(packet: any): Promise<Buffer> {
  // Generate GM packet PDF
  return Buffer.from(`One-Shot: ${packet.title}`);
}
