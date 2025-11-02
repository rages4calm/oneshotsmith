import { sqliteTable, text, integer, blob } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  handle: text("handle").notNull(),
  email: text("email"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});

export const lobbies = sqliteTable("lobbies", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  gmUserId: text("gm_user_id").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  houseRules: blob("house_rules", { mode: "json" }),
  consent: blob("consent", { mode: "json" }),
});

export const characters = sqliteTable("characters", {
  id: text("id").primaryKey(),
  lobbyId: text("lobby_id").notNull(),
  ownerUserId: text("owner_user_id"),
  name: text("name").notNull(),
  level: integer("level").notNull(),
  role: text("role").notNull(),
  srdBuild: blob("srd_build", { mode: "json" }),
  stats: blob("stats", { mode: "json" }),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});

export const srdDocuments = sqliteTable("srd_documents", {
  id: text("id").primaryKey(),
  type: text("type").notNull(), // "race" | "class" | "feature" | "spell" | "monster" | "item"
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  content: blob("content", { mode: "json" }),
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type Lobby = typeof lobbies.$inferSelect;
export type InsertLobby = typeof lobbies.$inferInsert;

export type Character = typeof characters.$inferSelect;
export type InsertCharacter = typeof characters.$inferInsert;

export type SRDDocument = typeof srdDocuments.$inferSelect;
export type InsertSRDDocument = typeof srdDocuments.$inferInsert;
