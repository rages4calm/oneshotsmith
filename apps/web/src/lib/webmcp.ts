// WebMCP plumbing — feature detection and safe registration.
//
// Two API surfaces exist in the wild and we support both:
//   • document.modelContext  — the W3C spec surface (the getter moved from
//     Navigator to Document in webmachinelearning/webmcp#184, on the reasoning
//     that tools belong to a page, not to the browser).
//   • navigator.modelContext — what Chrome's origin trial actually ships today;
//     deprecated in Chrome 150, and aliased by the official polyfill.
// Preferring document and falling back to navigator means the same build works
// on the spec, on the current origin trial, and on the polyfill.
//
// Spec: https://webmachinelearning.github.io/webmcp/

export interface ModelContextToolAnnotations {
  /** The tool only reads state — safe for an agent to call freely. */
  readOnlyHint?: boolean;
  /** Output may contain text the page did not author. */
  untrustedContentHint?: boolean;
}

export interface ModelContextTool {
  /** 1–128 chars, alphanumeric plus _ - . (spec constraint). */
  name: string;
  title?: string;
  description: string;
  inputSchema?: Record<string, unknown>;
  annotations?: ModelContextToolAnnotations;
  execute: (
    input: Record<string, unknown>,
    options: { signal?: AbortSignal }
  ) => Promise<unknown>;
}

interface ModelContextLike {
  registerTool(
    tool: ModelContextTool,
    options?: { signal?: AbortSignal; exposedTo?: string[] }
  ): Promise<void>;
}

export type WebMcpSurface = "document" | "navigator" | null;

interface Detected {
  context: ModelContextLike | null;
  surface: WebMcpSurface;
}

export function detectModelContext(): Detected {
  if (typeof window === "undefined") return { context: null, surface: null };

  const fromDocument = (document as unknown as { modelContext?: ModelContextLike })
    .modelContext;
  if (fromDocument && typeof fromDocument.registerTool === "function") {
    return { context: fromDocument, surface: "document" };
  }

  const fromNavigator = (navigator as unknown as { modelContext?: ModelContextLike })
    .modelContext;
  if (fromNavigator && typeof fromNavigator.registerTool === "function") {
    return { context: fromNavigator, surface: "navigator" };
  }

  return { context: null, surface: null };
}

export interface RegistrationResult {
  surface: WebMcpSurface;
  registered: string[];
  skipped: string[];
}

/**
 * Register a batch of tools. Aborting `signal` unregisters them all (the spec
 * has no explicit unregister method — an aborted signal is the mechanism).
 *
 * Registering a name that is already registered rejects with InvalidStateError.
 * React StrictMode double-invokes effects in development, so that rejection is
 * expected there and is treated as "already live", not as a failure.
 */
export async function registerModelContextTools(
  tools: ModelContextTool[],
  signal: AbortSignal
): Promise<RegistrationResult> {
  const { context, surface } = detectModelContext();
  if (!context) return { surface: null, registered: [], skipped: tools.map((t) => t.name) };

  const registered: string[] = [];
  const skipped: string[] = [];

  for (const tool of tools) {
    if (signal.aborted) break;
    try {
      await context.registerTool(tool, { signal });
      registered.push(tool.name);
    } catch (error) {
      skipped.push(tool.name);
      const name = error instanceof Error ? error.name : "";
      if (name !== "InvalidStateError" && !signal.aborted) {
        console.warn(`[webmcp] could not register "${tool.name}"`, error);
      }
    }
  }

  return { surface, registered, skipped };
}
