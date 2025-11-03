import type * as Party from "partykit/server";

export default class LobbyServer implements Party.Server {
  constructor(readonly room: Party.Room) {}

  async onConnect(conn: Party.Connection, _ctx: Party.ConnectionContext) {
    // New player/GM joins the lobby
    console.log(
      `Connection ${conn.id} joined lobby ${this.room.id}`
    );

    // Send current lobby state to the new connection
    const state = await this.getState();
    conn.send(JSON.stringify({ type: "sync", state }));

    // Broadcast presence update to all
    this.room.broadcast(
      JSON.stringify({
        type: "presence",
        action: "join",
        connectionId: conn.id,
      }),
      [conn.id]
    );
  }

  async onMessage(message: string, sender: Party.Connection) {
    let data;
    try {
      data = JSON.parse(message);
    } catch (e) {
      console.error("Invalid JSON message:", e);
      return;
    }

    switch (data.type) {
      case "patch":
        // Apply CRDT patch to lobby state
        await this.applyPatch(data.patch);
        // Broadcast the patch to all other connections
        this.room.broadcast(message, [sender.id]);
        break;

      case "character_update":
        // Store character updates
        await this.room.storage.put(`character:${data.characterId}`, data.character);
        this.room.broadcast(message, [sender.id]);
        break;

      case "consent_update":
        // Store consent/safety tool updates
        await this.room.storage.put("consent", data.consent);
        this.room.broadcast(message, [sender.id]);
        break;

      case "house_rules":
        // Store house rules
        await this.room.storage.put("houseRules", data.rules);
        this.room.broadcast(message, [sender.id]);
        break;

      default:
        console.warn("Unknown message type:", data.type);
    }
  }

  async onClose(conn: Party.Connection) {
    console.log(`Connection ${conn.id} left lobby ${this.room.id}`);

    // Broadcast presence update
    this.room.broadcast(
      JSON.stringify({
        type: "presence",
        action: "leave",
        connectionId: conn.id,
      })
    );
  }

  async onError(conn: Party.Connection, error: Error) {
    console.error(`Connection ${conn.id} error:`, error);
  }

  private async getState() {
    // Retrieve current lobby state from storage
    const characters = new Map();
    const consent = await this.room.storage.get("consent");
    const houseRules = await this.room.storage.get("houseRules");

    // Get all character keys
    const keys = await this.room.storage.list({ prefix: "character:" });
    for (const [key, value] of keys) {
      const characterId = key.replace("character:", "");
      characters.set(characterId, value);
    }

    return {
      characters: Array.from(characters.values()),
      consent,
      houseRules,
    };
  }

  private async applyPatch(patch: { path: string; value: unknown }) {
    // Apply CRDT-style patches to state
    // This is a simplified version - you'd use a proper CRDT library in production
    if (patch.path && patch.value) {
      await this.room.storage.put(patch.path, patch.value);
    }
  }
}
